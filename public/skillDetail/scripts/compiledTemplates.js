define(['handlebars'], function(Handlebars) {

this["skillDetail"] = this["skillDetail"] || {};

Handlebars.registerPartial("accordion", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div data-bind=\"foreach: items\">\n	<div class=\"accordionSection\" data-bind=\"\n			attr: {'data-itemIndex': itemIndex()},\n			css: { accordionOpen: $root.showItem[itemIndex()]() }\">\n		<div class=\"accordionHeading c4-color\" data-bind=\"\n			css: { noTouch: $root.isTouch()}\n			\">\n			<span data-bind=\"text: title\"></span>\n			</div>\n		<div class=\"accordionContent\" data-bind=\"visible: $root.showItem[itemIndex()]()\">\n			<div data-bind=\"foreach: content\">\n				";
  stack1 = self.invokePartial(partials.content, 'content', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<!-- ko if: type == $root.contentType.ACCORDION-->\n					";
  stack1 = self.invokePartial(partials.subaccordion, 'subaccordion', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<!-- /ko -->\n			</div>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  }));

Handlebars.registerPartial("actionStepsList", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div class=\"actionStepsStatus\">\n	<div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.actionStepsSummaryText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<span class=\"actionStepsLabel\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.actionStepsLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	<span class=\"c4-color\" data-bind=\"text: activeCount\"></span> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n	<span class=\"c4-color\"  data-bind=\"text: completedCount\"></span> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.completed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</div>\n<div class=\"actionStepList c5-border-color\" data-bind=\"attr: { 'data-skillId': id() }\">\n	<!-- ko foreach: actionSteps -->\n	<div class=\"actionStepListItem\">\n		<div class=\"actionStepListHeading\" data-bind=\"attr: { 'data-actionStepId': id() }\">\n			<div data-bind=\"\n					css: {\n						actionStepStarted: event() == STARTED_ACTION_STEP_EVENT,\n						actionStepCompleted: event() == COMPLETED_ACTION_STEP_EVENT,\n						actionStepAdd: event() == NOT_STARTED_ACTION_STEP_EVENT,\n						noTouch: !$root.isTouch()},\n					attr:{'data-actionStepStatus': event()}\n				\"></div>\n			<h1 data-bind=\"\n				css: {\n					'c4-color': event() == 'STARTED'\n				},\n				html: title\n			\"></h1>\n			<span class=\"icon-sans-chevron down\"></span>\n		</div>\n		<div class=\"actionStepContent\" data-bind=\"attr: { 'data-actionStepId': id() }\">\n			<div class=\"summaryText\" data-bind=\"foreach: contentBlocks\">\n				<div>\n					<!-- ko if: $data.header -->\n						<span class=\"headerText\" data-bind=\"html: header\"></span>\n					<!-- /ko -->\n					<span class=\"contentText\" data-bind=\"html: content\"></span>\n				</div>\n			</div>\n			<!-- ko if: property() --> <!-- TODO: This can be removed once back end goes in -->\n				<!-- ko if: property().videoUrl -->\n            <div class=\"hdVimeoVideoWrapper\">\n              <iframe class=\"vimeoVideo\" data-bind=\"attr: { src: property().videoUrl }\" width=\"100%\" height=\"100%\" title=\"Action Step Video\" data-dom-id=\"action-step-video\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n            </div>\n				<!-- /ko -->\n			<!-- /ko -->\n			<button class=\"smallBtn\" data-bindpoint=\"copyToDoList\" data-bind=\"{visible: event() == 'NOT_STARTED'}\" data-dom-id=\"copy-to-todo-list\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.copyToDoList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n			<a href=\"/mhmsite/w/todo\" class=\"smallBtnClear\" data-bindpoint=\"viewToDoList\" data-bind=\"{visible: event() == 'STARTED'}\" data-dom-id=\"view-todo-list\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.viewActionStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n\n			<div class=\"linkMobileApp tyhSkillDetailList\" data-bind=\"if: type() == 'linkMobileApp'\">\n				";
  stack1 = self.invokePartial(partials.trackyourhealth, 'trackyourhealth', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"actionStepEvent\">\n				<span class=\"actionStepRedo\" data-bindpoint=\"actionStepRedo\" data-bind=\"{visible: event() == 'COMPLETED'}\"></span>\n				<span class=\"eventText\" data-bind=\"{visible: event() == 'COMPLETED'}\" data-dom-id=\"redo-action-step\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.redoActionStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n			</div>\n		</div>\n	</div>\n	<!-- /ko -->\n	<div class=\"showMoreContainer\">\n		<div class=\"showMore c4-color\" data-bindpoint=\"showMore\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.showMore)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"icon-chevronDown\"></span></div>\n		<div class=\"showLess c4-color\" data-bindpoint=\"showLess\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.showLess)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"icon-chevronUp\"></span></div>\n	</div>\n</div>\n";
  return buffer;
  }));

Handlebars.registerPartial("content", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-bind=\"if: type == $root.contentType.INTRO\">\n	<p class=\"learnMoreIntroText\" data-bind=\"html: content\"></p>\n</div>\n<div data-bind=\"if: type == $root.contentType.HEADING\">\n	<p class=\"selected c4-color skillDetailHeaderText\" data-bind=\"html: content\"></p>\n</div>\n<div data-bind=\"if: type == $root.contentType.BLOCK\" class=\"blockContent\">\n	<div data-bind=\"html: content\"></div>\n</div>\n<div data-bind=\"if: type == $root.contentType.QUOTE\" class=\"blockquoteWrapper\">\n	<span class=\"blockquoteLeader c4-color\"></span>\n	<blockquote class=\"subheader c4-color\" data-bind=\"html: content\"></blockquote>\n</div>\n<div data-bind=\"if: type == $root.contentType.IMAGE\">\n	<img data-bind=\"attr: { src: content }\" />\n</div>\n<div data-bind=\"if: type == $root.contentType.IMAGE_SMALL\">\n	<img class=\"imageSmall\" data-bind=\"attr: { src: content }\" />\n</div>\n<div data-bind=\"if: type == $root.contentType.IMAGE_MEDIUM\">\n	<img class=\"imageMedium\" data-bind=\"attr: { src: content }\" />\n</div>\n<div data-bind=\"if: type == $root.contentType.VIDEO\">\n	<!-- ko if: $data.content.search(\"vimeo\") > -1 -->\n		<div class=\"vimeoVideoWrapper\">\n			<iframe class=\"vimeoVideo\" data-bind=\"attr: { src: $data.content }\" width=\"100%\" height=\"100%\" title=\"Skill Detail Video\" data-dom-id=\"skill-detail-video\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n		</div>\n	<!-- /ko -->\n	<!-- ko ifnot: $data.content.search(\"vimeo\") > -1 -->\n		<div class=\"mediaWrapper\">\n			<div class=\"media videoWrapper\">\n				<div data-bind=\"attr: {'data-mediaIndex': mediaIndex}\">\n				</div>\n			</div>\n		</div>\n	<!-- /ko -->\n</div>\n<div data-bind=\"if: type == $root.contentType.HDVIDEO\">\n	<!-- ko if: $data.content.search(\"vimeo\") > -1 -->\n		<div class=\"hdVimeoVideoWrapper\">\n			<iframe class=\"vimeoVideo\" data-bind=\"attr: { src: $data.content }\" width=\"100%\" height=\"100%\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n		</div>\n	<!-- /ko -->\n	<!-- ko ifnot: $data.content.search(\"vimeo\") > -1 -->\n		<div class=\"mediaWrapper\">\n			<div class=\"media videoWrapper\">\n				<div data-bind=\"attr: {'data-mediaIndex': mediaIndex}\">\n				</div>\n			</div>\n		</div>\n	<!-- /ko -->\n</div>\n<div data-bind=\"if: type == $root.contentType.AUDIO\">\n	<div class=\"mediaWrapper\">\n		<div class=\"media audioWrapper\">\n			<div data-bind=\"attr: {'data-mediaIndex': mediaIndex}\">\n			</div>\n		</div>\n	</div>\n</div>\n";
  }));

Handlebars.registerPartial("subaccordion", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div data-bind=\"foreach: items\" class=\"subaccordion\" >\n	<div class=\"accordionSection\" data-bind=\"\n			attr: {'data-itemIndex': itemIndex()},\n			css: { accordionOpen: $root.showItem[itemIndex()]() }\">\n		<div class=\"accordionHeading c4-color\">\n			<span data-bind=\"text: title\"></span>\n		</div>\n		<div class=\"accordionContent\" data-bind=\"visible: $root.showItem[itemIndex()]()\">\n			<div data-bind=\"foreach: content\">\n				";
  stack1 = self.invokePartial(partials.content, 'content', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  }));

Handlebars.registerPartial("tabs", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"tabContainer\">\n	<ul class=\"tabs non-mobile\" data-bind=\"foreach: items\">\n		<li data-bind=\"attr: {'data-itemIndex': itemIndex}, html: title,\n			css: { activeTab: $root.showItem[itemIndex()](),\n			'c4-background-color': $root.showItem[itemIndex()](),\n			 inactiveTab: !$root.showItem[itemIndex()]()}\">\n		</li>\n	</ul>\n	<section>\n		<div data-bind=\"foreach: items\">\n			<div class=\"tabContent\" data-bind=\"css{activeTabContent: $root.showItem[itemIndex()]()}\">\n				<p class=\"mobile-only selected c4-color skillDetailHeaderText\" data-bind=\"html: title\"></p>\n				<div data-bind=\"foreach: content\">\n					";
  stack1 = self.invokePartial(partials.content, 'content', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<!-- ko if: type == $root.contentType.ACCORDION-->\n						";
  stack1 = self.invokePartial(partials.subaccordion, 'subaccordion', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<!-- /ko -->\n				</div>\n			</div>\n		</div>\n	</section>\n</div>\n";
  return buffer;
  }));

this["skillDetail"]["learnMore"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-view=\"learnMore\">\n	<nav class=\"localNav col-xs-12\">\n		<span class=\"c5-color c5-border-color programTitleText\"}} data-bind=\"text: programShortName\"></span>\n			<ul>\n				<li>\n					<a class=\"skillDetailButton c5-color c4-border-color backBtn\" data-bind=\"css: {\n						'active': activeView() == 'skill'\n					}\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.skillDetailNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</a>\n				</li>\n				<li class=\"rightArrow c5-color\">&gt;</li>\n				<li class=\"actionStepsButton c5-color currentBreadcrumb c4-border-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.actionStepsNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n			</ul>\n	</nav>\n	<section class=\"col-xs-12 contentContainer\">\n		<div class=\"scrollBinding\">\n			<h1 class=\"c4-color skillContentHeader\" data-bind=\"text: displayName\"></h1>\n			<button class=\"smallBtn skillDetailActionStepsBtn\">Action Steps</button>\n			<div class=\"skillContainer\" data-bind=\"foreach: content\">\n				";
  stack1 = self.invokePartial(partials.content, 'content', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<!-- ko if: type == $root.contentType.TAB-->\n					";
  stack1 = self.invokePartial(partials.tabs, 'tabs', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<!-- /ko -->\n				<!-- ko if: type == $root.contentType.ACCORDION-->\n					";
  stack1 = self.invokePartial(partials.accordion, 'accordion', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<!-- /ko -->\n			</div>\n		</div>\n	</section>\n	<div data-eid=\"actionStepCompletionOverlay\"></div>\n</div>\n";
  return buffer;
  });

this["skillDetail"]["skillDetail"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container-fluid\" data-bind=\"\n	attr: { 'data-wnptheme': programName },\n	modal: { show: showSkillDetail, options: modalOptions }\n	\">\n	<div data-viewport=\"main\">\n	</div>\n</div>\n";
  });

this["skillDetail"]["skillDetailActionSteps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-view=\"skillDetailActionSteps\">\n	<nav class=\"localNav col-xs-12\">\n		<span class=\"c5-color c5-border-color programTitleText\"}} data-bind=\"text: programShortName\"></span>\n			<ul>\n				<li>\n					<a class=\"skillDetailButton c5-color c4-border-color backBtn\" data-bind=\"css: {\n						'active': activeView() == 'skill'\n					}\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planGlobal)),stack1 == null || stack1 === false ? stack1 : stack1.skillsNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</a>\n				</li>\n				<li class=\"rightArrow c5-color\">&gt;</li>\n				<li class=\"actionStepsButton c5-color c4-border-color currentBreadcrumb\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planGlobal)),stack1 == null || stack1 === false ? stack1 : stack1.actionStepsNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n			</ul>\n	</nav>\n	<section class=\"leftTitleSection animation-fadeIn\">\n		<div class=\"skillSummary\">\n			<div class=\"skillIcon\" data-bind=\"\n				skillIcon: {\n					active: activeCount,\n					completed: completedCount,\n					icon: icon,\n					primaryColor: primaryColor\n				}\n			\"></div>\n			<div class=\"skillIconMobile\" data-bind=\"\n				skillIcon: {\n					active: activeCount,\n					completed: completedCount,\n					icon: icon,\n					primaryColor: primaryColor\n				}\n			\"></div>\n		</div>\n		<h1 class=\"c4-color actionStepsTop\" data-bind=\"text: displayName\"></h1>\n		<div class=\"skillTeaserText\">\n			<p data-bind=\"html: introText\"></p>\n		</div>\n		<button class=\"smallBtn learnMoreBtn c5-background-color\" data-bindpoint=\"learnMoreBtn\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.learnMoreBtn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &#9658;</button>\n	</section>\n	<section class=\"mainContentSection animation-slideInFromRight\">\n		<div class=\"actionStepsContainer\">\n			";
  stack1 = self.invokePartial(partials.actionStepsList, 'actionStepsList', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["skillDetail"]["skillDetailLearnMore"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-view=\"skillDetailLearnMore\">\n	<nav class=\"localNav col-xs-12\">\n		<span class=\"c5-color c5-border-color programTitleText\"}} data-bind=\"text: programShortName\"></span>\n			<ul>\n				<li>\n					<a class=\"skillDetailButton c5-color c4-border-color backBtn\" data-bind=\"css: {\n						'active': activeView() == 'skill'\n					}\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planGlobal)),stack1 == null || stack1 === false ? stack1 : stack1.skillsNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</a>\n				</li>\n				<li class=\"rightArrow c5-color\">&gt;</li>\n				<li>\n					<a class=\"actionStepsButton c5-color c4-border-color\" data-bindpoint=\"backToActionBtn\" data-bind=\"css: {\n						'active': activeView() == 'actionSteps'\n					}\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.planGlobal)),stack1 == null || stack1 === false ? stack1 : stack1.actionStepsNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</a>\n				</li>\n				<li class=\"skillDetailRightArrow c5-color\">&gt;</li>\n				<li class=\"skillDetailPageHeader currentBreadcrumb c5-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.skillDetailNavLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n			</ul>\n			<span class=\"closeDetail\" data-bindpoint=\"closeDetail\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.closeDetail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</nav>\n	<section class=\"leftTitleSection\">\n		<div class=\"skillSummary\">\n			";
  stack1 = self.invokePartial(partials.accessibleSkillIcon, 'accessibleSkillIcon', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		<h1 class=\"c4-color actionStepsTop\" data-bind=\"text: displayName\"></h1>\n		<button class=\"smallBtn backToAction c5-background-color\" data-bindpoint=\"backToActionBtn\">&#9668; "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.backToActionBtn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n	</section>\n	<section class=\" mainContentSection\">\n		<h1 class=\"c4-color actionStepsDetailHeader\" data-bind=\"text: displayName\"></h1>\n		<div class=\"skillContainer\" data-bind=\"foreach: content\">\n			";
  stack1 = self.invokePartial(partials.content, 'content', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<!-- ko if: type == $root.contentType.TAB-->\n				";
  stack1 = self.invokePartial(partials.tabs, 'tabs', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<!-- /ko -->\n			<!-- ko if: type == $root.contentType.ACCORDION-->\n				";
  stack1 = self.invokePartial(partials.accordion, 'accordion', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<!-- /ko -->\n		</div>\n	</section>\n	<div data-eid=\"actionStepCompletionOverlay\"></div>\n</div>\n";
  return buffer;
  });

this["skillDetail"]["skillDetailLoading"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading\">\n	<div data-bind=\"{ loader:\n		{\n			isVisible: isVisible\n		}\n	}\" class=\"loader\"></div>\n</div>\n";
  });

return this["skillDetail"];

});