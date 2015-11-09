/*global define*/
define("ampCompanyFeatureService", [
	"baseService",
	"jquery"
], function(Service, $) {
	"use strict";

	var serviceName = "amp-company-feature";

	//@TODO: Make sure backend implements the double underscore convention as established previously for PUT methods
	function ConfigurationModel(configJson) {
		var configuration = {
			"feature1.featureConfiguration": {
				"entity1.id": configJson.configId,
				"feature1.configurationName": configJson.configName
			},
			"feature1.value": configJson.configValue
		};

		return configuration;
	}

	function FeatureModel(featureJson) {
		var feature = {
			"feature1.ampCompanyFeatures": {
				"feature1.ampCompanyFeature": [
					{
						"feature1.feature": {
							"entity1.id": featureJson.id,
							"feature1.name": featureJson.name
						},
						"feature1.company": {
							"entity1.id": featureJson.activeCompany.id,
							"company1.externalCompanyId": featureJson.activeCompany.externalId
						},
						"feature1.referenceCompany": {
							"entity1.id": featureJson.activeCompany.id,
							"company1.externalCompanyId": featureJson.activeCompany.externalId
						},
						"feature1.ampCompanyFeatureConfigurations": {
							"feature1.ampCompanyFeatureConfiguration": []
						}
					}
				]
			}
		};
		var configLen = featureJson.config.length;
		var configArr = feature["feature1.ampCompanyFeatures"]["feature1.ampCompanyFeature"][0]["feature1.ampCompanyFeatureConfigurations"]["feature1.ampCompanyFeatureConfiguration"];
		var i;

		for (i = 0; i < configLen; i++) {
			// If our configValue is not set, do not include in payload
			if (featureJson.config[i].configValue !== '') {
				configArr.push(new ConfigurationModel(featureJson.config[i]));
			}
		}

		return feature;
	}

	function AmpCompanyFeatureService(options) {
		var self = this;
		var ampCompanyFeatureSchema = "application/vnd.healthmedia.amp-company-feature-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};

		this.options = options;

		this.putData = function(data) {
			var options = {
				contentType: ampCompanyFeatureSchema
			};
			var myData = new FeatureModel(data);
			var requestPromise = self.put({}, myData, options);

			return this._refineResponse(requestPromise, options);
		};


		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				// @TODO: Check for expected response once backend implements response
				try {
					// @TODO: Model response data
					self._log(self.serviceName + " refined stub response:");
					self._log({ model: response.model });
					deferred.resolve({
						model: response.model
					});
				} catch (e) {
					self._log(e);
					deferred.reject(response);
				}
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

	}

	AmpCompanyFeatureService.serviceName = serviceName;
	AmpCompanyFeatureService.prototype = Service.prototype;

	return AmpCompanyFeatureService;
});