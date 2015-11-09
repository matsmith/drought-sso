/*global define*/
define("actionStepService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "actionStep";
	function ActionStepService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: "/::actionStepId::"
		};
		this.options = options;

		this.getActionSteps = function(enrollmentId) {
			var deferred = new $.Deferred();

			self.get({}, {
				q: "findByEnrollmentId",
				enrollmentId: enrollmentId
			}).done(function(response) {
				var rawResponse = response;
				response = self.unwrapResponse(response);
				if (response.responseCode !== 0) {
					deferred.reject(response);
					return;
				}

				response.actionStep.forEach(function(actionStep) {
					if (Array.isArray(actionStep.property)) {
						var properties = actionStep.property;
						actionStep.property = {};

						properties.forEach(function(property) {
							actionStep.property[property.name] = property.value;
						});
					}
				});

				response.url = rawResponse.url;
				deferred.resolve(window.WNP.cacheModel.updateShared({
					context: self,
					response: response
				}));
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		/**
		 *
		 * @param actionStepId
		 * @param rating - value values: "THUMBS_UP", "THUMBS_DOWN"
		 * @returns {*}
		 */
		this.rateActionStep = function(actionStepId, rating) {
			return this.validateEndpointResponse(
				self.post({
					actionStepId: actionStepId
				}, {
					rating: rating
				})
			);
		};

		function postStatusChange(actionStepId, statusChangeEvent) {
			return self.validateEndpointResponse(
				self.post({
					actionStepId: actionStepId
				}, {
					event: statusChangeEvent
				})
			);
		}

		this.START_EVENT = "STARTED";
		this.REMOVE_EVENT = "REMOVED";
		this.COMPLETE_EVENT = "COMPLETED";
		this.startActionStep = function(actionStepId) {
			return postStatusChange(actionStepId, this.START_EVENT);
		};

		this.removeActionStep = function(actionStepId) {
			return postStatusChange(actionStepId, this.REMOVE_EVENT);
		};

		this.completeActionStep = function(actionStepId) {
			return postStatusChange(actionStepId, this.COMPLETE_EVENT);
		};


		this.changePriority = function(actionStepId, priority) {
			return this.validateEndpointResponse(
				self.post({
					actionStepId: actionStepId
				}, {
					priority: priority
				})
			);
		};

	}
	ActionStepService.serviceName = serviceName;
	ActionStepService.prototype = Service.prototype;

	return ActionStepService;
});
