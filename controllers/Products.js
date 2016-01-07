var BaseController = require("./Base"),
	View = require("../views/Base"),
	Promise = require('promise');

module.exports = BaseController.extend({
	name: "Products",
	run: function(req, res, next) {
		var self = this;
        var model = {};
        this.content.htmlClass = 'not-front logged-in page-program-coaching no-sidebars fluid-width page-program-coaching-digital-health-coaching section-program-coaching locale-en_us';
		new View(res, 'products').render( self.content, { navigation: '_nav' } );
	}
});
