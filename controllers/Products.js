var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');
	//model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({
	name: "Products",
	run: function(req, res, next) {
		var self = this;
		// Transform jQuery not-real promise into real promise
		Promise.all([
			self.service.presentation.getBy({ page: 'portal', type: 'navigation' }),
			self.service.companyConfig.getCompanyConfig(['ProductRenaming']),
            self.service.availableProducts.getAvailableProducts()
		]).then(function(serviceResults){
			self.getNav(serviceResults[0]);
			self.getContent(serviceResults[1], serviceResults[2]);
		}).done(function(success, error){
			new View(res, 'home').render( self.content, { navigation: '_nav' } );
		});
	},
	getProducts: function(productsList, renaming) {
		var self = this;
		this.content.programName = renaming.model.features.ProductRenaming.bingeLongName;
	},
	getNav: function(data) {
		var self = this;
		data.model.areas.forEach(function(area){
			self.content.nav = area.blocks;
		});
	}
});
