define([
	'coachingQuestionnaire/scripts/models/question-model',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info'
], function(
	QuestionModel,
	UserDataRecorderInfo
) {
	'use strict';

	return QuestionModel.extend({
		answers: function() {
			var i, iMax, answers;
			answers = [];
			for (i = 0, iMax = this.get('choices').length; i < iMax; i++) {
				var choice = this.get('choices')[i];
				if (choice.get('selected')) {
					answers.push(choice);
				}
			}
			return answers;
		}.property('choices.@each.selected'),
		generateUserAnswers: function() {
			var userAnswers, choices, choice;
			userAnswers = [];
			choices = this.get('choices');
			for (var i = 0, iMax = choices.length; i < iMax; i++) {
				choice = choices[i];
				if (choice.get('selected')) {
					userAnswers.push(this.userAnswerFromChoice(choice));
				}
			}
			if (userAnswers.length > 0) {
				this.set('userAnswers', userAnswers);
			}
		},
		/**
		 * Set the selected property of all of this question's choices. Choices
		 * with a dataDefinitionName matching one of those provided will be set
		 * to true, false otherwise.
		 * @param {string[]} dataDefinitionNames
		 */
		setSelectedChoices: function(dataDefinitionNames) {
			this.get('choices').forEach(function(choice) {
				choice.set('selected', dataDefinitionNames.indexOf(
						choice.get('dataDefinitionName')) > -1);
			});
		},
		userAnswerFromChoice: function(choice) {
			return UserDataRecorderInfo.create({
				dataDefinitionName: choice.get('dataDefinitionName'),
				values: [ choice.get('value') ],
				text: choice.get('text')
			});
		},
		exclusiveResponses: function() {
			var exclusiveResponses = [] ;
			if (this.get('validations')) {
				var i, iMax;
				for (i = 0, iMax = this.get('validations').length; i < iMax; i++) {
					var validation = this.get('validations')[i];
					if (validation.get('name') === "exclusiveResponse") {
						exclusiveResponses.push(validation.get('property'));
					}
				}
			}
			return exclusiveResponses;
		}.property('validations'),
		maximumResponses: function() {
			if (this.get('validations')) {
				var i, iMax;
				for (i = 0, iMax = this.get('validations').length; i < iMax; i++) {
					var validation = this.get('validations')[i];
					if (validation.get('name') === "maximumResponses") {
						return validation.get('property');
					}
				}
			}
			return null;
		}.property('validations')
	});
});
