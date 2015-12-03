var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Auth",
	run: function(req, res, next) {
		var self = this,
            authorized = false;

// USED FOR TESTING ONLY
var result = { model : { 'jsonWebToken' : 'thisIsMyWebToken' } };

		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';

		// Transform jQuery not-real promise into real promise
        if(req.session.hasOwnProperty('token')){
    		Promise.all([
                // REMOVED FOR TESTING ONLY
    			//self.service.securityServices.getJsonWebToken()
                result
    		]).then(function(serviceResults){
    			authorized = req.session.token === serviceResults[0].model.jsonWebToken;
    		}).done(function(success, error){
                if(!authorized || error){
                    console.log('Security Services Error: ', error);
                    res.redirect('/login');
                } else {
                    next();
                }

    		});
        } else {
            res.redirect('/login');
        }
	}
});
