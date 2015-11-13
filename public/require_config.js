require.config({
	paths: {"slimScroll":"/vendor/slimScroll/jquery.slimscroll","jquery-ui":"/vendor/jquery-ui/ui/jquery-ui","knockout":"/vendor/knockout/dist/knockout","knockout-mapping":"/vendor/knockout-mapping/knockout.mapping","moment":"/vendor/moment/min/moment.min","momentTimezone":"/vendor/moment-timezone/builds/moment-timezone-with-data.min","modernizr":"/vendor/modernizr/modernizr","es5-shim":"/vendor/es5-shim/es5-shim","googleAnalytics":"/vendor/springload-analytics/analytics","handlebars":"/vendor/handlebars/handlebars","ember":"/vendor/ember/ember","ember-i18n":"/vendor/ember-i18n/lib/i18n","excanvas":"/vendor/flot/excanvas","file-saver":"/vendor/file-saver.js/FileSaver","flot":"/vendor/flot/jquery.flot","flot-fillbetween":"/vendor/flot/jquery.flot.fillbetween","flot-time":"/vendor/flot/jquery.flot.time","raphael":"/vendor/raphael/raphael","soundjs":"/vendor/createjs-soundjs/lib/soundjs-0.6.1.min","transit":"/vendor/jquery.transit/jquery.transit","svg-morpheus":"/vendor/svg-morpheus/compile/minified/svg-morpheus","coachingQuestionnaireTemplates":"/coachingQuestionnaire/scripts/compiledTemplates","questionnaire":"/coachingQuestionnaire/scripts/app-loader","utilitiesTemplates":"/utilities/scripts/compiledTemplates","consoleCompatibility":"/utilities/scripts/consoleCompatibility","jquery":"/utilities/scripts/jqueryNoConflict/jqueryNoConflict","onWindowResize":"/utilities/scripts/onWindowResize","activeStatusIcon":"/utilities/scripts/activeStatusIcon","colorUtils":"/utilities/scripts/colorUtils","deepFreeze":"/utilities/scripts/deepFreeze","analytics":"/utilities/scripts/analytics","enhancedSvg":"/utilities/scripts/enhancedSvg","errorModal":"/utilities/scripts/errorModal","fullScreenSpinner":"/utilities/scripts/fullScreenSpinner","handlebarsHelpers":"/utilities/scripts/handlebarsHelpers","initializeSlimScroll":"/utilities/scripts/initializeSlimScroll","isTouchClick":"/utilities/scripts/isTouchClick","loaderSpinner":"/utilities/scripts/loaderSpinner","modal":"/utilities/scripts/modal","modernizrBackfaceOutlier":"/utilities/scripts/modernizrBackfaceOutlier","modernizrCsscalc":"/utilities/scripts/modernizrCsscalc","modernizrNthChild":"/utilities/scripts/modernizrNthChild","modernizrisInternetExplorer":"/utilities/scripts/modernizrisInternetExplorer","moreExpando":"/utilities/scripts/moreExpando","poorMasonry":"/utilities/scripts/poorMasonry","skillIcon":"/utilities/scripts/skillIcon","skillsAndActionStepsTemplates":"/skillsAndActionSteps/scripts/compiledTemplates","skillsAndActionSteps":"/skillsAndActionSteps/scripts/skillsAndActionSteps","baseWidget":"/baseWidget/scripts/baseWidget","wnpServices":"/services/scripts/services","actionItemService":"/services/scripts/actionItemService","actionStepService":"/services/scripts/actionStepService","authorizationCodeService":"/services/scripts/authorizationCodeService","authorizationService":"/services/scripts/authorizationService","authorizedProductService":"/services/scripts/authorizedProductService","availableProductsService":"/services/scripts/availableProductsService","baseService":"/services/scripts/baseService","companyChildHierarchyService":"/services/scripts/companyChildHierarchyService","companyConfigService":"/services/scripts/companyConfigService","companyFeatureService":"/services/scripts/companyFeatureService","companyParentHierarchyService":"/services/scripts/companyParentHierarchyService","companyService":"/services/scripts/companyService","consultationSectionStatusService":"/services/scripts/consultationSectionStatusService","consultationService":"/services/scripts/consultationService","consultationStatusService":"/services/scripts/consultationStatusService","enrollmentService":"/services/scripts/enrollmentService","featureCategoryService":"/services/scripts/featureCategoryService","featureService":"/services/scripts/featureService","presentationService":"/services/scripts/presentationService","saveToPdfService":"/services/scripts/saveToPdfService","userCertificateService":"/services/scripts/userCertificateService","userDataService":"/services/scripts/userDataService","userMessageService":"/services/scripts/userMessageService","userNotificationService":"/services/scripts/userNotificationService","userProfileService":"/services/scripts/userProfileService","sleepToolDataService":"/services/scripts/sleepToolDataService","userSleepDataService":"/services/scripts/userSleepDataService","widgetConfigService":"/services/scripts/widgetConfigService","userState":"/services/scripts/userState","toolFeedbackService":"/services/scripts/toolFeedbackService","serviceCache":"/services/scripts/serviceCache","resourceBundleService":"/services/scripts/resourceBundleService","skillPlanService":"/services/scripts/skillPlanService","skillService":"/services/scripts/skillService","ampCompanyFeatureService":"/services/scripts/ampCompanyFeatureService","skillBaseTemplates":"/skillBase/scripts/compiledTemplates","skillBase":"/skillBase/scripts/actionStepCompletionOverlay","skillModelFactory":"/skillBase/scripts/models/skillModelFactory","actionStepCompletionOverlay":"/skillBase/scripts/actionStepCompletionOverlay","SkillModel":"/skillBase/scripts/models/skillModel","skillDetailTemplates":"/skillDetail/scripts/compiledTemplates","skillDetail":"/skillDetail/scripts/skillDetail","SkillDetailViewModel":"/skillDetail/scripts/models/SkillDetailViewModel","coachingToolsTemplates":"/coachingTools/scripts/compiledTemplates","actionStepMessagingAreaWidget":"/coachingTools/scripts/actionStepMessagingAreaWidget","coachingChronicConditionWidget":"/coachingTools/scripts/chronicConditionWidget","coachingDepressionWidget":"/coachingTools/scripts/depressionWidget","coachingSleepTrackerWidget":"/coachingTools/scripts/sleepTrackerWidget","coachingDiabetesWidget":"/coachingTools/scripts/diabetesWidget","coachingPhysicalActivityWidget":"/coachingTools/scripts/physicalActivityWidget","coachingSmokingCessationWidget":"/coachingTools/scripts/smokingCessationWidget","coachingStressWidget":"/coachingTools/scripts/stressWidget","coachingWeightWidget":"/coachingTools/scripts/weightWidget","flotTimelineHelper":"/coachingTools/scripts/flotTimelineHelper","koCustomBindings":"/coachingTools/scripts/koCustomBindings","timeseries":"/coachingTools/scripts/timeseries","headerNavigationBarTemplates":"/headerNavigationBar/scripts/compiledTemplates","headerNavigationBar":"/headerNavigationBar/scripts/headerNavigationBar","notificationToastWidgetTemplates":"/notificationToastWidget/scripts/compiledTemplates","notificationToastWidget":"/notificationToastWidget/scripts/notificationToastWidget"},
	shim: {
		'handlebars': {
			exports: 'Handlebars'
		},
		'modernizr': {
			exports: 'Modernizr'
		},
		'moment': {
			exports: 'moment'
		},
		"ember": {
			"deps": ["handlebars", "jquery"],
			"exports": "Ember"
		},
		"ember-i18n": {
			"deps": ["ember"],
			"exports": "Ember.I18n"
		},
		"transit": {
			"deps": ["jquery"],
			"exports": "$WNP.transit"
		},
		"flot": {
			"deps": ["jquery", "excanvas"],
			"exports": "$WNP.plot"
		},
		"flot-time": {
			"deps": ["flot"]
		},
		"flot-fillbetween": {
			"deps": ["flot"]
		},
		"slimScroll": {
		  "deps": ["jquery"]
		},
		"baseWidget": {
		  "deps": ["consoleCompatibility"]
		},
		"qunit": {
			"exports": "QUnit",
			"init": function() {
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		},
		"googleAnalytics": {
			exports: 'GA'
		}
	}
});
