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
			getCompanyConfig: function() {
				var debugLogging;
				debugLogging = this.debugLogging;
				if (debugLogging) {
					console.log("/companyConfigService Get company configuration for locale",
						this.get('locale'));
				}
				return this._getCompanyConfig()
					.then(function(response) {
						var i, iMax, j, jMax, featureAttribute, featureContent,
							feature, currentFeature, featureList;
						featureList = response.companyConfigResponse.featureList;
						featureContent = {};
						for (i = 0, iMax = featureList.length; i < iMax; i++) {
							feature = featureList[i];
							currentFeature = {};
							featureContent[feature.name] = currentFeature;
							if (feature.featureAttributeList) {
								for (j = 0, jMax = feature.featureAttributeList.length; j < jMax; j++) {
									featureAttribute = feature.featureAttributeList[j];
									currentFeature[featureAttribute.name] = featureAttribute.value;
								}
							}
						}
						return featureContent;
					});
			},
			// Abstract protected methods
			_getCompanyConfig: function() {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_getCompanyConfig"
				});
			}
		});
	}
);
