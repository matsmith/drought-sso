define([
	'ember',
	'ember-i18n',
	'coachingQuestionnaire/scripts/components/abstract-question-base',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info',
	'jquery'
],
	function(
		Ember,
		I18n,
		AbstractQuestionBase,
		UserDataRecorderInfo,
		$
	) {
		'use strict';

		return AbstractQuestionBase.extend(I18n.TranslateableProperties, {
			weightGoalTooAggressiveTranslation: 'questionnaire.weightGoalTooAggressive',
			didInsertElement: function() {
				var _this = this;

				this.$().find('form').submit(function(e) {
					e.preventDefault();

					if (!_this.isValid()) {
						return;
					}
					var currentlyHasAnswers = $.trim(_this.get('numberInputValue')).length;
					var previouslyHadAnswers = _this.get('collectionDate') || _this.get('savedOnDate');
					if (currentlyHasAnswers || previouslyHadAnswers) {
						Ember.run.schedule('afterRender', _this, _this.answerQuestion);
						return;
					}
					_this.sendAction('navigate', 1);
				});
			},
			willDestroyElement: function() {
				this.$().find('input[type=text]').off('change keyup');
			},
			answerQuestion: function() {
				var value;
				var qNumberType = this.get('numberType');
				value = this.get('numberInputValue');
				value = this.doesExist(value) ? $.trim(value) : '';
				if (this.validate(value)) {
					value = this.normalizeNumber(value,qNumberType);
					var userDataRecorderInfo = UserDataRecorderInfo.create({
						dataDefinitionName: this.get('dataDefinitionName'),
						values: [ value ],
						text: value + " " + this.get('inputLabel')
					});
					this.get('question').setAnswer(value);
					this.sendAction('answeredQuestion', userDataRecorderInfo);
				}
			},
			isValid: function() {
				var inputValue = this.get('numberInputValue');

				if (this.question.get('required')) {
					return this.doesExist(inputValue) && this.validate(inputValue);
				}
				if (this.doesExist(inputValue)) {
					return this.validate(inputValue);
				}
				return true;
			},

			displayTooAggressiveWeightLossMessage: function() {
				var maxRange = +(this.question.getValidationProperty('maxRange'));
				var showMessage = !!this.question.getValidation("weightLossRangeValidation");
				if (!showMessage) {
					return;//do nothing
				}

				//if is not valid and the range is above the maximum, show message
				if ( !this.isValid() && +(this.get('numberInputValue')) > maxRange) {
					this.$('.weight-loss-too-aggressive-message-container').addClass('showAggressiveWeightLossMessage');
				}
				else {
					this.$('.weight-loss-too-aggressive-message-container').removeClass('showAggressiveWeightLossMessage');
				}
			}.observes('numberInputValue'),

			enableSubmitButton: function() {
				return this.isValid();
			}.property('numberInputValue'),

			requiredButUnanswered: function() {
				return this.question.get('required') &&
					!this.doesExist(this.get('numberInputValue'));
			}.property('numberInputValue'),
			validate: function(input) {
				return this.validateNumber(input, this.get('question'));
			},
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
