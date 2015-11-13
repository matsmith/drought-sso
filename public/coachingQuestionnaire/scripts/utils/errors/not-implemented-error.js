define([
    'coachingQuestionnaire/scripts/utils/errors/base-error'
  ], function(
    BaseError
  ) {
    'use strict';

    return BaseError.extend({
      className: null,
      methodName: null,

      init: function() {
        this._super(this.methodName + " must be implemented in " + this.className);
      }
    });
  }
);
