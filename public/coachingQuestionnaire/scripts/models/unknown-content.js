define([
	'ember-i18n',
	'coachingQuestionnaire/scripts/models/question-model'
], function(
	I18n,
	QuestionModel
) {
	'use strict';

	return QuestionModel.extend({
		text: function(key, value) {
			// Normally this property would be populated with data from the
			// server. In our case the server data is "unknown content" so the
			// server supplied text would not make sense when displayed on the
			// unanswered state. This property is read only to prevent the
			// server data from overwriting the error text.
			// It must have the input parameters and the property() declaration
			// to correctly function.
			return I18n.t('questionnaire.unknownContentErrorText');
		}.property(),
		answers: null,
		generateUserAnswers: function() {
		}
	});
});
