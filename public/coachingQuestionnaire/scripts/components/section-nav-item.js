define([
		'ember',
		'jquery'
	], function(
		Ember,
		$
	) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['sectionNavItem'],

			isActiveIncomplete: function() {
				return !this.get('section.isComplete') && this.get('section.isActive');
			}.property('section.isComplete','section.isActive'),

			isActiveComplete: function() {
				return this.get('section.isComplete') && this.get('section.isActive');
			}.property('section.isComplete','section.isActive'),

			isInactiveIncomplete: function() {
				return !this.get('section.isComplete') && !this.get('section.isActive') && this.get('section.status') !== 'NOT_STARTED';
			}.property('section.isComplete','section.isActive'),

			isInactiveComplete: function() {
				return this.get('section.isComplete') && !this.get('section.isActive');
			}.property('section.isComplete','section.isActive')
		});
	}
);
