define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Route.extend({
      programName: null,
      afterModel: function() {
        this.transitionTo('questionnaire', this.get('programName'));
      }
    });
  }
);
