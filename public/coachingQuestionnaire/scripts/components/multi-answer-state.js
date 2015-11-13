define([
		'ember'
	], function(
		Ember
	) {
		'use strict';

		return Ember.Component.extend({
			consolidatedCollectionDate: function() {
				if (this.get('childQuestions')) {
					return this.get('childQuestions')[0].get('collectionDate');
				}
				return this.get('collectionDate');
			}.property('collectionDate, childQuestions'),
			answerArray: function () {
				var i, iMax, answers, answer, answerString;
				answers = this.get('answers');
				answerString = "";
				if(answers){
					for(i = 0, iMax = answers.length; i < iMax; i++){
						answer = answers[i];
						answerString += answer.text + " ";
					}
				}
				return [{text: answerString}];
			}.property('answers')
		});
	}
);
