/*global define*/
var Service = require('./baseService'),
 	$ = require('./jQuery');

module.exports = function() {
	"use strict";

	var serviceName = "samlresponse";
	function SamlResponseService(options) {
		var self = this;
		this.serviceName = serviceName;
		this.endpointType = this.CPUD_ENDPOINT_TYPE;
		this.resourceStrings = {
			post: ""
		};
		this.options = options;

		this.getSamlResponse = function(data) {
            return this._sendWithAuthRetry({
    			type: "POST",
    			url: 'http://localhost-coaching.healthmedia.net/saml/createresponse',
    			data: ''
    		});
		};
	}
	SamlResponseService.serviceName = serviceName;
	SamlResponseService.prototype = Service.prototype;

	return SamlResponseService;
}();
