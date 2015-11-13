define([
	'ember',
	'ember-i18n',
	'jquery'
], function(
	Ember,
	I18n,
	$
){
	'use strict';

	return Ember.Component.extend(I18n.TranslateableProperties, {
		buttonTextTranslation: 'questionnaire.questionBackwardNavButtonText',
		classNames: ['question-back-button'],
		click: function(event) {
			event.preventDefault();
			this.sendAction('navigateAction', -1);
		}
	});
});
