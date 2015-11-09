/*global define*/
define("skillService", [
	"baseService"
], function (Service) {
	"use strict";

	var serviceName = "skill";
	function SkillService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: "/::skillId::"
		};
		this.options = options;

		this.getSkills = function(enrollmentId) {
			return this.validateEndpointResponse(
				self.get({}, {
					q: "findByEnrollmentId",
					enrollmentId: enrollmentId
				})
			);
		};

		this.postSkillSeen = function(skillId, enrollmentId) {
			return this.validateEndpointResponse(
				self.post({
					skillId: skillId
				}, {
					seen: true,
					enrollmentId: enrollmentId
				})
			);
		};
	}
	SkillService.serviceName = serviceName;
	SkillService.prototype = Service.prototype;

	return SkillService;
});
