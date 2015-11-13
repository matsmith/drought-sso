/*global define*/
define('flotTimelineHelper', [
	'jquery',
	'onWindowResize',
	'flot', // provides $.plot
	'flot-time', // provides time mode to flot
	'flot-fillbetween' // provides fillbetween to flot
], function($, onWindowResize) {
	"use strict";

	var DAY_IN_MILLIS = 24*60*60*1000;
	var MINUTE_IN_MILLIS = 60*1000;

	/**
	 *
	 * @param target
	 * @param timeseries {Timeseries}
	 * @param options
	 * @constructor
	 */
	function FlotTimelineHelper(target, timeseries, options) {

		var self = this;
		self.$target = $(target);
		self.options = $.extend({
			graphDaysBuffer: 1,
			flotOptions: {},
			useDailyData: false,
			yAxisValues: [],
			targetRange: false,
			onPlot: $.noop,
			tooltip: false,
			tooltipClass: "coachingWidgetGraphTooltip"
		}, options);
		self.hasSingleDailyDataPoint = true;

		self.timeseries = timeseries;
		if (self.options.tooltip) {
			self.$tooltip = $("<div>")
				.addClass(self.options.tooltipClass)
				.insertAfter(self.$target);
			self.$target.bind("plothover", function(evt, pos, item) {
				if (item) {
					var graphData = self.options.dataCoords.getData();
					self.$tooltip
						.html(self.options.tooltip.content(item, graphData))
						// fix for offset measurement
						.css("visibility", "hidden").show();
					var width = self.$tooltip.outerWidth();
					var height = self.$tooltip.outerHeight();
					//make an adjustment for the tooltip alignment if at the far right position
					var $feedback = self.$target.closest('.feedback');
					var $graphContainer = $feedback.length > 0 ? $feedback : self.$target.closest('.graph');
					var containerRightPos = $graphContainer.offset().left + $graphContainer.width();
					var xOffset;
					if(containerRightPos - item.pageX < width/2) {
						xOffset = width - 20;
						self.$tooltip.addClass("rightAlignTooltip");
					} else {
						xOffset = width/2;
						self.$tooltip.removeClass("rightAlignTooltip");
					}
					self.$tooltip
						.offset({
							top: item.pageY-(height+20),
							left: item.pageX-xOffset
						})
						// undo offset measurement fix
						.hide().css("visibility", "")
						.show();
				} else {
					self.$tooltip.hide();
				}
			});
		}
	}

	FlotTimelineHelper.prototype.plot = function() {
		//Calculating the graph element's width in pixels for flot to draw canvas elements.
		//Using 3:1 width:height ratio and 90% width to allow space for tooltip at extents of graph.
		//Some tools will have a separate graph view, else the graph will be in the current view.
		var statusWidth = $('[data-view=graph]').length ? 0 : $('.status').width();
		var containerWidth = $('[data-view=current]').width();
		var targetWidth = (containerWidth - statusWidth) * 0.95;
		if (containerWidth === statusWidth) {
			targetWidth = containerWidth;
		}
		this.$target.width(targetWidth);
		this.$target.height(targetWidth/3);
		this.options.dataCoords = $.plot(
			this.$target,
			this.getFlotValues(),
			this.getFlotOptions()
		);

		this.options.onPlot(this.$target);
	};

	FlotTimelineHelper.prototype.handleResize = function() {
		var self = this;
		var doneResizing = false;
		onWindowResize(function() {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function() {
				self.plot();
			}, 200);
		});
	};

	FlotTimelineHelper.prototype.getFlotValues = function() {
		var self = this;
		var flotSeriesList = [];
		Object.keys(self.options.yAxisValues).forEach(function(yAxisValue) {
			var filteredData = self.options.useFilteredData ?
				self.timeseries.exportFilteredData(self.options.useFilteredData) :
				self.timeseries.exportData();
			var data = filteredData.map(function(dataPoint) {
				var utcDisplayDate = FlotTimelineHelper.convertDateToUtcDisplay(dataPoint.date);
				return [utcDisplayDate, dataPoint[yAxisValue]];
			});
			var seriesConfig = self.options.yAxisValues[yAxisValue];

			seriesConfig.data = data;
			flotSeriesList.push(seriesConfig);
		});
		//if data hasn't been updated within the span of daysToInclude, there will be a series with no data
		var initTime = flotSeriesList[0].data.length > 0 ? flotSeriesList[0].data[0][0].getTime() : 0;
		var i, j;
		for(i=0; i<flotSeriesList.length; i++) {
			if(!self.hasSingleDailyDataPoint || initTime === 0) { break; }
			for(j=0; j<flotSeriesList[i].data.length; j++) {
				if(flotSeriesList[i].data[j][0].getTime() !== initTime) {
					self.hasSingleDailyDataPoint = false;
					break;
				}
			}
		}
		if(this.timeseries.labels) {
			$.map(flotSeriesList, function(val, i) {
				flotSeriesList[i].label = self.timeseries.labels[i];
			});
		}
		if (this.options.targetRange) {
			return flotSeriesList.concat(this.getTargetRangeValues());
		}

		return flotSeriesList;
	};

	FlotTimelineHelper.prototype.getTimelineRange = function() {
		if(this.timeseries.dataPoints.length === 1 || this.hasSingleDailyDataPoint) {
			this.options.graphDaysBuffer = 4;
		}
		return {
			min: this.timeseries.getMin("date") - (this.options.graphDaysBuffer * DAY_IN_MILLIS),
			max: this.timeseries.getMax("date") + (this.options.graphDaysBuffer * DAY_IN_MILLIS)
		};
	};

	FlotTimelineHelper.prototype.setTargetRange = function(min, max) {
		if (!min && !max) {
			this.options.targetRange = false;
			return;
		}
		this.options.targetRange = {
			min: min,
			max: max
		};
	};

	FlotTimelineHelper.prototype.getTargetRangeValues = function() {
		var range = this.getTimelineRange();
		return [{
			id: "minRange",
			data: [
				[range.min, this.options.targetRange.min],
				[range.max, this.options.targetRange.min]
			],
			bars: { show: false },
			lines: { show: true, lineWidth: 0, fill: 0 },
			points: { show: false },
			hoverable: false
		}, {
			id: "maxRange",
			data: [
				[range.min, this.options.targetRange.max],
				[range.max, this.options.targetRange.max]
			],
			bars: { show: false },
			lines: { show: true, lineWidth: 0, fill: 0.2 },
			points: { show: false },
			fillBetween: "minRange",
			color: this.options.targetColor,
			hoverable: false
		}];
	};

	FlotTimelineHelper.prototype.getFlotOptions = function() {
		this.options.flotOptions.xaxis = $.extend({}, this.options.flotOptions.xaxis,
			$.extend(this.getTimelineRange(), {
				mode: "time"
				//TODO: monthNames: get from resource bundle ["Jan", "Feb", etc ]
			}));
		return this.options.flotOptions;
	};

	FlotTimelineHelper.prototype.destroy = function() {
		if (this.$tooltip) {
			this.$tooltip.remove();
		}
		this.$target.remove();
	};

	FlotTimelineHelper.convertDateToUtcDisplay = function(date) {
		// This tweak is a fix for a known issue with flot and time-zoned dates
		var utcMinuteOffset = date.getTimezoneOffset();
		return new Date(date.getTime() - utcMinuteOffset*MINUTE_IN_MILLIS);
	};

	FlotTimelineHelper.convertDateFromUtcDisplay = function(date) {
		// This tweak reverses the "fix" above, getting dates that come directly
		// from flot events back to their actual values
		var utcMinuteOffset = date.getTimezoneOffset();
		return new Date(date.getTime() + utcMinuteOffset*MINUTE_IN_MILLIS);
	};

	FlotTimelineHelper.BAR_DEFAULTS = {
		show: true,
		barWidth: DAY_IN_MILLIS * 0.9,
		align: "center"
	};

	return FlotTimelineHelper;
});
