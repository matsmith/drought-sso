define([
	'ember',
	'coachingQuestionnaire/scripts/components/abstract-question-base',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info',
	'jquery'
], function(
	Ember,
	AbstractQuestionBase,
	UserDataRecorderInfo,
	$
){
	'use strict';

	return AbstractQuestionBase.extend({
		enableSubmitButton: false,
		requiredButUnanswered: false,
		inputValue: null,
		didInsertElement: function() {
			var _this = this;
			this.$().find('form').submit(function(e) {
				e.preventDefault();

				if (!_this.isValid()) {
					return;
				}
				if (_this.getValue().length > 0) {
					_this.answerQuestion();
				}
				else {
					_this.sendAction('navigate', 1);
				}
			});

			Ember.run.scheduleOnce('afterRender', this, function () {
				this.set('enableSubmitButton', this.isValid());
			}.bind(this));
		},

		setEnableSubmitButton: function() {
			this.set('enableSubmitButton', this.isValid());
			this.set('requiredButUnanswered',
				this.question.get('required') && !this.getValue().length);
		}.observes('inputValue'),

		answerQuestion: function() {
			var userDataRecorderInfo;
			userDataRecorderInfo = UserDataRecorderInfo.create({
				dataDefinitionName: this.question.get("dataDefinitionName"),
				values: [ this.getValue() ],
				text: this.getValue()
			});

			this.sendAction('answeredQuestion', userDataRecorderInfo);
		},

		getValue: function() {
			if (this.get('inputValue') && this.get('inputValue').length > 0) {
				return this.get('inputValue');
			}
			else {
				return '';
			}
		},

		isValid: function() {
			var isValid = true;
			var value = this.getValue();
			if (this.question.get('required')) {
				isValid = (this.getValue().length > 0);
			}
			else if (value.length === 0) {
			//if the value is empty and it's not required, then we can move on
				return true;
			}
			if (isValid &&
				this.question.getValidation('maxLength') &&
				value.length > parseInt(this.question.getValidationProperty('maxLength'))) {
				isValid = false;
			}
			if (isValid &&
				this.question.getValidation('minLength') &&
				value.length < parseInt(this.question.getValidationProperty('minLength'))) {
				isValid = false;
			}
			return isValid;
		},

		actions: {
			navigate: function(direction) {
				this.sendAction('navigate', direction);
			}
		}
	});
});
