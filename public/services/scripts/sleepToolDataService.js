/*global define*/
define("sleepToolDataService", [
	"baseService"
], function (Service, $) {
	"use strict";

	var serviceName = "user-sleep-tool-data";

	function sleepToolDataService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getUserData = function (minDays) {
			minDays = minDays || 35;
			return self.get({}, {
				query: 'withMinimumDays',
				minimumDays: minDays
			});
		};
	}

	sleepToolDataService.serviceName = serviceName;
	sleepToolDataService.prototype = Service.prototype;

	return sleepToolDataService;

});
