/*global define,environment*/
define('SkillModel', [
	'knockout',
	'modernizr'
], function(ko, Modernizr) {
	"use strict";

	var skillCache = {};
	var actionStepCache = {};

	// SkillModel is returned
	function SkillModel(skillData) {
		var cachedSkill = skillCache[skillData.id];
		if (cachedSkill) {
			// function used before defined in reading order.
			updateSkillModelValues(cachedSkill, skillData);
			return cachedSkill;
		}

		var self = this;
		this.actionSteps = ko.observableArray();
		this.content = ko.observableArray();
		this.description = ko.observable();
		this.contentBlocks = ko.observableArray();
		this.property = ko.observableArray();
		this.id = ko.observable();
		this.enrollmentId = ko.observable();
		this.name = ko.observable();
		this.displayName = ko.observable();
		this.priorityOrder = ko.observable();
		this.seen = ko.observable();

		// function used before defined in reading order.
		updateSkillModelValues(this, skillData);

		this.activeCount = ko.computed(function() {
			var activeSteps = 0;

			self.actionSteps().forEach(function(actionStep) {
				if (actionStep.event() === actionStep.STARTED_ACTION_STEP_EVENT) {
					activeSteps += 1;
				}
			});
			return activeSteps;
		});
		this.completedCount = ko.computed(function() {
			var completedSteps = 0;
			self.actionSteps().forEach(function(actionStep) {
				if (actionStep.event() === actionStep.COMPLETED_ACTION_STEP_EVENT) {
					completedSteps += 1;
				}
			});
			return completedSteps;
		});

		this.icon = ko.computed(function() {
			return environment.coachingMediaPath + "/skill_icons/" + self.name() + (Modernizr.svg ? "Icon.svg" : "Icon.png");
		});

		skillCache[skillData.id] = this;
	}

	function updateSkillModelValues(skillModel, skillData) {
		skillModel.actionSteps(skillData.actionSteps.map(function(actionStep) {
			return new ActionStepModel(actionStep);
		}));
		skillModel.content(skillData.content);
		skillModel.description(skillData.description);
		skillModel.contentBlocks(skillData.contentBlocks);
		skillModel.property(skillData.property);
		skillModel.id(skillData.id);
		skillModel.enrollmentId(skillData.enrollmentId);
		skillModel.name(skillData.name);
		skillModel.displayName(skillData.displayName);
		skillModel.priorityOrder(skillData.priorityOrder);
		skillModel.seen(skillData.seen);
	}

	// prototype modification outside of class definition
	// if this is required it belongs in a factory
	ActionStepModel.prototype.NOT_STARTED_ACTION_STEP_EVENT = "NOT_STARTED";
	ActionStepModel.prototype.STARTED_ACTION_STEP_EVENT = "STARTED";
	ActionStepModel.prototype.COMPLETED_ACTION_STEP_EVENT = "COMPLETED";
	ActionStepModel.prototype.THUMBS_UP = "THUMBS_UP";
	ActionStepModel.prototype.THUMBS_DOWN = "THUMBS_DOWN";

	// confusing scope: SkillModel lives here alongside ActionStepModel and prototype modifications
	function ActionStepModel(actionStepData) {

		var cachedActionStep = actionStepCache[actionStepData.id];
		if (cachedActionStep) {
			updateActionStepModelValues(cachedActionStep, actionStepData);
			return cachedActionStep;
		}

		this.type = ko.observable();
		this.completionText = ko.observable();
		this.completionTextHeader = ko.observable();
		this.defaultPriority = ko.observable();
		this.description = ko.observable();
		this.contentBlocks = ko.observable();
		this.property = ko.observable();
		this.enrollmentId = ko.observable();
		this.event = ko.observable();
		this.id = ko.observable();
		this.name = ko.observable();
		this.priority = ko.observable();
		this.rating = ko.observable();
		this.skillId = ko.observable();
		this.title = ko.observable();

		// Properties for linkMobileApp-type ActionSteps
		this.appleStoreUrl = ko.observable();
		this.googleStoreUrl = ko.observable();

		// used before definition in reading order
		updateActionStepModelValues(this, actionStepData);

		this.appleIconSrc = ko.computed(function(){
			return environment.coachingMediaPath + 'Mobile_AppStore.png';
		});
		this.googleIconSrc = ko.computed(function(){
			return environment.coachingMediaPath + 'Mobile_GooglePlay.png';
		});

		// linkCode is generated via a lazy service call and not initially populated
		this.linkCode = ko.observable(null);

		actionStepCache[actionStepData.id] = this;
	}

	function updateActionStepModelValues(actionStepModel, actionStepData) {
		actionStepModel.type(actionStepData.type);
		actionStepModel.completionText(actionStepData.completionText);
		actionStepModel.completionTextHeader(actionStepData.completionTextHeader);
		actionStepModel.defaultPriority(actionStepData.defaultPriority);
		actionStepModel.description(actionStepData.description);
		actionStepModel.contentBlocks(actionStepData.contentBlocks);
		actionStepModel.property(actionStepData.property);
		actionStepModel.enrollmentId(actionStepData.enrollmentId);
		actionStepModel.event(actionStepData.event);
		actionStepModel.id(actionStepData.id);
		actionStepModel.name(actionStepData.name);
		actionStepModel.priority(actionStepData.priority);
		actionStepModel.rating(actionStepData.rating);
		actionStepModel.skillId(actionStepData.skillId);
		actionStepModel.title(actionStepData.title);

		// Properties for linkMobileApp-type ActionSteps
		actionStepModel.appleStoreUrl(actionStepData.property && actionStepData.property.appleStoreUrl);
		actionStepModel.googleStoreUrl(actionStepData.property && actionStepData.property.googleStoreUrl);
	}

	return SkillModel;
});
