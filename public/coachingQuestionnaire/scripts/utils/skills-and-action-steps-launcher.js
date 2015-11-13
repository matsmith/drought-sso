define([
		'skillsAndActionSteps',
		'coachingQuestionnaire/scripts/utils/widget-options'
	], function(
		WnpSkillsAndActionStepsWidget,
		widgetOptions
	) {
		'use strict';

		return function launchSkillsAndActionSteps() {
			var options = widgetOptions.get('options');

			window.skillsAndActionStepsWidget =
				new WnpSkillsAndActionStepsWidget("#widgetTarget", {
					config: options.config,
					programName: options.programName,
					refreshOnClose: true
				});
		};
	}
);