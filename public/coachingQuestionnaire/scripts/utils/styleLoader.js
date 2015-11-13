define(function(require) {
  'use strict';

  var createSheet, addCSSRule;

  createSheet = function() {
    var style = document.createElement('style');

    try{
      style.appendChild(document.createTextNode(""));
    }catch(e){
      // Needed for Safari, breaks in IE8
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    return style.sheet || style.styleSheet;
  };

  addCSSRule = function(sheet, selector, rules, index) {
    try{
      // FireFox requires insert rule, everything else can use addRule
      sheet.insertRule(selector + "{" + rules + "}", index);
    }catch(error){
      // IE 8 Breaks when trying to detect insert rule, so we have to use a catch
      try{
        sheet.addRule(selector, rules, index);
      }catch(e){
        // If IE8 has too many stylesheets (over 31) we'll land here on exception
      }
    }
  };

  return function(styles, mappings) {
    var colorSheet, selector, selectorRules, selectorRulesString, selectorRule, mapping;
    colorSheet = createSheet();
    for (selector in styles) {
      if (styles.hasOwnProperty(selector)) {
        selectorRules = styles[selector];
        selectorRulesString = "";
        for (selectorRule in selectorRules) {
          if (selectorRules.hasOwnProperty(selectorRule)) {
            selectorRulesString += selectorRule + ":" + selectorRules[selectorRule] + ";";
          }
        }
        for (mapping in mappings) {
          if (mappings.hasOwnProperty(mapping)) {
            selectorRulesString = selectorRulesString.replace(new RegExp("{{" + mapping + "}}", "g"), mappings[mapping]);
          }
        }
        addCSSRule(colorSheet, selector, selectorRulesString, 0);
      }
    }
  };
});
