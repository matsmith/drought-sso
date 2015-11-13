/*global define, Handlebars*/
define('handlebarsHelpers', [
	'handlebars'
], function (handlebars) {
	"use strict";
	Handlebars.registerHelper('ifAssert', function(v1, v2, options) {
	  if(v1 === v2) {
		return options.fn(this);
	  }
	  return options.inverse(this);
	});
});