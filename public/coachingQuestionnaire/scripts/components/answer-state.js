define([
	'ember',
	'moment'
], function(
	Ember,
	Moment
){
	'use strict';

	return Ember.Component.extend({
		formattedSavedOnDate: function() {
			return this.get('savedOnDate').format('MM/DD/YY');
		}.property('savedOnDate'),
		formattedCollectionDate: function() {
			return new Moment(this.get('collectionDate')).format('MM/DD/YY');
		}.property('collectionDate')
	});
});
