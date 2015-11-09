/*global define*/
define("userDataService", [
	"baseService",
	'jquery',
	"moment"
], function (Service, $, moment) {
	"use strict";

	var serviceName = "userData";
	function UserDataService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getHistoricData = function(dataDefs) {
			return this._getData("historic", dataDefs);
		};

		this.getHistoricDataBySource = function(dataDefs, sources) {
			return this._getData("historic", dataDefs, sources);
		};

		this.getHistoricDataByEnrollment = function(dataDefs, enrollmentId) {
			return this._getData("historic", dataDefs, null, enrollmentId);
		};

		this._getData = function(type, dataDefs, sources, enrollmentId) {
			var deferred = $.Deferred();

			var queryParams = {
				q: "findByDataSourceTypeAndDataDefinition",
				type: type,
				dataDefinition: dataDefs
			};
			if (enrollmentId) {
				queryParams.q = "findByDataSource-Type-DataDefinition-ProductEnrollmentId";
				queryParams.productEnrollmentId = enrollmentId;
			}
			if (sources) {
				queryParams.dataSource = sources;
			}

			var options = {
				cacheTimeThreshold: -1
			};

			this.get({}, queryParams, options).done(function(response) {
				var defs = {};
				var rawResponse = response;
				try {
					response = self.unwrapResponse(response);
					if (response.responseCode !== 0) {
						deferred.reject(response);
						return;
					}

					response.userData.forEach(function(def) {
						if(!defs[def.dataDefinitionName]) {
							defs[def.dataDefinitionName] = [];
						}
						if(def.found) {
							def.found.forEach(function(item) {
								var FormattedItemDate = moment(item.collectionDate.substr(0,item.collectionDate.lastIndexOf('-')));
								defs[def.dataDefinitionName].push({
									date: new Date(FormattedItemDate),
									value: item.value[0]
								});
							});
						}
					});
				} catch(e) {
					self._log({
						context: this,
						error: e,
						msg: "reject",
						response: response
					});
					deferred.reject(self.processingFailureError());
				}
				defs.url = rawResponse.url;
				deferred.resolve(window.WNP.cacheModel.updateShared({
					context: self,
					response: defs
				}));
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.postData = function(data, enrollmentId) {
			var deferred = $.Deferred();
			var userData = {
				UserDataInfo: {
					DataInfoList: []
				}
			};
			if (enrollmentId) {
				userData.UserDataInfo.productEnrollmentId = enrollmentId;
			}
			data.forEach(function(dataDef) {
				userData.UserDataInfo.DataInfoList.push({
					DataInfo: {
						DataDefinitionName: dataDef.DataDefinitionName,
						DataSourceName: dataDef.DataSourceName,
						Values: dataDef.Values
					}
				});
			});

			var postPromise = self.post({}, userData);
			postPromise.done(function(response) {
				if (response.responsePayload.responseCode !== 0) {
					deferred.reject(response.responsePayload);
					return;
				}
				deferred.resolve(response);

			}).fail(function(response) {
				deferred.reject(response);
			});
			return deferred.promise();
		};
	}
	UserDataService.serviceName = serviceName;
	UserDataService.prototype = Service.prototype;

	return UserDataService;
});
