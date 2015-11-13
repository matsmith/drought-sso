/*global define*/
define('coachingSleepTrackerWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'moment',
	'colorUtils',
	'modernizr',
	'googleAnalytics',
	'koCustomBindings', // provides knockout custom bindings
	'handlebarsHelpers', // provides dateFormat handlebars helper
	'baseWidget', // provides $.wnp.baseWidget,
	'loaderSpinner'
], function (
	$,
	ko,
	templates,
	moment,
	colorUtils,
	Modernizr,
	gAnalytics

) {
	"use strict";

	var hoursOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	var minutesOptions = (function () {
		var output = [];
		for (var i = 0; i <= 59; i += 5) {
			output.push(i < 10 ? "0" + i : i.toString());
		}
		return output;
	})();
	// stampDeconstructToTime:
	// mutation: a time-stamp
	// mutated: the object that will be mutated based on time-stamp values
	// The object is mutated and not reconstructed because it is part of the view model
	// therefore it needs to be modified not replaced
	function stampDeconstructToTime(mutation, mutated) {
		if (!mutation || !mutated) {
			return;
		}
		mutation = moment(mutation);
		var hours = Number(mutation.format('hh'));
		var minutes = Number(mutation.format('mm'));
		var period = mutation.format('A');

		mutated.hours.value(hours);
		mutated.minutes.value(minutes);
		mutated.period.value(period);
	}

	// Interruption: constructor
	// constructs a view-model fragment that populates an array of value pairs
	// values: the values to populate from
	//	expects the format of the service
	//		{
	//			timeOutOfBed: 'time-stamp string',
	//			timeIntoBed: 'time-stamp string'
	//		}
	//	widgetContext: required to reference the parent array
	function Interruption(values, widgetContext) {
		var timeOutOfBed = {
			hours: {
				options: hoursOptions,
				value: ko.observable()
			},
			minutes: {
				options: minutesOptions,
				value: ko.observable()
			},
			period: {
				options: [
					widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel.toUpperCase(),
					widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel.toUpperCase()
				],
				value: ko.observable()
			}
		};
		// mutates timeOutOfBed
		stampDeconstructToTime(values && values.timeOutOfBed, timeOutOfBed);

		var timeIntoBed = {
			hours: {
				options: hoursOptions,
				value: ko.observable()
			},
			minutes: {
				options: minutesOptions,
				value: ko.observable()
			},
			period: {
				options: [
					widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel.toUpperCase(),
					widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel.toUpperCase()
				],
				value: ko.observable()
			}
		};
		// mutates timeIntoBed
		stampDeconstructToTime(values && values.timeIntoBed, timeIntoBed);
		return {
			values: {
				timeOutOfBed: timeOutOfBed,
				timeIntoBed: timeIntoBed
			},
			removeInterruption: function (interruption) {
				widgetContext.vm.currentQuestionnaire.values.userSleepData.timesUpAtNight.remove(interruption);
				// focus on the first input in the last inserted form
				$('.interruptions label').last().prev().focus();
			}
		};
	}

	ko.components.register('sleep-day-navigator', {
		viewModel: function (data) {
			var vm = this;
			var questionnaireDate = moment(data.widgetContext.vm.currentQuestionnaire.values.date()).subtract(1, 'days');
			var isoDay = questionnaireDate ? moment(questionnaireDate).isoWeekday() % 7 : moment().isoWeekday() % 7;
			// selected radio value
			vm.value = ko.observable(isoDay);
			// the currently displayed date
			vm.selectedDate = ko.observable(moment(questionnaireDate || ''));
			// the header date to inform the user of the date they are editing
			vm.formattedDate = ko.computed(function () {
				return vm.selectedDate().format('dddd MMMM Do');
			}, vm);
			// populate the questionnaire based on the available payload
			vm.populateCurrentQuestionnaire = ko.computed(function () {
				// get the data out of the payload for the selected date
				var currentQuestionnaire = data.widgetContext.vm.currentQuestionnaire;
				var dataSet = data.userSleepDates.filter(function (sleepData) {
					return moment(sleepData.date).startOf('day').format() === vm.selectedDate().clone().startOf('day').format();
				});

				if (dataSet[0] && dataSet[0].userSleepData) {
					dataSet = dataSet[0];

					currentQuestionnaire.values.date(dataSet.date);
					if (dataSet.userSleepData) {
						currentQuestionnaire.values.id(dataSet.userSleepData.id);
						stampDeconstructToTime(dataSet.userSleepData.timeIntoBed, currentQuestionnaire.values.userSleepData.timeIntoBed);

						var timeToSleepHours = dataSet.userSleepData.timeToSleep / 60;
						if (timeToSleepHours) {
							currentQuestionnaire.values.userSleepData.timeToSleep.hours.value(Math.floor(timeToSleepHours));
							currentQuestionnaire.values.userSleepData.timeToSleep.minutes.value(Math.ceil( timeToSleepHours % 1 * 60) );
						} else {
							currentQuestionnaire.values.userSleepData.timeToSleep.hours.value(0);
							currentQuestionnaire.values.userSleepData.timeToSleep.minutes.value(0);
						}

						stampDeconstructToTime(dataSet.userSleepData.timeWakeUp, currentQuestionnaire.values.userSleepData.timeWakeUp);
						stampDeconstructToTime(dataSet.userSleepData.timeOutOfBed, currentQuestionnaire.values.userSleepData.timeOutOfBed);
						currentQuestionnaire.values.userSleepData.noSleep(dataSet.userSleepData.noSleep);

						if ( dataSet.userSleepData.noSleep || dataSet.userSleepData.timesUpAtNight ) {
							currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value(undefined);
							currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value(undefined);
						} else {
							currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value(Math.floor(dataSet.userSleepData.awakeDuringNightMinutes / 60));
							currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value(dataSet.userSleepData.awakeDuringNightMinutes / 60 % 1);
						}

						currentQuestionnaire.values.userSleepData.daytimeEnergyLevel(dataSet.userSleepData.daytimeEnergyLevel);

						currentQuestionnaire.values.userSleepData.timesUpAtNight((function () {
							var pairs = [];
							if (dataSet.userSleepData.timesUpAtNight) {
								dataSet.userSleepData.timesUpAtNight.forEach(function (pair, index) {
									pairs.push(new Interruption(pair, data.widgetContext));
								});
							}
							return pairs;
						}()));
					}
				} else {
					currentQuestionnaire.values.id(undefined);
					currentQuestionnaire.values.date(vm.selectedDate().format());
					currentQuestionnaire.values.userSleepData.timeIntoBed.hours.value(undefined);
					currentQuestionnaire.values.userSleepData.timeIntoBed.minutes.value(undefined);
					currentQuestionnaire.values.userSleepData.timeIntoBed.period.value(undefined);
					currentQuestionnaire.values.userSleepData.timeToSleep.hours.value(undefined);
					currentQuestionnaire.values.userSleepData.timeToSleep.minutes.value(undefined);

					currentQuestionnaire.values.userSleepData.timeWakeUp.hours.value(undefined);
					currentQuestionnaire.values.userSleepData.timeWakeUp.minutes.value(undefined);
					currentQuestionnaire.values.userSleepData.timeWakeUp.period.value(undefined);

					currentQuestionnaire.values.userSleepData.timeOutOfBed.hours.value(undefined);
					currentQuestionnaire.values.userSleepData.timeOutOfBed.minutes.value(undefined);
					currentQuestionnaire.values.userSleepData.timeOutOfBed.period.value(undefined);

					currentQuestionnaire.values.userSleepData.noSleep(false);

					currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value(undefined);
					currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value(undefined);

					currentQuestionnaire.values.userSleepData.daytimeEnergyLevel(undefined);

					currentQuestionnaire.values.userSleepData.timesUpAtNight.removeAll();
				}
				currentQuestionnaire.valid(true);

				currentQuestionnaire.values.userSleepData.timeIntoBed.valid(true);
				currentQuestionnaire.values.userSleepData.timeToSleep.valid(true);
				currentQuestionnaire.values.userSleepData.timeWakeUp.valid(true);
				currentQuestionnaire.values.userSleepData.timeOutOfBed.valid(true);
				currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.valid(true);
				currentQuestionnaire.values.userSleepData.timesUpAtNightValid.valid(true);
			});
			// constructs the view-model fragment for each of the currently rendered days in the component
			vm.renderedDays = ko.computed(function () {
				var firstRenderedDay = vm.selectedDate().clone().startOf('week');
				var datesToRender = [];
				var i = 0;

				// view-model fragment for each day
				function Day(date) {
					return {
						value: vm.value,
						date: date,
						renderName: date.format('ddd'),
						renderNumber: date.format('D'),
						status: (function () {
							var baseline = moment(data.widgetContext.vm.results().baseline.baselineDate);
							var dateData;

							// is this day valid for input
							if (date.isBetween(baseline, moment().subtract(1, 'days')) || date.isSame(moment()) || date.isSame(baseline)) {
								// is there data for this day
								dateData = data.userSleepDates.filter(function (sleepData) {
									return moment(sleepData.date).startOf('day').format() === date.clone().startOf('day').format();
								});

								if (dateData[0] && dateData[0].userSleepData) {
									return 'data-entered';
								}
								return 'data-not-entered';
							}
							return 'entry-not-allowed';

						}()),
						updateSelection: function (day, e) {
							vm.selectedDate(day.date);
						}
					};
				}

				for (i; i <= 6; i += 1) {
					datesToRender.push(new Day(firstRenderedDay.clone().add(i, 'days')));
				}

				return datesToRender;
			});

			vm.events = {
				previousWeek: function (e) {
                    // check if the next week has valid days
					var previousWeekEnd = vm.selectedDate().clone().subtract(1, 'week').endOf('week');
					if (previousWeekEnd.isBefore(moment(data.widgetContext.vm.results().baseline.baselineDate))) {
						return;
					}
					// select the last day of the previous week
					vm.selectedDate(previousWeekEnd);
					vm.value(6);
				},
				nextWeek: function (e) {
					var nextWeekStart = vm.selectedDate().clone().add(1, 'week').startOf('week');
					if (nextWeekStart.isAfter(moment())) {
						return;
					}
					// select the last day of the previous week
					vm.selectedDate(nextWeekStart);
					vm.value(0);
				},
				startTouch: function (vm, e) {
					vm.startTouch =  e.originalEvent.changedTouches[0].clientX;
				},
				endTouch: function (vm, e) {
					vm.nowX = e.originalEvent.changedTouches[0].clientX;
					var touchDiff = vm.startTouch - vm.nowX;
					var dragThreshold = 50;
					var inputIndex = Number($(e.target).siblings('input').val());

					if (Math.abs(touchDiff) > dragThreshold) {
						if (touchDiff > 0) {
							vm.events.nextWeek();
						}
						else {
							vm.events.previousWeek();
						}
					}
					else {
						var todayDate = moment(data.widgetContext.vm.currentQuestionnaire.values.date()).subtract(1, 'days');
						var currentSelectedIndex = vm.selectedDate().startOf('week').add(inputIndex, 'days');
						if (!currentSelectedIndex.isAfter(todayDate)) {
							vm.selectedDate(vm.selectedDate().startOf('week').add(inputIndex, 'days'));
							vm.value(inputIndex);
						}
					}
				}
			};
		},
		template: {
			// the id attribute of a <template> to render this view-model with
			element: 'sleep-day-navigator'
		}
	});

	ko.components.register('hoursSlept', {
		viewModel: function (params) {
			params.data.average = params.data.average === undefined ? '-' : params.data.average;
			this.text = ko.observable( params.data.average + ' ' + params.resources.sleepCoachingTool.weeklyAveragesHoursOfSleepGraphHoursLabel );
		},
		template: {
			// the id attribute of a <template> to render this view-model with
			element: 'hoursSlept'
		}
	});

	ko.components.register('sleepEfficiency', {
		viewModel: function (params) {
			// circumference of the progress circle
			// used to calculate the dash-offset in the stroke
			var circumference = 360;
			params.data.average = params.data.average === undefined ? '-' : params.data.average;

			this.updatedDashOffset = (1 - params.data.average / 100) * circumference;
			this.text = params.data.average + '%';
		},
		template: {
			element: 'sleepEfficiency'
		}
	});

	ko.components.register('energyLevel', {
		viewModel: function (params) {
			this.average = params.data.average;
			this.updatedInnerWidth = ((params.data.average * 10) || 0) / 100 * 191;
		},
		template: {
			element: 'energyLevel'
		}
	});

	ko.components.register('sleep-day-result', {
		viewModel: function (results) {
			var sleepFills = (function () {

				// output: graph rendering view-model fragemnt
				var output = [];
				// populate output from service results
				results.userSleepDates.forEach(function (sleepDate, index) {
					// To convert the 24 hour time scale from "am -> am" to "pm -> pm"
					// we measure everything as an offset from 12pm on the date in the payload
					var graphStartTime = moment(sleepDate.date).startOf('day').add(12, 'hours');

					// aggregate sleep times
					// fell asleep and woke up live in different place from interruptions
					// we need an array of all of them
					var sleepTimes = (function () {
						var sleepTimesAggregate = [];
						if (sleepDate.userSleepData) {
							sleepTimesAggregate.push(moment(sleepDate.userSleepData.timeIntoBed).add(sleepDate.userSleepData.timeToSleep, 'minutes'));
							// break up wake up pairs so they fit with sleep and wake up times
							if (sleepDate.userSleepData.timesUpAtNight) {
								sleepDate.userSleepData.timesUpAtNight.forEach(function (timesPair) {
									sleepTimesAggregate.push(timesPair.timeOutOfBed);
									sleepTimesAggregate.push(timesPair.timeIntoBed);
								});
							}
							sleepTimesAggregate.push(sleepDate.userSleepData.timeWakeUp);
						}
						return sleepTimesAggregate;
					}());

					// formattedSleepTimesL moment objects of the times provided in  sleepTimes
					var formattedSleepTimes = [];
					sleepTimes.map(function (time, index) {
						if (time === undefined) {
							time = sleepTimes[index-1];
						}
						formattedSleepTimes[index] = moment(time);
					});

					// assemble and decorate pairs of fell asleep and woke up times
					var pairs = [];
					if (formattedSleepTimes.length) {
						pairs.push({});
					}
					formattedSleepTimes.map(function (time, index) {
						var lastPair = pairs.slice(-1)[0];
						if (lastPair.renderStart === undefined) {
							lastPair.renderStart = moment.duration(time.diff(graphStartTime)).asHours();
						} else if (lastPair.renderEnd === undefined) {
							lastPair.renderEnd = moment.duration(time.diff(graphStartTime)).asHours() > 24 ? 24 : moment.duration(time.diff(graphStartTime)).asHours();
						} else {
							pairs.push({
								renderStart: moment.duration(time.diff(graphStartTime)).asHours()
							});
						}
					});

					var timeToBedFill;
					var timeOutOfBedFill;
					if (sleepDate.userSleepData) {
						timeToBedFill = moment.duration(moment(sleepDate.userSleepData.timeIntoBed).diff(graphStartTime)).asHours();
						timeOutOfBedFill = moment.duration(moment(sleepDate.userSleepData.timeOutOfBed).diff(graphStartTime)).asHours() > 24 ? 24 : moment.duration(moment(sleepDate.userSleepData.timeOutOfBed).diff(graphStartTime)).asHours();
					}
					output.push({
						date: moment(sleepDate.date).format('ddd M/D'),
						endDate: moment(sleepDate.date).add(1, 'days').format('ddd M/D'),
						timeToBedFill: timeToBedFill,
						timeOutOfBedFill: timeOutOfBedFill,
						asleepFills: pairs
					});
				});
				return output;
			}());

			var baselineDate = moment(results.baseline.baselineDate);
			if (moment().isBetween(results.baseline.baselineDate, baselineDate.add(7, 'days'))) {
				sleepFills = sleepFills.slice(0,7);
			} else {
				sleepFills = sleepFills.splice(moment().diff(results.baseline.baselineDate, 'days') - 6, 7);
			}

			this.sleepFills = sleepFills.reverse();
		},
		template: {
			element: 'sleep-day-result'
		}
	});

	ko.components.register('sleep-hours-week', {
		viewModel: function (results) {
			function calculateAverage (value) {
				// convert 0 -> 15 to 0 -> 12
				var adjustedValue = value || 0;
				adjustedValue = adjustedValue > 12 ? 12 : adjustedValue;
				adjustedValue *= (15 / 12);
				return adjustedValue;
			}
			var processedAverages = [{
				renderDate: "baseline",
				averageSleep: calculateAverage(results.baseline.totalHourSlept)
			}];
			results.durationAverage.averages.map(function (average) {
				var startDate = moment(average.startDate).format('M/D');
				var endDate = moment(average.endDate).format('M/D');

				processedAverages.push(
					$.extend({
						renderDate: '(' + startDate + ' - ' + endDate + ')',
						averageSleep: calculateAverage(average.averageSleep)
					}, average)
				);
			});
			if (processedAverages.length > 6) {
				this.averageSummary = processedAverages.slice(Math.max(processedAverages.length - 6, 1));
			}
			this.averageSummary = processedAverages;
			if (results.baseline) {
				this.baseline = results.baseline.totalHourSlept;
			} else {
				this.baseline = 0;
			}
		},
		template: {
			element: 'sleep-hours-week'
		}
	});

	ko.components.register('sleep-energy-week', {
		viewModel: function (results) {
			var processedAverages = [{
				baseline: true,
				averageEnergy: results.baseline.daytimeEnergyLevel,
				noData: false
			}];
			results.durationAverage.averages.map(function (average) {
				var startDate = moment(average.startDate).format('M/D');
				var endDate = moment(average.endDate).format('M/D');

				processedAverages.push(
					$.extend({
						baseline: false,
						renderDate: '(' + startDate + ' - ' + endDate + ')'
					}, average)
				);
			});
			if (processedAverages.length > 6) {
				this.averageSummary = processedAverages.slice(Math.max(processedAverages.length - 6, 1));
			}
			this.averageSummary = processedAverages;

			if (results.baseline) {
				this.baseline = results.baseline.daytimeEnergyLevel;
			} else {
				this.baseline = 0;
			}

			this.pathString = (function () {
				var lastValues = {
					x: 0,
					y: 0
				};
				var output = '';
				processedAverages.forEach(function (data, index) {
					if (index === 0) {
						output += 'M ';
					} else {
						output += 'L ';
					}
					var x, y;
					if (data.noData === false) {
						lastValues.x = x = (index) * 5.4;
						lastValues.y = y = -data.averageEnergy;
					} else {
						x = lastValues.x || 0;
						y = lastValues.y || 0;
					}
					output += x+' '+y;
				});
				return output;
			}());
		},
		template: {
			element: 'sleep-energy-week'
		}
	});

	// View Model constructor
	function SleepTrackerViewModel(widgetContext, data) {
		// model to be bound to the template
		var vm = {
			supportsRange: Modernizr.inputtypes.range,
			textContent: data.resourceBundle.model,
			// debug tool data for switching views
			debugViews: (function () {
				var views = [];
				return {
					// must be run after the widget DOM is rendered
					initialize: function () {
						$('[data-view]').each(function (index, node) {
							views.push($(node).data().view);
						});
						return this;
					},
					views: views
				};
			}()),
			debugEvents: {
				debugChangeView: function () {
					widgetContext.display(arguments[1].currentTarget.textContent);
				}
			},
			graphLabels: {
				sleepEfficiency: data.resourceBundle.model.sleepCoachingTool.sleepEfficiencyLabel,
				hoursSlept: data.resourceBundle.model.sleepCoachingTool.hoursSleptLabel,
				energyLevel: data.resourceBundle.model.sleepCoachingTool.energyLevelLabel
			},
			// the view-model for the currently rendered questionnaire
			currentQuestionnaire: {
				valid: ko.observable(true),
				values: {
					selectedOption: ko.observable("Option selected"),
					id: ko.observable(),
					date: ko.observable(moment()),
					userSleepData: {
						timeIntoBed: {
							valid: ko.observable(true),
							hours: {
								options: hoursOptions,
								value: ko.observable()
							},
							minutes: {
								options: minutesOptions,
								value: ko.observable()
							},
							period: {
								options: [
									widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel,
									widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel
								],
								value: ko.observable()
							}
						},
						timeToSleep: {
							valid: ko.observable(true),
							hours: {
								options: hoursOptions,
								value: ko.observable()
							},
							minutes: {
								options: minutesOptions,
								value: ko.observable()
							}
						},
						timeWakeUp: {
							valid: ko.observable(true),
							hours: {
								options:hoursOptions,
								value: ko.observable()
							},
							minutes: {
								options: minutesOptions,
								value: ko.observable()
							},
							period: {
								valid: ko.observable(true),
								options: [
									widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel,
									widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel
								],
								value: ko.observable()
							}
						},
						timeOutOfBed: {
							valid: ko.observable(true),
							hours: {
								options: hoursOptions,
								value: ko.observable()
							},
							minutes: {
								options: minutesOptions,
								value: ko.observable()
							},
							period: {
								options: [
									widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel,
									widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel
								],
								value: ko.observable()
							}
						},
						noSleep: ko.observable(),
						awakeDuringNightMinutes: {
							valid: ko.observable(true),
							hours: {
								options: hoursOptions,
								value: ko.observable()
							},
							minutes: {
								options: minutesOptions,
								value: ko.observable()
							}
						},
						timesUpAtNight: ko.observableArray([]),
						timesUpAtNightValid: {
							valid: ko.observable(true)
						},
						daytimeEnergyLevel: ko.observable(),
						energyLevelInputWasValid: ko.observable(false)
					}
				},
				events: {
					addInterruption: function () {
						vm.currentQuestionnaire.values.userSleepData.timesUpAtNight.push(new Interruption({}, widgetContext));
						vm.currentQuestionnaire.values.userSleepData.noSleep(false);
						vm.currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value( undefined );
						vm.currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value( undefined );
						// focus on the first input in the newly inserted form
						$('.interruptions label').last().prev().focus();
					},
					submit: function () {
						var date = vm.currentQuestionnaire.values.date();

						// evaluate that the data has no undefined values
						function validateCompleteDataSet(dataSet) {
							if (dataSet.hours && typeof dataSet.hours.value() !== 'number') {
								return false;
							}
							if (dataSet.minutes && typeof dataSet.minutes.value() !== 'number') {
								return false;
							}
							if (dataSet.period && typeof dataSet.period.value() !== 'string') {
								return false;
							}
							return true;
						}

						// performs a serice of lookup commands
						// keys: an array of look up leys
						function resolveVector(keys) {
							var vector = vm.currentQuestionnaire.values.userSleepData;
							if (Array.isArray(keys) === false) {
								keys = [keys];
							}
							keys.forEach(function (key) {
								vector = vector[key];
								// invoke observables
								if (typeof vector === 'function') {
									vector = vector();
								}
							});
							return vector;
						}

						// calculate 24 hour by 12 hour period
						function periodHourFunctor(vector, modifier) {
							if (
								(modifier.toUpperCase() === widgetContext.data.textContent.sleepCoachingTool.sleepPMLabel.toUpperCase() && vector < 12) ||
								(vector === 12 && modifier.toUpperCase() === widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel.toUpperCase())
							) {
								return Number(vector) + 12;
							}
							return Number(vector);
						}

						// constructs a time-stamp out of a view-model fragment
						function timeFunctor(vector, modifier, index) {
							if (validateCompleteDataSet(vector)) {
								return moment(date)
									.hour(
									periodHourFunctor(
										vector.hours.value(),
										vector.period.value()
									)
								)
									.minutes(Number(vector.minutes.value()))
									.add(
										(vector.period.value().toUpperCase() === widgetContext.data.textContent.sleepCoachingTool.sleepAMLabel.toUpperCase())  &&
										(Number(vector.hours.value()) < 12) ? 1 : 0, 'days'
									)
									.format();
							}
						}

						// constructs a duration out of multiple view-model fragments

						function durationFunctor(vector) {
							return vector.hours.value() * 60 + Number(vector.minutes.value());

						}

						// get minutes from hours and minutes view-model fragment
						function minutesFunctor(vector) {
							if (validateCompleteDataSet(vector)) {
								return Number(vector.minutes.value()) + (vector.hours.value() * 60);
							}
						}

						function adjustWakingDate (constructedTime) {
							if (moment(timeFunctor(resolveVector('timeIntoBed'), date)).format('A') === "AM" &&
								constructedTime.format('A') === 'PM'
							) {
								constructedTime.add(1, 'days');
							}
							return constructedTime.format();
						}

						// make post and populate payload
						widgetContext.services.userSleepData.updateId({
							userSleepData: {
								date: vm.currentQuestionnaire.values.date(),
								timeIntoBed: timeFunctor(resolveVector('timeIntoBed'), date),
								timeToSleep: durationFunctor(resolveVector('timeToSleep')),
								noSleep: vm.currentQuestionnaire.values.userSleepData.noSleep() || false,
								awakeDuringNightMinutes: minutesFunctor(resolveVector('awakeDuringNightMinutes')),
								timeWakeUp: adjustWakingDate(moment(timeFunctor(resolveVector('timeWakeUp'), date))),
								timeOutOfBed: adjustWakingDate(moment(timeFunctor(resolveVector('timeOutOfBed'), date))),
								daytimeEnergyLevel: Number(vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel()),
								timesUpAtNight: (function () {
									var awakePeriods = vm.currentQuestionnaire.values.userSleepData.timesUpAtNight();
									var output = [];
									awakePeriods.forEach(function (element, index) {
										output.push({
											timeOutOfBed: timeFunctor(resolveVector(['timesUpAtNight', index, 'values', 'timeOutOfBed']), date),
											timeIntoBed: timeFunctor(resolveVector(['timesUpAtNight', index, 'values', 'timeIntoBed']), date)
										});
									});
									return output;
								}())
							}
						}, vm.currentQuestionnaire.values.id())
						.done(function (response) {
							var questionTable = {
								'timeFellAsleep': 'timeToSleep',
								'awakeDuringNightMinutes': 'awakeDuringNightMinutes',
								'timeWokeUp': 'timeWakeUp',
								'timeOutOfBed': 'timeOutOfBed',
								'timesUpAtNight': 'timesUpAtNightValid'
							};
							if (response.model.errors) {
								vm.currentQuestionnaire.valid(false);
								response.model.errors.forEach(function (errorName) {
									vm.currentQuestionnaire.values.userSleepData[questionTable[errorName]].valid(false);
								});
							} else {
								Object.keys( questionTable ).forEach(function (key) {
									vm.currentQuestionnaire.values.userSleepData[questionTable[key]].valid(true);
								});
								widgetContext.services.userSleepToolData.getUserData().done(function (response) {
									vm.results(response.userSleepToolData);
									widgetContext.display('results-index');
								});
							}
						});
					}
				}
			},

			results: ko.observable(data.results),
			toQuestionnaireText: (function () {
				if (!moment().startOf('day').diff(moment(data.results.baseline.baselineDate).startOf('day'))) {
					return data.resourceBundle.model.sleepCoachingTool.startTrackingTomorrowButton;
				}
				return data.resourceBundle.model.sleepCoachingTool.sleepQuestionsAddAnotherTimeText;
			}()),
			disableQuestionnaireAccess: (function () {
				if (!moment().startOf('day').diff(moment(data.results.baseline.baselineDate).startOf('day'))) {
					return true;
				}
				return false;
			}()),
			events: {
				displayQuestions: function () {
					widgetContext.display('questions-index');
					vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel.valueHasMutated();
				},
				displayResults: function () {
					widgetContext.display('results-index');
				}
			}
		};

		vm.sleepDates = ko.computed(function () {
			return {
				userSleepDates: vm.results().userSleepDates,
				widgetContext: widgetContext
			};
		});

		vm.currentQuestionnaire.values.userSleepData.attemptedValue = ko.pureComputed({
			read: vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel,
			write: function (value) {
				if (Number(value) >= 0 && Number(value) <= 10) {
					vm.currentQuestionnaire.values.userSleepData.energyLevelInputWasValid(false);
					vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel(value);
				}
				else {
					vm.currentQuestionnaire.values.userSleepData.energyLevelInputWasValid(true);
				}
			}
		});

		// decorating computed properties onto the model
		//display text on slider on pageload//
		vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevelDisplayText = ko.computed(function () {
			var textLabel = vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel();
			var onLoadLabel = vm.textContent.sleepCoachingTool.sleepWakingUpSlideToAnswerLabel;
			if (textLabel === undefined) {
				return onLoadLabel;
			}
			else {
				return textLabel;
			}
		}, vm);

		vm.currentQuestionnaire.canNotSubmit = ko.computed(function () {
			var flatValues = [];
			var disabled = false;

			function flatteneModelValues (model) {
				var modelData;
				if (typeof model === 'function') {
					modelData = model();
					if (Array.isArray( modelData )) {
						modelData.forEach(function (element) {
							flatteneModelValues(element.values);
						});
					} else {
						flatValues.push( modelData );
					}
				} else if (typeof model === 'object') {
					if (model.enabled && model.enabled() === false) {
						return;
					}
					Object.keys(model).forEach(function (key) {
						flatteneModelValues(model[key]);
					});
				}
			}

			flatteneModelValues(vm.currentQuestionnaire.values.userSleepData);
			flatValues.forEach(function (value) {
				if (value === undefined) {
					disabled = true;
				}
			});
			return disabled;
		});

		vm.currentQuestionnaire.submitText = ko.computed(function () {
			if (vm.currentQuestionnaire.canNotSubmit()) {
				return widgetContext.data.textContent.sleepCoachingTool.allQuestionsAreRequiredText;
			}
			return widgetContext.data.textContent.sleepCoachingTool.sleepSaveButton;
		});

		vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevelTransformString = ko.computed(function () {
			var energyLevel = vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel() || 5;
			var slider = $('.slider-container__slider-wrapper');
			var metric = energyLevel / 10 * (slider.width() - 22) + 41;
			if (vm.currentQuestionnaire.values.userSleepData.daytimeEnergyLevel() === undefined) {
				return 'left: calc(50% - 65px);' + 'width: 130px;' + 'height: 36px;' + 'line-height: 2.5;';
			}
			else {
				// TODO get the thumb metrics for this
				// energyLevel/10 * (range-element-width - thumb-width) + (thumb-width / 2  or something? )
				return '-webkit-transform: translate(' + metric + 'px, 0px);' +
					'-moz-transform: translate(' + metric + 'px, 0px);' +
					'-ms-transform: translate(' + metric + 'px, 0px);' +
					'transform: translate(' + metric + 'px, 0px);';
			}
		}, vm);

		vm.currentQuestionnaire.interruptionButtonText = ko.computed(function () {
			var content = vm.textContent.sleepCoachingTool.sleepLogIndicateTime;
			if (vm.currentQuestionnaire.values.userSleepData.timesUpAtNight().length) {
				content = vm.textContent.sleepCoachingTool.sleepQuestionsAddAnotherTimeText;
			}
			return content;
		}, vm);

		vm.currentQuestionnaire.values.userSleepData.timesUpAtNightValid.enabled = ko.computed(function () {
			if ( vm.currentQuestionnaire.values.userSleepData.noSleep() ) {
				vm.currentQuestionnaire.values.userSleepData.timesUpAtNight.removeAll();
				return false;
			}
			return true;
		}, vm);

		vm.currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.enabled = ko.computed(function () {
			var valid = !vm.currentQuestionnaire.values.userSleepData.noSleep() && !vm.currentQuestionnaire.values.userSleepData.timesUpAtNight().length;
			if (!valid) {
				vm.currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.hours.value( undefined );
				vm.currentQuestionnaire.values.userSleepData.awakeDuringNightMinutes.minutes.value( undefined );
			}
			return valid;
		}, vm);

		vm.currentQuestionnaire.values.userSleepData.timeToSleep.enabled = ko.computed(function () {
			var noSleep = vm.currentQuestionnaire.values.userSleepData.noSleep();
			if (noSleep) {
				vm.currentQuestionnaire.values.userSleepData.timeToSleep.hours.value(undefined);
				vm.currentQuestionnaire.values.userSleepData.timeToSleep.minutes.value(undefined);
			}
			return !noSleep;
		}, vm);

		vm.currentQuestionnaire.values.userSleepData.timeWakeUp.enabled = ko.computed(function () {
			var noSleep = vm.currentQuestionnaire.values.userSleepData.noSleep();
			if (noSleep) {
				vm.currentQuestionnaire.values.userSleepData.timeWakeUp.hours.value(undefined);
				vm.currentQuestionnaire.values.userSleepData.timeWakeUp.minutes.value(undefined);
				vm.currentQuestionnaire.values.userSleepData.timeWakeUp.period.value(undefined);
			}
			return !noSleep;
		}, vm);

		return vm;
	}

	$.widget("wnp.sleepTrackerWidget", $.wnp.baseWidget, {
		_widgetClass: "sleepTrackerWidget",
		options: {
			// only one [data-view] may be displayed at a time
			// views are managed both from "this widget" and from "baseWidget" with:
			// baseWidget: this.addView, this.display
			initialView: "results-index",
			loadingSpinner: true
		},

		_fetchData: function () {
			var toolDataPromise = this.services.userSleepToolData.getUserData();
			var bundlePromise = this.services.resourceBundle.getResourceBundles(["common", "coachingTools", "sleepCoachingTool"]);
			var deferred = new $.Deferred();

			$.when(toolDataPromise, bundlePromise).done(function (toolDataResults, bundleData) {
				// TODO toolDataResults should not be an array but sometimes it is
				if (toolDataResults.length) {
					toolDataResults = toolDataResults[0];
				}
				toolDataResults = toolDataResults.userSleepToolData;

				deferred.resolve({
					results: toolDataResults,
					resourceBundle: bundleData
				});
			}).fail(function (response) {
				deferred.reject(response);
			});

			return deferred.promise();
		},

		_processData: function (data) {
			this.data = {
				textContent: data.resourceBundle.model
			};
			this.vm = new SleepTrackerViewModel(this, data);
		},

		_createDom: function () {
			this._setDom(templates.sleepTrackerWidget(this.data.textContent));
			this.vm.debugViews.initialize();
			this.display(this.options.initialView);

			ko.applyBindings(
				this.vm,
				this.element[0]
			);
		}
	});

	return function SleepTrackerWidget(target, options) {
		return $(target).sleepTrackerWidget(options).data("wnpSleepTrackerWidget");
	};
});
