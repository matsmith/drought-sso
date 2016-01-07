/*global define*/
var Service = require('./baseService'),
	$ = require('./jQuery'),
	window = window || global;

module.exports = function() {
	//"use strict";

	var serviceName = "securityServices";
	function SecurityService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.INTERNAL_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "/::tokenEndpoint::"
		};
		this.options = options;

		this.getJsonWebToken = function(bundleNames, locale) {

			locale = options.locale || "en_US";

			var deferred = $.Deferred();

			self.get({
                tokenEndpoint: "jwt-token"
            }, {}).done(function(response) {
				deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: response
			    }));
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};
	}
	SecurityService.serviceName = serviceName;
	SecurityService.prototype = Service.prototype;

	return SecurityService;
}();
