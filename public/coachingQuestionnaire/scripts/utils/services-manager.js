define([
    'jquery',
    'ember'
  ], function(
    $,
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      authToken: null,
      refreshToken: null,
      correlationId: null,
      baseUrl: '/externalservices/',
      authType: null,
      refreshAuthHeader: null,
      executeRequest: function(url, urlParameters, postData) {
        var _this;
        _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          _this._executeRequest(url, urlParameters, postData, resolve, reject);
        });
      },
      _executeRequest: function(url, urlParameters, postData, resolve, reject) {
        var _this, isPost;
        _this = this;
        isPost = this.doesExist(postData);
        $.ajax({
          type: isPost ? 'POST' : 'GET',
          url: _this.get('baseUrl') + url,
          headers: {
            "Accept": "application/json",
            "Content-Type": isPost ? "application/json" : "application/x-www-form-urlencoded",
            "Authorization": _this.get('authType') + " " + _this.get('authToken'),
            "CorrelationId": _this.get('correlationId'),
            "TransactionId": $.now()
          },
          traditional: true,
          processData: !isPost,
          data: isPost ? JSON.stringify(postData) : urlParameters
        }).then(resolve, function(jqXHR, textStatus, errorThrown) {
          if (401 === jqXHR.status) {
            _this._refreshAuthToken(url, urlParameters, postData, resolve, reject);
          } else {
            reject(new Error(errorThrown));
          }
        });
        $("body").trigger("updateActivityTimeout");
      },
      _refreshAuthToken: function(url, urlParameters, postData, resolve, reject) {
        var _this;
        _this = this;
        $.ajax({
          type: 'POST',
          url: _this.get('baseUrl') + 'security/oauth/token',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": _this.get('refreshAuthHeader')
          },
          processData: false,
          data: "refresh_token=" + _this.get('refreshToken') +  "&grant_type=refresh_token"
        }).then(function(authResultJSON) {
          /* jshint camelcase: false */
          _this.set('authToken', authResultJSON.access_token);
          _this.set('refreshToken', authResultJSON.refresh_token);
          /* jshint camelcase: true */
          _this._executeRequest(url, urlParameters, postData, resolve, reject);
        }, function(jqXHR, textStatus, errorThrown) {
          reject(new Error(errorThrown));
        });
      }
    });
  }
);
