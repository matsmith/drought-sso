/*global define*/
/*
export provides
	$.skillIcon
	ko skillIcon binding
 */
define('skillIcon', [
	'jquery',
	'knockout',
	'modernizr',
	'jquery-ui' // import provides $.widget
], function($, ko, Modernizr){
	"use strict";

	var DEFAULT_PRIMARY_COLOR = "#505a5b";
	var DEFAULT_ACTIVE_COLOR = "#cbcbcb";
	ko.bindingHandlers.skillIcon = {
		update: function(element, valueAccessor, allBindingsAccessor) {

			var bindings = ko.unwrap(valueAccessor());
			$(element).skillIcon({
				iconPath: bindings.icon && bindings.icon() || "",
				numActive: bindings.active && bindings.active() || 0,
				numCompleted: bindings.completed && bindings.completed() || 0,
				primaryColor: bindings.primaryColor && bindings.primaryColor() || DEFAULT_PRIMARY_COLOR,
				activeColor: bindings.activeColor && bindings.activeColor() || DEFAULT_ACTIVE_COLOR,
				size: bindings.size || 100
			});
		}
	};

	$.widget("wnp.skillIcon", {
		options: {
			numActive: null,
			numCompleted: null,
			iconPath: "",
			primaryColor: DEFAULT_PRIMARY_COLOR,
			activeColor: DEFAULT_ACTIVE_COLOR,
			strokeWidth: 5,
			size: 100
		},
		_create: function() {
			this.element.addClass("skillIcon");

			this.canvas = $("<canvas>")[0];
			this.element.append(this.canvas);
			this.canvas.setAttribute("width", this.options.size);
			this.canvas.setAttribute("height", this.options.size);

			if (this.canvas.getContext) {
				this.render();
			} else {
				this._drawIcon();
			}
		},
		_setOptions: function(options) {
			this._super(options);
			this.render();
		},
		render: function() {
			this.ctx = this.canvas.getContext('2d');
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

			this._drawSegmentedCircle();
			this._drawIcon();
		},
		_drawSegmentedCircle: function() {
			var self = this;
			var centerX = this.canvas.width / 2;
			var centerY = this.canvas.height / 2;

			var segments = this._generateSegments(this.options.numActive,
				this.options.numCompleted);

			var GUTTER_WIDTH = Math.PI / 28;
			var sectionLength = this._getSectionSize(segments.length, GUTTER_WIDTH);
			var startAngle = GUTTER_WIDTH / 2;
			this.ctx.lineWidth = this.options.strokeWidth;

			segments.forEach(function(segment) {
				var endAngle = startAngle + sectionLength;

				self.ctx.beginPath();
				self.ctx.arc(centerX, centerY, self._getCircleRadius(), startAngle, endAngle);
				self.ctx.strokeStyle = segment.color;
				self.ctx.stroke();

				startAngle = endAngle + GUTTER_WIDTH;
			});
		},
		_generateSegments: function(numActive, numCompleted) {
			var segments = [];

			for ( ; numCompleted > 0; numCompleted--) {
				segments.push({ color: this.options.primaryColor });
			}
			for ( ; numActive > 0; numActive--) {
				segments.push({ color: this.options.activeColor });
			}

			if (!segments.length) {
				segments.push({ color: this.options.activeColor });
			}
			return segments;
		},
		_getSectionSize: function(numSections, gutterWidth) {
			if (numSections <= 1) {
				return 2 * Math.PI;
			}
			return ((2 * Math.PI) - (numSections * gutterWidth)) / numSections;
		},
		_getCircleRadius: function() {
			return (this.canvas.height - this.options.strokeWidth) / 2;
		},
		_drawIcon: function() {
			var self = this;

			self.element.children("svg, img").remove();
			if(Modernizr.svg && this.options.iconPath.indexOf(".svg") !== -1) {
				$.get(this.options.iconPath, function(data) {
					self.element.children("svg").remove();
					var $svg = $(data).find("svg");
					self.element.prepend($svg);
					// TODO: make sure svg files have viewBox, and classes
				});
			} else {
				this.element.prepend("<img src='" + this._pngify(this.options.iconPath) + "'>");
			}
		},
		_pngify: function(imgSrc) {
			var parts = imgSrc.split(".");
			parts.pop();
			parts.push("png");
			return parts.join(".");
		}
	});

});
