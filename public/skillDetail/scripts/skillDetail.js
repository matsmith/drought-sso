/*global define*/
define('skillDetail', [
	'jquery',
	'knockout',
	'colorUtils',
	'skillDetailTemplates',
	'actionStepCompletionOverlay',
	'skillModelFactory',
	'modernizr',
	'googleAnalytics',
	'onWindowResize',
	'SkillDetailViewModel',
	'baseWidget', // provides $.wnp.baseWidget
	'jquery-ui', // provides $.widget
	'skillIcon', // provides $.skillIcon and ko skillIcon binding
	'moreExpando', // provides $.moreExpando and ko moreExpando binding
	'errorModal', // provides $.errorModal
	'skillBaseTemplates' // provides the _accessibleSkillIcon Handlebars partial
], function(
	$,
	ko,
	colorUtils,
	templates,
	WnpActionStepCompletionOverlay,
	skillModelFactory,
	Modernizr,
	gAnalytics,
	onWindowResize,
	SkillDetailViewModel
) {
	"use strict";

	$.widget("wnp.skillDetail", $.wnp.baseWidget, {
		_widgetClass: "skillDetail",
		options: {
			textContent: null,
			programName: null,
			skillModel: null,
			openAtActionSteps: null,
			close: true,
			destroyContainer: true,
			initialView: 'skillDetailActionSteps'
		},
		data: {},
		actionStepsWithChangeInTransit: [],

		_setupAnalytics: function() {
			var programName = this.options.programName;
			/*jshint camelcase: false */
			var analyticsOptions = {
				default_action: programName,
				default_category: "SkillsAndActionSteps"
			};
			/*jshint camelcase: true */
			gAnalytics.init(analyticsOptions);
			gAnalytics.track('initSkill'+this.data.skill.id());
		},

		cleanAndDestroy: function() {
			ko.cleanNode(this.element[0]);
			this._destroy();
		},

		_beforeFetchData: function() {
			this._log("skillDetail._beforeFetchData called", arguments);
			this.initialLoadingSpinnerVisible = ko.observable(true);
			this._setDom(templates.skillDetailLoading());
			ko.applyBindings({ isVisible: this.initialLoadingSpinnerVisible }, this.element[0]);
		},

		// _fetchData: acquires data and content resources from the server
		// skillDetail can be launched with variable amounts of data available
		// this method performs the fewest necessary service calls to stand up this widget
		// must return a promise
		_fetchData: function() {
			var self = this,
				// the final data resolution promise that will be passed into self._processData
				fetchDataCompleteDeferred = new $.Deferred(),
				// the possible data options that may have been passed in
				// property names must match method names in populateData
				dataPromises = {},
				// methods to populate the missing data
				// method names must match property names in dataPromises
				populateData = {};

			function dataResolution () {
				$.when(
					dataPromises.enrollmentId,
					dataPromises.skillModel,
					dataPromises.programName,
					dataPromises.textContent
				).done(function (enrollmentId, skillModel, programName, resources) {
					fetchDataCompleteDeferred.resolve({
						skills: skillModel,
						resources: resources.model,
						programName: programName
					});
				});
			}

			// executes complex service construct organized by data name
			(function () {
				// data promises to be resolved in order to finish fetching data
				// dataPromises will be resolved with options passed in during widget instantiation
				// or dataPromises will be resolved with services and algorithms defined in populateData
				dataPromises = {
					currentQuestionnaire: new $.Deferred(),
					enrollmentId: new $.Deferred(),
					programName: new $.Deferred(),
					skillModel: new $.Deferred(),
					textContent: new $.Deferred()
				};

				function resolvePromises () {
					// resolve promises with old data if available or new data from service
					Object.keys(dataPromises).forEach(function (key) {
						if (self.options[key]) {
							dataPromises[key].resolve(self.options[key]);
						} else {
							populateData[key]();
						}
					});
				}

				// compareIds(skills): compares a skill model's skills IDs with the provided skill ID or action step ID
				// return the skill view model that is associated with the ID
				function compareIds (skills) {
					skills = skills.skills;

					return skills.filter(function (skill) {
						// determine which of the available skills is associated with this instance of skillDetail
						return skill.id() === self.options.skillId ||
							// If we could not match the skill ID. Check against the action step IDs.
							skill.actionSteps().filter(function (actionStep) {
								return actionStep.id() === self.options.actionStepId;
							})[0];
					})[0];
				}

				// methods to resolve the dataPromises of the same name
				populateData = {
					currentQuestionnaire: function () {
						$.when(
							self.services.availableProducts.getAvailableProducts()
						).done(function (products) {
							// search the available questionnaires for completed questionnaires
							var completedQuestionnaires;
							products = products.model;

							completedQuestionnaires = products.product.filter(function (prod) {
								// If this questionnaire is finished. Add it to the completedQuestionnaires
								return prod.questionnaire &&
									prod.latestProductEnrollment &&
									prod.productEnrollmentId &&
									prod.questionnaire.status.statusCode === 'QUESTIONNAIRE_FINISHED' &&
									prod.productType === 'SKILL';
							});

							completedQuestionnaires.forEach(function addSkillsToModel (prod) {
								// Get the skills for each complete questionnaire
								skillModelFactory.fetchSkillPlan(prod.productEnrollmentId).done(function matchProduct (skills) {
									if (compareIds(skills)) {
										dataPromises.currentQuestionnaire.resolve( prod );
									}
								});
							});
						});
					},
					enrollmentId: function () {
						$.when(
							dataPromises.currentQuestionnaire
						).done(function (currentQuestionnaire) {
							dataPromises.enrollmentId.resolve( currentQuestionnaire.productEnrollmentId );
						});
					},
					programName: function () {
						$.when(
							dataPromises.currentQuestionnaire
						).done(function (currentQuestionnaire) {
							dataPromises.programName.resolve( currentQuestionnaire.name );
						});
					},
					skillModel: function () {
						$.when(
							dataPromises.enrollmentId
						).done(function (enrollmentId) {
							$.when(
								skillModelFactory.fetchSkillPlan(enrollmentId)
							).done(function (skills) {
								var skillViewModel = skillModelFactory.createViewModel( compareIds(skills) );
								dataPromises.skillModel.resolve( skillViewModel );
							});
						});
					},
					textContent: function () {
						$.when(
							dataPromises.programName
						).done(function (programName) {
							self.services.resourceBundle.getResourceBundles(['common', 'skillDetail', 'planGlobal', programName+'ProgramListing', 'linkMobileAppActionSteps']).done(function (resources) {
								dataPromises.textContent.resolve( resources );
							});
						});
					}
				};

				resolvePromises();
			}());

			dataResolution();
			return fetchDataCompleteDeferred.promise();
		},

		_fetchFail: function(response) {
			this._triggerGlobalFailure(response);
		},
		_processData: function(data) {
			var self = this;
			self.options.programName = data.programName;
			self.data.textContent = data.resources;
			self.data.skill = data.skills;

			// Persist new skill change to "seen"
			if (!self.data.skill.seen()) {
				self.data.skill.seen(true);
				var postPromise = self.services.skill.postSkillSeen(
					self.data.skill.id(),
					self.data.skill.enrollmentId()
				);
				postPromise.done(function (response) {
					self._log("Persist new skill change to seen succeeded", arguments);
				}).fail(function (response) {
					self._log("Persist new skill change to seen failed", arguments);
				});
			}
		},
		_createDom: function() {
			this._setDom(templates.skillDetail(this.data.textContent));
			this.setPrimaryViewModel(new SkillDetailViewModel(this.data,
				this.options.programName, this.companyConfig));
			ko.applyBindings(this.primaryVm, this.element[0]);
			$(".loading").hide();

			this.modal = this.element.data("wnpModal");

			if (this.options.openAtActionSteps) {
				//TODO: handle section or actionStepId target
				this.primaryVm.activeView("skillDetailActionSteps");
			}

			//equalize tab widths
			var tabContainers = this.element.find('.tabContainer > .tabs');
			tabContainers.each(function(i, container) {
				var tabs = $(container).find('li');
				var tabWidth = $(container).width() / tabs.length;
				tabs.each(function(idx, tab) {
					$(tab).css('width',tabWidth);
				});
			});

			//Add the skillDetailActionSteps view
			var skillDetailActionStepsViewEl = $(templates.skillDetailActionSteps(this.data.textContent));
			this.addView(this.primaryVm, skillDetailActionStepsViewEl, "main");

			//Add the skillDetailLearnMore view
			var learnMoreViewEl = $(templates.skillDetailLearnMore(this.data.textContent));
			this.addView(this.primaryVm, learnMoreViewEl, "main");

			this._createActionStepCompletionOverlay();
			this._bindEvents();
			this._setupHeaderNavBar();
		},
		_createActionStepCompletionOverlay: function() {
			this.actionStepCompletionOverlay =
				new WnpActionStepCompletionOverlay(
					this.element.find("[data-eid='actionStepCompletionOverlay']"),
					{
						config: this.options.config,
						programName: this.options.programName,
						actions: [
							{
								buttonLabel: this.data.textContent.skillDetail.asCompletionOverlayCloseBtn,
								onClose: function() {}
							}
						]
					}
				);
		},

		_bindEvents: function() {
			var self = this;

			this.element.find(".closeBtn, .backBtn").on("click", function() {
				self.modal.close().done(function() {
					// why not just use self.destroy() provided by base widget
					self.cleanAndDestroy();
				});
			});

			//Switch to skillDetailLearnMore view
			this.element.find("[data-view=skillDetailActionSteps]").on("click", "[data-bindpoint=learnMoreBtn]", function() {
				self.primaryVm.activeView("skillDetailLearnMore");
				gAnalytics.track("LearnMore");
				self.display("skillDetailLearnMore",{
					out: [{
						elements: self.element.find('[data-view=skillDetailActionSteps] .leftTitleSection'),
						className: 'animation-fadeOut'
					},
					{
						elements: self.element.find('[data-view=skillDetailActionSteps] .mainContentSection'),
						className: 'animation-slideOutToRight'
					}],
					in: [{
						elements: self.element.find('[data-view=skillDetailLearnMore] .leftTitleSection'),
						className: 'animation-fadeIn'
					},
					{
						elements: self.element.find('[data-view=skillDetailLearnMore] .mainContentSection'),
						className: 'animation-slideInFromRight'
					}]
				});
				gAnalytics.track("Skill More info");
			});

			//Switch to skillDetailActionSteps view
			this.element.find("[data-view=skillDetailLearnMore]").on("click", "[data-bindpoint=closeDetail], [data-bindpoint=backToActionBtn]", function() {
				self.primaryVm.activeView("skillDetailActionSteps");

				self.element.find('video, audio').each(function() {
					$(this).get(0).pause();
				});

				self.display("skillDetailActionSteps",{
					out: [{
						elements: self.element.find('[data-view=skillDetailLearnMore] .leftTitleSection'),
						className: 'animation-fadeOut'
					},
					{
						elements: self.element.find('[data-view=skillDetailLearnMore] .mainContentSection'),
						className: 'animation-slideOutToRight'
					}],
					in: [{
						elements: self.element.find('[data-view=skillDetailActionSteps] .leftTitleSection'),
						className: 'animation-fadeIn'
					},
					{
						elements: self.element.find('[data-view=skillDetailActionSteps] .mainContentSection'),
						className: 'animation-slideInFromRight'
					}]
				});
			});

			this.element.on('click','.linkMobileBtn',function(event) {
				var $btn = $(event.currentTarget);
				var actionStepId = +($btn.closest('[data-actionstepid]').attr('data-actionstepid'));
				var actionStep = getActionStepModel(actionStepId, self.primaryVm);
				self.services.authorizationCode.requestAuthorizationCode().done(function(response) {
					/*jshint camelcase: false */
					actionStep.linkCode(response.authorization_code);
					/*jshint camelcase: true */
				});
			});

			this.element.on("mousedown", ".appleButton", function(event) {
				gAnalytics.track('TrackYourHealthAppleButton');
			});

			this.element.on("mousedown", ".googleButton", function(event) {
				gAnalytics.track('TrackYourHealthGoogleButton');
			});

			//Handles "Copy to My ToDo List" button
			this.element.find("[data-view=skillDetailActionSteps]").on("click",
				"[data-bindpoint=copyToDoList]",
				function() {
				var actionStepId = +($(this)
						.closest(".actionStepListHeading, .actionStepContent")
						.attr("data-actionStepId"));

					self._postActionStepStatusChange("NOT_STARTED", actionStepId);
					if ($(this).hasClass("actionStepStarted")) {
						self.actionStepCompletionOverlay.show(
							self.options.skillModel, actionStepId);
					}
					gAnalytics.track('Skill'+actionStepId+"StatusUpdated");
				}
			);

			//Redo action step
			this.element.find("[data-view=skillDetailActionSteps]").on("click",
				"[data-bindpoint=actionStepRedo]",
				function() {
				var actionStepId = +($(this)
						.closest(".actionStepListHeading, .actionStepContent")
						.attr("data-actionStepId"));

					self._postActionStepStatusChange("REDO", actionStepId);
					gAnalytics.track('Skill'+actionStepId+"StatusUpdated");
				}
			);

			//Google Analytics for "View this action step in My To Do List" button
			this.element.find("[data-view=skillDetailActionSteps]").on("click",
			"[data-bindpoint=viewToDoList]",
			function() {
				gAnalytics.track("viewActionInToDoList");
			});

			//On click, shows more than 3 action steps
			this.element.find("[data-view=skillDetailActionSteps]").on("click",
				"[data-bindpoint=showMore]",
				function() {
					$('.actionStepListItem:nth-child(n+4)').show();
					$('[data-bindpoint=showMore]').hide();
					$('[data-bindpoint=showLess]').show();
					gAnalytics.track('actionStepsExpanded');
				});

			//If there are 3 or less actionSteps, don't display show/hide buttons
			var numberOfActionStepDivs = $("div.actionStepListItem").length;
			if(numberOfActionStepDivs <= 3) {
				$('[data-bindpoint=showLess]').hide();
				$('[data-bindpoint=showMore]').hide();
			}
			//On click, hide anything greater than 3 action steps
			this.element.find("[data-view=skillDetailActionSteps]").on("click",
				"[data-bindpoint=showLess]",
				function() {
					$('.actionStepListItem:nth-child(n+4)').hide();
					$('[data-bindpoint=showLess]').hide();
					$('[data-bindpoint=showMore]').show();
				});

			this._initTabContainers();
			this._initAccordionContainers();

			//On click, expand/retract mobile accordion
			$(".actionStepListHeading").on("click", function(){
				if( $(window).width() < 768 ){
					$(this).next().slideToggle();
					$(this).children(".icon-sans-chevron").toggleClass("up down");
				}
			});

			this._startMediaPlayers();
		},
		_initTabContainers: function() {
			var self = this;
			this.element.find(".tabs > li[data-itemIndex]").on("click", function() {
				$(this).siblings().each(function() {
					var siblingIndex = $(this).attr("data-itemIndex");
					// don't show the other tabs
					self.primaryVm.showItem[siblingIndex](false);
				});
				var itemIndex = $(this).attr("data-itemIndex");
				// show the tab that was clicked
				self.primaryVm.showItem[itemIndex](true);
			});
		},
		_initAccordionContainers: function() {
			var self = this;
			this.element.find(".accordionSection[data-itemIndex]")
				.on("click", ".accordionHeading", function(evt) {
					evt.stopPropagation(); // So sub-accordions don't toggle twice
					var accordionSection = $(this).closest(".accordionSection");
					accordionSection.siblings().each(function() {
						var siblingIndex = $(this).attr("data-itemIndex");
						// don't show the other accordion sections
						self.primaryVm.showItem[siblingIndex](false);
					});
					var itemIndex = accordionSection.attr("data-itemIndex");
					// toggle the accordion section that was clicked
					var currentDisplayValue = self.primaryVm.showItem[itemIndex]();
					self.primaryVm.showItem[itemIndex](!currentDisplayValue);
				});
		},
		_startMediaPlayers: function() {
			var self = this;
			this.element.find("[data-mediaIndex]").on("click", function(){
				if (!$(this).parent().hasClass("playing")){
					var mediaIndex = $(this).attr("data-mediaIndex");
					var type = self.primaryVm.mediaList[mediaIndex].type;
					var url = self.primaryVm.mediaList[mediaIndex].url;
					var urlFilename = url.substr(0,url.lastIndexOf('.'));
					var html;

					if (type === "video" || type === "hdvideo"){
						html="<video controls autoplay>" +
							"<source src='" + url + "' />" +
							"<source src='" + urlFilename + ".webm' type='video/webm' />" +
							"<source src='" + urlFilename + ".ogg' type='video/ogg' />" +
							// TODO: replace unsupported+download message with language resource
							"Your browser does not support playback of this media. " +
							"<a href='" + url + "'>" +
							"Click here to download the media.</a>" +
							"</video>";
					} else if (type === "audio") {
						html = "<audio controls autoplay>" +
							"<source src='" + url + "'>" +
							// TODO: replace unsupported+download message with language resource
							"Your browser does not support playback of this media. " +
							"<a href='" + url + "'>" +
							"Click here to download the media.</a>" +
							"</audio>";
					}
					$(this).html(html);
					$(this).parent().addClass("playing");
				}
			});
		},
		_setupHeaderNavBar: function() {
			var target = $("<div></div>");
			var WnpHeaderNavigationBar = require('headerNavigationBar');
			this.element.prepend(target);
			this.headerNavBar = new WnpHeaderNavigationBar(target, {
				config: this.options.config,
				debug: this.options.debug,
				widgetTitle: this.companyConfig.features.ProductRenaming[this.options.programName+"LongName"]
			});
		},
		_postActionStepStatusChange: function(actionStepEvent, actionStepId) {
			if (this.actionStepsWithChangeInTransit.indexOf(actionStepId) !== -1) {
				return;
			}
			var self = this;
			var actionStepModel = getActionStepModel(actionStepId, this.primaryVm);
			var actionStepService = this.services.actionStep;
			var actionPromise = null;
			switch(actionStepEvent) {
				case "NOT_STARTED":
					actionPromise = actionStepService.startActionStep(actionStepId);
					gAnalytics.track('Skill'+actionStepId+"Add");
					break;
				case "REDO":
					actionPromise = actionStepService.startActionStep(actionStepId);
					gAnalytics.track('Skill'+actionStepId+"Redo");
					break;
				case "REMOVE":
					actionPromise = actionStepService.removeActionStep(actionStepId);
					gAnalytics.track('Skill'+actionStepId+"Removed");
					break;
				case "STARTED":
					actionPromise = actionStepService.completeActionStep(actionStepId);
					gAnalytics.track('Skill'+actionStepId+"Complete");
					break;
				default:
					actionPromise = new $.Deferred();
					actionPromise.reject({responseDesc:"Invalid Action"});
					break;
			}
			this.actionStepsWithChangeInTransit.push(actionStepId);
			actionPromise.done(function(response) {
				response = response.model;
				self._log("POST action step status change succeeded", arguments);
				actionStepModel.event(response.actionStep.event);
			}).fail(function(response) {
				self._triggerGlobalFailure(response);
			}).always(function() {
				var idx = self.actionStepsWithChangeInTransit.indexOf(actionStepId);
				self.actionStepsWithChangeInTransit.splice(idx, 1);
			});
		},
		_triggerGlobalFailure: function(response) {
			this.element.errorModal({
				textContent: this.data.textContent
			});
			this._log("Failure: "+response.responseDesc, arguments);
		},
		_initialize: function() {
			this._superApply(arguments);
		}
	});


	function getActionStepModel(actionStepId, source) {
		var matchedActionStep = null;
		source.actionSteps.forEach(function(actionStep) {
			if (actionStep.id() === actionStepId) {
				matchedActionStep = actionStep;
			}
		});
		return matchedActionStep;
	}

	return function WnpSkillDetailWidget(target, options) {
		return $(target).skillDetail(options).data("wnpSkillDetail");
	};

});
