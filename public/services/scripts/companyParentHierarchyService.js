/*global define*/
define("companyParentHierarchyService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "company-parent-hierarchy";

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
			// domId used for automation/analytics
			domId: 'company-' + companyJson.entity1__id
		};
		/*jshint camelcase: true */
		return company;
	}

	function CompanyParentHierarchyService(options) {
		var self = this;
		var hierarchySchema = "application/vnd.healthmedia.company-hierarchy+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;

		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};
		this.options = options;


		this.getHierarchy = function (companyId) {
			var options = {
				contentType: hierarchySchema
			};
			var requestPromise = self.get({}, {
				query: "company.id-fromRoot",
				"company.id": companyId
				}, options);
			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				try {
					/*jshint camelcase: false */
					var parentCompanyArray = response.model.company1__companies.company1__company || [];
					var refinedParentCompanies = [];
					var refinedQueriedCompany = [];

					var queriedCompany = response.model.company1__company[0];
					refinedQueriedCompany.push(
						new CompanyModel(queriedCompany)
					);

					if (parentCompanyArray) {
						parentCompanyArray.forEach(function(parent) {
							refinedParentCompanies.push(
								new CompanyModel(parent)
							);
						});
					}
					/*jshint camelcase: true */

					self._log(self.serviceName + " refined stub response:");
					self._log({
						model: {
							parentCompanies: refinedParentCompanies,
							queriedCompany: refinedQueriedCompany
						}
					});
					deferred.resolve({
						model: {
							parentCompanies: refinedParentCompanies,
							queriedCompany: refinedQueriedCompany
						}
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

	CompanyParentHierarchyService.serviceName = serviceName;
	CompanyParentHierarchyService.prototype = Service.prototype;

	return CompanyParentHierarchyService;
});
