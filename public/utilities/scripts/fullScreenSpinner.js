/*global define*/
define('fullScreenSpinner', [
	'jquery',
	'utilitiesTemplates',
	'knockout',
	'baseWidget', // provides $.wnp.baseWidget
	'loaderSpinner',
	'jquery-ui',
	'baseWidget'
], function($, Templates, ko){
	"use strict";

	var DEFAULT_PRIMARY_COLOR = "#505a5b";
	var DEFAULT_ACTIVE_COLOR = "#cbcbcb";
	$.widget("wnp.fullScreenSpinner", $.wnp.baseWidget, {
		_widgetClass: "fullScreenSpinner",
		options: {
			primaryColor: DEFAULT_PRIMARY_COLOR,
			activeColor: DEFAULT_ACTIVE_COLOR,
			strokeWidth: 5,
			size: 100,
			isVisible: true
		},
		_beforeFetchData: function() {
			if (typeof this.options.isVisible !== 'function') {
				this.options.isVisible = ko.observable(this.options.isVisible);
			}
			this.element.append(Templates.fullScreenSpinner(this.options));
			ko.applyBindings(this.options, this.element[0]);
		},

		_destroy: function () {
			this.options.isVisible(false);
			this._superApply(arguments);
		}
	});

	return function WnpFullScreenSpinner(target, options) {
		return $(target).fullScreenSpinner(options).data("wnpFullScreenSpinner");
	};
});
