/*global define*/
/*
 export provides
 $.modal widget
 ko modal binding
 */
define('modal', [
	'jquery',
	'knockout',
	'onWindowResize',
	'jquery-ui' // provides $.widget
], function($, ko, onWindowResize){
	"use strict";

	ko.bindingHandlers.modal = {
		update: function(element, valueAccessor, allBindingsAccessor) {

			var bindings = ko.unwrap(valueAccessor());
			var options = ko.unwrap(bindings.options) || {};
			options.show = bindings.show && bindings.show() || false;
			$(element).modal(options);
		}
	};

	var OVERLAY_BG = "rgba(0,0,0,0.85)";
	var OVERLAY_BG_TRANSPARENT = "rgba(0,0,0,0)";

	$.widget("wnp.modal", {
		options: {
			show: true,
			transition: ""
		},
		_create: function() {
			this.element.wrap("<div class='overlay container-fluid'></div>");
			this.overlay = this.element.parent();
			this.overlay.css({
				position: "fixed",
				top: 0,
				left: 0,
				padding: 0,
				width: $(window).width(),
				height: $(window).height()
			});
			this._originalOverflow = $("body").prop("style").overflowY;
			this.updateDisplay();
			this._resizeHandle = onWindowResize(this.resizeModal.bind(this));
		},
		_destroy: function() {
			this.overlay.children().unwrap();
			this.element.removeAttr("style");
			$("body").css({ overflowY: "" });
			$(window).off("resize", this._resizeHandle);
			this._superApply(arguments);
		},
		_showing: false,
		_originalOverflow: "",
		_setOptions: function(options) {
			this._super(options);

			if (this._showing !== ko.unwrap(options.show)) {
				this.updateDisplay();
			}
		},
		verticalPosition: function() {
			var marginTop = ($(window).height() - parseInt(this.element.css("height")))/2;
			this.element.css({marginTop: marginTop});
		},
		close: function() {
			// If the show option is a ko.observable
			if (this.options.show instanceof Function) {
				this.options.show(false);
			} else {
				this.options.show = false;
			}

			return this.updateDisplay();
		},
		updateDisplay: function() {
			var self = this;
			var showNow = ko.unwrap(this.options.show);

			if (showNow) {
				$("body").css({ overflowY: "hidden" });
			} else {
				$("body").css({ overflowY: this._originalOverflow });
			}

			this.overlay.css({"backgroundColor": OVERLAY_BG});
			this.element.css({marginTop: 0});

			if($(window).height() === parseInt(this.element.css("height"))) {
				this.overlay.css({"backgroundColor": OVERLAY_BG_TRANSPARENT});
			}

			this.resizeModal();

			var animationPromise;

			switch(this.options.transition) {
				case "slideTogether":
					animationPromise = this.transitions.slideTogether(showNow, this);
					break;
				default:
					animationPromise = this.overlay.toggle(showNow).promise();
			}
			animationPromise.done(function() {
				self.verticalPosition();
				self._showing = showNow;
			});
			return animationPromise;
		},
		resizeModal: function() {
			this.overlay.css({
				width: $(window).width(),
				height: $(window).height()
			});
		},
		transitions: {
			slideTogether: function(showNow, modal) {
				if (!showNow) {
					return this.slideApart(true, modal);
				}
				modal.element.children().css({ position: "relative" });
				var $leftSection = modal.element.children().first();
				var $rightSection = modal.element.children().last();

				$leftSection.css({ right: 10000 });
				$rightSection.css({ left: 10000 });

				var deferred = new $.Deferred();

				var animationDistance = $(window).width() - $leftSection.outerWidth();

				modal.element.css({ overflowX: "hidden" });
				modal.element.fadeIn().promise().done(function() {
					$leftSection.css({ right: animationDistance });
					$rightSection.css({ left: animationDistance });

					$.when(
						$leftSection.animate({ right: 0 }).promise(),
						$rightSection.animate({ left: 0 }).promise()
					).done(function() {
						$leftSection.css({ position: "", right: "" });
						$rightSection.css({ position: "", left: "" });
						modal.element.css({ overflowX: "" });
						deferred.resolve();
					});
				});

				return deferred.promise();
			},
			slideApart: function(hideNow, modal) {
				if (!hideNow) {
					return this.slideTogether(true, modal);
				}
				modal.element.children().css({ position: "relative" });
				var $leftSection = modal.element.children().first();
				var $rightSection = modal.element.children().last();

				modal.element.css({ overflowX: "hidden" });
				$leftSection.css({ right: 0 });
				$rightSection.css({ left: 0 });

				var deferred = new $.Deferred();

				var animationDistance = $(window).width() - $leftSection.outerWidth();

				$.when(
					$leftSection.animate({ right: animationDistance }).promise(),
					$rightSection.animate({ left: animationDistance }).promise()
				).done(function() {
					modal.element.fadeOut(function() {
						$leftSection.css({ position: "", right: "" });
						$rightSection.css({ position: "", left: "" });
						modal.element.css({ overflowX: "" });
						deferred.resolve();
					});
				});

				return deferred.promise();

			}
		}
	});
});
