define('consoleCompatibility', ['jquery'], function($) {
	"use strict";

	var commonConsoleMethodNames, idx, methodName;

	commonConsoleMethodNames = ['clear', 'count', 'debug', 'dir', 'dirxml',
		'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info',
		'log', 'markTimeline', 'profile', 'profileEnd', 'time', 'timeEnd',
		'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];

	if (typeof window.console === 'undefined') {
		window.console = {};
	}

	for (idx in commonConsoleMethodNames) {
		methodName = commonConsoleMethodNames[idx];
		if(typeof window.console[methodName] === 'undefined') {
			window.console[methodName] = $.noop;
		}
	}
});