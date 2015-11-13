define('coachingQuestionnaire/scripts/compiledTemplates/components/dropdown-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <li>\n      <input type=\"radio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'name': ("dataDefinitionName"),
    'value': ("value"),
    'checked': ("selected")
  },hashTypes:{'name': "STRING",'value': "STRING",'checked': "STRING"},hashContexts:{'name': depth0,'value': depth0,'checked': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\n    </li>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          <li ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectChoice", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</li>\n          ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      <div class=\"dropdown-label\"><span class=\"input-label-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inputLabel", options) : helperMissing.call(depth0, "renderSafeString", "inputLabel", options))));
  data.buffer.push("</span></div>\n    ");
  return buffer;
  }

  data.buffer.push("<ul class=\"question-container\">\n  ");
  stack1 = helpers.each.call(depth0, "choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n<div class=\"dropdown-display\">\n  <div class=\"dropdown-wrapper\">\n    <div class=\"dropdown-value-wrapper\">\n      <div class=\"dropdown-input-button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "togglePopup", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n        <p><span class=\"arrow-down\"></span></p>\n      </div>\n      <div class=\"dropdown-value\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "togglePopup", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "selectedText", options) : helperMissing.call(depth0, "renderSafeString", "selectedText", options))));
  data.buffer.push("</div>\n      <div class=\"dropdown-popup-wrapper\">\n        <div class=\"dropdown-popup-arrow\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("action-prompt-up-arrow"),
    'pngOnly': ("true")
  },hashTypes:{'src': "STRING",'pngOnly': "STRING"},hashContexts:{'src': depth0,'pngOnly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n        </div>\n        <ul class=\"dropdown-popup\">\n          ");
  stack1 = helpers.each.call(depth0, "choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n      </div>\n    </div>\n    ");
  stack1 = helpers['if'].call(depth0, "inputLabel", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</div>\n");
  return buffer;
  
}); });