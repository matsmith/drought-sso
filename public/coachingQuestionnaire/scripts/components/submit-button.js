define([
	'ember',
	'ember-i18n',
	'jquery'
],
function(
	Ember,
	I18n,
	$
){
	'use strict';

	return Ember.Component.extend(I18n.TranslateableProperties, {
		defaultButtonTextTranslation: 'questionnaire.questionForwardNavButtonText',
		unansweredRequiredButtonTextTranslation:
			'questionnaire.requiredButUnansweredQuestionForwardNavButtonText',
		classNames: ['submit-button'],
		requiredButUnanswered: false,
		isSubmittable: function() {
			return this.get('active') && !(
					this.get('submissionInProgress') ||
					this.get('transitionInProgress') ||
					this.get('requiredButUnanswered')
				);
		}.property('active', 'submissionInProgress', 'transitionInProgress', 'requiredButUnanswered'),
		didInsertElement: function() {
			var submitButtonUI;
			submitButtonUI = this.$().find('.submit-button');
			this.$().find('input:submit').focus(function(e) {
				$(submitButtonUI).addClass('focus');
			});
			this.$().find('input:submit').blur(function(e) {
				$(submitButtonUI).removeClass('focus');
			});
			Ember.run.schedule('afterRender', this, this.updateSubmitButton);
		},
		updateSubmitButton: function() {
			var active, submitButton, submitButtonUI;
			active = this.get('active');
			submitButton = this.$().find('input:submit');
			submitButtonUI = this.$().find('.submit-button');
			if(active) {
				$(submitButtonUI).removeClass('disabled');
			} else {
				$(submitButtonUI).addClass('disabled');
			}
			$(submitButton).prop('disabled', !active);
		}.observes('active'),
		actions: {
			submit: (function() {
				var lock = false;
				return function() {
					if (!lock) {
						lock = true;
						this.$().find('input:submit').submit();

						// prevent multiple submit clicks
						setTimeout(function () {
							lock = false;
						}, 500);
					}
				};
			})()
		}
	});
});
