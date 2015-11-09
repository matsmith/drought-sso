/*global define*/
var Service = require('./baseService'),
 	$ = require('jQuery'),
    window = window || global;

module.exports = function() {
	"use strict";

	var serviceName = "companyConfig";
	function CompanyConfigService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: ""
		};
		this.options = options;

		this.getCompanyConfig = function(features, locale) {
			locale = options.locale || "en_US";
			features = features || [];

			var deferred = $.Deferred();

			this.get({}, {
				locale: locale,
				featureName: features
			}).done(function(response) {
				var rawResponse = response;
				try {
					response = response.companyConfigResponse || response;
					if (response.responseCode !== 0) {
						console.log({
							context: this,
							msg: "incorrect responseCode",
							response: response
						});
						deferred.reject(response);
						return;
					}

					var companyConfigData = {
						company: response.company,
						features: {}
					};

					response.featureList.forEach(function(feature) {
						var featureData = {};

						if (feature.featureAttributeList) {
							feature.featureAttributeList.forEach(function(featureAttr) {
								featureData[featureAttr.name] = featureAttr.value;
							});

						}
						companyConfigData.features[feature.name] = featureData;
					});

					companyConfigData.url = rawResponse.url;
					deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: companyConfigData
					}));
				} catch(e) {
					self._log({
						context: this,
						error: e,
						msg: "reject",
						response: response
					});
					deferred.reject(response);
				}
			}).fail(function(response) {
				self._log({
					context: this,
					msg: "reject",
					response: response
				});
				deferred.reject(response);
			});

			return deferred.promise();
		};

	};

    CompanyConfigService.serviceName = serviceName;
    CompanyConfigService.prototype = Service.prototype;
	return CompanyConfigService;
}();
