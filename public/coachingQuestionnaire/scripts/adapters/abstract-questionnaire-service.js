define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/models/section-model',
		'coachingQuestionnaire/scripts/models/page-model',
		'coachingQuestionnaire/scripts/models/question-model',
		'coachingQuestionnaire/scripts/models/choice-model',
		'coachingQuestionnaire/scripts/utils/errors/not-implemented-error'
	], function(
		$,
		Ember,
		SectionModel,
		PageModel,
		QuestionModel,
		ChoiceModel,
		NotImplementedError
	) {
		'use strict';

		return Ember.Object.extend({
			debugLogging: false,
			enroll: function(questionnaire) {
				var _this, debugLogging;
				_this = this;
				debugLogging = this.get('debugLogging');

				if (debugLogging) {
					console.log("/enroll Start, Questionnaire", questionnaire.get('id'));
				}

				return new Ember.RSVP.Promise(function(resolve, reject) {
					_this._enroll(questionnaire).then(function(enrollmentStatus) {
						if (debugLogging) {
							console.log("/enroll Complete, Questionnaire",
								questionnaire.get('id'));
						}
						var response = enrollmentStatus.enrollmentResponse;
						if (response.responseCode === 0) {
							resolve({
								productEnrollmentId:
									response.productEnrollment.productEnrollmentId
							});
						} else {
							reject('Enrollment failed.');
						}
					});
				});
			},
			getNextPage: function(questionnaire, currentPageId) {
				var _this = this;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					_this._getNextPage(questionnaire, currentPageId, resolve, reject);
				});
			},
			getAllThePages: function(questionnaire) {
				var _this = this;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					_this._getAllThePages(questionnaire, resolve, reject);
				});
			},
			_getAllThePages: function(questionnaire, resolve, reject) {
				var _this;
				_this = this;
				this.consultationRetriever(questionnaire)
					.then(function(consultation) {
						//loop through each page buid up a fake page and push it through _buildQuestionnairePage
						for(var i = 0; i < consultation.consultationResponse.questionnairePage.length; i++) {
							var value = consultation.consultationResponse.questionnairePage[i];
							var page = {
								questionnairePageRetriever: {
									digest: consultation.consultationResponse.digest,
									finalPage: consultation.consultationResponse.finalPage,
									questionnairePage: value,
									responseCode:consultation.consultationResponse.responseCode
								}
							};
							if (i===0) {//only update this once
								_this._updateSection(questionnaire, page);
							}
							var questionnairePage = _this._buildQuestionnairePage(questionnaire, page);
							if (!questionnairePage.get('isQuitPage') && questionnairePage.get('prepopulated')) {
								if (questionnairePage.get('id') === questionnaire.get('finalPage')) {
									resolve(null);
									break;
								}
							} else {
								resolve(questionnairePage);
								break;
							}
						}
					})
					.then(null, reject);
			},
			_getNextPage: function(questionnaire, currentPageId, resolve, reject) {
				this.consultationPageRetriever(questionnaire, currentPageId)
					.then(function(questionnairePage) {
						if (!questionnairePage.get('isQuitPage') && questionnairePage.get('prepopulated') &&
								questionnairePage.get('id') === questionnaire.get('finalPage')) {
							resolve(null);
						} else {
							resolve(questionnairePage);
						}
					})
					.then(null, reject);
			},
			_checkResponseForError: function(response) {
				var error = null;
				//the response has an enveleope, but we don't necessarily know the name
				//there will only ever be one envelope name
				var envelope = Object.keys(response)[0];
				//does this sub object have a response code? and is it an error?
				if (response[envelope].responseCode !== 0) {
					var desc = response[envelope].responseDesc || "NOT FOUND";
					var errorString = "ResponseCode: " + response[envelope].responseCode;
					errorString = errorString + " ResponseDesc: " + desc;
					error = new Error(errorString);
				}
				if (error) {
					throw error;
				}
			},
			consultationRetriever: function(questionnaire) {
				var debugLogging = this.debugLogging;
				var _this = this;

				if (debugLogging) {
					console.log("/consultationRetriever Start, Questionnaire", questionnaire.get('id'));
				}

				return this._getConsultation(questionnaire)
					.then(function(consultation) {
						_this._checkResponseForError(consultation);
						return consultation;
					});
			},
			_updateSection: function(questionnaire, consultationPage) {
				var _this = this;
				var sectionSerializer = _this.sectionSerializer;
				var mergedSections = [];
				var currentSections = questionnaire.get('sections') || [];
				var newSections = consultationPage.questionnairePageRetriever.digest.sectionGroup[0].section || [];

				newSections.forEach(function(newSection) {
					var didFindObject;
					currentSections.forEach(function(currentSection) {
						if (currentSection && currentSection.id === newSection.id) {
							currentSection.set('status', newSection.status);
							mergedSections.push(currentSection);
							didFindObject = true;
						}
					});
					if (!didFindObject) {
						var serializedSection = sectionSerializer.deserialize(newSection);
						mergedSections.push(serializedSection);
					}
				});
				questionnaire.set('sectionGroupId', consultationPage.questionnairePageRetriever.digest.sectionGroup[0].id);
				questionnaire.set('sections', mergedSections);
				questionnaire.set('finalPage', consultationPage.questionnairePageRetriever.finalPage);
			},
			_buildQuestionnairePage: function(questionnaire, consultationPage, updateSection) {
				var _this = this;
				var debugLogging = _this.debugLogging;
				var questionnairePageSerializer = _this.questionnairePageSerializer;

				if (updateSection) {
					_this._updateSection(questionnaire, consultationPage);
				}

				var currentSection = questionnaire.getSectionByPageId(
					consultationPage.questionnairePageRetriever.questionnairePage.page);
				var questionnairePage = questionnairePageSerializer.deserialize(
					consultationPage.questionnairePageRetriever.questionnairePage,
					currentSection);
				_this._parseContentItems(questionnairePage, questionnaire);
				if (questionnaire.pages) {
					var inputIndex = -1;
					var pages = questionnaire.get('pages');
					for (var i = 0, iMax = pages.length; i < iMax; i++) {
						var page = pages[i];
						if (questionnairePage.id === page.id) {
							break;
						} else if (questionnairePage.id > page.id && i > inputIndex) {
							inputIndex = i;
						}
					}
					questionnaire.get('pages').insertAt(inputIndex + 1, questionnairePage);
				} else {
					questionnaire.set('pages', [ questionnairePage ]);
				}

				if (debugLogging) {
					console.log("/consultationPageRetriever Complete, Questionnaire", questionnaire.get('id'), "ReturnedPage", questionnairePage.get('id'));
				}

				return questionnairePage;
			},
			consultationPageRetriever: function(questionnaire, currentPageId) {
				var debugLogging = this.debugLogging;
				var _this = this;

				if (debugLogging) {
					console.log("/consultationPageRetriever Start, Questionnaire", questionnaire.get('id'), "CurrentPage", currentPageId);
				}

				return this._getConsultationPage(questionnaire, currentPageId)
					.then(function(consultationPage) {
						_this._checkResponseForError(consultationPage);
						return _this._buildQuestionnairePage(questionnaire, consultationPage, true);
					});
			},
			_parseContentItems: function(questionnairePage, questionnaire) {
				var i, iMax, contentItems, contentItem, section, bgImg, secondaryBgImg;
				contentItems = questionnairePage.get('contentItems');
				for (i = 0, iMax = contentItems.length; i < iMax; i++) {
					contentItem = contentItems[i];
					section = section || questionnaire.getSectionByPageId(questionnairePage.get('id'));
					bgImg = section.get('backgroundImage') || "";
					secondaryBgImg = section.get('secondaryBackgroundImage') || "";

					if (contentItem.get('type') === 'inline') {
						if (questionnairePage.get('isQuitPage')) {
							contentItem.set('type', 'quitTailoredText');
							contentItem.set('backgroundImage', secondaryBgImg);
						} else if (0 === i && questionnaire.isFirstPageOfSection(questionnairePage)) {
							contentItem.set('type', 'beginBumper');
							contentItem.set('backgroundImage', bgImg);
						} else {
							contentItem.set('type', 'tailoredText');
							contentItem.set('backgroundImage', secondaryBgImg);
						}
						contentItem.set('shortName', questionnaire.get('shortName'));
						contentItem.set('longName', questionnaire.get('longName'));
						contentItem.set('sectionId', section.id);
					}
				}
			},
			userDataRecorder: function(dataSourceName, userDataRecorderInfos) {
				var debugLogging;
				debugLogging = this.debugLogging;

				if (debugLogging) {
					console.log("/userDataRecorder Start, UserDataRecorderInfos", userDataRecorderInfos);
				}

				return this._postUserDataRecorder(dataSourceName, userDataRecorderInfos)
					.then(function(userDataRecorderResults) {
						if (debugLogging) {
							console.log("/userDataRecorder Complete, UserDataRecorderResults", userDataRecorderResults);
						}

						return new Ember.RSVP.Promise(function(resolve, reject) {
							var i, iMax, userDataRecorderResult;
							for (i = 0, iMax = userDataRecorderResults.length; i < iMax; i++) {
								userDataRecorderResult = userDataRecorderResults[i];
								if (userDataRecorderResult.result !== 'SUCCESS') {
									reject(new Error("Invalid UserDataRecorder Call"));
									return;
								}
							}
							resolve(userDataRecorderResults);
						});
					});
			},

			// Abstract methods

			postSectionStatus: function(questionnaire, sectionId, status) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: 'postSectionStatus'
				});
			},

			// Abstract protected methods

			_enroll: function(questionnaire) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_enroll"
				});
			},
			_getConsultation: function(questionnaire, currentPageId) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_getConsultation"
				});
			},
			_getConsultationPage: function(questionnaire, currentPageId) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_getConsultationPage"
				});
			},
			_postUserDataRecorder: function(userDataRecorderInfos) {
				throw NotImplementedError.create({
					className: this.constructor.toString(),
					methodName: "_postUserDataRecorder"
				});
			}
		});
	}
);
