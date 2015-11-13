define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      dataDefinitionName: null,
      dataSourceName: null,
      value: null,
      result: null
    });
  }
);
