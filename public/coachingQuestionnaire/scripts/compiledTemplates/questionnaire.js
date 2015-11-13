define('coachingQuestionnaire/scripts/compiledTemplates/questionnaire', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"questionnaire-wrapper\" class=\"full-width-wrapper\">\n	<div id=\"survey-slider-wrapper\" class=\"slider-wrapper full-width-wrapper\">\n	");
  data.buffer.push(escapeExpression((helper = helpers['slider-base'] || (depth0 && depth0['slider-base']),options={hash:{
    'sliderAnimationComplete': ("sliderAnimationComplete"),
    'contentItems': ("contentItems"),
    'previousContentItemIndex': ("previousContentItemIndex"),
    'currentContentItemIndex': ("currentContentItemIndex"),
    'getStarted': ("getStarted"),
    'navigate': ("navigate"),
    'answerQuestion': ("answerQuestion"),
    'quit': ("quit"),
    'submitQuestionnaire': ("submitQuestionnaire"),
    'questionnaireSections': ("sections"),
    'transitionInProgress': ("transitionInProgress"),
    'submitButtonDomId': ("submitButtonDomId"),
    'backButtonDomId': ("backButtonDomId"),
    'bumperContinueButtonDomId': ("bumperContinueButtonDomId"),
    'bumperBackButtonDomId': ("bumperBackButtonDomId")
  },hashTypes:{'sliderAnimationComplete': "STRING",'contentItems': "ID",'previousContentItemIndex': "ID",'currentContentItemIndex': "ID",'getStarted': "STRING",'navigate': "STRING",'answerQuestion': "STRING",'quit': "STRING",'submitQuestionnaire': "STRING",'questionnaireSections': "ID",'transitionInProgress': "ID",'submitButtonDomId': "ID",'backButtonDomId': "ID",'bumperContinueButtonDomId': "ID",'bumperBackButtonDomId': "ID"},hashContexts:{'sliderAnimationComplete': depth0,'contentItems': depth0,'previousContentItemIndex': depth0,'currentContentItemIndex': depth0,'getStarted': depth0,'navigate': depth0,'answerQuestion': depth0,'quit': depth0,'submitQuestionnaire': depth0,'questionnaireSections': depth0,'transitionInProgress': depth0,'submitButtonDomId': depth0,'backButtonDomId': depth0,'bumperContinueButtonDomId': depth0,'bumperBackButtonDomId': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "slider-base", options))));
  data.buffer.push("\n	</div>\n");
  data.buffer.push(escapeExpression((helper = helpers['section-nav'] || (depth0 && depth0['section-nav']),options={hash:{
    'sections': ("navDisplaySections"),
    'currentPageId': ("currentPageId"),
    'retakeDialogShowing': ("retakeDialogShowing"),
    'pageLoading': ("pageLoading"),
    'submitButtonDomId': ("submitButtonDomId"),
    'backButtonDomId': ("backButtonDomId"),
    'bumperContinueButtonDomId': ("bumperContinueButtonDomId"),
    'bumperBackButtonDomId': ("bumperBackButtonDomId")
  },hashTypes:{'sections': "ID",'currentPageId': "ID",'retakeDialogShowing': "ID",'pageLoading': "ID",'submitButtonDomId': "ID",'backButtonDomId': "ID",'bumperContinueButtonDomId': "ID",'bumperBackButtonDomId': "ID"},hashContexts:{'sections': depth0,'currentPageId': depth0,'retakeDialogShowing': depth0,'pageLoading': depth0,'submitButtonDomId': depth0,'backButtonDomId': depth0,'bumperContinueButtonDomId': depth0,'bumperBackButtonDomId': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "section-nav", options))));
  data.buffer.push("\n</div>\n");
  return buffer;
  
}); });