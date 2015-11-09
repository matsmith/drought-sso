_ = require('underscore');

module.exports = function(response, template) {
	this.response = response;
	this.template = template;
};
module.exports.prototype = {
	extend: function(properties) {
		var Child = module.exports;
		Child.prototype = module.exports.prototype;
		for(var key in properties) {
			Child.prototype[key] = properties[key];
		}
		return Child;
	},
	render: function(data, options) {
		if(_.isObject(options)) {
			_.extend(data, { partials: options });
		}
		if(this.response && this.template) {
			this.response.render(this.template, data);
		}
	}
}
