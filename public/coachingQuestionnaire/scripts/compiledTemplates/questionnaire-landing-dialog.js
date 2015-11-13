define('coachingQuestionnaire/scripts/compiledTemplates/questionnaire-landing-dialog', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	");
  data.buffer.push(escapeExpression((helper = helpers['questionnaire-landing-dialog-message'] || (depth0 && depth0['questionnaire-landing-dialog-message']),options={hash:{
    'close': ("closeDialog"),
    'retakeQuestionnaire': ("retakeQuestionnaire"),
    'continueQuestionnaire': ("continueQuestionnaire"),
    'longName': ("longName"),
    'retakeAvailable': ("retakeAvailable"),
    'upgradePathApplicable': ("upgradePathApplicable"),
    'upgradePathQuestionnaireStarted': ("upgradePathQuestionnaireStarted"),
    'upgradePathQuestionnaireFinished': ("upgradePathQuestionnaireFinished"),
    'upgradePathRetakeAvailable': ("upgradePathRetakeAvailable"),
    'upgradePathCombinedProduct': ("upgradePathCombinedProduct")
  },hashTypes:{'close': "STRING",'retakeQuestionnaire': "STRING",'continueQuestionnaire': "STRING",'longName': "ID",'retakeAvailable': "ID",'upgradePathApplicable': "ID",'upgradePathQuestionnaireStarted': "ID",'upgradePathQuestionnaireFinished': "ID",'upgradePathRetakeAvailable': "ID",'upgradePathCombinedProduct': "ID"},hashContexts:{'close': depth0,'retakeQuestionnaire': depth0,'continueQuestionnaire': depth0,'longName': depth0,'retakeAvailable': depth0,'upgradePathApplicable': depth0,'upgradePathQuestionnaireStarted': depth0,'upgradePathQuestionnaireFinished': depth0,'upgradePathRetakeAvailable': depth0,'upgradePathCombinedProduct': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "questionnaire-landing-dialog-message", options))));
  data.buffer.push("\n");
  return buffer;
  }

  stack1 = (helper = helpers['earmark-modal-dialog'] || (depth0 && depth0['earmark-modal-dialog']),options={hash:{
    'action': ("close")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "earmark-modal-dialog", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
}); });