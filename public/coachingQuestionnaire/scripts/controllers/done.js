define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/utils/loading-widget'
	], function(
		$,
		Ember,
		loadingWidget
		) {
		'use strict';

		return Ember.ObjectController.extend({
			init: function() {
				loadingWidget.get('widget').destroy();
				$("#ember-app").css('display','none');
			}
		});
	}
);
