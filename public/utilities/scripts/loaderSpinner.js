/*global define, environment*/
define('loaderSpinner', [
	'jquery',
	'knockout',
	'modernizr'
], function($, ko, Modernizr){
	"use strict";

	ko.bindingHandlers.loader = {
		init: function(element, valueAccessor, allBindingsAccessor) {
			var options = ko.unwrap(valueAccessor());
			if(!ko.isObservable(options.isVisible)){
				throw "Must pass an isVisible observable to loader";
			}
			$(element).addClass("loaderSpinner");
			var loader = new Loader(element, options);

			options.isVisible.subscribe(function(newValue){
				if(newValue && Modernizr.canvas){
					$(element).css("display", "");
					loader.render();
				} else {
					$(element).hide();
				}
			});
			if(Modernizr.canvas){
				loader.render();
			}
		}
	};

	function Loader(element, options){
		this.options = $.extend({
			numOfSegments: 5,
			primaryColor: "#333333",
			secondaryColor: "#7e8c8d",
			strokeWidth: 5,
			width: 130,
			height: 130,
			updateInterval: 20
		}, options);

		//Time keeping for animation
		this.now = null;
		this.delta = 0;
		this.then = Date.now();
		this.deltaTicks = 0;

		this.filledSegments = 1;
		this.lastActiveSegmentColor = null;
		this.currentPrimaryColor = this.options.primaryColor;
		this.currentSecondaryColor = this.options.secondaryColor;

		if(Modernizr.canvas){
			this.canvas = $("<canvas>")[0];
			this.canvas.setAttribute("width", this.options.width);
			this.canvas.setAttribute("height", this.options.height);
			this.ctx = this.canvas.getContext('2d');
		}else{
			this.canvas = new Image();
			this.canvas.src = environment.mediaserver+"/images/widgets/sharedMedia/spinnerActive.gif";
		}
		$(element).append(this.canvas);

		this.render = function() {
			if(!this.options.isVisible() || !$(this.canvas).is(':visible')){
				return;
			}
			//required for spinner to function in IE9
			window.requestAnimationFrame = window.requestAnimationFrame || function(callback) { window.setTimeout(callback,16); };
			window.requestAnimationFrame(this.render.bind(this));

			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

			this.now = Date.now();
			this.delta = this.now - this.then;
			if (this.delta > this.options.updateInterval) {
				this.then = this.now - (this.delta % this.options.updateInterval);
				this.deltaTicks++;

				// Add a segment after 20 delta ticks
				if(this.deltaTicks >= 20){
					this.deltaTicks = 0;

					// Reset number of segments if you hit the max
					if(this.filledSegments < this.options.numOfSegments){
						this.filledSegments++;
					}else{
						// Swap the colors so we can fade them away/in
						this.currentPrimaryColor = (this.currentPrimaryColor === this.options.primaryColor) ? this.options.secondaryColor : this.options.primaryColor;
						this.currentSecondaryColor = (this.currentSecondaryColor === this.options.secondaryColor) ? this.options.primaryColor : this.options.secondaryColor;
						this.filledSegments = 1;
					}
				}
				// Magic numbers for decent gradient change
				this.lastActiveSegmentColor = this._shadeColor(this.options.primaryColor, (20 - this.deltaTicks) * 0.05);
			}
			this._drawSegmentedCircle();
		};
	}

	Loader.prototype._shadeColor = function(hex, lum) {
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	};

	Loader.prototype._drawSegmentedCircle = function() {
		var self = this;
		var centerX = this.canvas.width / 2;
		var centerY = this.canvas.height / 2;

		var segments = this._generateSegments(
			this.options.numOfSegments-this.filledSegments,
			this.filledSegments
		);

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
	};

	Loader.prototype._generateSegments = function(numOfSegments, numOfFilledSegments) {
		var segments = [];

		for ( ; numOfFilledSegments > 0; numOfFilledSegments--) {
			segments.push({ color: this.currentPrimaryColor });
		}
		if(segments.length){
			segments[segments.length-1].color = this.lastActiveSegmentColor;
		}

		for ( ; numOfSegments > 0; numOfSegments--) {
			segments.push({ color: this.currentSecondaryColor });
		}

		if (!segments.length) {
			segments.push({ color: this.currentSecondaryColor });
		}
		return segments;
	};

	Loader.prototype._getSectionSize = function (numSections, gutterWidth) {
		if (numSections <= 1) {
			return 2 * Math.PI;
		}
		return ((2 * Math.PI) - (numSections * gutterWidth)) / numSections;
	};

	Loader.prototype._getCircleRadius = function() {
		return (this.canvas.height - this.options.strokeWidth) / 2;
	};
});
