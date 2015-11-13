define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/adapters/abstract-user-profile-service'
	], function(
		$,
		Ember,
		AbstractUserProfileService
		) {
		'use strict';

		return AbstractUserProfileService.extend({
			// stub service properties
			testTimeout: null,
			userProfileError: null,
			// live service properties
			servicesManager: null,

			stubs: false,

			_getUserProfile: function() {
				if (this.get('stubs')) {
					return this._stubGetUserProfile();
				}
				return this._liveGetUserProfile();
			},
			_stubGetUserProfile: function() {
				var testTimeout, userProfileError;
				testTimeout = this.testTimeout || 0;
				userProfileError = this.get('userProfileError');
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("/stubs/userProfile/user_profile.json")
						.then(function(userProfile) {
							setTimeout(function() {
								if (userProfileError) {
									reject(userProfileError);
								} else {
									resolve(userProfile);
								}
							}, testTimeout);
						});
				});
			},
			_liveGetUserProfile: function() {
				return this.get('servicesManager').executeRequest('userprofile');
			}
		}).create({
			debugLogging: false,
			userProfileError: null
		});
	}
);
