/*global define*/
define('coachingStressWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'flotTimelineHelper',
	'timeseries',
	'colorUtils',
	'modernizr',
	'googleAnalytics',
	'koCustomBindings', // provides custom knockout bindings
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function($, ko, templates, FlotTimelineHelper, Timeseries, colorUtils, Modernizr, gAnalytics) {
	"use strict";

	var NUM_QUESTIONS = 10;
	var QUESTIONS_PER_PAGE = 5;
	var NUM_PAGES = Math.ceil(NUM_QUESTIONS/QUESTIONS_PER_PAGE);
	var Y_AXIS_PADDING = 5;
	var MAX_SCORE = NUM_QUESTIONS*4;
	var WHITE = "#FFF";

	function StressViewModel(data) {
		this.graphIsLoading = ko.observable(true);
		this.currentScore = ko.observable(data.score);
		this.levels = [{
				name: "level1",
				breakpoint: 10
			},{
				name: "level2",
				breakpoint: 20
			},{
				name: "level3",
				breakpoint: 30
			},{
				name: "level4",
				breakpoint: 40
		}];
		this.targetedContent = ko.observable(data.targetedContent);
		this.questionPage = ko.observable(1);
		this.canAdvance = ko.observable(false);
		this.canSubmit = ko.observable(false);
		this.submissionInProgress = ko.observable(false);
		this.showCancelLink = ko.computed(function(){
			return !this.submissionInProgress();
		}, this);
		this.showPreviousButton = ko.computed(function() {
			return this.questionPage() > 1;
		}, this);
		this.showNextButton = ko.computed(function() {
			return this.questionPage() < NUM_PAGES;
		}, this);
		this.showSaveButton = ko.computed(function() {
			return this.questionPage() === NUM_PAGES;
		}, this);
	}

	$.widget("wnp.coachingStressWidget", $.wnp.baseWidget, {
		_widgetClass: "coachingStressWidget",
		options: {
			initialView: "current",
			daysToInclude: 365,
			loadingSpinner: true
		},
		_bindEventHandlers: function() {
			var self = this;
			this.element.on("click", ".updateStatusButton", function() {
				self.display("update");
				gAnalytics.track('UpdateStressTool');
			});

			this.element.on("click", ".cancelLink", function() {
				self.display("current");
			});

			this.element.on("click", ".saveButton", function() {
				self._persistNewScores();
				gAnalytics.track('SaveStressTool');
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
				self._updateScores(this);
			});

			this.element.on("change click", "select.dropDown", function() {
				self._updateMobileScores(this);
			});

			this.flotHelper.handleResize();
		},
		_updateScores: function(label) {
			var $label = $(label);
			var $input = $label.find("input");
			if(this.vm.submissionInProgress()){
				event.preventDefault();
				return;
			}
			var $questionGroup = $(label).closest(".scoreInputGroup");
			var name = $questionGroup.attr("name");
			name = "PerceivedStress" + name;
			$input.attr("name", name);
			this._selectInput(label);
			this._resetSiblingInputs(label);
			this._syncScores($input);
			this.enableForwardActionIfValid(this.vm);
		},
		_updateMobileScores: function(select) {
			var self = this;
			var $select = $(select);
			var score = $select.val();

			$select.find("option").each(function() {
				var option = this;
				if (score === $(option).val()) {
					self._selectOption(option);
					self._syncScores(option);
					self.enableForwardActionIfValid(self.vm);
				}
			});
		},
		_selectInput: function(label) {
			var $label = $(label);
			var $input = $label.find("input");
			var $colorBlock = $label.find("div");

			$label.addClass("selected c3-color");
			$input.prop("checked", true);

			if(!$colorBlock.length) {
				$label.append('<div class="underlineAnswer c3-border-color c3-background-color"></div>');
			}
		},
		_resetSiblingInputs: function(label) {
			var $labels =  $(label).siblings("label.likert");
			$labels.find("div").remove();
			$labels.find("input").removeProp("checked");
			$labels.removeClass("selected c3-color");
		},
		_resetAllInputs: function(label) {
			var $labels =  $(label).closest('.scoreInputGroup').find("label.likert");
			$labels.find("div").remove();
			$labels.find("input").removeProp("checked");
			$labels.removeClass("selected c3-color");
		},
		_selectOption: function(option) {
			var $option = $(option);
			var value = $option.val();
			$option.parent().val(value);

			var $questionGroup = $option.closest(".scoreInputGroup");
			var name = $questionGroup.attr("name");
			name = "PerceivedStress" + name;

			var $siblings = $option.siblings("option");
			$siblings.removeClass("selected");

			$option.addClass("selected");
			$option.parent().attr("name", name);
		},
		_resetSiblingOptions: function(option) {
			var $option = $(option);
			$option.siblings("option").removeClass("selected").removeAttr('selected');
		},
		_resetAllOptions: function(option) {
			var $select = $(option).parent();
			$select.find("option").removeClass("selected").removeAttr('selected');
			$select.val('');
		},
		_syncScores: function(answer) {
			var self = this;
			var $activeAnswer = $(answer);

			var $questionGroup = $activeAnswer.closest('.scoreInputGroup');

			var activeQuestionType;
			var inactiveQuestionType;
			var matchingAnswer;
			var matchingParent;
			var activeValue = $activeAnswer.val();
			var valueSelector = "[value='" + activeValue + "']";

			if ($activeAnswer.is('input')) {
				activeQuestionType = 'input';
				inactiveQuestionType = 'option';
				matchingAnswer = $questionGroup.find(inactiveQuestionType + valueSelector);
				matchingParent = $(matchingAnswer).parent();
				self._resetAllOptions(matchingAnswer);
				self._selectOption(matchingAnswer);
			} else if ($activeAnswer.is('option')) {
				activeQuestionType = "option";
				inactiveQuestionType = 'input';
				matchingAnswer = $questionGroup.find(inactiveQuestionType + valueSelector);
				matchingParent = $(matchingAnswer).parent();
				self._resetAllInputs(matchingParent);
				self._selectInput(matchingParent);
			}
		},
		_createDom: function() {
			this._log("stressWidget._create called", arguments);
			this._setDom(templates.stressWidget(this.data));
			this._initGraph(this.data);

			ko.applyBindings(this.vm, this.element[0]);
			this._bindEventHandlers();
		},
		_destroy: function() {
			this._log("stressWidget._destroy called", arguments);
			this.flotHelper.destroy();
			this._superApply(arguments);
		},
		_fetchData: function() {
			this._log("stressWidget._fetchData called", arguments);

			var userDataPromise = this.services.userData
				.getHistoricDataBySource(["PerceivedStressScale"], ["stressSkills","stressSkillsTool"]);
			var bundlePromise = this.services.resourceBundle
				.getResourceBundles(["common","coachingTools","stressCoachingTool"]);
			var feedbackPromise = this.services.toolFeedback.getFeedback("stressCoachingTool");

			var deferred = new $.Deferred();

			$.when(userDataPromise, bundlePromise, feedbackPromise).done(function(userData, bundleData, toolFeedback) {
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
			var feedbackPromise = this.services.toolFeedback.getFeedback("stressCoachingTool");
			var userDataPromise = this.services.userData
				.getHistoricDataBySource(["PerceivedStressScale"], ["stressSkills","stressSkillsTool"]);

			$.when(userDataPromise,feedbackPromise).done(function(userData,toolFeedback) {
				var feedback = toolFeedback.model.feedback[0] ? toolFeedback.model.feedback[0].content : "";
				self.vm.targetedContent(feedback);
				self.data.stressSeries.append({
					score: self._mapScoreLevel(+userData.model.PerceivedStressScale[0].value).value
				});
				self.vm.currentScore(userData.model.PerceivedStressScale[0].value);
				self.display("current");
				self.flotHelper.plot();
				//x-axis label position adjustment for misalignment after update only
				self.element.find(".flot-x-axis").css("margin-left","-15px");
				self.vm.questionPage(1);
			}).fail(function(response) {
				self._log("GET StressScoreCompare failed",arguments);
			}).always(function() {
				self.vm.canSubmit(true);
				self.vm.submissionInProgress(false);
			});
		},
		_initialize: function() {
			this._log("stressWidget._initialize called", arguments);
			this.vm.graphIsLoading(false);
			this.flotHelper.plot();
			this._superApply(arguments);
		},
		_initGraph: function(data) {
			var self = this;
			this.highlightColor = colorUtils.getPrivateLabelColor(
				3, "stressSkills", this.companyConfig);
			this.tickLabelColor = colorUtils.getPrivateLabelColor(
				2, "stressSkills", this.companyConfig);
			this.data.stressSeries.dataPoints.forEach(function(series) {
				series.score = +series.score;
			});
			this.flotHelper = new FlotTimelineHelper(
				this.element.find(".graph"),
				this.data.stressSeries,
				{
					graphDaysBuffer: 4,
					useFilteredData: "daily",
					targetColor: this.highlightColor,
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
									level: self._mapScoreLevel(item.datapoint[1]).label,
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
								style: "italic"
							},
							tickDecimals: 0,
							ticks: [
								[MAX_SCORE/4, data.textContent.stressCoachingTool.lowLabel],
								[MAX_SCORE/4*2, ""],
								[MAX_SCORE/4*3, ""],
								[MAX_SCORE, data.textContent.stressCoachingTool.veryHighLabel]
							],
							max: MAX_SCORE + Y_AXIS_PADDING
						},
						xaxis: {
							font: {
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
						colors: [this.highlightColor]
					}
				}
			);
		},
		_mapScoreLevel: function(score) {
			var text = this.data.textContent.stressCoachingTool;
			var levelText = [text.lowLabel, text.moderateLabel, text.highLabel, text.veryHighLabel];
			var map = {label: "", value: 40};
			var i;
			for(i=0; i<this.vm.levels.length; i++) {
				map.label = levelText[i];
				map.value = this.vm.levels[i].breakpoint;
				if(score <= this.vm.levels[i].breakpoint) {
					 return map;
				}
			}
			return map;
		},
		_persistNewScores: function() {
			var self = this;
			// Produces string of question keys with value chosen
			var formDataArray = this.element.find(".updateForm").serialize().split("&");
			var dataDefs = [];
			// Toggle submit button to prevent multiple clicks
			self.vm.canSubmit(false);
			self.vm.submissionInProgress(true);
			formDataArray.forEach(function(question) {
				var parts = question.split("=");
				dataDefs.push({
					DataDefinitionName: parts[0],
					DataSourceName: "stressSkillsTool",
					Values: [parts[1] || ""]
				});
			});

			var postPromise = this.services.userData.postData(dataDefs);
			postPromise.done(function(response) {
				self._log("POST new Stress Scores succeeded",arguments);
				self._getNewTargetedContentAndScore();
			}).fail(function(response) {
				self._log("POST Stress Score data failed",arguments);
				self.vm.submissionInProgress(false);
				self.vm.canSubmit(true);
			});
		},
		_processData: function(data) {
			var self = this;
			var user = data.user;
			var stressCoachingText = data.resourceBundle.stressCoachingTool;
			this.data = {
				score: +user.PerceivedStressScale[0].value,
				textContent: data.resourceBundle,
				targetedContent: data.toolFeedback,
				choices: {
					"never": { "text": stressCoachingText.never },
					"rarely": { "text": stressCoachingText.rarely },
					"sometimes": { "text": stressCoachingText.sometimes },
					"fairlyOften": { "text": stressCoachingText.fairlyOften },
					"always": { "text": stressCoachingText.always }
				}
			};
			this.vm = new StressViewModel(this.data);
			user.PerceivedStressScale.forEach(function(item) {
				item.score = self._mapScoreLevel(item.value).value;
			});
			this.data.stressSeries = new Timeseries(user.PerceivedStressScale, this.options.daysToInclude);
		},
		enableForwardActionIfValid: function(vm) {
			var allAnswered = true;
			var firstPageAnswered = true;
			var inputGroups = this.element.find(".scoreInputGroup");
			for(var i = 0; i < inputGroups.length; i++) {
				if(!$(inputGroups[i]).find("label.selected").length) {
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

	return function CoachingStressWidget(target, options) {
		return $(target).coachingStressWidget(options).data("wnpCoachingStressWidget");
	};

});
