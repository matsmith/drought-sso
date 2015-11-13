/*global define*/
define('handlebarsHelpers', [
	'handlebars',
	'moment'
], function (Handlebars, moment) {
	"use strict";

	Handlebars.registerHelper("debug", function(optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);

		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});

	Handlebars.registerHelper('dateFormat', function(context, block) {
		if (window.moment) {
			var f = block.hash.format || "MMM D, YYYY";
			return moment(new Date(context)).format(f);
		} else {
			return context;   //  moment plugin not available. return data as is.
		}
	});

	Handlebars.registerHelper("formatValueRemoveSpaces", function(value) {
		if(!value) {
			return "";
		}
		return value.replace(" ", "");
	});

});
