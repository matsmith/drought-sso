define([
		'ember',
		'moment',
		'coachingQuestionnaire/scripts/models/questionnaire-model',
		'coachingQuestionnaire/scripts/adapters/configurable-questionnaire-service',
		'coachingQuestionnaire/scripts/adapters/section-serializer',
		'coachingQuestionnaire/scripts/adapters/questionnaire-page-serializer',
		'coachingQuestionnaire/scripts/adapters/page-content-serializer',
		'coachingQuestionnaire/scripts/models/page-content-model',
		'coachingQuestionnaire/scripts/utils/question-answer-value-counter',
		'googleAnalytics',
		'jquery',
		'coachingQuestionnaire/scripts/utils/loading-widget'
	], function (Ember,
                 Moment,
                 QuestionnaireModel,
                 QuestionnaireServiceInstance,
                 SectionSerializer,
                 QuestionnairePageSerializer,
                 PageContentSerializer,
                 PageContentModel,
                 questionHasAnswerValues,
                 gAnalytics,
                 $,
                 loadingWidget) {
		'use strict';

		return Ember.ObjectController.extend({
			needs: [
				'application',
				'errorDialog',
				'saveErrorDialog',
				'questionnaireLandingDialog'
			],
			errorDialogController: Ember.computed.alias("controllers.errorDialog"),
			saveErrorDialogController: Ember.computed.alias("controllers.saveErrorDialog"),
			questionnaireLandingDialogController: Ember.computed.alias("controllers.questionnaireLandingDialog"),
			previousContentItemIndex: -1,
			currentContentItemIndex: 0,
			currentPageId: 10,
			contentItems: [],
			userDataRecorders: [],
			transitionInProgress: false,
			completePageContentItem: null,

			/**
			 * During the process cycle wherein the section has just been
			 * changed currentSection will refer to the new section and this
			 * property will refer to the previous section. See
			 * this.handleEndOfSection().
			 */
			previousSectionDuringTransition: null,

			isQuestionnaireComplete: function () {
				return this.get('completePageContentItem') !== null;
			}.property('completePageContentItem'),
			navDisplaySections: function () {
				var sections = this.get('model.sections');
				var firstSection = sections[0];
				if (firstSection.get('completeFirst') && !firstSection.get('isComplete')) {
					return [firstSection];
				}
				return sections;
			}.property('model.sections'),

			activeSectionIndex: function () {
				var i, iMax, sections;
				sections = this.get('sections');
				for (i = 0, iMax = sections.length; i < iMax; i++) {
					if (sections[i].get('isActive')) {
						return i;
					}
				}
				return sections.length - 1;
			}.property('sections.@each.isActive'),

			currentSection: function () {
				return this.get('sections').filter(function (section) {
					return section.get('isActive') && section.id;
				})[0];

			}.property('sections.@each.isActive'),
			retakeDialogShowing: function () {
				return this.get('retakeAvailable') &&
					this.get('controllers.application.modalShowing');
			}.property('retakeAvailable', 'controllers.application.modalShowing'),

			submitButtonDomId: function () {
				var contentItemIndex = this.get('currentContentItemIndex');
				return "submit-button-id-" + this.get('contentItems')[contentItemIndex].id;
			}.property('currentContentItemIndex'),

			bumperContinueButtonDomId: function () {
				return "continue-button-id-" + this.get('sections')[this.get('activeSectionIndex')].get('id');
			}.property('activeSectionIndex'),

			bumperBackButtonDomId: function () {
				return "bumper-back-button-id-" + this.get('sections')[this.get('activeSectionIndex')].get('id');
			}.property('activeSectionIndex'),

			backButtonDomId: function () {
				var contentItemIndex = this.get('currentContentItemIndex');
				return "question-back-button-id-" + this.get('contentItems')[contentItemIndex].id;
			}.property('currentContentItemIndex'),

			init: function () {
				this._super();
				Ember.run.scheduleOnce('sync', this, this.loadContentItems);
				Ember.run.scheduleOnce('afterRender', this, this.showLandingModal);
				Ember.run.scheduleOnce('afterRender', this, this.resizeNavHeight);
				Ember.run.scheduleOnce('afterRender', this, this.currentContentItemIndexDidChange);
				Ember.run.scheduleOnce('afterRender', this, this.preloadBgImages);
				Ember.run.scheduleOnce('afterRender', this, this.setupAnalytics);
				Ember.run.scheduleOnce('afterRender', this, this.hideFullScreenLoadingWidget);
			},
			setupAnalytics: function () {
				var questionnaireId = this.content.id;
				/*jshint camelcase: false */
				var options = {
					default_category: "Questionnaire",
					default_action: questionnaireId
				};
				/*jshint camelcase: true */
				gAnalytics.init(options);
				gAnalytics.track('initQuestionnaire');
			},
			slimScroll: function () {
				$('.question-wrapper .viewstate-wrapper')
					.outerWidth('100%');
			},
			preloadBgImages: function () {
				var sections = this.get('model.sections');
				var preload = [];
				sections.forEach(function (section) {
					var img = new Image();
					img.src = section.backgroundImage;
					preload.push(img);
					img = new Image();
					img.src = section.secondaryBackgroundImage || '';
					preload.push(img);
				});
				this.set('preloadedImages', preload);
			},

			markSectionAsStarted: function (section) {
				var self = this;

				if (section && section.get('status') === 'NOT_STARTED') {
					QuestionnaireServiceInstance.postSectionStatus(
						this.get('model'),
						section.get('id'),
						'STARTED'
					).then(function () {
							section.set('status', 'STARTED');
						}, function () {
							self.showRetryErrorDialog();
						});
				}
			},

			markSectionAsCompleted: function (section) {
				var self = this;

				if (section && section.get('status') === 'STARTED') {
					return QuestionnaireServiceInstance.postSectionStatus(
						this.get('model'),
						section.get('id'),
						'COMPLETED'
					).then(function (data) {
							section.set('status', 'COMPLETED');
							section.set('completedLocally', true);

							return data;
						}, function () {
							self.showRetryErrorDialog();
						});
				}
			},

			/**
			 * Update the section status when the user has navigated past the
			 * end of a section.
			 */
			handleEndOfSection: function () {
				var currentSection = null;
				var previousSection = this.get('previousSectionDuringTransition');
				var contentItemIndex = this.get('currentContentItemIndex');

				if (!previousSection) {
					previousSection = this.get('sections.firstObject');
				}

				// this.get('currentPageId') refers to the last incomplete page
				// not the 'current page' that the user is viewing, i.e. when
				// the user navigates backward currentPageId does not update.
				var currentPage = this.get('contentItems')[contentItemIndex].get('page.id');

				// Page/pageId are not database IDs. Each time new content is
				// published new page numbers are assigned sequentially. If
				// section[0].firstPage is 10 and section[1].firstPage is 40
				// then we know that page 30 is part of section[0].

				// this.get('currentSection') uses section.@each.isActive to
				// determine what the current section is. The isActive
				// properties do not seem to be updated when this method runs so
				// we are manually identifying the current section by the
				// current page number/id.

				this.get('sections').forEach(function (section) {
					if (currentPage >= section.firstPage) {
						currentSection = section;
					}
				});

				if (previousSection !== currentSection) {
					this.markSectionAsCompleted(previousSection);
					this.set('previousSectionDuringTransition', currentSection);
				}
			},

			loadContentItems: function () {
				var contentItems, currentItem, sections, pages, lastPage, currentSection, currentPage, currentSectionIndex,
					currentPageId, currentPageFirstItem, currentPageFirstItemIndex;
				contentItems = this.get('model.contentItems');
				lastPage = this.get('pages').get('lastObject');
				pages = this.get('pages');
				sections = this.get('sections');

				currentPageId = sections[0].get('firstPage');
				currentSection = sections[0];
				currentSectionIndex = 0;

				pages.forEach(function (page) {
					if (page.get('id') === currentPageId) {
						currentPageFirstItem = page.get('contentItems').get('firstObject');
						currentPageFirstItemIndex = contentItems.indexOf(currentPageFirstItem);
					}
				});

				//now we need to make sure that the currentPageId is really the one we want,
				//sometimes a section spans pages and the first page (or more) is complete already,
				//we want to make sure the accounting data is based off that.
				currentPage = pages.filter(function (page, index, array) {
					return page.get('id') === currentPageId;
				})[0];

				if (currentPage && currentSection.get('pageCount') > 1 && currentPage.get('prepopulated')) {
					currentPageId = this._adjustCurrentPageIdForContentItemRewindInaccuracy(pages, sections, currentPageId, currentSectionIndex);
				}

				this.addContentItems(currentPageFirstItemIndex);
				currentItem = contentItems[currentPageFirstItemIndex];
				currentItem.set('active', true);

				this.set('currentPageId', currentPageId);
				this.set('previousContentItemIndex', currentPageFirstItemIndex);
				this.set('currentContentItemIndex', currentPageFirstItemIndex);
			},
			hideFullScreenLoadingWidget: function () {
				loadingWidget.get('widget').destroy();
			},
			_adjustCurrentPageIdForContentItemRewindInaccuracy: function (pages, sections, currentPageId, currentSectionIndex) {
				var nextSection = null;
				var nextSectionFirstPageId = null;
				if (currentSectionIndex !== sections.length - 1) {
					nextSection = sections[currentSectionIndex + 1];
				}
				//if there's no next section then let's use a phantom 'last page' as the next index for filtering later
				if (nextSection === null) {
					nextSectionFirstPageId = pages[pages.length - 1].get('id') + 10;
				}
				else {
					nextSectionFirstPageId = nextSection.get('firstPage');
				}
				var currentSectionPages = pages.filter(function (page, index, list) {
					if (page.get('id') > currentPageId && page.get('id') < nextSectionFirstPageId) {
						return true;
					}
					return false;
				});
				var realPage = currentSectionPages.filter(function (page, index, list) {
					return page.get('prepopulated');
				})[0];
				if (realPage) {
					return realPage.get('id');
				}
				//no realPage, then the last page of the section will work
				return currentSectionPages[currentSectionPages.length - 1].get('id');
			},
			addContentItems: function (nextContentItemIndex) {
				var i, iMax, contentItems, previousContentItemIndex, contentItemsToAdd;
				contentItems = this.get('model.contentItems');
				previousContentItemIndex = this.get('previousContentItemIndex');
				contentItemsToAdd = [];
				for (i = previousContentItemIndex + 1, iMax = nextContentItemIndex; i <= iMax; i++) {
					contentItemsToAdd.push(contentItems[i]);
					contentItems[i].set('size', this.sizeForComponentType(contentItems[i].get('type')));
				}
				this.get('contentItems').addObjects(contentItemsToAdd);
			},
			removeContentItems: function (nextContentItemIndex) {
				var i, iMax, contentItems, currentContentItemIndex, contentItemsToRemove;
				contentItems = this.get('model.contentItems');
				currentContentItemIndex = this.get('currentContentItemIndex');
				contentItemsToRemove = [];
				for (i = currentContentItemIndex + 1, iMax = contentItems.length; i < iMax; i++) {
					contentItemsToRemove.push(contentItems[i]);
				}
				this.get('contentItems').removeObjects(contentItemsToRemove);
			},
			removeCompletionContentItem: function () {
				this.get('contentItems').removeObject(this.get('completePageContentItem'));
				this.set('completePageContentItem', null);
			},
			currentContentItemIndexDidChange: function () {
				this.setActiveSection();
			}.observes('currentContentItemIndex'),
			setActiveSection: function () {
				var i, question, sections, currentSection, pages, page, currentPage, contentItems;
				contentItems = this.get('contentItems');
				question = contentItems[this.get('currentContentItemIndex')];
				sections = this.get('sections');
				pages = this.get('pages');
				for (i = 0; i < pages.length; i++) {
					page = pages[i];
					if (page.get('contentItems').contains(question)) {
						currentPage = page;
						break;
					}
				}
				if (this.doesExist(currentPage)) {
					for (i = 0; i < sections.length; i++) {
						if (currentPage.get('id') >= sections[i].get('firstPage')) {
							currentSection = i;
							sections[i].set('isActive', true);
						}
					}
				}
				for (i = 0; i < sections.length; i++) {
					sections[i].set('isActive', i === currentSection);
				}
			},
			setSectionComplete: function () {
				var sections = this.get('sections');
				// If the questionnaire is complete, we need to mark the last
				// completed locally because there is no new digest to read from
				if (this.get('completePageContentItem')) {
					sections[sections.length - 1].set('completedLocally', true);
				}
			}.observes('completePageContentItem'),
			sizeForComponentType: function (type) {
				switch (type) {
					case 'dropdown':
						return 'content-item-sm';
					case 'vert-radio':
					case 'radio':
					case 'numberinput':
					case 'checkbox':
					case 'multidropdown':
					case 'scalegroup':
					case 'dropdownandnumber':
					case 'numbersandradios':
					case 'bloodpressure':
					case 'slider':
					case 'quitTailoredText':
						return 'content-item-md';
					case 'scale':
					case 'hor-radio':
						return 'content-item-lg';
					case 'beginBumper':
					case 'tailoredText':
					case 'questionnaireComplete':
						return 'content-item-xl';
					default:
						return 'content-item-md';
				}
			},
			moveToQuestionAtIndex: function (nextContentItemIndex) {
				var currentContentItemIndex;
				currentContentItemIndex = this.get('currentContentItemIndex');
				if (nextContentItemIndex > this.get('contentItems').length - 1) {
					nextContentItemIndex = this.get('contentItems').length - 1;
				} else if (nextContentItemIndex < 0) {
					nextContentItemIndex = 0;
				}
				this.get('contentItems')[currentContentItemIndex].set('active', false);
				this.set('currentContentItemIndex', nextContentItemIndex);
				Ember.run.scheduleOnce('actions', this, this.set, 'previousContentItemIndex', nextContentItemIndex);
				this.get('contentItems')[nextContentItemIndex].set('active', true);
				//reset the question submission status to allow submission if changed
				this.get('contentItems')[nextContentItemIndex].set('wasSubmitted', false);
				Ember.run.scheduleOnce('afterRender', this, this.resizeNavHeight);
				this.scrollLeft();
			},
			completeQuestionnaire: function () {
				var completePageContentItem = PageContentModel.create({
					type: "questionnaireComplete",
					shortName: this.get('shortName')
				});
				completePageContentItem.set('size', this.sizeForComponentType(completePageContentItem.get('type')));
				this.get('contentItems').addObject(completePageContentItem);
				this.set('completePageContentItem', completePageContentItem);
			},
			checkAndClearFuturePages: function (question) {
				var i, iMax, pages, page, pagesToDelete, currentPageId, deletePage;
				pages = this.get('pages');
				deletePage = false;
				pagesToDelete = [];
				for (i = 0, iMax = pages.length; i < iMax; i++) {
					page = pages[i];
					if (deletePage) {
						pagesToDelete.push(page);
					} else if (page.get('contentItems').contains(question)) {
						deletePage = true;
						currentPageId = page.get('id');
					}
				}

				if (pagesToDelete.length > 0) {
					if (this.doesExist(this.get('completePageContentItem'))) {
						this.get('contentItems').removeObject(this.get('completePageContentItem'));
						this.set('completePageContentItem', null);
					}
					this.get('content.pages').removeObjects(pagesToDelete);
					this.set('currentPageId', currentPageId);
				}
			},
			resizeNavHeight: function () {
				this._resizeNavHeight();
				Ember.run.scheduleOnce('afterRender', this, function () {
					this._resizeNavHeight();
				});
			}.observes('windowManager.windowHeight', 'windowManager.windowWidth'),
			_resizeNavHeight: function () {
				var windowHeight,
					sectionNavHeight,
					sliderHeight,
					navButtonHeight,
					headerHeight;

				windowHeight = window.innerHeight || $(window).height();
				sectionNavHeight = $('.section-navigation-wrapper').height();
				headerHeight = $('[data-wnpwidget-container="headerNavigationBar"]').height();

				sliderHeight = windowHeight - sectionNavHeight - headerHeight;
				$('.question-wrapper').each(function (index) {
					var $this = $(this);
					navButtonHeight = $this.find('.questionNavButtons:visible').height();
					$this.height(sliderHeight);
					$this.find('.question-outer-wrapper').closest('.slimScrollDiv')
						.height(sliderHeight - navButtonHeight);
				});
			},
			resetQuestionAnswer: function (question) {
				this.moveToQuestionAtIndex(this.get('contentItems').indexOf(question));
				question.set('userAnswers', null);
			},
			moveToNextAvailableQuestion: function () {
				var _this, nextAvailableQuestionIndex, i, page, pages, nextQuestion;
				this.get('contentItems')[this.get('currentContentItemIndex')].set('active', false);
				nextAvailableQuestionIndex = this._nextAvailableQuestionIndex(this.get('currentContentItemIndex') + 1);
				if (this.doesExist(nextAvailableQuestionIndex)) {
					this.addContentItems(nextAvailableQuestionIndex);
					this.moveToQuestionAtIndex(nextAvailableQuestionIndex);
					//we need to ensure that the currentPageId is updated to latest content displayed
					pages = this.get('pages');
					nextQuestion = this.get('contentItems')[nextAvailableQuestionIndex];
					//iterate through the pages to ensure we point to the most current page
					//start at the end since that is the most likely scenario
					for (i = pages.length - 1; i >= 0; i--) {
						page = pages[i];
						if (page.get('contentItems').contains(nextQuestion)) {
							this.set('currentPageId', page.get('id'));
							break;
						}
					}
				} else if (this.get('currentPageId') === this.get('finalPage')) {
					this._moveToSubmitQuestionnaire();
				} else {
					_this = this;
					Ember.RSVP.Promise.all(this.get('userDataRecorders'))
						.then(function (userDataRecorders) {
							_this._moveToNextPage(_this.get('currentPageId'));
						});
				}
			},
			_moveToNextPage: function (pageId) {
				var _this, questionnaire;
				_this = this;
				questionnaire = this.get('model');
				this.set('pageLoading', true);
				QuestionnaireServiceInstance.getNextPage(questionnaire, pageId)
					.then(function (questionnairePage) {
						_this.set('pageLoading', false);
						if (_this.doesExist(questionnairePage)) {
							gAnalytics.track('moveToPage: ' + questionnairePage.get('id'));
							Ember.run.schedule('sync', function () {
								var firstContentItem, startIndex, index;
								firstContentItem = questionnairePage.get('contentItems').get('firstObject');
								startIndex = questionnaire.get('contentItems').indexOf(firstContentItem);
								index = _this._nextAvailableQuestionIndex(startIndex);
								if(index === undefined) {
									_this._moveToNextPage(questionnairePage.get('id'));
								} else {
									_this.addContentItems(index);
									_this.moveToQuestionAtIndex(index);

									_this.set('currentPageId', questionnairePage.get('id'));
									_this.handleEndOfSection();
								}
							});
						} else {
							gAnalytics.track('moveToCompletion');
							_this._moveToSubmitQuestionnaire();
						}
					})
					.then(null, function (reason) {
						_this.showSaveErrorDialog();
					});
			},
			/**
			 * Add remaining content items from the model to our content items
			 * then add and move to the submit questionnaire content item. It
			 * is assumed that when this method is called the model will
			 * contain all the remaining content items for this questionnaire.
			 *
			 * @private
			 */
			_moveToSubmitQuestionnaire: function () {
				var itemCount = this.get('model.contentItems').length;
				this.addContentItems(itemCount - 1);
				// Calling markSectionAsCompleted with currentSection will mark
				// last section as completed when the user submits the last
				// question of that section. This would match the behavior of
				// the rest of the questionnaire. However, we don't want to mark
				// the last section as completed until the user presses submit
				// on the submit questionnaire page so this markSection method
				// is called in the submitQuestionnaire action instead of here.
				this.completeQuestionnaire();
				this.moveToQuestionAtIndex(itemCount);
			},
			_nextAvailableQuestionIndex: function (start) {
				var contentItems, nextItem;
				contentItems = this.get('model.contentItems');

				// if we are in mobile mode then we stop on each content item.
				if (this.get('windowManager.layout') === 'mobile-layout') {
					return start < contentItems.length ? start : undefined;
				}

				// if we are in desktop mode then we skip over tailoredText items.
				nextItem = contentItems.slice(start).find(function (item) {
					return item.get('type') !== 'tailoredText';
				});

				return nextItem ? contentItems.indexOf(nextItem) : undefined;
			},
			moveBackward: function () {
				var index;
				index = this._previousAvailableQuestionIndex(this.get('currentContentItemIndex') - 1);
				gAnalytics.track('moveBackward');
				this.moveToQuestionAtIndex(index);
			},
			_previousAvailableQuestionIndex: function (start) {
				var i, iMin, contentItems, contentItem, index;
				contentItems = this.get('model.contentItems');
				var isMobileLayout = this.get('windowManager.layout') === 'mobile-layout';

				for (i = start, iMin = 0; i >= iMin; i--) {
					contentItem = contentItems[i];
					if (contentItem.get('type') !== 'tailoredText' || isMobileLayout) {
						index = i;
						break;
					}
				}
				return index;
			},
			resetQuestionnaire: function () {
				var _this;
				_this = this;
				this.get('pages').clear();
				gAnalytics.track('resetQuestionnaire');
				return QuestionnaireServiceInstance.getAllThePages(this.get('model'))
					.then(function (questionnairePage) {
						_this.get('contentItems').clear();
						_this.set('previousContentItemIndex', -1);
						_this.loadContentItems();
						Ember.run.scheduleOnce('afterRender', _this,
							_this.resizeNavHeight);
					})
					.then(null, function (reason) {
						_this.showSaveErrorDialog();
					});
			},
			retakeQuestionnaire: function () {
				var _this;
				_this = this;
				gAnalytics.track('retakeQuestionnaire');

				return new Ember.RSVP.Promise(function (resolve, reject) {
					QuestionnaireServiceInstance.enroll(_this.get('model'))
						.then(function (response) {
							if (response) {
								_this.set('model.productEnrollmentId', response.productEnrollmentId);
								_this.resetQuestionnaire().then(function () {
									resolve();
									_this.get('model').set('retakeAvailable', false);
								});
							}
						}, function () {
							Ember.run.scheduleOnce("afterRender", _this,
								_this.showRetryErrorDialog, _this.retakeQuestionnaire);
						});
				});
			},
			showLandingModal: function () {
				if (this.get('isInProgress') || this.get('retakeAvailable') || this.get('upgradePathApplicable')) {
					var dialogController = this.get('questionnaireLandingDialogController');
					dialogController.set('longName', this.get('longName'));
					dialogController.set('retakeAvailable', this.get('retakeAvailable'));
					dialogController.set('initiateRetakeFn', this.retakeQuestionnaire);
					dialogController.set('retakeContext', this);
					dialogController.set('upgradePathApplicable', this.get('upgradePathApplicable'));
					dialogController.set('upgradePathQuestionnaireStarted', this.get('upgradePathQuestionnaireStarted'));
					dialogController.set('upgradePathQuestionnaireFinished', this.get('upgradePathQuestionnaireFinished'));
					dialogController.set('upgradePathRetakeAvailable', this.get('upgradePathRetakeAvailable'));
					dialogController.set('upgradePathCombinedProduct', this.get('upgradePathCombinedProduct'));
					this.send('openModal', 'questionnaire-landing-dialog', 'questionnaireLandingDialog');
				}
			},
			showSaveErrorDialog: function () {
				this.get('saveErrorDialogController').set('callback', this.resetQuestionnaire);
				this.get('saveErrorDialogController').set('context', this);
				gAnalytics.track('showErrorDialog');
				this.send('openModal', 'save-error-dialog', 'saveErrorDialog');
			},
			showRetryErrorDialog: function (callback) {
				this.set('errorDialogController.callback', callback);
				this.set('errorDialogController.context', this);
				gAnalytics.track('showErrorDialog');
				this.send('openModal', 'error', 'errorDialog');
			},
			//when the window is too small when the content scrolls in from the right
			//it doesn't get fully displayed, so we will keep the default scroll side firmly
			//to the right side of the screen. Do this when the window resizes
			//and when the page is changed.
			scrollLeft: function () {
				var question = this.get('contentItems')[this.get('currentContentItemIndex')];
				var isBumper = question.get('type') === 'beginBumper';
				//if it's bumper text the relevant information is on the left side of the screen
				//so we need to show that side.
				if (isBumper) {
					$(document).scrollLeft(0);
				} else {
					$(document).scrollLeft($(window).width());
				}
			}.observes('windowManager.windowWidth'),
			actions: {
				answerQuestion: function (question, userDataRecorderInfos) {
					var _this;
					_this = this;
					this.set('transitionInProgress', true);
					question.set('submissionInProgress', true);
					question.set('isPartiallyPrepopulated', false);
					var userDataRecorders = this.userDataRecorders;
					var currentUserDataRecorder = QuestionnaireServiceInstance.userDataRecorder(this.get('id'), userDataRecorderInfos)
						.then(function (userDataRecorderResult) {
							if (questionHasAnswerValues(question)) {
								question.set('savedOnDate', new Moment());
							}

							for (var i = 0, iMax = userDataRecorders.length; i < iMax; i++) {
								var userDataRecorder = userDataRecorders[i];
								if (userDataRecorder === currentUserDataRecorder) {
									userDataRecorders.splice(i, 1);
									break;
								}
							}
							question.set('submissionInProgress', false);
						})
						.then(null, function (reason) {
							_this.showSaveErrorDialog();
							question.set('submissionInProgress', false);
						});
					userDataRecorders.push(currentUserDataRecorder);
					this.checkAndClearFuturePages(question);
					this.moveToNextAvailableQuestion();
				},
				closeApp: function () {
					this.transitionToRoute('done');
					window.location.reload();
				},
				quit: function () {
					if (parent && parent.WNP && parent.WNP.closeIframe) {
						parent.WNP.closeIframe();
					}
					window.location.reload();
				},
				navigate: function (direction) {
					if (direction > 0) {
						this.moveToNextAvailableQuestion();
					} else {
						this.moveBackward();
					}
				},
				getStarted: function () {
					this.markSectionAsStarted(this.get('currentSection'));
					this.moveToNextAvailableQuestion();
				},
				submitQuestionnaire: function () {
					gAnalytics.track('submitQuestionnaire');
					this.markSectionAsCompleted(this.get('sections.lastObject'));
					localStorage.setItem('transitionFromQuestionnaire', true);
					this.transitionToRoute('plan');
				},
				sliderAnimationComplete: function (isBackward) {
					this.set('transitionInProgress', false);
					this.removeContentItems();
					if (isBackward) {
						this.removeCompletionContentItem();
					}
				}
			}
		});
	}
);
