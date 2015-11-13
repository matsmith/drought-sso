/*global WNP*/
/*
	This module exports an object with 2 functions (error,debug)
	Error messages are put out when WNP.sharedServicesConfig.debug is true
	Debug messages are shown when that option is set to "verbose"

	If the global object WNP.sharedServicesConfig.debug is not set then no log
	  messages will be shown.
*/

define(function() {
	"use strict";
	function Logger() {
		this.debugLevel = false;
	}
	Logger.prototype._checkConfig = function() {
		if (WNP && WNP.sharedServicesConfig && WNP.sharedServicesConfig.debug) {
			this.debugLevel = WNP.sharedServicesConfig.debug;
		}
		return this.debugLevel;
	};
	Logger.prototype.error = function() {
		if (!this._checkConfig()) {
			return;
		}
		console.error.apply(console, arguments);
	};
	Logger.prototype.debug = function() {
		if (this._checkConfig() !== "verbose") {
			return;
		}
		console.log.apply(console, arguments);
	};
	return new Logger();
});
