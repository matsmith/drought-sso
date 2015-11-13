/**
 * When we resize a DOM element in response to a window resize event IE8 will
 * send a new window resize event. This leads to 100% CPU utilization on
 * systems using IE8. This wrapper function prevents this from happening.
 */

define('onWindowResize', [
	'jquery'
], function($) {
	'use strict';

	return function(callback) {
		var $window = $(window);
		var oldWidth = $window.width();
		var oldHeight = $window.height();

		return $window.on('resize', function(evt) {
			var newWidth = $window.width();
			var newHeight = $window.height();

			if (oldWidth !== newWidth || oldHeight !== newHeight) {
				oldWidth = newWidth;
				oldHeight = newHeight;

				callback(evt);
			}
		});
	};
});
