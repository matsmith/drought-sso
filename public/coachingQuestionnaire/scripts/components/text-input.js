define([
		'ember',
		'jquery'
	],
	function(
		Ember,
		$
	) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['text-input'],
			hasInput: null,
			answer: null,
			didInsertElement: function() {
				var _this;
				_this = this;
				this.set('value', this.get('answer'));

				this.$().find('input#textInputBox').on('change keyup', function(e) {
					Ember.run(function() {
						_this.set('value', _this.getValue());
					});
				});
			},

			willDestroyElement: function() {
				this.$().find('input#textInputBox').off('change keyup');
			},

			valueDidChangeObserver: function() {
				var value;
				value = this.get('value');
				if (this.doesExist(value)) {
					this.set('hasInput', 'has-input');
				} else {
					this.set('hasInput', null);
				}
				this.sendAction('valueDidChange', this.$(), value);
			}.observes('value'),

			getValue: function() {
				return this.$().find('input#textInputBox').val();
			}
		});
	}
);
