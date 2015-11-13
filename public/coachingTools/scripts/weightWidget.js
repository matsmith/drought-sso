/*global define*/
define('coachingWeightWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'flotTimelineHelper',
	'timeseries',
	'colorUtils',
	'googleAnalytics',
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function($, ko, templates, FlotTimelineHelper, Timeseries, colorUtils, gAnalytics) {
	"use strict";

	var MAX_WEIGHT_INPUT = 800;
	var MIN_IDEAL_BMI = 18.5;
	var MAX_IDEAL_BMI = 24.9;
	var BMI_IMPERIAL_CONST = 703;
	var SECONDARY_COLOR = "#808d8e";

	function WeightViewModel(data) {
		this.graphIsLoading = ko.observable(true);
		this.height = data.height;
		this.idealWeightMax = getIdealWeightMax(this.height);
		this.idealWeightMin = getIdealWeightMin(this.height);
		this.idealBmiMax = MAX_IDEAL_BMI;
		this.idealBmiMin = MIN_IDEAL_BMI;
		this.newWeight = ko.observable("");
		this.targetedContent = ko.observable(data.targetedContent);
		this.newBmi = ko.computed(function() {
			return calculateBmi(this.height, this.newWeight());
		}, this);
		this.currentWeight = ko.observable(data.weightSeries.getLatest("weight"));

		this.currentBmi = ko.computed(function() {
			return calculateBmi(this.height, this.currentWeight());
		}, this);
		this.isIdeal = ko.computed(function() {
			return this.currentWeight() > this.idealWeightMin &&
				this.currentWeight() < this.idealWeightMax;
		}, this);
		this.isValidWeight = ko.computed(function() {
			var newWeight = this.newWeight();
			return 0 < +newWeight && MAX_WEIGHT_INPUT >= +newWeight &&
				newWeight.indexOf('.') === -1;
		}, this);
		this.submissionInProgress = ko.observable(false);
		this.showCancelLink = ko.computed(function(){
			return !this.submissionInProgress();
		}, this);
		this.canSave = ko.computed(function() {
			return this.isValidWeight() && !this.submissionInProgress();
		}, this);
	}

	$.widget("wnp.coachingWeightWidget", $.wnp.baseWidget, {
		_widgetClass: "coachingWeightWidget",
		options: {
			initialView: "current",
			daysToInclude: 365,
			loadingSpinner: true
		},
		_bindEventHandlers: function() {
			var self = this;
			this.element.on("click", ".updateStatusButton", function() {
				self.display("update");
				gAnalytics.track('UpdateWeightTool');
			});

			this.element.on("click", ".cancelLink", function() {
				self.display("current");
			});

			this.element.on("click", ".saveButton", function() {
				if (self.vm.canSave()) {
					self.persistNewWeight();
				}
			});

			this.flotHelper.handleResize();
		},
		_createDom: function() {
			this._log("weightWidget._create called", arguments);
			this._setDom(templates.weightWidget(this.data.textContent));
			this._initGraph(this.data);

			this.primaryColor = colorUtils.getPrivateLabelColor(
				3, "weightSkills", this.companyConfig);
			this.tickLabelColor = colorUtils.getPrivateLabelColor(
				4, "weightSkills", this.companyConfig);

			this.vm = new WeightViewModel(this.data);
			this.flotHelper.setTargetRange(this.vm.idealWeightMin, this.vm.idealWeightMax);
			ko.applyBindings(this.vm, this.element[0]);
			this._bindEventHandlers();
		},
		_destroy: function() {
			this._log("weightWidget._destroy called", arguments);
			this.flotHelper.destroy();
			this._superApply(arguments);
		},
		_fetchData: function() {
			this._log("weightWidget._fetchData called", arguments);

			var definitions = ["WeightPounds","HeightInches","HeightFeet","BodyMassIndexCategoryCompare","BodyMassIndexCategory"];
			var userDataPromise = this.services.userData.getHistoricData(definitions);
			var bundlePromise = this.services.resourceBundle.getResourceBundles(["common","coachingTools","weightCoachingTool"]);
			var feedbackPromise = this.services.toolFeedback.getFeedback("weightCoachingTool");

			var deferred = new $.Deferred();

			$.when(userDataPromise,bundlePromise, feedbackPromise).done(function(userData,bundleData,toolFeedback) {
				var feedback = toolFeedback.model.feedback[0] ? toolFeedback.model.feedback[0].content : "";
				var data = {
					user: userData.model,
					resourceBundle: bundleData.model,
					targetedContent: feedback
				};
				deferred.resolve(data);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		},
		_getNewTargetedContent: function() {
			var self = this;
			var feedbackPromise = this.services.toolFeedback.getFeedback(["weightCoachingTool"]);
			feedbackPromise.done(function(response) {
				var feedback = response.model.feedback[0] ? response.model.feedback[0].content : "";
				self.vm.targetedContent(feedback);
				self.vm.submissionInProgress(false);
			}).fail(function(response) {
				self._log("GET weightSkills toolFeedback failed",arguments);
				self.vm.submissionInProgress(false);
				//TODO: handle error state
			});
		},
		_initialize: function() {
			this._log("weightWidget._initialize called", arguments);
			this.vm.graphIsLoading(false);
			this.flotHelper.plot();
			this._superApply(arguments);
		},
		_initGraph: function(data) {
			var self = this;
			this.flotHelper = new FlotTimelineHelper(
				this.element.find(".graph"),
				this.data.weightSeries,
				{
					graphDaysBuffer: 4,
					useFilteredData: "daily",
					targetColor: SECONDARY_COLOR,
					onPlot: function($graph) {
						/* apply post-plot graph styles here */
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").css('color','');
						$graph.find(".flot-x-axis > div, .flot-y-axis > div").addClass("c4-color");
						$graph.find(".flot-x-axis > div").addClass("x-axis-label");
					},
					tooltip: {
						content: function(item) {
							var utcDisplayDate = new Date(+item.datapoint[0]);
							var convertedDate = FlotTimelineHelper.convertDateFromUtcDisplay(utcDisplayDate);
							return templates.weightTooltip({
								data: {
									weight: item.datapoint[1].toFixed(0),
									bmi: calculateBmi(self.data.height,item.datapoint[1]).toFixed(1),
									date: convertedDate
								},
								weightUnits: self.data.textContent.weightCoachingTool.weightUnits
							});
						}
					},
					yAxisValues: {
						weight: {
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
							tickDecimals: 0,
							tickFormatter: function(weight) {
								return weight.toFixed(0)+" "+self.data.textContent.weightCoachingTool.weightUnits;
							}
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
		persistNewWeight: function() {
			var self = this;
			this.vm.submissionInProgress(true);
			var newData = [{
				DataDefinitionName: "WeightPounds",
				DataSourceName: "weightSkillsTool",
				Values: [this.vm.newWeight()]
			}];
			var postPromise = this.services.userData.postData(newData);
			postPromise.done(function(response) {
				self._log("POST weight data succeeded",arguments);
				self._getNewTargetedContent();
				self.data.weightSeries.append({
					weight: +self.vm.newWeight(),
					bmi: calculateBmi(self.data.height, +self.vm.newWeight())
				});
				self.vm.currentWeight(self.data.weightSeries.getLatest("weight"));

				self.display("current");
				self.vm.newWeight("");
				self.flotHelper.plot();
				//x-axis label position adjustment for misalignment after update only
				self.element.find(".flot-x-axis").css("margin-left","-15px");
			}).fail(function(response) {
				self._log("POST weight data failed",arguments);
				self.vm.submissionInProgress(false);
				//TODO: handle error state
			});
			gAnalytics.track('SaveWeightTool');
		},
		_processData: function(data) {
			var self = this;
			var user = data.user;

			user.WeightPounds.forEach(function(item) {
				item.weight = item.value;
			});
			this.data = {
				height: +user.HeightInches[0].value+(user.HeightFeet[0].value*12),
				textContent: data.resourceBundle,
				weightSeries: new Timeseries(user.WeightPounds, this.options.daysToInclude),
				targetedContent: data.targetedContent
			};
			this.data.weightSeries.dataPoints.forEach(function(dataPoint) {
				dataPoint.bmi = calculateBmi(self.data.height, dataPoint.weight);
			});
		}
	});

	function getIdealWeightMax(height) {
		return getWeightByBmi(height, MAX_IDEAL_BMI);
	}

	function getIdealWeightMin(height) {
		return getWeightByBmi(height, MIN_IDEAL_BMI);
	}

	function getWeightByBmi(height, bmi) {
		// remove imperial const if metric weight and height
		return (bmi * height * height) / BMI_IMPERIAL_CONST;
	}

	function calculateBmi(height, weight) {
		// remove imperial const if metric weight and height
		return (weight / (height * height)) * BMI_IMPERIAL_CONST;
	}

	return function CoachingWeightWidget(target, options) {
		return $(target).coachingWeightWidget(options).data("wnpCoachingWeightWidget");
	};

});
