/*global define*/
define("actionItemService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "actionitem";
	function ActionItemService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.getActionItems = function(locale) {
			var deferred = $.Deferred();
			this.get( {}, {
				locale: options.locale
			}).done(function(response){
				var rawResponse = response;
				var actionItemResponse = response.actionItemResponse;
				if (actionItemResponse.responseCode !== 0) {
					self._log({
						context: this,
						msg: "incorrect responseCode",
						response: response
					});
					deferred.reject(response);
					return;
				}
				var actionItemList = actionItemResponse.actionItem;
					actionItemList.forEach(function(item){
						var properties = item.property;
						if (!item.property.length) {
							return;
						}
						var property = {};
						properties.forEach(function(itemProperty){
							property[itemProperty.name] = itemProperty.value;
							// most of the application is looking for a top level property
							item[itemProperty.name] = item[itemProperty.name] || itemProperty.value;
						});
						item.property = property;
						item.skillId = Number(item.skillId);
					});
					actionItemResponse.actionItem = actionItemList;
					actionItemResponse.url = rawResponse.url;
					deferred.resolve( window.WNP.cacheModel.updateShared({
						context: self,
						response: actionItemResponse
					}));
				}).fail(function(response) {
					deferred.reject(response);
				});
			return deferred.promise();
		};

		this.postData = function (data) {
			self.post({data:data});
		};
	}
	ActionItemService.serviceName = serviceName;
	ActionItemService.prototype = Service.prototype;

	return ActionItemService;
});
