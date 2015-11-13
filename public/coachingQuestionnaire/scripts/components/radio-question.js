define([
	'ember',
	'coachingQuestionnaire/scripts/components/abstract-question-base',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info',
	'isTouchClick',
	'jquery'
], function(
	Ember,
	AbstractQuestionBase,
	UserDataRecorderInfo,
	isTouchClick,
	$
){
	'use strict';

	return AbstractQuestionBase.extend({
		classNameBindings: ['orientation'],
		inputValue: null,
		didInsertElement: function() {
			var _this, questionContainer, isMobile, inputElementToTarget, clickAction;
			_this = this;
			questionContainer = this.$().find('.question-container');
			isMobile = this.get('browserManager.onMobile');
			inputElementToTarget = isMobile ? "> li" : "> li input:radio";
			clickAction = isMobile ? 'touchend' : 'click change';
			this.set('inputValue', this.getValue());

			this.$().find('form').submit(function(e) {
				e.preventDefault();

				if (!_this.isValid()) {
					return;
				}
				if (_this.getSelectedChoice()) {
					_this.answerQuestion();
					_this.highlightSelectedElement();
					return;
				}
				_this.sendAction('navigate', 1);
			});

			if (!isMobile) {
				questionContainer.on('mouseover mouseout', '> li', function(e) {
					_this.setHover((e.type === 'mouseover'), $(this));
				});
			}

			questionContainer
				.on(clickAction, inputElementToTarget, function(e) {
	        var element = this;
	        if(!element){
	            //iOS 8.4 losing reference to the element
	            element = e.target;
	        }
					if (!isMobile || isTouchClick(e)) {
						_this.setSelected(true, $(element).closest('li'));
					}
				})
				.on('focus', '> li input:radio', function(e) {
					if (!_this.doesExist(_this.getValue())) {
						$(this).val([this.value]).change();
					}
				});
				this.highlightSelectedElement();
		},
		highlightSelectedElement: function () {
			var questionContainer = this.$().find('.question-container');
			questionContainer.find('> li input:radio').each(function(index, element) {
				if($(element).is(':checked')){
					questionContainer.find('> li').removeClass('selected');
					$(element).closest('li').addClass('selected');
				}
			});
		},
		willDestroyElement: function() {
			var questionContainer;
			questionContainer = this.$('.question-container');
			questionContainer.off('mouseover mouseout', '> li');
			questionContainer.off('click change focus', '> li input:radio');
		},
		answerQuestion: function() {
			var userDataRecorderInfo;
			userDataRecorderInfo = UserDataRecorderInfo.create({
				dataDefinitionName: this.getSelectedChoice().get('dataDefinitionName'),
				values: [ this.getValue() ],
				text: this.getSelectedChoice().get('text')
			});

			this.sendAction('answeredQuestion', userDataRecorderInfo);
			this.get('question').setSelectedValue(this.getValue());
		},
		setHover: function(mode, item) {
			var questionContainer;
			questionContainer = this.$('.question-container');
			questionContainer.find('> li').removeClass('hover');
			if (mode) {
				item.addClass('hover');
			}
		},
		setSelected: function(mode, item) {
			var questionContainer;
			if (!this.get('submissionInProgress') && !this.get('transitionInProgress')){
				this.set('submissionInProgress', true);
				questionContainer = this.$('.question-container');
				questionContainer.find('> li').removeClass('selected');
				if (mode) {
					item.addClass('selected');
				}
				if (this.get('browserManager.onMobile')) {
					//touching the label doesn't click it, force the click
					item.find('input').prop('checked', true);
				}
				this.set('inputValue', this.getValue());
			}
		},
		getValue: function() {
			return this.$('input:radio:checked').val();
		},
		getSelectedChoice: function() {
			var selectedChoices, selectedChoiceIndex;
			selectedChoices = this.$('input:radio:checked');
			if (selectedChoices.length > 0) {
				selectedChoiceIndex = this.$('input:radio').index(selectedChoices[0]);
				return this.get('choices')[selectedChoiceIndex];
			}
			return null;
		},
		isValid: function() {
			if (this.question.get('required')) {
				return !!this.get('inputValue');
			}
			return true;
		},
		enableSubmitButton: function() {
			return this.isValid();
		}.property('inputValue'),
		requiredButUnanswered: function() {
			return this.question.get('required') && !this.get('inputValue');
		}.property('inputValue'),
		actions: {
			radioSelected: function(mouseUpChoice) {
				var _this = this;

				// wait for the clickAction event to select the radio button
				setTimeout(function() {
					var selectedChoice = _this.getSelectedChoice();
					// Radio questions "answer" themselves on mouseup, but
					// select values on click - this protects against drags
					if (selectedChoice === mouseUpChoice) {
						_this.$().find("form").submit();
					}
				});
			},
			navigate: function(direction) {
				this.sendAction('navigate', direction);
			}
		}
	});
});
