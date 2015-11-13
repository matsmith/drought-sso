define([
		'ember',
		'ember-i18n',
		'coachingQuestionnaire/scripts/components/abstract-question-base',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info',
		'jquery'
	], function(
		Ember,
		I18n,
		QuestionBase,
		UserDataRecorderInfo,
		$
	) {
		'use strict';

		return QuestionBase.extend(I18n.TranslateableProperties, {
			inputValue: null,
			didInsertElement: function() {
				var _this = this;

				this.$('form.questionSubmit').submit(function(e) {
					e.preventDefault();

					if(!_this.isValid()) {
						return;
					}
					if(_this.doesExist(_this.getSelectedChoice())) {
						Ember.run.scheduleOnce('afterRender', _this, _this.answerQuestion);
						return;
					}
					_this.sendAction('navigate', 1);
				});
			},
			answerQuestion: function() {
				var userDataRecorderInfo;
				//Sometimes touchEnd does not fire, make sure inputValue is set right
				this.set('inputValue',this.getSelectedChoice().get('value'));
				userDataRecorderInfo = UserDataRecorderInfo.create({
					dataDefinitionName: this.getSelectedChoice().get('dataDefinitionName'),
					values: [ this.get('inputValue') ],
					text: this.get('inputValue') + ' ' + I18n.t('questionnaire.outOf') +
							' ' + this.get('lastChoiceText')
				});
				this.sendAction('answeredQuestion', userDataRecorderInfo);
				this.get('question').setSelectedValue(this.get('inputValue'));
			},
			isValid: function() {
				if (this.question.get('required')) {
					return this.doesExist(this.get('inputValue'));
				}
				return true;
			},
			enableSubmitButton: function() {
				return this.isValid();
			}.property('inputValue'),
			requiredButUnanswered: function() {
				return this.question.get('required') &&
					!this.doesExist(this.get('inputValue'));
			}.property('inputValue'),
			getSelectedChoice: function() {
				var selectedChoices, selectedChoiceIndex;
				selectedChoices = this.$().find('input[type=radio]:checked');
				if (selectedChoices.length > 0) {
					selectedChoiceIndex = this.$().find('input[type=radio]').index(selectedChoices[0]);
					return this.get('choices')[selectedChoiceIndex];
				}
				return null;
			},
			lastChoiceText: function() {
				var choices;
				choices = this.get('choices');
				if(this.doesExist(choices) && choices.length > 0) {
					return choices[choices.length - 1].get('text');
				}
				return '';
			}.property('choices'),
			actions: {
				sliderInputValueDidChange: function() {
					var selectedChoice = this.getSelectedChoice();
					this.set('inputValue', selectedChoice ? selectedChoice.get('value') : null);
				},
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
