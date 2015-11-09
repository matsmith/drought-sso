/*global define*/
define("companyChildHierarchyService", [
	"baseService",
	"jquery"
], function (Service, $) {
	"use strict";

	var serviceName = "company-child-hierarchy";

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

	function CompanyChildHierarchyService(options) {
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


		this.getChildCompanies = function(companyId, hierarchyType, maxCount) {
			var options = {
				contentType: hierarchySchema
			};
			var requestPromise = self.get({}, {
				query: "company.id-hierarchy.type-immediateDescendants-maxCount",
				"company.id": companyId,
				"hierarchy.type": hierarchyType || "ALL",
				"maxCount": maxCount || "100"
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				try {
					/*jshint camelcase: false */
					var childCompanyArray = response.model.company1__companies.company1__company || [];
					var queriedCompany = response.model.company1__company[0];
					var refinedChildCompanies = [];
					var refinedQueriedCompany = [];

					refinedQueriedCompany.push(
						new CompanyModel(queriedCompany)
					);

					childCompanyArray.forEach(function(child) {
						refinedChildCompanies.push(
							new CompanyModel(child)
						);
					});
					/*jshint camelcase: true */

					self._log(self.serviceName + " refined stub response:");
					self._log({
						childCompanies: refinedChildCompanies,
						queriedCompany: refinedQueriedCompany
					});
					deferred.resolve({
						childCompanies: refinedChildCompanies,
						queriedCompany: refinedQueriedCompany
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

	CompanyChildHierarchyService.serviceName = serviceName;
	CompanyChildHierarchyService.prototype = Service.prototype;

	return CompanyChildHierarchyService;
});