define('coachingQuestionnaire/scripts/compiledTemplates/plan', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"plan-builder\" class=\"full-width-wrapper\">\n  <div class=\"content-wrapper\">\n    <div class=\"plan-build-slide\" id=\"plan-slide-1\">\n      <h2 class=\"font-color-5\">");
  stack1 = helpers._triageMustache.call(depth0, "firstName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "lastName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n      <h1 class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildPageOneHeaderPrefix", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildPageOneHeaderPrefix", options))));
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "programShortName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildPageOneHeaderSuffix", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildPageOneHeaderSuffix", options))));
  data.buffer.push("</h1>\n      <div id=\"plan-build-check-icon\" class=\"circle\">\n        ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-check"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n        <svg class=\"circleFill stroke-color-3\">\n          <circle cx=\"55\" cy=\"55\" r=\"51\" stroke=\"#888888\" stroke-width=\"6\" fill=\"none\"></circle>\n        </svg>\n        <svg class=\"circleTrack\">\n          <circle cx=\"55\" cy=\"55\" r=\"51\" stroke=\"#ffffff\" stroke-width=\"6\" fill=\"none\"></circle>\n        </svg>\n      </div>\n    </div>\n    <div class=\"plan-build-slide\" id=\"plan-slide-2\">\n      <h1 class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildingPageTwoHeader", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildingPageTwoHeader", options))));
  data.buffer.push("</h1>\n      <div id=\"plan-build-steps-wrapper\">\n        <div class=\"plan-build-step\" id=\"plan-build-step-1\">\n          <div class=\"content-center\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-eye"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n            <p class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildingPageTwoEyeText", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildingPageTwoEyeText", options))));
  data.buffer.push("</p>\n          </div>\n          <div class=\"arrow-reveal\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-arrow"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n          </div>\n        </div>\n        <div class=\"plan-build-step\" id=\"plan-build-step-2\">\n          <div class=\"content-center\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-plus"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n            <div class=\"pbanim-step2-corrector\">\n            	<p class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildingPageTwoPlusText", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildingPageTwoPlusText", options))));
  data.buffer.push("</p>\n            </div>\n          </div>\n          <div class=\"arrow-reveal\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-arrow"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n          </div>\n        </div>\n        <div class=\"plan-build-step\" id=\"plan-build-step-3\">\n          <div class=\"content-center\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("plan-check"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n            <p class=\"font-color-5\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildingPageTwoCheckText", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildingPageTwoCheckText", options))));
  data.buffer.push("</p>\n          </div>\n        </div>\n      </div>\n      <a id=\"plan-done\" class=\"button-text button background-color-5\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "launchPlanWidget", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.planBuildingPageTwoButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.planBuildingPageTwoButtonText", options))));
  data.buffer.push("</a>\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
}); });