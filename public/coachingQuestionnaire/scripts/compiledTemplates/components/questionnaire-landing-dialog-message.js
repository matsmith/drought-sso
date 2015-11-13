define('coachingQuestionnaire/scripts/compiledTemplates/components/questionnaire-landing-dialog-message', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<h2>\n				\n				");
  stack1 = helpers['if'].call(depth0, "upgradePathCombinedProduct", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</h2>\n			<div>\n				<a\n					class=\"button-text button upgrade-button background-color-5 border-color-5\"\n					");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\"\n				>\n					");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueButtonText", options))));
  data.buffer.push("\n					<span class=\"arrow-right\"></span>\n				</a>\n			</div>\n		");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n					");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "upgradePath.programUpgradePathMessage", options) : helperMissing.call(depth0, "t", "upgradePath.programUpgradePathMessage", options))));
  data.buffer.push("\n				");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n					");
  stack1 = helpers['if'].call(depth0, "upgradePathQuestionnaireStarted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "upgradePath.questionnaireStartedNotSubmitted", options) : helperMissing.call(depth0, "t", "upgradePath.questionnaireStartedNotSubmitted", options))));
  data.buffer.push("\n					");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						");
  stack1 = helpers['if'].call(depth0, "upgradePathQuestionnaireFinished", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n							");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "upgradePath.questionnaireCompleteNoRetake", options) : helperMissing.call(depth0, "t", "upgradePath.questionnaireCompleteNoRetake", options))));
  data.buffer.push("\n						");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n							");
  stack1 = helpers['if'].call(depth0, "upgradePathRetakeAvailable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n								");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "upgradePath.questionnaireCompleteRetake", options) : helperMissing.call(depth0, "t", "upgradePath.questionnaireCompleteRetake", options))));
  data.buffer.push("\n							");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n								");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "upgradePath.redirectContentNoSupportProgram", options) : helperMissing.call(depth0, "t", "upgradePath.redirectContentNoSupportProgram", options))));
  data.buffer.push("\n							");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n			");
  stack1 = helpers['if'].call(depth0, "retakeAvailable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				<h1 class=\"font-color-4 border-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.landingDialogRetakeTitleText", options) : helperMissing.call(depth0, "t", "questionnaire.landingDialogRetakeTitleText", options))));
  data.buffer.push("</h1>\n				<h2>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.landingDialogRetakeDescriptionText", options) : helperMissing.call(depth0, "t", "questionnaire.landingDialogRetakeDescriptionText", options))));
  data.buffer.push("</h2>\n				<div>\n					<a\n						class=\"button-text button retake background-color-5 border-color-5\"\n						");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "retakeQuestionnaire", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\"\n					>\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.restartProgramButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.restartProgramButtonText", options))));
  data.buffer.push("\n						<span class=\"arrow-right\"></span>\n					</a>\n					<a\n						class=\"button-text button retake continue border-color-5 font-color-5\"\n						");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "continueQuestionnaire", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\"\n					>\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.continueProgramButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.continueProgramButtonText", options))));
  data.buffer.push("\n					</a>\n				</div>\n			");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				<h1 class=\"font-color-4 border-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.landingDialogTitleText", options) : helperMissing.call(depth0, "t", "questionnaire.landingDialogTitleText", options))));
  data.buffer.push("</h1>\n				<h2>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.landingDialogDescriptionText", options) : helperMissing.call(depth0, "t", "questionnaire.landingDialogDescriptionText", options))));
  data.buffer.push("</h2>\n				<div>\n					<a\n						class=\"button-text button background-color-5 border-color-5\"\n						");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\"\n					>\n						");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.finishConsultationButtonText", options) : helperMissing.call(depth0, "t", "questionnaire.finishConsultationButtonText", options))));
  data.buffer.push("\n						<span class=\"arrow-right\"></span>\n					</a>\n				</div>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"questionnaire-landing-modal-wrapper\">\n	<div class=\"landing-program-wrapper\">\n		<div class=\"landing-text\">\n			<h1 class=\"font-color-4 border-color-4\">");
  stack1 = helpers._triageMustache.call(depth0, "longName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n			<p>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "questionnaire.programDescriptionText", options) : helperMissing.call(depth0, "t", "questionnaire.programDescriptionText", options))));
  data.buffer.push("</p>\n		</div>\n	</div>\n	<div class=\"landing-action-wrapper\">\n		");
  stack1 = helpers['if'].call(depth0, "upgradePathApplicable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</div>\n</div>\n");
  return buffer;
  
}); });