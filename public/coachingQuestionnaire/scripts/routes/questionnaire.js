define([
		'ember',
		'coachingQuestionnaire/scripts/adapters/configurable-available-products-service',
		'coachingQuestionnaire/scripts/adapters/configurable-questionnaire-service',
		'coachingQuestionnaire/scripts/utils/skills-and-action-steps-launcher'
	], function(
		Ember,
		AvailableProductsServiceInstance,
		QuestionnaireServiceInstance,
		launchSkillsAndActionSteps
	) {
		'use strict';

		return Ember.Route.extend({
			previousTransition: null,
			beforeModel: function(transition) {
				this.container.lookup('route:application').set('previousTransition', transition);
			},
			model: function(params) {
				var self = this;

				return AvailableProductsServiceInstance.availableProduct(params.questionnaireId)
					.then(function(questionnaire) {

						if (questionnaire.status === 'QUESTIONNAIRE_FINISHED' &&
								!questionnaire.retakeAvailable) {

							self.transitionTo('done');
							launchSkillsAndActionSteps();
							return;
						}

						return new Ember.RSVP.Promise(function(resolve, reject) {
							QuestionnaireServiceInstance.getAllThePages(questionnaire)
								.then(function(questionnairePage) {
									resolve(questionnaire);
								})
								.then(null, reject);
						});
					});
			}
		});
	}
);
