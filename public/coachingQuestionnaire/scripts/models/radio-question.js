define([
    'ember-i18n',
    'coachingQuestionnaire/scripts/models/question-model',
    'coachingQuestionnaire/scripts/models/user-data-recorder-info'
  ], function(
    I18n,
    QuestionModel,
    UserDataRecorderInfo
  ) {
    'use strict';

    return QuestionModel.extend({
      answers: function() {
        var answers = [];
        for (var i = 0, iMax = this.choices.length; i < iMax; i++) {
          var choice = this.choices[i];
          if (choice.get('selected')) {
            answers.push(choice);
            break;
          }
        }
        return answers;
      }.property('choices.@each.selected'),
      generateUserAnswers: function() {
        var userAnswers, choices, choice;
        userAnswers = [];
        choices = this.get('choices');
        for (var i = 0, iMax = choices.length; i < iMax; i++) {
          choice = choices[i];
          if (choice.get('selected')) {
            userAnswers.push(this.userAnswerFromChoice(choice));
            break;
          }
        }
        if (userAnswers.length > 0) {
          this.set('userAnswers', userAnswers);
        }
      },
      /**
       * Set the selected property of all choices for this question. Choices
       * with a value property equal to the specified value will be set to
       * true, false otherwise.
       * @param value
       */
      setSelectedValue: function(value) {
        this.get('choices').forEach(function(choice) {
          choice.set('selected', choice.get('value') === value);
        });
      },
      userAnswerFromChoice: function(choice) {
        return UserDataRecorderInfo.create({
          dataDefinitionName: choice.get('dataDefinitionName'),
          values: [ choice.get('value') ],
          text: this.getUserAnswerText(choice)
        });
      },
      getUserAnswerText: function(choice) {
        if(this.get('type') === 'slider') {
          return choice.get('text') + ' ' + I18n.t('questionnaire.outOf') +
              ' ' + this.get('lastChoiceText');
        }
        return choice.get('text');
      },
      lastChoiceText: function() {
        var choices;
        choices = this.get('choices');
        if(this.doesExist(choices) && choices.length > 0) {
          return choices[choices.length - 1].get('text');
        }
        return '';
      }.property('choices')
    });
  }
);
