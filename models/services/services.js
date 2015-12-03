
var CompanyConfigService = require("./companyConfigService"),
	ResourceBundleService = require("./resourceBundleService"),
	PresentationService = require("./presentationService"),
	AvailableProductsService = require('./availableProductsService'),
	SecurityService = require('./securityservice');

module.exports = function() {
	"use strict";

	function ServicesSingleton(options) {
		this.services = {};
	}

	function WnpSharedServicesConfig(options) {
		this.authToken = options.authToken || "";
		this.authTokenType = options.authTokenType || "";
		this.refreshToken = options.refreshToken || "";
		this.refreshAuthHeader = options.refreshAuthHeader || "";
		this.locale = options.locale || "en_US";
		this.wnpSessionId = options.wnpSessionId || "";
		this.serviceBaseUrl = options.serviceBaseUrl || "/externalservices/";
		this.clientId = options.clientId || "";
		this.debug = options.debug || false;
		this.stubs = options.stubs || false;

		this.matches = function(options) {
			options = new WnpSharedServicesConfig(options);
			return this.authToken === options.authToken &&
				this.authTokenType === options.authTokenType &&
				this.refreshToken === options.refreshToken &&
				this.refreshAuthHeader === options.refreshAuthHeader &&
				this.locale === options.locale &&
				this.wnpSessionId === options.wnpSessionId &&
				this.serviceBaseUrl === options.serviceBaseUrl &&
				this.debug === options.debug &&
				this.stubs === options.stubs;

		};
	}

	function camelCaseDasherizedString(name) {
		if(typeof name !== "string") {
			throw new Error("Service name need to be a string");
		}

		return name.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
	}

	if(typeof window !== 'object' ) {
		global.WNP = global.WNP || {};

	} else {
		window.WNP = window.WNP || {};
	}

	WNP.sharedServicesConfig = null;

	return {
		serviceList: [
			CompanyConfigService,
			ResourceBundleService,
			PresentationService,
			AvailableProductsService,
			SecurityService
		],
		/**
		 * Sets up the shared configuration, including default values
		 * for anything missing. All instantiated services on a specific page
		 * use the same values for properties in the shared config.
		 */
		mergeSharedConfig: function(config, configOverride) {
			if (!(WNP.sharedServicesConfig instanceof WnpSharedServicesConfig)) {
				WNP.sharedServicesConfig = new WnpSharedServicesConfig(config);
				return WNP.sharedServicesConfig;
			}
			switch(configOverride) {
				// Throw an error if the new config doesn't match the existing
				case "error":
					if (!WNP.sharedServicesConfig.matches(config)) {
						this._log("Widget Configuration Mismatch");
						throw new Error("Widget Configuration Mismatch");
					}
					break;
				// Override the existing config with the new config
				case true:
					config = new WnpSharedServicesConfig(config);
					WNP.sharedServicesConfig.authToken = config.authToken;
					WNP.sharedServicesConfig.authTokenType = config.authTokenType;
					WNP.sharedServicesConfig.refreshToken = config.refreshToken;
					WNP.sharedServicesConfig.refreshAuthHeader = config.refreshAuthHeader;
					WNP.sharedServicesConfig.locale = config.locale;
					WNP.sharedServicesConfig.wnpSessionId = config.wnpSessionId;
					WNP.sharedServicesConfig.serviceBaseUrl = config.serviceBaseUrl;
					WNP.sharedServicesConfig.debug = config.debug;
					WNP.sharedServicesConfig.stubs = config.stubs;
					break;
				// Else ignore the new config in favor of the existing
				default:
					break;
			}
			return WNP.sharedServicesConfig;
		},
		initializeServices: function(config) {

			if (!WNP.servicesSingleton) {
				WNP.servicesSingleton = new ServicesSingleton(config);

				this.serviceList.forEach(function(ServiceConstructor) {
					var tempName;
					var service = new ServiceConstructor(config);
					// convert dasherized names to camelcase for easier access with dot notation
					if(service.serviceName.indexOf("-") > -1){
						tempName = camelCaseDasherizedString(service.serviceName);
						WNP.servicesSingleton.services[tempName] = service;
					} else {
						WNP.servicesSingleton.services[service.serviceName] = service;
					}
				});
			}

			return WNP.servicesSingleton.services;
		},
		_log: function(msg, args){
			if (this.debug && console) {
				console.log(this._widgetClass.toUpperCase() + ":", msg);

				if (this.debug === "verbose") {
					console.log(args);
				}
			}
		}

	};

}();
