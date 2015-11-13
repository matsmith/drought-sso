define('coachingQuestionnaire/scripts/compiledTemplates/components/question-back-button', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"submit-button button border-color-5 font-color-5\">\n	<span class=\"arrow-left border-color-5\"></span>\n	");
  stack1 = helpers._triageMustache.call(depth0, "buttonText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
}); });