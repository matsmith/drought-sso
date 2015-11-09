define('userNotificationService', [
	'baseService',
	'jquery',
	'knockout'
], function (Service, $, ko) {
	"use strict";
	var serviceName = "user-notification";
	if (!window.WNP) {
		window.WNP = {};
	}
	var WNP = window.WNP;
	WNP.userNotificationServiceResponse = {
		lastUpdated: ko.observable(Date.now()),
		notifications: []
	};

	function userNotificationService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;


		this.updateNotifications = function (urlParams, queryParams, options) {
			var promise = this.post(urlParams, queryParams, options);
			var deferred = new $.Deferred();
			promise.then(function (response) {
				self.updateServiceShare(self.unwrapResponse(response));
				deferred.resolve(true);
			});
			return deferred;
		};

		this.updateServiceShare = function (userNotificationResponse) {
			var notifications = [];
			if (userNotificationResponse.notifications) {
				notifications = userNotificationResponse.notifications;
			}
			WNP.userNotificationServiceResponse.notifications = Object.freeze(notifications);
			WNP.userNotificationServiceResponse.lastUpdated(Date.now());
		};
	}

	userNotificationService.serviceName = serviceName;
	userNotificationService.prototype = Service.prototype;

	return userNotificationService;
});