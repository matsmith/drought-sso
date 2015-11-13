define('errorModal', [
	'jquery',
	'utilitiesTemplates',
	'modal',
	'jquery-ui' //import provides $.widget
], function($,templates) {
	"use strict";

	$.widget("wnp.errorModal", $.wnp.modal, {
		options: {},
		container: "errorModal",
		_create: function() {
			$(this.element)
				.append("<div class='"+this.container+" col-xs-4 col-xs-offset-4'></div>");
			this.render();
			$(this.element).find("."+this.container).modal(this.options);
		},
		render: function() {
			var failureText = {
				serviceFailureHeader: "There was an issue communicating with a service.",
				serviceFailureContent: "Please reload the page. We apologize for the inconvenience.",
				serviceFailureButtonText: "Reload the application"
			};
			if (this.options.textContent && this.options.textContent.common) {
				$.extend(failureText, this.options.textContent.common);
			}
			$(this.element).find("."+this.container)
				.append(templates.errorModal(failureText));
			$(this.element).find("."+this.container).on("click", "button", function() {
				location.reload();
			});
		},
		_destroy: function() {
			$(this.element).find("."+this.container).remove();
		}
	});
});