define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.ObjectController.extend({
      callback: null,
      context: null,
      actions: {
        reset: function() {
          if (this.doesExist(this.get('callback'))) {
            this.get('callback').call(this.get('context'));
          }
          this.send('closeDialog');
        }
      }
    });
  }
);
