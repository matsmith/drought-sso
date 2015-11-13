define([
	'ember',
	'ember-i18n',
	'jquery',
	'coachingQuestionnaire/scripts/components/numbers-and-radios-question'
], function(
	Ember,
	I18n,
	$,
	NumbersAndRadiosQuestion
	){
	'use strict';

	return NumbersAndRadiosQuestion.extend(I18n.TranslateableProperties, {
		bloodPressureIncorrectTranslation: 'questionnaire.bloodPressureIncorrect',
		isValid: function() {
			if (this.question.get('required') && !this.isAnswered()) {
				return false;
			}

			var firstNumber = this.get('firstNumberValue');
			var secondNumber = this.get('secondNumberValue');
			var firstNumberQuestion = this.get('firstNumberChildQuestion');
			var secondNumberQuestion = this.get('secondNumberChildQuestion');
			var hasAnsweredNumberQuestion = firstNumber || secondNumber;

			// If any number questions are answered, they must all be
			if (hasAnsweredNumberQuestion) {
				if (!this.validateNumber(firstNumber, firstNumberQuestion)) {
					return false;
				}
				if (this.get('hasSecondNumberChildQuestion')) {
					if (!this.validateNumber(secondNumber, secondNumberQuestion)) {
						return false;
					}
				}
				if (+secondNumber >= +firstNumber) {
					this.$('.systolicNotHigherErrorContainer').addClass('systolicNotHigherError');
					return false;
				} else {
					this.$('.systolicNotHigherErrorContainer').removeClass('systolicNotHigherError');
					return true;
				}
			}

			return !(this.get('selectedRadioChoice') && hasAnsweredNumberQuestion);
		}
	});
});
