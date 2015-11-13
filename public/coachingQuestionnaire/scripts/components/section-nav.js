define([
		'ember',
		'jquery'
	], function(
		Ember,
		$
	) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['full-width-wrapper', 'section-navigation-wrapper'],
			sections: null,

			activeSectionIndex: function () {
				var i, iMax, sections;
				sections = this.get('sections');
				for (i = 0, iMax = sections.length; i < iMax; i++) {
					if(sections[i].get('isActive')) {
						return i;
					}
				}
				return sections.length - 1;
			}.property('sections.@each.isActive'),

			activeSectionNumber: function() {
				return this.get('activeSectionIndex') + 1;
			}.property('activeSectionIndex'),

			nextSectionIndex: function() {
				return this.get('activeSectionIndex') + 1;
			}.property('activeSectionIndex'),

			nextSectionTitle: function() {
				var nextSectionIndex = this.get('nextSectionIndex');
				if (this.get('sections').length > nextSectionIndex) {
					return this.get('sections')[nextSectionIndex].get('name');
				}
				return '';
			}.property('activeSectionIndex'),

			activeSectionTitle: function() {
				return this.get('sections')[this.get('activeSectionIndex')].get('name');
			}.property('activeSectionIndex'),

			showQuestionnaireComplete: (function() {
				//after we return true once, the next time the it's called (the back button)
				//the section should be shown
				var lastCallIsTrue = false;
				return function() {
					if ($('.questionnaireComplete').length > 0 && lastCallIsTrue === false)  {
						lastCallIsTrue = true;
					} else {
						lastCallIsTrue = false;
					}
					return lastCallIsTrue;
				};
			})().property('sections.@each.isActive','sections.@each.isComplete')
		});
	}
);
