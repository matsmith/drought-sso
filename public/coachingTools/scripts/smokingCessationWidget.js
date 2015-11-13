/*global define, environment*/
define('coachingSmokingCessationWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'moment',
	'googleAnalytics',
	'modernizr',
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner',
	'skillIcon',
	'enhancedSvg'
], function($, ko, Templates, Moment, gAnalytics, Modernizr) {
	"use strict";

	var improvementDataDefs = [
		"SmokingImpactHearing",
		"SmokingImpactVision",
		"SmokingImpactMouth",
		"SmokingImpactFaceSkin",
		"SmokingImpactSmellTaste",
		"SmokingImpactBelly",
		"SmokingImpactMuscles",
		"SmokingImpactHormones",
		"SmokingImpactSexualHealth",
		"SmokingImpactHeartHealth",
		"SmokingImpactLungs",
		"SmokingImpactAirways"
	];

	var CAROUSEL_SLIDE_DURATION = 800;

	function SmokingCessationViewModel(data) {
		var self = this;

		this.bargraphIconSrc = environment.coachingMediaPath + "icons/bargraph_icon.svg";

		this.improvements = ko.observableArray();
		this.activeImprovementIdx = ko.observable(0);
		this.activeImprovementDisplayIdx = ko.computed(function() {
			return self.activeImprovementIdx() + 1;
		});

		this.slipTrackingFeedback = ko.observable(data.feedback);
		this.slipTrackingText = ko.computed(function() {
			if (!data.isPostQuit) {
				return data.textContent.smokingCessationCoachingTool.slipTrackingPreQuitText;
			}
			if (self.slipTrackingFeedback()) {
				return self.slipTrackingFeedback();
			}
			return data.textContent.smokingCessationCoachingTool.slipTrackingQuestionLeadIn;
		});
		this.showSlipTrackingQuestion = ko.computed(function() {
			return data.isPostQuit && !self.slipTrackingFeedback();
		});
		this.slipTrackingSubmissionInProgress = ko.observable(false);

		improvementDataDefs.forEach(function(improvementDataDefName, idx) {
			self.improvements.push(new ImprovementViewModel(
				improvementDataDefName, idx, data, self));
		});

		this.activeImprovement = ko.computed(function() {
			return self.improvements()[self.activeImprovementIdx()];
		});

		this.numberSeen = ko.computed(function() {
			return self.improvements().filter(function(item) {
				return item.isSeen();
			}).length;
		});

		this.showImprovementsBanner = ko.computed(function() {
			return self.numberSeen() && data.isPostQuit;
		});

		function trackAnimation(duration) {
			if (Modernizr.csstransitions) {
				self.isAnimating = true;
				setTimeout(function() {
					self.isAnimating = false;
				}, duration);
			}
		}
		this.showNext = function() {
			if (this.isAnimating) {
				return;
			}
			var nextIdx = this.activeImprovementIdx() + 1;

			if (!this.improvements()[nextIdx]) {
				nextIdx = 0;
			}
			this.activeImprovementIdx(nextIdx);
			trackAnimation(CAROUSEL_SLIDE_DURATION);
		};

		this.showPrevious = function() {
			if (this.isAnimating) {
				return;
			}
			var prevIdx = this.activeImprovementIdx() - 1;

			if (prevIdx < 0) {
				prevIdx = this.improvements().length - 1;
			}
			this.activeImprovementIdx(prevIdx);
			trackAnimation(CAROUSEL_SLIDE_DURATION);
		};

		this.isAnimating = false;
	}

	function ImprovementViewModel(improvementDataDefName, idx, data, primaryVm) {
		var activePanelIconSrc = environment.coachingMediaPath + "smokingCessationCarouselActiveIcon.svg";
		var inactivePanelIconSrc = environment.coachingMediaPath + "smokingCessationCarouselInactiveIcon.svg";
		this.seenCheckboxSeenSrc = environment.coachingMediaPath + "icons/Completed_Fill_1x.svg";
		this.seenCheckboxNotSeenSrc = environment.coachingMediaPath + "icons/In-Progress_1x.svg";
		this.seenCheckboxHoverSrc = environment.coachingMediaPath + "icons/Completed_Stroke_1x.svg";
		var nameFragment = improvementDataDefName.replace('SmokingImpact','').toLowerCase();
		var preQuitImprovementImgSrc = environment.coachingMediaPath +
			"icons/breathe/pre/" + nameFragment + '.svg';
		var postQuitImprovementImgSrc = environment.coachingMediaPath +
			"icons/breathe/post/" + nameFragment + '.svg';

		var textContent = data.textContent.smokingCessationCoachingTool;

		this.dataDef = ko.observable(improvementDataDefName);
		this.isActive = ko.computed(function() {
			return idx === primaryVm.activeImprovementIdx();
		});
		this.isNext = ko.computed(function() {
			return idx === (primaryVm.activeImprovementIdx() + 1) % primaryVm.improvements().length;
		});
		this.isPrevious = ko.computed(function() {
			var isLast = (idx === primaryVm.improvements().length - 1);
			return idx === primaryVm.activeImprovementIdx() - 1 ||
				(primaryVm.activeImprovementIdx() === 0 && isLast);
		});
		this.showImprovementSeenQuestion = ko.observable(data.isPostQuit);
		this.isSeen = ko.observable(data.improvements[improvementDataDefName]);
		this.isSeenCheckboxHover = ko.observable(false);
		this.name = textContent[improvementDataDefName + "ImprovementName"];

		this.navIconSrc = ko.computed(function() {
			return this.isActive() ? activePanelIconSrc : inactivePanelIconSrc;
		}, this);

		this.panelIndicatorIconSrc = ko.computed(function() {
			if (this.isSeen()) {
				return postQuitImprovementImgSrc;
			} else {
				return preQuitImprovementImgSrc;
			}
		},this);

		if (data.isPostQuit) {
			this.description = textContent[improvementDataDefName +
			"ImprovementPostQuitDescription"];
		} else {
			this.description = textContent[improvementDataDefName +
			"ImprovementPreQuitDescription"];
		}
	}

	$.widget("wnp.coachingSmokingCessationWidget", $.wnp.baseWidget, {
		_widgetClass: "smokingCessationWidget",
		options: {
			initialView: "main",
			enrollmentId: null,
			loadingSpinner: true
		},
		_beforeFetchData: function() {
			if (!this.options.enrollmentId) {
				throw "SmokingCessationWidget requires an enrollmentId";
			}
		},
		_createDom: function() {
			this._log("SmokingCessation._create called", arguments);
			this._setDom(Templates.smokingCessationWidget(this.data.textContent));
			this.setPrimaryViewModel(new SmokingCessationViewModel(this.data));

			ko.applyBindings(this.primaryVm, this.element[0]);
			this._bindEventHandlers();
		},
		_fetchData: function() {
			var improvementsDataPromise = this.services.userData.getHistoricDataByEnrollment(
				improvementDataDefs, this.options.enrollmentId);
			var quitDatePromise = this.services.userData.getHistoricData(["QuitDate"]);
			var bundlePromise = this.services.resourceBundle.getResourceBundles(
				["common","coachingTools","smokingCessationCoachingTool"]);
			var feedbackPromise =
				this.services.toolFeedback.getFeedback("smokingCessationCoachingTool");

			var deferred = new $.Deferred();
			$.when(improvementsDataPromise, quitDatePromise, bundlePromise, feedbackPromise)
				.done(function(improvementsData, quitDateData, bundleData, toolFeedbackData) {
					var data = {
						improvements: improvementsData && improvementsData.model,
						quitDate: quitDateData && quitDateData.model,
						resourceBundle: bundleData.model,
						feedback: toolFeedbackData && toolFeedbackData.model
					};
					deferred.resolve(data);
				}).fail(function(response) {
					deferred.reject(response);
				});

			return deferred.promise();
		},
		_processData: function(data) {
			var improvements = {};
			improvementDataDefs.forEach(function(improvement) {
				improvements[improvement] = !!data.improvements[improvement].length;
			});
			var feedbackObject = data.feedback.feedback[0];
			var rawQuitDate = data.quitDate.QuitDate[0].value;
			// quitDate format is 'YYYY-MM-DD HH:mm:ss TMZ' and TMZ is
			// not supported by FF's date parser
			var quitDateDate = rawQuitDate.split(' ')[0];
			var quitDate = new Moment(quitDateDate);

			this.data = {
				textContent: data.resourceBundle,
				improvements: improvements,
				// post quit excludes the quit day itself
				isPostQuit: new Moment().startOf('day') > quitDate.startOf('day'),
				feedback: feedbackObject ? feedbackObject.content : null
			};
		},

		_updateSlipTrackingMessage: function() {
			var self = this;
			this.services.toolFeedback.getFeedback("smokingCessationCoachingTool")
				.done(function(feedback) {
					var feedbackItem = feedback.model.feedback[0];
					var feedbackContent = feedbackItem && feedbackItem.content;
					self.primaryVm.slipTrackingSubmissionInProgress(false);
					self.primaryVm.slipTrackingFeedback(feedbackContent);
				});
		},

		_updateSlipTrackingQuestion: function() {
			var self = this;
			var value = $('.slipTrackingQuestion input[name=slipTrackingQuestion]:checked').val();
			var dataDefs = [{
				DataDefinitionName:"SmokedSinceLastTimeInProgram",
				DataSourceName: "smokingCessationSkillsTool",
				Values: [value]
			}];
			this.primaryVm.slipTrackingSubmissionInProgress(true);
			this.services.userData.postData(dataDefs)
				.done(function(response) {
					self._updateSlipTrackingMessage();
				});
		},

		_bindEventHandlers: function() {
			var self = this;

			function addUnderline($element) {
				if(!$element.find("div.underlineAnswer").length) {
					$element.append('<div class="underlineAnswer c3-border-color c3-background-color"></div>');
				}
			}

			this.element.on("click", ".slipTrackingQuestion label", function(event) {
				event.preventDefault();
				$(this).find("input").prop("checked", true);
				$(this).addClass("selected c5-color");
				addUnderline($(this));
				$(this).siblings("label").removeClass("selected c3-color");
				$(this).siblings("label").find("div.underlineAnswer").remove();
				$(this).siblings("label").find("input").removeAttr("checked");
				self._updateSlipTrackingQuestion();
			});

			if ($('html').hasClass('no-touch')) {
				this.element.find(".slipTrackingQuestion label").hover(
					function() {
						addUnderline($(this));
						$(this).addClass("c3-color");
					}, function() {
						if(!$(this).hasClass("selected")) {
							$(this).find("div.underlineAnswer").remove();
							$(this).removeClass("c3-color");
						}
				});
			}

			this.element.on("click", "[data-bindpoint=improvementSeenCheckbox]", function() {
				var activeImprovement = self.primaryVm.activeImprovement();
				if (!activeImprovement.isSeen()) {
					self._postImprovementSeen(activeImprovement);
				}
			});
		},

		_postImprovementSeen: function(improvementVm) {
			improvementVm.isSeen(true);

			this.services.userData.postData([{
				DataDefinitionName: improvementVm.dataDef(),
				DataSourceName: "smokingCessationSkillsTool",
				Values: ["true"]
			}], this.options.enrollmentId).fail(function() {
				improvementVm.isSeen(false);
			});
		}

	});

	return function CoachingSmokingCessationWidget(target, options) {
		return $(target).coachingSmokingCessationWidget(options).data("wnpCoachingSmokingCessationWidget");
	};

});
