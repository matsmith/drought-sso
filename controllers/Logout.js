var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Logout",
	run: function(req, res) {
		var self = this;

    	delete req.session.token;
		res.redirect('/login');
	}
});
