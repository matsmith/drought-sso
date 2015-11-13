/*global define*/
define('isTouchClick', [
	'jquery'
], function($){
	"use strict";

	return function isTouchClick(touchendEvt) {
		var evt = touchendEvt.originalEvent;
		var touchX = evt.changedTouches[0].clientX;
		var touchY = evt.changedTouches[0].clientY;
		var targetOffset = $(evt.target).offset();
		return touchX > targetOffset.left &&
			touchX < targetOffset.left + $(evt.target).outerWidth() &&
			touchY > targetOffset.top &&
			touchY < targetOffset.top + $(evt.target).outerHeight();
	};

});
