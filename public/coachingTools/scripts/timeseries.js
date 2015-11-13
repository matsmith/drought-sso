/*global define*/
define('timeseries', [
	'jquery'
], function($) {
	"use strict";

	var HOUR_IN_MILLIS = 60*60*1000;
	var DAY_IN_MILLIS = HOUR_IN_MILLIS*24;
	var WEEK_IN_MILLIS = DAY_IN_MILLIS*7;

	/**
	 * This object contains a list of data points and provides helper functions
	 * for transforming those points.
	 *
	 * @param dataPoints {Array} A list of objects of the format { date: Date, prop0: any, prop1: any, ... }
	 * @param daysToInclude {int} The max number of days from today to include as recent graph data
	 * @constructor
	 */

	var Timeseries = function(dataPoints, daysToInclude) {
		var self = this;
		this.dataPoints = [];
		dataPoints.forEach(function(dataPoint) {
			if(self.isRecent(dataPoint.date, daysToInclude)) {
				self.dataPoints.push(dataPoint);
			}
		});
		this.sortDataPoints();
	};

	Timeseries.prototype.sortDataPoints = function() {
		this.dataPoints.sort(function(a, b) {
			return a.date - b.date;
		});
	};

	Timeseries.prototype.exportData = function() {
		var exportData = [];
		this.dataPoints.forEach(function(dataPoint) {
			exportData.push($.extend(true, {}, dataPoint));
		});
		return exportData;
	};

	Timeseries.prototype.exportFilteredData = function(timeframe) {
		var exportData = this.exportData();
		var filteredDataMap = {};
		exportData.forEach(function(dataPoint) {
			dataPoint.date = Timeseries.roundDateToDay(dataPoint.date);
			var index = timeframe === "daily" ? dataPoint.date.getTime() :
				Timeseries.roundDateToWeek(dataPoint.date);
			// Later items on the same date will overwrite earlier ones
			filteredDataMap[index] = dataPoint;
		});
		var filteredData = [];
		Object.keys(filteredDataMap).forEach(function(timeKey) {
			filteredData.push(filteredDataMap[timeKey]);
		});
		return filteredData;
	};

	Timeseries.prototype.append = function(newDataPoint) {
		newDataPoint.date = newDataPoint.date || new Date();
		this.dataPoints.push(newDataPoint);
		this.sortDataPoints();
	};

	Timeseries.prototype.getMax = function(property) {
		var props = this.dataPoints.map(function(dataPoint) {
			return dataPoint[property];
		});
		var max = Math.max.apply(Math, props);
		if (!isFinite(max)) {
			return null;
		}
		return max;
	};

	Timeseries.prototype.getMin = function(property) {
		var props = this.dataPoints.map(function(dataPoint) {
			return dataPoint[property];
		});
		var min = Math.min.apply(Math, props);
		if (!isFinite(min)) {
			return null;
		}
		return min;
	};

	Timeseries.prototype.getLatest = function(property) {
		var latestPoint = this.dataPoints[this.dataPoints.length-1] || null;
		if (property === undefined || latestPoint === null) {
			return latestPoint;
		}
		return latestPoint[property];
	};

	Timeseries.prototype.getOldest = function(property) {
		var oldestPoint = this.dataPoints[0] || null;
		if (property === undefined || oldestPoint === null) {
			return oldestPoint;
		}
		return oldestPoint[property];
	};

	Timeseries.prototype.isRecent = function(date, days) {
		var diffInMillis = Timeseries.roundDateToDay(new Date()) - date;
		return (diffInMillis / DAY_IN_MILLIS) < days;
	};

	Timeseries.roundDateToDay = function(date) {
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	Timeseries.roundDateToWeek = function(date) {
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		var today = new Date();
		var weekStart = today.getTime() - today.getDay()*DAY_IN_MILLIS - today.getHours()*HOUR_IN_MILLIS -
			today.getMinutes()*60000 - today.getSeconds()*1000 - 1000; 
		if(weekStart - date.getTime() <= 0) {
			return 0;
		}
		return Math.ceil((weekStart - date.getTime()) / WEEK_IN_MILLIS);
	};

	return Timeseries;

});
