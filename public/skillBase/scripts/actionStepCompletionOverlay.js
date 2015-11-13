/*global define*/
define('actionStepCompletionOverlay', [
	'jquery',
	'knockout',
	'skillModelFactory',
	'colorUtils',
	'skillBaseTemplates',
	'skillsAndActionSteps',
	'modernizr',
	'googleAnalytics',
	'onWindowResize',
	'baseWidget', // provides $.wnp.baseWidget
	'skillIcon', // provides $.skillIcon and ko skillIcon binding
	'modal', // provides $.modal and ko modal binding
	'slimScroll', // provides $.slimScroll
	'initializeSlimScroll' // initialize a slimScroll widget with app defaults
], function($, ko, skillModelFactory, colorUtils, templates, WnpSkillsAndActionStepsWidget, Modernizr,
		gAnalytics, onWindowResize){
	"use strict";

	function ActionStepCompletionViewModel(actions, programName, companyConfig) {
		this.showOverlay = ko.observable(false);
		this.skill = ko.observable(null); // shared skill model
		this.completedActionStep = ko.observable(null); // shared AS model
		this.hasCanvasSupport = ko.observable(Modernizr.canvas);
		this.theme = ko.observable(programName || "default");
		this.actions = actions || [];

		this.setTarget = function(skillModel, actionStepId) {
			var vm = this;

			var skillVm = skillModelFactory.createViewModel(skillModel);
			skillVm.hasCanvasSupport = ko.observable(Modernizr.canvas);
			skillVm.actionSteps.forEach(function(actionStep) {
				actionStep.ratedUp = ko.computed(function() {
					return actionStep.rating() === actionStep.THUMBS_UP;
				});
				actionStep.ratedDown = ko.computed(function() {
					return actionStep.rating() === actionStep.THUMBS_DOWN;
				});

				if (actionStep.id() === actionStepId) {
					vm.completedActionStep(actionStep);
				}
			});

			skillVm.primaryColor = ko.observable(
				colorUtils.getPrivateLabelColor(3, vm.theme(), companyConfig));

			this.skill(skillVm);
		};
	}

	$.widget("wnp.actionStepCompletionOverlay", $.wnp.baseWidget, {
		_widgetClass: "actionStepCompletionOverlay",
		options: {
			programName: "",
			/* actions must be an array of objects of the format
				{
					buttonLabel: "",
					onClose: f(skillModel, actionStepId)
				}
			*/
			actions: []
		},
		_fetchData: function() {
			return this.services.resourceBundle.getResourceBundles(
				["common", "planActionStepsPage"]
			);
		},
		_processData: function(data) {
			this.data = {
				textContent: data.model
			};
		},
		_fetchFail: function(response) {
			this._triggerGlobalFailure(response);
		},
		_triggerGlobalFailure: function(response) {
			this.element.errorModal({
				textContent: this.data.textContent
			});
			this._log("Failure: "+response.responseDesc, arguments);
		},
		_createDom: function() {
			this._setDom(templates.actionStepCompletionOverlay(this.data.textContent));
			this.setPrimaryViewModel(new ActionStepCompletionViewModel(
				this.options.actions, this.options.programName, this.companyConfig));
			ko.applyBindings(this.primaryVm, this.element[0]);

			this._bindRatingHandlers();
			this._bindCloseButtonHandlers();
		},
		_bindRatingHandlers: function() {
			var self = this;

			this.element.on("click", ".feedbackThumbs span", function() {
				var actionStepVm = self.primaryVm.completedActionStep();
				var thumbDirection = $(this).hasClass("thumbsUp") ?
					actionStepVm.THUMBS_UP : actionStepVm.THUMBS_DOWN;

				self.services.actionStep.rateActionStep(actionStepVm.id(), thumbDirection)
					.done(function(response) {
						self._log("POST action step rating succeeded", arguments);
						// Note: assumed analytics is already set up by parent widget
						gAnalytics.track('Rated'+actionStepVm.id());
						actionStepVm.rating(response.model.actionStep.rating);
					})
					.fail(function(response) {
						self._triggerGlobalFailure(response);
					});
			});
		},
		_bindCloseButtonHandlers: function() {
			var self = this;

			this.element.find(".actionButton").on("click", function() {
				self.primaryVm.showOverlay(false);
				// invoke the appropriate action function
				var idxSelection = $(this).data('action-idx');

					if(idxSelection === 0) {
						if (self.programName === 'assess') {
							var assessResultsRoute = self.skillModel.name().replace('Assess', '').replace('Skill', '').toLowerCase();
							return window.location.replace('/mhmsite/program/discovery#/categories/' + assessResultsRoute + '/results');
						}
						new WnpSkillsAndActionStepsWidget(
							$("<div data-wnpwidget-overlay>").appendTo("body"),
								{
									config: self.options.config,
									programName: self.programName
								}
						);
					}
			});
		},

		show: function(skillModel, actionStepId, programName) {
			this.skillModel = skillModel;
			this.actionStepId = actionStepId;
			this.primaryVm.setTarget(skillModel, actionStepId);
			this.primaryVm.showOverlay(true);
			this.programName = programName;
		}
	});

	return function WnpActionStepCompletionOverlayWidget(target, options) {
		return $(target).actionStepCompletionOverlay(options).data("wnpActionStepCompletionOverlay");
	};
});
