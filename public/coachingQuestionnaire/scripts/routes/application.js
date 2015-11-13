'use strict';

define([
	"ember"
], function(
	Ember
) {
	return Ember.Route.extend({
		actions: {
			openModal: function(modalName, controllerName) {
				this.controller.set("modalShowing", true);
				return this.render(modalName, {
					into: 'application',
					outlet: 'modal',
					controller: controllerName
				});
			},
			closeDialog: function() {
				this.controller.set("modalShowing", false);
				return this.disconnectOutlet({
					outlet: 'modal',
					parentView: 'application'
				});
			},
			retry: function() {
				this.get('previousTransition').retry();
			}
		}
	});
});
