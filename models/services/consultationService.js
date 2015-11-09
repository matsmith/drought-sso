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
			var queryModel = {
				"locale": options.locale || "en_US"
			};

			// Set defaults and override them with passed in params
			// for both the URL and QUERY params
			urlParams = $.extend(true, urlModel, urlParams);
			queryParams = $.extend(true, queryModel, queryParams);

			return this.validateEndpointResponse(this.get(urlParams, queryParams));
		};

		this.getConsultationPageData = function(urlParams, queryParams) {
			var urlModel = {
				"consultationId": "",
				"pageNumber": ""
			};
			var queryModel = {
				"locale": options.locale || "en_US"
			};

			// Set defaults and override them with passed in params
			// for both the URL and QUERY params
			urlParams = $.extend(true, urlModel, urlParams);
			queryParams = $.extend(true, queryModel, queryParams);

			return this.validateEndpointResponse(this.get(urlParams, queryParams));
		};
	}
	ConsultationService.serviceName = serviceName;
	ConsultationService.prototype = Service.prototype;

	return ConsultationService;
});
