define('coachingQuestionnaire/scripts/compiledTemplates/components/questionnaire-complete', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"questionnaire-complete-wrapper\">\n	<h1 class=\"program-titles font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "shortName", options) : helperMissing.call(depth0, "renderSafeString", "shortName", options))));
  data.buffer.push("</h1>\n	<h2 class=\"font-color-3\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.questionnaireCompleteThankYouText", options) : helperMissing.call(depth0, "t", "questionnaire.questionnaireCompleteThankYouText", options))));
  data.buffer.push("</h2>\n	<p>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.questionnaireCompleteDescriptionText", options) : helperMissing.call(depth0, "t", "questionnaire.questionnaireCompleteDescriptionText", options))));
  data.buffer.push("</p>\n	<form>");
  data.buffer.push(escapeExpression((helper = helpers['submit-button'] || (depth0 && depth0['submit-button']),options={hash:{
    'text': ("submitButton"),
    'active': ("true")
  },hashTypes:{'text': "ID",'active': "STRING"},hashContexts:{'text': depth0,'active': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "submit-button", options))));
  data.buffer.push("</form>\n	<a class=\"button-text font-color-5\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\">\n		<span class=\"arrow-left border-color-5\"></span>\n		");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.questionBackwardNavButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.questionBackwardNavButtonText", options))));
  data.buffer.push("\n	</a>\n</div>\n");
  return buffer;
  
}); });