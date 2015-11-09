/*global define*/
define("userState", [
	"baseService",
	"knockout",
	"jquery"
], function (Service, ko, $) {
	"use strict";

	var serviceName = "userState";
	function UserstateProductPropertiesService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.findAll = function(locale) {
			return this.validateEndpointResponse(
				self.get({}, {
					q: "findAll",
					locale: options.locale
				})
			);
		};

		this.findByCategory = function (category, locale) {
			return this.validateEndpointResponse(
				self.get({}, {
					q: "findByCategory",
					category: category,
					locale: options.locale
				})
			);
		};

		this.postData = function (category, dataObj) {
			return this.validateEndpointResponse(
				self.post({},{
					category: [{
						name: category,
						properties: [
							dataObj
						]
					}]
				})
			);
		};

		// Define the model that will be extended by response received
		// from the SOA tier
		this.model = {
			_setObservables: function () {
				if(this.category[0].properties){
					this.category[0].properties.filter(function (serviceDatum) {
						if (serviceDatum.name.match("interested")) {
							if (typeof( serviceDatum.value ) !== "function") {
								serviceDatum.value = ko.observable(serviceDatum.value);
							}
						}
					});
				}
			},
			getCategory: function(categoryName){
				var foundCategory = null;
				this.category.forEach(function(category){
					if(category.name === categoryName){
						foundCategory = category;
					}
				});
				return foundCategory;
			},
			getProperty: function(categoryName, propertyName){
				var foundProps = [];
				this.category.forEach(function(category){
					if(category.name === categoryName){
						category.properties.forEach(function(property){
							if(property.name === propertyName){
								foundProps.push(property);
							}
						});
					}
				});
				return foundProps;
			},
			getPercentCompleteByEnrollmentId: function(categoryName, enrollmentId){
				var foundProp = null;
				this.category.forEach(function(category){
					if(category.name === categoryName){
						category.properties.forEach(function(property){
							if(property.name === "percentComplete" &&
							property.productEnrollmentId === enrollmentId){
								foundProp = property;
							}
						});
					}
				});
				return foundProp;
			},
			getInterestByProductName: function (productName) {
				var interested = true;
				if(this.category[0].properties){
					this.category[0].properties.filter(function (serviceDatum) {
						if (serviceDatum.name === productName + ".interested") {
							interested = serviceDatum.value();
						}
					});
					return interested;
				}else{
					return [];
				}


			},
			updateInterestByProductName: function (productName) {
				var setSuccess = false,
					value;

				this.category[0].properties.filter(function (serviceDatum) {
					if (serviceDatum.name === productName + ".interested") {
						value = !serviceDatum.value();
						serviceDatum.value(value);
						setSuccess = true;
					}
				});

				if (!setSuccess) {
					value = false;
					this.category[0].properties.push({
						name: productName + ".interested",
						value: ko.observable(false)
					});
				}
				self.postData("CONSULTATION",{
					name: productName+".interested",
					value: value
				});
				return this.getInterestByProductName(productName);
			}
		};
	}
	UserstateProductPropertiesService.serviceName = serviceName;
	UserstateProductPropertiesService.prototype = Service.prototype;

	return UserstateProductPropertiesService;
});
