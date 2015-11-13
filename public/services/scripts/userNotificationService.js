define('userNotificationService', [
	'baseService',
	'jquery',
	'knockout',
	'deepFreeze'
], function (Service, $, ko, deepFreeze) {
	"use strict";
	var NOTIFICATION_CHECK_DELAY = 2000;
	var serviceName = "user-notification";
	var callbacks = {};
	var notificationCheckTimeoutId = null;

	function userNotificationService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: "",
			put: "/::id::"
		};
		this.options = options;

		/**
		 * Callback for userNotificationService.subscribe()
		 *
		 * function callback(notifications) {
		 *     console.log("Notification Count = ", notifications.length);
		 * }
		 *
		 * @callback userNotificationService~subscribeCallback
		 * @param {object[]} Array of notifications
		 */

		/**
		 * Subscribe to a notification event. The callback function receives an array of
		 * all "AVAILABLE" and "NOTIFIED" notifications.
		 *
		 * services.userNotification.subscribe(function (notifications) {
		 *     console.log("Notification Count = ", notifications.length);
		 * });
		 *
		 * @param {string} notificationType - Type of notification to check for. See wiki.
		 * @param {userNotificationService~subscribeCallback} callback - Function that will be called when a notification occurs.
		 * @see https://wiki.healthmedia.com/architecture:projects:achievements:certificate_of_achievement#user_notifications_service
		 */
		this.subscribe = function (notificationType, callback) {
			if (!callbacks[notificationType]) {
				callbacks[notificationType] = [];
			}
			callbacks[notificationType].push(callback);
		};

		/**
		 * Schedule a server check for new notifications. If any were found subscribers will
		 * be notified. Per the architecture team, there is an internally managed delay
		 * between calling this method and the actual server call.
		 *
		 * You should call this method _after_ a service call that might trigger a
		 * notification has responded. E.g.
		 *
		 * services.actionStep.addActionStep(...).then(function (response) {
		 *     services.userNotification.scheduleNotificationCheck("CERT_OF_ACHIEVEMENT");
		 * });
		 *
		 * @param {string} notificationType - Type of notification to check for. See wiki.
		 * @see https://wiki.healthmedia.com/architecture:projects:achievements:certificate_of_achievement#user_notifications_service
		 */
		this.scheduleNotificationCheck = function (notificationType) {
			var data = {
				notifications: [
					{
						type: notificationType
					}
				]
			};

			function checkAndDeliverNotifications() {
				notificationCheckTimeoutId = null;
				self.post({}, data, options).then(function (response) {
					var unwrappedResponse = self.unwrapResponse(response);
					var notifications = unwrappedResponse.notifications || [];
					var frozenNotifications = deepFreeze(notifications);

					if (callbacks[notificationType]) {
						callbacks[notificationType].forEach(function (callback) {
							callback(frozenNotifications);
						});
					}
				});
			}

			// This prevents multiple calls to checkAndDeliverNotifications from being queued up.
			if (notificationCheckTimeoutId) {
				clearTimeout(notificationCheckTimeoutId);
			}

			notificationCheckTimeoutId = setTimeout(checkAndDeliverNotifications, NOTIFICATION_CHECK_DELAY);
		};

		/**
		 * Update properties of a notification by ID.
		 *
		 * var notificationId = 11111;
		 * services.userNotification.updateNotification(notificationId, {
		 *     value: "NOTIFIED"
		 * });
		 *
		 * @param {int} id - Notification ID
		 * @param {object} notificationData - Properties to update.
		 * @return {Promise}
		 */
		this.updateNotification = function (id, notificationData) {
			var urlParams = {
				id: id
			};
			var data = {
				"notifications": [notificationData]
			};

			return this.validateEndpointResponse(self.put(urlParams, data), options);
		};
	}

	userNotificationService.serviceName = serviceName;
	userNotificationService.prototype = Service.prototype;

	return userNotificationService;
});