define([
		'ember',
		'coachingQuestionnaire/scripts/components/abstract-question-base'
	], function(
		Ember,
		QuestionBase
	) {
		'use strict';

		return QuestionBase.extend({
			didInsertElement: function() {
				Ember.run.scheduleOnce('afterRender', this, this.adjustForFoldedCorner);
			},
			isFirstBumper: function() {
				return !!this.get('contentItemIdx');
			}.property('contentItemIdx'),
			adjustForFoldedCorner: function() {
				var notchHeader = this.$().find('.bumper-text-notch-header');
				var notch = this.$().find('.bumper-text-corner-notch');
				var bumper = this.$().find('.bumper-text-wrapper');
				notchHeader.width(0); // make sure the header isn't increasing the bumper width
				var boundingRect = bumper[0].getBoundingClientRect();
				var bumperWidth = boundingRect.width || boundingRect.right - boundingRect.left;
				notchHeader.width(bumperWidth - notch.outerWidth());
			},
			handleWindowWidthChange: function() {
				Ember.run.scheduleOnce('afterRender', this, this.adjustForFoldedCorner);
			}.observes('windowManager.windowWidth', 'active'),
			actions: {
				getStarted: function() {
					if(this.question.active) {
						this.sendAction('getStarted');
					}
				},
				navigate: function() {
					this.sendAction('navigate', -1);
				}
			}
		});
	}
);
