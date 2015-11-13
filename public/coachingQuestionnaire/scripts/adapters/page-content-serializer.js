define([
		'ember',
		'coachingQuestionnaire/scripts/models/inline-model',
		'coachingQuestionnaire/scripts/models/question-model',
		'coachingQuestionnaire/scripts/models/choice-model',
		'coachingQuestionnaire/scripts/models/validation-model',
		'coachingQuestionnaire/scripts/models/radio-question',
		'coachingQuestionnaire/scripts/models/numeric-input-question',
		'coachingQuestionnaire/scripts/models/checkbox-question',
		'coachingQuestionnaire/scripts/models/likert-scale-question',
		'coachingQuestionnaire/scripts/models/dropdown-and-number-question',
		'coachingQuestionnaire/scripts/models/multi-dropdown-question',
		'coachingQuestionnaire/scripts/models/numbers-and-radios-question',
		'coachingQuestionnaire/scripts/components/bloodpressure-question',
		'coachingQuestionnaire/scripts/models/open-text-question',
		'coachingQuestionnaire/scripts/models/date-question',
		'coachingQuestionnaire/scripts/models/unknown-content'
	], function(
		Ember,
		InlineModel,
		QuestionModel,
		ChoiceModel,
		ValidationModel,
		RadioQuestion,
		NumericInputQuestion,
		CheckboxQuestion,
		LikertScaleQuestion,
		DropdownAndNumberQuestion,
		MultiDropdownQuestion,
		NumbersAndRadiosQuestion,
		BloodpressureQuestion,
		OpenTextQuestion,
		DateQuestion,
		UnknownContent
	) {
		'use strict';

		/**
		 * Return the dataInfo property of the first object in the provided
		 * array that has one or false if dataInfo is not found.
		 * @param object[] objects
		 * @return object|bool
		 */
		function getFirstDataInfoFromObjectArray(objects) {
			var idx, object;

			for (idx = 0; idx < objects.length; ++idx) {
				object = objects[idx];
				if (typeof object.dataInfo !== "undefined") {
					return object.dataInfo;
				}
			}

			return false;
		}

		/**
		 * Get the dataInfo of an object. Different questions types store the
		 * dataInfo in different ways. Returns false if object does not have
		 * dataInfo (an acceptable state).
		 * @param object object
		 * @returns object|bool
		 */
		function getDataInfo(object) {
			var dataInfo = false;

			if (object.dataInfo) {
				dataInfo = object.dataInfo;
			}

			// ok so some question types have dataInfo inside the question
			// content and not in the question proper itself, after checking
			// with API guys they said it was safe to just take the first
			// element with the data - Chad Crabtree 7/30/2014
			if (!dataInfo && object.childQuestions) {
				dataInfo = getFirstDataInfoFromObjectArray(
						object.childQuestions);
			}

			// prepopulated checkboxes serialize their dataInfo in
			// choices.choice[].
			if (!dataInfo && object.choices && object.choices.choice) {
				dataInfo = getFirstDataInfoFromObjectArray(
						object.choices.choice);
			}

			return dataInfo;
		}

		return Ember.Object.extend({
			deserialize: function(object, page) {
				if ("inline" === object.type) {
					return InlineModel.create({
						type: object.type,
						text: object.text,
						page: page
					});
				} else {
					var choices, childQuestions, validations, i, iMax;
					if (object.choices) {
						choices = [];
						for (i = 0, iMax = object.choices.choice.length; i < iMax; i++) {
							choices.push(this._parseChoice(object.choices.choice[i]));
						}
					}
					if (object.childQuestions) {
						childQuestions = [];
						for (i = 0, iMax = object.childQuestions.length; i < iMax; i++) {
							childQuestions.push(this.deserialize(object.childQuestions[i], page));
						}
					}
					if (object.validations) {
						validations = [];
						for (i = 0, iMax = object.validations.validation.length; i < iMax; i++) {
							validations.push(this._parseValidation(object.validations.validation[i]));
						}
					}
					var QuestionClass = this._questionClassForType(object.type);
					var questionData = {
						id: object.id,
						type: object.type,
						text: object.text,
						helpText: object.helpText,
						inputLabel: object.inputLabel,
						subtext: object.subtext, // Note that this is something we made up to fit the design
						choices: choices,
						childQuestions: childQuestions,
						dataDefinitionName: object.dataDefinitionName,
						answer: object.answer,
						isPartiallyPrepopulated: !!object.partiallyPrepopulated,
						validations: validations,
						page: page
					};
					var dataInfo = getDataInfo(object);
					if(dataInfo) {
						questionData.collectionDataSourceName =
								dataInfo.dataSourceName;
						questionData.collectionDate = dataInfo.collectionDate;
					}
					var question = QuestionClass.create(questionData);
					question.generateUserAnswers();
					return question;
				}
			},
			_parseChoice: function(choiceJSON) {
				return ChoiceModel.create({
					text: choiceJSON.text,
					value: choiceJSON.value,
					selected: choiceJSON.selected,
					dataDefinitionName: choiceJSON.dataDefinitionName,
					helpText: choiceJSON.helpText
				});
			},
			_parseValidation: function(validationJSON) {
				return ValidationModel.create({
					name: validationJSON.name,
					property: validationJSON.property
				});
			},
			_questionClassForType: function(type) {
				var questionClass = QuestionModel;
				switch(type) {
					case 'hor-radio':
					case 'vert-radio':
					case 'scale':
					case 'radio':
					case 'slider':
					case 'dropdown':
						questionClass = RadioQuestion;
						break;
					case 'numberinput':
						questionClass = NumericInputQuestion;
						break;
					case 'checkbox':
						questionClass = CheckboxQuestion;
						break;
					case 'multidropdown':
						questionClass = MultiDropdownQuestion;
						break;
					case 'dropdownandnumber':
						questionClass = DropdownAndNumberQuestion;
						break;
					case 'scalegroup':
						questionClass = LikertScaleQuestion;
						break;
					case 'numbersandradios':
					case 'bloodpressure':
						questionClass = NumbersAndRadiosQuestion;
						break;
					case 'textinput':
						questionClass = OpenTextQuestion;
						break;
					case 'dateinput':
						questionClass = DateQuestion;
						break;
					default:
						questionClass = UnknownContent;
				}
				return questionClass;
			}
		});
	}
);
