define(['handlebars'], function(Handlebars) {

this["utilities"] = this["utilities"] || {};

this["utilities"]["activeStatusIcon"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"currentData activeStatusIcon c3-color c3-border-color\">\n	<figure class=\"currentStatus\"></figure>\n</div>\n<div class=\"iconContainer\">\n	<figure class=\"level1\"></figure>\n	<figure class=\"level2\"></figure>\n	<figure class=\"level3\"></figure>\n	<figure class=\"level4\"></figure>\n</div>\n";
  });

this["utilities"]["errorModal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "	<div class=\"errorModalContent\">\n		<span class=\"warningIcon\"></span>\n		<h1 class=\"c5-color c5-border-color\">";
  if (helper = helpers.serviceFailureHeader) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serviceFailureHeader); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n		<h2>";
  if (helper = helpers.serviceFailureContent) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serviceFailureContent); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n		<button class=\"c5-background-color\">\n			";
  if (helper = helpers.serviceFailureButtonText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serviceFailureButtonText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n		</button>\n	</div>\n";
  return buffer;
  });

this["utilities"]["fullScreenSpinner"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loadingSpinner\">\n	<div data-bind=\"{ loader:\n		{\n			width: size,\n			height: size,\n			strokeWidth: strokeWidth,\n			isVisible: isVisible\n		}\n	}\" class=\"loader\"></div>\n</div>";
  });

return this["utilities"];

});