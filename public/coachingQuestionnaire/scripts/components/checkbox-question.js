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
	) {
		'use strict';

		return AbstractQuestionBase.extend(I18n.TranslateableProperties, {
			enableSubmitButton: null,
			didInsertElement: function() {
				var _this, questionContainer;
				_this = this;
				questionContainer = this.$('.question-container');

				this.$('form').submit(function(e) {
					e.preventDefault();
					if (!_this.isValid()) {
						return;
					}
					var currentlyHasAnswers = _this.getValues().length;
					var previouslyHadAnswers = _this.get('collectionDate') || _this.get('savedOnDate');
					if (currentlyHasAnswers || previouslyHadAnswers) {
						Ember.run.schedule('afterRender', _this, _this.answerQuestion);
						return;
					}
					_this.sendAction('navigate', 1);
				});

				if (this.get('browserManager.onMobile')) {
					questionContainer
						.on('touchstart', 'label', function(e) {
							// Since we click on the label on touchend, block this
							e.preventDefault();
						})
						.on('touchend', 'li', function(e) {
							if (isTouchClick(e)) {
								$(e.target).closest('label').click();
							}
						});
				} else {
					questionContainer.on('mouseover mouseout', '> li', function(e) {
						_this.setHover((e.type === 'mouseover'), $(this));
					});
				}
				questionContainer.on('change', '> li input:checkbox', function(e) {

					if ($(this).is(':checked')) {
						var exclusiveResponses = _this.get('exclusiveResponses');
						if (exclusiveResponses.length) {
							var justClickedExclusiveResponse =
								exclusiveResponses.indexOf(this.value) !== -1;
							if (justClickedExclusiveResponse || _this.isCurrentResponseExclusive()) {
								_this.singleSelect(this);
								_this.clearSelected();
							}
						}
						if (_this.get('maximumResponses') && _this.getValues().length > _this.get('maximumResponses')) {
							$(this).prop('checked', false);
						}
					}
					_this.setSelected($(this).is(':checked'), $(this).closest('li'));
					_this.updateSubmitButton();
				})
				.on('focus', '> li input:checkbox', function(e) {
					_this.setHover(true, $(this).closest('li'));
				})
				.find('> li input:checkbox')
					// make sure display checkboxes match hidden ones
					.trigger('change');

				Ember.run.schedule('afterRender', this, this.updateSubmitButton);
				this.onQuestionOpen();
			},
			onQuestionOpen: function() {
				Ember.run.schedule("afterRender",this, function() {
					this.$('.question-container').trigger('mouseover');
				});
			}.observes('question.active'),
			willDestroyElement: function() {
				var questionContainer;
				questionContainer = this.$('.question-container');
				questionContainer.off('mouseover mouseout', '> li');
				questionContainer.off('change focus', '> li input:checkbox');
			},
			answerQuestion: function() {
				var userDataRecords = [];
				var choices = this.get('choices');
				function recordMaker(type,selectedChoice) {
					var userDataRecorderInfo;
					userDataRecorderInfo = UserDataRecorderInfo.create({
						dataDefinitionName: selectedChoice.get('dataDefinitionName'),
						values: type === 'selected' ? [ selectedChoice.get('value') ] : [],
						text: type === 'selected' ? selectedChoice.get('text') : ''
					});
					return userDataRecorderInfo;
				}
				this.$('input:checkbox').each(function(index, element) {
					if($(element).is(':checked')){
						userDataRecords.push(recordMaker('selected', choices[index]));
					} else if(!$(element).is(':checked')){
						userDataRecords.push(recordMaker('unselected', choices[index]));
					}
				});

				this.set('question.isPartiallyPrepopulated', false);

				this.sendAction('answeredQuestion', userDataRecords);
				this.get('question').setSelectedChoices(this.getValues());
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
				questionContainer = this.$('.question-container');
				if (mode) {
					item.addClass('selected');
				} else {
					item.removeClass('selected');
				}
			},
			singleSelect: function(selectedElement) {
				this.$('input:checkbox').each(function(index, element) {
					$(this).prop('checked', this.value === selectedElement.value);
				});
			},
			clearSelected: function() {
				var questionContainer;
				questionContainer = this.$('.question-container');
				questionContainer.find('> li').removeClass('selected');
			},
			updateSubmitButton: function() {
				this.set('enableSubmitButton', this.isValid());
				this.set('requiredButUnanswered',
					this.question.get('required') && !this.getValues().length);
			},
			getValues: function() {
				var values;
				values = [];
				this.$('input:checkbox:checked').each(function(index, element) {
					values.push($(this).val());
				});
				return values;
			},
			isCurrentResponseExclusive: function() {
				var values = this.getValues();
				var exclusiveResponses = this.get('exclusiveResponses');
				var isCurrentResponseExclusive = false;
				exclusiveResponses.forEach(function(exclusiveResponse) {
					values.forEach(function(currentValue) {
						if (exclusiveResponse === currentValue) {
							isCurrentResponseExclusive = true;
						}
					});
				});
				return isCurrentResponseExclusive;
			},
			isValid: function() {
				if (this.question.get('required')) {
					return this.getValues().length !== 0;
				}
				return true;
			},
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
