var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Home",
	run: function(req, res, next) {
		var self = this;
		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';
		// Transform jQuery not-real promise into real promise
		Promise.all([
			self.service.presentation.getBy({ page: 'portal', type: 'navigation' }),
			self.service.companyConfig.getCompanyConfig(['ProductRenaming'])
		]).then(function(serviceResults){
			self.getNav(serviceResults[0]);
			self.getContent(serviceResults[1]);
		}).done(function(success, error){
			new View(res, 'home').render( self.content, { navigation: '_nav' } );
		});
	},
	getContent: function(data) {
		var self = this;
		this.content.programName = data.model.features.ProductRenaming.bingeLongName;
	},
	getNav: function(data) {
		var self = this;
		data.model.areas.forEach(function(area){
			self.content.nav = area.blocks;
		});
	}
});
