define([
	'ember'
	], function (Ember) {
	'use strict';
		return function renderSafeString(string) {
			return new Ember.Handlebars.SafeString(string);
		};
	}
);
