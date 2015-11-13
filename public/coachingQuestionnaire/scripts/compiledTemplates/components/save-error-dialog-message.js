define('coachingQuestionnaire/scripts/compiledTemplates/components/save-error-dialog-message', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("error-icon"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n<h1 class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.saveErrorDialogHeaderText", options) : helperMissing.call(depth0, "t", "questionnaire.saveErrorDialogHeaderText", options))));
  data.buffer.push("</h1>\n<h2>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.saveErrorDialogDescriptionText", options) : helperMissing.call(depth0, "t", "questionnaire.saveErrorDialogDescriptionText", options))));
  data.buffer.push("</h2>\n<a class=\"button background-color-5\" href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reset", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><span class=\"left-arrow\"></span> ");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.saveErrorDialogButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.saveErrorDialogButtonText", options))));
  data.buffer.push("</a>\n");
  return buffer;
  
}); });