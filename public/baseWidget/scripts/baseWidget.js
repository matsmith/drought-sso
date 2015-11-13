/*global define, environment*/
define('baseWidget', [
	'jquery',
	'knockout',
	'wnpServices',
	'modernizr',
	'jquery-ui', // import provides $.widget
	'es5-shim'
], function ($, ko, wnpServices, Modernizr) {
	"use strict";

	function Viewport(el) {
		var self = this;
		this.currentView = "";
		this.$el = $(el);
		this.name = this.$el.attr("data-viewport");
		this.getNotFoundFallback = function () {
			return this.$el.attr("data-viewport-404") || this.FALLBACK_EMPTY;
		};

		this.display = function (viewName) {
			var targetViewSelector = "[data-view=" + viewName + "]";

			var targetView = self.$el.children(targetViewSelector);
			var otherViews = self.$el.children("[data-view]").not(targetViewSelector);
			var notFoundFallback = self.getNotFoundFallback();

			if (targetView.length) {
				otherViews.css("display", "none");
				self.$el.children(targetViewSelector).css("display", "");
			} else if (notFoundFallback === self.FALLBACK_EMPTY) {
				otherViews.css("display", "none");
			} else if (notFoundFallback === self.FALLBACK_REMAIN) {
				// do nothing
			} else {
				otherViews.css("display", "none");
				self.$el.children("[data-view=" + notFoundFallback + "]")
					.css("display", "");
			}
			//mouseover event tells slimScroll to update it's size and display the sliderBar
			self.$el.trigger('mouseover').trigger('mouseout');
		};

		this.setNotFoundFallback = function (fallback) {
			self.notFoundFallback = fallback;
		};
	}

	Viewport.prototype.FALLBACK_EMPTY = "empty";
	Viewport.prototype.FALLBACK_REMAIN = "remain";

	$.widget("wnp.baseWidget", {
		options: {
			config: {
//				authToken: "",
//				authTokenType: "",
//				refreshToken: "",
//				refreshAuthHeader: "",
//				locale: "en_US",
//				wnpSessionId: "",
//				serviceBaseUrl: null,
//				debug: false,
//				stubs: false
			},
			configOverride: "error",
			initialView: "",
			destroyContainer: false,
			classNames: "",
			onDestroy: $.noop,
			loadingSpinner: false
		},
		/**
		 * Do not extend/overwrite _create. Instead use _beforeFetchData
		 * and/or _createDom.
		 * @private
		 */
		_create: function () {
			this._log("baseWidget._create called", arguments);
			var self = this;
			this.element.addClass(this.options.classNames);

			this.container = this.element;
			this.container.attr("data-wnpwidget-container", this._widgetClass);

			this.options.config = wnpServices.mergeSharedConfig(
				this.options.config, this.options.configOverride);
			this.services = wnpServices.initializeServices(this.options.config);

			try {
				this._beforeFetchData();
			} catch (e) {
				this._log("Exception in _beforeFetchData, widget creation cancelled");
				this._log(e);
				this._destroy();
				return;
			}

			this._setupLoadingSpinner();

			$.when(
				this.services.companyConfig.getCompanyConfig()
			).done(function (companyConfig) {
					self.companyConfig = companyConfig.model;

					$.when(
						self._fetchData()
					).done(function (data) {
							self._log("_fetchData success called", arguments);
							self._injectCompanyConfigStylesheet();
							self._processData(data);
							self._tearDownLoadingSpinner();
							self._createDom();
							self._initialize();
							self._isCreated = true;
						}).fail(function (response) {
							self._log("_fetchData error called", arguments);
							self._fetchFail(response);
						});

				}).fail(function (response) {
					self._log("Error retrieving company configurations", arguments);
					self._fetchFail(response);
				});
		},
		/**
		 * Do not extend/overwrite _init. Use _initialize instead.
		 * @private
		 */
		_init: function () {
			this._log("baseWidget._init called", arguments);
			if (this._isCreated) {
				this._initialize();
			}
		},
		/**
		 * When subclassing, call _superApply at the end of subclass _destroy
		 * @private
		 */
		_destroy: function () {
			this._log("baseWidget._destroy called", arguments);
			// Put the element back, so jquery widgetfactory can do its cleanup
			this.element = this.container;
			this.element.empty();
			this.element.removeAttr("data-wnpwidget-container");

			var container = this.container;

			if (this.options.destroyContainer) {
				// Wait until jqw is done destroying
				setTimeout(function () {
					container.remove();
				}, 0);
			}
			this.options.onDestroy();
		},
		_setOption: function (key, value) {
			this._log("baseWidget._setOption called", arguments);
		},
		_setOptions: function (options) {
			this._log("baseWidget._setOptions called", arguments);
		},

		// Non-jqueryWidgetFactory properties/API functions
		_widgetClass: "baseWidget",
		_log: function (msg, args) {
			if (this.options.config.debug && console) {
				console.log(this._widgetClass.toUpperCase() + ":", msg);

				if (this.options.config.debug === "verbose") {
					console.log(args);
				}
			}
		},
		/**
		 * This function is called once on creation, prior to _fetchData. It has
		 * no inherent functionality and should be overwritten in subclasses.
		 * _superApply should not be called on it. If it throws an exception,
		 * the widget's load will be cancelled and the widget will be destroyed.
		 * @private
		 */
		_beforeFetchData: function () {
			this._log("baseWidget._beforeFetchData called", arguments);
		},
		/**
		 * This function is called once on creation, and must return a
		 * $.Deferred.promise(). It should be overwritten in subclasses and
		 * _superApply should not be called on it.
		 * @returns {$.Promise}
		 * @private
		 */
		_fetchData: function () {
			this._log("baseWidget._fetchData called", arguments);
			// The baseWidget doesn't require any data, so resolve the promise immediately
			var deferred = new $.Deferred();
			deferred.resolve();
			return deferred.promise();
		},
		/**
		 * This function is called when _fetchData fails. It should be overwritten
		 * is subclasses.
		 * _superApply should not be called on it.
		 * @param response
		 * @private
		 */
		_fetchFail: function (response) {
			this._log("baseWidget._fetchFail called", arguments);
		},
		/**
		 * This function is called after data has been successfully fetch.
		 * It should do any and all post-processing and storage of data.
		 * _superApply should not be called in it, it should be completely overwritten.
		 * @param data
		 * @private
		 */
		_processData: function (data) {
			this._log("baseWidget._processData called", arguments);
			this.data = data;
		},
		/**
		 * This function is called once on creation, after data has been
		 * fetched and processed. It should create the DOM elements for the
		 * widget, do any decoration, and call _setDom. It should also create
		 * the viewModel(s) and call ko.applyBindings.
		 * _superApply should not be called on it.
		 * @private
		 */
		_createDom: function () {
			this._log("baseWidget._createDom called", arguments);
			this._setDom($("<div>"));
		},
		/**
		 * This function appends the widget DOM fragment to the widget's container
		 * and updates the widget's .element. It also inits the viewports.
		 * @param dom
		 * @private
		 */
		_setDom: function (dom) {
			this._log("baseWidget._setDom called", arguments);
			dom = $(dom);
			dom.attr("data-wnpwidget", this._widgetClass);
			this.container.append(dom);
			this.element = dom;
			this._initViewports();
		},
		/**
		 * Scans the DOM for viewports and creates and sets up viewport objects
		 * @private
		 */
		_initViewports: function () {
			var self = this;

			this.viewportList = [];
			this.element.find("[data-viewport]").each(function (idx, el) {
				self.viewportList.push(new Viewport(el));
			});
			this.viewportList.getByName = function (name) {
				return this.filter(function (viewport) {
					return viewport.name === name;
				})[0];
			};
		},
		/**
		 * This function is called whenever _init is called, except when data
		 * is being loaded, in which case it is called after data is fetched
		 * and the template is created.
		 * _superApply should be called at the beginning of an overriding function
		 * @private
		 */
		_initialize: function () {
			this._log("baseWidget._initialize called", arguments);
			this.activeView = this.options.initialView;
			this.display(this.activeView);
		},

		_bindView: function (viewSpecificVm, viewEl, targetViewport) {
			this._log("baseWidget._bindView called", arguments);
			// Merge the view-specific vm with the primary vm
			var hybridVm = $.extend({}, this.primaryVm, viewSpecificVm);
			// Bind the new vm
			ko.applyBindings(hybridVm, $(viewEl)[0]);
			// This gives access to the properties from the primaryVm as well
			// as the specificVm in the bindings on the view
		},

		/**
		 * This function looks for a private label stylesheet and injects it
		 * into the page if it isn't already there.
		 * @private
		 */
		_injectCompanyConfigStylesheet: function () {
			var privateLabelCssConfig = this.companyConfig.features.PrivateLabelCss;
			var privateLabelCssPath = privateLabelCssConfig && privateLabelCssConfig.PrivateLabelCss;
			if ($("[data-wnpprivatelabelstyles]").length || !privateLabelCssPath) {
				return;
			}

			// Private label css paths may start with an inaccurate "media/"
			// that drupal requires we not fix elsewhere.
			var mediaServerCssPathCollision = "media/";
			if (privateLabelCssPath.indexOf(mediaServerCssPathCollision) === 0) {
				privateLabelCssPath = privateLabelCssPath.slice(mediaServerCssPathCollision.length);
			}
			var stylesheetPath = environment.mediaserver + privateLabelCssPath;

			var stylesheetLinkEl = document.createElement("link");
			stylesheetLinkEl.setAttribute("rel", "stylesheet");
			stylesheetLinkEl.setAttribute("type", "text/css");
			stylesheetLinkEl.setAttribute("href", stylesheetPath);
			stylesheetLinkEl.setAttribute("data-wnpprivatelabelstyles", "");

			$("head")[0].appendChild(stylesheetLinkEl);
		},

		_setupLoadingSpinner: function () {
			if (!this.options.loadingSpinner) {
				return;
			}

			this.container.addClass("loading");

			var spinnerSize = this.options.loadingSpinner;
			var sizingOpts = "";
			if (typeof spinnerSize === "number") {
				var strokeWidth = Math.floor(Math.max(2, Math.min(5, spinnerSize / 10)));
				sizingOpts +=
					", width: " + spinnerSize +
					", height: " + spinnerSize +
					", strokeWidth: " + strokeWidth;
			}
			var loaderBindStr = "{ loader: { isVisible: isVisible" + sizingOpts + " } }";

			this.loadingSpinner = $("<div></div>")
				.attr("data-bind", loaderBindStr)[0];

			this.container.append(this.loadingSpinner);
			ko.applyBindings({
				isVisible: ko.observable(true)
			}, this.loadingSpinner);

		},
		_tearDownLoadingSpinner: function () {
			if (!this.options.loadingSpinner) {
				return;
			}

			this.container.removeClass("loading");
			ko.removeNode(this.loadingSpinner);
			delete this.loadingSpinner;
		},

		//////////////////////
		// Public functions //
		//////////////////////
		/**
		 * Sets the primary viewModel. The primary viewModel is merged with
		 * each view's viewModel before bindings are applied for views that
		 * have their own viewModel.
		 * @param vm
		 */
		setPrimaryViewModel: function (vm) {
			this.primaryVm = vm;
		},

		addView: function (viewSpecificVm, viewEl, viewportName) {
			// Make sure the view element is a dom fragment, and not just an html string
			viewEl = $(viewEl);

			var targetViewport = this.viewportList.getByName(viewportName);
			if (targetViewport) {
				this._bindView(viewSpecificVm, viewEl, targetViewport);
				$(targetViewport.$el).append(viewEl);
			}
		},

		changeView: function (viewName) {
			this.activeView = viewName;

			this.viewportList.forEach(function (viewport) {
				viewport.display(viewName);
			});
		},


		/**
		 Transition Object Example
		 {
			 // Out is applied before the display changes
			out:[{
				elements: #a jQuery selected dom list,
				className: 'string matching a animation class in _viewAnimations.scss'
			}],
			in:[
				// Same as out, but this is applied AFTER the display changes
			]
		}
		 **/

		display: function (viewName, transitions) {
			if (!transitions || !Modernizr.csstransitions) {
				this.changeView(viewName);
			} else {
				this.animateOut(viewName, transitions);
			}
		},
		animateOut: function (viewName, transitions) {
			var self = this;

			if (transitions.out && transitions.out.length) {
				var currentlyAnimating = self.addAnimationClassesAndListeners(transitions.out);

				$.when.apply($, currentlyAnimating).done(function () {
					self.animateIn(viewName, transitions);
				});

			} else {
				this.animateIn(viewName, transitions);
			}
		},
		animateIn: function (viewName, transitions) {
			//change view
			this.changeView(viewName);

			if (!transitions.in && !transitions.in.length) {
				return;
			}

			this.addAnimationClassesAndListeners(transitions.in);

		},
		addAnimationClassesAndListeners: function (transitions) {
			var self = this;
			var currentlyAnimating = [];
			transitions.forEach(function (transition) {
				// track all ongoing animations
				var deferred = new $.Deferred();
				currentlyAnimating.push(deferred);

				transition.elements.each(function () {
					if ($(this).css('display') === 'none') {
						self._log('Elements with displays of none will not animate! Use visibilty:hidden; position:absolute; instead!');
					}
				});

				deferred.done(function () {
					self.animationListener(false, transition.elements);
				});
				self.animationListener(true, transition.elements, deferred);

				transition.elements.removeClass(function (index, css) {
					return (css.match(/(^|\s)animation-\S+/g) || []).join(' ');
				}).addClass(transition.className);
			});

			return currentlyAnimating;
		},
		animationListener: function (bind, elements, promise) {
			["webkit", "moz", "MS", "o", ""].forEach(function (prefix) {
				var eventType = (prefix) ? 'AnimationEnd' : 'animationend';
				if (bind) {
					elements.on(prefix + eventType, function () {
						promise.resolve();
					});
				} else {
					elements.off(prefix + eventType);
				}
			});
		},
		print: function () {
			window.print();
		}
	});

	return function WnpBaseWidget(target, options) {
		return $(target).baseWidget(options).data("wnpBaseWidget");
	};
});
