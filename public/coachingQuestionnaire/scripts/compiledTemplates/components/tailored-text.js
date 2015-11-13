define('coachingQuestionnaire/scripts/compiledTemplates/components/tailored-text', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						<div class=\"navButtons\">\n							");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigateBackward")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n							<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigateForward", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n									class=\"small-button button-text button background-color-5 border-color-5\">\n								");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueButtonText", options))));
  data.buffer.push("\n								<span class=\"arrow-right\"></span>\n							</a>\n						</div>\n					");
  return buffer;
  }

  data.buffer.push("<div class=\"question-outer-wrapper viewstate-wrapper\">\n	<div class=\"question-inner-wrapper\">\n		<div class=\"question-content\">\n			<div class=\"tailored-text-wrapper\">\n				<div class=\"tailored-text-corner-notch border-color-3\"></div>\n				<div class=\"tailored-text-notch-header\"></div>\n				<div class=\"tailored-text\">\n					<div class=\"tailored-text-container\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</div>\n					");
  stack1 = helpers['if'].call(depth0, "active", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n\n<div class=\"questionNavButtons mobileNavButtons\">\n	<div class=\"submit-wrapper\">\n		<div class=\"submit-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("submitButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n			<div class=\"submit-button button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigateForward", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n				");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueButtonText", options))));
  data.buffer.push("\n				<span class=\"arrow-right\"></span>\n			</div>\n		</div>\n	</div>\n	<div class=\"back-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("backButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n		");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigateBackward")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n	</div>\n</div>\n");
  return buffer;
  
}); });