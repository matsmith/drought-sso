define('coachingQuestionnaire/scripts/compiledTemplates/components/quit-tailored-text', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"question-outer-wrapper\">\n	<div class=\"question-inner-wrapper\">\n		<div class=\"question-content\">\n			<div class=\"bumper-text-wrapper quit-tailored-text-wrapper\">\n				<div class=\"bumper-text-corner-notch border-color-3\"></div>\n				<div class=\"bumper-text-notch-header\"></div>\n				<div class=\"bumper-text\">\n					<div class=\"tailored-text-container\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</div>\n					<a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "navigate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button button-text background-color-5 bumper-button left\">\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.changeAnswerButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.changeAnswerButtonText", options))));
  data.buffer.push("\n					</a>\n					<a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "quit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button button-text background-color-5 bumper-button right\">\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.closeProgramButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.closeProgramButtonText", options))));
  data.buffer.push("\n					</a>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n");
  return buffer;
  
}); });