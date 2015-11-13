define([
		'ember',
		'jquery',
		'headerNavigationBar'
	], function(
		Ember,
		$,
		HeaderNavigationBar
	) {
		'use strict';

		var headerNavigationBar;

		return Ember.View.extend({
			classNames: ['questionnaireApplicationView', 'questionnaire'],
			didInsertElement: function () {
				headerNavigationBar = new HeaderNavigationBar(
					'#headerNavigationBar',
					{
						config: window.WNP.sharedServicesConfig
					}
				);
			}
		});
	}
);
