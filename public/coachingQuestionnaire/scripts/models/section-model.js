define([
    'ember'
  ], function(
    Ember
  ) {
    'use strict';

    return Ember.Object.extend({
      id: null,
      name: null,
      backgroundImage: null,
      status: null,
      pageCount: null,
      completeFirst: null,
      firstPage: null,
      completedLocally: false,
      isActive: null,
      isComplete: function() {
        return this.get('status') === "COMPLETED" || this.get('completedLocally');
	  }.property('status', 'completedLocally'),
      lastPageId: function () {
        //FIXME This math is incorrect - it's an oversimplification
        return this.get('firstPage') + (10 * (this.get('pageCount') - 1));
      }.property('firstPage', 'pageCount')
    });
  }
);
