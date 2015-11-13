define([
    'ember',
    'coachingQuestionnaire/scripts/components/abstract-question-base'
  ], function(
    Ember,
    AbstractQuestionBase
  ) {
    'use strict';

    return AbstractQuestionBase.extend({
		actions: {
			navigateBackward: function() {
				this.sendAction('navigate', -1);
			},
			navigateForward: function() {
				this.sendAction('navigate', 1);
			}
		}
    });
  }
);
