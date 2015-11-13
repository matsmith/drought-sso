define([
	'ember'
	], function (Ember) {
	'use strict';
		return function renderQuestion(options) {
			var component, helper, type;
			type = this.get('type');
			switch (type) {
				case 'numberinput':
					component = 'number-input';
					options.hash.dataDefinitionNameBinding = 'dataDefinitionName';
					options.hash.textBinding = 'text';
					options.hash.answerBinding = 'answer';
					options.hash.inputLabelBinding = 'inputLabel';
					options.hash.numberInputValueBinding = 'numberInputValue';
					options.hash.valueDidChange = 'numberInputValueDidChange';
					break;
				case 'dropdown':
					component = 'dropdown-input';
					// NOTE: The inputLabel to text binding is intentional & is present to fix a contradiction in the backend service.
					// Currently "inputLabel" is being used in the primary question to describe the text next to an input but the same item is called "text" in a child question.
					options.hash.inputLabelBinding = 'text';
					options.hash.choicesBinding = 'choices';
					options.hash.answersBinding = 'answers';
					options.hash.valueDidChange = 'dropdownInputValueDidChange';
					break;
				default:
					component = 'unknown-content';
					options.hash.textBinding = 'question.text';
					options.hash.typeBinding = 'question.type';
					options.hash.questionIdBinding = 'question.id';
			}
			options.hash.submitButtonDomId = 'submitButtonDomId';
			options.hash.backButtonDomId = 'backButtonDomId';
			options.hash.transitionInProgress = 'transitionInProgress';
			helper = Ember.Handlebars.resolveHelper(options.data.view.container, component);
			helper.call(this, options);
		};
	}
);
