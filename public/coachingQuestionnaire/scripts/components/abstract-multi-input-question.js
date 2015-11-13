define([
		'ember',
		'jquery',
		'coachingQuestionnaire/scripts/components/abstract-question-base'
	], function(
		Ember,
		$,
		AbstractQuestionBase
	) {
		'use strict';

		return AbstractQuestionBase.extend({
			getChoiceByValue: function(choices, value) {
				return choices.find(function(choice) {
					return choice.get('value') === value;
				});
			}
		});
	}
);
