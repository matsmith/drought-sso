define([
		'ember',
		'isTouchClick',
		'jquery'
	], function(
		Ember,
		isTouchClick,
		$
	) {
		'use strict';

		return Ember.Component.extend({
			classNameBindings: ['mainClass'],
			mainClass: 'likert-input',
			value: null,
			valueAlreadyChanged: false,
			minEndpointText: function() {
				var choices;
				choices = this.get('choices');
				if (this.doesExist(choices) && choices.length > 0) {
					return choices[0].get('helpText');
				}
				return '';
			}.property('choices'),
			maxEndpointText: function() {
				var choices;
				choices = this.get('choices');
				if (this.doesExist(choices) && choices.length > 0) {
					return choices[choices.length - 1].get('helpText');
				}
				return '';
			}.property('choices'),
			didInsertElement: function() {
				var _this, questionContainer, isMobile, inputElementToTarget, clickAction;
				_this = this;
				questionContainer = this.$().find('.question-container');
				isMobile = this.get('browserManager.onMobile');
				inputElementToTarget = isMobile ? "> li" : "> li input:radio";
				clickAction = isMobile ? 'touchend' : 'click change';

				this.$('form').submit(function(e) {
					e.preventDefault();
					Ember.run.scheduleOnce('afterRender', _this, _this.answerQuestion);
				});

				if (!isMobile) {
					questionContainer.on('mouseover mouseout', '> li', function(e) {
						_this.setHover((e.type === 'mouseover'), $(this));
					});
				}

				questionContainer
					.on(clickAction, inputElementToTarget, function(e) {
						if (!isMobile || isTouchClick(e)) {
							_this.setSelected(true, $(this).closest('li'));
						}
					})
					.on('focus', '> li input:radio', function(e) {
						if (!_this.doesExist(_this.getValue())) {
							$(this).val([this.value]).change();
						}
					});
			},
			willDestroyElement: function() {
				var formElement;
				formElement = this.$().find('form');
				formElement.off('mouseover mouseout', '> li');
				formElement.off('click change focus', '> li input:radio');
			},
			answerQuestion: function() {
				this.set('value', this.getValue());
				this.sendAction('valueDidChange', this.$(), this.getValue());
			},
			setHover: function(mode, item) {
				this.$('.question-container').find('> li').removeClass('hover');
				if (mode) {
					item.addClass('hover');
				}
			},
			setSelected: function(mode, item) {
				var _this = this;
				if (!this.get('submissionInProgress') || !this.get('transitionInProgress')) {
					this.$('.question-container').find('> li').removeClass('selected');
					if (mode) {
						item.addClass('selected');
					}
					if (this.get('browserManager.onMobile')) {//Mouseup is finicky in mobile platforms,
						var targetListItem = this.$(".question-container > li.selected");
						//set the radio button and fire the labels mouseup event
						$(targetListItem).find('input').trigger('click');
						$(targetListItem).find('label').trigger('mouseup');
						//prevent simultaneous change events on some environments if mouseup was already triggered
						_this.valueAlreadyChanged = true;
						setTimeout(function() {
							_this.valueAlreadyChanged = false;
						},200);
					}
				}
			},
			answerText: function() {
				var userAnswers;
				userAnswers = this.get('userAnswers');
				if (this.doesExist(userAnswers) && userAnswers.length > 0) {
					return userAnswers[0].get('text');
				}
				return "";
			}.property('userAnswers'),
			getValue: function() {
				return this.$('input:radio:checked').val();
			}
		});
	}
);
