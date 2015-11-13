define([
	'ember'
	], function (Ember) {
	'use strict';
		return function renderQuestion(options) {
			var component, helper, type;
			type = this.get('question').get('type');
			switch (type) {
				case 'scale':
					component = 'radio-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.orientation = 'hor';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'radio':
					component = 'radio-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.orientation = 'vert';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'numberinput':
					component = 'number-input-question';
					options.hash.answerBinding = 'question.answer';
					options.hash.dataDefinitionNameBinding = 'question.dataDefinitionName';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.inputLabelBinding = 'question.inputLabel';
					options.hash.numberTypeBinding = 'question.numberType';
					options.hash.minRangeBinding = 'question.minRange';
					options.hash.maxRangeBinding = 'question.maxRange';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'checkbox':
					component = 'checkbox-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.exclusiveResponsesBinding = 'question.exclusiveResponses';
					options.hash.maximumResponsesBinding = 'question.maximumResponses';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'beginBumper':
					component = 'bumper-base';
					options.hash.shortNameBinding = 'question.shortName';
					options.hash.textBinding = 'question.text';
					options.hash.getStarted = 'getStarted';
					options.hash.contentItemIdx = 'contentItemIdx';
					options.hash.questionnaireSections = 'questionnaireSections';

					break;
				case 'tailoredText':
					component = 'tailored-text';
					options.hash.textBinding = 'question.text';
					break;
				case 'dropdown':
					component = 'dropdown-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'multidropdown':
					component = 'multi-dropdown-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.childQuestionsBinding = 'question.childQuestions';
					options.hash.answersBinding = 'question.answers';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'scalegroup':
					component = 'likert-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.childQuestionsBinding = 'question.childQuestions';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'dropdownandnumber':
					component = 'dropdown-and-number-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.childQuestionsBinding = 'question.childQuestions';
					options.hash.answersBinding = 'question.answers';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'numbersandradios':
					component = 'numbers-and-radios-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.answeredQuestion = 'answeredQuestion';
					options.hash.toggleRadioQuestion = 'toggleRadioQuestion';

					break;
				case 'bloodpressure':
					component = 'bloodpressure-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.answeredQuestion = 'answeredQuestion';
					options.hash.toggleRadioQuestion = 'toggleRadioQuestion';

					break;
				case 'slider':
					component = 'slider-question';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.choicesBinding = 'question.choices';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'quitTailoredText':
					component = 'quit-tailored-text';
					options.hash.textBinding = 'question.text';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.quit = 'quit';
					break;
				case 'questionnaireComplete':
					component = 'questionnaire-complete';
					options.hash.shortNameBinding = 'question.shortName';
					options.hash.submitQuestionnaire = 'submitQuestionnaire';
					break;
				case 'textinput':
					component = 'open-text-question';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.answerBinding = 'question.answer';
					options.hash.textBinding = 'question.text';
					options.hash.inputLabelBinding = 'question.inputLabel';
					options.hash.answeredQuestion = 'answeredQuestion';

					break;
				case 'dateinput':
					component = 'date-question';
					options.hash.helpTextBinding = 'question.helpText';
					options.hash.answerBinding = 'question.answer';
					options.hash.textBinding = 'question.text';
					options.hash.inputLabelBinding = 'question.inputLabel';
					options.hash.answeredQuestion = 'answeredQuestion';
					break;
				default:
					component = 'unknown-content';
					options.hash.textBinding = 'question.text';
					options.hash.typeBinding = 'question.type';
					options.hash.questionIdBinding = 'question.id';

			}
			options.hash.collectionDataSourceNameBinding = 'question.collectionDataSourceName';
			options.hash.collectionDateBinding = 'question.collectionDate';
			options.hash.isSubmitButtonEnabled = 'isSubmitButtonEnabled';
			options.hash.navigate = 'navigate';
			options.hash.requiredBinding = 'question.required';
			options.hash.size = 'question.size';
			options.hash.savedOnDateBinding = 'question.savedOnDate';
			options.hash.validations = 'question.validations';
			options.hash.activeBinding = 'question.active';
			options.hash.pageBinding = 'question.page';
			options.hash.transitionInProgress = 'transitionInProgress';
			options.hash.submitButtonDomId = 'submitButtonDomId';
			options.hash.backButtonDomId = 'backButtonDomId';

			helper = Ember.Handlebars.resolveHelper(options.data.view.container, component);
			helper.call(this, options);
		};
	}
);
