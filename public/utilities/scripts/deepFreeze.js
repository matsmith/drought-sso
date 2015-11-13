/*global define*/
define('deepFreeze', [], function () {
	"use strict";

	// From https://github.com/jsdf/deep-freeze

	/**
	 * Freezes an object and all its child objects recursively.
	 *
	 * @param {Object} o The object to freeze
	 * @returns {*} The frozen object
	 */
	function deepFreeze(o) {
		Object.freeze(o);

		var oIsFunction = typeof o === "function";
		var hasOwnProp = Object.prototype.hasOwnProperty;

		Object.getOwnPropertyNames(o).forEach(function (prop) {
			if (hasOwnProp.call(o, prop) &&
				(oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
				o[prop] !== null &&
				(typeof o[prop] === "object" || typeof o[prop] === "function") &&
				!Object.isFrozen(o[prop])) {
				deepFreeze(o[prop]);
			}
		});

		return o;
	}

	return deepFreeze;
});
