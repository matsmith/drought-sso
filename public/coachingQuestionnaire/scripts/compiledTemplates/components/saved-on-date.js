define('coachingQuestionnaire/scripts/compiledTemplates/components/saved-on-date', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n		<p class=\"savedOnDate p3 font-color-5\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.savedAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.savedAnswerText", options))));
  data.buffer.push("\n			");
  stack1 = helpers._triageMustache.call(depth0, "formattedSavedOnDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</p>\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		");
  stack1 = helpers['if'].call(depth0, "collectionDataSourceName", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<p class=\"savedOnDate p3 font-color-5\">\n				");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.collectedFromAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.collectedFromAnswerText", options))));
  data.buffer.push("\n				");
  stack1 = helpers._triageMustache.call(depth0, "collectionDataSourceName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.collectedOnAnswerText", options) : helperMissing.call(depth0, "t", "questionnaire.collectedOnAnswerText", options))));
  data.buffer.push("\n				");
  stack1 = helpers._triageMustache.call(depth0, "formattedCollectionDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</p>\n		");
  return buffer;
  }

  data.buffer.push("<div class=\"savedOnDateComponent\">\n	");
  stack1 = helpers['if'].call(depth0, "savedOnDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
}); });