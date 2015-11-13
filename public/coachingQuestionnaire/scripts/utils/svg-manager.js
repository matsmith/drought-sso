define([
    'jquery',
    'ember'
  ], function(
    $,
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      svgDictionary: {},
      addSvg: function(key, value) {
        this.get('svgDictionary')[key] = value;
      },
      getSvg: function(key) {
        return this.get('svgDictionary')[key];
      }
    });
  }
);
