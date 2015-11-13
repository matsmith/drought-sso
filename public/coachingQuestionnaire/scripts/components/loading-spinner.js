define([
		'ember',
		'jquery',
		'knockout'
	], function(
		Ember,
		$,
		ko
	) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['loadingSpinner'],
			didInsertElement: function() {
				ko.applyBindings({
					isVisible: ko.observable(true)
				}, this.$().find('.loader')[0]);
			},
			isVisible: function() {
				return this.get('visible') || false;
			}.property('visible')
		});
	}
);
