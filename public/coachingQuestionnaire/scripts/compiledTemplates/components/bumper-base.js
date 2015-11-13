define('coachingQuestionnaire/scripts/compiledTemplates/components/bumper-base', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							<div class=\"bumper-back-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperBackButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n								");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigate")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n							</div>\n							<div class=\"continue-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperContinueButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n								<a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getStarted", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n								   class=\"small-button button-text button background-color-5 border-color-5\">\n									");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueButtonText", options))));
  data.buffer.push("\n									<span class=\"arrow-right\"></span>\n								</a>\n							</div>\n						");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							<div class=\"continue-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperContinueButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n								<a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getStarted", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n								   class=\"button-text button background-color-5 border-color-5\">\n									");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.getStartedButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.getStartedButtonText", options))));
  data.buffer.push("\n									<span class=\"arrow-right\"></span>\n								</a>\n							</div>\n						");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<div class=\"submit-wrapper\">\n			<div class=\"continue-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperContinueButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n				<div class=\"submit-button button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getStarted", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n					");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueButtonText", options))));
  data.buffer.push("\n					<span class=\"arrow-right\"></span>\n				</div>\n			</div>\n		</div>\n		<div class=\"bumper-back-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperBackButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n			");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigate")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n		</div>\n	");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<div class=\"submit-wrapper questionNavHasSingleButton\">\n			<div class=\"continue-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("bumperContinueButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n				<div class=\"submit-button button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getStarted", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n					");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.getStartedButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.getStartedButtonText", options))));
  data.buffer.push("\n					<span class=\"arrow-right\"></span>\n				</div>\n			</div>\n		</div>\n	");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers['section-nav-item'] || (depth0 && depth0['section-nav-item']),options={hash:{
    'section': ("")
  },hashTypes:{'section': "ID"},hashContexts:{'section': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "section-nav-item", options))));
  data.buffer.push("\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"question-outer-wrapper viewstate-wrapper\">\n	<div class=\"question-inner-wrapper\">\n		<div class=\"question-content\">\n			<div class=\"bumper-text-wrapper\">\n				<div class=\"bumper-text-corner-notch border-color-3\"></div>\n				<div class=\"bumper-text-notch-header\"></div>\n				<div class=\"bumper-text\">\n					<span class=\"program-titles font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "shortName", options) : helperMissing.call(depth0, "renderSafeString", "shortName", options))));
  data.buffer.push("</span>\n\n					<h1 class=\"font-color-4\">");
  stack1 = helpers._triageMustache.call(depth0, "page.section.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n\n					<div class=\"tailored-text-container\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</div>\n					<div class=\"navButtons\">\n						");
  stack1 = helpers['if'].call(depth0, "contentItemIdx", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n<div class=\"questionNavButtons mobileNavButtons\">\n	");
  stack1 = helpers['if'].call(depth0, "contentItemIdx", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n	<div class=\"section-progress-bar\">\n		<div class=\"section-navigation-sections-wrapper\">\n			");
  stack1 = helpers.each.call(depth0, "questionnaireSections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	</div>\n</div>");
  return buffer;
  
}); });