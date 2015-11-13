define([
		'jquery',
		'ember',
		'transit',
		'skillsAndActionSteps',
		'coachingQuestionnaire/scripts/utils/widget-options',
		 'coachingQuestionnaire/scripts/utils/company-config'
		], function(
		$,
		Ember,
		transit,
		WnpSkillsAndActionStepsWidget,
		widgetOptions,
		CompanyConfig
	) {
		'use strict';

		return Ember.ObjectController.extend({
			animationSpeedShort: 300,
			animationSpeedMedium: 500,
			animationSpeedLong: 1000,
			animationSpeedExtraLong: 2000,
			programName: null,
			programShortName: null,
			init: function() {
				this.programName = widgetOptions.get('options').programName;
				this.programShortName = CompanyConfig.features.ProductRenaming[this.programName + 'ShortName'];
				this._super();
				if(localStorage.transitionFromQuestionnaire) {
					localStorage.removeItem('transitionFromQuestionnaire');
				}

				this.isMobileLayout = this.get('windowManager.layout') === 'mobile-layout';
				Ember.run.scheduleOnce('afterRender', this, this.initAnimation);
			},
			initAnimation: function() {
				var _this;
				_this = this;
				$('#plan-slide-1').transition({opacity: 1}, _this.get('animationSpeedMedium'), function() {
					$('#plan-build-check-icon').transition({opacity: 1, y: -5}, _this.get('animationSpeedShort'), function() {
						$('#plan-build-check-icon').transition({y: 0}, _this.get('animationSpeedShort'), function() {
							$('#plan-build-check-icon > .circleFill').attr('class', 'circleFill filled stroke-color-3');
							setTimeout(function() {
								$('#plan-slide-1').transition({opacity: 0}, _this.get('animationSpeedMedium'), _this.animateSecondFrame());
							}, _this.get('animationSpeedExtraLong'));
						});
					});
				});
			},
			animateSecondFrame: function() {
				var _this;
				_this = this;
				setTimeout(function() {
					$('#plan-slide-1').css({display: 'none'});
					$('#plan-slide-2').transition({opacity: 1}, _this.get('animationSpeedLong'), function() {
						setTimeout(function() {
							_this.animateStep1();
						}, _this.get('animationSpeedShort'));
					});
				}, _this.get('animationSpeedMedium'));
			},
			animateStep1: function() {
				var _this;
				_this = this;
				$('#plan-build-step-1').transition({opacity: 1}, _this.get('animationSpeedShort'), function() {
					$('#plan-build-step-1 > .content-center > [class*="plan-eye"]').transition({y: -5}, _this.get('animationSpeedShort'), function() {
						$('#plan-build-step-1 > .content-center > [class*="plan-eye"]').transition({y: 0}, _this.get('animationSpeedShort'), function() {
							if(_this.isMobileLayout){
								setTimeout(function() {
									_this.animateStep2();
								}, _this.get('animationSpeedShort'));
							}else{
								$('#plan-build-step-1 > .arrow-reveal').transition({width: 180}, _this.get('animationSpeedShort'), function() {
									setTimeout(function() {
										_this.animateStep2();
									}, _this.get('animationSpeedShort'));
								});
							}
						});
					});
				});
			},
			animateStep2: function() {
				var _this;
				_this = this;
				$('#plan-build-step-2').transition({opacity: 1}, _this.get('animationSpeedShort'), function() {
					$('[class*="plan-plus"]').transition({y: -5}, _this.get('animationSpeedShort'), function() {
						$('[class*="plan-plus"]').transition({y: 0}, _this.get('animationSpeedShort'), function() {
							if(_this.isMobileLayout){
								setTimeout(function() {
									_this.animateStep3();
								}, _this.get('animationSpeedShort'));
							}else{
								$('#plan-build-step-2 > .arrow-reveal').transition({width: 180}, _this.get('animationSpeedShort'), function() {
									setTimeout(function() {
										_this.animateStep3();
									}, _this.get('animationSpeedShort'));
								});
							}
						});
					});
				});
			},
			animateStep3: function() {
				var _this;
				_this = this;
				$('#plan-build-step-3').transition({opacity: 1}, _this.get('animationSpeedShort'), function() {
					$('#plan-build-step-3 > .content-center > [class*="plan-check"]').transition({y: -5}, _this.get('animationSpeedShort'), function() {
						$('#plan-build-step-3 > .content-center > [class*="plan-check"]').transition({y: 0}, _this.get('animationSpeedShort'), function() {
							setTimeout(function() {
								$('#plan-done').transition({opacity: 1, scale: 1.1}, _this.get('animationSpeedShort'), function() {
									$('#plan-done').transition({scale: 1}, _this.get('animationSpeedShort'));
								});
							}, _this.get('animationSpeedShort'));
						});
					});
				});
			},
		actions: {
			launchPlanWidget: function() {
				this.transitionTo('done');

				var options = widgetOptions.get('options');

				window.skillsAndActionStepsWidget =
						new WnpSkillsAndActionStepsWidget("#widgetTarget", {
							config: options.config,
							programName: options.programName,
							refreshOnClose: true
						});
			}
		}
		});
	}
);
