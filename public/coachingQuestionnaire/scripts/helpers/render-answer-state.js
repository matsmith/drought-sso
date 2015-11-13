define([
	'ember'
	], function(Ember) {
	'use strict';
		return function renderQuestion(options) {
			var component, helper, type;
			type = this.get('question').get('type');
			switch(type) {
				case 'scalegroup':
					component = 'likert-answer-state';
					options.hash.childQuestionsBinding = 'question.childQuestions';
					break;
				case 'multidropdown':
				case 'dropdownandnumber':
				case 'numbersandradios':
					component = 'multi-answer-state';
					options.hash.childQuestionsBinding = 'question.childQuestions';
					options.hash.answersBinding = 'question.userAnswers';
					break;
				default:
					component = 'answer-state';
					options.hash.answersBinding = 'question.userAnswers';
			}

			options.hash.textBinding = 'question.text';
			options.hash.savedOnDateBinding = 'question.savedOnDate';
			options.hash.collectionDataSourceNameBinding = 'question.collectionDataSourceName';
			options.hash.collectionDateBinding = 'question.collectionDate';
			options.hash.activeBinding = 'question.active';
			options.hash.navigate = 'navigate';
			options.hash.submitButtonDomId = 'submitButtonDomId';
			options.hash.backButtonDomId = 'backButtonDomId';

			helper = Ember.Handlebars.resolveHelper(options.data.view.container, component);
			helper.call(this, options);
		};
	}
);
