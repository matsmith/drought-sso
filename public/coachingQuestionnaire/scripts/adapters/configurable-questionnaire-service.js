define([
		'jquery',
		'ember',
		'coachingQuestionnaire/scripts/adapters/abstract-questionnaire-service',
		'coachingQuestionnaire/scripts/models/user-data-recorder-result',
		'coachingQuestionnaire/scripts/adapters/section-serializer',
		'coachingQuestionnaire/scripts/adapters/questionnaire-page-serializer',
		'coachingQuestionnaire/scripts/adapters/page-content-serializer'
	], function(
		$,
		Ember,
		AbstractQuestionnaireService,
		UserDataRecorderResult,
		SectionSerializer,
		QuestionnairePageSerializer,
		PageContentSerializer
		) {
		'use strict';

		return AbstractQuestionnaireService.extend({

			// stub service properties
			testTimeout: null,
			// live service properties
			servicesManager: null,
			locale: null,
			programName: null,

			stubs: false,

			_enroll: function(questionnaire) {
				if (this.get('stubs')) {
					return this._stubEnroll(questionnaire);
				}
				return this._liveEnroll(questionnaire);
			},
			_stubEnroll: function(questionnaire) {
				var _this = this;
				var testTimeout;
				testTimeout  = this.testTimeout || 0;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("/stubs/questionnaire/" +
						_this.get('servicesManager').get('authToken') +
						"/enrollment.json"
					).then(function(enrollmentStatus) {
						setTimeout(function() {
							resolve(enrollmentStatus);
						}, testTimeout);
					});
				});
			},
			_liveEnroll: function(questionnaire) {
				return this.get('servicesManager').executeRequest('enrollment', null, {
					product: this.get('programName'),
					enrollmentMethod: "Web"
				});
			},
			_getConsultation: function(questionnaire) {
				if (this.get('stubs')) {
					return this._stubGetConsultation(questionnaire, 0);
				}
				return this._liveGetConsultation(questionnaire, 0);
			},
			_getConsultationPage: function(questionnaire, currentPageId) {
				if (this.get('stubs')) {
					return this._stubGetConsultationPage(questionnaire, currentPageId);
				}
				return this._liveGetConsultationPage(questionnaire, currentPageId);
			},
			_stubGetConsultation: function(questionnaire) {
				var _this = this;
				var testTimeout  = this.testTimeout || 0;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("stubs/questionnaire/" +
						_this.get('servicesManager').get('authToken') +
						"/questionnaire.json"
					).then(function(consultationPage) {
						setTimeout(function() {
							resolve(consultationPage);
						}, testTimeout);
					});
				});
			},
			_stubGetConsultationPage: function(questionnaire, currentPageId) {
				var _this = this;
				var testTimeout  = this.testTimeout || 0;
				var nextPage = currentPageId + 10;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("stubs/questionnaire/" +
						_this.get('servicesManager').get('authToken') +
						"/page_" + nextPage + ".json"
					).then(function(consultationPage) {
						setTimeout(function() {
							resolve(consultationPage);
						}, testTimeout);
					});
				});
			},
			_liveGetConsultation: function(questionnaire) {
				return this.get('servicesManager').executeRequest('consultation/' + this.get('programName'), {
					locale: this.get('locale')
				});
			},
			_liveGetConsultationPage: function(questionnaire, currentPageId) {
				return this.get('servicesManager').executeRequest('consultation/' + questionnaire.get('id') + '/page', {
					q: 'findNextPage',
					currentPage: currentPageId,
					locale: this.get('locale')
				});
			},
			_postUserDataRecorder: function(dataSourceName, userDataRecorderInfos) {
				if (this.get('stubs')) {
					return this._stubPostUserDataRecorder(dataSourceName, userDataRecorderInfos);
				}
				return this._livePostUserDataRecorder(dataSourceName, userDataRecorderInfos);
			},
			_stubPostUserDataRecorder: function(dataSourceName, userDataRecorderInfos) {
				var testTimeout  = this.testTimeout || 0;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					var userDataRecorderResults;
					userDataRecorderResults = [];
					for (var i = 0, iMax = userDataRecorderInfos.length; i < iMax; i++) {
						var userDataRecorderInfo = userDataRecorderInfos[i];
						userDataRecorderResults.push(UserDataRecorderResult.create({
							dataSourceName: dataSourceName,
							dataDefinitionName: userDataRecorderInfo.dataDefinitionName,
							value: userDataRecorderInfo.values,
							result: "SUCCESS"
						}));
					}
					setTimeout(function() {
						resolve(userDataRecorderResults);
					}, testTimeout);
				});
			},
			_livePostUserDataRecorder: function(dataSourceName, userDataRecorderInfos) {
				var i, iMax, userDataRecorderInfo, userDataRecorderJSONInfos;
				userDataRecorderJSONInfos = [];
				for (i = 0, iMax = userDataRecorderInfos.length; i < iMax; i++) {
					userDataRecorderInfo = userDataRecorderInfos[i];
					userDataRecorderJSONInfos.push({
						"DataInfo": {
							"DataDefinitionName": userDataRecorderInfo.get('dataDefinitionName'),
							"DataSourceName": dataSourceName,
							"Values": userDataRecorderInfo.get('values')
						}
					});
				}
				return this.get('servicesManager').executeRequest('userdata', null, {
					"UserDataInfo": {
						"DataInfoList": userDataRecorderJSONInfos
					}
				});
			},
			postSectionStatus: function(questionnaire, sectionId, status) {
				if (this.get('stubs')) {
					return this._stubPostSectionStatus(questionnaire, sectionId, status);
				}
				return this._livePostSectionStatus(questionnaire, sectionId, status);
			},
			_stubPostSectionStatus: function(questionnaire, sectionId, status) {
				var testTimeout  = this.testTimeout || 0;
				return new Ember.RSVP.Promise(function(resolve, reject) {
					$.ajax("stubs/questionnaire/consultationSectionStatus/section_started.json"
					).then(function(consultationStatus) {
							setTimeout(function() {
								resolve(consultationStatus);
							}, testTimeout);
						});
				});
			},
			_livePostSectionStatus: function(questionnaire, sectionId, status) {
				var sectionIdArray = $.isArray(sectionId) ? sectionId : [sectionId];
				var sections = sectionIdArray.map(function(id) {
					return {
						id: id,
						status: status
					};
				});

				return this.get('servicesManager').executeRequest('consultation-section-status', null, {
					"consultationSectionStatus" : {
						"enrollmentSectionStatus" : [{
							"productEnrollmentId" : questionnaire.get('productEnrollmentId'),
							"sectionGroup" : [{
								"id" : questionnaire.get('sectionGroupId'),
								"section" : sections
							}]
						}]
					}
				});
			}
		}).create({
			sectionSerializer: SectionSerializer.create(),
			questionnairePageSerializer: QuestionnairePageSerializer.create({
				pageContentSerializer: PageContentSerializer.create()
			})
		});
	}
);
