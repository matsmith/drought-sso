/*global define*/
define('headerNavigationBar', [
	'jquery',
	'knockout',
	'headerNavigationBarTemplates',
	'baseWidget' // provides $.wnp.baseWidget
], function (
	$,
	ko,
	Templates
) {
	'use strict';

	var viewModel;

	$.widget('wnp.headerNavigationBar', $.wnp.baseWidget, {
		_widgetClass: 'headerNavigationBar',

		_fetchData: function () {
			var page = this.options.page || 'portal';

			var presentationPromise = this.services.presentation.getBy({
				page: page,
				type: 'navigation'
			});
			var deferred = new $.Deferred();

			$.when(presentationPromise).done(function (response) {
				deferred.resolve(response);
			});
			return deferred.promise();
		},

		_processData: function(serviceData) {
			// Add link names to the arrays below where appropriate.

			// Names of links that will populate decoratedModel.stickyLinks
			var stickyLinks = [
				'helpLink',
				'privacyLink',
				'termsLink'
			];
			// Names of content that will be removed from the content structure and be placed in the template by name
			var uniquelyPlacedContent = [
				'pointsLink'
			];
			// Links that will display counters
			var linksWithCounters = [
				'achievementsLink'
			];


			// This part processes the serviceData into the decoratedModel using the above arrays

			// decoratedModel: The serviceData model with properties and organization added to it for use in the template.
			var decoratedModel = {
				// unstructuredLinks: all links regardless of depth in the serviceData. This is an one dimensional array.
				// Iterated for operations on all link blocks
				unstructuredLinks: [],
				// structuredLinks: All of the links maintaining structure.
				// Iterated for operations and rendering requiring data structure
				structuredLinks: [],
				// stickyLinks: Links that are fixed at the bottom of the menu
				stickyLinks: [],
				icons: [],
				content: [],
				hasLinks: undefined
			};
			// links that will be removed from the structure. linksToRemove Will be populated during execution.
			var linksToRemove = [];

			// populating links and icons in the decoratedModel
			var blocks = serviceData.model.areas[0].blocks;
			var propertyLookupTable = {
				link: 'structuredLinks',
				icon: 'icons'
			};
			blocks.forEach(function (block) {
				var key = propertyLookupTable[block.type];
				decoratedModel[key || block.type].push(block);
			});

			// flatten: Recursively populate the unstructuredLinks
			function flatten (arr) {
				arr.forEach(function (item, index) {
					decoratedModel.unstructuredLinks.push(item);
					if (item.blocks) {
						item['contains-subblocks'] = 'contains-subblocks';
						flatten(item.blocks);
					}
				});
			}
			flatten(decoratedModel.structuredLinks);
			flatten(decoratedModel.icons);

			// This is a step for handling the SSO state.
			// SSO users have a special logout link that they must use.
			decoratedModel.unstructuredLinks.forEach(function (block) {
				if (linksWithCounters.indexOf(block.name) >= 0) {
					block.hasCounter = true;
				}
			});

			// Populate the unique and sticky links by name.
			decoratedModel.structuredLinks.forEach(function (block, index) {
				if (stickyLinks.indexOf(block.name) >= 0) {
					decoratedModel.stickyLinks.push(block);
					linksToRemove.push(block);
				}
			});
			// populate unique content by name.
			decoratedModel.content.forEach(function (block, index) {
				if (uniquelyPlacedContent.indexOf(block.name) >= 0) {
					decoratedModel[block.name.replace('Link', '')] = block;
				}
			});
			linksToRemove.forEach(function (block) {
				decoratedModel.structuredLinks.splice(decoratedModel.structuredLinks.indexOf(block), 1);
			});
			if (decoratedModel.structuredLinks.length > 0) {
				decoratedModel.hasLinks = true;
			}

			decoratedModel.icons.forEach(function (block, index) {
				// Matches a class defined in wnpsharedstyles.scss
				var iconClassNames = {
					profileIcon: 'icon-profile',
					pointsIcon: 'icon-trophy'
				};

				block.className = iconClassNames[block.name];
				decoratedModel[block.name] = block;
			});
			viewModel = decoratedModel;
		},

		_createDom: function() {
			var self = this;
			this._setDom(Templates.headerNavigationBarTemplate( viewModel ));
			this._bindEventHandlers();

			this.element.find('[data-sticky]').each(function (index, stickyElm) {
				var $partner = self.element.find('[data-sticky-partner='+$(stickyElm).attr('data-sticky')+']');
				var stickyHeight = $(stickyElm).height() + self.element.find('.item').height();
				$partner.css('padding-bottom', stickyHeight);
				$(stickyElm).css('margin-top', -$(stickyElm).height());
			});
		},

		_bindEventHandlers: function () {
			var self = this;
			var $drawers = self.element.find('[data-animate="kinetic-drawer"]');
			var $stickyLists = $('.wide-menu, .tall-menu, .sticky-list');

			$(document).on('scroll', function (e) {
				if (self.element.offset().top - $(e.delegateTarget).scrollTop() <= 0) {
					$stickyLists.addClass('stuck');
				} else {
					$stickyLists.removeClass('stuck');
				}
			}).trigger('scroll');

			this.element.find('.icon-hamburger').on('click', function(){
				$('.overlay-background').css('opacity', '');
				var matrix = $drawers.css('transform').replace(/[^0-9\s-]/g, '').split(/\s/).map(function(item){
					return parseInt(item);
				});
				if (matrix[4] < 0) {
					$drawers.css({
						transition: 'transform 0.35s',
						transform: 'translateX(0px)'
					});
					self.element.addClass('open');
				} else {
					$drawers.css({
						transition: 'transform 0.35s',
						transform: 'translateX(-257px)'
					});
					self.element.removeClass('open');
				}
			});
			$drawers.on('transitionend', function () {
				$drawers.css({
					transition: 'none'
				});
				$('[data-menu="mini"]').removeClass("open-without-animation");
				$('[data-menu="mini"]').removeClass("close-without-animation");
			});

			$('.tall-menu .sub-list').parent().on('click', function (e) {
				$(this).toggleClass('open');
			});

			this._bindParentCallbacks();

			this._bindAchievementsSubscription();
		},
		_bindParentCallbacks: function () {
			var defaultClickCallbacks = {
			};
			var callbacks = $.extend(this.options.clickCallbacks, defaultClickCallbacks);
			this.element.find('a').on('click', function (e) {
				var name = $(e.currentTarget).attr('data-name');
				if (callbacks && callbacks[name]) {
					e.preventDefault();
					if (callbacks[name](e)) {
						$('[data-menu="mini"] [data-animate="kinetic-drawer"]').css({
							transition: '0.4s',
							transform: 'translateX(-280px)'
						});
						$('[data-menu="mini"]').removeClass("open");
					}
				}
			});
		},
		_bindAchievementsSubscription: function(){
			this.notificationCount = ko.observable(0);
			var self = this;
			this.services.userNotification.subscribe('CERT_OF_ACHIEVEMENT', function (notifications) {
				var unviewedNotifications = notifications.filter(function (notification) {
					return notification.value !== 'VIEWED';
				});
				self.notificationCount(unviewedNotifications.length);
			});
			ko.applyBindings({ notificationCount: this.notificationCount}, this.element[0]);
			this.services.userNotification.scheduleNotificationCheck('CERT_OF_ACHIEVEMENT');
		}
	});


	return function WnpHeaderNavigationBar(target, options, callbacks) {
		return $(target).headerNavigationBar(options, callbacks).data('wnpHeaderNavigationBar');
	};

});
