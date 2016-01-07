var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Login",
	run: function(req, res, next) {
		var self = this;
		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';

        if(req.method === 'GET'){
    		new View(res, 'login').render( self.content, { navigation: '_nav' } );
        }

        if(req.method === 'POST'){
			// FOR TESTING ONLY
			var result = { model : { 'jsonWebToken' : 'thisIsMyWebToken' } };
    		req.session.token = result.model.jsonWebToken;
			res.redirect('/');
        }
	}
});
