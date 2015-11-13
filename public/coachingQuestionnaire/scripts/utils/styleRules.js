define(function(require) {
	'use strict';

	return {
		// Color classes
		'.font-color-3': {
			'color': '{{color-3}} !important'
		},
		'.font-color-4': {
			'color': '{{color-4}} !important'
		},
		'.font-color-5': {
			'color': '{{color-5}} !important'
		},
		'.fill-path-color-1 path': {
			'fill': '{{color-1}} !important'
		},
		'.fill-path-color-2 path': {//sometimes filling the stuff above the path just makes a solid object, instead of showing detail
			'fill': '{{color-2}} !important'
		},
		'.fill-path-color-3 path': {
			'fill': '{{color-3}} !important'
		},
		'.fill-path-color-4 path': {
			'fill': '{{color-4}} !important'
		},
		'.fill-path-color-5 path': {
			'fill': '{{color-5}} !important'
		},
		'.border-color-3': {
				'border-color': '{{color-3}} !important'
		},
		'.border-color-4': {
				'border-color': '{{color-4}} !important'
		},
		'.border-color-5': {
				'border-color': '{{color-5}} !important'
		},
		'.fill-color-3, .fill-color-3 polygon, .fill-color-3 circle, .fill-color-3 path': {
			'fill': '{{color-3}} !important'
		},
		'.fill-color-4, .fill-color-4 polygon, .fill-color-4 circle, .fill-color-4 path': {
			'fill': '{{color-4}} !important'
		},
		'.fill-color-5, .fill-color-5 polygon, .fill-color-5 circle, .fill-color-5 path': {
			'fill': '{{color-5}} !important'
		},
		'.stroke-color-3, .stroke-color-3 polygon, .stroke-color-3 circle': {
			'stroke': '{{color-3}} !important'
		},
		'.stroke-color-4, .stroke-color-4 polygon, .stroke-color-4 circle': {
			'stroke': '{{color-4}} !important'
		},
		'.stroke-color-5, .stroke-color-5 polygon, .stroke-color-5 circle': {
			'stroke': '{{color-5}} !important'
		},
		'.background-color-3': {
			'background-color': '{{color-3}} !important'
		},
		'.background-color-4': {
			'background-color': '{{color-4}} !important'
		},
		'.background-color-5': {
			'background-color': '{{color-5}} !important'
		},
		'.foldedCornerTopLeft:after': {
			'border-bottom-color': '{{color-3}} !important'
		},
		'.shadedCornerTopLeft:after': {
			'border-left-color': '{{color-3}} !important'
		},

		// Custom CSS
		'.section-navigation-item.selected': {
			'background-color': '{{color-3}} !important'
		},
		'.answer-outer-wrapper': {
			'background-color': '{{color-3}} !important'
		},
		'.checkbox .question-outer-wrapper li:active': {
			'background-color': '{{color-3}} !important'
		},
		'.checkbox .question-outer-wrapper li:active p': {
			'color': '{{color-5}} !important'
		},
		'.checkbox .question-outer-wrapper li.selected p': {
			'color': '{{color-4}} !important'
		},
		'.slider-question-handle.active': {
			'border-color': '{{color-3}} !important'
		},
		'.slider-question-handle.has-answer': {
			'border-color': '{{color-3}} !important'
		},
		'.dropdown-value-wrapper.answered': {
			'border-color': '{{color-3}} !important'
		},
		'.dropdown-value-wrapper.answered .dropdown-input-button': {
			'border-color': '{{color-3}} !important',
			'color': '{{color-3}} !important'
		},
		'input.has-input': {
			'border-color': '{{color-3}} !important'
		}
	};
});
