define([
		'coachingQuestionnaire/scripts/models/question-model'
	], function(
		QuestionModel
	) {
		'use strict';

		return QuestionModel.extend({
			generateUserAnswers: function() {
				if (this.get('answer')) {
					this.set('userAnswers', [this.get('answer')]);
				}
				else {
					this.set('userAnswers', []);
				}
			}
		});
	}
);
