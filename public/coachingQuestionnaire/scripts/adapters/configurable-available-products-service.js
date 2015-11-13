define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/adapters/abstract-available-products-service'
	], function(
		$,
		Ember,
		AbstractAvailableProductsService
		) {
		'use strict';

		return AbstractAvailableProductsService.extend({
			// stub service properties
			testTimeout: null,
			availableProductError: null,
			// live service properties
			servicesManager: null,

			stubs: false,

			_getAvailableProduct: function(productName) {
				if (this.get('stubs')) {
					return this._stubGetAvailableProduct(productName);
				}
				return this._liveGetAvailableProduct(productName);
			},
			_stubGetAvailableProduct: function(productName) {
				var _this = this;
				var testTimeout, availableProductError;
				testTimeout = this.testTimeout || 0;
				availableProductError = this.get('availableProductError');
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("/stubs/questionnaire/" +
							_this.get('servicesManager').get('authToken') +
							"/available_product.json"
					).then(function(productList) {
						setTimeout(function() {
							if (availableProductError) {
								reject(availableProductError);
							} else {
								resolve(productList);
							}
						}, testTimeout);
					});
				});
			},
			_liveGetAvailableProduct: function(productName) {
				return this.get('servicesManager').executeRequest('availableproducts', {
					'q': 'findByProduct-includeMatchedSurveyProductStatus',
					'product': productName
				});
			}
		}).create({
			availableProductError: null
		});
	}
);
