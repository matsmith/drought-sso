define([
		'ember',
		'jquery',
		'coachingQuestionnaire/scripts/utils/question-answer-value-counter'
	], function(
		Ember,
		$,
		questionHasAnswerValues
	) {
		'use strict';

		return Ember.Component.extend({
			classNameBindings: ['mainClass', 'size', 'questionType'],
			mainClass: 'question-wrapper',
			size: Ember.computed.alias('question.size'),
			questionType: Ember.computed.alias('question.type'),
			isActualQuestion: function() {
				// The question wrapper also holds text display content item components.
				// This boolean indicates if the content item is actually a quesiton.
				return ['beginBumper', 'tailoredText', 'questionnaireComplete']
					.indexOf(this.get('questionType')) === -1;
			}.property('questionType'),
			attributeBindings: ['id:data-question-id','sectionId:data-section-id'],
			id: Ember.computed.alias('question.id'),
			sectionId: Ember.computed.alias('question.sectionId'),
			displayState: null,
			wrapperWidth: null,
			turnstile: 0,
			didInsertElement: function() {
				this.$().find(".viewstate-wrapper").initializeSlimScroll({height:'100%'})
					// The following modifications fix unexplained display issues
					.outerWidth('100%')
					.closest('.slimScrollDiv').css({ position: '' });
				var backgroundImage = this.get('question.backgroundImage');
				if (backgroundImage) {
					this.$().css('background-image', 'url(' + backgroundImage + ')');
				}
				Ember.run.scheduleOnce('afterRender', this, this.setWrapperWidth);
				Ember.run.scheduleOnce('afterRender', this, this._handleActiveChange, false);
				//make sure pre-populated answers are rendered right
				Ember.run.schedule('afterRender', this, this.resizeAnswerWrapper);
			},
			resizeAnswerWrapper: function() {
				var childElement, answerElement, noAnswerElement, noAnswerChildElement;
				answerElement = this.get('answerElement');
				childElement = answerElement.find('.answer-inner-wrapper');
				//ok we need to shrink the answerElement to make sure that everything is minimal
				//if a user selected like 15 multi selects then went back and deslected everything
				//so there was only one selection the old answer size would stay causing the single element
				//to be swiming in the middle of a huge answer element, causing the screen to appear blank
				//Addressing bug #CPUD-2228 and 2279
				$(answerElement).height('0px');

				//If the child element is bigger than the view-portal of the parent then we need to use
				//the child, otherwise keep the answer wraper the size of the parent, as it grows
				//during window resize
				if($(answerElement).parent().height() < childElement.height()) {
					$(answerElement).height(childElement.height());
				} else {
					$(answerElement).height('');
				}

				noAnswerElement = this.get('noAnswerElement');
				noAnswerChildElement = noAnswerElement.find('.no-answer-inner-wrapper');

				if($(noAnswerElement).parent().height() < noAnswerChildElement.height()) {
					$(noAnswerElement).height(noAnswerChildElement.height());
				} else {
					$(noAnswerElement).height('');
				}
			}.observes('windowManager.windowHeight'),
			setWrapperWidth: function() {
				this.set('wrapperWidth', this.$().find('> div:visible > div').innerWidth());
			},
			handleWindowWidthChange: function() {
				Ember.run.scheduleOnce('afterRender', this, this.setWrapperWidth);
			}.observes('windowManager.windowWidth'),
			isAnswered: function() {
				return questionHasAnswerValues(this.get('question')) &&
					!this.get('question.isPartiallyPrepopulated');
			}.property('question.userAnswers', 'question.isPartiallyPrepopulated'),
			isActiveObserver: function() {
				this._handleActiveChange(true);
			}.observes('question.active'),
			_handleActiveChange: function(animated) {
				var _this, previousState, newState, ticket;

				if (this.get('question.type') === 'beginBumper' ||
					this.get('question.type') === 'tailoredText') {
					return;
				}

				_this = this;
				previousState = this.get('displayState');

				if (this.get('question.active')) {
					newState = 'question';
				} else if (this.get('isAnswered')) {
					newState = 'answered';
				} else {
					newState = 'not-answered';
				}

				if (previousState === newState) {
					return;
				}

				this.set('turnstile', this.get('turnstile') + 1);
				ticket = this.get('turnstile');
				var answerElement = this.get('answerElement');
				var noAnswerElement = this.get('noAnswerElement');
				var questionElement = this.get('questionElement');
				var answerWrapper = $(answerElement).find('.answer-outer-wrapper');
				var noAnswerWrapper = $(noAnswerElement).find('.no-answer-outer-wrapper');
				if ((!this.doesExist(previousState) || previousState === 'question') && newState === 'answered') {
					answerElement.css({display: 'block'});
					answerWrapper.css({zIndex: 3})
						.animate({opacity: 1}, (animated) ? 400: 0, function() {
							if (_this.get('turnstile') === ticket) {
								questionElement.hide();
								noAnswerElement.hide();
								_this.resizeAnswerWrapper();
							}
						});
				} else if ((!this.doesExist(previousState) || previousState === 'question') && newState === 'not-answered') {
					noAnswerElement.css({display: 'block'});
					noAnswerWrapper.css({zIndex: 3})
						.animate({opacity: 1}, (animated) ? 400: 0, function() {
							if (_this.get('turnstile') === ticket) {
								questionElement.hide();
								answerElement.hide();
							}
							_this.resizeAnswerWrapper();
						});
				} else if (newState === 'question') {
					questionElement.show();
					if (!this.doesExist(previousState)) {
						answerElement.hide();
						noAnswerElement.hide();
					} else if (previousState === 'answered' ) {
						answerWrapper.animate({opacity: 0}, (animated) ? 400: 0, function() {
							answerElement.css({display: 'none'});
							answerWrapper.css({zIndex: -1});
							_this.get('answerElement').hide();
						});
					} else if (previousState === 'not-answered' ) {
						noAnswerWrapper.animate({opacity: 0}, (animated) ? 400: 0, function() {
							if (_this.get('turnstile') === ticket) {
								noAnswerElement.css({display: 'none'});
								noAnswerWrapper.css({zIndex: -1});
								noAnswerElement.hide();
							}
						});
					}
				}

				this.set('displayState', newState);
			},
			answerElement: function() {
				return this.$().find('.answer-outer-wrapper').closest('.slimScrollDiv');
			}.property(),
			noAnswerElement: function() {
				return this.$().find('.no-answer-outer-wrapper').closest('.slimScrollDiv');
			}.property(),
			questionElement: function() {
				return this.$().find('.question-component-wrapper');
			}.property(),
			actions: {
				answerQuestion: function() {
					this.sendAction('answerQuestion', this.get('question'));
				},
				getStarted: function( ){
					this.sendAction('getStarted');
				},
				navigate: function(direction){
					this.sendAction('navigate', direction);
				},
				answeredQuestion: function(userAnswer) {
					if(this.get('question.wasSubmitted')) {
						//set submission flag to prevent resubmission on multiple enter key strokes
						return;
					}
					var userAnswers;
					if (userAnswer instanceof Array) {
						userAnswers = userAnswer;
					} else {
						userAnswers = [ userAnswer ];
					}
					this.set('question.userAnswers', userAnswers);
					this.sendAction('answerQuestion', this.get('question'), userAnswers);
					this.set('question.wasSubmitted', true);
				},
				quit: function () {
					this.sendAction('quit');
				},
				submitQuestionnaire: function () {
					this.sendAction('submitQuestionnaire');
				}
			}
		});
	}
);
