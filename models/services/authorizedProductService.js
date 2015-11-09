/*global define*/
define("authorizedProductService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "authorized-product";

	/* jshint camelcase: false */
	function ReferenceCompanyModel(companyJson) {
		var referenceCompany = {
			id: companyJson.entity1__id,
			externalId: companyJson.company1__externalCompanyId,
			name: companyJson.company1__name,
			parentId: companyJson.company1__parentCompany.entity1__id,
			rootId: companyJson.company1__rootCompany.entity1__id,
			status: companyJson.company1__status.common1__status,
			type: companyJson.company1__companyType,
			uniqueUserId: companyJson.company1__uniqueUserCompany.entity1__id,
			usedBy: companyJson.company1__usedBy,
			createDate: companyJson.entity1__createDate,
			// domId used for automation/analytics
			domId: 'company-' + companyJson.entity1__id
		};

		return referenceCompany;
	}

	function AuthorizationModel(authJson) {
		var authorization = {
			id: authJson.entity1__id,
			code: authJson.company1__accessCode,
			companyId: authJson.company1__company[0].entity1__id,
			expirationDates: {
				login: authJson.company1__loginExpireDate,
				registration: authJson.company1__registartionExpireDate,
				submission: authJson.company1__submissionExpireDate
			},
			name: authJson.company1__name,
			status: authJson.company1__status.common1__status,
			testData: authJson.company1__testData,
			// domId used for automation/analytics
			domId: 'auth-' + authJson.entity1__id
		};

		return authorization;
	}

	function AuthorizedProductModel(product) {
		var authorizedProduct = {
			id: product.company1__product.entity1__id,
			name: product.company1__product.product1__name,
			displayRankName: product.company1__product.product1__productDisplayRankName,
			type: product.company1__product.product1__productType,
			// domId used for automation/analytics
			domId: 'auth-product-' + product.company1__product.entity1__id
		};

		// If we have a reference company from querying by company Id, use ReferenceCompanyModel
		if (product.company1__company) {
			authorizedProduct.referenceCompany = new ReferenceCompanyModel(product.company1__company[0]);
		// Otherwise, we are querying by authorization code, use AuthorizationModel
		} else if (product.company1__authorization) {
			authorizedProduct.authorization = new AuthorizationModel(product.company1__authorization[0]);
		}

		return authorizedProduct;
	}
	/*jshint camelcase: true */

	function AuthorizedProductService(options) {
		var self = this;
		var authorizedProductSchema = "application/vnd.healthmedia.authorized-product-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};
		this.options = options;


		this.getByCompanyId = function(companyId) {
			var options = {
				contentType: authorizedProductSchema
			};
			var requestPromise = self.get({}, {
				query: "company.id",
				"company.id": companyId
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this.getByAccessCode = function(accessCode) {
			var options = {
				contentType: authorizedProductSchema
			};
			var requestPromise = self.get({}, {
				query: "authorization.accessCode",
				"authorization.accessCode": accessCode
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				try {
					/*jshint camelcase: false */
					var authorizedProductArray = response.model[0].company1__authorizedProduct || [];
					var refinedAuthorizedProducts = [];
					/*jshint camelcase: true */

					authorizedProductArray.forEach(function(product) {
						refinedAuthorizedProducts.push(
							new AuthorizedProductModel(product)
						);
					});

					self._log(self.serviceName + " refined stub response:");
					self._log({
						authorizedProducts: refinedAuthorizedProducts
					});
					deferred.resolve({
						authorizedProducts: refinedAuthorizedProducts,
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

	AuthorizedProductService.serviceName = serviceName;
	AuthorizedProductService.prototype = Service.prototype;

	return AuthorizedProductService;
});