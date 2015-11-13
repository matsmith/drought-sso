define([
		'ember',
		'coachingQuestionnaire/scripts/models/question-model'
	], function(
		Ember,
		QuestionModel
	) {
		'use strict';
		return QuestionModel.extend({
			generateUserAnswers: function() {
				var userAnswers = [],
					dropdownQuestion = this.get('childQuestions')[0],
					dropdownAnswers  = dropdownQuestion.get('userAnswers');
				if (this.doesExist(dropdownAnswers)) {
					userAnswers.push.apply(userAnswers, dropdownAnswers);
					// The "text" property of a single dropdown question is
					// displayed as the question's header. On a multi input
					// question the "text" property is a label of the dropdown
					// field. To avoid breaking behavior of a single dropdown
					// question we append the text/label here if appropriate.
					var dropdownText = dropdownQuestion.get('text');
					if (this.doesExist(dropdownText)) {
						userAnswers.push(Ember.Object.create({
							text: dropdownText
						}));
					}
				}

				var numberQuestion = this.get('childQuestions')[1],
					numberAnswers  = numberQuestion.get('userAnswers');
				if (this.doesExist(numberAnswers)) {
					userAnswers.push.apply(userAnswers, numberAnswers);
				}

				if (userAnswers.length > 0) {
					this.set('userAnswers', userAnswers);
				}
			}
		});
	}
);
