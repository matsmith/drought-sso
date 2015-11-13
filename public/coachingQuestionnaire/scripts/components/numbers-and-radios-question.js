/**
 * This question type will never have more than two number child questions and
 * one radio child question. It is named to match the name of the data provided
 * by the server "numbersandradios".
 */

define([
	'ember',
	'ember-i18n',
	'coachingQuestionnaire/scripts/components/abstract-question-base',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info',
	'isTouchClick',
	'jquery'
], function(
	Ember,
	I18n,
	AbstractQuestionBase,
	UserDataRecorderInfo,
	isTouchClick,
	$
	){
	'use strict';

	return AbstractQuestionBase.extend(I18n.TranslateableProperties, {
		cholesterolAdditionIncorrectTranslation: 'questionnaire.cholesterolAdditionIncorrect',
		classNameBindings: ['orientation'],
		firstNumberValue: '',
		secondNumberValue: '',
		selectedRadioChoice: null,
		didInsertElement: function() {
			var _this = this;

			this.$('form').submit(function(e) {
				e.preventDefault();

				if (!_this.isValid()) {
					return;
				}
				if (_this.isAnswered()) {
					_this.answerQuestion();
					return;
				}
				_this.sendAction('navigate', 1);
			});

			this._bindRadioEventHandlers();

			var selectedRadio = this.question.get('selectedRadioChildQuestionChoice');
			if (selectedRadio) {
				this.set('selectedRadioChoice', selectedRadio);
				this.prepopulateRadioSelection(selectedRadio);
			} else {
				this.set('firstNumberValue', this.get('firstNumberChildQuestion.answer') || '');
				this.set('secondNumberValue', this.get('secondNumberChildQuestion.answer') || '');
			}

			// If the radio question toggle is included we want to hide the
			// radio questions by default. We do not bind to the property
			// because this is only the initial state.
			if(this.get('includeRadioQuestionToggle')) {
				Ember.run.scheduleOnce('afterRender', null, function () {
					_this.$('.toggle-radio-question .arrow')
						.toggleClass('arrow-right', !selectedRadio)
						.toggleClass('arrow-down', !!selectedRadio);
					_this.$('.radio-question').toggle(!!selectedRadio);
				});
			}
		},
		willDestroyElement: function() {
			this.$('.question-container')
				.off('mouseover mouseout', '> li')
				.off('click change', 'input[type=radio]')
				.off('touchend', 'li');
		},
		_bindRadioEventHandlers: function() {
			var _this = this;
			var questionContainer = this.$('.question-container');
			var isMobile = this.get('browserManager.onMobile');

			if (isMobile) {
				// Bind the radio clicks to the li surrounding the label because...
				questionContainer.on("touchend", "li", function(evt) {
					if (isTouchClick(evt)) {
						// ...touching the label doesn't click it; so force the click
						$(this).find('input').click();
						_this.displayRadioSelection($(this));
						_this.setSelectedRadioChoice();
					}
				});
			} else {
				questionContainer.on("click change", "input[type=radio]", function() {
					_this.displayRadioSelection($(this).closest('li'));
					_this.setSelectedRadioChoice();
				});
				questionContainer.on('mouseover mouseout', '> li', function(e) {
					_this.setHover((e.type === 'mouseover'), $(this));
				});
			}
		},
		numberChildQuestions: function() {
			return this.get('question.numberChildQuestions');
		}.property('question.numberChildQuestions'),
		firstNumberChildQuestion: function() {
			return this.get('numberChildQuestions')[0];
		}.property('numberChildQuestions'),
		hasSecondNumberChildQuestion: function() {
			return this.get('numberChildQuestions').length > 1;
		}.property('numberChildQuestions'),
		secondNumberChildQuestion: function() {
			return this.get('numberChildQuestions')[1];
		}.property('numberChildQuestions'),
		radioChildQuestion: function() {
			return this.get('question.radioChildQuestion');
		}.property('question.radioChildQuestion'),
		includeRadioQuestionToggle: function() {
			return this.get('radioChildQuestion.choices').length > 1;
		}.property('radioChildQuestion.choices'),
		answerQuestion: function() {
			var answers = [];
			answers.push(this.question.getNumberQuestionUserAnswer(
				this.get('firstNumberChildQuestion'), this.get('firstNumberValue')
			));
			if (this.get('hasSecondNumberChildQuestion')) {
				answers.push(this.question.getNumberQuestionUserAnswer(
					this.get('secondNumberChildQuestion'), this.get('secondNumberValue')
				));
			}
			answers.push(this.question.getRadioQuestionUserAnswer(this.get('selectedRadioChoice')));

			this.get('question').set('answers', answers);
			this.sendAction('answeredQuestion', answers);
		},
		setHover: function(mode, item) {
			var questionContainer = this.$('.question-container');
			questionContainer.find('> li').removeClass('hover');
			if (mode) {
				item.addClass('hover');
			}
		},
		displayRadioSelection: function(selectedListEl) {
			this.$('.question-container').find('> li').removeClass('selected');
			$(selectedListEl).addClass('selected');
		},
		setSelectedRadioChoice: function() {
			this.set('selectedRadioChoice', this.scrapeSelectedRadioChoice());
			this.clearNumberInputs();
		},
		scrapeSelectedRadioChoice: function() {
			var selectedChoices = this.$('input[type=radio]:checked');
			if (selectedChoices.length > 0) {
				var selectedChoiceIndex = this.$('input[type=radio]').index(selectedChoices[0]);
				return this.get('radioChildQuestion.choices')[selectedChoiceIndex];
			}
			return null;
		},
		prepopulateRadioSelection: function(selectedRadioChoice) {
			var selectedRadioEl = this.$('input' +
				'[name=' + selectedRadioChoice.dataDefinitionName + ']' +
				'[value=' + selectedRadioChoice.value + ']');
			selectedRadioEl.prop('checked', true);
			this.displayRadioSelection(selectedRadioEl.closest("li"));
		},
		clearSelectedRadio: function() {
			this.$('.question-container').find('> li').removeClass('selected');
			this.set('selectedRadioChoice', null);
		},
		clearNumberInputs: function() {
			this.set('firstNumberValue', '');
			this.set('secondNumberValue', '');
		},
		onFirstNumberValueChange: function() {
			if (this.get('firstNumberValue')) {
				this.clearSelectedRadio();
			}
		}.observes('firstNumberValue'),
		onSecondNumberValueChange: function() {
			if (this.get('secondNumberValue')) {
				this.clearSelectedRadio();
			}
		}.observes('secondNumberValue'),

		displayCholesterolErrorMessages: function() {

			var _this = this;

			this.question.childQuestions.forEach(function(question) {
				if (question.type === 'numberinput') {

					var minRange = +(question.getValidationProperty('minRange'));
					var maxRange = +(question.getValidationProperty('maxRange'));
					_this.set('minMaxError', I18n.t('questionnaire.cholesterolIncorrect', {
						low: +(question.getValidationProperty('minRange')),
						high: +(question.getValidationProperty('maxRange'))
					}));
					var className = '';

					if (question.dataDefinitionName === 'TotalCholesterolNumberExactmgdL') {
						className = 'cholesterol';
					} else {
						className = 'generic';
					}
					//if is not valid and the range is above the max or below the min, show message
					var firstNumberVal = _this.get('firstNumberValue');
					var errorMessageContainer = _this.$('.errorMessageContainer');
					if (firstNumberVal === '') {
						errorMessageContainer.removeClass('showErrorText ' + className);
					} else if ( !_this.isValid() && +firstNumberVal > maxRange || +firstNumberVal < minRange) {
						errorMessageContainer.addClass('showErrorText ' + className);
					} else {
						errorMessageContainer.removeClass('showErrorText ' +  className);
					}
				}
			});
		}.observes('firstNumberValue'),

		isValid: function() {
			if (this.question.get('required') && !this.isAnswered()) {
				return false;
			}

			var firstNumber = this.get('firstNumberValue');
			var secondNumber = this.get('secondNumberValue');
			var firstNumberQuestion = this.get('firstNumberChildQuestion');
			var secondNumberQuestion = this.get('secondNumberChildQuestion');
			var hasAnsweredNumberQuestion = firstNumber || secondNumber;

			// If any number questions are answered, they must all be
			if (hasAnsweredNumberQuestion) {
				if (!this.validateNumber(firstNumber, firstNumberQuestion)) {
					return false;
				}
				if (this.get('hasSecondNumberChildQuestion')) {
					if (!this.validateNumber(secondNumber, secondNumberQuestion)) {
						return false;
					}
				}
			}

			return !(this.get('selectedRadioChoice') && hasAnsweredNumberQuestion);
		},
		isAnswered: function() {
			return !!(this.get('firstNumberValue') ||
				this.get('secondNumberValue') ||
				this.get('selectedRadioChoice'));
		},
		enableSubmitButton: function() {
			return this.isValid();
		}.property('selectedRadioChoice', 'firstNumberValue', 'secondNumberValue'),
		requiredButUnanswered: function() {
			return this.question.get('required') && !this.isAnswered();
		}.property('selectedRadioChoice', 'firstNumberValue', 'secondNumberValue'),
		actions: {
			toggleRadioQuestion: function() {
				if (!this.get('selectedRadioChoice')) {
					this.$('.toggle-radio-question .arrow')
						.toggleClass('arrow-right')
						.toggleClass('arrow-down');
					this.$('.radio-question').slideToggle();
				}
			},
			navigate: function(direction) {
				this.sendAction('navigate', direction);
			}
		}
	});
});