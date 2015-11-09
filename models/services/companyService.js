/*global define*/
define("companyService", [
	"baseService",
	"jquery"
], function(Service, $) {
	"use strict";

	var serviceName = "company";

	function CompanyModel(companyJson) {
		/*jshint camelcase: false */
		var company = {
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
		/*jshint camelcase: true */
		return company;
	}

	function CompanyService(options) {
		var self = this;
		var companyCollectionSchema = "application/vnd.healthmedia.company-collection+json;version=1.0";
		var companySchema = "application/vnd.healthmedia.company+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "/::companyId::",
			post: "",
			put: ""
		};
		this.options = options;


		this.getCompanyById = function(companyId) {
			var options = {
				contentType: companySchema
			};
			var ajaxPromise = self.get({
				companyId: companyId
			}, {}, options);
			return this._refineResponse(ajaxPromise, options);
		};

		this.getRootCompanies = function() {
			var options = {
				contentType: companyCollectionSchema
			};
			var ajaxPromise = self.get({
				companyId: ""
			}, {
				query: "parentCompany.isNull"
			}, options);
			return this._refineResponse(ajaxPromise, options);
		};

		/**
		 *
		 * @param params {object} key/value pairs containing query values
		 */
		this.getCompanySearch = function(params) {
			var options = {
				contentType: companyCollectionSchema
			};
			var ajaxPromise = self.get({
				companyId: ""
			}, {
				query: "rootCompany.id-companyType-externalId.isLike-result.maxCount",
				"rootCompany.id": params.rootCompanyId,
				companyType: params.companyType.toUpperCase() || "STANDARD",
				externalId: params.externalId.toLowerCase().replace(/\s/g, ''),
				"result.maxCount": params.maxCount || "100"
			}, options);

			return this._refineResponse(ajaxPromise, options);
		};

		this.postCreateCompany = function(data) {
			/*jshint camelcase: false */
			var myData = {
				"company1__companies": {
					"company1__company": {
						"company1__externalCompanyId": data.externalCompanyId.toLowerCase(),
						"company1__name": data.name.toString(),
						"company1__status": {
							"common1__status": data.status.toUpperCase()
						},
						"company1__usedBy": data.usedBy,
						"company1__parentCompany": {
							"entity1__id": data.parentCompany
						},
						"company1__rootCompany": {
							"entity1__id": data.rootCompany
						},
						"company1__uniqueUserCompany": {
							"entity1__id": ""
						},
						"company1__companyType": data.companyType.toUpperCase()
					}
				}
			};
			/*jshint camelcase: true */
			var options = {
				contentType: companyCollectionSchema
			};
			var ajaxPromise = self.post({}, myData, options);

			return this._refineResponse(ajaxPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				/*jshint camelcase: false */

				//Use [response.model[0]] if we are getting a single company by ID
				var companyArray = response.model.company1__company || [response.model[0]];
				//If our response is empty (ie: query returns no records), skip modeling of response
				if (companyArray && companyArray[0]) {
					try {
						var refinedResponse = [];
						companyArray.forEach(function(company) {
							refinedResponse.push(
								new CompanyModel(company)
							);
						});

						self._log(self.serviceName + " refined stub response:");
						self._log({ model: refinedResponse });
						deferred.resolve({
							model: refinedResponse
						});
					} catch (e) {
						self._log(e);
						deferred.reject(response);
					}
				} else {
					self._log(self.serviceName + " returned no results: ");
					self._log({ model: null });
					deferred.resolve({
						model: null
					});
				}
				/*jshint camelcase: true */
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

	}

	CompanyService.serviceName = serviceName;
	CompanyService.prototype = Service.prototype;

	return CompanyService;
});