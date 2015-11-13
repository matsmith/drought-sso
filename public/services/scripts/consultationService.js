/*global define*/
define("consultationService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "consultation";
	function ConsultationService(options) {

		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			 get: "/::consultationId::/::page::"
		};
		this.options = options;

		this.getConsultationData = function(urlParams, queryParams) {
			var urlModel = {
				"consultationId": ""
			};

			// Set defaults and override them with passed in params
			// for the URL
			urlParams = $.extend(true, urlModel, urlParams);
			return this.validateEndpointResponse(this.get(urlParams, queryParams));
		};

		this.getConsultationPageData = function(urlParams, queryParams) {
			var urlModel = {
				"consultationId": "",
				"pageNumber": ""
			};

			// Set defaults and override them with passed in params
			// for the URL
			urlParams = $.extend(true, urlModel, urlParams);

			return this.validateEndpointResponse(this.get(urlParams, queryParams));
		};
	}
	ConsultationService.serviceName = serviceName;
	ConsultationService.prototype = Service.prototype;

	return ConsultationService;
});
