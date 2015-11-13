define([
		'coachingQuestionnaire/scripts/models/question-model'
	], function(
		QuestionModel
	) {
		'use strict';

		return QuestionModel.extend({
			generateUserAnswers: function() {
				//noop - needed for interface elsewhere
			},
		});
	}
);
