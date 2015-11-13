/**
 * The multi-dropdown-question supports only two dropdowns. It is named to
 * match the question type provided by the server.
 */

define([
		'ember',
		'ember-i18n',
		'jquery',
		'coachingQuestionnaire/scripts/components/abstract-multi-input-question',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info'
	], function(
		Ember,
		I18n,
		$,
		AbstractMultiInputQuestion,
		UserDataRecorderInfo
	) {
		'use strict';

		return AbstractMultiInputQuestion.extend(I18n.TranslateableProperties, {
			dropdownValue: null,
			numberInputValue: null,
			didInsertElement: function() {
				var _this = this;
				this.$().find('form').submit(function(e) {
					e.preventDefault();
					_this.$().find('.dropdown-popup-wrapper').hide();

					if(!_this.isValid()) {
						return;
					}
					if (_this.hasUserInput()) {
						Ember.run.scheduleOnce('afterRender', _this, function() {
							_this.$().find('.dropdown-popup-wrapper').hide();
							_this.answerQuestion();
						});
						return;
					}
					_this.sendAction('navigate', 1);
				});
			},
			dropdownChildQuestion: function() {
				return this.get('childQuestions')[0];
			}.property('childQuestions'),
			numberChildQuestion: function() {
				return this.get('childQuestions')[1];
			}.property('childQuestions'),
			answerQuestion: function () {
				var dropdownValue = this.get('dropdownValue');
				var dropdownChoice = this.getChoiceByValue(
						this.get('dropdownChildQuestion.choices'), dropdownValue);
				var dropdownAnswer = UserDataRecorderInfo.create({
						dataDefinitionName:
							dropdownChoice.get('dataDefinitionName'),
						values: [dropdownValue],
						text: dropdownChoice.get('text') + ' ' +
							this.get('dropdownChildQuestion.text')
					});

				var numberValue = this.normalizeNumber(this.get('numberInputValue'),
						this.get('numberChildQuestion.numberType'));
				var numberAnswer = UserDataRecorderInfo.create({
						dataDefinitionName:
							this.get('numberChildQuestion.dataDefinitionName'),
						values: [numberValue],
						text: numberValue + ' ' +
							this.get('numberChildQuestion.inputLabel')
					});

				this.sendAction('answeredQuestion', [dropdownAnswer, numberAnswer]);
				this.get('dropdownChildQuestion').setSelectedValue(dropdownValue);
				this.get('numberChildQuestion').setAnswer(numberValue);

				//necessary so that stripped value shows, in rewind
				this.$("#numberInputBox").val(numberValue);
			},
			isValid: function() {
				var dropdownExists = this.doesExist(this.get('dropdownValue'));
				var numberExists = this.doesExist(this.get('numberInputValue'));
				var bothExist = dropdownExists && numberExists;
				var neitherExist = !dropdownExists && !numberExists;

				if (this.get('question').getValidation('required') && !bothExist) {
					return false;
				}

				if (this.get('question').getValidation('responseAllOrNone') &&
						!(bothExist || neitherExist)) {
					return false;
				}

				if(this.hasUserInput()) {
					var dropdownValue = this.get('dropdownValue'),
						numberValue = this.get('numberInputValue');

					// If one value is zero both values must be zero.
					if (+dropdownValue === 0 && +numberValue !== 0 ||
						+dropdownValue !== 0 && +numberValue === 0) {
						return false;
					}

					if (!this.validateNumber(numberValue,
							this.get('numberChildQuestion'))) {
						return false;
					}
				}

				return true;
			},
			hasUserInput: function() {
				return this.doesExist(this.get('dropdownValue')) ||
					this.doesExist(this.get('numberInputValue'));
			},
			enableSubmitButton: function() {
				return this.isValid();
			}.property('dropdownValue', 'numberInputValue'),
			requiredButUnanswered: function() {
				var dropdownExists = this.doesExist(this.get('dropdownValue'));
				var numberExists = this.doesExist(this.get('numberInputValue'));
				var bothExist = dropdownExists && numberExists;
				return this.get('question').getValidation('required') && !bothExist;
			}.property('dropdownValue', 'numberInputValue'),
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
