define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/adapters/abstract-company-config-service',
		'coachingQuestionnaire/scripts/utils/errors/not-implemented-error'
	], function(
		$,
		Ember,
		AbstractCompanyConfigService,
		NotImplementedError
		) {
		'use strict';

		return AbstractCompanyConfigService.extend({
			stubs: false,

			_getCompanyConfig: function() {
				if (this.get('stubs')) {
					return this._stubGetCompanyConfig();
				}
				return this._liveGetCompanyConfig();
			},
			_stubGetCompanyConfig: function() {
				var _this;
				_this = this;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("/stubs/companyConfig/company_config.json")
						.then(function(companyConfig) {
							resolve(companyConfig);
						});
				});
			},
			_liveGetCompanyConfig: function() {
				return this.get('servicesManager').executeRequest('companyconfig', {
					locale: this.get('locale')
				});
			}
		}).create();
	}
);
