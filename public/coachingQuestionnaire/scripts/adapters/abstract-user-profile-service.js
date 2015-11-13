define([
    'ember',
    'coachingQuestionnaire/scripts/models/user-profile-model',
    'coachingQuestionnaire/scripts/utils/errors/not-implemented-error'
  ], function(
    Ember,
    userProfileModel,
    NotImplementedError
  ) {
    'use strict';

    return Ember.Object.extend({
      debugLogging: false,
      userProfile: function(productName) {
        var _this, debugLogging;
        _this = this;
        debugLogging = this.get('debugLogging');

        if (debugLogging) {
          console.log("/userProfile Start");
        }

        return this._getUserProfile()
          .then(function(userProfileJSON) {
            var profileDataJSON, userProfile;
            profileDataJSON = userProfileJSON.retrieveUserProfileResponse;
            if (_this.doesExist(profileDataJSON) && profileDataJSON.userFound) {
              userProfile = userProfileModel.create({
                firstName: profileDataJSON.profileData.firstName,
                lastName: profileDataJSON.profileData.lastName
              });

              if (debugLogging) {
                console.log("/userProfile Complete");
              }

              return userProfile;
            }
            return null;
          });
      },

      // Abstract protected methods

      _getUserProfile: function() {
        throw NotImplementedError.create({
          className: this.constructor.toString(),
          methodName: "_getUserProfile"
        });
      }
    });
  }
);

