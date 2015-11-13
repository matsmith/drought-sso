/**
 * The multi-dropdown-question only supports two dropdowns. It is named to
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
			firstDropdownValue: null,
			secondDropdownValue: null,
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
			firstChildQuestion: function() {
				return this.get('childQuestions')[0];
			}.property('childQuestions'),
			secondChildQuestion: function() {
				return this.get('childQuestions')[1];
			}.property('childQuestions'),
			answerQuestion: function () {
				var firstValue = this.get('firstDropdownValue');
				var firstChoice = this.getChoiceByValue(
						this.get('firstChildQuestion.choices'), firstValue);
				var firstAnswer = UserDataRecorderInfo.create({
						dataDefinitionName: firstChoice.get('dataDefinitionName'),
						values: [firstValue],
						text: firstChoice.get('text') + ' ' +
							this.get('firstChildQuestion.text')
					});

				var secondValue = this.get('secondDropdownValue');
				var secondChoice = this.getChoiceByValue(
						this.get('secondChildQuestion.choices'), secondValue);
				var secondAnswer = UserDataRecorderInfo.create({
						dataDefinitionName: secondChoice.get('dataDefinitionName'),
						values: [secondValue],
						text: secondChoice.get('text') + ' ' +
							this.get('secondChildQuestion.text')
					});

				this.sendAction('answeredQuestion', [firstAnswer, secondAnswer]);
				this.get('firstChildQuestion').setSelectedValue(firstValue);
				this.get('secondChildQuestion').setSelectedValue(secondValue);
			},
			isValid: function() {
				var firstExists = this.doesExist(this.get('firstDropdownValue'));
				var secondExists = this.doesExist(this.get('secondDropdownValue'));
				var bothExist = firstExists && secondExists;
				var neitherExist = !firstExists && !secondExists;

				if (this.get('question').getValidation('required') && !bothExist) {
					return false;
				}

				if (this.get('question').getValidation('responseAllOrNone') &&
					!(bothExist || neitherExist)) {
					return false;
				}

				return true;
			},
			hasUserInput: function() {
				return this.doesExist(this.get('firstDropdownValue')) ||
					this.doesExist(this.get('secondDropdownValue'));
			},
			enableSubmitButton: function() {
				return this.isValid();
			}.property('firstDropdownValue', 'secondDropdownValue'),
			requiredButUnanswered: function() {
				var firstExists = this.doesExist(this.get('firstDropdownValue'));
				var secondExists = this.doesExist(this.get('secondDropdownValue'));
				var bothExist = firstExists && secondExists;

				return this.get('question').getValidation('required') && !bothExist;
			}.property('firstDropdownValue', 'secondDropdownValue'),
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
