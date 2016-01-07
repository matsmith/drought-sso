var BaseController = require("./Base"),
	View = require("../views/Base"),
	request = require('request');

module.exports = BaseController.extend({
	name: "Saml",
	run: function(req, res, next) {
		var self = this, timestamp = Math.round(new Date().getTime() / 1000);

		request.post(
			{url:'http://172.16.1.2:8080/saml/createresponse?customerId=marktwain&resourceUrl=something&b=' + timestamp},
			function(err, resp, body){
				self.content.samlresponse = body;
				new View(res, 'saml').render( self.content, { navigation: '_nav' } );
			}
		);
	}
});
