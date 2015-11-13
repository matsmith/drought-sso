define([
		'ember',
		'jquery',
		'moment'
	], function(
		Ember,
		$,
		Moment
	) {
		'use strict';

		return Ember.Component.extend({
			classNameBindings: ['mainClass','displayState'],
			mainClass: 'question-component-wrapper',
			savedOnDate: function () {
				return this.get('savedOnDate');
			}.property('savedOnDate'),
			collectionDataSourceName: function() {
				return this.get('collectionDataSourceName');
			}.property('collectionDataSourceName'),
			formattedSavedOnDate: function() {
				return this.get('savedOnDate') ? this.get('savedOnDate').format('MM/DD/YY') : '';
			}.property('savedOnDate'),
			formattedCollectionDate: function() {
				return new Moment(this.get('collectionDate')).format('MM/DD/YY');
			}.property('collectionDate'),
			validateNumber: function(input, question) {
				if (isNaN(input)) {
					return false;
				}

				var type = question.get('numberType');
				if (type === "INTEGER" && !/^\s*\d+\s*$/.test(input)) {
					return false;
				}
				if (type === "FLOATING_POINT" && !/^\s*\d+\.?\d*\s*$/.test(input)) {
					return false;
				}

				var minRange = question.getValidationProperty('minRange');
				var maxRange = question.getValidationProperty('maxRange');
				if (this.doesExist(minRange) && minRange > +input) {
					return false;
				}
				if (this.doesExist(maxRange) && maxRange < +input) {
					return false;
				}

				return true;
			},
			normalizeNumber: function(val, numberType) {
				if(isNaN(val)) {
					return "";
				}
				if(numberType === "INTEGER") {
					return (parseInt(val))+"";
				} else {
					return (parseFloat(val))+"";
				}
			}
		});
	}
);
