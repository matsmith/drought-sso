define([
	'ember',
	'jquery'
], function(
	Ember,
	$
	) {
		'use strict';

		return Ember.Component.extend({
			displayMode: null,
			minXPos: null,
			maxXPos: null,
			selectedChoiceValue: null,
			selectedChoiceDisplayText: null,
			showInstructions: true,
			sliderOffset: 22,
			handleOffset: 10,
			previousValue: null,
			isFirstChoiceSelected: false,
			isLastChoiceSelected: false,
			minRangeChoice: function () {
				return this.get('choices').get('firstObject');
			}.property(),
			maxRangeChoice: function () {
				return this.get('choices').get('lastObject');
			}.property(),
			isDisplayModeScaleGroup: function() {
				return this.get('displayMode') === 'scalegroup';
			}.property('displayMode'),
			minSliderLabel: function() {
				var minChoiceText = this.get('minRangeChoice.text');
				if (this.get('isDisplayModeScaleGroup') && isNaN(minChoiceText)) {
					if (this.get('choices').length > 2) {
						return 1;
					}
					return '';
				}
				return minChoiceText;
			}.property('minRangeChoice.text', 'displayMode'),
			maxSliderLabel: function() {
				var maxChoiceText = this.get('maxRangeChoice.text');
				if (this.get('isDisplayModeScaleGroup') && isNaN(maxChoiceText)) {
					if (this.get('choices').length > 2) {
						return this.get('choices').length;
					}
					return '';
				}
				return maxChoiceText;
			}.property('minRangeChoice.text', 'displayMode'),
			minHelpText: function() {
				var minHelpText = this.get('minRangeChoice.helpText');
				if (!minHelpText && this.get('isDisplayModeScaleGroup')) {
					return this.get('minRangeChoice.text');
				}
				return minHelpText;
			}.property('minRangeChoice.helpText', 'displayMode'),
			maxHelpText: function() {
				var maxHelpText = this.get('maxRangeChoice.helpText');
				if (!maxHelpText && this.get('isDisplayModeScaleGroup')) {
					return this.get('maxRangeChoice.text');
				}
				return maxHelpText;
			}.property('maxRangeChoice.helpText', 'displayMode'),
			sliderHandleDisplayValue: function() {
				return this.get('isDisplayModeScaleGroup') ? '' : this.get('selectedChoiceValue');
			}.property('selectedChoiceValue', 'displayMode'),
			didInsertElement: function() {
				var _this, startEventAction, moveEventAction, endEventAction, cancelEventAction;
				_this = this;
				startEventAction = this.get('browserManager.startEventAction');
				moveEventAction = this.get('browserManager.moveEventAction');
				endEventAction = this.get('browserManager.endEventAction');
				cancelEventAction = this.get('browserManager.cancelEventAction');

				this.$().on(startEventAction+' change', 'input[type=radio]', Ember.run.bind(this, this.handleRadioChange));

				this.$('.slider-question-handle').on(startEventAction, Ember.run.bind(this, this.startAction));
				this.$().on(moveEventAction, Ember.run.bind(this, this.moveAction));
				this.$().on(endEventAction, Ember.run.bind(this, this.endAction));
				this.$().on(cancelEventAction, Ember.run.bind(this, this.cancelAction));

				var selectedChoice = this.get('question.choices').filter(function(choice) {
					return choice.get('selected');
				})[0];
				if (selectedChoice) {
					this.$().find('input[type=radio][value="'+selectedChoice.get('value')+'"]').prop('checked',true);
				}

				Ember.run.scheduleOnce('afterRender', this, function() {
					_this.updateSliderConstraints();
					_this.handleRadioChange();
				});
			},
			willDestroyElement: function() {
				this.$().off();
				this.$('.slider-question-handle').off();
			},
			handleWidthChange: function() {
				var _this = this;
				Ember.run.scheduleOnce('afterRender', this, function() {
					_this.updateSliderConstraints();
					_this.handleRadioChange();
				});
			}.observes('windowManager.windowWidth'),
			handleRadioChange: function() {
				var selectedChoice, offsetPosition;
				selectedChoice = this.getSelectedChoice();
				if (this.doesExist(selectedChoice)) {
					offsetPosition = this.offsetForChoice(selectedChoice);
				} else {
					offsetPosition = (this.get('maxXPos') - this.get('minXPos')) / 2;
				}

				this.get('handleElement').css('left', offsetPosition - this.get('handleOffset'));
				this.updateSelectedChoiceProperties();
				this.set('selectedChoiceValue', this.getValue());
				this.sendAction('valueDidChange');
				if (selectedChoice) {
					this.set('selectedChoiceDisplayText', selectedChoice.get('text'));
				}
				this.set('showInstructions', !this.doesExist(this.getValue()));
				this.updateHandleDisplay();
			},
			updateSliderConstraints: function () {
				var questionWidth = this.$().width();
				this.set('minXPos', this.get('sliderOffset'));
				this.set('maxXPos', questionWidth - this.get('sliderOffset'));
			},
			updateHandleDisplay: function() {
				if (!this.get('slideInProgress') && this.doesExist(this.getValue())) {
					this.get('handleElement').addClass('has-answer');
					this.get('handleElement').removeClass('active');
				} else if (this.get('slideInProgress')) {
					this.get('handleElement').addClass('active');
					this.get('handleElement').removeClass('has-answer');
				} else {
					this.get('handleElement').removeClass('active');
					this.get('handleElement').removeClass('has-answer');
				}
			},
			updateSelectedChoiceProperties: function() {
				this.set('isFirstChoiceSelected', this.getSelectedChoice() === this.get('minRangeChoice'));
				this.set('isLastChoiceSelected', this.getSelectedChoice() === this.get('maxRangeChoice'));
			},
			offsetForChoice: function(choice) {
				var choiceIndex, range, incrementWidth;
				choiceIndex = this.get('choices').indexOf(choice);
				range = this.get('maxXPos') - this.get('minXPos');
				incrementWidth = range / this.get('numberOfIncrements');
				return choiceIndex * incrementWidth;
			},
			indexForOffset: function(offset) {
				var range, positionRelativeToMin, singleIncrementWidth;
				range = this.get('maxXPos') - this.get('minXPos');
				positionRelativeToMin = offset - this.get('minXPos');
				singleIncrementWidth = range / this.get('numberOfIncrements');
				return Math.round(positionRelativeToMin / singleIncrementWidth);
			},
			getValue: function() {
				return this.$('input[type=radio]:checked').val();
			},
			handleElement: function() {
				return this.$().find('.slider-question-handle');
			}.property(),
			numberOfIncrements: function() {
				return this.get('choices').length - 1;
			}.property(),
			getSelectedChoice: function() {
				var selectedChoices, selectedChoiceIndex;
				selectedChoices = this.$('input[type=radio]:checked');
				if (selectedChoices.length > 0) {
					selectedChoiceIndex = this.$('input[type=radio]').index(selectedChoices[0]);
					return this.get('choices')[selectedChoiceIndex];
				}
				return null;
			},
			inProgressObserver: function() {
				this.updateHandleDisplay();
			}.observes('slideInProgress'),
			startAction: function (e) {
				e.preventDefault();
				this.set('previousValue', this.getValue());
				this.set('slideInProgress', true);
			},
			moveAction: function (e) {
				e.preventDefault();
				var parentOffset, selectedIndex, selectedRadioInput, locationX, isMobile;
				isMobile = this.get('browserManager.onMobile');
				locationX = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
				if (this.get('slideInProgress')) {
					parentOffset = this.$().offset().left;
					selectedIndex = this.indexForOffset(locationX - parentOffset);
					// bound index to [0, numChoices-1]
					selectedIndex = Math.max(Math.min(selectedIndex, this.get('choices').length - 1), 0);
					selectedRadioInput = this.$('input[type=radio]')[selectedIndex];
					$(selectedRadioInput).val([selectedRadioInput.value]).change();
				}
			},
			endAction: function (e) {
				this.set('slideInProgress', false);
				this.set('previousValue', null);
				this.sendAction('valueDidChange');
			},
			cancelAction: function (e) {
				if (this.get('slideInProgress')) {
					this.set('slideInProgress', false);

					var previousValue = this.get('previousValue');
					if (previousValue) {
						this.$('input[type=radio][value="'+previousValue+'"]')
							.prop('checked', true).change();
					} else {
						// reset to initial state
						this.$('input[type=radio]').prop('checked', false);
						this.handleRadioChange();
					}
				}
			},
			updateSlideConstraintsAfterActive: function() {
				var _this = this;
				Ember.run.scheduleOnce('afterRender', null, function() {
					_this.updateSliderConstraints();
					_this.handleRadioChange();
				});
			}.observes('active')
		});
	}
);
