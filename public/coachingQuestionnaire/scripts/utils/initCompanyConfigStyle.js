define([
	'jquery',
	'coachingQuestionnaire/scripts/utils/styleLoader',
	'coachingQuestionnaire/scripts/utils/styleRules'
], function($, styleLoader, styleRules) {
	'use strict';

	return function(customColorConfig, programName) {
		var customColorKey = programName + 'CustomColor';
		if (!$('html').hasClass('lt-ie9')) {
			styleLoader(styleRules, {
				'color-1': customColorConfig[customColorKey + '1'],
				'color-2': customColorConfig[customColorKey + '2'],
				'color-3': customColorConfig[customColorKey + '3'],
				'color-4': customColorConfig[customColorKey + '4'],
				'color-5': customColorConfig[customColorKey + '5']
			});
		}
	};
});