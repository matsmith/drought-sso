var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Products",
	run: function(req, res, next) {
		var self = this;
        var model = {};
        this.content.htmlClass = 'not-front logged-in page-program-coaching no-sidebars fluid-width page-program-coaching-digital-health-coaching section-program-coaching locale-en_us';
		// Transform jQuery not-real promise into real promise
		// getAvailableProducts
        Promise.resolve(self.service.availableProducts.getAvailableProducts()).then(function(serviceResult){
            model.availableProducts = serviceResult.model;
            var prodList = [];
            serviceResult.model.product.forEach(function(prod){
                if(prod.name !== 'snapshot' && prod.name !== 'succeed'){
                    prodList.push(prod.name + 'ProgramListing');
                }
            });
            prodList.push('programListingWidget', 'common');

			// 0 getResourceBundles
			// 1 getCompanyConfig
			// 2 presentation
            return Promise.all([
                self.service.resourceBundle.getResourceBundles(prodList),
        		self.service.companyConfig.getCompanyConfig(['ProductRenaming']),
                self.service.presentation.getBy({ page: 'portal', type: 'navigation' })
            ]);
        }).then(function(serviceResults){
            model.resourceBundle = serviceResults[0].model;
            model.companyConfig = serviceResults[1].model.features;
            model.presentation = serviceResults[2].model;

            self.getNav(model.presentation);
            self.getProducts(model.companyConfig.ProductRenaming, model.availableProducts, model.resourceBundle);
		}).done(function(success, error){
			new View(res, 'products').render( self.content, { navigation: '_nav' } );
		});
	},
	getProducts: function(renaming, prodList, resourceBundle) {
		var self = this;
        var products = [];
        prodList.product.forEach(function(prod){
            if(typeof resourceBundle[prod.name + 'ProgramListing'] !== 'undefined'){
                products.push({
                    nameKey: prod.name,
                    description: resourceBundle[prod.name + 'ProgramListing'].description,
                    longName: renaming[prod.name + 'LongName'],
                    title: resourceBundle[prod.name + 'ProgramListing'].title,
                    details: resourceBundle[prod.name + 'ProgramListing'].details,
                    backText: resourceBundle.programListingWidget.closeDetialsText,
                    startText: resourceBundle.programListingWidget.startText,
                    notInterestedText: resourceBundle.programListingWidget.notInterested,
                    detailsText: resourceBundle.programListingWidget.detailsText,
                    productLink: prod.name
                });
            }
        });
        this.content.products = products;
	},
	getNav: function(data) {
		var self = this;
		data.areas.forEach(function(area){
			self.content.nav = area.blocks;
		});
	}
});
