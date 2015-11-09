/*global define*/
define("skillPlanService", [
	"baseService",
	'jquery'
], function(Service, $) {
	"use strict";

	var serviceName = "skillPlan";

	function SkillPlanService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getSkillPlan = function(enrollmentId, locale) {
			locale = options.locale || "en_US";

			var deferred = new $.Deferred();

			self.get({}, {
				q: "findByProductEnrollment",
				enrollmentId: enrollmentId,
				locale: locale
			}).done(function(response) {
				var rawResponse = response;
				response = self.unwrapResponse(response);
				if (response.responseCode !== 0) {
					deferred.reject(response);
					return;
				}

				try {
					if (response.goal.content) {
						response.goal = response.goal.content[0].content;
					}

					if (response.skill) {
						response.skill.forEach(function(skill) {
							skill.content = skill.content || [];
							skill.content.forEach(arrayizeContentItems);
						});
					}

					response.url = rawResponse.url;
					deferred.resolve(window.WNP.cacheModel.updateShared({
						context: self,
						response: response
					}));
				} catch (e) {
					console.log({
						context: this,
						error: e,
						msg: "reject",
						response: response
					});
					deferred.reject(self.processingFailureError());
				}
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.tailorSkillPlan = function(productName){
			return this.validateEndpointResponse(
				self.post({}, {
					productName: productName,
					productComponentType: "PLAN"
				})
			);
		};

		function arrayizeContentItems(contentItem) {
			if (contentItem.type === "tabCallout" || contentItem.type === "accordionCallout") {
				contentItem.items = contentItem.items || [];
				contentItem.items.forEach(function(calloutItem) {
					calloutItem.title = calloutItem.title || "";
					calloutItem.content = calloutItem.content || [];
					calloutItem.content.forEach(arrayizeContentItems);
				});
			}
		}
	}
	SkillPlanService.serviceName = serviceName;
	SkillPlanService.prototype = Service.prototype;

	return SkillPlanService;
});
