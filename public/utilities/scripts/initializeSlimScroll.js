define('initializeSlimScroll', [
	'jquery',
	'slimScroll'
], function($) {
	"use strict";

	$.fn.initializeSlimScroll = function(options) {
		var defaults = {
			size: "10px",
			alwaysVisible: true
		};
		// Using the scroll wheel a single step in Firefox causes the slimScroll
		// widget to jump through huge portions of content, often to its bottom.
		// This is due to the unique way Firefox interprets scroll wheel delta.
		// The slimScroll developer does not have a fix for this problem(1) so we
		// are applying a workaround on Firefox.
		// (1) https://github.com/rochal/jQuery-slimScroll/issues/111
		if(navigator.userAgent.indexOf("Firefox") !== -1) {
			defaults.wheelStep = 1;
		}
		return this.slimScroll($.extend({}, defaults, options));
	};
});
