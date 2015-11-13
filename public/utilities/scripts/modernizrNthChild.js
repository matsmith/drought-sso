/*global define*/
/*
	Adds to Modernizr a test to see if the user's browser supports Nth child
 */
define('modernizrNthChild', [
	'modernizr'
], function(Modernizr){
	"use strict";
	Modernizr.testStyles(" #modernizr div:nth-child(3n){width:10px;} ", function(elem, rule){
		Modernizr.addTest("isnthchildsupported", function(){
			var bool = false, divs = elem.getElementsByTagName("div");
			var test = function(i){
				return divs[i].currentStyle.width === "10px";
			};
			if (divs.length === 7){
				if (window.getComputedStyle) {
					test = function(i){
						return getComputedStyle(divs[i], null).width === "10px";
					};
				}
				bool = !test(0) && !test(1) && test(2) && !test(3) && !test(4) && test(5) && !test(6);
			}
			return bool;
		});
	}, 7);
});
