var _ = require("underscore"),
	service = require('../models/services/services');

module.exports = {
	name: "base",
	service: service.initializeServices(global.wnp.config),
	content: {},
	extend: function(child) {
		return _.extend({}, this, child);
	},
	run: function(req, res, next) {

	}
}
