/*global define*/
define("featureService", [
	"baseService",
	"jquery"
], function(Service, $) {
	"use strict";

	var serviceName = "feature";

	/* jshint camelcase: false */
	function FeatureConfigModel(configJson) {
		var config = {
			configId: configJson.entity1__id,
			configName: configJson.feature1__configurationName,
			configType: configJson.feature1__type
		};
		return config;
	}

	function FeatureModel(featureJson, featureConfig) {
		var feature = {
			id: featureJson.entity1__id,
			name: featureJson.feature1__name,
			category: featureJson.feature1__featureCategory[0].entity1__id,
			config: featureConfig,
			// domId used for automation/analytics
			domId: 'feature-' + featureJson.entity1__id
		};
		return feature;
	}
	/* jshint camelcase: true */

	function FeatureService(options) {
		var self = this;
		var featureSchema = "application/vnd.healthmedia.feature-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};

		this.options = options;

		this.getByCategory = function(featureCategoryId) {
			var options = {
				contentType: featureSchema
			};

			var requestPromise = self.get({}, {
				query: "featureCategory.id",
				"featureCategory.id": featureCategoryId
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				try {
					/*jshint camelcase: false */
					var featureConfigArr, currentConfig;
					var featureArr = response.model.feature1__feature || [];
					var features = [];

					if (!!featureArr.length && featureArr[0]) {
						featureArr.forEach(function(feature) {
							featureConfigArr = [];
							currentConfig = feature.feature1__featureConfigurationCollection.feature1__featureConfiguration || [];

							// Some configuration values come back as an object, we need an array
							if (!Array.isArray(currentConfig)) {
								currentConfig = [currentConfig];
							}

							currentConfig.forEach(function(config) {
								featureConfigArr.push(
									new FeatureConfigModel(config)
								);
							});

							features.push(
								new FeatureModel(feature, featureConfigArr)
							);
						});
					}

					self._log(self.serviceName + " refined stub response:");
					self._log({ model: features });
					/*jshint camelcase: true */
					deferred.resolve({
						model: features
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

	FeatureService.serviceName = serviceName;
	FeatureService.prototype = Service.prototype;

	return FeatureService;
});