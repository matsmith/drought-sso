define(function(require) {
  'use strict';

  var Ember = require('ember');

  Ember.Application.initializer({
    name: "registerDependencies",
    initialize: function( container, application ) {
      application.register( 'window:size-manager', require('coachingQuestionnaire/scripts/utils/window-manager'));
      application.register( 'window:browser-manager', require('coachingQuestionnaire/scripts/utils/browser-manager'));
    }
  });

  Ember.Application.initializer({
    name: "injectDependencies",
    after: "registerDependencies",
    initialize: function(container, application) {
      application.inject("controller", "windowManager", 'window:size-manager');
      application.inject("view", "windowManager", 'window:size-manager');
      application.inject("component", "windowManager", 'window:size-manager');
      application.inject("controller", "browserManager", 'window:browser-manager');
      application.inject("view", "browserManager", 'window:browser-manager');
      application.inject("component", "browserManager", 'window:browser-manager');
    }
  });

  require('consoleCompatibility');
  require('coachingQuestionnaire/scripts/compiledTemplates/application');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/answer-state');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/bumper-base');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/checkbox-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/dropdown-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/dropdown-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/global-error-dialog-message');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/likert-answer-state');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/likert-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/likert-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/modal-dialog');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/earmark-modal-dialog');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/multi-answer-state');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/dropdown-and-number-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/multi-dropdown-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/question-back-button');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/loading-spinner');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/number-input-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/number-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/numbers-and-radios-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/bloodpressure-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/question-wrapper');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/questionnaire-complete');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/questionnaire-landing-dialog-message');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/quit-tailored-text');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/radio-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/open-text-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/text-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/date-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/date-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/saved-on-date');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/save-error-dialog-message');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/section-nav-item');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/section-nav');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/slider-base');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/slider-question');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/slider-input');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/submit-button');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/tailored-text');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/unanswered-state');
  require('coachingQuestionnaire/scripts/compiledTemplates/components/unknown-content');
  require('coachingQuestionnaire/scripts/compiledTemplates/save-error-dialog');
  require('coachingQuestionnaire/scripts/compiledTemplates/error');
  require('coachingQuestionnaire/scripts/compiledTemplates/index');
  require('coachingQuestionnaire/scripts/compiledTemplates/plan');
  require('coachingQuestionnaire/scripts/compiledTemplates/questionnaire-landing-dialog');
  require('coachingQuestionnaire/scripts/compiledTemplates/questionnaire');

  var AppInstance;
  AppInstance = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    rootElement: '#ember-app',
    Resolver: Ember.DefaultResolver.extend({
      resolveTemplate: function(object) {
        var templateModule;
        try {
          templateModule = require('coachingQuestionnaire/scripts/compiledTemplates/' + object.name);
        } catch(error) {
          // IGNORE
        }
        return templateModule;
      }
    })
  });

  require('coachingQuestionnaire/scripts/router')(AppInstance);

  AppInstance.Router.reopen({
    location: 'none'
  });

  // HELPERS
  Ember.Handlebars.registerHelper("renderQuestionComponent", require('coachingQuestionnaire/scripts/helpers/render-question-component'));
  Ember.Handlebars.registerHelper("renderChildQuestionComponent", require('coachingQuestionnaire/scripts/helpers/render-child-question-component'));
  Ember.Handlebars.registerHelper("renderAnswerState", require('coachingQuestionnaire/scripts/helpers/render-answer-state'));
  Ember.Handlebars.registerHelper("renderImage", require('coachingQuestionnaire/scripts/helpers/render-image'));
  Ember.Handlebars.registerBoundHelper("renderSafeString", require('coachingQuestionnaire/scripts/helpers/render-safe-string'));

  //VIEWS
  AppInstance.ApplicationView = require('coachingQuestionnaire/scripts/views/application');

  //COMPONENTS
  AppInstance.SliderBaseComponent = require('coachingQuestionnaire/scripts/components/slider-base');
  AppInstance.SectionNavItemComponent = require('coachingQuestionnaire/scripts/components/section-nav-item');
  AppInstance.SectionNavComponent = require('coachingQuestionnaire/scripts/components/section-nav');
  AppInstance.LoadingSpinnerComponent = require('coachingQuestionnaire/scripts/components/loading-spinner');
  AppInstance.QuestionWrapperComponent = require('coachingQuestionnaire/scripts/components/question-wrapper');
  AppInstance.QuestionBaseComponent = require('coachingQuestionnaire/scripts/components/abstract-question-base');
  AppInstance.CheckboxQuestionComponent = require('coachingQuestionnaire/scripts/components/checkbox-question');
  AppInstance.NumberInputQuestionComponent = require('coachingQuestionnaire/scripts/components/number-input-question');
  AppInstance.NumbersAndRadiosQuestionComponent = require('coachingQuestionnaire/scripts/components/numbers-and-radios-question');
  AppInstance.BloodpressureQuestionComponent = require('coachingQuestionnaire/scripts/components/bloodpressure-question');
  AppInstance.RadioQuestionComponent = require('coachingQuestionnaire/scripts/components/radio-question');
  AppInstance.OpenTextQuestionComponent = require('coachingQuestionnaire/scripts/components/open-text-question');
  AppInstance.DateQuestionComponent = require('coachingQuestionnaire/scripts/components/date-question');
  AppInstance.DropdownQuestionComponent = require('coachingQuestionnaire/scripts/components/dropdown-question');
  AppInstance.AbstractMultiInputQuestionComponent = require('coachingQuestionnaire/scripts/components/abstract-multi-input-question');
  AppInstance.MultiDropdownQuestionComponent = require('coachingQuestionnaire/scripts/components/multi-dropdown-question');
  AppInstance.DropdownAndNumberQuestionComponent = require('coachingQuestionnaire/scripts/components/dropdown-and-number-question');
  AppInstance.SliderQuestionComponent = require('coachingQuestionnaire/scripts/components/slider-question');
  AppInstance.LikertQuestionComponent = require('coachingQuestionnaire/scripts/components/likert-question');
  AppInstance.QuitTailoredTextComponent = require('coachingQuestionnaire/scripts/components/quit-tailored-text');
  AppInstance.QuestionnaireCompleteComponent = require('coachingQuestionnaire/scripts/components/questionnaire-complete');
  AppInstance.BumperBaseComponent = require('coachingQuestionnaire/scripts/components/bumper-base');
  AppInstance.TailoredTextComponent = require('coachingQuestionnaire/scripts/components/tailored-text');

  AppInstance.DropdownInputComponent = require('coachingQuestionnaire/scripts/components/dropdown-input');
  AppInstance.NumberInputComponent = require('coachingQuestionnaire/scripts/components/number-input');
  AppInstance.TextInputComponent = require('coachingQuestionnaire/scripts/components/text-input');
  AppInstance.DateInputComponent = require('coachingQuestionnaire/scripts/components/date-input');
  AppInstance.LikertInputComponent = require('coachingQuestionnaire/scripts/components/likert-input');
  AppInstance.SliderInputComponent = require('coachingQuestionnaire/scripts/components/slider-input');
  AppInstance.SubmitButtonComponent = require('coachingQuestionnaire/scripts/components/submit-button');
  AppInstance.QuestionBackButtonComponent = require('coachingQuestionnaire/scripts/components/question-back-button');

  AppInstance.AnswerStateComponent = require('coachingQuestionnaire/scripts/components/answer-state');
  AppInstance.LikertAnswerStateComponent = require('coachingQuestionnaire/scripts/components/likert-answer-state');
  AppInstance.MultiAnswerStateComponent = require('coachingQuestionnaire/scripts/components/multi-answer-state');
  AppInstance.UnansweredStateComponent = require('coachingQuestionnaire/scripts/components/unanswered-state');

  AppInstance.ModalDialogComponent = require('coachingQuestionnaire/scripts/components/modal-dialog');
  AppInstance.EarmarkModalDialogComponent = require('coachingQuestionnaire/scripts/components/modal-dialog');
  AppInstance.QuestionnaireLandingDialogMessageComponent = require('coachingQuestionnaire/scripts/components/questionnaire-landing-dialog-message');
  AppInstance.ErrorDialogMessageComponent = require('coachingQuestionnaire/scripts/components/error-dialog-message');
  AppInstance.GlobalErrorDialogMessageComponent = require('coachingQuestionnaire/scripts/components/global-error-dialog-message');
  AppInstance.SaveErrorDialogMessageComponent = require('coachingQuestionnaire/scripts/components/save-error-dialog-message');

  AppInstance.UnknownContentComponent = require('coachingQuestionnaire/scripts/components/unknown-content');

  //CONTROLLERS
  AppInstance.ErrorDialogController = require('coachingQuestionnaire/scripts/controllers/error-dialog');
  AppInstance.SaveErrorDialogController = require('coachingQuestionnaire/scripts/controllers/save-error-dialog');
  AppInstance.QuestionnaireController = require('coachingQuestionnaire/scripts/controllers/questionnaire');
  AppInstance.PlanController = require('coachingQuestionnaire/scripts/controllers/plan');
  AppInstance.QuestionnaireLandingDialogController = require('coachingQuestionnaire/scripts/controllers/questionnaire-landing-dialog');
  AppInstance.DoneController = require('coachingQuestionnaire/scripts/controllers/done');

  Ember.Object.reopen({
    doesExist : function(value){
      return (value !== null && typeof(value) !== "undefined" && value !== "");
    }
  });

  return AppInstance;
});
