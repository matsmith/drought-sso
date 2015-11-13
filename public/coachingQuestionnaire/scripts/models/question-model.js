define([
		'coachingQuestionnaire/scripts/models/page-content-model'
	], function(
		PageContentModel
	) {
		'use strict';

		return PageContentModel.extend({
			id: null, //question id
			text: null,
			helpText: null,
			choices: null,
			childQuestions: null,
			validations: null,
			savedOnDate: null,
			collectionDataSourceName: null,
			submissionInProgress: false,
			collectionDate: null,
			isPartiallyPrepopulated: null,
			hasAnswer: function () {
				return this.doesExist(this.get('userAnswers')) && this.get('userAnswers').length > 0;
			}.property('userAnswers'),
			hasMoreThanTwoChoices: function() {
				return this.get('choices') && this.get('choices').length > 2;
			}.property('choices'),
			required: function() {
				return !!this.getValidation("required");
			}.property('validations'),
			getValidation: function(name) {
				var validations = this.get('validations');
				if(!validations) {
					return null;
				}
				return validations.find(function(validation) {
					return validation.get('name') === name;
				});
			},
			getValidationProperty: function(name) {
				var validation = this.getValidation(name);
				return validation ? validation.get('property') : null;
			}
		});
	}
);
