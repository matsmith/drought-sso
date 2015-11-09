/*global define*/
var Service = require('./baseService'),
	$ = require('jquery');

module.exports = function() {
	"use strict";

	var serviceName = "resourceBundle";
	function ResourceBundleService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getResourceBundles = function(bundleNames, locale) {

			locale = options.locale || "en_US";

			var deferred = $.Deferred();

			self.get({}, {
				q: "findByBundleNameAndLocale",
				bundleName: bundleNames,
				locale: locale
			}).done(function(response) {
				var rawResponse = response;
				response = self.unwrapResponse(response);
				if (response.responseCode !== 0) {
					deferred.reject(response);
					return;
				}

				var keyedBundle = {};
				try {
					response.resourceBundle.forEach( function(bundle) {
						var keyedValues = {};

						bundle.contentValues.forEach( function(keyValuePair) {
							keyedValues[keyValuePair.contentKey] = keyValuePair.content;
						});

						keyedBundle[bundle.name] = keyedValues;
					});
				} catch (e) {
					this._log({
						context: this,
						error: e,
						msg: "reject",
						response: response
					});
					deferred.reject(self.processingFailureError());
				}
				keyedBundle.url = rawResponse.url;
				deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: keyedBundle
					}));
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};
	}
	ResourceBundleService.serviceName = serviceName;
	ResourceBundleService.prototype = Service.prototype;

	return ResourceBundleService;
}();
