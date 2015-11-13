define(['handlebars'], function(Handlebars) {

this["skillsAndActionSteps"] = this["skillsAndActionSteps"] || {};

this["skillsAndActionSteps"]["actionStepsView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-view=\"actionSteps\">\n	<!-- ko ifnot: hasActiveOrCompletedActionSteps() -->\n		<div class=\"actionStepsGetStarted\">\n			<h1 class=\"c4-color non-mobile\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n				<span data-bind=\"html: $root.programShortName\"></span>\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingSuffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</h1>\n			<h3 class=\"c4-color mobile-only\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n				<span data-bind=\"html: $root.programShortName\"></span>\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingSuffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</h3>\n			<div class=\"getStartedContent c5-border-color\">\n				<div class=\"bigLeftNav c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.noActionStepsHeader)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<div class=\"actionStepSummaryText\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.noActionStepsContent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n				</div>\n			</div>\n			<button class=\"btnLarge c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.noActionStepsGoToSkillsBtn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n	<!-- /ko -->\n	<!-- ko if: hasActiveOrCompletedActionSteps() -->\n		<h1 class=\"c4-color hasActionStepsHeader\">\n			"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			<span data-bind=\"html: $root.programShortName\"></span>\n			"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.headingSuffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n		</h1>\n		<!-- ko foreach: skills -->\n			<!-- ko if: hasActiveActionSteps() || hasCompletedActionSteps() -->\n				<div class=\"skillWrapper\">\n					<div class=\"skillIconWrapper mobile-only\">\n						";
  stack1 = self.invokePartial(partials.accessibleSkillIcon, 'accessibleSkillIcon', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<div class=\"skillListItemHeading selectedListText c5-color c5-border-color\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.skill)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": <span class=\"displayName\" data-bind=\"text: displayName\"></span>\n						<span class=\"actionStepsStatus c5-color\">\n							<!-- ko text: activeCount -->&nbsp;<!-- /ko --> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n							<!-- ko text: completedCount -->&nbsp;<!-- /ko --> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.completed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						</span>\n					</div>\n					<div class=\"skillTodo\" data-bind=\"attr: { 'data-skillId': id }\">\n						<div class=\"skillIconWrapper non-mobile\">\n							";
  stack1 = self.invokePartial(partials.accessibleSkillIcon, 'accessibleSkillIcon', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n						<div class=\"actionStepList c5-border-color\">\n							<!-- ko foreach: activeActionSteps -->\n							<div class=\"actionStepContent\" data-bind=\"\n								css: { actionStepSummaryExpanded: isExpanded },\n								attr: { 'data-actionStepId': id }\n							\">\n								<div class=\"actionStepListPoint\">\n									<span class=\"actionStepCompletedTooltip\"\n										data-bind=\"css: {noTouch: isTouch}\">\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.completeActionStepHoverText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n									</span>\n								</div>\n								<h2 data-bind=\"html: title, css: { 'c4-color': isExpanded }\"></h2>\n								<span class=\"actionStepToggle\" data-bind=\"click: toggleActionStepSummary\"></span>\n								<div class=\"actionStepSummary\">\n									<p class=\"summaryText\" data-bind=\"html: description\"></p>\n									<div class=\"linkMobileApp tyhProgramToDoList\" data-bind=\"if: type() == 'linkMobileApp'\">\n										";
  stack1 = self.invokePartial(partials.trackyourhealth, 'trackyourhealth', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n									</div>\n									<div class=\"actionStepEvent\">\n										<span class=\"actionStepRemove\"></span>\n										<span class=\"eventText\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.removeFromList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n									</div>\n								</div>\n							</div>\n							<!-- /ko -->\n							<div class=\"buttonContainer\"\n									data-bind=\"css: { noActionSteps: !hasActiveActionSteps() }\">\n								<button class=\"addActionStepBtn btnSmall c5-background-color\"\n										data-bind=\"css: { noActionSteps: !hasActiveActionSteps() }\">\n									"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planActionStepsPage)),stack1 == null || stack1 === false ? stack1 : stack1.addActionStepBtn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n								</button>\n						  </div>\n						</div>\n					</div>\n				</div>\n			<!-- /ko -->\n		<!-- /ko -->\n	<!-- /ko -->\n	<div data-eid=\"actionStepCompletionOverlay\"></div>\n</div>\n";
  return buffer;
  });

this["skillsAndActionSteps"]["application"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<script type=\"text/javascript\">\n	var _gaq = _gaq || [];\n	_gaq.push(['_setAccount', environment.googleAnalyticsAccount]);\n	_gaq.push(['_trackPageview']);\n\n	(function() {\n		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n	})();\n</script>\n\n";
  });

this["skillsAndActionSteps"]["goalView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-view=\"goal\">\n	<div class=\"goalWidget\"></div>\n</div>\n";
  });

this["skillsAndActionSteps"]["skillsAndActionSteps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-bind=\"attr: { 'data-wnptheme': programName }\" class=\"container-fluid\">\n	<nav class=\"localNav\">\n		<span class=\"c5-color c5-border-color programTitleText\" data-bind=\"text: programShortName\"></span>\n		<ul class=\"gsa-links\" data-bind=\"visible: hasTool\">\n			<li>\n				<a data-target-view=\"skills\"\n					data-bind=\"css: { 'active c4-background-color': activeView() == 'skills' },\n					text: menuSkillsLabel\"\n					data-bindpoint=\"skillsView\"\n					class=\"c5-color c4-border-color\"\n					data-dom-id=\"skills-nav-link\"></a>\n			</li>\n			<li>\n				<a data-target-view=\"goal\"\n					data-bind=\"css: { 'active c4-background-color': activeView() == 'goal' },\n					text: menuStatusLabel\"\n					data-bindpoint=\"goalView\"\n					class=\"c5-color c4-border-color\"\n					data-dom-id=\"goal-nav-link\"></a>\n			</li>\n		</ul>\n	</nav>\n	<section class=\"contentContainer col-xs-12\">\n		<div data-viewport=\"main\">\n		</div>\n	</section>\n</div>\n";
  });

this["skillsAndActionSteps"]["skillsView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-view=\"skills\">\n	<div class=\"messagingAreaWidget\">\n	</div>\n	<ul class=\"skillList\">\n		<!-- ko foreach: skills --><li class=\"skill\" data-bind=\"\n			css: {\n				selectedSkill: isActivated,\n				shadedCornerTopLeft: !seen()\n			},\n			attr: { 'data-skillId': id }\">\n			<div class=\"skillContent\">\n				<div class=\"skillHeaderWrapper\">\n					<div class=\"skillHeader\">\n						<div data-bind=\"visible: !seen()\" class=\"skillNew subheader c4-color\">\n							&mdash; <span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1['new'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> &mdash;\n						</div>\n\n						<h1 data-bind=\"text: displayName\" class=\"c4-color\"></h1>\n					</div>\n				</div>\n\n				<!-- ko if: $parent.hasCanvasSupport-->\n				<div data-bind=\"\n					skillIcon: {\n						active: activeCount,\n						completed: completedCount,\n						icon: icon,\n						primaryColor: $parent.primaryColor\n					}\n				\"></div>\n				<!-- /ko -->\n				<!-- ko ifnot: $parent.hasCanvasSupport-->\n				<div class=\"skillIcon\"><img data-bind=\"attr: { src: icon }\" /></div>\n				<div class=\"skillStatus\">\n					<div>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>:\n						<span data-bind=\"text: activeCount\"></span>\n					</div>\n					<div>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.completed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>:\n						<span data-bind=\"text: completedCount\"></span>\n					</div>\n				</div>\n				<!-- /ko -->\n\n				<div class=\"skillDescription\" data-bind=\"css: { noActivity: noActivity }\">\n					<div data-bind=\"text: skillCardSelectedDescription\"></div>\n					<div class=\"skillStatusCount\" data-bind=\"visible: someActive\">\n						<span class=\"c4-color\" data-bind=\"text: activeCount\"></span>\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						&nbsp;&nbsp;|&nbsp;&nbsp;\n						<span class=\"c4-color\" data-bind=\"text: completedCount\"></span>\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.complete)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</div>\n				</div>\n\n				<div class=\"viewSkillDetailsBtn\">\n					<button class=\"btnMedium c5-background-color\" data-bind=\"\n						text: viewSkillDetailsBtnText,\n						attr: { tabindex: 10 + $index() }\"></button>\n				</div>\n			</div>\n		</li><!--\n		/ko --><!--\n		ko if: nextSkillDate\n		--><li class=\"skill\" data-skillId=\"next\" data-bind=\"\n				attr: { tabindex: 10 + skills().length },\n				css: { selectedSkill: nextSkillIsActivated }\">\n			<div class=\"skillContent\">\n				<div class=\"skillHeaderWrapper\">\n					<div class=\"skillHeader\">\n						<h1 class=\"nextSkillName\">\n							"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planSkillPage)),stack1 == null || stack1 === false ? stack1 : stack1.nextSkillCardDateMessagePrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							<span data-bind=\"text: nextSkillDateFormatted\"></span>\n							"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planSkillPage)),stack1 == null || stack1 === false ? stack1 : stack1.nextSkillCardDateMessageSuffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						</h1>\n					</div>\n				</div>\n\n				<!-- ko if: hasCanvasSupport-->\n				<div data-bind=\"skillIcon: { icon: nextSkillIcon }\"></div>\n				<!-- /ko -->\n				<!-- ko ifnot: hasCanvasSupport-->\n				<div><img data-bind=\"attr: { src: nextSkillIcon }\" /></div>\n				<!-- /ko -->\n\n				<div class=\"skillDescription\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planSkillPage)),stack1 == null || stack1 === false ? stack1 : stack1.nextSkillCardSelectedDateMessagePrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					<span data-bind=\"text: nextSkillDateFormatted\"></span>\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planSkillPage)),stack1 == null || stack1 === false ? stack1 : stack1.nextSkillCardSelectedDateMessageSuffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n				</div>\n			</div>\n\n		</li>\n		<!-- /ko -->\n	</ul>\n</div>\n";
  return buffer;
  });

return this["skillsAndActionSteps"];

});