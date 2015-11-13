/*global define, environment*/

define('skillsAndActionSteps', [
	'jquery',
	'knockout',
	'skillModelFactory',
	'colorUtils',
	'skillsAndActionStepsTemplates',
	'modernizr',
	'moment',
	'skillDetail',
	'headerNavigationBar',
	'actionStepCompletionOverlay',
	'coachingWeightWidget',
	'coachingDepressionWidget',
	'coachingPhysicalActivityWidget',
	'coachingChronicConditionWidget',
	'coachingDiabetesWidget',
	'coachingStressWidget',
	'coachingSmokingCessationWidget',
	'coachingSleepTrackerWidget',
	'actionStepMessagingAreaWidget',
	'googleAnalytics',
	'onWindowResize',
	'modernizrCsscalc',
	'baseWidget', // provides $.wnp.baseWidget
	'skillIcon', // provides $.skillIcon and ko skillIcon binding
	'modal', // provides $.modal and ko modal binding
	'moreExpando', // provides $.moreExpando and ko moreExpando binding
	'slimScroll', // provides $.slimScroll
	'initializeSlimScroll', // initialize a slimScroll widget with app defaults
	'errorModal', // provides $.errorModal
	'skillBaseTemplates' // provides the _accessibleSkillIcon Handlebars partial
], function(
	$,
	ko,
	skillModelFactory,
	colorUtils,
	templates,
	Modernizr,
	moment,
	WnpSkillDetailWidget,
	WnpHeaderNavigationBar,
	WnpActionStepCompletionOverlay,
	CoachingWeightWidget,
	CoachingDepressionWidget,
	CoachingPhysicalActivityWidget,
	CoachingChronicConditionWidget,
	CoachingDiabetesWidget,
	CoachingStressWidget,
	CoachingSmokingCessationWidget,
	coachingSleepTrackerWidget,
	ActionStepMessagingAreaWidget,
	gAnalytics,
	onWindowResize
) {
	"use strict";
	require(['jquery-ui']); //provides $.widget

	function SkillsAndActionStepsBaseViewModel(activeView, programNaming, textContent, hasTool) {
		this.activeView = ko.observable(activeView);
		this.programName = ko.observable(programNaming.keyName);
		this.programShortName = ko.observable(programNaming.shortName);
		this.programLongName = ko.observable(programNaming.longName);
		this.textContent = textContent;
		this.menuSkillsLabel = textContent.skillDetail[programNaming.keyName + 'MenuSkillsLabel'];
		this.menuStatusLabel = textContent.skillDetail[programNaming.keyName + 'MenuStatusLabel'];
		this.supportsMediaQueries = Modernizr.mq('only all');
		this.hasTool = hasTool;
	}

	function SkillsViewModel(skills, productName, textContent, nextSkillDate,
			companyConfig) {
		var self = this;
		this.skills = ko.observableArray(skills.map(function (skill) {
			var skillVm = skillModelFactory.createViewModel(skill);
			skillVm.isActivated = ko.observable(false);
			skillVm.someActive = ko.computed(function () {
				return skillVm.activeCount() > 0;
			});
			skillVm.singletonCompleted = ko.computed(function () {
				return skillVm.activeCount() === 0 &&
					skillVm.completedCount() === 1;
			});
			skillVm.allCompleted = ko.computed(function () {
				return skillVm.activeCount() === 0 &&
					skillVm.completedCount() > 0;
			});
			skillVm.noActivity = ko.computed(function() {
				return skillVm.activeCount() === 0 && skillVm.completedCount() === 0;
			});

			skillVm.skillCardSelectedDescription = ko.computed(function () {
				if (skillVm.singletonCompleted()) {
					return textContent.planSkillPage.skillCardSelectedDescriptionSingletonComplete;
				}
				if (skillVm.allCompleted()) {
					return textContent.planSkillPage.skillCardSelectedDescriptionAllCompletePrefix +
						" " + skillVm.completedCount() + " " +
						textContent.planSkillPage.skillCardSelectedDescriptionAllCompleteSuffix;
				}
				if (skillVm.someActive()) {
					return textContent.planSkillPage.skillCardSelectedDescriptionSomeActive;
				}
				return skillVm.description();
			});

			skillVm.viewSkillDetailsBtnText = ko.computed(function () {
				if (skillVm.allCompleted()) {
					return textContent.planSkillPage.skillCardSelectedButtonTextAllComplete;
				}
				if (skillVm.someActive()) {
					return textContent.planSkillPage.skillCardSelectedButtonTextSomeActive;
				}
				return textContent.planSkillPage.skillCardSelectedButtonText;
			});

			return skillVm;
		}));

		this.nextSkillIsActivated = ko.observable(false);
		this.nextSkillDate = ko.observable(nextSkillDate);
		this.nextSkillDateFormatted = ko.computed(function (){
			var skillDate=moment(self.nextSkillDate()); // ISO 8601 date format
			if(skillDate.isValid()){
				return skillDate.format("MM.DD.YY");
			}
			return nextSkillDate;
		});
		this.nextSkillIcon = ko.observable(
			environment.coachingMediaPath + "/skill_icons/" + (Modernizr.svg ? "Skill_Next.svg" : "Skill_Next.png")
		);

		this.hasCssCalcSupport = ko.observable(Modernizr.csscalc);
		this.hasCanvasSupport = ko.observable(Modernizr.canvas);
		this.primaryColor = ko.observable(
			colorUtils.getPrivateLabelColor(3, productName, companyConfig));
	}


	$.widget("wnp.skillsAndActionSteps", $.wnp.baseWidget, {
		_widgetClass: "skillsAndActionSteps",
		options: {
			initialView: "skills",
			programName: "",
			close: true,
			destroyContainer: true,
			classNames: 'hasTitleBar'
		},
		_setupAnalytics: function() {
			var questionnaireId = this.options.programName;
			/*jshint camelcase: false */
			var analyticsOptions = {
				default_action: questionnaireId,
				default_category: "SkillsAndActionSteps"
			};
			/*jshint camelcase: true */
			gAnalytics.init(analyticsOptions);
			gAnalytics.track('initSkillsAndActionSteps');
		},
		_destroy: function() {
			this._log("skillsAndActionSteps._destroy called", arguments);
			this._superApply(arguments);
		},
		_beforeFetchData: function() {
			this._log("skillsAndActionSteps._beforeFetchData called", arguments);
		},
		_fetchData: function() {
			var self = this;
			this._log("skillsAndActionSteps._fetchData called", arguments);
			var deferred = new $.Deferred();

			var resourcePromise = self.services.resourceBundle.getResourceBundles([
				"common", "skillDetail", "planGlobal", "planSkillPage",
				"planGoalPage", "planActionStepsPage", "linkMobileAppActionSteps"
			]);

			this.services.enrollment.getLatestEnrollments()
				.done(function(response) {
					var enrollmentId = response.model[self.options.programName];

					var skillModelPromise = skillModelFactory.fetchSkillPlan(enrollmentId);

					$.when(skillModelPromise, resourcePromise)
						.done(function(skillPlanData, resourceData) {
							var data = {
								textContent: resourceData,
								enrollmentId: enrollmentId,
								skillData: skillPlanData
							};

							deferred.resolve(data);
						}).fail(function(skillModels, resourceData) {
							deferred.reject({
								skillModels: skillModels,
								resourceData: resourceData
							});
						});

				}).fail(function(response) {
					self._log("getEnrollments failed", arguments);
					deferred.reject(response);
				});

			return deferred.promise();
		},
		_fetchFail: function(response) {
			this._log("skillsAndActionSteps._fetchFail called", arguments);
			this._triggerGlobalFailure(response);
		},
		_processData: function(data) {
			this._log("skillsAndActionSteps._processData called", arguments);

			this.data = {
				enrollmentId: data.enrollmentId,
				textContent: data.textContent.model,
				skills: data.skillData.skills,
				goalContent: data.skillData.goalContent,
				nextSkillDate: data.skillData.nextSkillDate
			};
		},
		_isSkillsToolConfigEnabled: function() {
			var toolName = this.options.programName.substring(0,1).toUpperCase() +
				this.options.programName.substring(1) + "Tool";

			// The value of `enabled` _is_ a string
			return this.companyConfig.features[toolName] &&
				this.companyConfig.features[toolName].enabled === "true";
		},
		_createDom: function() {
			var self = this;
			this._log("skillsAndActionSteps._createDom called", arguments);
			this._setDom(templates.skillsAndActionSteps(this.data.textContent));

			// VIEW MODELS

			var renames = this.companyConfig.features.ProductRenaming;
			var programNaming = {
				keyName: this.options.programName,
				shortName: renames ? renames[this.options.programName+"ShortName"] : "",
				longName: renames ? renames[this.options.programName+"LongName"] : ""
			};
			this.setPrimaryViewModel(new SkillsAndActionStepsBaseViewModel(
				this.options.initialView, programNaming, this.data.textContent, this._isSkillsToolConfigEnabled()));
			ko.applyBindings(this.primaryVm, this.element[0]);

			var goalViewEl = $(templates.goalView(this.data.textContent));
			this.addView({}, goalViewEl, "main");

			this.skillsVm = new SkillsViewModel(this.data.skills,this.options.programName,
				this.data.textContent, this.data.nextSkillDate, this.companyConfig);
			var skillsViewEl = $(templates.skillsView(this.data.textContent));
			this.addView(this.skillsVm, skillsViewEl, "main");

			this._displayCoachingTools();

			// handle all main menu links
			this.element.find(".gsa-links a").on("click", function() {
				var viewName = $(this).attr("data-target-view");
				gAnalytics.track(viewName+'LeftNav');
				self.primaryVm.activeView(viewName);
				self.display(viewName);
			});

			this._handleSizing();
			this._loadMessageArea();
			this._bindSkillViewEvents();
			this._bindActionStepEvents();
			this._setupHeaderNavBar();
			this._setupAnalytics();
		},
		_loadMessageArea: function() {
			this.actionStepMessagingAreaWidget = new ActionStepMessagingAreaWidget(".messagingAreaWidget", {
				config: this.options.config,
				skillsList: this.data.skills,
				programName: this.options.programName,
				enrollmentId: this.data.enrollmentId
			});
		},
		_displayCoachingTools: function() {
			var self = this;
			var table = {
				"weightSkills": CoachingWeightWidget,
				"chronicConditionSkills": CoachingChronicConditionWidget,
				"depressionSkills": CoachingDepressionWidget,
				"physicalActivitySkills": CoachingPhysicalActivityWidget,
				"diabetesSkills": CoachingDiabetesWidget,
				"stressSkills": CoachingStressWidget,
				"smokingCessationSkills": CoachingSmokingCessationWidget,
				"sleepSkills": coachingSleepTrackerWidget
			};
			var WidgetConstructor = table[self.options.programName];

			if (this._isSkillsToolConfigEnabled()) {
				self.coachingToolWidget = new WidgetConstructor(".goalWidget", {
					config: this.options.config,
					enrollmentId: this.data.enrollmentId
				});
			}

		},

		_handleSizing: function() {
			var self = this;

			onWindowResize(function() {
				setTimeout(function() {
					self._resizeElement();
				});
			});
			self._resizeElement();
		},
		_resizeElement: function() {
			this.element.css({
				width: $(window).width(),
				height: $(window).height()
			});
		},
		_bindSkillViewEvents: function() {
			var self = this;
			this.element.on("mouseenter mouseleave focusin focusout", ".skill", function(event) {
				if ($(window).width() < 768) {
					return;
				}
				var skillEl = this;
				var skillId = $(this).closest("[data-skillId]").attr("data-skillId");
				var isActivating = ["mouseenter", "click", "focusin"].indexOf(event.type) > -1;

				if(skillId === "next") {
					self.skillsVm.nextSkillIsActivated(isActivating);
				} else {
					var skillModel = getSkillModel(+skillId, self.skillsVm);
					skillModel.isActivated(isActivating);
					setTimeout(function() {
						skillEl.scrollTop = 0; // suppress scroll-to-focus behavior
					}, 0);
				}
			});
			this.element.on("click keypress", ".viewSkillDetailsBtn button", function(event) {
				if (event.type === "click" || (event.type === "keypress" &&
						["13", "32"].indexOf(event.charcode) > -1)) {

					var skillId = +($(this).closest("[data-skillId]").attr("data-skillId"));
					self._createSkillDetailWidget(skillId, false);
					gAnalytics.track('ViewSkill'+skillId);
				}
			});

			this.element.on("click", ".skill", function(event) {
				if ($(window).width() > 767) {
					return;
				}
				var skillId = +($(this).closest("[data-skillId]").attr("data-skillId"));
				self._createSkillDetailWidget(skillId, false);
				gAnalytics.track('ViewSkill'+skillId);
			});

		},
		_bindActionStepEvents: function() {
			var self = this;
			this.element.find("[data-view=actionSteps]")
				.on("click", ".actionStepsGetStarted button", function() {
					self.primaryVm.activeView("skills");
					self.display("skills");
				});

			this.element.find("[data-view=actionSteps]")
				.on("click", ".skillIcon, .addActionStepBtn", function() {
					var skillId = +($(this).closest("[data-skillId]").attr("data-skillId"));
					self._createSkillDetailWidget(
						skillId,
						$(this).hasClass("addActionStepBtn")
					);
				});

			this.element.on("mousedown", ".appleButton", function(event) {
				gAnalytics.track('TrackYourHealthAppleButton');
			});

			this.element.on("mousedown", ".googleButton", function(event) {
				gAnalytics.track('TrackYourHealthGoogleButton');
			});

			//Complete an action step from Program Todo List
			this.element.find("[data-view=actionSteps]")
				.on("click", ".actionStepListPoint", function() {
					var actionStepId = +($(this).closest("[data-actionStepId]").attr("data-actionStepId"));
					var skillId = +($(this).closest("[data-skillId]").attr("data-skillId"));

					gAnalytics.track('completeActionStep'+actionStepId);
					var actionStepModel = getActionStepModel(actionStepId, self.actionStepsVm);
					var skillModel = getSkillModel(skillId, self.skillsVm);

					self.services.actionStep.completeActionStep(actionStepId)
						.done(function(response) {
							self._log("POST completed action step succeeded", arguments);

							actionStepModel.event(response.model.actionStep.event);
							self.actionStepCompletionOverlay.show(skillModel, actionStepId);
						})
						.fail(function(response) {
							self._triggerGlobalFailure(response);
						});
				});

			//Remove an action step from Program Todo List without completing it
			this.element.find("[data-view=actionSteps]")
				.on("click", ".actionStepRemove", function() {
					var actionStepId = +($(this).closest("[data-actionStepId]").attr("data-actionStepId"));
					gAnalytics.track('removeActionStep'+actionStepId);
					var actionStepModel = getActionStepModel(actionStepId, self.actionStepsVm);
					self.services.actionStep.removeActionStep(actionStepId)
						.done(function(response) {
							self._log("POST removed action step succeeded", arguments);
							actionStepModel.event(response.model.actionStep.event);
						})
						.fail(function(response) {
							self._triggerGlobalFailure(response);
						});
				});

			//add link code generation to button click on linkMobile action step type
			this.element.on('click','.tyhProgramToDoList .linkMobileBtn',function(event) {
				var $btn = $(event.currentTarget);
				var actionStepId = +($btn.closest('[data-actionstepid]').attr('data-actionstepid'));
				var actionStep = getActionStepModel(actionStepId, self.actionStepsVm);
				self.services.authorizationCode.requestAuthorizationCode().done(function(response) {
					/* jshint camelcase: false */
					actionStep.linkCode(response.authorization_code);
					/* jshint camelcase: true */
				});
			});
		},

		_setupHeaderNavBar: function() {
			var target = $("<div></div>");
			this.element.prepend(target);
			this.headerNavBar = new WnpHeaderNavigationBar(target, {
				config: this.options.config,
				debug: this.options.debug,
				widgetTitle: this.companyConfig.features.ProductRenaming[this.options.programName+"LongName"]
			});
		},

		_createSkillDetailWidget: function(skillId, openAtActionSteps) {
			openAtActionSteps = openAtActionSteps || null;
			WnpSkillDetailWidget = WnpSkillDetailWidget || require('skillDetail');
			// var skillModel = getSkillModel(skillId, this.skillsVm);
			var skillDetailRoot = $("<div>").appendTo("body");
			this.skillDetailWidget = new WnpSkillDetailWidget(
				skillDetailRoot, {
					openAtActionSteps: openAtActionSteps,
					// textContent: this.data.textContent,
					// enrollmentId: this.data.enrollmentId,
					// programName: this.options.programName,
					skillId: skillId,
					config: this.options.config,
					refreshOnClose: this.options.refreshOnClose
				}
			);
		},
		_triggerGlobalFailure: function(response) {
			this.element.errorModal({
				textContent: this.data && this.data.textContent
			});
			var responseDesc = response.model ? response.model.responseDesc : "";
			this._log("Failure: " + responseDesc, arguments);
		}
	});

	function getActionStepModel(actionStepId, source) {
		var matchedActionStep = null;
		source.skills().forEach(function(skill) {
			skill.actionSteps.forEach(function(actionStep) {
				if (actionStep.id() === actionStepId) {
					matchedActionStep = actionStep;
				}
			});
		});
		return matchedActionStep;
	}
	function getSkillModel(id, source) {
		var matchedSkill = null;
		// Skills may be an observableArray or just an array, depending on the source
		ko.unwrap(source.skills).forEach(function(skill) {
			if (skill.id() === id) {
				matchedSkill = skill;
			}
		});
		return matchedSkill;
	}

	return function WnpSkillsAndActionStepsWidget(target, options) {
		return $(target).skillsAndActionSteps(options).data("wnpSkillsAndActionSteps");
	};

});
