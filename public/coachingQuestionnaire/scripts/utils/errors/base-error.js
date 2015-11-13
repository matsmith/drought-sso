define([
    "ember"
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      message: null,

      init: function(message) {
        this.message = message;
      },

      toString: function() {
        return this.message;
      }
    });
  }
);
