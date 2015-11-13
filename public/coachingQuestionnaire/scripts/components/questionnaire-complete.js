define([
	'jquery',
	'ember',
	'ember-i18n'
], function(
	$,
	Ember,
	I18n
){
	'use strict';

	return Ember.Component.extend(I18n.TranslateableProperties, {
		submitButtonTranslation: 'questionnaire.questionnaireCompleteSubmitButtonText',
		classNameBindings: ['mainClass'],
		mainClass: 'questionnaire-complete',
		didInsertElement: function() {
			var _this;
			_this = this;
			this.$().find('form').submit(function(e) {
				e.preventDefault();
				_this.sendAction('submitQuestionnaire');
			});
		},
		actions: {
			navigate: function() {
				this.sendAction('navigate', -1);
			}
		}
	});
});
