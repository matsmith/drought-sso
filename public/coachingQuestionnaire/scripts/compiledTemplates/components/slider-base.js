define('coachingQuestionnaire/scripts/compiledTemplates/components/slider-base', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	");
  data.buffer.push(escapeExpression((helper = helpers['question-wrapper'] || (depth0 && depth0['question-wrapper']),options={hash:{
    'question': ("contentItem"),
    'contentItemIdx': ("_view.contentIndex"),
    'getStarted': ("getStarted"),
    'navigate': ("navigate"),
    'answerQuestion': ("answerQuestion"),
    'quit': ("quit"),
    'submitQuestionnaire': ("submitQuestionnaire"),
    'transitionInProgress': ("transitionInProgress"),
    'questionnaireSections': ("questionnaireSections"),
    'submitButtonDomId': ("submitButtonDomId"),
    'backButtonDomId': ("backButtonDomId"),
    'bumperContinueButtonDomId': ("bumperContinueButtonDomId"),
    'bumperBackButtonDomId': ("bumperBackButtonDomId")
  },hashTypes:{'question': "ID",'contentItemIdx': "ID",'getStarted': "STRING",'navigate': "STRING",'answerQuestion': "STRING",'quit': "STRING",'submitQuestionnaire': "STRING",'transitionInProgress': "ID",'questionnaireSections': "ID",'submitButtonDomId': "ID",'backButtonDomId': "ID",'bumperContinueButtonDomId': "ID",'bumperBackButtonDomId': "ID"},hashContexts:{'question': depth0,'contentItemIdx': depth0,'getStarted': depth0,'navigate': depth0,'answerQuestion': depth0,'quit': depth0,'submitQuestionnaire': depth0,'transitionInProgress': depth0,'questionnaireSections': depth0,'submitButtonDomId': depth0,'backButtonDomId': depth0,'bumperContinueButtonDomId': depth0,'bumperBackButtonDomId': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-wrapper", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<div id=\"survey-slider\" class=\"slider-content-wrapper\">\n	");
  stack1 = helpers.each.call(depth0, "contentItem", "in", "contentItems", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
}); });