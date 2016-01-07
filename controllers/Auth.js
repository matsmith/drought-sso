var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Auth",
	run: function(req, res, next) {
		var self = this,
            authorized = false;

		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';

		// USED FOR TESTING ONLY
		var result = { model : { 'jsonWebToken' : 'thisIsMyWebToken' } };

		// Transform jQuery not-real promise into real promise
        if(req.session.hasOwnProperty('token')){
			authorized = req.session.token === result.model.jsonWebToken;
            if(!authorized){
                console.log('Security Services Error: ', error);
                res.redirect('/login');
            } else {
                next();
            }
        } else {
            res.redirect('/login');
        }
	}
});
