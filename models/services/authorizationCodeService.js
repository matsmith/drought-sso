/*global define*/
define("authorizationCodeService", [
	"baseService",
	'jquery'
], function (Service, $) {
	"use strict";

	var serviceName = "authorizationCode";
	function AuthorizationCodeService(options) {
		this.serviceName = serviceName;
		this.resourceStrings = {
			get: "",
			post: ""
		};
		this.options = options;

		this.requestAuthorizationCode = function() {
			var deferred = $.Deferred();

			this.post().done(function(response) {
				if (!response.hasOwnProperty('authorization_code')) {
					deferred.reject(response);
					return;
				}
				deferred.resolve(response);
			}).fail(function(response) {
				deferred.reject(response);
			});

			return deferred;
		};

		this.post = function() {
			var url = this.options.serviceBaseUrl + 'security/oauth/authorizationCode';
			var data = "client_id=" + this.options.clientId + "&scope=read+write";

			if (this.useStubs()) {
				return this.callStub({
					verb: "post",
					url: url,
					data: data
				});
			}

			return this._sendWithAuthRetry({
				type: "POST",
				url: url,
				data: data,
				beforeSend: this._buildApplyHeadersFunction()
			});
		};

		this._buildApplyHeadersFunction = function() {
			var self = this;

			return function(xhrObj) {
				xhrObj.setRequestHeader("Authorization",
					self.options.authTokenType + " " + self.options.authToken);
				xhrObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhrObj.setRequestHeader("correlationId", self.options.correlationId);
				xhrObj.setRequestHeader("transactionId", new Date().getTime());
			};
		};
	}
	AuthorizationCodeService.serviceName = serviceName;
	AuthorizationCodeService.prototype = Service.prototype;


	return AuthorizationCodeService;
});
