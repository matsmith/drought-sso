define([
		'ember',
		'jquery',
		'onWindowResize'
	], function(
		Ember,
		$,
		onWindowResize
	) {
		'use strict';

		return Ember.Object.extend({
			minDesktopSize: 1024,
			minTabletSize: 768,
			minWindowWidth: 320,
			windowWidth: null,
			windowHeight: null,

			layoutWidth: function() {
				return Math.max(this.get('windowWidth'), this.get('minWindowWidth'));
			}.property('windowWidth', 'minWindowWidth'),

			layout: function() {
				var width = this.get('windowWidth');
				if (width >= this.get('minDesktopSize')) {
					return 'desktop-layout';
				} else if (width >= this.get('minTabletSize')) {
					return 'tablet-layout';
				} else {
					return 'mobile-layout';
				}
			}.property('windowWidth'),

			init: function() {
				this._super();

				Ember.run.scheduleOnce('afterRender', this, this.updateWindowSize);
				onWindowResize(Ember.run.bind(this, this.updateWindowSize));
			},

			updateWindowSize: function() {
				if(window.parent && window.parent.WNP) {
					this.set('windowHeight', $(window.parent).height());
					this.set('windowWidth', $(window.parent).width());
				} else {
					this.set('windowHeight', $(window).height());
					this.set('windowWidth', $(window).width());
				}

				$('.questionnaire')
					.removeClass('mobile-layout')
					.removeClass('tablet-layout')
					.removeClass('desktop-layout')
					.addClass(this.get('layout'));
			}
		});
	}
);
