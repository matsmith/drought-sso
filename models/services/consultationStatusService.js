/*global define*/
define("consultationStatusService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "consultation-status";
	function ConsultationStatusService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			post: ""
		};
		this.options = options;

		this.postData = function(data) {
			var status = {
				"productEnrollmentId": data.productEnrollmentId || 1,
				"productComponentType": data.productComponentType || "BASELINE",
				"statusCode": data.statusCode || "QUESTIONNAIRE_STARTED"
			};

			return self.validateEndpointResponse(self.post({}, status));
		};
	}
	ConsultationStatusService.serviceName = serviceName;
	ConsultationStatusService.prototype = Service.prototype;

	return ConsultationStatusService;
});
