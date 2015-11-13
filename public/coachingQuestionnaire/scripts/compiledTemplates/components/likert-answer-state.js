define('coachingQuestionnaire/scripts/compiledTemplates/components/likert-answer-state', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n	<div class=\"likert-question-wrapper border-color-5\">\n		<div class=\"text-wrapper\">\n			<span class=\"question-text font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "childQuestion.text", options) : helperMissing.call(depth0, "renderSafeString", "childQuestion.text", options))));
  data.buffer.push("</span>\n			");
  stack1 = helpers['if'].call(depth0, "childQuestion.hasAnswer", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	</div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				");
  stack1 = helpers.each.call(depth0, "userAnswer", "in", "childQuestion.userAnswers", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n					<h1 class=\"answer-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "userAnswer.text", options) : helperMissing.call(depth0, "renderSafeString", "userAnswer.text", options))));
  data.buffer.push("</h1>\n				");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				<h1 class=\"answer-text\">&lt;");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.unansweredText", options) : helperMissing.call(depth0, "t", "questionnaire.unansweredText", options))));
  data.buffer.push("&gt;</h1>\n			");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n	<p class=\"p3 font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.savedAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.savedAnswerText", options))));
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "formattedSavedOnDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p><br/>\n");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n	");
  stack1 = helpers['if'].call(depth0, "collectionDataSourceName", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n		<p class=\"p3 font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.collectedFromAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.collectedFromAnswerText", options))));
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "collectionDataSourceName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.collectedOnAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.collectedOnAnswerText", options))));
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "formattedCollectionDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n	");
  return buffer;
  }

  data.buffer.push("<p class=\"border-color-5 font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</p>\n\n");
  stack1 = helpers.each.call(depth0, "childQuestion", "in", "childQuestions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['if'].call(depth0, "savedOnDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
}); });