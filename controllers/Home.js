var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Home",
	run: function(req, res, next) {
		var self = this;
		this.content.htmlClass = 'front not-logged-in page-home no-sidebars fluid-width locale-en_us home-page-not-logged-in';
		// Transform jQuery not-real promise into real promise
		// Promise.all([
		// 	self.service.presentation.getBy({ page: 'portal', type: 'navigation' }),
		// 	self.service.companyConfig.getCompanyConfig(['ProductRenaming'])
		// ]).then(function(serviceResults){
		// 	self.getNav(serviceResults[0]);
		// 	self.getContent(serviceResults[1]);
		// }).then(undefined, function(err){
		// 	var exception = JSON.parse(err.responseText);
		// 	console.log('Promise Error Type: ', exception.error);
		// 	console.log('Promise Error Description: ', exception.error_description);
		// }).done(function(success, error){
		// 	new View(res, 'home').render( self.content, { navigation: '_nav' } );
		// });
	},
	getContent: function(data) {
		var self = this;
		this.content.programName = "Mat App"; //data.model.features.ProductRenaming.bingeLongName;
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
			self.content.nav = []; //primaryNav;
			self.content.subNav = []; //subNav;
		});
	}
});
