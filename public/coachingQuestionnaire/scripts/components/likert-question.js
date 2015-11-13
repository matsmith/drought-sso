define([
		'ember',
		'coachingQuestionnaire/scripts/components/abstract-question-base',
		'coachingQuestionnaire/scripts/models/user-data-recorder-info',
		'jquery'
	], function(
		Ember,
		AbstractQuestionBase,
		UserDataRecorderInfo,
		$
	) {
		'use strict';

		return AbstractQuestionBase.extend({
			enableSubmitButton: null,
			requiredButUnanswered: false,
			selectDisplayMode: function() {
				if (this.get('windowManager.layout') === 'mobile-layout') {
					this.set('useSliderInputs', true);
				}
			}.on('init'),
			didInsertElement: function() {
				var _this = this;
				Ember.run.scheduleOnce('afterRender', this, this.updateQuestions);

				this.$().find('form.questionSubmit').submit(function(e) {
					e.preventDefault();

					if(!_this.isValid()) {
						return;
					}
					if(_this.hasAnsweredQuestions()) {
						Ember.run.scheduleOnce('afterRender', _this, function() {
							_this.answerQuestion();
						});
						return;
					}
					_this.sendAction('navigate', 1);
				});
			},
			answerQuestion: function() {
				var _this = this;
				var allAnswers = [];

				this.$().find('input:radio:checked').each(function() {
					var question = _this.getChildQuestionByChoiceName(this.name);
					var selectedChoice = _this.getChoiceForValue(
							question.get('choices'), this.value);
					var answer = UserDataRecorderInfo.create({
						dataDefinitionName: this.name,
						values: [ this.value ],
						text: selectedChoice.get('text')
					});

					question.set('userAnswers', [answer]);
					question.setSelectedValue(this.value);
					allAnswers.push(answer);
				});

				if(allAnswers.length > 0) {
					this.sendAction('answeredQuestion', allAnswers);
				}
			},
			updateQuestions: function() {
				this.adjustHighlightElementPosition();
				this.set('enableSubmitButton', this.isValid());
				this.set('requiredButUnanswered',
					this.question.get('required') && this.hasUnansweredQuestions());
			},
			hasAnsweredQuestions: function() {
				return this.$().find('input:radio:checked').length > 0;
			},
			hasUnansweredQuestions: function() {
				var questionCount = this.get("childQuestions").length;
				var answerCount = this.$().find('input:radio:checked').length;
				return answerCount < questionCount;
			},
			questionForInput: function(likertInput) {
				var likertInputs, index;
				likertInputs = this.$().find('.likert-input');
				index = likertInputs.index(likertInput);
				return this.get('childQuestions')[index];
			},
			getChildQuestionByChoiceName: function(name) {
				return this.get('childQuestions').find(function(question) {
					return question.get('choices')[0].get('dataDefinitionName') === name;
				});
			},
			getChoiceForValue: function(choices, value) {
				var i, iMax, choice;
				for (i = 0, iMax = choices.length; i <iMax; i++) {
					choice = choices[i];
					if (choice.get('value') === value) {
						return choice;
					}
				}
				return null;
			},
			adjustHighlightElementPosition: function() {
				//Fix for Firefox: calculate and adjust highlight element because table-cell element display is inconsistent
				var labels = this.$().find('.likert-question-wrapper label');
				$.each(labels, function(idx, el) {
					var listHeight = $(el).parent().outerHeight();
					var labelHeight = $(el).outerHeight();
					var offset = (listHeight - labelHeight) / 2;
					$(el).find('.choice-hover-state').css('marginBottom', '-'+offset+'px');
				});
			},
			handleWindowWidthChange: function() {
				Ember.run.scheduleOnce('afterRender', this, this.adjustHighlightElementPosition);
			}.observes('windowManager.windowWidth'),
			isValid: function() {
				if (this.question.get('required')) {
					return !this.hasUnansweredQuestions();
				}
				return true;
			},
			actions: {
				likertInputValueDidChange: function() {
					this.updateQuestions();
				},
				sliderInputValueDidChange: function() {
					this.set('requiredButUnanswered',
					this.question.get('required') && this.hasUnansweredQuestions());
					this.set('enableSubmitButton', this.isValid());
				},
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
