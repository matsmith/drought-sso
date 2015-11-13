/*global define,environment*/
define([
    'ember',
    'coachingQuestionnaire/scripts/utils/svg-manager-instance',
    'jquery',
    'modernizr'
  ], function(
    Ember,
    svgManagerInstance,
    $,
    Modernizr
  ) {
    'use strict';

    return function renderImage(options) {
      var fileName, imgElement, fillColor;
      fileName = options.hash.src;
      fillColor = options.hash.fillColor;

      if(!Modernizr.svg || options.hash.pngOnly) {
        imgElement = '<img src="' + environment.mediaserver + 'images/widgets/coachingQuestionnaire/' + fileName + '.png" class="' + fileName + '"/>' ;
      } else {
        imgElement = svgManagerInstance.getSvg(fileName);
        if (this.doesExist(fillColor)) {
          imgElement = imgElement.replace(/<svg /, '<svg class="svg-' + fileName + ' ' + fillColor + '" ');
        }
      }

      return new Ember.Handlebars.SafeString(imgElement);
    };
  }
);
