define([
    'ember',
    'coachingQuestionnaire/scripts/models/section-model'
  ], function(
    Ember,
    SectionModel
  ) {
    'use strict';

    return Ember.Object.extend({
      deserialize: function(object) {
        return SectionModel.create({
          id: object.id,
          name: object.name,
          backgroundImage: object.backgroundImage,
          secondaryBackgroundImage: object.secondaryBackgroundImage,
          status: object.status,
          pageCount: object.pageCount,
          completeFirst: object.completeFirst,
          firstPage: object.firstPage
        });
      }
    });
  }
);
