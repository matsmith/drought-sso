/*global ko*/
(function () {
	"use strict";

	/**
	 *
	 * @param {Object} validations a object containing validation options, including
	 *		numeric {bool} indicates the value must be a number
	 *		required {bool} indicates if the element must have a value,
	 *		corequired {Array} an array of InputModels, one of which must have a value
	 * @constructor
	 */
	function InputModel(validations) {
		var self = this;

		self.validations = $.extend({
			numeric: false,
			required: false,
			corequired: []
		}, validations);

		var internalValue = ko.observable("");
		self.isDirty = ko.observable(false);
		self.value = ko.computed({
			read: internalValue,
			write: function(val) {
				internalValue(val);
				self.isDirty(true);
			}
		});
		self.isInError = ko.computed(function() {
			return !self.isValid() && self.isDirty();
		}, null, { deferEvaluation: true });
	}
	InputModel.prototype.isValid = function() {
		var self = this;
		return this.validators.every(function(validator, idx) {
			return validator.call(self);
		});
	};
	InputModel.prototype.hasValue = function() {
		return this.value() !== "";
	};
	InputModel.prototype.validateNumeric = function() {
		if (this.validations.numeric) {
			return !isNaN(+this.value());
		}
		return true;
	};
	InputModel.prototype.validateRequired = function() {
		if (this.validations.required) {
			return this.hasValue();
		}
		return true;
	};
	InputModel.prototype.validateCorequired = function() {
		if (this.validations.corequired.length) {
			var thisIsRequired = this.hasValue();
			var othersAreRequired = this.validations.corequired.some(function(otherInput) {
				return otherInput.hasValue();
			});
			return thisIsRequired || othersAreRequired;
		}
		return true;
	};
	InputModel.prototype.addCorequired = function(otherInput) {
		this.validations.corequired.push(otherInput);
	};
	InputModel.prototype.validators = [
		InputModel.prototype.validateNumeric,
		InputModel.prototype.validateRequired,
		InputModel.prototype.validateCorequired
	];

	window.InputModel = InputModel;

}());
