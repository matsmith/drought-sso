/*global define*/
define("toolFeedbackService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "toolFeedback";
	function ToolFeedbackService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getFeedback = function(source, locale) {
			locale = options.locale || "en_US";

			var deferred = $.Deferred();

			var queryParams = {
				q: "findByToolName",
				toolName: source,
				locale: locale
			};

			self.get({}, queryParams).done(function(response) {
				try {
					response = self.unwrapResponse(response);
					if (response.responseCode !== 0) {
						deferred.reject(response);
						return;
					}
				} catch(e) {
					deferred.reject(self.processingFailureError());
				}
				response = self.unwrapResponse(response.tool);
				deferred.resolve( window.WNP.cacheModel.updateShared({
					context: self,
					response: response
				}));
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

	}
	ToolFeedbackService.serviceName = serviceName;
	ToolFeedbackService.prototype = Service.prototype;

	return ToolFeedbackService;
});
