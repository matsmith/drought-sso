define('coachingQuestionnaire/scripts/compiledTemplates/components/section-nav', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		");
  data.buffer.push(escapeExpression((helper = helpers['section-nav-item'] || (depth0 && depth0['section-nav-item']),options={hash:{
    'section': ("")
  },hashTypes:{'section': "ID"},hashContexts:{'section': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "section-nav-item", options))));
  data.buffer.push("\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<div class=\"nav-2 activeSection font-color-3\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.progressBarQuestionnaireComplete", options) : helperMissing.call(depth0, "t", "questionnaire.progressBarQuestionnaireComplete", options))));
  data.buffer.push("\n		</div>\n	");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n		<div class=\"activeSection\">\n			<span class=\"nav-1\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.progressBarCurrentPrefix", options) : helperMissing.call(depth0, "t", "questionnaire.progressBarCurrentPrefix", options))));
  data.buffer.push("</span>\n			<span class=\"nav-2 font-color-4\">");
  stack1 = helpers._triageMustache.call(depth0, "activeSectionTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n		</div>\n	");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n		<div class=\"nextSection\">\n			<span class=\"nav-1\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.progressBarNextPrefix", options) : helperMissing.call(depth0, "t", "questionnaire.progressBarNextPrefix", options))));
  data.buffer.push("</span>\n			<span class=\"nav-2\">");
  stack1 = helpers._triageMustache.call(depth0, "nextSectionTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n		</div>\n	");
  return buffer;
  }

  data.buffer.push("<div id=\"section-navigation-sections-wrapper\"\n		");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("retakeDialogShowing :full-width-wrapper :section-navigation-sections-wrapper")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n	");
  stack1 = helpers.each.call(depth0, "sections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = helpers['if'].call(depth0, "showQuestionnaireComplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = helpers['if'].call(depth0, "nextSectionTitle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  data.buffer.push(escapeExpression((helper = helpers['loading-spinner'] || (depth0 && depth0['loading-spinner']),options={hash:{
    'isVisible': ("pageLoading")
  },hashTypes:{'isVisible': "ID"},hashContexts:{'isVisible': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "loading-spinner", options))));
  data.buffer.push("\n</div>\n");
  return buffer;
  
}); });