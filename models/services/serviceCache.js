var $ = require('jQuery'),
	_ = require('underscore');

module.exports = function () {

	//"use strict";

	var model = {};

	function create (config) {
		var date = new Date;
		var service = config.service,
			url = config.url;

		if (!model[service]) {
			model[service] = {};
		}
		model[service][url] = {
			date: date.getTime(),
			// wrapper for shared model
			shared: {
				model: {}
			},
			// deferred reference for concurrent requests in queue
			// all requests will be pointing to this single deferred
			deferred: new $.Deferred().done(function (response) {
				model[service][url].response = response;
				model[service][url].response.complete = true;
			}),
			response: {}
		};
		return model[service][url];
	}

	return {
		check: function (config) {
			var date = new Date;
			var service = config.service,
				url = config.url,
				timeThreshold = config.cacheTimeThreshold || 3000;

			if (model[service] && model[service][url]) {
				if (date.getTime() - model[service][url].date < timeThreshold) {
					model[service][url].concurrent = true;
					return model[service][url];
				}
				model[service][url].concurrent = false;
			}
			return create(config);
		},
		/**
		 * Updates the cached response for a given service/url combination.
		 *
		 * Since only responses from get requests are cached, do not attempt
		 * to update shared cache in a post request implementation.
		 *
		 * @param config
		 * @returns {*}
		 * @throws TypeError with message "Cannot read property..." if called
		 *   with no cache created for a given service.
		 */
		updateShared: function (config) {
			var service = config.context.serviceName,

			url = config.response.url;
			if(!url || !model[service][url]){
				// Don't fail on posts/ missing url /stubbed response.
				return { "model":  $.extend(config.context.model, config.response) };
			}
			model[service][url].shared.model = $.extend(config.context.model, config.response);
			if (model[service][url].shared.model._setObservables) {
				model[service][url].shared.model._setObservables();
			}
			// We return a copy of the data so consumers cannot corrupt the cache.
			return $.extend(true, {}, model[service][url].shared);
		}
	};
}();
