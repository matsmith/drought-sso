define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      id: null,
      prepopulated: null,
      contentItems: null,
      isQuitPage: null
    });
  }
);
