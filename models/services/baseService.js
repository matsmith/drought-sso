/* globals $WNP */
var serviceCache = require('./serviceCache'),
	$ = require('jQuery'),
	fs = require('fs'),
	window = window || global,
	$WNP = $;

module.exports = function() {
	//"use strict";

	// set singleton
	if (!window.WNP) {
		window.WNP = {};
	}
	if (!window.WNP.cacheModel) {
		window.WNP.cacheModel = serviceCache;
	}
	serviceCache = window.WNP.cacheModel;

	function Service() {}

	Service.prototype.CPUD_ENDPOINT_TYPE = "cpud";
	Service.prototype.LAMBERT_ENDPOINT_TYPE = "lambert";
	// Custom endpoints must overwrite get and post, which is where we check
	// for endpointType validity. Any service may overwrite helpers like
	// _buildApplyHeadersFunction or overwrite or create their own response
	// validator.
	Service.prototype.endpointTypes = [
		Service.prototype.CPUD_ENDPOINT_TYPE,
		Service.prototype.LAMBERT_ENDPOINT_TYPE
	];

	Service.prototype.hasValidEndpointType = function() {
		var self = this;

		return Service.prototype.endpointTypes.filter(function(type) {
			return self.endpointType === type;
		}).length > 0;
	};

	Service.prototype.buildEndpoint = function(verb, urlParams) {
		var endpoint = this.options.serviceBaseUrl;
		endpoint += this.serviceName.toLowerCase();

		var resourceString = this.resourceStrings[verb];
		Object.keys(urlParams).forEach(function(key) {
			resourceString = resourceString.replace("::" + key + "::", urlParams[key]);
		});
		endpoint += resourceString;
		return endpoint;
	};

	/**
	 *
	 * @param queryParams
	 * @returns {string} a url query string, starting with ?
	 */
	Service.prototype.buildQuery = function(queryParams) {
		var queryList = [];
		queryParams = queryParams || {};

		Object.keys(queryParams).forEach(function(key) {
			var value = queryParams[key];
			if (Array.isArray(value)) {
				value.forEach(function(valueItem) {
					queryList.push(encodeURIComponent(key) + "=" + encodeURIComponent(valueItem));
				});
			} else {
				queryList.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
		});
		if (queryList.length > 0) {
			return "?" + queryList.join("&");
		}
		return "";
	};

	Service.prototype.useStubs = function() {
		if (typeof this.options.stubs !== "boolean") {
			return this.options.stubs[this.serviceName];
		}
		return this.options.stubs;
	};

	/**
	 *
	 * @param urlParams {object} key/value pairs to replace in the resourceString
	 * @param data {object|any} put data, formatted as appropriate by service
	 * @param options {object} of the format {
	 *   contentType [string]: content/accept type for REST service methods
	 * }
	 */
	Service.prototype.put = function(urlParams, data, options) {
		if (!this.hasValidEndpointType()) {
			throw "Service definition must provide a valid endpoint type";
		}
		options = options || {};

		var url = this.buildEndpoint("put", urlParams);
		this._log("PUT:"+url, [data]);

		if (this.useStubs()) {
			return this.callStub({
				verb: "put",
				url: url,
				data: data
			});
		}

		return this._sendWithAuthRetry({
			type: "PUT",
			url: url,
			data: JSON.stringify(data),
			beforeSend: this._buildApplyHeadersFunction(options.contentType)
		});
	};

	/**
	 *
	 * @param urlParams {object} key/value pairs to replace in the resourceString
	 * @param queryParams {object} key/value pairs to build the queryString
	 * @param options {object} of the format {
	 *   contentType [string]: content/accept type for REST service methods,
	 *   cacheTimeThreshold [int]: time in ms to consider cached duplicate requests valid
	 * }
	 */
	Service.prototype.get = function(urlParams, queryParams, options) {
		if (!this.hasValidEndpointType()) {
			throw "Service definition must provide a valid endpoint type";
		}
		options = options || {};

		var url = this.buildEndpoint("get", urlParams) + this.buildQuery(queryParams),
			cached = false;
		this._log("GET:"+url, [queryParams]);

		cached = serviceCache.check({
			service: this.serviceName,
			verb: "GET",
			url: url,
			cacheTimeThreshold: options.cacheTimeThreshold || null
		});

		if (cached.response.complete) {
			this._log("Cached complete: returning response", [cached.response]);
			return new $.Deferred().done(function (response, xhrObj) {
				response.url = url;
				return response;
			}).resolve(cached.response);
		}

		if (cached.concurrent) {
			this._log("Cached concurrent: returning existing deferred");
			cached.deferred.done(function (response) {
				response.url = url;
				return response;
			});
			return cached.deferred;
		}

		if (this.useStubs()) {
			return this.callStub({
				verb: "get",
				url: url,
				deferred: cached.deferred
			});
		}
		return this._sendWithAuthRetry({
			type: "GET",
			url: url,
			beforeSend: this._buildApplyHeadersFunction(options.contentType),
			deferred: cached.deferred.done(function (response, xhrObj) {
				response.url = url;
				return response;
			})
		}).done(function (response, xhrObj) {
			response.url = url;
			return response;
		});
	};

	/**
	 *
	 * @param urlParams {object} key/value pairs to replace in the resourceString
	 * @param data {object|any} post data, formatted as appropriate by service
	 * @param options {object} of the format {
	 *   contentType [string]: content/accept type for REST service methods
	 * }
	 */
	Service.prototype.post = function(urlParams, data, options) {
		if (!this.hasValidEndpointType()) {
			throw "Service definition must provide a valid endpoint type";
		}
		options = options || {};

		var url = this.buildEndpoint("post", urlParams);
		this._log("POST:"+url, [data]);

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
			data: JSON.stringify(data),
			beforeSend: this._buildApplyHeadersFunction(options.contentType)
		});
	};

	Service.prototype._buildApplyHeadersFunction = function(contentType) {
		switch (this.endpointType) {
			case this.LAMBERT_ENDPOINT_TYPE:
				return this._buildLambertApplyHeadersFunction(contentType);
			case this.CPUD_ENDPOINT_TYPE:
				return this._buildCpudApplyHeadersFunction();
			default:
				throw "Failure applying headers, no valid endpointType";
		}
	};

	Service.prototype._buildLambertApplyHeadersFunction = function(contentType) {
		var self = this;
		return function(xhrObj, settings) {
			xhrObj.setRequestHeader("Authorization",
				self.options.authTokenType + " " + self.options.authToken);
			xhrObj.setRequestHeader("correlationId", self.options.correlationId);
			xhrObj.setRequestHeader("transactionId", new Date().getTime());
			xhrObj.setRequestHeader("Json-Namespace-Separator", "__");
			xhrObj.setRequestHeader("Accept", contentType);
			if (settings.type === "POST" || settings.type === "PUT") {
				xhrObj.setRequestHeader("Content-Type", contentType);
			}
		};
	};

	Service.prototype._buildCpudApplyHeadersFunction = function() {
		var self = this;
		return function(xhrObj, settings) {
			xhrObj.setRequestHeader("Authorization",
				self.options.authTokenType + " " + self.options.authToken);
			xhrObj.setRequestHeader("Accept", "application/json");
			if (settings.type === "POST" || settings.type === "PUT") {
				xhrObj.setRequestHeader("Content-Type", "application/json");
			}
			xhrObj.setRequestHeader("correlationId", self.options.correlationId);
			xhrObj.setRequestHeader("transactionId", new Date().getTime());
		};
	};


	Service.prototype._sendWithAuthRetry = function(ajaxOptions) {
		var self = this;
		var deferred = ajaxOptions.deferred || new $.Deferred();
		$.ajax(ajaxOptions).done(function(response, status, xhrObj) {
			deferred.resolve(response, xhrObj);
			self.sendActivityPing();
		}).fail(function(response) {
			if (typeof response.responseJSON === 'object' &&
					response.responseJSON.error === "invalid_token") {
				// Refresh the authentication
				self.refreshAuthentication()
					.done(function() {
						// Then retry the original call
						$.ajax(ajaxOptions).done(function(retryResponse) {
							deferred.resolve(retryResponse);
							self.sendActivityPing();
						}).fail(function(retryResponse) {
							deferred.reject(retryResponse);
						});
					}).fail(function() {
					deferred.reject(self.authRefreshFailure());
				});
			} else {
				deferred.reject(response);
			}
		});

		return deferred.promise();
	};

	Service.prototype.refreshAuthentication = function() {
		var self = this;
		var authRetryPromise;
		if(window.WNP.authRetryInProgress){
			return window.WNP.authRetryPromise;
		}

		authRetryPromise = $.ajax({
			type: "POST",
			url: this.options.serviceBaseUrl + 'security/oauth/token',
			data: "refresh_token=" + this.options.refreshToken +  "&grant_type=refresh_token",
			beforeSend: function(xhrObj) {
				xhrObj.setRequestHeader("Authorization", self.options.refreshAuthHeader);
				xhrObj.setRequestHeader("Accept", "application/json");
				xhrObj.setRequestHeader("correlationId", self.options.correlationId);
				xhrObj.setRequestHeader("transactionId", new Date().getTime());
			}
		}).done(function(authResponse) {
			/* jshint camelcase: false */
			self.options.authToken = authResponse.access_token;
			self.options.refreshToken = authResponse.refresh_token;
			/* jshint camelcase: true */
			window.WNP.authRetryInProgress = false;
		});

		window.WNP.authRetryInProgress = true;
		window.WNP.authRetryPromise = authRetryPromise;
		return authRetryPromise;
	};

	Service.prototype.processingFailureError = function() {
		return {
			responseDesc: "Service Processing Failure"
		};
	};

	Service.prototype.authRefreshFailure = function() {
		return {
			responseDesc: "Authentication Refresh Failure"
		};
	};

	Service.prototype.callStub = function (config) {
		var self = this;
		var verb = config.verb;
		var url = config.url;
		var data = config.data;
		var deferred = config.deferred || new $.Deferred();

		var stubTarget = 'http://localhost:3000/stubs/' + this.serviceName.toLowerCase() + ".json";
		this._log("GET: " + stubTarget);
		$.ajax({
			url: stubTarget,
			beforeSend: this._buildApplyHeadersFunction()
		}).done(function(response) {
			response = filterResponseFragment(response, verb);
			response = filterResponseFragment(response, self.options.authToken);
			response = filterResponseFragment(response, url);

			if (verb === "post" || verb === "put") {
				response = filterResponseFragment(response, JSON.stringify(data));
			}

			self._log(self.serviceName + " stub response:");
			self._log(response);

			response.url = url;
			deferred.resolve(response);
		}).fail(function(response){
			self._log(self.serviceName + " stub call failed", [response]);
		});

		this._log("stubbing response...");
		return deferred.promise();
	};

	function filterResponseFragment(responseFragment, key) {
		if (!responseFragment[""] && key !== "get" && key !== "post") {
			console.error("WARNING: stub data malformed", responseFragment, key);
			return responseFragment;
		}
		var matchedResponse = responseFragment[key];
		if (!matchedResponse) {
			return responseFragment[""];
		}
		return matchedResponse;
	}

	Service.prototype.validateEndpointResponse = function(ajaxPromise, options) {
		switch(this.endpointType) {
			case this.CPUD_ENDPOINT_TYPE:
				return this.validateCpudResponse(ajaxPromise);
			case this.LAMBERT_ENDPOINT_TYPE:
				return this.validateLambertResponse(ajaxPromise, options.contentType);
			default:
				return ajaxPromise;
		}
	};

	/**
	 * Returns a promise that fails either if the provided ajaxPromise fails
	 * or if it resolves with a responseCode other than the successCode.
	 * @param ajaxPromise
	 */
	Service.prototype.validateCpudResponse = function(ajaxPromise) {
		var self = this;
		var deferred = $.Deferred();
		ajaxPromise.done(function(response) {
			var rawResponse = response;
			response = self.unwrapResponse(response);
			response.url = rawResponse.url;
			if (response.responseCode !== 0) {
				deferred.reject(response);
				console.error('invalid response code', response);
				return;
			}
			// TODO: pull caching out of the resolvers and add to get/post
			deferred.resolve(window.WNP.cacheModel.updateShared({
				context: self,
				response: response
			}));
		}).fail(function(response) {
			deferred.reject(response);
		});

		return deferred.promise();
	};

	/**
	 * Returns a promise that fails either if the provided ajaxPromise fails
	 * or if it resolves with a content-type of an error, incorrect version,
	 * or different schema entirely. The content-type validates the status on
	 * our REST services.
	 *
	 * @param ajaxPromise
	 * @param contentType
	 */
	Service.prototype.validateLambertResponse = function(ajaxPromise, contentType) {
		var self = this;
		var deferred = $.Deferred();
		ajaxPromise.done(function(response, xhrObj) {
			var rawResponse = response;
			var responseContentType;

			response = self.unwrapResponse(response);
			response.url = rawResponse.url;

			// When response is cached, xhrObj will be undefined, but will have already
			// validated the content-type on the first GET
			if (xhrObj) {
				responseContentType = xhrObj.getResponseHeader("Content-Type");
			}

			// Stubs always return app/json, so only check content-type on real services
			if (!self.options.stubs && responseContentType) {
				if (responseContentType !== contentType) {
					deferred.reject(response);
					return;
				}
			}

			// TODO: pull caching out of the resolvers
			deferred.resolve(window.WNP.cacheModel.updateShared({
				context: self,
				response: response
			}));
		}).fail(function(response){
			deferred.reject(response);
		});

		return deferred.promise();
	};

	Service.prototype.unwrapResponse = function(response) {
		var baseResponseKey = Object.keys(response)[0];
		return response[baseResponseKey];
	};

	Service.prototype.sendActivityPing = function(){
		$WNP("body").trigger("updateActivityTimeout");
	};

	Service.prototype._log = function(msg, args){
		if (this.options.debug && console) {
			console.log("Base Service:", msg);

			if (this.options.debug === "verbose") {
				console.log(args);
			}
		}
	};

	return Service;

}();
