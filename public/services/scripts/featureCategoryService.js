/*global define*/
define("featureCategoryService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "feature-category";

	function CategoryModel(categoryJson) {
		/*jshint camelcase: false */
		var category = {
			id: categoryJson.entity1__id,
			name: categoryJson.feature1__name,
			// domId used for automation/analytics
			domId: 'feature-category-' + categoryJson.entity1__id
		};
		/*jshint camelcase: true */
		return category;
	}

	function FeatureCategoryService(options) {
		var self = this;
		var featureCategorySchema = "application/vnd.healthmedia.feature-category-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};
		this.options = options;


		this.getCategories = function() {
			var options = {
				contentType: featureCategorySchema
			};
			var requestPromise = self.get({}, {}, options);

			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				try {
					/*jshint camelcase: false */
					var featureCategoryArray = response.model.feature1__featureCategory || [];
					var refinedFeatureCategories = [];

					featureCategoryArray.forEach(function(category) {
						refinedFeatureCategories.push(
							new CategoryModel(category)
						);
					});
					/*jshint camelcase: true */

					self._log(self.serviceName + " refined stub response:");
					self._log({
						model: refinedFeatureCategories
					});
					deferred.resolve({
						model: refinedFeatureCategories
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

	FeatureCategoryService.serviceName = serviceName;
	FeatureCategoryService.prototype = Service.prototype;

	return FeatureCategoryService;
});