define([
    'ember',
    'coachingQuestionnaire/scripts/adapters/configurable-user-profile-service'
  ], function(
    Ember,
    UserProfileServiceInstance
  ) {
    'use strict';

    return Ember.Route.extend({
      model: function() {
        return UserProfileServiceInstance.userProfile();
      }
    });
  }
);
