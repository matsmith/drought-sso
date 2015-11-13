define(['handlebars'], function(Handlebars) {

this["coachingTools"] = this["coachingTools"] || {};

Handlebars.registerPartial("coachingToolLoading", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading\" data-bind=\"visible: graphIsLoading\">\n	<div data-bind=\"{ loader:\n		{\n			width: '80px',\n			height: '80px',\n			strokeWidth: 7,\n			isVisible: graphIsLoading\n		}\n	}\" class=\"loader\"></div>\n</div>\n";
  }));

Handlebars.registerPartial("selectScores", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectScore\">\n	<span class=\"mobile-only\">\n		<select class=\"dropDown\" autocomplete=\"off\">\n			<option value=\"0\">0 - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.extremelyDifficult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n			<option value=\"1\">1</option>\n			<option value=\"2\">2</option>\n			<option value=\"3\">3</option>\n			<option value=\"4\">4</option>\n			<option value=\"5\">5</option>\n			<option value=\"6\">6</option>\n			<option value=\"7\">7</option>\n			<option value=\"8\">8</option>\n			<option value=\"9\">9</option>\n			<option value=\"10\">10 - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.extremelyEasy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n		</select>\n	</span>\n	<div class=\"non-mobile\">\n		<label class=\"scale\">\n			"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.extremelyDifficult)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n		</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"0\" />0</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"1\" />1</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"2\" />2</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"3\" />3</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"4\" />4</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"5\" />5</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"6\" />6</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"7\" />7</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"8\" />8</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"9\" />9</label>\n		<label class=\"likert\"><input type=\"radio\" value=\"10\" />10</label>\n		<label class=\"scale\">\n			"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.extremelyEasy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n		</label>\n	</div>\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("stressAnswers", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n	<label class=\"likert\">\n		<input type=\"radio\" value=\""
    + escapeExpression((helper = helpers.formatValueRemoveSpaces || (depth0 && depth0.formatValueRemoveSpaces),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.text), options) : helperMissing.call(depth0, "formatValueRemoveSpaces", (depth0 && depth0.text), options)))
    + "\" />\n		";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n	</label>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		<option value=\""
    + escapeExpression((helper = helpers.formatValueRemoveSpaces || (depth0 && depth0.formatValueRemoveSpaces),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.text), options) : helperMissing.call(depth0, "formatValueRemoveSpaces", (depth0 && depth0.text), options)))
    + "\">";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n		";
  return buffer;
  }

  buffer += "<span class=\"non-mobile\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.choices), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</span>\n<span class=\"mobile-only\">\n	<select class=\"dropDown\" autocomplete=\"off\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.choices), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</select>\n</span>";
  return buffer;
  }));

Handlebars.registerPartial("submitLoading", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading\" data-bind=\"visible: submissionInProgress\">\n	<div data-bind=\"{ loader:\n		{\n			isVisible: submissionInProgress\n		}\n	}\" class=\"loader\"></div>\n</div>\n";
  }));

Handlebars.registerPartial("sleepAllViews", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"debug-tool\">\n	<h1> buttons to switch between each of the views '[data-view]' in this widget </h1>\n	<section data-bind=\"foreach: debugViews.views\">\n		<button data-bind=\"event: {click: $parent.debugEvents.debugChangeView}, text: $data\"></button>\n	</section>\n</section>\n";
  }));

Handlebars.registerPartial("sleepQuestionsIndex", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- TODO move all content including the data bindings to static strings like \"optionsCaption:\" to resources -->\n<div data-view=\"questions-index\" class=\"questions-container\">\n\n	<button class=\"button-like-link\" data-bind=\"event: {click: events.displayResults}\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepBackToSummaryButton)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n	<h1 class=\"c4-color questions-container__title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.mySleepLogTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n\n	<nav data-bind=\"component: {\n		'name': 'sleep-day-navigator',\n		'params': sleepDates\n	}\"></nav>\n\n	<!-- TODO: bind date defs from currentQuestionnaire.values.";
  if (helper = helpers['data-def-name']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['data-def-name']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".value to the input values -->\n	<div class=\"form-container\">\n		<form>\n			<fieldset class=\"questions\">\n				<span data-bind=\"css: {'not-valid': currentQuestionnaire.valid() === false}\" class=\"questionnaire-validity\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.pleaseCorrectAllHighlightedQuestionsText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n\n				<span class=\"c4-color icon-sans-SleepWrapUpSkillIcon sleep-legend-icon\">\n					<span class=\"c4-color path1\"></span>\n					<span class=\"c4-color path2\"></span>\n					<span class=\"c4-color path3\"></span>\n					<span class=\"c4-color path4\"></span>\n					<span class=\"c4-color path5\"></span>\n			</span>\n				<legend class=\"c4-color questions__heading\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogSleepTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</legend>\n\n				<div class=\"question\">\n					<span class=\"question__text\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogTimeInBedQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n\n					<div class=\"button-container\">\n						<select\n							class=\"button-container__hours\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeIntoBed.hours.value,\n							options: currentQuestionnaire.values.userSleepData.timeIntoBed.hours.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepHoursLabel\n						\"></select>\n						<select\n							class=\"button-container__mins\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeIntoBed.minutes.value,\n							options: currentQuestionnaire.values.userSleepData.timeIntoBed.minutes.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepMinutesLabel\n						\"></select>\n\n						<div\n								class=\"button-container__radio-toolbar\"\n								data-bind=\"foreach: currentQuestionnaire.values.userSleepData.timeIntoBed.period.options\">\n							<input\n									type=\"radio\"\n									data-bind=\"\n									attr: {\n											id: 'timeIntoBedPeriod-' + $index()\n									},\n									value: $data,\n									checked: $parent.currentQuestionnaire.values.userSleepData.timeIntoBed.period.value\n								\"\n									name=\"timeIntoBedPeriod\">\n							<label\n									data-bind=\"\n									text: $data,\n									attr: {\n											for: 'timeIntoBedPeriod-' + $index()\n									}\n								\"\n							></label>\n						</div>\n					</div>\n				</div>\n\n				<div class=\"question\">\n					<span data-bind=\"css: {\n						'not-valid': currentQuestionnaire.values.userSleepData.timeToSleep.valid() === false\n					}\" class=\"question__text\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogTimeToFallAsleepQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n\n					<div class=\"button-container\">\n						<select\n							class=\"button-container__hours\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeToSleep.hours.value,\n							options: currentQuestionnaire.values.userSleepData.timeToSleep.hours.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepHoursLabel,\n							disable: currentQuestionnaire.values.userSleepData.timeToSleep.enabled() === false\n						\"></select>\n						<select\n							class=\"button-container__mins\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeToSleep.minutes.value,\n							options: currentQuestionnaire.values.userSleepData.timeToSleep.minutes.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepMinutesLabel,\n							disable: currentQuestionnaire.values.userSleepData.timeToSleep.enabled() === false\n						\"></select>\n\n						<div class=\"button-container__inputCheckBox\">\n							<input type=\"checkbox\" class=\"button-container__checkbox\" id=\"checkbox_input\"\n								   data-bind=\"checked: currentQuestionnaire.values.userSleepData.noSleep\">\n							<label class=\"inputCheckBox__style-label\" for=\"checkbox_input\"></label>\n						</div>\n						<label class=\"button-container__label--lengthOfTime\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepQuestionsIDidntFallAsleepText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n				</div>\n\n				<div class=\"question\">\n					<span data-bind=\"css: {\n						'not-valid': currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.valid() === false\n					}\" class=\"question__text\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogHowLongAwakeQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n\n					<div class=\"button-container\">\n						<select\n							class=\"button-container__hours\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value,\n							options: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepHoursLabel,\n							disable: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.enabled() === false\n						\"></select>\n						<select\n							class=\"button-container__mins\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value,\n							options: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepMinutesLabel,\n							disable: currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.enabled() === false\n						\"></select>\n					</div>\n				</div>\n\n				<fieldset\n						data-bind=\"\n					css: {'not-valid': currentQuestionnaire.values.userSleepData.timesUpAtNightValid.valid() === false},\n					foreach: currentQuestionnaire.values.userSleepData.timesUpAtNight,\n					visible: currentQuestionnaire.values.userSleepData.timesUpAtNight().length\n					\"\n						class=\"interruptions\">\n					<div class=\"interruption\">\n						<div class=\"question\">\n							<span class=\"question__text\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogIndicateTimeWhatTimeWakeUp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n\n							<div class=\"button-container\">\n								<select\n									class=\"button-container__hours\"\n									data-bind=\"\n									value: values.timeOutOfBed.hours.value,\n									options: values.timeOutOfBed.hours.options,\n									optionsCaption: $root.textContent.sleepCoachingTool.sleepHoursLabel\n\n								\"></select>\n								<select\n									class=\"button-container__mins\"\n									data-bind=\"\n									value: values.timeOutOfBed.minutes.value,\n									options: values.timeOutOfBed.minutes.options,\n									optionsCaption: $root.textContent.sleepCoachingTool.sleepMinutesLabel\n\n								\"></select>\n\n								<div class=\"button-container__radio-toolbar\">\n									<input\n										type=\"radio\"\n										data-bind=\"\n										attr: {\n												id: 'awakeAtNightTimeOutOfBedPeriod-0-' + $index(),\n												name: 'awakeAtNightTimeOutOfBedPeriod' + $index()\n										},\n										value: values.timeOutOfBed.period.options[0],\n										checked: values.timeOutOfBed.period.value\n									\">\n									<label\n											data-bind=\"\n										text: values.timeOutOfBed.period.options[0],\n										attr: {\n												for: 'awakeAtNightTimeOutOfBedPeriod-0-' + $index()\n											}\n										\"\n									></label>\n									<input\n										type=\"radio\"\n										data-bind=\"\n										attr: {\n												id: 'awakeAtNightTimeOutOfBedPeriod-1-' + $index(),\n												name: 'awakeAtNightTimeOutOfBedPeriod' + $index()\n										},\n										value: values.timeOutOfBed.period.options[1],\n										checked: values.timeOutOfBed.period.value\n										\">\n									<label\n											data-bind=\"\n										text: values.timeOutOfBed.period.options[1],\n										attr: {\n												for: 'awakeAtNightTimeOutOfBedPeriod-1-' + $index()\n											}\n										\"\n									></label>\n								</div>\n							</div>\n						</div>\n\n						<div class=\"question\">\n							<span class=\"question__text\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogIndicateTimeWhatTimeBackInBed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n\n							<div class=\"button-container\">\n								<select\n									class=\"button-container__hours\"\n									data-bind=\"\n									value: values.timeIntoBed.hours.value,\n									options: values.timeIntoBed.hours.options,\n									optionsCaption: $root.textContent.sleepCoachingTool.sleepHoursLabel\n								\"></select>\n								<select\n									class=\"button-container__mins\"\n									data-bind=\"\n									value: values.timeIntoBed.minutes.value,\n									options: values.timeIntoBed.minutes.options,\n									optionsCaption: $root.textContent.sleepCoachingTool.sleepMinutesLabel\n								\"></select>\n\n								<div class=\"button-container__radio-toolbar\">\n									<input\n										type=\"radio\"\n										data-bind=\"\n										attr: {\n												id: 'awakeAtNightTimeIntoBedPeriod-2-' + $index(),\n												name: 'awakeAtNightTimeIntoBedPeriod' + $index()\n										},\n										value: values.timeIntoBed.period.options[0],\n										checked: values.timeIntoBed.period.value\n										\">\n									<label\n										data-bind=\"\n										text: values.timeIntoBed.period.options[0],\n										attr: {\n												for: 'awakeAtNightTimeIntoBedPeriod-2-' + $index()\n											}\n										\"\n									></label>\n									<input\n										type=\"radio\"\n										data-bind=\"\n										attr: {\n												id: 'awakeAtNightTimeIntoBedPeriod-3-' + $index(),\n												name: 'awakeAtNightTimeIntoBedPeriod' + $index()\n										},\n										value: values.timeIntoBed.period.options[1],\n										checked: values.timeIntoBed.period.value\n										\">\n									<label\n										data-bind=\"\n										text: values.timeIntoBed.period.options[1],\n										attr: {\n											for: 'awakeAtNightTimeIntoBedPeriod-3-' + $index()\n										}\n										\"\n									></label>\n								</div>\n							</div>\n						</div>\n						<!-- TODO give blind users a more spesific label. EX: remove this interruption -->\n						<button class=\"button--delete\"\n								data-bind=\"click: removeInterruption\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepQuestionsDeleteText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n					</div>\n				</fieldset>\n\n				<button\n					class=\"button--add\"\n					data-bind=\"\n					text: currentQuestionnaire.interruptionButtonText,\n					click: currentQuestionnaire.events.addInterruption\n				\"\n						>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogIndicateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n			</fieldset>\n\n			<fieldset class=\"questions\">\n				<span class=\"c4-color icon-sans-SleepTrackingSkillIcon sleep-legend-icon\">\n					<span class=\"c4-color path1\"></span>\n					<span class=\"c4-color path2\"></span>\n					<span class=\"c4-color path3\"></span>\n					<span class=\"c4-color path4\"></span>\n					<span class=\"c4-color path5\"></span>\n					<span class=\"c4-color path6\"></span>\n					<span class=\"c4-color path7\"></span>\n					<span class=\"c4-color path8\"></span>\n					<span class=\"c4-color path9\"></span>\n					<span class=\"c4-color path10\"></span>\n				</span>\n				<legend class=\"c4-color questions__heading\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogWakingUpTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</legend>\n\n				<div class=\"question\">\n					<span data-bind=\"css: {'not-valid': currentQuestionnaire.values.userSleepData.timeWakeUp.valid() === false}\" class=\"question__text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogTimeWakeUpQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n\n					<div class=\"button-container\">\n						<select\n							class=\"button-container__hours\"\n							data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeWakeUp.hours.value,\n							options: currentQuestionnaire.values.userSleepData.timeWakeUp.hours.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepHoursLabel,\n							disable: currentQuestionnaire.values.userSleepData.timeWakeUp.enabled() === false\n					\"></select>\n						<label class=\"custom-select\">\n							<select class=\"button-container__mins\"\n									data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeWakeUp.minutes.value,\n							options: currentQuestionnaire.values.userSleepData.timeWakeUp.minutes.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepMinutesLabel,\n							disable: currentQuestionnaire.values.userSleepData.timeWakeUp.enabled() === false\n					\"></select>\n						</label>\n\n						<div\n							class=\"button-container__radio-toolbar\"\n							data-bind=\"foreach: currentQuestionnaire.values.userSleepData.timeWakeUp.period.options\">\n							<input\n								type=\"radio\"\n								data-bind=\"\n								attr: {\n									id: 'timeWakeUpPeriod-' + $index()\n								},\n								value: $data,\n								checked: $parent.currentQuestionnaire.values.userSleepData.timeWakeUp.period.value,\n								disable: $parent.currentQuestionnaire.values.userSleepData.timeWakeUp.enabled() === false\n							\"\n									name=\"timeWakeUpPeriod\">\n							<label\n									data-bind=\"\n								text: $data,\n								attr: {\n									for: 'timeWakeUpPeriod-' + $index()\n								}\n							\"\n							></label>\n						</div>\n					</div>\n				</div>\n\n				<div class=\"question\">\n					<span data-bind=\"css: {'not-valid': currentQuestionnaire.values.userSleepData.timeOutOfBed.valid() === false}\" class=\"question__text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogTimeGetOutOfBed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n\n					<div class=\"button-container\">\n						<label class=\"custom-select\">\n							<select class=\"button-container__hours\"\n									data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeOutOfBed.hours.value,\n							options: currentQuestionnaire.values.userSleepData.timeOutOfBed.hours.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepHoursLabel\n\n					\"></select>\n						</label>\n						<label class=\"custom-select\">\n							<select class=\"button-container__mins\"\n									data-bind=\"\n							value: currentQuestionnaire.values.userSleepData.timeOutOfBed.minutes.value,\n							options: currentQuestionnaire.values.userSleepData.timeOutOfBed.minutes.options,\n							optionsCaption: textContent.sleepCoachingTool.sleepMinutesLabel\n\n					\"></select>\n						</label>\n\n						<div\n							class=\"button-container__radio-toolbar\"\n							data-bind=\"foreach: currentQuestionnaire.values.userSleepData.timeOutOfBed.period.options\">\n							<input\n								type=\"radio\"\n								data-bind=\"\n								attr: {\n									id: 'timeOutOfBedPeriod-' + $index()\n								},\n								value: $data,\n								checked: $parent.currentQuestionnaire.values.userSleepData.timeOutOfBed.period.value\n							\"\n									name=\"timeOutOfBedPeriod\">\n							<label\n								data-bind=\"\n								text: $data,\n								attr: {\n									for: 'timeOutOfBedPeriod-' + $index()\n								}\n							\"\n							></label>\n						</div>\n					</div>\n				</div>\n				<label class=\"question-label-slider\">\n					<span class=\"question__slider-input\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepLogRateEnergyLevelQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>\n					<!-- ko if: supportsRange -->\n					<div class=\"slider-container\">\n						<p class=\"slider-container__min\">0</p>\n						<p class=\"slider-container__max\">10</p>\n						<label class=\"slider-container__min-text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepWakingUpExtremelyLowEnergyLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n							<div class=\"slider-container__range-slider\">\n								<input class=\"slider-container__slider-wrapper\"\n									type=\"range\"\n									min=\"0\"\n									max=\"10\"\n									data-bind=\"\n									value: currentQuestionnaire.values.userSleepData.daytimeEnergyLevel,\n									valueUpdate: 'input change touchmove'\n								\"/>\n						<span class=\"slider-container__range-slider--range-value\" data-bind=\"\n							text: currentQuestionnaire.values.userSleepData.daytimeEnergyLevelDisplayText,\n							attr: {\n								style: currentQuestionnaire.values.userSleepData.daytimeEnergyLevelTransformString\n						}\">\n						</span>\n						</div>\n						<label class=\"slider-container__max-text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepWakingUpExtremelyHighEnergyLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n					<!-- /ko -->\n					<!-- ko if: !supportsRange -->\n					<div class=\"numeric-input\">Enter a numeric value: <input data-bind=\"textInput: currentQuestionnaire.values.userSleepData.attemptedValue\"/></div>\n					<div class=\"error\" data-bind=\"visible: currentQuestionnaire.values.userSleepData.energyLevelInputWasValid()\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sliderErrorMessage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n					<!-- /ko -->\n				</label>\n			</fieldset>\n			<button data-bind=\"text: currentQuestionnaire.submitText, event: {click: currentQuestionnaire.events.submit}, disable: currentQuestionnaire.canNotSubmit\"\n					class=\"button--save\"></button>\n		</form>\n	</div>\n</div>\n<!--\n	IE and IOS do not respect the template tag.\n	They will parse the template and find that the properties are not on the root view model.\n	We are using this if statement to prevent ko from parsing the and binding the properties out side of the component\n-->\n<!-- ko if: false -->\n	<template id=\"sleep-day-navigator\">\n		<nav class=\"day-navigator\">\n			<h2 class=\"day-navigator__log-date\" data-bind=\"text: formattedDate\"></h2>\n			<div class=\"sleep-day-navigator__icon-container\">\n				<span class=\"icon-sans-List_Reveal_Stroke_1x\" data-bind=\"event: {click: events.nextWeek}\"></span>\n				<span class=\"icon-sans-List_Hide_Stroke_1x\" data-bind=\"event: {click: events.previousWeek}\"></span>\n			</div>\n			<form data-bind=\"\n				foreach: renderedDays,\n				event: {\n					touchstart: events.startTouch,\n					touchend: events.endTouch\n				}\n				\"\n				class=\"day-navigator--form\">\n				<label class=\"day-navigator__day\">\n					<input\n						data-bind=\"\n						event: {click: updateSelection},\n						value: $index,\n						checked: value,\n						disable: status === 'entry-not-allowed'\n						\"\n							type=\"radio\"\n							name=\"currentDate\"\n							class=\"day-navigator__input\"\n					>\n					<span class=\"day-navigator__day-overlay\"></span>\n					<span class=\"day-navigator__name\" data-bind=\"text: renderName\"></span>\n					<span data-bind=\"\n						css: status,\n						text: renderNumber\"\n						class=\"day-navigator__number\"></span>\n					<span data-bind=\"css: status\n						\" class=\"c3-color day-navigator__circle\"></span>\n				</label>\n			</form>\n		</nav>\n	</template>\n<!-- /ko -->\n";
  return buffer;
  }));

Handlebars.registerPartial("sleepResultsIndex", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- TODO move all content to resources -->\n<div data-view=\"results-index\" class=\"results-container\">\n\n	<h1 class=\"c4-color title\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.howCanTrackingSleepHelpTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n	<h2 class=\"second-title\">";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.howCanTrackingSleepHelpContent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\n	<h3 class=\"c4-color third-title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.whereAreYouNowTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n	<button data-bind=\"\n		disable: disableQuestionnaireAccess,\n		text: toQuestionnaireText,\n		event: {click: events.displayQuestions}\n	\" class=\"new-entry\"></button>\n\n	<div class=\"columns\">\n		<section class=\"column-width\" data-bind=\"foreach: results().averageSummary\">\n			<section class=\"graph-box\">\n				<figure data-bind=\"component: {\n				'name': type,\n				'params': {\n					data: $data,\n					resources: $root.textContent\n				}\n			}\" class=\"graph-box__graph\"></figure>\n				<span data-bind='css : \"changeIndicator\" + changeIndicator' class=\"icon-sans-up_arrow\"></span>\n				<h3 data-bind=\"text: $root.graphLabels[type]\" class=\"graph-box__trend-description\"> </h3>\n				<h3 data-bind=\"text: content\" class=\"graph-box__trend-text\"></h3>\n			</section>\n		</section>\n\n		<h2 class=\"c4-color graph-heading\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepTimesTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n		<p class=\"sleep-info\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepTimesContent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n\n		<figure data-bind=\"component: {\n			'name': 'sleep-day-result',\n			'params': results\n		}\" class=\"graph-box__graph week-graph-box__graph\"></figure>\n\n		<h2 class=\"c4-color graph-heading\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n\n		<p class=\"sleep-info\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAverageContent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n\n	<section class=\"weekly-graph-container\">\n		<h3 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepTimesGraphHoursOfSleepLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<figure data-bind=\"component: {\n			'name': 'sleep-hours-week',\n			'params': results\n		}\" class=\"graph-box__graph background-container\"></figure>\n\n		<h3 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.energyLevelTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<figure data-bind=\"component: {\n			'name': 'sleep-energy-week',\n			'params': results\n		}\" class=\"graph-box__graph background-container\"></figure>\n	</section>\n</div>\n<!--\n	IE and IOS do not respect the template tag.\n	They will parse the template and find that the properties are not on the root view model.\n	We are using this if statement to prevent ko from parsing the and binding the properties out side of the component\n-->\n<!-- ko if: false -->\n	<template id=\"hoursSlept\">\n		<svg\n				class=\"progress-circle-result\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 200 200\"\n				preserveaspectratio=\"xMidYMid slice\"\n				>\n			<text\n					data-bind=\"text: text\"\n					class=\"progress-circle-result__text\"\n					x=\"100\"\n					y=\"110\"\n					>\n			</text>\n		</svg>\n	</template>\n\n	<template id=\"sleepEfficiency\">\n		<svg\n				class=\"progress-circle-result\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 200 200\"\n				preserveaspectratio=\"xMidYMid slice\"\n				>\n			<g transform=\" rotate(-90 100 100)\">\n				<circle\n						class=\"progress-circle-result__gage\"\n						cx=\"100\"\n						cy=\"100\"\n						r=\"57\"\n						></circle>\n\n				<circle\n						data-bind=\"style: {'stroke-dashoffset': updatedDashOffset}\"\n						class=\"c2-color progress-circle-result__gage-fill\"\n						cx=\"100\"\n						cy=\"100\"\n						r=\"57\"\n						></circle>\n			</g>\n\n			<text\n					data-bind=\"text: text\"\n					class=\"progress-circle-result__text\"\n					x=\"100\"\n					y=\"100\"\n					>\n			</text>\n		</svg>\n	</template>\n\n	<template id=\"energyLevel\">\n		<svg\n				class=\"battery-container\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 300 300\"\n				preserveaspectratio=\"xMidYMid slice\"\n				>\n			<rect\n					class=\"outer_rect\"\n					height=\"85\"\n					width=\"200\"\n					rx=\"5\"\n					ry=\"5\"\n					y=\"95\"\n					x=\"122\"\n					/>\n			<rect\n					class=\"cap-outer\"\n					height=\"56\"\n					width=\"5\"\n					rx=\"2\"\n					ry=\"2\"\n					y=\"110\"\n					x=\"323\"\n					/>\n			<rect\n					class=\"cap-inner\"\n					height=\"46\"\n					width=\"7\"\n					rx=\"3\"\n					ry=\"3\"\n					y=\"115.5\"\n					x=\"327\"\n					/>\n			<rect\n					data-bind=\"attr: {\n						width: updatedInnerWidth\n					}\"\n					class=\"inner_rect\"\n					height=\"75\"\n					rx=\"5\"\n					ry=\"5\"\n					y=\"100\"\n					x=\"126.5\"\n					/>\n		</svg>\n	</template>\n\n	<template id=\"sleep-day-result\">\n		<svg\n				class=\"sleep-day-result\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\"\n				xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 30 14\"\n				preserveaspectratio=\"xMidYMid\"\n				>\n			<!-- y axis labels -->\n			<g data-bind=\"foreach: sleepFills\" transform=\"translate(2.65, .75)\">\n				<text class=\"sleep-day-result__text\" text-anchor=\"end\"\n					  data-bind=\"attr: {y: $index() * 1.396}, text: date\"></text>\n			</g>\n			<g data-bind=\"foreach: sleepFills\" transform=\"translate(27.35, .75)\">\n				<text class=\"sleep-day-result__text\" data-bind=\"attr: {y: $index() * 1.396}, text: endDate\"></text>\n			</g>\n\n			<rect class=\"sleep-day-result__graph-box\" width=\"24\" height=\"9.8\" x=\"3\"></rect>\n			<line class=\"sleep-day-result__graduated-scale\" x1=\"2.98\" y1=\"10.03\" x2=\"27.03\" y2=\"10.03\"></line>\n			<text class=\"sleep-day-result__text\" x=\"2.1\" y=\"11.1\">12 PM</text>\n			<text class=\"sleep-day-result__text\" x=\"14.7\" y=\"11.1\">12 AM</text>\n			<text class=\"sleep-day-result__text\" x=\"26.2\" y=\"11.1\">12 PM</text>\n\n			<g class=\"sleep-day-result__legend\" transform=\"translate(3, 13)\">\n				<g>\n					<line class=\"sleep-day-result__asleep--legend\" x2=\"1\"></line>\n					<text class=\"sleep-day-result__text\" x=\"1.5\"\n						  y=\"0.2\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepTimesGraphHoursOfSleepLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n				</g>\n				<g transform=\"translate(6,0)\">\n					<line class=\"sleep-day-result__in-bed--legend\" x2=\"1\"></line>\n					<!-- TODO data-bind text this content -->\n					<text class=\"sleep-day-result__text\" x=\"1.5\" y=\"0.2\"> Awake</text>\n				</g>\n			</g>\n\n			<g data-bind=\"foreach: sleepFills\" transform=\"translate(3, 0.7)\">\n				<g data-bind=\"attr: {transform: 'translate(0, '+( $index() * 1.396 )+')'}\" transform=\"translate(0, 0)\">\n					<line class=\"sleep-day-result__background\" x2=\"24\"></line>\n					<line data-bind=\"attr: {x1:timeToBedFill, x2: timeOutOfBedFill}\"\n						  class=\"sleep-day-result__in-bed\"></line>\n\n					<g data-bind=\"foreach: asleepFills\">\n						<line data-bind=\"attr: {x1:renderStart, x2: renderEnd}\" class=\"sleep-day-result__asleep\"></line>\n					</g>\n				</g>\n			</g>\n		</svg>\n	</template>\n<!-- /ko -->\n\n<!--\n	IE and IOS do not respect the template tag.\n	They will parse the template and find that the properties are not on the root view model.\n	We are using this if statement to prevent ko from parsing the and binding the properties out side of the component\n-->\n<!-- ko if: false -->\n	<template id=\"sleep-hours-week\">\n		<svg\n				class=\"sleep-hours-week-result\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\"\n				xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 47 25\"\n				preserveaspectratio=\"xMidYMid slice\"\n				>\n			<!-- y legend -->\n			<text class=\"sleep-hours-week-result__text\" x=\"0.5\" y=\"1.5\"> 12 "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepHoursLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n			<text class=\"sleep-hours-week-result__text\" x=\"0.5\" y=\"8.8\"> 6 "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepHoursLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n			<text class=\"sleep-hours-week-result__text\" x=\"0.5\" y=\"16\"> 0 "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepHoursLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n\n			<!-- graph outline -->\n			<rect class=\"sleep-hours-week-result__graph-box\" width=\"42\" height=\"15\" x=\"4.5\" y=\"1\"></rect>\n			<line class=\"sleep-hours-week-result__graduated-y-scale\" x1=\"4.5\" y1=\"1\" x2=\"4.5\" y2=\"16\"></line>\n\n			<!-- graph -->\n			<g data-bind=\"foreach: averageSummary\" transform=\"translate(1, 16)\">\n				<line\n						class=\"sleep-hours-week-result__asleep\"\n						data-bind=\"attr: {\n					x1: ($index() + 1) * 7,\n					x2: ($index() + 1) * 7,\n					y2: - averageSleep\n				}\">\n				</line>\n			</g>\n\n			<g\n					class=\"sleep-hours-week-result__graduated-scale\"\n					transform=\"translate(8, 17.5)\">\n				<!-- ko foreach: averageSummary -->\n				<g data-bind=\"attr: {\n					transform: 'translate('+ (($index()) * 7) +',0)'\n				}\">\n				<!-- ko if: renderDate === 'baseline' -->\n					<text class=\"sleep-hours-week-result__text\" text-anchor=\"middle\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesHoursOfSleepGraphProgramLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n					<text class=\"sleep-hours-week-result__text\" text-anchor=\"middle\" dy=\"1.4\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesHoursOfSleepGraphStartLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n				<!-- /ko -->\n				<!-- ko ifnot: renderDate === 'baseline' -->\n					<text data-bind=\"text: 'Week ' + id\" class=\"sleep-hours-week-result__text\"\n						  text-anchor=\"middle\"></text>\n					<text data-bind=\"text: renderDate\" class=\"sleep-hours-week-result__text\" text-anchor=\"middle\"\n						  dy=\"1.4\"></text>\n				<!-- /ko -->\n				</g>\n				<!-- /ko -->\n			</g>\n\n			<g class=\"sleep-hours-week-result__legend\" transform=\"translate(5.5, 22)\">\n				<g>\n					<line class=\"sleep-hours-week-result__asleep\" x2=\"1.5\"></line>\n					<text class=\"sleep-hours-week-result__text\" x=\"2\"\n						  y=\"0.2\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.sleepTimesGraphHoursOfSleepLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n				</g>\n			</g>\n		</svg>\n	</template>\n\n	<template id=\"sleep-energy-week\">\n		<svg\n				class=\"sleep-energy-week-result\"\n				xmlns=\"http://www.w3.org/2000/svg\"\n				version=\"1.1\"\n				xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n				viewbox=\"0 0 37 20\"\n				preserveaspectratio=\"xMidYMid slice\"\n				>\n			<!-- y legend -->\n			<text class=\"sleep-energy-week-result__text\" x=\"0.2\"\n				  y=\"1.3\">  "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesEnergyLevelGraphHighLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n			<text class=\"sleep-energy-week-result__text\" x=\"0.5\"\n				  y=\"12.2\"> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesEnergyLevelGraphLowLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n			<!-- graph outline -->\n			<rect class=\"sleep-energy-week-result__graph-box\" width=\"33.6\" height=\"11.2\" x=\"3.15\" y=\"1\"></rect>\n			<line class=\"sleep-energy-week-result__graduated-y-scale\" x1=\"3.15\" y1=\"1\" x2=\"3.15\" y2=\"12.2\"></line>\n\n			<!-- graph -->\n			<g transform=\"translate(6.6, 11.6)\">\n				<!--\n					itterate cx by 4.66 (= rect width / 6 grades)\n					cy is the data. Must be negative energy between 0 and 10\n\n					bind the cx and cy to the path (L x y)\n				  -->\n				<path\n						class=\"sleep-energy-week-result__path\"\n						data-bind=\"attr: {\n					d: pathString\n				}\"\n			></path>\n				<!-- ko foreach: averageSummary -->\n					<!-- ko if: noData === false-->\n						<circle data-bind=\"attr : {\n							cx: $index() * 5.4,\n							cy: -averageEnergy\n						}\" class=\"sleep-energy-week-result__level\" r=\"0.6\"></circle>\n					<!-- /ko -->\n					<!-- ko if: ($index() === 0) && (noData === true) -->\n					<circle data-bind=\"attr : {\n						cx: $index() * 5.4,\n						cy: 0\n					}\" class=\"sleep-energy-week-result__level\" r=\"0.6\"></circle>\n					<!-- /ko -->\n				<!-- /ko -->\n			</g>\n			<g\n					class=\"sleep-energy-week-result__graduated-scale\"\n					transform=\"translate(6.6, 13.5)\">\n				<!-- ko foreach: averageSummary -->\n					<!-- ko if: baseline-->\n						<text class=\"sleep-energy-week-result__text\" text-anchor=\"middle\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesHoursOfSleepGraphProgramLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n						<text class=\"sleep-energy-week-result__text\" text-anchor=\"middle\" dy=\"1\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weeklyAveragesHoursOfSleepGraphStartLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n					<!-- /ko -->\n					<!-- ko ifnot: baseline-->\n						<g data-bind=\"attr: {\n							transform: 'translate('+ ($index() * 5.4) +',0)'\n						}\">\n							<text data-bind=\"text: 'Week ' + id\" class=\"sleep-energy-week-result__text\"\n								  text-anchor=\"middle\"></text>\n							<text data-bind=\"text: renderDate\" class=\"sleep-energy-week-result__text\" text-anchor=\"middle\"\n								  dy=\"1\"></text>\n						</g>\n					<!-- /ko -->\n				<!-- /ko -->\n			</g>\n\n			<g class=\"sleep-energy-week-result__legend\" transform=\"translate(4.4, 17)\">\n				<g>\n					<path\n							class=\"sleep-energy-week-result__path\"\n							d=\"M -0.5 0 L 1.5 0\"\n							></path>\n					<circle cx=\"0.5\" cy=\"0\" class=\"sleep-energy-week-result__level\" r=\"0.6\"></circle>\n					<text class=\"sleep-energy-week-result__text\" x=\"2\"\n						  y=\"0.2\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sleepCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.energyLevelLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</text>\n				</g>\n			</g>\n		</svg>\n	</template>\n<!-- /ko -->\n";
  return buffer;
  }));

this["coachingTools"]["actionStepMessagingAreaWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"\" class=\"foldedCornerTopLeft\"\n		data-bind=\"{ 'data-wnptheme': sourceProgramName }\">\n	<section data-viewport=\"main\">\n		<div data-view=\"main\">\n			<h1 class=\"c5-color programName\" data-bind=\"text: programLongName\"></h1>\n			<div class=\"message\" data-bind=\"html: message\"></div>\n			<!-- ko if: hasActionStep -->\n			<div class=\"actionStepContainer\" data-bind=\"with: actionStep,\n					attr: { 'data-actionStepId': actionStep.id }\">\n				<div class=\"actionStepHeading\">\n					<h1 class=\"c4-color\" data-bind=\"html: title\"></h1>\n				</div>\n				<div class=\"actionStepContent\">\n					<div class=\"summaryText\" data-bind=\"html: description\"></div>\n					<div class=\"linkMobileApp tyhSkillDetailList\" data-bind=\"if: type() == 'linkMobileApp'\">\n						";
  stack1 = self.invokePartial(partials.trackyourhealth, 'trackyourhealth', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<p class=\"skillLink\">\n						<strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.messageAreaSkillLinkLeadIn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.messageAreaSkillLinkPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						<a>\n							<!-- ko text: skillName --><!-- /ko -->\n							"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.messageAreaSkillLinkPostfix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						</a>\n					</p>\n					<button class=\"smallBtn\" data-bindpoint=\"copyToDoList\" data-bind=\"{visible: event() == 'NOT_STARTED'}\" data-dom-id=\"copy-to-todo-list\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.copyToDoList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n					<a href=\"/mhmsite/w/todo\" class=\"smallBtnClear\" data-bindpoint=\"viewToDoList\" data-bind=\"{visible: event() == 'STARTED'}\" data-dom-id=\"view-todo-list\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.viewActionStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n					<div class=\"actionStepEvent\" data-bind=\"visible: event() == COMPLETED_ACTION_STEP_EVENT\">\n						<span class=\"actionStepRedo\"></span>\n						<span class=\"eventText\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.skillDetail)),stack1 == null || stack1 === false ? stack1 : stack1.redoActionStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					</div>\n				</div>\n			</div>\n			<!-- /ko -->\n		</div>\n	</section>\n	<div data-bindpoint=\"actionStepCompletionOverlay\"></div>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["chronicConditionTooltip"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<div>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (helper = helpers.score) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.score); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div>"
    + escapeExpression((helper = helpers.dateFormat || (depth0 && depth0.dateFormat),options={hash:{
    'format': ("MMM D, YYYY")
  },data:data},helper ? helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.date), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.date), options)))
    + "</div>";
  return buffer;
  });

this["coachingTools"]["chronicConditionWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"chronicConditionSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\">\n						<div class=\"currentData multiMetrics metric1Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.medical\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.medical\"></div>\n						</div>\n						<div class=\"currentData multiMetrics metric2Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.lifestyle\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.lifestyle\"></div>\n						</div>\n						<div class=\"currentData multiMetrics metric3Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.emotional\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.emotional\"></div>\n						</div>\n					</div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: medicalTargetedContent\"></div>\n				<div class=\"targetedContent\" data-bind=\"html: lifestyleTargetedContent\"></div>\n				<div class=\"targetedContent\" data-bind=\"html: emotionalTargetedContent\"></div>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.StatusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<form name=\"updateStatus\" class=\"chronicConditionToolForm updateForm\">\n				<div class=\"scoreInputGroup\" data-score=\"medical\">\n					<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<div class=\"scoreInputGroup\" data-score=\"lifestyle\">\n					<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<div class=\"scoreInputGroup\" data-score=\"emotional\">\n					<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.chronicConditionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n				</button>\n				";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</form>\n		</div>\n\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["depressionWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"depressionSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\" data-bind=\"\n						activeStatusIcon: {\n							currentScore: currentScore,\n							levels: levels\n						}\n					\"></div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: targetedContent\"></div>\n				<h3 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depressionSymptomsGraph)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateButtonLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink closeView\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.statusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<form class=\"updateForm\">\n				<div class=\"questionPageLeadIn\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.questionPageLeadIn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<div class=\"cesdQuestionnairePage\" data-bind=\"showPage: questionPage\" data-page=\"1\">\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depDepressed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionFeltDepressed\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionFeltDepressed\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depDisliked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionDisliked\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionDisliked\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depHappy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"0\" name=\"CESDepressionHappy\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"1\" name=\"CESDepressionHappy\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depFeltEffort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionFeltEffort\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionFeltEffort\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depRestless)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionRestlessSleep\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionRestlessSleep\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n				</div>\n				<div class=\"cesdQuestionnairePage\" data-bind=\"showPage: questionPage\" data-page=\"2\">\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depFeltLonely)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionFeltLonely\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionFeltLonely\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depOthersUnfriendly)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionOthersUnfriendly\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionOthersUnfriendly\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depEnjoyedLife)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"0\" name=\"CESDepressionEnjoyedLife\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"1\" name=\"CESDepressionEnjoyedLife\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depFeltSad)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionFeltSad\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionFeltSad\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n					<div>\n						<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.depressionCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.depNotGetGoing)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						<fieldset>\n							<label>\n								<input type=\"radio\" value=\"Yes\" data-score=\"1\" name=\"CESDepressionNotGetGoing\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label\n							><label>\n								<input type=\"radio\" value=\"No\" data-score=\"0\" name=\"CESDepressionNotGetGoing\" />\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							</label>\n						</fieldset>\n					</div>\n				</div>\n			</form>\n			<button type=\"button\" class=\"previousButton controlButton btnSmall c5-color c5-border-color\"\n					data-bind=\"visible: showPreviousButton, disable: submissionInProgress\">\n				&lt;"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.back)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n			<button type=\"button\" class=\"nextButton controlButton btnSmall c5-background-color\"\n					data-bind=\"visible: showNextButton, enable: canAdvance\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.next)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n			</button>\n			<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\"\n					data-bind=\"visible: showSaveButton, enable: canSubmit\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n			</button>\n			";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["diabetesWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"diabetesSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\">\n						<div class=\"currentData multiMetrics metric1Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.medical\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.medical\"></div>\n						</div>\n						<div class=\"currentData multiMetrics metric2Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.lifestyle\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.lifestyle\"></div>\n						</div>\n						<div class=\"currentData multiMetrics metric3Data\">\n							<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber non-mobile\" data-bind=\"text: currentScore.emotional\"></div>\n							<div class=\"dataTitle mobile-only c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							<div class=\"dataNumber mobile-only c4-color\" data-bind=\"text: currentScore.emotional\"></div>\n						</div>\n					</div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: medicalTargetedContent\"></div>\n				<div class=\"targetedContent\" data-bind=\"html: lifestyleTargetedContent\"></div>\n				<div class=\"targetedContent\" data-bind=\"html: emotionalTargetedContent\"></div>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.statusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<form name=\"updateStatus\" class=\"diabetesToolForm updateForm\">\n				<div class=\"scoreInputGroup\" data-score=\"medical\">\n					<span class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					<span class=\"examples\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.MedicalExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<div class=\"scoreInputGroup\" data-score=\"lifestyle\">\n					<span class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					<span class=\"examples\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.LifestyleExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<div class=\"scoreInputGroup\" data-score=\"emotional\">\n					<span class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					<span class=\"examples\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.diabetesCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.EmotionalExamples)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					";
  stack1 = self.invokePartial(partials.selectScores, 'selectScores', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n				<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n				</button>\n				";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</form>\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["multiMetricTooltip"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<div>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (helper = helpers.score) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.score); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div>"
    + escapeExpression((helper = helpers.dateFormat || (depth0 && depth0.dateFormat),options={hash:{
    'format': ("MMM D, YYYY")
  },data:data},helper ? helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.date), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.date), options)))
    + "</div>";
  return buffer;
  });

this["coachingTools"]["physicalActivityTooltip"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div>"
    + escapeExpression((helper = helpers.dateFormat || (depth0 && depth0.dateFormat),options={hash:{
    'format': ("MMM D, YYYY")
  },data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options)))
    + "</div>";
  return buffer;
  });

this["coachingTools"]["physicalActivityWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"physicalActivitySkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\" data-bind=\"\n						activeStatusIcon: {\n							currentScore: currentScore,\n							levels: levels\n						}\n					\"></div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: targetedContent\"></div>\n				<h3 class=\"c3-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.yourProgressGraph)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateButtonLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink closeView\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.statusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<form class=\"updateForm\">\n				<div class=\"newData\">\n					<label class=\"exerciseTypeLabel\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.moderateActivityLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</label>\n\n					<div class=\"mobile-only answers\">\n						<select class=\"mobile-only\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" data-bind=\"value: moderateActivityDays\">\n							<option value=\"0\">0</option>\n							<option value=\"1\">1</option>\n							<option value=\"2\">2</option>\n							<option value=\"3\">3</option>\n							<option value=\"4\">4</option>\n							<option value=\"5\">5</option>\n							<option value=\"6\">6</option>\n							<option value=\"7\">7</option>\n						</select>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n					<div class=\"non-mobile answers\">\n						<div class=\"dropdownValue\">\n							<span class=\"selectedText\" data-bind=\"text: moderateActivityDays\"></span>\n							<span class=\"downArrow\"></span>\n							<div class=\"dropdownListWrapper\">\n								<div>\n									<label>\n										0<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"0\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										1<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"1\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										2<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"2\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										3<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"3\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										4<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"4\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										5<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"5\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										6<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"6\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n									<label>\n										7<input type=\"radio\" name=\"ModeratePhysicalActivityAmountDaysPerWeek\" value=\"7\"\n											data-bind=\"checked: moderateActivityDays\" />\n									</label>\n								</div>\n							</div>\n						</div>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n					<div class=\"minutesWrapper\">\n						<input type=\"text\"  name=\"ModeratePhysicalActivityAmountMinutesPerDay\" data-bind=\"value: moderateActivityMins, valueUpdate: 'keyup', disable: submissionInProgress\" />\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.minutes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n				</div>\n				<div class=\"newData\">\n					<label class=\"exerciseTypeLabel\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.vigorousActivityLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</label>\n\n					<div class=\"mobile-only answers\">\n						<select class=\"mobile-only\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" data-bind=\"value: vigorousActivityDays\">\n							<option value=\"0\">0</option>\n							<option value=\"1\">1</option>\n							<option value=\"2\">2</option>\n							<option value=\"3\">3</option>\n							<option value=\"4\">4</option>\n							<option value=\"5\">5</option>\n							<option value=\"6\">6</option>\n							<option value=\"7\">7</option>\n						</select>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n					<div class=\"non-mobile answers\">\n						<div class=\"dropdownValue\">\n							<span class=\"selectedText\" data-bind=\"text: vigorousActivityDays\"></span>\n							<span class=\"downArrow\"></span>\n							<div class=\"dropdownListWrapper\">\n								<div>\n									<label>\n										0<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"0\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										1<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"1\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										2<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"2\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										3<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"3\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										4<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"4\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										5<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"5\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										6<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"6\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n									<label>\n										7<input type=\"radio\" name=\"VigorousPhysicalActivityAmountDaysPerWeek\" value=\"7\"\n											data-bind=\"checked: vigorousActivityDays\" />\n									</label>\n								</div>\n							</div>\n						</div>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n					<div class=\"minutesWrapper\">\n						<input type=\"text\"  name=\"VigorousPhysicalActivityAmountMinutesPerDay\" data-bind=\"value: vigorousActivityMins, valueUpdate: 'keyup', disable: submissionInProgress\" />\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.minutes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n				</div>\n				<div class=\"newData\">\n					<label class=\"exerciseTypeLabel\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.strengthTrainingLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</label>\n\n					<div class=\"mobile-only answers\">\n						<select name=\"PhysicalActivityStrengthFrequency\" data-bind=\"value: strengthActivityDays\">\n							<option value=\"RarelyOrNever\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.rarelyOrNever)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n							<option value=\"1DayPerWeek\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['1DayPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n							<option value=\"2DaysPerWeek\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['2DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n							<option value=\"3DaysPerWeek\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['3DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n							<option value=\"4To5DaysPerWeek\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['4To5DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n							<option value=\"6To7DaysPerWeek\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['6To7DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n						</select>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n					<div class=\"non-mobile answers\">\n						<div class=\"dropdownValue\">\n							<span class=\"selectedText\" data-bind=\"text: strengthActivityDaysDisplayText()\"></span>\n							<span class=\"downArrow\"></span>\n							<div class=\"dropdownListWrapper\">\n								<div>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.rarelyOrNever)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"RarelyOrNever\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['1DayPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"1DayPerWeek\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['2DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"2DaysPerWeek\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['3DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"3DaysPerWeek\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['4To5DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"4To5DaysPerWeek\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.physicalActivityCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1['6To7DaysPerWeek'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n										<input type=\"radio\" name=\"PhysicalActivityStrengthFrequency\" value=\"6To7DaysPerWeek\"\n											data-bind=\"checked: strengthActivityDays\" />\n									</label>\n								</div>\n							</div>\n						</div>\n						<label>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.days)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n					</div>\n\n				</div>\n			</form>\n			<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\"\n					data-bind=\"enable: canSubmit\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n			</button>\n			";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["sleepTrackerWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section data-wnpcoachingwidget=\"sleepTrackerWidget\" data-wnptheme=\"sleepSkills\">\n	<section class=\"section__sleepTracker\" data-viewport=\"sleepTracker\">\n		";
  stack1 = self.invokePartial(partials.sleepQuestionsIndex, 'sleepQuestionsIndex', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = self.invokePartial(partials.sleepResultsIndex, 'sleepResultsIndex', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</section>\n\n	<!-- debug tools -->\n	<!-- read the currently bound object @ depth\n		<pre data-bind=\"text: JSON.stringify($data, null, 2)\"></pre>\n\n	 ";
  stack1 = self.invokePartial(partials.sleepAllViews, 'sleepAllViews', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n 	-->\n</section>\n";
  return buffer;
  });

this["coachingTools"]["smokingCessationWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"smokingCessationSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"main\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.header)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n			<div class=\"slipTrackingMessage\" data-bind=\"html: slipTrackingText\"></div>\n			<!-- ko if: showSlipTrackingQuestion -->\n			<div class=\"slipTrackingQuestion\"\n					data-bind=\"css: { submitting: slipTrackingSubmissionInProgress }\">\n				<span class=\"slipTrackingQuestionText\">\n					"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.slipTrackingQuestion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n				</span>\n				<span class=\"loader\" data-bind=\"loader: {\n					isVisible: slipTrackingSubmissionInProgress,\n					height: 32,\n					width: 32\n				}\"></span>\n				<fieldset>\n					<label>\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.yes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						<input type=\"radio\" name=\"slipTrackingQuestion\" value=\"Yes\">\n					</label\n					><label>\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.no)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						<input type=\"radio\" name=\"slipTrackingQuestion\" value=\"No\">\n					</label>\n				</fieldset>\n			</div>\n			<!-- /ko -->\n\n			<div class=\"smokingCessationCarousel\">\n				<div data-bind=\"foreach: improvements\">\n					<div class=\"smokingCessationCarouselPanel\"\n						data-bind=\"css: {\n							activePanel: isActive,\n							nextPanel: isNext,\n							previousPanel: isPrevious\n						}\"\n					>\n						<div class=\"smokingCessationCarouselPanelContent\">\n							<span class=\"icon\" data-bind=\"enhancedSvg: panelIndicatorIconSrc\"></span>\n							<div class=\"improvementDetail\">\n								<h3 class=\"c4-color\" data-bind=\"text: name\"></h3>\n								<div class=\"improvementDescription\"\n										data-bind=\"html: description\"></div>\n								<div class=\"improvementSeenQuestion\"\n										data-bind=\"visible: showImprovementSeenQuestion\">\n									<!-- ko ifnot: isSeen() -->\n										<span class=\"icon\"\n											data-bindpoint=\"improvementSeenCheckbox\"\n											data-bind=\"enhancedHoverSvg: {\n												hoverSrc: seenCheckboxHoverSrc,\n												src: seenCheckboxNotSeenSrc\n											}\"\n										></span>\n									<!-- /ko -->\n									<!-- ko if: isSeen() -->\n										<span class=\"icon\" data-bindpoint=\"improvementSeenCheckbox\"\n											data-bind=\"enhancedSvg: seenCheckboxSeenSrc\"></span>\n									<!-- /ko -->\n									<label>\n										"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.improvementNoticedCheckboxLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n									</label>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n				<div class=\"improvementBannerContainer\">\n					<div class=\"improvementsNoticedBanner c4-background-color\"\n							data-bind=\"visible: showImprovementsBanner\">\n						<span class=\"icon\" data-bind=\"enhancedSvg:bargraphIconSrc\"></span>\n						<span class=\"message\">\n							"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.improvementNoticedBannerPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							<strong>\n								<!-- ko text: numberSeen --><!-- /ko -->\n								"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.improvementNoticedBannerInfix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n								<!-- ko text: improvements().length --><!-- /ko -->\n							</strong>\n							"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.smokingCessationCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.improvementNoticedBannerPostfix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n						</span>\n					</div>\n				</div>\n				<nav>\n					<span class=\"navLink c4-color\" data-bind=\"click: showPrevious\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.previous)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</span>\n					<span class=\"pageIndicators non-mobile\"\n							data-bind=\"foreach: improvements\">\n						<span data-bind=\"enhancedSvg: navIconSrc, css: {active: isActive}\">\n							\n						</span>\n					</span>\n					<span class=\"pageIndicators mobile-only\">\n						<!-- ko text: activeImprovementDisplayIdx --><!-- /ko -->\n						/\n						<!-- ko text: improvements().length --><!-- /ko -->\n					</span>\n					<span class=\"navLink c4-color\" data-bind=\"click: showNext\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.next)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</span>\n				</nav>\n			</div>\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["statusLevelTooltip"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.level)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div>"
    + escapeExpression((helper = helpers.dateFormat || (depth0 && depth0.dateFormat),options={hash:{
    'format': ("MMM D, YYYY")
  },data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options)))
    + "</div>";
  return buffer;
  });

this["coachingTools"]["stressWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"stressSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\" data-bind=\"\n						activeStatusIcon: {\n							currentScore: currentScore,\n							levels: levels\n						}\n					\"></div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: targetedContent\"></div>\n				<h3 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxToolTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateButtonLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink closeView\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.statusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<form class=\"updateForm stressToolForm\">\n				<div class=\"questionPageLeadIn\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.questionPageLeadIn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<div class=\"questionnairePage\" data-bind=\"showPage: questionPage\" data-page=\"1\">\n					<fieldset class=\"scoreInputGroup\" name=\"UpsetUnexpected\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxUpsetUnexpected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"NoControl\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxNoControl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"NervousStressed\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxNervousStressed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"Confident\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxConfident)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"GoingYourWay\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxGoingYourWay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n				</div>\n				<div class=\"questionnairePage\" data-bind=\"showPage: questionPage\" data-page=\"2\">\n					<fieldset class=\"scoreInputGroup\" name=\"CopeWithThings\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxCopeWithThings)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"ControlIrritations\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxControlIrritations)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"OnTopOfThings\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxOnTopOfThings)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"Angered\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxAngered)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n					<fieldset class=\"scoreInputGroup\" name=\"TooManyDifficulties\">\n						<div class=\"questionText\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.stressCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.relaxTooManyDifficulties)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						";
  stack1 = self.invokePartial(partials.stressAnswers, 'stressAnswers', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</fieldset>\n				</div>\n			</form>\n			<button type=\"button\" class=\"previousButton controlButton btnSmall c5-color c5-border-color\"\n					data-bind=\"visible: showPreviousButton, disable: submissionInProgress\">\n				"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.common)),stack1 == null || stack1 === false ? stack1 : stack1.back)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n			<button type=\"button\" class=\"nextButton controlButton btnSmall c5-background-color\"\n					data-bind=\"visible: showNextButton, enable: canAdvance\">\n				"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.common)),stack1 == null || stack1 === false ? stack1 : stack1.next)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n			<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\"\n					data-bind=\"visible: showSaveButton, enable: canSubmit\">\n				"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.textContent)),stack1 == null || stack1 === false ? stack1 : stack1.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n			";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

this["coachingTools"]["weightTooltip"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.weight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  if (helper = helpers.weightUnits) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.weightUnits); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n<!-- <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.bmi)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.text)),stack1 == null || stack1 === false ? stack1 : stack1.bmi)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div> -->\n<div>"
    + escapeExpression((helper = helpers.dateFormat || (depth0 && depth0.dateFormat),options={hash:{
    'format': ("MMM D, YYYY")
  },data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.date), options)))
    + "</div>\n";
  return buffer;
  });

this["coachingTools"]["weightWidget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<div data-wnpcoachingwidget data-wnptheme=\"weightSkills\" class=\"foldedCornerTopLeft\">\n	<section data-viewport=\"main\">\n		<div data-view=\"current\">\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.currentStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"feedback\">\n				<div class=\"status\">\n					<div class=\"info\">\n						<div class=\"currentData c3-color c3-border-color\">\n							<div class=\"primaryData\">\n								<div class=\"dataTitle non-mobile c5-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.currentWeight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n								<div class=\"dataNumber non-mobile\" data-bind=\"text: currentWeight() || '---'\"></div>\n								<div class=\"dataLabel non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weightUnits)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n								<div class=\"dataTitle c4-color mobile-only\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.currentWeight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n								<div class=\"dataNumber c4-color mobile-only\" data-bind=\"text: currentWeight() || '---'\"></div>\n								<div class=\"dataLabel c4-color mobile-only\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.weightUnits)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n							</div>\n							<div class=\"secondaryData c5-background-color\">\n								<div class=\"dataTitle non-mobile\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.bmi)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n								<div class=\"dataNumber non-mobile\" data-bind=\"text: currentBmi().toFixed(1)\"></div>\n								<div class=\"dataTitle c4-color mobile-only\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.bmi)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n								<div class=\"dataNumber c4-color mobile-only\" data-bind=\"text: currentBmi().toFixed(1)\"></div>\n							</div>\n						</div>\n					</div>\n				</div>\n				<div class=\"targetedContent\" data-bind=\"html: targetedContent\"></div>\n				<h3 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.yourProgressGraph)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n				";
  stack1 = self.invokePartial(partials.coachingToolLoading, 'coachingToolLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"graph\" data-bind=\"visibility: !graphIsLoading\"></div>\n			</div>\n\n			<button class=\"updateStatusButton btnSmall c5-background-color\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateButtonLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</button>\n		</div>\n\n		<div data-view=\"update\">\n			<a class=\"cancelLink closeView\" data-bind=\"visible: showCancelLink\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.cancel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n			<h2 class=\"c4-color\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.coachingTools)),stack1 == null || stack1 === false ? stack1 : stack1.updateStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":</h2>\n			<div class=\"updateStatusText\">\n				";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.statusUpdateText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"updateForm\">\n				<div class=\"newData\">\n					<label class=\"mobile-only\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.newWeightLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</label>\n					<span><input type=\"text\" data-bind=\"value: newWeight, valueUpdate: 'keyup', disable: submissionInProgress\" /></span>\n					<label class=\"non-mobile\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.newWeightLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</label>\n				</div>\n				<div class=\"newData\">\n					<label class=\"mobile-only\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.newBmiLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</label>\n					<span class=\"newDataValue\" data-bind=\"text: newBmi() ? newBmi().toFixed(1) : '&nbsp;'\"></span>\n					<label class=\"non-mobile\">\n						"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.weightCoachingTool)),stack1 == null || stack1 === false ? stack1 : stack1.newBmiLabel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n					</label>\n				</div>\n			</div>\n\n			<button type=\"button\" class=\"saveButton controlButton btnSmall c5-background-color\"\n					data-bind=\"enable: canSave\">\n				"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.common)),stack1 == null || stack1 === false ? stack1 : stack1.submit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &gt;\n			</button>\n			";
  stack1 = self.invokePartial(partials.submitLoading, 'submitLoading', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</section>\n</div>\n";
  return buffer;
  });

return this["coachingTools"];

});