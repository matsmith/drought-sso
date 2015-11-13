define('coachingQuestionnaire/scripts/compiledTemplates/application', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<script type=\"text/javascript\">\n	var _gaq = _gaq || [];\n	_gaq.push(['_setAccount', environment.googleAnalyticsAccount]);\n	_gaq.push(['_trackPageview']);\n\n	(function() {\n		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n	})();\n</script>\n<div id=\"headerNavigationBar\"></div>\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n");
  return buffer;
  
}); });