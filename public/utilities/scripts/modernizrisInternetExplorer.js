/*global define*/
/*
 Adds to Modernizr a test that detects Internet Explorer and returns the version of Internet Explorer.
 */
define('modernizrisInternetExplorer', [
	'modernizr'
], function (Modernizr) {
	"use strict";

	Modernizr.addTest('isInternetExplorer', function () {
		var browser = navigator.appName;
		var version = parseFloat(navigator.appVersion);

		if ((browser === "Microsoft Internet Explorer") && (version > 4)) {
			return Number(navigator.userAgent.match(/MSIE (\d+)/)[1]);
		}
		else {
			return false;
		}

	});
});
