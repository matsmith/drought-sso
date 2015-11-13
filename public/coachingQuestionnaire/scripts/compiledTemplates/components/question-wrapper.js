define('coachingQuestionnaire/scripts/compiledTemplates/components/question-wrapper', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	<div class=\"scroll-wrapper\">\n		<div class=\"answer-outer-wrapper viewstate-wrapper\">\n			<div class=\"answer-inner-wrapper\">\n				");
  data.buffer.push(escapeExpression((helper = helpers.renderAnswerState || (depth0 && depth0.renderAnswerState),options={hash:{
    'question': ("question")
  },hashTypes:{'question': "ID"},hashContexts:{'question': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderAnswerState", options))));
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n	<div class=\"scroll-wrapper\">\n		<div class=\"no-answer-outer-wrapper viewstate-wrapper\">\n			<div class=\"no-answer-inner-wrapper\">\n				");
  data.buffer.push(escapeExpression((helper = helpers['unanswered-state'] || (depth0 && depth0['unanswered-state']),options={hash:{
    'text': ("question.text")
  },hashTypes:{'text': "ID"},hashContexts:{'text': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "unanswered-state", options))));
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "isActualQuestion", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.renderQuestionComponent || (depth0 && depth0.renderQuestionComponent),options={hash:{
    'question': ("question"),
    'contentItemIdx': ("contentItemIdx"),
    'width': ("wrapperWidth"),
    'questionnaireSections': ("questionnaireSections"),
    'transitionInProgress': ("transitionInProgress"),
    'submitButtonDomId': ("submitButtonDomId"),
    'backButtonDomId': ("backButtonDomId"),
    'bumperContinueButtonDomId': ("bumperContinueButtonDomId"),
    'bumperBackButtonDomId': ("bumperBackButtonDomId")
  },hashTypes:{'question': "ID",'contentItemIdx': "ID",'width': "ID",'questionnaireSections': "ID",'transitionInProgress': "ID",'submitButtonDomId': "ID",'backButtonDomId': "ID",'bumperContinueButtonDomId': "ID",'bumperBackButtonDomId': "ID"},hashContexts:{'question': depth0,'contentItemIdx': depth0,'width': depth0,'questionnaireSections': depth0,'transitionInProgress': depth0,'submitButtonDomId': depth0,'backButtonDomId': depth0,'bumperContinueButtonDomId': depth0,'bumperBackButtonDomId': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderQuestionComponent", options))));
  data.buffer.push("\n");
  return buffer;
  
}); });