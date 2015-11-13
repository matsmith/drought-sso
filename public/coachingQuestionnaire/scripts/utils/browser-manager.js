/*jshint camelcase: false */
define([
	'ember',
	'jquery'
], function(
	Ember,
	$
) {
	'use strict';

	return Ember.Object.extend({
		init: function() {
			this._super();
			this.setBrowser();
		},
		onMobile: false,
		isMobile_Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		isMobile_BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		isMobile_iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		isMobile_Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		isMobile_Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		isMobile_any: function () {
			return this.isMobile_Android() || this.isMobile_BlackBerry() || this.isMobile_iOS() || this.isMobile_Opera() || this.isMobile_Windows();
		},
		isLandscape: function() {
			return $(window).width() / $(window).height() > 1;
		},
		isPortrait: function() {
			return $(window).height() / $(window).width() >= 1;
		},
		get_browser: function () {
			var a, b, c, d;
			return b = navigator.appName, d = navigator.userAgent, c = void 0, a = d.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i), a && null !== (c = d.match(/version\/([\.\d]+)/i)) && (a[2] = c[1]), a = a ? [a[1], a[2]] : [b, navigator.appVersion, "-?"], a[0];
		},
		get_browser_version: function () {
			var a, b, c, d;
			return b = navigator.appName, d = navigator.userAgent, c = void 0, a = d.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i), a && null !== (c = d.match(/version\/([\.\d]+)/i)) && (a[2] = c[1]), a = a ? [a[1], a[2]] : [b, navigator.appVersion, "-?"], a[1];
		},
		trimDecimals: function(number){
			return number.split(".", 1).toString();
		},
		setBrowser: function(){
			this.set('browser', this.get_browser());
			this.set('browserVersion', this.trimDecimals(this.get_browser_version()));
			this.set('onMobile', this.doesExist(this.isMobile_any()));

			this.setEventActions();
		},
		setEventActions: function() {
			if(this.get('onMobile')) {
				this.set('clickAction', 'touchstart');
				this.set('startEventAction', 'touchstart');
				this.set('moveEventAction', 'touchmove');
				this.set('endEventAction', 'touchend');
				this.set('cancelEventAction', 'touchcancel');
			} else {
				this.set('clickAction', 'click');
				this.set('startEventAction', 'mousedown');
				this.set('moveEventAction', 'mousemove');
				this.set('endEventAction', 'mouseup');
				this.set('cancelEventAction', 'mouseleave');
			}
		}
	});
}
);
