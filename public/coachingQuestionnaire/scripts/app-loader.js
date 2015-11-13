define(function(require) {
	'use strict';

	return function(options, callback) {
		var WnpFullScreenSpinnerWidget = require('fullScreenSpinner');
		var $ = require('jquery');
		var loadingWidget = require('coachingQuestionnaire/scripts/utils/loading-widget');
		loadingWidget.set('widget', new WnpFullScreenSpinnerWidget(
			$('<div>').appendTo('body'), {
				config: options.config
			}
		));
		var widgetOptions = require('coachingQuestionnaire/scripts/utils/widget-options');
		widgetOptions.set('options', options);
		var Ember = require('ember');
		var I18n = require('ember-i18n');

		var resourceBundleService = require('coachingQuestionnaire/scripts/adapters/configurable-resource-bundle-service');
		var companyConfigService = require('coachingQuestionnaire/scripts/adapters/configurable-company-config-service');

		Ember.Application.initializer({
			name: 'program-name',

			initialize: function(container, application) {
				container.lookup('route:index').set('programName', options.programName);
			}
		});

		var App = require('coachingQuestionnaire/scripts/app');
		App.deferReadiness();

		var servicesManager = require('coachingQuestionnaire/scripts/utils/services-manager-instance');
		servicesManager.set('authToken', options.config.authToken);
		servicesManager.set('authType', options.config.authTokenType);
		servicesManager.set('correlationId', options.config.wnpSessionId);
		servicesManager.set('refreshToken', options.config.refreshToken);
		servicesManager.set('refreshAuthHeader', options.config.refreshAuthHeader);

		resourceBundleService.set('stubs', options.config.stubs &&
			(options.config.stubs === true || options.config.stubs.resourceBundle));
		resourceBundleService.set('locale', options.config.locale);
		resourceBundleService.set('debugLogging', options.config.debug);
		resourceBundleService.set('servicesManager', servicesManager);

		companyConfigService.set('stubs', options.config.stubs &&
			(options.config.stubs === true || options.config.stubs.resourceBundle));
		companyConfigService.set('locale', options.config.locale);
		companyConfigService.set('debugLogging', options.config.debug);
		companyConfigService.set('servicesManager', servicesManager);

		Ember.RSVP.Promise.all([
			resourceBundleService.resourceBundleRetriever(["questionnaire"]),
			companyConfigService.getCompanyConfig()
		]).then(function(responses) {
			var availableProductsService, questionnaireService,
				userProfileService, resourceContent, companyConfigResponse;

			resourceContent = responses[0];
			companyConfigResponse = responses[1];

			I18n.translations = resourceContent;
			//upgrade path message can be company specific
			I18n.translations.upgradePath.programUpgradePathMessage = I18n.translations.upgradePath[options.programName+'UpgradeMessage'] || '';

			var companyConfig = require('coachingQuestionnaire/scripts/utils/company-config');
			companyConfig.set('features', companyConfigResponse);

			var initCompanyConfigStyle = require('coachingQuestionnaire/scripts/utils/initCompanyConfigStyle');
			initCompanyConfigStyle(companyConfigResponse.PrivateLabelCustomColor,
					options.programName);

			availableProductsService = require('coachingQuestionnaire/scripts/adapters/configurable-available-products-service');
			availableProductsService.set('servicesManager', servicesManager);
			availableProductsService.set('debugLogging', options.config.debug);
			availableProductsService.set('stubs', options.config.stubs &&
				(options.config.stubs === true || options.config.stubs.availableProducts));
			questionnaireService = require('coachingQuestionnaire/scripts/adapters/configurable-questionnaire-service');
			questionnaireService.set('debugLogging', options.config.debug);
			questionnaireService.set('servicesManager', servicesManager);
			questionnaireService.set('locale', options.config.locale);
			questionnaireService.set('programName', options.programName);
			questionnaireService.set('stubs', options.config.stubs &&
				(options.config.stubs === true || options.config.stubs.questionnaire));
			userProfileService = require('coachingQuestionnaire/scripts/adapters/configurable-user-profile-service');
			userProfileService.set('debugLogging', options.config.debug);
			userProfileService.set('servicesManager', servicesManager);
			userProfileService.set('stubs', options.config.stubs &&
				(options.config.stubs === true || options.config.stubs.userProfile));

			App.advanceReadiness();
			callback(App);
		});
	};
});
