/*global define*/
define("enrollmentService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "enrollment";
	function EnrollmentService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getLatestEnrollments = function(asList) {
			return this.getEnrollments(asList, true);
		};

		this.getEnrollments = function(asList, onlyLatest) {
			var deferred = $.Deferred(),
				queryParams = {};

			if(onlyLatest) {
				queryParams.q = 'findByLatestProductEnrollment';
				queryParams.latestProductEnrollment = 'true';
			}

			self.get({}, queryParams).done(function(response) {
				var rawResponse = response;
				response = self.unwrapResponse(response);
				var enrollments = {};
				var enrollmentsList = [];

				try {
					if (response.responseCode !== 0) {
						deferred.reject(response);
						return;
					}

					if (response.productsAvailable) {

						response.productEnrollmentStatus.forEach(function(product) {
							if (product.enrolled) {
								enrollments[product.productName] = product.productEnrollmentId;
							}
							enrollmentsList.push(product);
						});
					}

				} catch (e) {
					this._log({
						context: this,
						error: e,
						msg: "reject",
						response: response
					});
					deferred.reject(self.processingFailureError());
				}

				if (asList) {
					enrollmentsList.url = rawResponse.url;
					deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: enrollmentsList
					}));
				} else {
					enrollments.url = rawResponse.url;
					deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: enrollments
					}));
				}

			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred.promise();
		};

		this.enrollInProduct = function(product){
			return this.validateEndpointResponse(
				self.post({},{
					enrollmentMethod: "Web",
					product: product
				})
			);
		};

	}
	EnrollmentService.serviceName = serviceName;
	EnrollmentService.prototype = Service.prototype;

	return EnrollmentService;
});
