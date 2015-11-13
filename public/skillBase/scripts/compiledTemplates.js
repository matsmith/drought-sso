define(['handlebars'], function(Handlebars) {

this["skillBase"] = this["skillBase"] || {};

Handlebars.registerPartial("accessibleSkillIcon", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- ko if: hasCanvasSupport -->\n	<div class=\"skillIcon\" data-bind=\"\n		skillIcon: {\n			active: activeCount,\n			completed: completedCount,\n			icon: icon,\n			primaryColor: primaryColor\n		}\n	\"></div>\n<!-- /ko -->\n<!-- ko ifnot: hasCanvasSupport-->\n	<div class=\"skillIcon noCanvasSkillIcon c5-border-color\">\n		<img data-bind=\"attr: { src: icon }\" />\n		<div>\n			<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>: <span data-bind=\"text: activeCount\"></span>\n		</div>\n		<div>\n			<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.completed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>: <span data-bind=\"text: completedCount\"></span>\n		</div>\n	</div>\n<!-- /ko -->";
  return buffer;
  }));

Handlebars.registerPartial("trackyourhealth", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"trackYourHealth\">\n	<div class=\"tyhLine lineTop\"></div>\n	<div class=\"tyhHeader\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.getStartedHeader)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"step\">\n		<div class=\"number\">1</div>\n		<div class=\"stepTitle\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.downloadInstructions)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"stepDetail\">\n			<a class=\"storeLink\" data-bind=\"attr:{href: appleStoreUrl}\">\n				<img class=\"appleButton\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.appleStoreAltText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n					data-bind=\"attr:{src: appleIconSrc}\" />\n			</a>\n			<a class=\"storeLink\" data-bind=\"attr:{href: googleStoreUrl}\">\n				<img class=\"googleButton\" alt=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.googleStoreAltText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n					data-bind=\"attr:{src: googleIconSrc}\" />\n			</a>\n		</div>\n	</div>\n	<div class=\"tyhLine\"></div>\n	<div class=\"step\">\n		<div class=\"number\">2</div>\n		<div class=\"stepTitle\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.codeGenInstructions)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"stepDetail\">\n			<!-- ko ifnot: linkCode() -->\n			<button class=\"smallBtn linkMobileBtn\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.codeGenButtonText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n			<!-- /ko -->\n			<!-- ko if: linkCode() -->\n			<div class=\"keycode\">\n				<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.linkMobileAppActionSteps)),stack1 == null || stack1 === false ? stack1 : stack1.codeGenLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n				<span data-bind=\"text: linkCode\"></span>\n			</div>\n			<!-- /ko -->\n		</div>\n	</div>\n	<div class=\"tyhLine\"></div>\n</div>\n";
  return buffer;
  }));

this["skillBase"]["actionStepCompletionOverlay"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"actionStepCompletedModal\" data-bind=\"\n	modal: { show: showOverlay },\n	attr: { 'data-wnptheme': theme }\n\">\n	<div class=\"scrollableModal\">\n		<div data-bind=\"with: skill\">";
  stack1 = self.invokePartial(partials.accessibleSkillIcon, 'accessibleSkillIcon', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		<!-- ko with: completedActionStep() -->\n		<h1 class=\"c4-color\" data-bind=\"text: completionTextHeader\"></h1>\n		<div class=\"completionText\" data-bind=\"text: completionText\"></div>\n		<div class=\"rateActionStep\">\n			"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.completionRatingLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			<div class=\"feedbackThumbs\">\n				<span class=\"thumbsUp\" data-bind=\"css: { thumbsUpFill: ratedUp() }\n				\"></span>\n				<span class=\"thumbsDown\" data-bind=\"css: { thumbsDownFill: ratedDown() }\n				\"></span>\n			</div>\n		</div>\n		<!-- /ko -->\n		<div data-bind=\"foreach: actions\">\n			<button class=\"actionButton c5-color c5-border-color\"\n				data-bind=\"text: buttonLabel, attr: { 'data-action-idx': $index }\"\n			></button>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  });

return this["skillBase"];

});