define(['handlebars'], function(Handlebars) {

this["headerNavigationBar"] = this["headerNavigationBar"] || {};

Handlebars.registerPartial("counter", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- ko if: notificationCount -->\n	<span class=\"notificationCount\" data-bind=\"{text: notificationCount}\"></span>\n<!-- /ko -->";
  }));

Handlebars.registerPartial("desktopLink", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<li class=\"item desktop\">\n		";
  stack1 = self.invokePartial(partials.link, 'link', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = self.invokePartial(partials.linkBlock, 'linkBlock', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</li>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.href), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }));

Handlebars.registerPartial("icon", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<li class=\"item header-icon mobile\">\n	<a class=\"icon ";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" href=\"#\"></a>\n	";
  stack1 = self.invokePartial(partials.linkBlock, 'linkBlock', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>";
  return buffer;
  }));

Handlebars.registerPartial("link", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<a href=\"";
  if (helper = helpers.href) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.href); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-dom-id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasCounter), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</a>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = self.invokePartial(partials.counter, 'counter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<a data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " </a>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.href), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }));

Handlebars.registerPartial("linkBlock", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<ul class=\"sub-list\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.blocks), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<div class=\"arrow-up\"></div>\n	</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"item\">\n				";
  stack1 = self.invokePartial(partials.link, 'link', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</li>\n		";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.blocks), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }));

Handlebars.registerPartial("points", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"item header-icon points-icon mobile\">\n	<span class=\"points-icon__content\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.points)),stack1 == null || stack1 === false ? stack1 : stack1.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n</li>\n";
  return buffer;
  }));

this["headerNavigationBar"]["headerNavigationBarTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n				<li class=\"item has-sub mobile-only\"><a class=\"icon-hamburger\"></a></li>\n			";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = self.invokePartial(partials.desktopLink, 'desktopLink', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = self.invokePartial(partials.icon, 'icon', (depth0 && depth0.profileIcon), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = self.invokePartial(partials.icon, 'icon', (depth0 && depth0.pointsIcon), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = self.invokePartial(partials.points, 'points', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n				<li class=\"item ";
  if (helper = helpers['contains-subblocks']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['contains-subblocks']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n					";
  stack1 = self.invokePartial(partials.link, 'link', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  stack1 = self.invokePartial(partials.linkBlock, 'linkBlock', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</li>\n			";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"item\">\n				";
  stack1 = self.invokePartial(partials.link, 'link', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</li>\n		";
  return buffer;
  }

  buffer += "<div data-menu=\"mini\">\n	<div class=\"wide-menu\">\n		<ul>\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasLinks), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.structuredLinks), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.profileIcon), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pointsIcon), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.points), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n\n	<div class=\"overlay-background mobile-only\"></div>\n\n	<div class=\"tall-menu\" data-animate=\"kinetic-drawer\">\n		<ul data-sticky-partner=\"bottom-mini-list\">\n\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.structuredLinks), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n\n	<ul class=\"mini-list sticky-list\" data-sticky=\"bottom-mini-list\" data-animate=\"kinetic-drawer\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stickyLinks), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</div>\n";
  return buffer;
  });

return this["headerNavigationBar"];

});