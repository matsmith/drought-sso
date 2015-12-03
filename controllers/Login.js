var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Login",
	run: function(req, res, next) {
		var self = this;
		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';

        if(req.method === 'GET'){

    		// Transform jQuery not-real promise into real promise
    		Promise.all([
    			self.service.presentation.getBy({ page: 'portal', type: 'navigation' }),
    			self.service.companyConfig.getCompanyConfig(['ProductRenaming'])
    		]).then(function(serviceResults){
    			self.getNav(serviceResults[0]);
    			self.getContent(serviceResults[1]);
    		}).then(undefined, function(err){
    			var exception = JSON.parse(err.responseText);
    			console.log('Promise Error Type: ', exception.error);
    			console.log('Promise Error Description: ', exception.error_description);
    		}).done(function(success, error){
    			new View(res, 'login').render( self.content, { navigation: '_nav' } );
    		});
        }

        if(req.method === 'POST'){
// FOR TESTING ONLY
var result = { model : { 'jsonWebToken' : 'thisIsMyWebToken' } };
            Promise.all([
				// REMOVED FOR TESTING ONLY
    			// self.service.securityServices.getJsonWebToken()
				result
    		]).then(function(serviceResults){
    			req.session.token = serviceResults[0].model.jsonWebToken;
    		}).done(function(success, error){
                if(error){
                    console.warn('Security Services Error: ', error);
                } else {
					res.redirect('/mhmsite/home');
				}
    		});
        }
	},
	getContent: function(data) {
		var self = this;
		this.content.programName = data.model.features.ProductRenaming.bingeLongName;
	},
	getNav: function(data) {
		var self = this;
		var primaryNav = [], subNav = [];
		data.model.areas.forEach(function(area){
			area.blocks.forEach(function(block){
				if(block.hasOwnProperty('blocks')){
					subNav = block.blocks;
				} else {
					primaryNav.push(block);
				}
			});
			self.content.nav = primaryNav;
			self.content.subNav = subNav;
		});
	}
});
