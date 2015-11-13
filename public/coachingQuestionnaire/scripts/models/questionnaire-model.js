define([
		'ember'
	], function(
		Ember
	) {
		'use strict';

		return Ember.Object.extend({
			id: null,
			shortName: null,
			longName: null,
			sections: null,
			pages: null,
			finalPage: null,
			status: null,
			retakeAvailable: null,
			productEnrollmentId: null,
			productComponentType: null,
			upgradePathApplicable: null,
			upgradePathQuestionnaireStarted: null,
			upgradePathQuestionnaireFinished: null,
			upgradePathRetakeAvailable: null,
			isInProgress: function() {
				return this.get('status') === 'QUESTIONNAIRE_STARTED';
			}.property('status'),
			isFirstPageOfSection: function(questionnairePage) {
				var i, iMax, sections, section;
				sections = this.get('sections');
				for (i = 0, iMax = sections.length; i < iMax; i++) {
					section = sections[i];
					if (section.get('firstPage') === questionnairePage.get('id')) {
						return true;
					}
				}
				return false;
			},
			getSectionByPageId: function(pageId) {
				var i, iMax, sections, currentSection, nextSection;
				sections = this.get('sections');
				for (i = 0, iMax = sections.length; i < iMax; i++) {
					currentSection = sections[i];
					nextSection = sections[i+1];
					if (pageId >= currentSection.get('firstPage') &&
							(!nextSection || pageId < nextSection.get('firstPage'))) {
						return currentSection;
					}
				}
				return null;
			},
			contentItems: function() {
				var i, iMax, pages, _contentItems;
				pages = this.get('pages');
				_contentItems = [];
				for (i = 0, iMax = pages.length; i < iMax; i++) {
					var contentItems = pages[i].get('contentItems');
					_contentItems = _contentItems.concat(contentItems);
				}
				return _contentItems;
			}.property('pages.@each')
		});
	}
);
