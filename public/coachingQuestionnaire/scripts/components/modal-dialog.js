define([
	'ember',
	'modernizr'
], function(
	Ember,
	Modernizr
) {
	'use strict';

	return Ember.Component.extend({
		classNames: ['modal-dialog'],
		didInsertElement: function() {
			Ember.run.scheduleOnce('afterRender', this, this.adjustForFoldedCorner);
		},
		adjustForFoldedCorner: function() {
			var notchHeader = this.$().find('.earmark-modal-notch-header');
			var notch = this.$().find('.earmark-modal-corner-notch');
			var bumper = this.$().find('.earmark-modal-wrapper');
			notchHeader.width(0); // make sure the header isn't increasing the bumper width
			var boundingRect = bumper[0].getBoundingClientRect();
			var bumperWidth = boundingRect.width || boundingRect.right - boundingRect.left;
			notchHeader.width(bumperWidth - notch.outerWidth());
			if(!Modernizr.csstransforms){
				var headerHeight = this.$().closest('.questionnaireApplicationView').find('.header-bar').outerHeight();
				var topMargin = (bumper.height() - headerHeight)/-2;
				bumper.css({"margin-top": topMargin});
			}
		},
		handleWindowWidthChange: function() {
			Ember.run.scheduleOnce('afterRender', this, this.adjustForFoldedCorner);
		}.observes('windowManager.windowWidth', 'active')
    });
  }
);
