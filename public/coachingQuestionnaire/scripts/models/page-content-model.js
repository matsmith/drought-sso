define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      type: null,
      text: "" // answer-state needs a text binding, no matter what
    });
  }
);
