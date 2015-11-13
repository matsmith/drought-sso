define([
		'ember',
		'ember-i18n',
		'coachingQuestionnaire/scripts/components/abstract-question-base',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info',
		'jquery'
	], function(
		Ember,
		I18n,
		AbstractQuestionBase,
		UserDataRecorderInfo,
		$
	) {
		'use strict';
		return AbstractQuestionBase.extend(I18n.TranslateableProperties, {
			dropdownValue: null,
			didInsertElement: function() {
				var _this = this;
				this.$().find('form').submit(function(e) {
					e.preventDefault();
					_this.$().find('.dropdown-popup-wrapper').hide();

					if (!_this.isValid()) {
						return;
					}
					if (_this.getSelectedChoice()) {
						Ember.run.schedule('afterRender', _this, function() {
							_this.answerQuestion();
						});
						return;
					}
					_this.sendAction('navigate', 1);
				});
			},
			answerQuestion: function () {
				var selectedChoice, userDataRecorderInfo;
				selectedChoice = this.getSelectedChoice();
				userDataRecorderInfo = UserDataRecorderInfo.create({
					dataDefinitionName: selectedChoice.get('dataDefinitionName'),
					values: [ this.get('dropdownValue') ],
					text: selectedChoice.get('text')
				});
				this.sendAction('answeredQuestion', userDataRecorderInfo);
				this.get('question').setSelectedValue(this.get('dropdownValue'));
			},
			getSelectedChoice: function() {
				var selectedChoices, selectedChoiceIndex;
				selectedChoices = this.$().find('input:radio:checked');
				if (selectedChoices.length > 0) {
					selectedChoiceIndex = this.$().find('input:radio').index(selectedChoices[0]);
					return this.get('choices')[selectedChoiceIndex];
				}
				return null;
			},
			isValid: function() {
				if (this.question.get('required')) {
					return this.doesExist(this.get('dropdownValue'));
				}
				return true;
			},
			enableSubmitButton: function() {
				return this.isValid();
			}.property('dropdownValue'),
			requiredButUnanswered: function() {
				return this.question.get('required') &&
					!this.doesExist(this.get('dropdownValue'));
			}.property('dropdownValue'),
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
