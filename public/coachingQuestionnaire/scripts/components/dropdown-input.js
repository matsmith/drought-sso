define([
    'ember',
    'jquery',
    'initializeSlimScroll'
  ], function(
    Ember,
    $
  ) {
    'use strict';

    return Ember.Component.extend({
      classNameBindings: ['scrollable', 'mainClass'],
      mainClass: 'dropdown-input',
      value: null,
      didInsertElement: function() {
        var _this, questionContainer;
        _this = this;
        questionContainer = this.$().find('.question-container');

        questionContainer.on('mouseover mouseout', '> li', function(e) {
          _this.setHover((e.type === 'mouseover'), $(this));
        });

        questionContainer
          .on('click change', '> li input:radio', function(e) {
            _this.setSelected(true, $(this).closest('li'));
            _this.set('value', _this.getValue());
          })
          .on('focus', '> li input:radio', function(e) {
            _this.setHover(true, $(this).closest('li'));
            _this.showPopup(true, true);
          })
          .on('blur', '> li input:radio', function(e) {
            _this.showPopup(false, true);
          });

        Ember.run.scheduleOnce('afterRender', this, this.showPopup, false, false);
        Ember.run.scheduleOnce('afterRender', this, this.slimScroll);
        Ember.run.scheduleOnce('afterRender', this, function() {
          var value = _this.getValue();
          _this.set('value', _this.doesExist(value) ? value : '');
        });
      },
      slimScroll: function () {
        if(this.get('scrollable')){
          $(this.$().find('.dropdown-popup')).initializeSlimScroll({
            height: '176px',
            width: '100%',
            color: '#ffffff'
          });
        }
      },
      choiceTextForValue: function (value) {
        var i, iMax, choice, choices;
        choices = this.get('choices');
        for (i = 0, iMax = choices.length; i < iMax; i++) {
          choice = choices[i];
          if(choice.get('value') === value) {
            return choice.get('text');
          }
        }
      },
      valueDidChangeObserver: function () {
        var value, dropdownWrapper;
        value = this.get('value');
        dropdownWrapper = this.$().find('.dropdown-value-wrapper');
        if(this.doesExist(value)){
          $(dropdownWrapper).addClass("answered");
        } else {
          $(dropdownWrapper).removeClass("answered");
        }

        this.sendAction('valueDidChange', this.$(), value);
      }.observes('value'),
      willDestroyElement: function() {
        var questionContainer;
        questionContainer = this.$().find('.question-container');
        questionContainer.off('mouseover mouseout', '> li');
        questionContainer.off('click change focus blur', '> li input:radio');
      },
      scrollable: function() {
        return (this.get('choices').length >= 4);
      }.property(),
      setHover: function(mode, item) {
        var questionContainer, popup, index, popupListItemElements;
        questionContainer = this.$().find('.question-container');
        popup = this.$().find('.dropdown-popup');
        popupListItemElements = popup.find('> li');

        index = questionContainer.find('> li').index(item);
        popupListItemElements.removeClass('hover');
        if (mode) {
          $(popupListItemElements[index]).addClass('hover');
        }
      },
      setSelected: function(mode, item) {
        var questionContainer, popup, index, popupListItemElements;
        questionContainer = this.$().find('.question-container');
        popup = this.$().find('.dropdown-popup');
        popupListItemElements = popup.find('> li');

        index = questionContainer.find('> li').index(item);
        popupListItemElements.removeClass('selected');
        if (mode) {
          $(popupListItemElements[index]).removeClass('hover');
          $(popupListItemElements[index]).addClass('selected');
        }
      },
      showPopup: function(show, animated) {
        var popup;
        popup = this.$().find('.dropdown-popup-wrapper');
        if (show) {
          popup.show();
        } else {
          popup.hide();
        }
      },
      getValue: function() {
        return this.$().find('input:radio:checked').val();
      },
      selectedText: function() {
        var value = this.get('value');
        return this.doesExist(value) ? this.choiceTextForValue(value) : '';
      }.property('value'),
      actions: {
        selectChoice: function(choice) {
          var questionContainer;
          questionContainer = this.$().find('.question-container');
          questionContainer.find('> li input:radio').each(function(index, element) {
            if(element.value === choice.get('value')) {
              $(element).prop('checked', true).change();
            }
          });
          this.showPopup(false);
        },
        togglePopup: function() {
          var popup;
          popup = this.$().find('.dropdown-popup-wrapper');
          this.showPopup(popup.is(':hidden'));
        }
      }
    });
  }
);
