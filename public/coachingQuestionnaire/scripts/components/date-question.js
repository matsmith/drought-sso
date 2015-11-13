define([
	'ember',
	'coachingQuestionnaire/scripts/components/abstract-question-base',
	'coachingQuestionnaire/scripts/models/user-data-recorder-info',
	'jquery',
	'moment',
	'modernizr'
], function(
	Ember,
	AbstractQuestionBase,
	UserDataRecorderInfo,
	$,
	Moment,
	Modernizr
){
	'use strict';

	return AbstractQuestionBase.extend({
		enableSubmitButton: false,
		inputValue: '',
		hasInput: null,
		minRangeDelta: function() {
			return this.question.getValidationProperty('minOffset');
		}.property('validations'),
		maxRangeDelta: function() {
			return this.question.getValidationProperty('maxOffset');
		}.property('validations'),
		didInsertElement: function() {
			var _this = this;
			this.$('form').submit(function(e) {
				e.preventDefault();

				if (!_this.isValid()) {
					return;
				}
				if (_this.getValue().isValid()) {
					_this.answerQuestion();
				}
				else {
					_this.sendAction('navigate', 1);
				}
			});
			Ember.run.scheduleOnce('afterRender', this, this.setEnableSubmitButton);
		},

		setEnableSubmitButton: function() {
			this.set('enableSubmitButton', this.isValid());
			this.set('requiredButUnanswered', this.question.get('required') && (!this.get('hasInput') && !this.get('answer')));
		}.observes('inputValue'),

		answerQuestion: function() {
			var userDataRecorderInfo = UserDataRecorderInfo.create({
				dataDefinitionName: this.question.get("dataDefinitionName"),
				values: [ this.getValue().format('YYYY-MM-DD 00:00:00')+' EST' ],
				text: this.getValue().format('MM/DD/YYYY')
			});

			this.sendAction('answeredQuestion', userDataRecorderInfo);
		},

		/*
			returns a Moment
		*/
		getValue: function() {
			return this.get('inputValue');
		},

		isValid: function() {
			var value = new Moment(this.getValue());

			if (!this.question.get('required') && !this.get('hasInput')) {
				return true;
			}

			if (!value.isValid()) {
				return false;
			}

			var maxOffset = +this.question.getValidationProperty('maxOffset');
			var maxValidDate = new Moment().startOf('day').add(maxOffset, 'days');
			if (maxOffset && value > maxValidDate) {
				return false;
			}

			var minOffset = +this.question.getValidationProperty('minOffset');
			// Expect minOffset to be negative
			var minValidDate = new Moment().startOf('day').add(minOffset, 'days');
			if (minOffset && value < minValidDate) {
				return false;
			}

			return true;
		},

		actions: {
			navigate: function(direction) {
				this.sendAction('navigate', direction);
			}
		}
	});
});
