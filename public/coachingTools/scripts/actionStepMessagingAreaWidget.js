/*global define*/
define('actionStepMessagingAreaWidget', [
	'jquery',
	'knockout',
	'coachingToolsTemplates',
	'actionStepCompletionOverlay',
	'skillDetail',
	'googleAnalytics',
	'baseWidget', // provides $.wnp.baseWidget
	'skillBaseTemplates', // provides the _trackYourHealth Handlebars partial
	'loaderSpinner'
], function($, ko, Templates, WnpActionStepCompletionOverlay,
		WnpSkillDetailWidget, gAnalytics) {
	"use strict";

	function ActionStepMessagingAreaViewModel(data, skillList, programName) {
		var self = this;

		this.message = ko.computed(function() {
			if (data.message) {
				return data.message;
			} else {
				if (data.actionStepModel) {
					return data.textContent.coachingTools.messageAreaMessageMissingMessage;
				} else {
					return data.textContent.coachingTools.messageAreaActionStepMissingMessage;
				}
			}
		});

		this.actionStep = ko.observable(data.actionStepModel);
		this.hasActionStep = ko.computed(function() {
			return !!self.actionStep();
		});

		if (this.actionStep()) {
			this.actionStep().skillName =
				ko.observable(data.skillModel && data.skillModel.displayName());
		}

		this.isTouch = ko.observable($('html').hasClass('touch'));

		this.programLongName = programName;

	}

	$.widget("wnp.actionStepMessagingAreaWidget", $.wnp.baseWidget, {
		_widgetClass: "actionStepMessagingAreaWidget",
		options: {
			initialView: "main",
			skillsList: [],
			programName: null,
			enrollmentId: null,
			loadingSpinner: true
		},
		_createDom: function() {
			this._log("ActionStepMessagingArea._create called", arguments);
			this._setDom(Templates.actionStepMessagingAreaWidget(this.data.textContent));
			this.setPrimaryViewModel(new ActionStepMessagingAreaViewModel(
				this.data,
				this.options.skillsList,
				this.companyConfig.features.ProductRenaming[this.options.programName+'LongName']
			));
			ko.applyBindings(this.primaryVm, this.element[0]);

			this._bindActionStepEvents();
			this._createActionStepCompletionOverlay();
			this._initTrackYourHealthCodeGen();
			this._bindSkillDetailCreation();
		},
		_beforeFetchData: function() {
			if (!this.options.enrollmentId) {
				throw "ActionStepMessagingAreaWidget requires an enrollmentId";
			}
			if (!this.options.programName) {
				throw "ActionStepMessagingAreaWidget requires a programName";
			}
		},
		_fetchData: function() {
			var userMessagePromise =
				this.services.userMessage.getUserMessage(this.options.enrollmentId);
			var bundlePromise = this.services.resourceBundle.getResourceBundles(
				["common","coachingTools", "skillDetail", "planGlobal"]);

			var deferred = new $.Deferred();
			$.when(userMessagePromise, bundlePromise)
				.done(function(userMessageData, bundleData) {
					var data = {
						message: userMessageData.message,
						actionStepId: userMessageData.actionStepId,
						resourceBundle: bundleData.model
					};
					deferred.resolve(data);
				}).fail(function(response) {
					deferred.reject(response);
				});

			return deferred.promise();
		},
		_processData: function(data) {
			var actionStepModel = null;
			var skillModel = null;

			this.options.skillsList.forEach(function(skill) {
				skill.actionSteps().forEach(function(actionStep) {
					if (actionStep.id() === data.actionStepId) {
						actionStepModel = actionStep;
						skillModel = skill;
					}
				});
			});

			this.data = {
				message: data.message,
				actionStepId: data.actionStepId,
				textContent: data.resourceBundle,
				actionStepModel: actionStepModel,
				skillModel: skillModel
			};
		},
		_bindActionStepEvents: function() {
			var self = this;

			this.element.find('[data-view=main]').on('click','[data-bindpoint=copyToDoList]', function() {
				var actionPromise = null;
				var actionStep = self.data.actionStepModel;

				if (actionStep.event() === actionStep.NOT_STARTED_ACTION_STEP_EVENT) {

					gAnalytics.track('messageAreaAddActionStep' + actionStep.id());
					actionPromise = self.services.actionStep.startActionStep(actionStep.id());

				} else if (actionStep.event() === actionStep.STARTED_ACTION_STEP_EVENT) {

					gAnalytics.track('messageAreaCompleteActionStep' + actionStep.id());
					actionPromise = self.services.actionStep.completeActionStep(actionStep.id())
						.done(function() {
							self.actionStepCompletionOverlay.show(self.data.skillModel, actionStep.id());
						});

				}
				if (actionPromise) {
					self._handleActionStepChangeResponse(actionPromise);
				}
			});

			this.element.on('click', '.actionStepRedo', function() {
				var actionStep = self.data.actionStepModel;
				gAnalytics.track('messageAreaRedoActionStep' + actionStep.id());
				var actionPromise = self.services.actionStep.startActionStep(actionStep.id());
				self._handleActionStepChangeResponse(actionPromise);
			});
		},
		_handleActionStepChangeResponse: function(promise) {
			var self = this;

			promise.done(function(response) {
				self.data.actionStepModel.event(response.model.actionStep.event);
			})
			.fail(function(response) {
				self._triggerGlobalFailure(response);
			});
		},
		_triggerGlobalFailure: function(response) {
			this.element.errorModal({
				textContent: this.data.textContent
			});
			this._log("Failure: "+response.responseDesc, arguments);
		},
		_createActionStepCompletionOverlay: function() {
			var self = this;

			this.actionStepCompletionOverlay =
				new WnpActionStepCompletionOverlay(
					this.element.find("[data-bindpoint='actionStepCompletionOverlay']"),
					{
						config: this.options.config,
						programName: this.options.programName,
						actions: [
							{
								buttonLabel: this.data.textContent.coachingTools.messageAreaAsCompletionOverlayCloseBtn,
								onClose: function() {}
							},
							{
								buttonLabel: this.data.textContent.coachingTools.messageAreaAsCompletionOverlayCloseAndSelectNewActionStepsBtn,
								onClose: function() {
									self._createSkillDetailWidget();
								}
							}
						]
					}
				);
		},
		_initTrackYourHealthCodeGen: function() {
			var self = this;

			this.element.on('click','.linkMobileBtn',function() {
				self.services.authorizationCode.requestAuthorizationCode()
					.done(function(response) {
						/* jshint camelcase: false */
						self.primaryVm.actionStep().linkCode(response.authorization_code);
						/* jshint camelcase: true */
					});
			});
		},

		_bindSkillDetailCreation: function() {
			var self = this;
			this.element.on("click", ".skillLink a", function() {
				self._createSkillDetailWidget();
			});
		},
		_createSkillDetailWidget: function(){
			WnpSkillDetailWidget = WnpSkillDetailWidget || require('skillDetail');
			var skillDetailRoot = $("<div>").appendTo("body");
			this.skillDetailWidget = new WnpSkillDetailWidget(
				skillDetailRoot, {
					openAtActionSteps: false,
					actionStepId: this.data.actionStepId,
					config: this.options.config,
					refreshOnClose: this.options.refreshOnClose
				}
			);
		}
	});

	return function ActionStepMessagingAreaWidget(target, options) {
		return $(target).actionStepMessagingAreaWidget(options).data("wnpActionStepMessagingAreaWidget");
	};

});
