define([
		'ember',
		'jquery',
		'moment',
		'modernizr'
	],
	function(
		Ember,
		$,
		Moment,
		Modernizr
	) {
		'use strict';

		function convertDateRangeDeltaToDateRange(delta) {
			if (delta === null) {
				return delta;
			}
			return new Moment().add(+delta, 'days').format('YYYY-MM-DD');
		}

		return Ember.Component.extend({
			classNames: ['date-input'],
			hasInput: null,
			prepopulatedAnswer: null,
			minRangeDelta: null,
			maxRangeDelta: null,
			usingNativePicker: false,
			minRange: function() {
				return convertDateRangeDeltaToDateRange(this.get('minRangeDelta'));
			}.property('minRangeDelta'),
			maxRange: function() {
				return convertDateRangeDeltaToDateRange(this.get('maxRangeDelta'));
			}.property('maxRangeDelta'),
			didInsertElement: function() {
				var self;
				self = this;

				this.$('#dateInputBox').on('change keyup', function(e) {
					Ember.run(function() {
						self.set('value', new Moment(self.getValue()));
					});
				});

				this.set('usingNativePicker', Modernizr.inputtypes.date &&
					this.get('browserManager.onMobile'));

				if (!this.get('usingNativePicker')) {
					this._initializeJqueryDatepicker();
				}

				this._setInitialValue();
			},

			_initializeJqueryDatepicker: function() {
				var self = this;

				try {
					this.$('#dateInputBox').attr('type', 'text');
				} catch(err) {
					this.$('#dateInputBox').val("MM/DD/YYYY");
				}

				Ember.run.scheduleOnce('afterRender', this, function () {
					var datepickerOpts = {
						beforeShow:function() {
							//move the date picker to the right div, so the namespaced jquery css applies correctly
							$('#ember-app .questionnaireApplicationView').append($('body .ui-datepicker'));
						}
					};
					if (self.get('maxRangeDelta') !== null) {
						datepickerOpts.maxDate = +self.get('maxRangeDelta');
					}
					if (self.get('minRangeDelta') !== null) {
						datepickerOpts.minDate = +self.get('minRangeDelta');
					}
					self.$('#dateInputBox').datepicker(datepickerOpts);
				});
			},

			_setInitialValue: function() {
				Ember.run.scheduleOnce('afterRender', this, function () {
					var initialValue = this.get('initialValue');
					if (typeof this.get('prepopulatedAnswer') === 'undefined' && !initialValue.length) {
						this.set('value', new Moment(''));
						return;
					}

					// Rip initial value out of answer array
					initialValue = (initialValue.length) ? initialValue[0].values[0] : null;

					// quitDate format is 'YYYY-MM-DD HH:mm:ss TMZ' and TMZ is
					// not supported by FF's date parser
					var quitDateDate = initialValue || this.get('prepopulatedAnswer').split(' ')[0];
					var valueDateObject = new Moment(quitDateDate);
					this.set('value', valueDateObject);

					if (this.get('usingNativePicker')) {
						// Native date inputs need this format
						this.set('prepopulatedAnswer', valueDateObject.format('YYYY-MM-DD'));
					} else {
						// Text inputs want the preferred display format
						this.set('prepopulatedAnswer', valueDateObject.format('MM/DD/YYYY'));
					}
				});
			},

			willDestroyElement: function() {
				this.$('#dateInputBox').off('change keyup');
			},

			valueDidChangeObserver: function() {
				this.set('hasInput',!!this.getValue() && this.getValue().length > 0);
				this.sendAction('valueDidChange', this.$(), this.get('value'));
			}.observes('value'),

			getValue: function() {
				return this.$('#dateInputBox').val();
			}
		});
	}
);
