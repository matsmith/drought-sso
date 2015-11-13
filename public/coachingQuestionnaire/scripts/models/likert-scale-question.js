define([
    'coachingQuestionnaire/scripts/models/question-model'
  ], function(
    QuestionModel
  ) {
    'use strict';

    return QuestionModel.extend({
      answers: function() {
        var answers = [];
        for(var i = 0; i < this.childQuestions.length; i++){
          var childQuestionAnswers = this.childQuestions[i].get('answers');
          if (childQuestionAnswers && childQuestionAnswers.length > 0) {
            answers[i] = childQuestionAnswers[0];
          } else {
            answers[i] = null;
          }
        }
        return answers;
      }.property('childQuestions.@each.answers'),
      generateUserAnswers: function() {
        var i, iMax, userAnswers, childQuestions, childQuestion;
        userAnswers = [];
        childQuestions = this.get('childQuestions');
        for (i = 0, iMax = childQuestions.length; i < iMax; i++) {
          childQuestion = childQuestions[i];
          if (this.doesExist(childQuestion.get('userAnswers'))) {
            userAnswers.push.apply(userAnswers, childQuestion.get('userAnswers'));
          }
        }
        if (userAnswers.length > 0) {
          this.set('userAnswers', userAnswers);
        }
      }
    });
  }
);
