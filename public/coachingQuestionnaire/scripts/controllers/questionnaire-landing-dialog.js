define([
		'ember',
		'jquery',
		'coachingQuestionnaire/scripts/utils/skills-and-action-steps-launcher'
	], function(
		Ember,
		$,
		launchSkillsAndActionSteps
	) {
		'use strict';

		return Ember.ObjectController.extend({
			longName: null,
			retakeAvailable: null,
			initiateRetakeFn: null,
			retakeContext: null,
			retakeRequested: false,
			upgradePathApplicable: null,
			upgradePathQuestionnaireStarted: null,
			upgradePathQuestionnaireFinished: null,
			upgradePathRetakeAvailable: null,
			upgradePathCombinedProduct: null,
			init: function() {
				this._super();
			},

			slimScroll: function() {
				$('.modal-dialog')
					.outerWidth('100%');
			},

			actions: {
				retakeQuestionnaire: function() {
					var self = this;

					if (!this.get('retakeRequested') && this.doesExist(this.get('initiateRetakeFn'))) {
						this.set("retakeRequested", true);
						var retakePromise =
							this.get('initiateRetakeFn').call(this.get('retakeContext'));
						retakePromise.then(function() {
							self.set("retakeRequested", false);
							self.send('closeDialog');
						});
					}
				},
				continueQuestionnaire: function() {
					this.send('closeDialog');
					if (!this.get('retakeContext').get('isInProgress')) {
						this.transitionTo('done');
						launchSkillsAndActionSteps();
					}
				}
			}
		});
	}
);
