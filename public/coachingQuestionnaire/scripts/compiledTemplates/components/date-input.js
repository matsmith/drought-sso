define('coachingQuestionnaire/scripts/compiledTemplates/components/date-input', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"date-input-wrapper\">\n	<input id=\"dateInputBox\" type=\"date\" placeholder=\"MM/DD/YYYY\"\n		");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("hasInput:has-input"),
    'value': ("prepopulatedAnswer"),
    'name': ("dataDefinitionName"),
    'min': ("minRange"),
    'max': ("maxRange")
  },hashTypes:{'class': "STRING",'value': "STRING",'name': "STRING",'min': "STRING",'max': "STRING"},hashContexts:{'class': depth0,'value': depth0,'name': depth0,'min': depth0,'max': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n	/>\n\n	<label for=\"dateInputBox\" class=\"date-icon\">\n		");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("calendar-icon"),
    'fillColor': ("stroke-color-3 fill-path-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n	</label>\n\n	<label class=\"input-label-text\" for=\"dateInputBox\">");
  stack1 = helpers._triageMustache.call(depth0, "inputLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</div>\n");
  return buffer;
  
}); });