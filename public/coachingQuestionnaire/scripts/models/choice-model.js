define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      text: null,
      value: null,
      selected: null,
      dataDefinitionName: null,
      helpText: null
    });
  }
);
