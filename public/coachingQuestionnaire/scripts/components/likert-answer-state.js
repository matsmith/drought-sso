define([
	'ember',
	'moment'
], function(
	Ember,
	Moment
) {
		'use strict';

		return Ember.Component.extend({
			classNames: ['likert-answer-state'],
			formattedSavedOnDate: function() {
				return this.get('savedOnDate').format('MM/DD/YY');
			}.property('savedOnDate'),
			formattedCollectionDate: function() {
				var date;
				if(this.get('childQuestions')) {
					date = this.get('childQuestions')[0].collectionDate;
				}else{
					date = this.get('collectionDate');
				}
				return new Moment(date).format('MM/DD/YY');
			}.property('collectionDate, childQuestions')
		});
	}
);
