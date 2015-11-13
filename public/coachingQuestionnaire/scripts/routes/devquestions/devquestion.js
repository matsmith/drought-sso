define([
    'ember',
    'coachingQuestionnaire/scripts/adapters/page-content-serializer'
  ], function(
    Ember,
    PageContentSerializer
  ) {
    'use strict';

    return Ember.Route.extend({
      model: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
          return $.ajax("/debug/questions/questions.json").then(function(pageContentItemsJSON) {
            var pageContentItems, pageContentSerializer, selectedPageContentItem;
            pageContentItems = [];
            pageContentSerializer = PageContentSerializer.create();
            for (var i = 0; i < pageContentItemsJSON.length; i++) {
              var pageConentJSON = pageContentItemsJSON[i];
              /*jshint camelcase: false */
              if (pageConentJSON.id === params.question_id) {
                selectedPageContentItem = pageContentSerializer.deserialize(pageConentJSON);
                selectedPageContentItem.set('id', pageConentJSON.id);
                break;
              }
            }
            selectedPageContentItem.set('active', true);
            return resolve(selectedPageContentItem);
          });
        });
      }
    });
  }
);
