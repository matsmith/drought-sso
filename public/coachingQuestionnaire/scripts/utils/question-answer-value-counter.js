define([
], function() {
	'use strict';

	/**
	 * Checking the existence and length of question.userAnswers is sufficient
	 * for most question types to determine if the user has provided answer(s)
	 * to the question. However, some questions need additional logic to filter
	 * out non-answers.
	 *
	 * This logic is used specifically when submitting a question to determine
	 * if a savedOnDate should be applied, and also when determining if the
	 * display state of a question should be the unanswered state or the
	 * answered state.
	 */
	return function questionHasAnswerValues(question) {
		var userAnswers = question.get('userAnswers');
		if (userAnswers) {
			switch(question.get('type')) {
				case 'checkbox':
					// Checkbox questions have an answer object per checkbox.
					// Only consider a checkbox question answered if at least
					// one of those checkboxes is checked (values.length > 0).
					userAnswers = userAnswers.filter(function(checkboxAnswer) {
						return checkboxAnswer.values.length;
					});
					break;
				case 'numberinput':
					// Numberinputs always have an answer. Only consider
					// a numberinput answered if the answer is not "".
					userAnswers = userAnswers.filter(function(numberAnswer) {
						return numberAnswer.values[0] !== "";
					});
					break;
			}
			return userAnswers && userAnswers.length > 0;
		}
	};
});