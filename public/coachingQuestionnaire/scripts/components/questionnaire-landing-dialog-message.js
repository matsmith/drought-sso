define([
		'ember'
	], function(
		Ember
	) {
		'use strict';

		return Ember.Component.extend({
			classNameBindings: ['mainClass'],
			mainClass: 'question-landing-modal',
			actions: {
				close: function() {
					this.sendAction('close');
				},
				retakeQuestionnaire: function() {
					this.sendAction('retakeQuestionnaire');
				},
				continueQuestionnaire: function() {
					this.sendAction('continueQuestionnaire');
				}
			}
		});
	}
);
