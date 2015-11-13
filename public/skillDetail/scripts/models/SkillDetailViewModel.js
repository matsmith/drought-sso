// Take an action step id

/*global define*/
define('SkillDetailViewModel', [
	'jquery',
	'knockout',
	'skillModelFactory',
	'colorUtils',
	'modernizr'
], function(
	$,
	ko,
	skillModelFactory,
	colorUtils,
	Modernizr
) {
	"use strict";

	return function (data, programName, companyConfig) {

		function _buildShowItemList(content){
			// Each tab and accordion section is assigned a unique item index.
			// The item index is attached to the content for the tab or accordion
			// section. showItem tracks whether each the tab or accordion section
			// should be shown. showItem has an entry for each tab and accordion section.

			function setStartingItem(container, itemIndex, showItemMap, showItemIndexRef) {
				// create an entry to track whether this tab or accordion section
				// should be shown initially show the first section for a
				// tab container or none for an accordion container
				if (container.type === "accordionCallout") {
					showItemMap[showItemIndexRef] = ko.observable(false);
				} else {
					showItemMap[showItemIndexRef] = ko.observable(itemIndex === 0);
				}
			}

			var showItem = {}; // tracks whether a section should be shown
			var showItemIndex = 0; // the item index for the next section
			content().forEach(function(contentEntry){
				if(contentEntry.type === "tabCallout" || contentEntry.type === "accordionCallout") {
					contentEntry.items.forEach(function(itemEntry, itemIndex){
						// attach the item index to the item's content
						itemEntry.itemIndex = ko.observable(showItemIndex);
						setStartingItem(contentEntry, itemIndex, showItem, showItemIndex);
						showItemIndex++;
						itemEntry.content.forEach(function(itemContentEntry){
							if(itemContentEntry.type === "tabCallout" || itemContentEntry.type === "accordionCallout") {
								itemContentEntry.items.forEach(function(subitemEntry,subitemIndex){
									// attach the item index to the item's content
									subitemEntry.itemIndex = ko.observable(showItemIndex);
									// create an entry to track whether this tab or accordion section should be shown
									// initially show the first tab or accordion section
									setStartingItem(itemContentEntry, subitemIndex, showItem, showItemIndex);
									showItemIndex++;
								});
							}
						});
					});
				}
			});
			return showItem;
		}

		function _buildMediaList(content){
			// Each multimedia content item is assigned a unique media index. The media index is attached
			// to the content for the multimedia content item. mediaList saves playback information that is
			// used to build the media player. mediaList has an entry for each multimedia content item.
			var mediaList = {}; // playback information for each media item
			var mediaListIndex = 0; // the media index to be assigned to the next ,edia item
			content().forEach(function(contentEntry){
				if(["video", "hdvideo", "audio"].indexOf(contentEntry.type) !== -1) {
					contentEntry.mediaIndex = mediaListIndex;
					mediaList[mediaListIndex] = {
						type: contentEntry.type,
						url: contentEntry.content
					};
					mediaListIndex++;
				}
				if(contentEntry.type === "tabCallout" || contentEntry.type === "accordionCallout") {
					contentEntry.items.forEach(function(itemEntry,itemIndex){
						itemEntry.content.forEach(function(itemContentEntry){
							if(["video", "hdvideo", "audio"].indexOf(itemContentEntry.type) !== -1) {
								itemContentEntry.mediaIndex = mediaListIndex;
								mediaList[mediaListIndex] = {
									type: itemContentEntry.type,
									url: itemContentEntry.content
								};
								mediaListIndex++;
							}
							if(itemContentEntry.type === "tabCallout" || itemContentEntry.type === "accordionCallout") {
								itemContentEntry.items.forEach(function(subitemEntry,subitemIndex){
									subitemEntry.content.forEach(function(subitemContentEntry){
										if(["video", "hdvideo", "audio"].indexOf(subitemContentEntry.type) !== -1) {
											subitemContentEntry.mediaIndex = mediaListIndex;
											mediaList[mediaListIndex] = {
												type: subitemContentEntry.type,
												url: subitemContentEntry.content
											};
											mediaListIndex++;
										}
									});
								});
							}
						});
					});
				}
				//Handles the "teaser" text in leftTitleSection of skillDetailActionStep page
				if(contentEntry.type === "introduction") {
					var contentHtmlRemoved = contentEntry.content.replace(/(<([^>]+)>)/ig,"");
					var wordCount = contentHtmlRemoved.split(' ').length;
					if(wordCount >= 24) {
						vm.introText = contentHtmlRemoved.split(' ').slice(0, 24).join(" ") + " &#8230;";
					} else {
						vm.introText = contentHtmlRemoved;
					}
				}
			});
			return mediaList;
		}
		var vm = skillModelFactory.createViewModel(data.skill);
		vm.programName = ko.observable(programName);
		vm.programLongName = companyConfig.features.ProductRenaming[programName+'LongName'];
		vm.programShortName = companyConfig.features.ProductRenaming[programName+'ShortName'];
		vm.activeView = ko.observable("skillDetailLearnMore");
		vm.showSkillDetail = ko.observable(true);
		vm.modalOptions = ko.observable({
			transition: "slideTogether"
		});

		vm.supportsMediaQueries = Modernizr.mq('only all');
		vm.expandSkillIntro = ko.observable(false);
		vm.textContent = data.textContent;
		vm.hasCanvasSupport = ko.observable(Modernizr.canvas);
		vm.primaryColor = ko.observable(colorUtils.getPrivateLabelColor(
			3, programName, companyConfig));

		vm.contentType = {
			INTRO: "introduction",
			HEADING: "heading",
			BLOCK: "block",
			QUOTE: "quoteText",
			IMAGE: "image",
			IMAGE_SMALL: "imageSmall",
			IMAGE_MEDIUM: "imageMedium",
			VIDEO: "video",
			HDVIDEO: "hdvideo",
			AUDIO: "audio",
			TAB: "tabCallout",
			ACCORDION: "accordionCallout"
		};

		vm.showItem = _buildShowItemList(vm.content);

		vm.mediaList = _buildMediaList(vm.content);
		vm.isTouch = ko.computed(function() {
			return $('html').hasClass('touch');
		});

		return vm;
	};
});
