define([
		'ember'
	], function (Ember) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['quit-page-content'],

			didInsertElement: function () {
				this.$().find(".question-outer-wrapper")
					// The following modifications fix unexplained display issues
					.outerWidth('100%');
			},

			actions: {
				navigate: function () {
					this.sendAction("navigate", -1);
				},
				quit: function () {
					this.sendAction("quit");
				}
			}
		});
	}
);
