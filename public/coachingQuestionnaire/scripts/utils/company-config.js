define([
		'ember'
	], function(
		Ember
		) {
		'use strict';

		return Ember.Object.extend({
			features: {},
			find: function(feature, attribute) {
				var features = this.get('features');
				return features && features[feature] && features[feature][attribute];
			}
		}).create();
	}
);
