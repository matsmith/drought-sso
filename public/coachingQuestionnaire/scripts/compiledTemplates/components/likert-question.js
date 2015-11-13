define('coachingQuestionnaire/scripts/compiledTemplates/components/likert-question', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n					");
  stack1 = helpers['if'].call(depth0, "useSliderInputs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						");
  stack1 = helpers['if'].call(depth0, "childQuestion.hasMoreThanTwoChoices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							");
  data.buffer.push(escapeExpression((helper = helpers['slider-input'] || (depth0 && depth0['slider-input']),options={hash:{
    'question': ("childQuestion"),
    'text': ("childQuestion.text"),
    'helptext': ("childQuestion.helptext"),
    'choices': ("childQuestion.choices"),
    'active': ("childQuestion.active"),
    'displayMode': ("scalegroup"),
    'submissionInProgress': ("submissionInProgress"),
    'transitionInProgress': ("transitionInProgress"),
    'valueDidChange': ("sliderInputValueDidChange")
  },hashTypes:{'question': "ID",'text': "ID",'helptext': "ID",'choices': "ID",'active': "ID",'displayMode': "STRING",'submissionInProgress': "ID",'transitionInProgress': "ID",'valueDidChange': "STRING"},hashContexts:{'question': depth0,'text': depth0,'helptext': depth0,'choices': depth0,'active': depth0,'displayMode': depth0,'submissionInProgress': depth0,'transitionInProgress': depth0,'valueDidChange': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "slider-input", options))));
  data.buffer.push("\n						");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							");
  data.buffer.push(escapeExpression((helper = helpers['likert-input'] || (depth0 && depth0['likert-input']),options={hash:{
    'text': ("childQuestion.text"),
    'choices': ("childQuestion.choices"),
    'userAnswers': ("childQuestion.userAnswers"),
    'submissionInProgress': ("submissionInProgress"),
    'transitionInProgress': ("transitionInProgress"),
    'valueDidChange': ("likertInputValueDidChange")
  },hashTypes:{'text': "ID",'choices': "ID",'userAnswers': "ID",'submissionInProgress': "ID",'transitionInProgress': "ID",'valueDidChange': "STRING"},hashContexts:{'text': depth0,'choices': depth0,'userAnswers': depth0,'submissionInProgress': depth0,'transitionInProgress': depth0,'valueDidChange': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "likert-input", options))));
  data.buffer.push("\n						");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						");
  data.buffer.push(escapeExpression((helper = helpers['likert-input'] || (depth0 && depth0['likert-input']),options={hash:{
    'text': ("childQuestion.text"),
    'choices': ("childQuestion.choices"),
    'userAnswers': ("childQuestion.userAnswers"),
    'submissionInProgress': ("submissionInProgress"),
    'transitionInProgress': ("transitionInProgress"),
    'valueDidChange': ("likertInputValueDidChange")
  },hashTypes:{'text': "ID",'choices': "ID",'userAnswers': "ID",'submissionInProgress': "ID",'transitionInProgress': "ID",'valueDidChange': "STRING"},hashContexts:{'text': depth0,'choices': depth0,'userAnswers': depth0,'submissionInProgress': depth0,'transitionInProgress': depth0,'valueDidChange': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "likert-input", options))));
  data.buffer.push("\n					");
  return buffer;
  }

  data.buffer.push("<div class=\"question-outer-wrapper viewstate-wrapper\">\n	<div class=\"question-inner-wrapper\">\n		<div class=\"likert-question-content-block\">\n			<div class=\"question-content\">\n				<div class=\"h1-wrapper\">\n					<h1 class=\"title-text font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</h1>\n				</div>\n				");
  stack1 = helpers.each.call(depth0, "childQuestion", "in", "childQuestions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n			<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("active::savedOnDateInactive")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n				");
  data.buffer.push(escapeExpression((helper = helpers['saved-on-date'] || (depth0 && depth0['saved-on-date']),options={hash:{
    'savedOnDate': ("savedOnDate"),
    'collectionDataSourceName': ("collectionDataSourceName"),
    'questionnaire': ("controller.question"),
    'formattedSavedOnDate': ("formattedSavedOnDate"),
    'formattedCollectionDate': ("formattedCollectionDate")
  },hashTypes:{'savedOnDate': "ID",'collectionDataSourceName': "ID",'questionnaire': "ID",'formattedSavedOnDate': "ID",'formattedCollectionDate': "ID"},hashContexts:{'savedOnDate': depth0,'collectionDataSourceName': depth0,'questionnaire': depth0,'formattedSavedOnDate': depth0,'formattedCollectionDate': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "saved-on-date", options))));
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n</div>\n<form class=\"questionSubmit\">\n	<div class=\"questionNavButtons\">\n		<div class=\"submit-button-dom-id\" ");
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