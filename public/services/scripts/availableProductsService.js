/*global define*/
define("availableProductsService", [
	"baseService"
], function (Service) {
	"use strict";

	var serviceName = "availableProducts";
	function AvailableProductsService(options) {
		var self = this;
		self.serviceName = serviceName;
		self.endpointType = self.CPUD_ENDPOINT_TYPE;
		self.resourceStrings = {
			get: "",
			post: ""
		};
		self.options = options;

		self.getAvailableProducts = function(locale) {
			return self.validateEndpointResponse(
				self.get({}, {
					locale: options.locale
				})
			);
		};

		self.getAvailableProductByProductName = function(product, locale) {
			return self.validateEndpointResponse(
				self.get({}, {
					q: "findByProduct",
					product: product,
					locale: options.locale
				})
			);
		};
	}
	AvailableProductsService.serviceName = serviceName;
	AvailableProductsService.prototype = Service.prototype;

	return AvailableProductsService;
});
