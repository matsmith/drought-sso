/*global define*/
define('coachingPhysicalActivityWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'flotTimelineHelper',
	'timeseries',
	'colorUtils',
	'modernizr',
	'initializeSlimScroll',
	'googleAnalytics',
	'activeStatusIcon',
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function($, ko, templates, FlotTimelineHelper, Timeseries, colorUtils, Modernizr, initializeSlimScroll, gAnalytics) {
	"use strict";

	var SECONDARY_COLOR = "#808d8e";
	var MINUTES_IN_DAY = 1440;

	function PhysicalActivityViewModel(data) {
		this.graphIsLoading = ko.observable(true);
		this.currentScore = ko.observable(data.score);
		this.levels = [{
				name: "level1",
				breakpoint: 2
			},{
				name: "level2",
				breakpoint: 4
			},{
				name: "level3",
				breakpoint: 6
			},{
				name: "level4",
				breakpoint: 10
		}];
		this.targetedContent = ko.observable(data.targetedContent);
		this.moderateActivityDays = ko.observable("");
		this.moderateActivityMins = ko.observable("");
		this.vigorousActivityDays = ko.observable("");
		this.vigorousActivityMins = ko.observable("");
		this.strengthActivityDays = ko.observable("");
		this.validVigorousMins = ko.computed(function() {
			return minutesInputIsValid(this.vigorousActivityDays(),this.vigorousActivityMins());
		},this);
		this.validModerateMins = ko.computed(function() {
			return minutesInputIsValid(this.moderateActivityDays(),this.moderateActivityMins());
		},this);
		this.isValid = ko.computed(function() {
			return this.validModerateMins() && this.validVigorousMins() && this.moderateActivityDays() !== "" &&
				this.vigorousActivityDays() !== "" && this.strengthActivityDays() !== "";
		}, this);
		this.submissionInProgress = ko.observable(false);
		this.canSubmit = ko.computed(function() {
			return this.isValid() && !this.submissionInProgress();
		}, this);
		this.showCancelLink = ko.computed(function(){
			return !this.submissionInProgress();
		}, this);
		this.strengthActivityDaysDisplayText = ko.computed(function(){
			return data.textContent.physicalActivityCoachingTool[this.strengthActivityDays()];
		}, this);
	}

	function minutesInputIsValid(days,mins) {
		//if days input is 0, minutes can only be zero, else check valid nonzero number
		var validZeroInput = days === "0" && mins === "0";
		var validMinutesInput = 0 < +mins && MINUTES_IN_DAY >= +mins &&
				mins.indexOf('.') === -1;
		return validZeroInput || days !== "0" && validMinutesInput;
	}

	$.widget("wnp.coachingPhysicalActivityWidget", $.wnp.baseWidget, {
		_widgetClass: "coachingPhysicalActivityWidget",
		options: {
			initialView: "current",
			daysToInclude: 365,
			loadingSpinner: true
		},
		_bindEventHandlers: function() {
			var self = this;
			this.element.on("click", ".updateStatusButton", function() {
				self.display("update");
				gAnalytics.track('UpdatePhysicalActivityTool');
			});

			this.element.on("click", ".cancelLink", function() {
				self.display("current");
			});

			this.element.on("click", ".saveButton", function() {
				self._persistNewScore();
				gAnalytics.track('SavePhysicalActivityTool');
			});

			this.element.on("click change", ".dropdownValue", function(event) {
				if(self.vm.submissionInProgress()){
					event.preventDefault();
					return;
				}
				if(!$(event.target).is(".dropdownValue") && !$(event.target).is(".downArrow")){
					var target = this;
					//
					setTimeout(function(){
						$(target).find(".dropdownListWrapper").hide();
					}, 0);
				}else{
					$(this).closest(".newData").siblings(".newData")
						.find(".dropdownListWrapper").hide();
					$(this).find(".dropdownListWrapper").toggle();
				}
			});

			this.element.find('.dropdownListWrapper div').initializeSlimScroll({
				height: '176px',
				width: '100%',
				color: '#ffffff'
			});

			this.element.on("click change", ".dropdownListWrapper label", function(event) {
				self._updateScores(this);
			});

			this.element.on("change click", "select", function() {
				self._updateMobileScores(this);
			});

			this.flotHelper.handleResize();
		},
		_updateScores: function(label) {
			var $input = $(label).find("input");
			this._syncScores($input);
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
				}
			});
		},
		_resetSiblingInputs: function(label) {
			var $labels =  $(label).siblings("label");
			$labels.find("input").removeProp("checked");
		},

		_resetSiblingOptions: function(option) {
			var $option = $(option);
			$option.siblings("option").removeAttr('selected');
		},
		_selectInput: function(label) {
			var $label = $(label);
			var $input = $label.find("input");
			$input.prop("checked", true);
		},
		_selectOption: function(option) {
			var $option = $(option);
			var value = $option.val();
			$option.parent().val(value);
		},
		_syncScores: function(answer) {
			var self = this;
			var $activeAnswer = $(answer);

			var $questionGroup = $activeAnswer.closest('.newData');

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
				self._resetSiblingOptions(matchingAnswer);
				self._selectOption(matchingAnswer);
			} else if ($activeAnswer.is('option')) {
				activeQuestionType = "option";
				inactiveQuestionType = 'input';
				matchingAnswer = $questionGroup.find(inactiveQuestionType + valueSelector);
				matchingParent = $(matchingAnswer).parent();
				self._resetSiblingInputs(matchingParent);
				self._selectInput(matchingParent);
			}
		},
		_createDom: function() {
			this._log("PhysicalActivityWidget._create called", arguments);
			this._setDom(templates.physicalActivityWidget(this.data.textContent));
			this._initGraph(this.data);

			this.primaryColor = colorUtils.getPrivateLabelColor(
				3, "physicalActivitySkills", this.companyConfig);
			this.tickLabelColor = colorUtils.getPrivateLabelColor(
				4, "physicalActivitySkills", this.companyConfig);

			this.vm = new PhysicalActivityViewModel(this.data);
			ko.applyBindings(this.vm, this.element[0]);
			this._bindEventHandlers();
		},
		_destroy: function() {
			this._log("PhysicalActivityWidget._destroy called", arguments);
			this.flotHelper.destroy();
			this._superApply(arguments);
		},
		_fetchData: function() {
			this._log("PhysicalActivityWidget._fetchData called", arguments);

			var userDataPromise = this.services.userData
					.getHistoricDataBySource(["BehaviorScorePhysicalActivity"], ["physicalActivitySkills","physicalActivitySkillsTool"]);
			var bundlePromise = this.services.resourceBundle
					.getResourceBundles(["common","coachingTools","physicalActivityCoachingTool"]);
			var feedbackPromise = this.services.toolFeedback.getFeedback("physicalActivityCoachingTool");

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
			var feedbackPromise = this.services.toolFeedback.getFeedback("physicalActivityCoachingTool");
			var userDataPromise = this.services.userData
					.getHistoricDataBySource(["BehaviorScorePhysicalActivity"], ["physicalActivitySkills","physicalActivitySkillsTool"]);
			$.when(userDataPromise,feedbackPromise).done(function(userData,toolFeedback) {
				var feedback = toolFeedback.model.feedback[0] ? toolFeedback.model.feedback[0].content : "";
				self.vm.targetedContent(feedback);
				self.data.paSeries.append({
					score: +userData.model.BehaviorScorePhysicalActivity[0].value
				});
				self.vm.currentScore(userData.model.BehaviorScorePhysicalActivity[0].value);
				self.display("current");
				self.flotHelper.plot();
			}).fail(function(response) {
				self._log("GET Physical Activity Update failed",arguments);
			}).always(function(){
				self.vm.submissionInProgress(false);
			});
		},
		_initialize: function() {
			this._log("physicalActivityWidget._initialize called", arguments);
			this.vm.graphIsLoading(false);
			this.flotHelper.plot();
			this._superApply(arguments);
		},
		_initGraph: function(data) {
			var self = this;
			this.flotHelper = new FlotTimelineHelper(
				this.element.find(".graph"),
				this.data.paSeries,
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
									score: item.datapoint[1].toFixed(0),
									date: convertedDate
								}
							});
						}
					},
					yAxisValues: {
						score: {
							/* flot series options go here */
						}
					},
					flotOptions: {
						lines: {
							show: true,
							lineWidth: 2
						},
						points: {
							show: true,
							radius: 7
						},
						grid: {
							borderWidth: 0,
							hoverable: true,
							mouseActiveRadius: 20,
							backgroundColor: "#FFF"
						},
						yaxis: {
							color: self.tickLabelColor,
							font: {
								color: self.tickLabelColor,
								style: "italic"
							},
							ticks: [[0, ""], [2, ""], [4, ""],
									[6, data.textContent.physicalActivityCoachingTool.physicalActivityScore],
									[8, ""], [10, ""]],
							max: 10
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
						colors: [SECONDARY_COLOR,self.primaryColor]
					}
				}
			);
		},
		_persistNewScore: function() {
			var self = this;
			self.vm.submissionInProgress(true);
			var formDataArray = $(".updateForm").serialize().split("&");
			var dataDefs = [];
			formDataArray.forEach(function(question) {
				var parts = question.split("=");
				dataDefs.push({
					DataDefinitionName: parts[0],
					DataSourceName: "physicalActivitySkillsTool",
					Values: [parts[1] || ""]
				});
			});
			var postPromise = this.services.userData.postData(dataDefs);
			postPromise.done(function(response) {
				self._log("POST new Physical Activity Scores succeeded",arguments);
				self._getNewTargetedContentAndScore();
			}).fail(function(response) {
				self._log("POST Physical Activity Score data failed",arguments);
				self.vm.submissionInProgress(false);
			});
		},
		_processData: function(data) {
			var user = data.user;
			user.BehaviorScorePhysicalActivity.forEach(function(item) {
				item.score = item.value;
			});
			this.data = {
				score: +user.BehaviorScorePhysicalActivity[0].value,
				textContent: data.resourceBundle,
				paSeries: new Timeseries(user.BehaviorScorePhysicalActivity, this.options.daysToInclude),
				targetedContent: data.toolFeedback
			};
		}
	});

	return function CoachingPhysicalActivityWidget(target, options) {
		return $(target).coachingPhysicalActivityWidget(options).data("wnpCoachingPhysicalActivityWidget");
	};

});
