/*global define*/
/*
	Adds to Modernizr a test to see if the user's browser supports css calc
 */
define('modernizrCsscalc', [
	'modernizr'
], function(Modernizr){
	"use strict";

	Modernizr.addTest('csscalc', function() {
		var prop = 'width:';
		var value = 'calc(10px);';
		var el = document.createElement('div');
		el.style.cssText = prop + Modernizr._prefixes.join(value + prop);
		return !!el.style.length;
	});

});
