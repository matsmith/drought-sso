define('coachingQuestionnaire/scripts/compiledTemplates/components/loading-spinner', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div data-bind=\"{ loader:\n	{\n		isVisible: isVisible,\n		width: 80,\n		height: 80\n	}\n}\"  class=\"loader\"></div>");
  
}); });