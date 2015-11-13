/*global define*/
define('analytics', [], function(){
	'use strict';

	// Google Tag Manager

	return {
		initialize: function(googleTagManagerAccount) {
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer',googleTagManagerAccount);
		},

		setCategory: function(name) {
			dataLayer.push({customCategory: name});
		},

		setProgramName: function(name) {
			dataLayer.push({customAction: name});
		},

		setWnpAnalyticsAccount: function(id) {
			dataLayer.push({wnpAnalyticsAccount: id});
		},

		setCompanyAnalyticsAccount: function(id) {
			dataLayer.push({companyAnalyticsAccount: id});
		},

		pageView: function(path, title) {
			dataLayer.push({
				event: 'customPageView',
				customPath: path,
				customTitle: title
			});
		},

		event: function(name) {
			dataLayer.push({
				event: 'customEvent',
				customEvent: name
			});
		}
	};
});
