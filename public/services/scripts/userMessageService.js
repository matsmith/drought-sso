/*global define*/
define("userMessageService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "user-message";
	function UserMessageService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getUserMessage = function(enrollmentId) {

			var deferred = $.Deferred();
			var urlParams = {};
			var queryParams = {
				query: "productEnrollment.id-locale",
				"productEnrollment.id": enrollmentId,
				locale: this.options.locale || ""
			};
			var options = {
				contentType: "application/vnd.healthmedia.user-message+json;version=1.0"
			};

			this.validateEndpointResponse(
					this.get(urlParams, queryParams, options),
					options
				).done(function(response) {
					try {
						/*jshint camelcase: false */
						var messageItem = response.model.message1__messageItems
							.message1__messageItem;
						var actionStepId = +messageItem.message1__typeId || null;

						deferred.resolve({
							message: messageItem.message1__message,
							actionStepId: actionStepId
						});
						/*jshint camelcase: true */
					} catch (e) {
						self._log(e);
						deferred.reject(response);
					}
				}).fail(function(response) {
					deferred.reject(response);
				});

			return deferred.promise();
		};


	}
	UserMessageService.serviceName = serviceName;
	UserMessageService.prototype = Service.prototype;

	return UserMessageService;
});
