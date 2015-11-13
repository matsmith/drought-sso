/*global define*/
/*
	Adds to Modernizr a test to see if the user's browser is an out-lier on backface-visibility
 */
define('modernizrBackfaceOutlier', [
	'modernizr'
], function(Modernizr){
	"use strict";

	Modernizr.addTest('backfaceoutlier', function() {
		return (navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/msie/i) || window.MSStream);
	});

});
