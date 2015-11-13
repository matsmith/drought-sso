define([
		'ember',
		'coachingQuestionnaire/scripts/models/page-model',
		'coachingQuestionnaire/scripts/models/question-model',
		'coachingQuestionnaire/scripts/models/choice-model'
	],function(
		Ember,
		PageModel,
		QuestionModel,
		ChoiceModel
	) {
		'use strict';

		return Ember.Object.extend({
			pageContentSerializer: null,
			deserialize: function(object, section) {
				var page = PageModel.create({
					id: object.page,
					prepopulated: object.prepopulated,
					contentItems: [],
					isQuitPage: object.isQuitPage,
					section: section
				});

				for (var i = 0, iMax = object.content.length; i < iMax; i++) {
					var contentItem =
						this.pageContentSerializer.deserialize(object.content[i], page);
					page.get('contentItems').push(contentItem);
				}

				return page;
			}
		});
	}
);
