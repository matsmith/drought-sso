define('coachingQuestionnaire/scripts/compiledTemplates/components/number-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"input-wrapper\">\n  <input type=\"text\" id=\"numberInputBox\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("hasInput"),
    'name': ("dataDefinitionName"),
    'value': ("value")
  },hashTypes:{'class': "STRING",'name': "STRING",'value': "STRING"},hashContexts:{'class': depth0,'name': depth0,'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\n  <label class=\"input-label-text\" for=\"numberInputBox\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inputLabel", options) : helperMissing.call(depth0, "renderSafeString", "inputLabel", options))));
  data.buffer.push("</label>\n</div>\n");
  return buffer;
  
}); });