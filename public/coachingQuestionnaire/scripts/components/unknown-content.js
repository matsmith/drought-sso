define([
	'ember',
	'ember-i18n',
	'coachingQuestionnaire/scripts/components/abstract-question-base'
],
	function(
		Ember,
		I18n,
		AbstractQuestionBase
	) {
		'use strict';

		return AbstractQuestionBase.extend(I18n.TranslateableProperties, {
			didInsertElement: function() {
				var _this = this;

				this.$().find('form').submit(function(e) {
					e.preventDefault();

					_this.sendAction('navigate', 1);
				});
			},
			enableSubmitButton: function() {
				return true;
			},
			actions: {
				navigate: function(direction) {
					this.sendAction('navigate', direction);
				}
			}
		});
	}
);
