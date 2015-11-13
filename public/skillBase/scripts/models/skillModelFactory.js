/*global define, WNP*/
define('skillModelFactory', [
	'jquery',
	'knockout',
	'SkillModel'
], function($, ko, SkillModel) {
	"use strict";

	// TODO: remove this poly fill
	if (!Object.create) {
		Object.create = (function(){
			function F(){}

			return function(o){
				if (arguments.length !== 1) {
					throw new Error('Object.create implementation only accepts one parameter.');
				}
				F.prototype = o;
				return new F();
			};
		})();
	}

	var skillModelFactory = {
		services: undefined,
		fetchSkillPlan: function(enrollmentId) {
			var self = this;

			if (!self.services) {
				if (!WNP) {
					return console.warn("" +
						"Your application needs to be bootstrapped before you can use SkillModelFactory service methods"
					);
				}
				self.services = WNP.servicesSingleton.services;
			}
			var skillPromise = this.services.skill.getSkills(enrollmentId);
			var skillPlanPromise = this.services.skillPlan.getSkillPlan(enrollmentId);
			var actionStepsPromise = this.services.actionStep.getActionSteps(enrollmentId);
			var actionItemPromise = this.services.actionitem.getActionItems();

			var deferred = new $.Deferred();

			$.when(
				skillPromise,
				skillPlanPromise,
				actionStepsPromise,
				actionItemPromise
			).then( function(
				skillResponse,
				skillPlanResponse,
				actionStepsResponse,
				actionItemResponse
			) {
				skillResponse = skillResponse.model;
				skillPlanResponse = skillPlanResponse.model;

				// actionItem returns an incomplete list of actionSteps
				// where actionStep returns a full list with fewer properties per action step
				// the following algorithm consolidates missing action steps in actionItem from actionStep.
				// without duplicating them
				var missingActionSteps = actionStepsResponse.model.actionStep.filter(function (actionStep) {
					var match;
					actionItemResponse.model.actionItem.forEach(function (actionItem) {
						if (actionStep.id === actionItem.id) {
							match = true;
						}
					});
					return !match;
				});

				actionStepsResponse.model.actionStep = actionItemResponse.model.actionItem.concat(missingActionSteps);
				actionStepsResponse = actionStepsResponse.model;
				var skills = self._processSkillData( skillResponse, skillPlanResponse, actionStepsResponse );
				var skillModels = skills.map(function(skill) {
					return new SkillModel(skill);
				});

				deferred.resolve({
					skills: skillModels,
					goalContent: skillPlanResponse.goal,
					nextSkillDate: skillPlanResponse.nextSkillDate
				});
			}, function(skillResponse, skillPlanResponse, actionStepsResponse) {
				deferred.reject({
					skill: skillResponse,
					skillPlan: skillPlanResponse,
					actionSteps: actionStepsResponse
				});
			});

		return deferred.promise();
		},
		fetchSkills: function(enrollmentId) {
			var deferred = new $.Deferred();

			this.fetchSkillPlan(enrollmentId)
				.done(function(fetchedSkillData) {
					deferred.resolve(fetchedSkillData.skills);
				}).fail(function(response) {
					deferred.reject(response);
				});

			return deferred.promise();
		},
		fetchSkill: function(skillId, enrollmentId) {
			var deferred = new $.Deferred();
			(function BADrequestService (increment) {
				// populate increment
				increment = increment || 0;
				this.fetchSkillPlan(enrollmentId).done(function(fetchedSkillData) {
					var matchedSkill = null;
					if (typeof fetchedSkillData.skills === "undefined") {
						if (increment > 3) {
							window.setTimeout(new BADrequestService(increment+1), 5000 );
						} else {
							deferred.reject();
						}
					} else {
						fetchedSkillData.skills.forEach(function(skill) {
							if (skill.id === skillId) {
								matchedSkill = skill;
							}
						});
						deferred.resolve(matchedSkill);
					}
				}).fail(function(response) {
					// handle timed recursion
					if (increment > 3) {
						window.setTimeout(new BADrequestService(increment+1), 5000 );
					} else {
						deferred.reject();
					}
				});
			}());
			return deferred.promise();
		},
		createViewModel: function(skillModel) {
			/*
				Use the original model object as the prototype, so that any changes
				to the original object will be updated, but that any additions to
				that object won't appear on other views.

				IMPORTANT: Won't work if we're adding and removing items from the child arrays.
			 */

			var vm = Object.create(skillModel);
			var actionSteps = ko.utils.unwrapObservable(skillModel.actionSteps);
			vm.actionSteps = actionSteps.map(function(actionStep) {
				return Object.create(actionStep);
			});
			return vm;
		},


		_processSkillData: function(skillResponse, skillPlanResponse, actionStepsResponse) {
			var mappedSkillServiceData = {};
			skillResponse.skill.forEach(function(skillServiceSkill) {
				mappedSkillServiceData[skillServiceSkill.id] = {
					enrollmentId: skillServiceSkill.enrollmentId,
					seen: skillServiceSkill.seen,
					priorityOrder: skillServiceSkill.priorityOrder,
					actionSteps: []
				};
			});

			actionStepsResponse.actionStep.forEach(function(actionStep) {
				// the available actionSteps may not be on the current set of skills
				if (mappedSkillServiceData[actionStep.skillId]) {
					mappedSkillServiceData[actionStep.skillId].actionSteps.push(actionStep);
				}
			});

			var skills = [];
			skillPlanResponse.skill.forEach(function(skillPlanServiceSkill) {
				skills.push($.extend(
					{},
					skillPlanServiceSkill,
					mappedSkillServiceData[skillPlanServiceSkill.id]
				));
			});
			return skills;
		}

	};

	return skillModelFactory;
});
