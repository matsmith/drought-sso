/*global define*/
/*
 export provides
 $.moreExpando widget
 ko moreExpando binding
 */
define('moreExpando', [
	'jquery',
	'knockout',
	'googleAnalytics',
	'jquery-ui' // provides $.widget
], function($, ko, gAnalytics){
	"use strict";

	ko.bindingHandlers.moreExpando = {
		update: function(element, valueAccessor, allBindingsAccessor) {

			var bindings = ko.unwrap(valueAccessor());
			// wait for internal content to render
			setTimeout(function() {
				$(element).moreExpando({
					isExpanded: bindings.isExpanded,
					textContent: bindings.textContent
				});
			}, 0);
		}
	};

	$.widget("wnp.moreExpando", {
		options: {
			isExpanded: true,
			textContent: { more: "", less: "" }
		},
		_create: function() {

			this.controlledContent = this.element.children();

			this.element.addClass("moreExpando");

			this.button = $("<button class='smallBtn'>");
			this.toggle = $("<div class='moreExpandoToggle'>")
				.css("position", "relative")
				.append("<hr>")
				.append(this.button)
				.insertAfter(this.element);

			this.setButtonText();
			this.updateDisplay(true);
			this.bindToggleEvent();
		},
		_destroy: function() {
			this.element.removeClass("moreExpando");
			this.element.css("height", "");
			this.toggle.remove();
			this._superApply(arguments);
		},
		_textTooShort: false,
		_isShowing: false,
		_setOptions: function(options) {
			this._super(options);
			if (this._textTooShort) {
				this._create();
			}
			this.updateDisplay();
		},
		updateDisplay: function(immediate) {
			var targetHeight;
			var duration = immediate ? 0 : 400;

			if (!this.hasExpandoContent()) {
				this.element.addClass("noExpandoContent");
				this.toggle.hide();
			} else {
				this.toggle.show();

				if (ko.unwrap(this.options.isExpanded)) {
					targetHeight = this.getExpandedHeight();
				} else {
					targetHeight = this.getCollapsedHeight();
				}

				this.element.animate({
					height: targetHeight
				}, duration, this.setButtonText.bind(this));
			}
		},
		setButtonText: function() {
			if (ko.unwrap(this.options.isExpanded)) {
				this.button.text("- " + this.options.textContent.common.less);
				this.element.css("height", "");
			} else {
				this.button.text("+ " + this.options.textContent.common.more);
			}
		},
		bindToggleEvent: function() {
			var self = this;

			this.button.on("click", function() {
				if (self.options.isExpanded instanceof Function) {
					self.options.isExpanded(!self.options.isExpanded());
				} else {
					self.options.isExpanded = !self.options.isExpanded;
				}
				self.updateDisplay();
				gAnalytics.track('MoreExpanded');
			});
		},
		getExpandedHeight: function() {
			return this.element[0].scrollHeight;
		},
		getCollapsedHeight: function() {
			return this.controlledContent[0].scrollHeight;
		},
		hasExpandoContent: function() {
			return this.controlledContent.length > 1;
		}
	});
});
