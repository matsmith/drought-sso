define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/adapters/abstract-resource-bundle-service',
		'coachingQuestionnaire/scripts/utils/errors/not-implemented-error'
	], function(
		$,
		Ember,
		ResourceBundleRetriever,
		NotImplementedError
		) {
		'use strict';

		return ResourceBundleRetriever.extend({
			stubs: false,

			_getResourceBundle: function(bundleNameList) {
				if (this.get('stubs')) {
					return this._stubGetResourceBundle(bundleNameList);
				}
				return this._liveGetResourceBundle(bundleNameList);
			},
			_stubGetResourceBundle: function(bundleNameList) {
				var _this;
				_this = this;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("/stubs/resources/" + _this.get('locale') + ".json")
						.then(function(resourceBundle) {
							resolve(resourceBundle);
						});
				});
			},
			_liveGetResourceBundle: function() {
				return this.get('servicesManager').executeRequest('resourcebundle', {
					q: 'findByBundleNameAndLocale',
					bundleName: ['questionnaire','upgradePath'],
					locale: this.get('locale')
				});
			}
		}).create();
	}
);
