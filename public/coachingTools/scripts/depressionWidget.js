/*global define*/
define('coachingDepressionWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'flotTimelineHelper',
	'timeseries',
	'colorUtils',
	'modernizr',
	'googleAnalytics',
	'koCustomBindings', // provides knockout custom bindings
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function($, ko, templates, FlotTimelineHelper, Timeseries, colorUtils, Modernizr, gAnalytics) {
	"use strict";

	var NUM_QUESTIONS = 10;
	var QUESTIONS_PER_PAGE = 5;
	var NUM_PAGES = Math.ceil(NUM_QUESTIONS/QUESTIONS_PER_PAGE);
	var SECONDARY_COLOR = "#808d8e";
	var WHITE = "#FFF";

	function DepressionViewModel(data) {
		this.graphIsLoading = ko.observable(true);
		this.currentScore = ko.observable(data.score);
		this.levels = [{
				name: "level4",
				breakpoint: 1
			},{
				name: "level3",
				breakpoint: 3
			},{
				name: "level2",
				breakpoint: 5
			},{
				name: "level1",
				breakpoint: 10
		}];
		this.targetedContent = ko.observable(data.targetedContent);
		this.questionPage = ko.observable(1);
		this.canAdvance = ko.observable(false);
		this.canSubmit = ko.observable(false);
		this.showPreviousButton = ko.computed(function() {
			return this.questionPage() > 1;
		}, this);
		this.showNextButton = ko.computed(function() {
			return this.questionPage() < NUM_PAGES;
		}, this);
		this.showSaveButton = ko.computed(function() {
			return this.questionPage() === NUM_PAGES;
		}, this);
		this.submissionInProgress = ko.observable(false);
		this.showCancelLink = ko.computed(function(){
			return !this.submissionInProgress();
		}, this);
	}

	$.widget("wnp.coachingDepressionWidget", $.wnp.baseWidget, {
		_widgetClass: "coachingDepressionWidget",
		options: {
			initialView: "current",
			daysToInclude: 365,
			loadingSpinner: true
		},
		_bindEventHandlers: function() {
			var self = this;
			this.element.on("click", ".updateStatusButton", function() {
				self.display("update");
				gAnalytics.track('UpdateDepressionTool');
			});

			this.element.on("click", ".cancelLink", function() {
				self.display("current");
			});

			this.element.on("click", ".saveButton", function() {
				self._persistNewScores();
				gAnalytics.track('SaveDepressionTool');
			});

			this.element.on("click", ".nextButton", function() {
				var page = self.vm.questionPage();
				if(self.vm.questionPage() < NUM_PAGES) {
					self.vm.questionPage(page+1);
				}
			});

			this.element.on("click", ".previousButton", function() {
				var page = self.vm.questionPage();
				if(self.vm.questionPage() > 1) {
					self.vm.questionPage(page-1);
				}
			});

			this.element.on("click", "label", function() {
				if(self.vm.submissionInProgress()){
					event.preventDefault();
					return;
				}
				$(this).find("input").prop("checked", true);
				self.enableForwardActionIfValid(self.vm);
				$(this).addClass("selected c3-color");
				if(!$(this).find("div").length) {
					$(this).append('<div class="underlineAnswer c3-border-color c3-background-color"></div>');
				}
				$(this).siblings("label").removeClass("selected c3-color");
				$(this).siblings("label").find("div").remove();
				$(this).siblings("label").find("input").removeAttr("checked");
			});

			if ($('html').hasClass('no-touch')) {
				this.element.find("label").hover(
					function() {
						if(!$(this).find("div").length) {
							$(this).append('<div class="underlineAnswer c3-border-color c3-background-color"></div>');
						}
						$(this).addClass("c3-color");
					}, function() {
						if(!$(this).hasClass("selected")) {
							$(this).find("div").remove();
							$(this).removeClass("c3-color");
						}
				});
			}

			this.flotHelper.handleResize();
		},
		_createDom: function() {
			this._log("depressionWidget._create called", arguments);
			this._setDom(templates.depressionWidget(this.data.textContent));
			this._initGraph(this.data);

			this.vm = new DepressionViewModel(this.data);
			ko.applyBindings(this.vm, this.element[0]);
			this._bindEventHandlers();
		},
		_destroy: function() {
			this._log("depressionWidget._destroy called", arguments);
			this.flotHelper.destroy();
			this._superApply(arguments);
		},
		_fetchData: function() {
			this._log("depressionWidget._fetchData called", arguments);

			var userDataPromise = this.services.userData.getHistoricDataBySource(["CESDTotalScore"], ["depressionSkills","depressionSkillsTool"]);
			var bundlePromise = this.services.resourceBundle.getResourceBundles(["common","coachingTools","depressionCoachingTool"]);
			var feedbackPromise = this.services.toolFeedback.getFeedback("depressionCoachingTool");

			var deferred = new $.Deferred();

			$.when(userDataPromise,bundlePromise,feedbackPromise).done(function(userData,bundleData,toolFeedback) {
				var feedback = toolFeedback.model.feedback[0] ? toolFeedback.model.feedback[0].content : "";
				var data = {
					user: userData.model,
					resourceBundle: bundleData.model,
					toolFeedback: feedback
				};
				deferred.resolve(data);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		},
		_getNewTargetedContentAndScore: function() {
			var self = this;
			var feedbackPromise = this.services.toolFeedback.getFeedback("depressionCoachingTool");
			var userDataPromise = this.services.userData.getHistoricDataBySource(["CESDTotalScore"], ["depressionSkills","depressionSkillsTool"]);
			$.when(userDataPromise,feedbackPromise).done(function(userData,toolFeedback) {
				var feedback = toolFeedback.model.feedback[0] ? toolFeedback.model.feedback[0].content : "";
				self._remapCESDScores(userData.model.CESDTotalScore);
				self.vm.targetedContent(feedback);
				self.data.cesdSeries.append({
					score: +userData.model.CESDTotalScore[0].value
				});
				self.vm.currentScore(userData.model.CESDTotalScore[0].value);
				self.display("current");
				self.flotHelper.plot();
				//x-axis label position adjustment for misalignment after update only
				self.element.find(".flot-x-axis").css("margin-left","-15px");
				self.vm.questionPage(1);
			}).fail(function(response) {
				self._log("GET CESDScoreCompare failed",arguments);
			}).always(function(){
				self.vm.canSubmit(true);
				self.vm.submissionInProgress(false);
			});
		},
		_initialize: function() {
			this._log("depressionWidget._initialize called", arguments);
			this.vm.graphIsLoading(false);
			this.flotHelper.plot();
			this._superApply(arguments);
		},
		_initGraph: function(data) {
			var self = this;
			this.highlightColor = colorUtils.getPrivateLabelColor(
				3, "depressionSkills", this.companyConfig);
			this.tickLabelColor = colorUtils.getPrivateLabelColor(
				2, "depressionSkills", this.companyConfig);
			this.flotHelper = new FlotTimelineHelper(
				this.element.find(".graph"),
				this.data.cesdSeries,
				{
					graphDaysBuffer: 4,
					useFilteredData: "weekly",
					targetColor: SECONDARY_COLOR,
					onPlot: function($graph) {
						/* apply post-plot graph styles here */
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").css('color','');
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").addClass("c4-color");
					},
					tooltip: {
						content: function(item) {
							var utcDisplayDate = new Date(+item.datapoint[0]);
							var convertedDate = FlotTimelineHelper.convertDateFromUtcDisplay(utcDisplayDate);
							return templates.statusLevelTooltip({
								data: {
									level: self._mapScoreLevel(item.datapoint[1]),
									date: convertedDate
								}
							});
						},
						placement: function(item) {
							return {
								top: item.pageY-20,
								left: item.pageX+5
							};
						}
					},
					yAxisValues: {
						score: {
							/* flot series options go here */
							bars: FlotTimelineHelper.BAR_DEFAULTS
						}
					},
					flotOptions: {
						bars: {
							fill: true,
							fillColor: WHITE
						},
						highlightColor: self.highlightColor,
						grid: {
							borderWidth: 0,
							hoverable: true,
							mouseActiveRadius: 20,
							backgroundColor: WHITE
						},
						yaxis: {
							color: self.tickLabelColor,
							font: {
								color: self.tickLabelColor,
								style: "italic"
							},
							tickDecimals: 0,
							ticks: [
								[0, data.textContent.depressionCoachingTool.veryLittle],
								[NUM_QUESTIONS/4, ""],
								[NUM_QUESTIONS/4*2, ""],
								[NUM_QUESTIONS/4*3, ""],
								[NUM_QUESTIONS, data.textContent.depressionCoachingTool.aLot]
							],
							max: NUM_QUESTIONS
						},
						xaxis: {
							font: {
								color: self.tickLabelColor,
								style: "italic"
							},
							tickLength: 0,
							mode: "time",
							timeformat: "%b %d"
						},
						font: {
							size: 18,
							color: "#545454"
						},
						colors: [SECONDARY_COLOR]
					}
				}
			);
		},
		_mapScoreLevel: function(score) {
			var text = this.data.textContent.depressionCoachingTool;
			var levelText = [text.veryLittle, text.somewhat, text.considerably, text.aLot];
			var label = "";
			var i;
			for(i=0; i<this.vm.levels.length; i++) {
				label = levelText[i];
				if(score <= this.vm.levels[i].breakpoint) {
					 return label;
				}
			}
			return label;
		},
		_persistNewScores: function() {
			var self = this;
			var formDataArray = $(".updateForm").serialize().split("&");
			var dataDefs = [];
			//toggle submit button to prevent multiple clicks
			self.vm.canSubmit(false);
			self.vm.submissionInProgress(true);
			formDataArray.forEach(function(question) {
				var parts = question.split("=");
				dataDefs.push({
					DataDefinitionName: parts[0],
					DataSourceName: "depressionSkillsTool",
					Values: [parts[1] || ""]
				});
			});

			var postPromise = this.services.userData.postData(dataDefs);
			postPromise.done(function(response) {
				self._log("POST new CESD Scores succeeded",arguments);
				self._getNewTargetedContentAndScore();
			}).fail(function(response) {
				self._log("POST CESD Score data failed",arguments);
				self.vm.canSubmit(true);
				self.vm.submissionInProgress(false);
			});
		},
		_processData: function(data) {
			var user = data.user;
			this._remapCESDScores(user.CESDTotalScore);
			user.CESDTotalScore.forEach(function(item) {
				item.score = item.value;
			});
			this.data = {
				score: +user.CESDTotalScore[0].value,
				textContent: data.resourceBundle,
				cesdSeries: new Timeseries(user.CESDTotalScore, this.options.daysToInclude),
				targetedContent: data.toolFeedback
			};
		},
		_remapCESDScores: function(scores) {
			scores.forEach(function(score) {
				//CESD scores must be mapped so 10 displays as lowest value ('none')
				//and 0 displays as highest ('a lot')
				score.value = NUM_QUESTIONS - score.value;
			});
		},
		enableForwardActionIfValid: function(vm) {
			var allAnswered = true;
			var firstPageAnswered = true;
			var inputGroups = this.element.find(".cesdQuestionnairePage > div");
			for(var i = 0; i < inputGroups.length; i++) {
				if(!$(inputGroups[i]).find(".selected").length) {
					if (i < 5) {
						firstPageAnswered = false;
					}
					allAnswered = false;
					break;
				}
			}
			vm.canAdvance(firstPageAnswered);
			vm.canSubmit(allAnswered);
		}
	});

	return function CoachingDepressionWidget(target, options) {
		return $(target).coachingDepressionWidget(options).data("wnpCoachingDepressionWidget");
	};

});
