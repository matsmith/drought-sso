/*global define, environment*/
define('activeStatusIcon', [
	'jquery',
	'knockout',
	'utilitiesTemplates',
	'modernizr',
	'jquery-ui' // provides $.widget
], function($, ko, templates, Modernizr){
	"use strict";

	ko.bindingHandlers.activeStatusIcon = {
		update: function(element, valueAccessor, allBindings) {
			var bindings = ko.unwrap(valueAccessor());
			$(element).activeStatusIcon({
				currentScore: bindings.currentScore(),
				levels: bindings.levels
			});
		}
	};

	$.widget("wnp.activeStatusIcon", {
		options: {
			currentScore: null,
			levels: [{
					name: "level1",
					breakpoint: 1
				},{
					name: "level2",
					breakpoint: 3
				},{
					name: "level3",
					breakpoint: 5
				},{
					name: "level4",
					breakpoint: 10
			}]
		},
		_create: function() {
			this.element.append(templates.activeStatusIcon());
			this.render();
		},
		_destroy: function() {
			this._superApply(arguments);
		},
		_setOptions: function(options) {
			this._super(options);
			this.render();
		},
		render: function() {
			var self = this;
			var program = this.element.closest('[data-wnpwidget]').data('wnpwidget')
				.replace("coaching","").replace("Widget","");
			var value = this.options.currentScore;
			var activeIcon;
			//check current value and set active icon
			if(value <= this.options.levels[0].breakpoint) {
				activeIcon = this.options.levels[0].name;
			} else if(value <= this.options.levels[1].breakpoint) {
				activeIcon = this.options.levels[1].name;
			} else if(value <= this.options.levels[2].breakpoint) {
				activeIcon = this.options.levels[2].name;
			} else {
				activeIcon = this.options.levels[3].name;
			}
			var srcActive = environment.coachingMediaPath + "coaching_tool_icons/" + program + this._capitalize(activeIcon) + "_active.svg";
			this._drawIcon(this.element.find(".currentStatus"), srcActive);
			this.options.levels.forEach(function(level) {
				var srcInactive = environment.coachingMediaPath + "coaching_tool_icons/" + program + self._capitalize(level.name) + ".svg";
				var $element = self.element.find("."+level.name);
				if(level.name === activeIcon) {
					self._drawIcon($element,srcActive);
				} else {
					self._drawIcon($element,srcInactive);
				}
			});
		},
		_drawIcon: function($element,iconPath) {
			$element.children("svg, img").remove();
			if(Modernizr.svg && iconPath.indexOf(".svg") !== -1) {
				$.get(iconPath, function(data) {
					$element.children("svg").remove();
					var $svg = $(data).find("svg");
					$element.prepend($svg);
				});
			} else {
				$element.prepend("<img src='" + this._pngify(iconPath) + "'>");
			}
		},
		_pngify: function(imgSrc) {
			var parts = imgSrc.split(".");
			parts.pop();
			parts.push("png");
			return parts.join(".");
		},
		_capitalize: function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	});
});
