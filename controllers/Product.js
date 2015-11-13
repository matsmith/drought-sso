var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise'),
    config = require('../package.json').config;

module.exports = BaseController.extend({
	name: "Product",
	run: function(req, res, next) {
        this.content = {
            programName: req.params.product,
            authToken: config.authToken
        }

	 	new View(res, 'product').render( this.content, {  } );
	}
});
