define('coachingQuestionnaire/scripts/compiledTemplates/components/slider-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n			<div class=\"help-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "helpText", options) : helperMissing.call(depth0, "renderSafeString", "helpText", options))));
  data.buffer.push("</div>\n		");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n			<li>\n				<input type=\"radio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'name': ("dataDefinitionName"),
    'value': ("value")
  },hashTypes:{'name': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\n			</li>\n		");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n					<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":slider-question-handle-answer-tag-wrapper isFirstChoiceSelected isLastChoiceSelected")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n						<div class=\"slider-question-handle-answer-tag\">\n							<p>");
  stack1 = helpers._triageMustache.call(depth0, "selectedChoiceDisplayText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n						</div>\n						<div class=\"slider-question-handle-answer-tag-arrow\">\n							");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("action-prompt-down-arrow"),
    'pngOnly': ("true")
  },hashTypes:{'src': "STRING",'pngOnly': "STRING"},hashContexts:{'src': depth0,'pngOnly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n						</div>\n					</div>\n				");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n					<div class=\"slider-instructions-wrapper\">\n						<div class=\"slider-instructions\">\n							<p>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.sliderQuestionInstructionText", options) : helperMissing.call(depth0, "t", "questionnaire.sliderQuestionInstructionText", options))));
  data.buffer.push("</p>\n						</div>\n						<div class=\"slider-instructions-arrow\">\n							");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("action-prompt-down-arrow"),
    'pngOnly': ("true")
  },hashTypes:{'src': "STRING",'pngOnly': "STRING"},hashContexts:{'src': depth0,'pngOnly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n						</div>\n					</div>\n				");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				<p class=\"slider-question-handle-answer-text\">\n					\n					");
  stack1 = helpers.unless.call(depth0, "slideInProgress", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</p>\n			");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						");
  stack1 = helpers._triageMustache.call(depth0, "sliderHandleDisplayValue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					");
  return buffer;
  }

  data.buffer.push("<form class=\"slider-input\">\n	<p class=\"p1 font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</p>\n	<div class=\"h1-wrapper\">\n		<h1 class=\"title-text font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</h1>\n		");
  stack1 = helpers['if'].call(depth0, "helpText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</div>\n\n	<ul class=\"question-container\">\n		");
  stack1 = helpers.each.call(depth0, "choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</ul>\n	<div class=\"slider-question-wrapper\">\n		<div class=\"slider-question-range-indicator min\">\n			<p>");
  stack1 = helpers._triageMustache.call(depth0, "minSliderLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n		</div>\n		<div class=\"slider-question-handle\">\n			<div class=\"slider-question-handle-content-wrapper\">\n				");
  stack1 = helpers['if'].call(depth0, "slideInProgress", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  stack1 = helpers['if'].call(depth0, "showInstructions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n			");
  stack1 = helpers['if'].call(depth0, "sliderHandleDisplayValue", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n		<div class=\"slider-question-bar\"></div>\n		<div class=\"slider-question-range-indicator max\"><p>");
  stack1 = helpers._triageMustache.call(depth0, "maxSliderLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p></div>\n		<div class=\"min help-text\"><span>");
  stack1 = helpers._triageMustache.call(depth0, "minHelpText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></div>\n		<div class=\"max help-text\"><span>");
  stack1 = helpers._triageMustache.call(depth0, "maxHelpText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></div>\n	</div>\n</form>\n");
  return buffer;
  
}); });