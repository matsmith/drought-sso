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
				var i, iMax, userAnswers, childQuestions, childQuestion, childText;
				userAnswers = [];
				childQuestions = this.get('childQuestions');
				for (i = 0, iMax = childQuestions.length; i < iMax; i++) {
					childQuestion = childQuestions[i];
					if (this.doesExist(childQuestion.get('userAnswers'))) {
						userAnswers.push.apply(userAnswers,
							childQuestion.get('userAnswers'));
						// The "text" property of a single dropdown question is
						// displayed as the question's header. On a multi input
						// question the "text" property is a label of the
						// dropdown field. To avoid breaking behavior of a
						// single dropdown question we append the text/label
						// here if appropriate.
						childText = childQuestion.get('text');
						if (this.doesExist(childText)) {
							userAnswers.push(Ember.Object.create({
								text: childText
							}));
						}
					}
				}
				if (userAnswers.length > 0) {
					this.set('userAnswers', userAnswers);
				}
			}
		});
	}
);
