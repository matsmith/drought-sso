define([
		'coachingQuestionnaire/scripts/models/question-model',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info'
	], function(
		QuestionModel,
		UserDataRecorderInfo
	) {
		'use strict';
		return QuestionModel.extend({
			answer: null,
			generateUserAnswers: function() {
				if (this.doesExist(this.get('answer'))) {
					this.set('userAnswers', [ this.userAnswerFromAnswer(this.get('answer')) ]);
				}
			},
			/**
			 * Set the answer property of this question to the provided value.
			 * @param {mixed} value
			 */
			setAnswer: function(value) {
				this.set('answer', value);
			},
			userAnswerFromAnswer: function(answer) {
				return UserDataRecorderInfo.create({
					dataDefinitionName: this.get('dataDefinitionName'),
					values: [ answer ],
					text: answer + " " + this.get('inputLabel')
				});
			},
			numberType: function() {
				return this.findValidationWithName("numberType");
			}.property('validations'),
			minRange: function () {
				var minRangeValidation = this.findValidationWithName("minRange");
				if (minRangeValidation === null) {
					return null;
				}
				return Number(minRangeValidation);
			}.property('validations'),
			maxRange: function () {
				var maxRangeValidation = this.findValidationWithName("maxRange");
				if (maxRangeValidation === null) {
					return null;
				}
				return Number(maxRangeValidation);
			}.property('validations'),
			findValidationWithName: function(name) {
				if (this.get('validations')) {
					var i, iMax;
					for (i = 0, iMax = this.get('validations').length; i < iMax; i++) {
						var validation = this.get('validations')[i];
						if (validation.get('name') === name) {
							return validation.get('property');
						}
					}
				}
				return null;
			}
		});
	}
);
