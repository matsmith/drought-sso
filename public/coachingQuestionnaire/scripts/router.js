define(function(require) {
  'use strict';

  return function(AppInstance) {
    AppInstance.Router.map(function() {
      this.route("questionnaire", { path: "questionnaire/:questionnaireId" });
      this.route("plan", { path: "plan" });
      this.route("done");
    });

    AppInstance.ApplicationRoute = require('coachingQuestionnaire/scripts/routes/application');
    AppInstance.IndexRoute = require('coachingQuestionnaire/scripts/routes/index');
    AppInstance.QuestionnaireRoute = require('coachingQuestionnaire/scripts/routes/questionnaire');
    AppInstance.PlanRoute = require('coachingQuestionnaire/scripts/routes/plan');
  };
});
