/*global define*/
define("userCertificateService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "user-certificate";
	function userCertificateService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.options = options;

		this.getCertificates = function() {

			this.resourceStrings = {
				get: ""
			};

			var deferred = $.Deferred();
			var urlParams = {};
			var queryParams = {
				q : "certificate.status",
				"certificate.status" : ["AVAILABLE", "NOTIFIED", "VIEWED"],
				locale: this.options.locale || ""
			};

			this.validateEndpointResponse(
				self.get(urlParams, queryParams, options),
				options
			).done(function(response) {
				deferred.resolve(response);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.getCertificate = function(id) {

			this.resourceStrings = {
				get: "/::certificateId::"
			};

			var deferred = $.Deferred();
			var urlParams = {
				certificateId: id
			};
			var queryParams = {
				locale: this.options.locale || ""
			};

			this.validateEndpointResponse(
				self.get(urlParams, queryParams, options),
				options
			).done(function(response) {
				deferred.resolve(response);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.markCertificateViewed = function(id){

			this.resourceStrings = {
				put: "/::certificateId::"
			};
			var deferred = $.Deferred();
			var urlParams = {
				certificateId: id
			};
			var data = {
				"certificates":[
					{
						"status": "VIEWED"
					}
				]
			};

			this.validateEndpointResponse(
				self.put(urlParams, data),
				options
			).done(function(response) {
				deferred.resolve(response);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};


	}
	userCertificateService.serviceName = serviceName;
	userCertificateService.prototype = Service.prototype;

	return userCertificateService;
});
