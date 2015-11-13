/*global define*/
define("exampleService", [
	"baseService"
], function (Service) {
	"use strict";

	var serviceName = "example";
	function ExampleService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: "/::exampleUrlParam::/staticUrlFragment"
		};
		this.options = options;

		this.getExampleByQueryParam = function(param) {
			return this.validateEndpointResponse(
				self.get({}, {
					q: "findByEnrollmentId",
					param: param
				})
			);
		};

		this.postExampleWithDataByUrlParam = function(urlParam, data) {
			return this.validateEndpointResponse(
				self.post({
					exampleUrlParam: urlParam
				}, {
					data: data
				})
			);
		};
	}
	ExampleService.serviceName = serviceName;
	ExampleService.prototype = Service.prototype;

	return ExampleService;
});
