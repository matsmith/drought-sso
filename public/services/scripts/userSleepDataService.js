/*global define*/
define("userSleepDataService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "user-sleep-data";

	function userSleepDataService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.updateId = function (data, id) {

			this.resourceStrings = {
				post: "/::userId::"
			};
			var deferred = $.Deferred();
			var urlParams = {
				userId: id || ""
			};

			this.validateEndpointResponse(
				self.post(
					urlParams,
					data
				),
				options
			).done(function (response) {
				deferred.resolve(response);
			}).fail(function (response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.createId = function (id) {
			var deferred = $.Deferred();
			var urlParams = {
				userId: id
			};

			this.validateEndpointResponse(
				self.put(urlParams),
				options
			).done(function (response) {
				deferred.resolve(response);
			}).fail(function (response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};
	}

	userSleepDataService.serviceName = serviceName;
	userSleepDataService.prototype = Service.prototype;

	return userSleepDataService;

});
