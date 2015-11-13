/*global define */
define('colorUtils', [
], function () {
	"use strict";

	function colorComponentToHex(c) {
		var hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}

	return {
		rgbToHex: function(r, g, b) {
			return "#" +
				colorComponentToHex(r) +
				colorComponentToHex(g) +
				colorComponentToHex(b);
		},
		getPrivateLabelColor: function(idx, theme, companyConfig) {
			if (!companyConfig) {
				return;
			}

			var themeColorProp = theme + "CustomColor" + idx;
			var themeColor = companyConfig.features.PrivateLabelCustomColor ?
				companyConfig.features.PrivateLabelCustomColor[themeColorProp] : "";

			if (themeColor && themeColor.indexOf("#") !== 0) {
				themeColor = "#" + themeColor;
			}

			return themeColor;
		}
	};

});
