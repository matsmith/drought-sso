/*global define*/
define("authorizationService", [
	"baseService",
	"jquery"
], function(Service, $) {
	"use strict";

	var serviceName = "authorization";

	function AuthorizationModel(authJson) {
		/*jshint camelcase: false */
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
		/*jshint camelcase: true */
		return authorization;
	}

	function AuthorizationService(options) {
		var self = this;
		var authSchema = "application/vnd.healthmedia.authorization-collection+json;version=1.0";

		this.serviceName = serviceName;
		this.endpointType = this.LAMBERT_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: "",
			put: ""
		};
		this.options = options;

		this.getAccessCodes = function(companyId) {
			var options = {
				contentType: authSchema
			};
			var requestPromise = self.get({}, {
				query: "company.id",
				"company.id": companyId
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this.getSearch = function(accessCode) {
			var options = {
				contentType: authSchema
			};
			var requestPromise = self.get({}, {
				query: "authorization.accessCode",
				"authorization.accessCode": accessCode.toUpperCase()
			}, options);

			return this._refineResponse(requestPromise, options);
		};

		this.postCreateAccessCode = function(data) {
			var options = {
				contentType: authSchema
			};
			var authCodeArr = [];
			var myData;

			/*jshint camelcase: false */
			data.forEach(function(code) {
				authCodeArr.push({
					"company1__name": code.name,
					"company1__accessCode": code.code.toUpperCase(),
					"company1__company": {
						"entity1__id": code.companyId
					}
				});
			});

			myData = {
				"company1__authorizations": {
					"company1__authorization": authCodeArr
				}
			};

			/*jshint camelcase: true */
			var requestPromise = self.post({}, myData, options);
			return this._refineResponse(requestPromise, options);
		};

		this._refineResponse = function(ajaxPromise, options) {
			var deferred = $.Deferred();
			var self = this;

			this.validateEndpointResponse(ajaxPromise, options).done(function(response) {
				/*jshint camelcase: false */
				var authArray = response.model.company1__authorization || '';
				//If our response is empty (ie: query returns no records), skip modeling of response
				if (authArray && authArray[0]) {
					try {
						var refinedAuthCodes = [];
						authArray.forEach(function(auth) {
							refinedAuthCodes.push(
								new AuthorizationModel(auth)
							);
						});
						self._log(self.serviceName + " refined stub response:");
						self._log({ model: refinedAuthCodes });
						deferred.resolve({
							model: refinedAuthCodes
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

	AuthorizationService.serviceName = serviceName;
	AuthorizationService.prototype = Service.prototype;

	return AuthorizationService;
});