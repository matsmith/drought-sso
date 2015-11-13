define([
    'ember',
    'coachingQuestionnaire/scripts/adapters/page-content-serializer'
  ], function(
    Ember,
    PageContentSerializer
  ) {
    'use strict';

    return Ember.Route.extend({
      model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
          return $.ajax("/debug/questions/questions.json").then(function(pageContentItemsJSON) {
            var pageContentItems, pageContentSerializer;
            pageContentItems = [];
            pageContentSerializer = PageContentSerializer.create();
            for (var i = 0; i < pageContentItemsJSON.length; i++) {
              var pageContentJSON = pageContentItemsJSON[i];
              var pageContent = pageContentSerializer.deserialize(pageContentJSON);
              pageContent.set('id', pageContentJSON.id);
              pageContentItems.push(pageContent);
            }
            return resolve(pageContentItems);
          });
        });
      }
    });
  }
);
