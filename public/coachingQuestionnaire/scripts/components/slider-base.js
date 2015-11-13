define([
	'ember',
	'jquery'
], function(
	Ember,
	$
){
	'use strict';
	var PAGE_SLIDE_DURATION = 800;

	return Ember.Component.extend({
		classNames: ['slider-base'],
		previousContentItemIndex: null,
		currentContentItemIndex: null,
		turnstile: 0,
		didInsertElement: function() {
			this.get('contentItems').addArrayObserver(this, {
				willChange: function() {},
				didChange: this.contentItemsDidChange
			});
			this.resizeElements();
		},
		resizeElements: function() {
			Ember.run.scheduleOnce('afterRender', this, function() {
				this.sizeSlides();
				this.sizeSlider();
				this.setSliderLeftPosition();
			});
		}.observes('windowManager.layoutWidth'),
		contentItemsDidChange: function(contentItems, start, removeCount, addCount) {
			Ember.run.scheduleOnce('afterRender', this, this.sizeSlides);
			Ember.run.scheduleOnce('afterRender', this, this.sizeSlider);
		},
		sizeSlides: function() {
			$('.content-item-sm').css({ width: this.calcWidthForContentItem('content-item-sm') });
			$('.content-item-md').css({ width: this.calcWidthForContentItem('content-item-md') });
			$('.content-item-lg').css({ width: this.calcWidthForContentItem('content-item-lg') });
			$('.content-item-xl').css({ width: this.calcWidthForContentItem('content-item-xl') });
		},
		sizeSlider: function() {
			var el = this.get('element'),
			contentItems = this.get('contentItems'),
			sliderWidth = 0;

			for (var i=0; i<contentItems.length; i++) {
				sliderWidth += this.calcWidthForContentItem(contentItems[i].get('size'));
			}
			$(el).find('#survey-slider').outerWidth(sliderWidth);
		},
		calcWidthForContentItem: function(size) {
			switch (this.get('windowManager.layout')) {
				case 'mobile-layout':
					return this._calcWidthForMobileContentItem(size);
				case 'tablet-layout':
					return this._calcWidthForTabletContentItem(size);
				// case 'desktop-layout':
				default:
					return this._calcWidthForDesktopContentItem(size);
			}
		},
		_calcWidthForMobileContentItem: function(size) {
			return this.get('windowManager.layoutWidth');
		},
		_calcWidthForTabletContentItem: function(size) {
			var layoutWidth = this.get('windowManager.layoutWidth');
			switch(size) {
				case 'content-item-sm':
					return layoutWidth * (1/3);
				case 'content-item-md':
					return layoutWidth * (2/3);
				case 'content-item-lg':
				case 'content-item-xl':
					return layoutWidth;
				default:
					throw new Ember.Error('no size set on component');
			}
		},
		_calcWidthForDesktopContentItem: function(size) {
			var layoutWidth = this.get('windowManager.layoutWidth');
			switch(size) {
				case 'content-item-sm':
					return layoutWidth * (1/4);
				case 'content-item-md':
					return layoutWidth * (1/2);
				case 'content-item-lg':
					return layoutWidth * (3/4);
				case 'content-item-xl':
					return layoutWidth;
				default:
					throw new Ember.Error('no size set on component');
			}
		},
		setSliderLeftPosition: function() {
			var screenWidth, sliderEl, childViews, currentContentItemIndexElement, leftPos;
			screenWidth = this.get('windowManager.layoutWidth');
			sliderEl = this.$().find('#survey-slider');
			childViews = this.get('childViews');
			currentContentItemIndexElement = childViews[this.currentContentItemIndex].get('element');
			leftPos = (screenWidth - $(currentContentItemIndexElement).position().left) -
				$(currentContentItemIndexElement).outerWidth();
			sliderEl.css({left: leftPos});
		},
		currentContentItemIndexObserver: function () {
			var _this = this,
			slideDiff = this.get('currentContentItemIndex') - this.get('previousContentItemIndex'),
			slideLeft = slideDiff > 0,
			slideRight = slideDiff < 0,
			slideDistance = 0,
			startIndex = _this.get("previousContentItemIndex"),
			endIndex = _this.get("currentContentItemIndex"),
			contentItems = this.get('contentItems'),
			sliderEl = this.$().find('#survey-slider'),
			i,
			ticket;

			if (slideLeft) {
				startIndex++;
				for (i = startIndex; i <= endIndex; i++) {
					slideDistance -= _this.calcWidthForContentItem(contentItems[i].get('size'));
				}
			} else if (slideRight) {
				endIndex++;
				for (i = startIndex; i >= endIndex; i--) {
					slideDistance += _this.calcWidthForContentItem(contentItems[i].get('size'));
				}
			} else {
				Ember.run.scheduleOnce('afterRender', this, this.setSliderLeftPosition);
			}
			this.set('turnstile', this.get('turnstile') + 1);
			ticket = this.get('turnstile');
			if (Math.abs(slideDistance) > 0) {
				var numPagesToSlide =
					Math.abs(slideDistance) / this.get('windowManager.layoutWidth');
				var slideDuration = numPagesToSlide * PAGE_SLIDE_DURATION;

				sliderEl.animate({left: '+=' + slideDistance}, slideDuration, function() {
					if (_this.get('turnstile') === ticket) {
						_this.sendAction('sliderAnimationComplete', slideRight);
					}
				});
			}
		}.observes('currentContentItemIndex'),
		actions: {
			answerQuestion: function(question, userDataRecorderInfos) {
				this.sendAction('answerQuestion', question, userDataRecorderInfos);
			},
			getStarted: function( ){
				this.sendAction('getStarted');
			},
			navigate: function(direction) {
				this.sendAction('navigate', direction);
			},
			quit: function() {
				this.sendAction('quit');
			},
			submitQuestionnaire: function () {
				this.sendAction('submitQuestionnaire');
			}
		}
	});
});
