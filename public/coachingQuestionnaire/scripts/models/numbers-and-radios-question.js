define([
		'ember-i18n',
		'coachingQuestionnaire/scripts/models/question-model',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info'
	], function(
		I18n,
		QuestionModel,
		UserDataRecorderInfo
		) {
		'use strict';

		return QuestionModel.extend({
			answer: [],
			numberChildQuestions: function() {
				return this.get('childQuestions').filterBy('type', 'numberinput');
			}.property('childQuestions'),
			radioChildQuestion: function() {
				return this.get('childQuestions').findBy('type', 'radio');
			}.property('childQuestions'),
			selectedRadioChildQuestionChoice: function() {
				return this.get('radioChildQuestion.choices').filter(function(choice) {
					return choice.get('selected');
				})[0] || null;
			}.property('radioChildQuestion.choices.@each.selected'),
			generateUserAnswers: function() {
				var _this = this;
				var userAnswers = [];

				this.get('numberChildQuestions').forEach(function(question) {
					var childUserAnswers = question.get('userAnswers');
					if (childUserAnswers && childUserAnswers.length) {
						userAnswers = userAnswers.concat(question.get('userAnswers'));
					}
				});

				// Radios are mutually exclusive with each other and number answers
				var selectedRadio = this.get('selectedRadioChildQuestionChoice');
				if (selectedRadio) {
					userAnswers = [_this.getRadioQuestionUserAnswer(selectedRadio)];
				}

				if (userAnswers.length) {
					this.set('userAnswers', userAnswers);
				}
			},
			getNumberQuestionUserAnswer: function(question, answer) {
				return UserDataRecorderInfo.create({
					dataDefinitionName: question.get('dataDefinitionName'),
					values: answer ? [ answer ] : [],
					text: answer ? this.getNumberAnswerText(question, answer) : ''
				});
			},
			getRadioQuestionUserAnswer: function(selectedChoice) {
				var question = this.get('radioChildQuestion');
				// We need the data def regardless of whether there was a choice selected
				var dataDefChoice = selectedChoice || question.get('choices')[0];
				return UserDataRecorderInfo.create({
					dataDefinitionName: dataDefChoice.get('dataDefinitionName'),
					values: selectedChoice ? [ selectedChoice.get('value') ] : [],
					text: selectedChoice ? this.getRadioAnswerText(selectedChoice) : ''
				});
			},
			getNumberAnswerText: function(question, answer) {
				return answer + ' ' + question.get('inputLabel');
			},
			getRadioAnswerText: function(choice) {
				return choice.get('text');
			}
		});
	}
);
