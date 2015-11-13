/*global define*/
define('coachingChronicConditionWidget', [
	'jquery',
	'knockout',
	'knockout-mapping',
	'coachingToolsTemplates',
	'flotTimelineHelper',
	'timeseries',
	'colorUtils',
	'googleAnalytics',
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function($, ko, koMapping, Templates, FlotTimelineHelper, Timeseries, colorUtils, gAnalytics) {
	"use strict";

	ko.mapping = koMapping;

	var LIFESTYLE_COLOR = "#69c4ef";
	var EMOTIONAL_COLOR = "#9cce6b";
	var MEDICAL_COLOR = "#ef979e";

	function ChronicConditionViewModel(data) {
		this.graphIsLoading = ko.observable(true);
		var currentScore = data.dataSeries.getLatest() || {
			lifestyle: "",
			emotional: "",
			medical: ""
		};

		this.currentScore = ko.mapping.fromJS(currentScore);
		this.newScore = {
			lifestyle: ko.observable(this.currentScore.lifestyle() || ""),
			emotional: ko.observable(this.currentScore.emotional() || ""),
			medical: ko.observable(this.currentScore.medical() || "")
		};

		this.lifestyleTargetedContent = ko.observable(data.targetedContent.lifestyle);
		this.emotionalTargetedContent = ko.observable(data.targetedContent.emotional);
		this.medicalTargetedContent = ko.observable(data.targetedContent.medical);

		this.submissionInProgress = ko.observable(false);
		this.showCancelLink = ko.computed(function(){
			return !this.submissionInProgress();
		}, this);
	}

	$.widget("wnp.coachingChronicConditionWidget", $.wnp.baseWidget, {
		_widgetClass: "coachingChronicConditionWidget",
		options: {
			initialView: "current",
			daysToInclude: 93,
			loadingSpinner: true
		},
		$updateView: $(["data-view=update"]),
		_bindEventHandlers: function() {
			var self = this;
			this.element.on("click", ".updateStatusButton", function() {
				var button = this;
				self.display("update");
				self._updateViewWithLastScores(button);
				gAnalytics.track('UpdateChronicConditionsTool');
			});

			this.element.on("click", ".cancelLink", function() {
				self.display("current");
				gAnalytics.track('CancelChronicConditionsTool');
			});

			this.element.on("click", ".saveButton", function() {
				if (!self.vm.submissionInProgress()) {
					self._persistNewScores();
				}
			});

			this.element.on("click", ".closeGraph", function() {
				self.display("current");
				gAnalytics.track('CloseGraphChronicConditionsTool');
			});
			this.element.on("click", ".viewGraph", function() {
				self.display("graph");
				gAnalytics.track('ViewGraphChronicConditionsTool');
			});

			this.element.on("click", "label.likert", function() {
				if(self.vm.submissionInProgress()){
					event.preventDefault();
					return;
				}
				var label = this;
				self._selectInput(label);
				self._resetSiblingInputs(label);
				self._addScoreFromInput(label);
			});

			this.element.on("change click", "select.dropDown", function() {
				var $select = $(this);
				var score = $select.val();
				$select.find("option").each(function() {
					var option = this;
					if (score === $(option).val()) {
						self._selectOption(option);
						self._addScoreFromOption(option);
					}
				});
			});

			this.flotHelper.handleResize();
		},
		_createDom: function() {
			this._log("chronicCondition._create called", arguments);
			this._setDom(Templates.chronicConditionWidget(this.data.textContent));
			this._initGraph(this.data);
			this.vm = new ChronicConditionViewModel(this.data);

			ko.applyBindings(this.vm, this.element[0]);

			this.tickLabelColor = colorUtils.getPrivateLabelColor(
				4, "chronicConditionSkills", this.companyConfig);

			this._bindEventHandlers();
			this.display("current");
		},
		_addScoreFromInput: function(label) {
			var $label = $(label);
			var $input = $label.find("input");
			var $group = $label.closest("[data-score]");
			var groupName = $group.attr('data-score');
			var score = $input.val();
			this.vm.newScore[groupName](+score);
		},
		_addScoreFromOption: function(option) {
			var $option = $(option);
			var $group = $option.closest("[data-score]");
			var groupName = $group.attr('data-score');
			var score = $option.val();
			this.vm.newScore[groupName](+score);
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
		_selectOption: function(option) {
			var $option = $(option);
			var value = $option.val();
			$option.parent('select').val(value);
		},
		_updateViewWithLastScores: function(button) {
			var self = this;
			var $button = $(button);

			var form = $button.parents('[data-wnpcoachingwidget]').find(".chronicConditionToolForm");
			var $questionGroups = $(form).find('.scoreInputGroup');

			$questionGroups.each(function(idx, group) {
				var $group = $(group);

				var groupName = $group.attr('data-score');
				var currentScore = self.vm.currentScore;
				var score = currentScore[groupName]();

				var $likert = $group.find(".likert");
				var $select = $group.find("select");

				$likert.each(function(idx, label) {
					var $input = $(label).find("input");
					if (+$input.val() === score) {
						self._selectInput(label);
						self._resetSiblingInputs(label);
					}
				});

				$select.each(function(idx, select) {
					var $option = $(select).find("option");
					$option.each(function(idx, option) {
						if (+$(option).val() === score) {
							self._selectOption(option);
						}
					});
				});
			});
		},
		_destroy: function() {
			this._log("chronicCondition._destroy called", arguments);
			this.flotHelper.destroy();
			this._superApply(arguments);
		},
		_fetchData: function() {
			var self = this;
			var definitions = [
				"SelfManagementSkillsLifestyle",
				"SelfManagementSkillsEmotional",
				"SelfManagementSkillsMedical"
			];
			var userDataPromise = this.services.userData.getHistoricDataBySource(definitions);
			var bundlePromise = this.services.resourceBundle.getResourceBundles(["common","coachingTools","chronicConditionCoachingTool"]);
			var feedbackPromise = this.services.toolFeedback.getFeedback("chronicConditionCoachingTool");

			var deferred = new $.Deferred();
			$.when(userDataPromise,bundlePromise,feedbackPromise).done(function(userData,bundleData,toolFeedback) {
				var feedbackContent = self._unwrapFeedbackArray(toolFeedback);
				var data = {
					user: userData.model,
					resourceBundle: bundleData.model,
					targetedContent: feedbackContent
				};
				deferred.resolve(data);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		},
		_unwrapFeedbackArray: function(toolFeedback) {
			var contentObject = {};
			toolFeedback.model.feedback.forEach(function(item) {
				contentObject[item.feedbackKey] = item.content;
			});
			return contentObject;
		},
		_getNewTargetedContent: function() {
			var self = this;
			var feedbackPromise = this.services.toolFeedback.getFeedback(["chronicConditionCoachingTool"]);
			feedbackPromise.done(function(response) {
				var targetedContent = self._unwrapFeedbackArray(response);
				self.vm.lifestyleTargetedContent(targetedContent.LifestyleTargetedContent);
				self.vm.emotionalTargetedContent(targetedContent.EmotionalTargetedContent);
				self.vm.medicalTargetedContent(targetedContent.MedicalTargetedContent);
			}).fail(function(response) {
				self._log("GET SelfManagementSkillsCompares failed",arguments);
			}).always(function() {
				self.vm.submissionInProgress(false);
			});
		},
		_initialize: function() {
			this._log("chronicConditionsWidget._initialize called", arguments);
			this.vm.graphIsLoading(false);
			this.flotHelper.plot();
			//adjust these css positions after the plot and only on the initial plot
			this.element.find(".graph .flot-x-axis").css("left","-15px");
			this._superApply(arguments);
		},
		_initGraph: function(data) {
			var self = this;
			this.data.dataSeries.labels = [
				this.data.textContent.chronicConditionCoachingTool.MedicalLabel,
				this.data.textContent.chronicConditionCoachingTool.LifestyleLabel,
				this.data.textContent.chronicConditionCoachingTool.EmotionalLabel
			];
			this.flotHelper = new FlotTimelineHelper(
				this.element.find(".graph"),
				this.data.dataSeries,
				{
					onPlot: function($graph) {
						/* apply post-plot graph styles here */
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").css('color','');
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").addClass("c4-color");
					},
					tooltip: {
						content: function(item, graphData) {
							var items = [];
							var utcDisplayDate = new Date(+item.datapoint[0]);
							var convertedDate = FlotTimelineHelper.convertDateFromUtcDisplay(utcDisplayDate);
							graphData.forEach(function(series) {
								series.data.forEach(function(point) {
									if(Date.parse(point[0]) === item.datapoint[0] && point[1] === item.datapoint[1]) {
										items.push({
											label: series.label,
											score: point[1],
											date: convertedDate
										});
									}
								});
							});
							return Templates.multiMetricTooltip({
								data: items,
								text: self.data.textContent
							});
						}
					},
					yAxisValues: {
						medical: {},
						lifestyle: {},
						emotional: {}
					},
					graphDaysBuffer: 4,
					useFilteredData: "daily",
					targetColor: "#fff",
					graphworthyMinDataPoints: 3,
					recencyDays: 7,
					flotOptions: {
						yaxis: {
							color: self.tickLabelColor,
							font: {
								color: self.tickLabelColor,
								style: "italic"
							},
							ticks: [[0, "0"], [2, "2"], [4, "4"], [6, "6"], [8, "8"], [10, "10"]],
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
						font: {
							size: 18,
							color: "#545454"
						},
						legend: {
							show: true,
							labelBoxBorderColor: "#000",
							noColumns: 3,
							position: "sw",
							margin: [0,-60],
							backgroundColor: "#FFF"
						},
						colors: [MEDICAL_COLOR, LIFESTYLE_COLOR, EMOTIONAL_COLOR]
					}
				}
			);
		},
		_persistNewScores: function() {
			var self = this;
			self.vm.submissionInProgress(true);
			var newData = [{
					DataDefinitionName: "SelfManagementSkillsLifestyle",
					DataSourceName: "chronicConditionSkillsTool",
					Values: [this.vm.newScore.lifestyle().toString()]
				},{
					DataDefinitionName: "SelfManagementSkillsEmotional",
					DataSourceName: "chronicConditionSkillsTool",
					Values: [this.vm.newScore.emotional().toString()]
				},{
					DataDefinitionName: "SelfManagementSkillsMedical",
					DataSourceName: "chronicConditionSkillsTool",
					Values: [this.vm.newScore.medical().toString()]
			}];
			var postPromise = this.services.userData.postData(newData);
			postPromise.done(function(response) {
				self._log("POST new chronic condition scores succeeded", arguments);
				self._getNewTargetedContent();
				var newScoreDataPoint = {
					lifestyle: self.vm.newScore.lifestyle(),
					emotional: self.vm.newScore.emotional(),
					medical: self.vm.newScore.medical(),
					date: new Date()
				};
				self.data.dataSeries.dataPoints.push(newScoreDataPoint);
				ko.mapping.fromJS(newScoreDataPoint, self.vm.currentScore);

				self.display("current");
				self.flotHelper.plot();
				//x-axis label position adjustment for misalignment after update only
				self.element.find(".flot-x-axis").css("margin-left","-15px");
			}).fail(function(response) {
				self._log("POST new chronic condition scores failed", arguments);
				self.vm.submissionInProgress(false);
				//TODO: handle error state
			});
			gAnalytics.track('SaveChronicConditionsTool');
		},
		_processData: function(data) {
			var seriesList = [];
			var skillDefs = [
				"SelfManagementSkillsLifestyle",
				"SelfManagementSkillsEmotional",
				"SelfManagementSkillsMedical"
			];
			data.user.SelfManagementSkillsLifestyle.forEach(function(item,index) {
				var seriesObj = { date: item.date };
				skillDefs.forEach(function(def) {
					var skill = def.replace("SelfManagementSkills","").toLowerCase();
					if(data.user[def][index]){
						seriesObj[skill] = +data.user[def][index].value;
					}
				});
				seriesList.push(seriesObj);
			});

			this.data = {
				textContent: data.resourceBundle,
				dataSeries: new Timeseries(seriesList, this.options.daysToInclude),
				targetedContent: {
					lifestyle: data.targetedContent.LifestyleTargetedContent,
					emotional: data.targetedContent.EmotionalTargetedContent,
					medical: data.targetedContent.MedicalTargetedContent
				}
			};
		}
	});

	return function CoachingChronicConditionWidget(target, options) {
		return $(target).coachingChronicConditionWidget(options).data("wnpCoachingChronicConditionWidget");
	};

});
