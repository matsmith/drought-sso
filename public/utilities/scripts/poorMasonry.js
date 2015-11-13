/*global define*/
define('poorMasonry', [
	'jquery',
	'knockout',
	'onWindowResize'
], function($, ko, onWindowResize){
	"use strict";

	ko.bindingHandlers.poorMasonry = {
		init: function(element, valueAccessor) {
			setTimeout(function(){
				var targetSelector = ko.unwrap(valueAccessor());
				var $targets = $(element).children();
				if (targetSelector) {
					$targets = $(element).find(targetSelector);
				}
				equalizeHeights($targets);
				onWindowResize(function() {
					equalizeHeights($targets);
				});
			},0);
		}
	};

	function equalizeHeights($targets) {
		var maxHeight = 0;
		$targets.height('auto')
			.each(function() {
				var height = $(this).outerHeight();
				maxHeight = Math.max(height, maxHeight);
			});

		$targets.height(maxHeight);
	}

	return {
		equalizeHeights: equalizeHeights
	};
});



