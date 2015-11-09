/*global define*/
define("companyFeatureService", [
	"baseService",
	"jquery"
], function(Service, $) {
	"use strict";

	var serviceName = "company-feature";

	/* jshint camelcase: false */
	function ReferenceCompanyModel(refJson) {
		var referenceCompany = {
			id: refJson.feature1__referenceCompany.entity1__id,
			externalId: refJson.feature1__referenceCompany.company1__externalCompanyId,
			name: refJson.feature1__referenceCompany.company1__name,
			usedBy: refJson.feature1__referenceCompany.company1__usedBy,
			// domId used for automation/analytics
			domId: 'ref-company-' + refJson.feature1__referenceCompany.entity1__id
		};
		return referenceCompany;
	}

	function FeatureConfigModel(configJson) {
		var config = {
			configName: configJson.feature1__featureConfiguration.feature1__configurationName,
			configValue: configJson.feature1__value
		};
		return config;
	}

	function CompanyFeatureModel(featureJson, featureConfig, referenceCompany) {
		var companyFeature = {
			id: featureJson.feature1__feature.entity1__id,
			name: featureJson.feature1__feature.feature1__name,
			category: featureJson.feature1__feature.feature1__featureCategory[0].entity1__id,
			config: featureConfig,
			referenceCompany: referenceCompany,
			// domId used for automation/analytics
			domId: 'feature-' + featureJson.feature1__feature.entity1__id
		};
		return companyFeature;
	}
	/* jshint camelcase: true */

	function CompanyFeatureService(options) {
		var self = this;
		var companyFeatureSchema = "application/vnd.healthmedia.company-feature-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};
		this.options = options;

		this.getByCompany = function(companyId) {
			var options = {
				contentType: companyFeatureSchema
			};
			var requestPromise = self.get({}, {
				query: "company.id",
				"company.id": companyId
				}, options);
			return this._refineResponse(requestPromise, options);
		};

		this.getByFeature = function(companyId, featureId) {
			var options = {
				contentType: companyFeatureSchema
			};

			var requestPromise = self.get({}, {
				query: "company.id-feature.id",
				"company.id": companyId,
				"feature.id": featureId
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this.getByCategory = function(companyId, featureCategoryId) {
			var options = {
				contentType: companyFeatureSchema
			};

			var requestPromise = self.get({}, {
				query: "company.id-featureCategory.id",
				"company.id": companyId,
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
					var featureConfigArr, currentConfig, referenceCompany;
					var featureArr = response.model.feature1__companyFeature || [];
					var companyFeatures = [];

					if(!!featureArr.length && featureArr[0]) {
						featureArr.forEach(function(feature) {
							featureConfigArr = [];
							currentConfig = feature.feature1__companyFeatureConfigurations.feature1__companyFeatureConfiguration || [];

							//If we have an entity Id on feature, we will have a reference company
							if (feature.entity1__id !== "null") {
								referenceCompany = new ReferenceCompanyModel(feature);
							} else {
								referenceCompany = null;
							}

							if (currentConfig) {
								currentConfig.forEach(function(config) {
									featureConfigArr.push(
										new FeatureConfigModel(config)
									);
								});
							}

							companyFeatures.push(
								new CompanyFeatureModel(feature, featureConfigArr, referenceCompany)
							);
						});
					}
					self._log(self.serviceName + " refined stub response:");
					self._log({ model: companyFeatures });
					/*jshint camelcase: true */
					deferred.resolve({ model: companyFeatures });
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

	CompanyFeatureService.serviceName = serviceName;
	CompanyFeatureService.prototype = Service.prototype;

	return CompanyFeatureService;
});