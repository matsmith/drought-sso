/*global define*/
define("saveToPdfService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "pdf";
	function SaveToPdfService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.saveToPdf = function(fileName, html) {

			var deferred = $.Deferred();

			self.post({}, {
				fileName: fileName,
				html: html
			}).done(function(response) {
				response = self.unwrapResponse(response);
				if (response.responseCode !== 0) {
					deferred.reject(response);
					return;
				}
			}).fail(function(response) {
				deferred.reject(response);
			});
			return deferred.promise();
		};
	}
	SaveToPdfService.serviceName = serviceName;
	SaveToPdfService.prototype = Service.prototype;

	return SaveToPdfService;
});
