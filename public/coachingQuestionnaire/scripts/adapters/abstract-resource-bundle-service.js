define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/utils/errors/not-implemented-error'
	], function(
		$,
		Ember,
		NotImplementedError
	) {
		'use strict';

		return Ember.Object.extend({
			debugLogging: false,
			locale: null,
			resourceBundleRetriever: function(bundleNameList) {
				var debugLogging;
				debugLogging = this.debugLogging;
				if (debugLogging) {
					console.log("/resourceBundleRetriever Get Content for Locale",
						this.get('locale'), "and bundleNames", bundleNameList);
				}
				return this._getResourceBundle(bundleNameList)
					.then(function(response) {
						var i, iMax, j, jMax, contentValue, resourceContent,
							resourceBundle, currentBundle, resourceBundleList;
						resourceBundleList = response.resourceBundleResponse.resourceBundle;
						resourceContent = {};
						for (i = 0, iMax = resourceBundleList.length; i < iMax; i++) {
							resourceBundle = resourceBundleList[i];
							currentBundle = {};
							resourceContent[resourceBundle.name] = currentBundle;
							for (j = 0, jMax = resourceBundle.contentValues.length; j < jMax; j++) {
								contentValue = resourceBundle.contentValues[j];
								currentBundle[contentValue.contentKey] = contentValue.content;
							}
						}
						return resourceContent;
					});
			},
			// Abstract protected methods
			_getResourceBundle: function(bundleNameList) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_getResourceBundle"
				});
			}
		});
	}
);
