define('coachingQuestionnaire/scripts/compiledTemplates/components/text-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"text-input-wrapper\">\n	<input id=\"textInputBox\" type=\"text\"\n		");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("hasInput"),
    'value': ("answer"),
    'name': ("dataDefinitionName")
  },hashTypes:{'class': "STRING",'value': "STRING",'name': "STRING"},hashContexts:{'class': depth0,'value': depth0,'name': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n	/>\n\n	<label class=\"input-label-text\" for=\"textInputBox\">");
  stack1 = helpers._triageMustache.call(depth0, "inputLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</div>\n\n");
  return buffer;
  
}); });