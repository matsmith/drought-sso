/*
 * Custom binding for Knockout to replace an svg-sourced img tag with
 * the actual svg dom element.
 */

require([
	'jquery',
	'knockout',
	'modernizr'
], function ($, ko, Modernizr) {
	"use strict";

	ko.bindingHandlers.enhancedHoverSvg = {
		update: function (element, valueAccessor) {
			//Build object and bind it to the element
			var src = ko.unwrap(valueAccessor().src);
			var hoverSrc = ko.unwrap(valueAccessor().hoverSrc);
			new EnhancedSvg(element, src, hoverSrc).doEnhancement();
		}
	};

	ko.bindingHandlers.enhancedSvg = {
		update: function (element, valueAccessor) {
			var src = ko.unwrap(valueAccessor());
			new EnhancedSvg(element, src).doEnhancement();
		}
	};

	function EnhancedSvg(element, src, hoverSrc) {
		var self = this;

		this.$element = $(element);
		this.srcSvgMarkup = null;
		this.hoverSvgMarkup = null;
		this.src = src;
		this.hoverSrc = hoverSrc;
		this.hoverActive = typeof hoverSrc !== 'undefined';


		this.getSrcSvg = function() {
			return $.get(this.src, function(data) {
				var svg = $(data).find('svg');
				self.srcSvgMarkup = svg;
			});
		};

		this.getHoverSvg = function() {
			if (this.hoverSrc) {
				return $.get(this.hoverSrc, function(data) {
					self.hoverSvgMarkup = $(data).find('svg');
				});
			}

			var noHoverDeferred = new $.Deferred();
			// Reject so that the hover event is not bound
			noHoverDeferred.reject();
			return noHoverDeferred.promise();
		};

		this.bindHoverEvent = function() {
			self.$element.unbind('mouseenter mouseleave');
			self.$element.hover(
				function() {
					self.$element.html(self.hoverSvgMarkup);
				},
				function() {
					self.$element.html(self.srcSvgMarkup);
				}
			);
		};

		this.replaceWithPngFallback = function(element) {
			var doHover = this.hoverActive;
			var outPng = this.src.replace(/svg$/,'png');
			if (doHover) {
				var inPng = this.hoverSrc.replace(/svg$/,'png');
			}
			var img = $('<img>').attr('src', outPng);
			img.load(function() {
				//after the image is there, load the event handler
				if (doHover) {
					self.$element.unbind('mouseenter mouseleave');
					self.$element.hover(
						//handler in
						function() {
							self.$element.find('img').attr('src', inPng);
						},
						//handler out
						function() {
							self.$element.find('img').attr('src', outPng);
						}
					);
				}
			});
			this.$element.html(img);
		};

		// Activate the actual enhancement behavior
		this.doEnhancement = function() {
			if (Modernizr.svg && this.src.toLowerCase().indexOf(".svg") !== -1) {
				var srcPromise = this.getSrcSvg();
				srcPromise.done(function() {
					self.$element.html(self.srcSvgMarkup);
				});

				$.when(
					srcPromise,
					this.getHoverSvg()
				).done(function() {
					// Only bind if both gets are successful
					self.bindHoverEvent();
				});
			} else {
				this.replaceWithPngFallback();
			}
		};
	}
});

