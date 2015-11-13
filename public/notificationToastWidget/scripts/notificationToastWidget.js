/*global define*/
define('notificationToastWidget', [
	'jquery',
	'knockout',
	'notificationToastWidgetTemplates',
	'baseWidget' // provides $.wnp.baseWidget
], function (
	$,
	ko,
	Templates
) {
	'use strict';

	$.widget('wnp.notificationToastWidget', $.wnp.baseWidget, {
		_widgetClass: 'notificationToastWidget',

		_createDom: function() {
			var self = this;

			this._setDom(Templates.notificationToastTemplate(this.vm));
			this.services.userNotification.subscribe('CERT_OF_ACHIEVEMENT', function (notifications) {
				var availableNotifications = notifications.filter(function (notification) {
					return notification.value === 'AVAILABLE';
				});

				if (availableNotifications.length > 0) {
					availableNotifications.forEach(function (notification) {
						self.services.userNotification.updateNotification(notification.id, { value: 'NOTIFIED' });
					});

					$(".notificationToastMessage").fadeIn(500).delay(5000).fadeOut(500);
				}
			});
			this._bindEvents();
		},

		_processData: function(data) {
			this.vm = data;
		},

		_fetchData: function () {
			var deferred = new $.Deferred();
			var contentPromise = this.services.resourceBundle.getResourceBundles(
				['toastNotificationContent'], this.options.locale
			);
			$.when(contentPromise).done(function(content) {
				var data = {
					content: content
				};
				deferred.resolve(data);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred;
		},
		_bindEvents: function(){
			this.element.on('click', '[data-bindpoint=achievementView]', function(){
				window.location.href = '/mhmsite/w/achievement';
			});
		},

	});


	return function notificationToastWidget(target, options, callbacks) {
		return $(target).notificationToastWidget(options, callbacks).data('notificationToastWidget');
	};

});
