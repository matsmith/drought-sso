/*global define*/
define('koCustomBindings', [
	'jquery',
	'knockout'
], function ($, ko) {
	"use strict";

	ko.bindingHandlers.showPage = {
		update: function(element, valueAccessor, allBindings) {
			var value = ko.unwrap(valueAccessor());
			if($(element).data("page") === value) {
				$(element).show();
			} else {
				$(element).hide();
			}
		}
	};
});
