define('coachingQuestionnaire/scripts/compiledTemplates/components/numbers-and-radios-question', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						<div class=\"help-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "helpText", options) : helperMissing.call(depth0, "renderSafeString", "helpText", options))));
  data.buffer.push("</div>\n					");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("tel"),
    'id': ("secondNumberChildQuestion.dataDefinitionName"),
    'name': ("secondNumberChildQuestion.dataDefinitionName"),
    'value': ("secondNumberValue")
  },hashTypes:{'type': "STRING",'id': "ID",'name': "ID",'value': "ID"},hashContexts:{'type': depth0,'id': depth0,'name': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n							<label class=\"input-label-text\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("secondNumberChildQuestion.dataDefinitionName")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n								");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "secondNumberChildQuestion.inputLabel", options) : helperMissing.call(depth0, "renderSafeString", "secondNumberChildQuestion.inputLabel", options))));
  data.buffer.push("\n							</label>\n						");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						<div class=\"font-color-4 toggle-radio-question\"\n							");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleRadioQuestion", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n							");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.imNotSure", options) : helperMissing.call(depth0, "t", "questionnaire.imNotSure", options))));
  data.buffer.push("\n							<span class=\"arrow arrow-right border-color-4\"></span>\n						</div>\n					");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							<li>\n								<label>\n									<input type=\"radio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'name': ("dataDefinitionName"),
    'value': ("value")
  },hashTypes:{'name': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\n									");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("\n									<span class=\"choice-hover-state background-color-3\"></span>\n								</label>\n							</li>\n						");
  return buffer;
  }

  data.buffer.push("<form>\n	<div class=\"question-outer-wrapper viewstate-wrapper\">\n		<div class=\"question-inner-wrapper\">\n			<div class=\"question-content\">\n				<div class=\"h1-wrapper\">\n					<h1 class=\"title-text font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</h1>\n					");
  stack1 = helpers['if'].call(depth0, "helpText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</div>\n				<div> \n					<div class=\"number-inputs-wrapper\">\n						");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("tel"),
    'id': ("firstNumberChildQuestion.dataDefinitionName"),
    'name': ("firstNumberChildQuestion.dataDefinitionName"),
    'value': ("firstNumberValue")
  },hashTypes:{'type': "STRING",'id': "ID",'name': "ID",'value': "ID"},hashContexts:{'type': depth0,'id': depth0,'name': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n						<label class=\"input-label-text\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("firstNumberChildQuestion.dataDefinitionName")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n							");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "firstNumberChildQuestion.inputLabel", options) : helperMissing.call(depth0, "renderSafeString", "firstNumberChildQuestion.inputLabel", options))));
  data.buffer.push("\n						</label>\n						");
  stack1 = helpers['if'].call(depth0, "hasSecondNumberChildQuestion", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						<div class=\"errorMessageContainer\">\n							<span class=\"cholesterol\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "cholesterolAdditionIncorrect", options) : helperMissing.call(depth0, "renderSafeString", "cholesterolAdditionIncorrect", options))));
  data.buffer.push("</span>\n							<span class=\"generic\">");
  stack1 = helpers._triageMustache.call(depth0, "minMaxError", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n						</div>\n					</div>\n					");
  stack1 = helpers['if'].call(depth0, "includeRadioQuestionToggle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					<ul ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("includeRadioQuestionToggle:toggle-included :question-container :vert :radio-question")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n						");
  stack1 = helpers.each.call(depth0, "radioChildQuestion.choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</ul>\n				</div>\n				<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("active::savedOnDateInactive")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n					");
  data.buffer.push(escapeExpression((helper = helpers['saved-on-date'] || (depth0 && depth0['saved-on-date']),options={hash:{
    'savedOnDate': ("savedOnDate"),
    'collectionDataSourceName': ("collectionDataSourceName"),
    'questionnaire': ("controller.question"),
    'formattedSavedOnDate': ("formattedSavedOnDate"),
    'formattedCollectionDate': ("formattedCollectionDate")
  },hashTypes:{'savedOnDate': "ID",'collectionDataSourceName': "ID",'questionnaire': "ID",'formattedSavedOnDate': "ID",'formattedCollectionDate': "ID"},hashContexts:{'savedOnDate': depth0,'collectionDataSourceName': depth0,'questionnaire': depth0,'formattedSavedOnDate': depth0,'formattedCollectionDate': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "saved-on-date", options))));
  data.buffer.push("\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"questionNavButtons\">\n		<div class=\"submit-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("submitButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n			");
  data.buffer.push(escapeExpression((helper = helpers['submit-button'] || (depth0 && depth0['submit-button']),options={hash:{
    'active': ("enableSubmitButton"),
    'requiredButUnanswered': ("requiredButUnanswered")
  },hashTypes:{'active': "ID",'requiredButUnanswered': "ID"},hashContexts:{'active': depth0,'requiredButUnanswered': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "submit-button", options))));
  data.buffer.push("\n		</div>\n		<div class=\"back-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("backButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n			");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigate")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n		</div>\n	</div>\n</form>\n");
  return buffer;
  
}); });