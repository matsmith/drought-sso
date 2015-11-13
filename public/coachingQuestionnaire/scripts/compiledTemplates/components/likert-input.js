define('coachingQuestionnaire/scripts/compiledTemplates/components/likert-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				<li ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("selected")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n					<label onmouseup=\"$WNP(this.form).submit()\">\n						<input type=\"radio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'name': ("dataDefinitionName"),
    'value': ("value"),
    'checked': ("selected")
  },hashTypes:{'name': "STRING",'value': "STRING",'checked': "STRING"},hashContexts:{'name': depth0,'value': depth0,'checked': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\n						");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("\n						<span class=\"choice-hover-state background-color-3\"></span>\n					</label>\n				</li>\n			");
  return buffer;
  }

  data.buffer.push("<form class=\"likert-input\">\n	<div class=\"likert-question-wrapper\">\n		<p class=\"p1 font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</p>\n		<div class=\"text-wrapper\">\n			<span class=\"question-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</span>\n		</div>\n		<ul class=\"question-container\">\n			");
  stack1 = helpers.each.call(depth0, "choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</ul>\n		<div class=\"endpoint-text-wrapper\">\n			<div class=\"min help-text\">");
  stack1 = helpers._triageMustache.call(depth0, "minEndpointText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n			<div class=\"max help-text\">");
  stack1 = helpers._triageMustache.call(depth0, "maxEndpointText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n		</div>\n	</div>\n	<input type=\"submit\" value=\"submit\" />\n</form>\n");
  return buffer;
  
}); });