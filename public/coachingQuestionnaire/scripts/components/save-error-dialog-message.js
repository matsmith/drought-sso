define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Component.extend({
      classNames: ['error-dialog'],
      actions: {
        reset: function() {
          this.sendAction();
        }
      }
    });
  }
);
