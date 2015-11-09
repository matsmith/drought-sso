/*global define*/
define("consultationSectionStatusService", ["baseService", "jquery"], function(Service, $) {
	"use strict";

	var serviceName = "consultation-section-status";
	function ConsultationSectionStatusService(options) {
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get : "",
			post : ""
		};
		this.options = options;

		this.getData = function(params) {
			var queryParams = {
				"q" : params.q || "findByProductEnrollmentId",
				"productEnrollmentId" : params.productEnrollmentId || 1
			};

			return this.validateEndpointResponse(this.get({}, queryParams));
		};

		this.postData = function(data) {
			var myData = {
				"consultationSectionStatus" : {
					"enrollmentSectionStatus" : [{
						"productEnrollmentId" : data.productEnrollmentId.toString(),
						"sectionGroup" : [{
							"id" : data.sectionGroupId,
							"section" : [{
								"id" : data.sectionId,
								"status" : data.sectionStatus
							}]
						}]
					}]
				}
			};
			return this.validateEndpointResponse(this.post({}, myData));
		};
	}

	ConsultationSectionStatusService.serviceName = serviceName;
	ConsultationSectionStatusService.prototype = Service.prototype;

	return ConsultationSectionStatusService;
});
