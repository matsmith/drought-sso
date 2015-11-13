define('coachingQuestionnaire/scripts/compiledTemplates/components/multi-answer-state', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers['answer-state'] || (depth0 && depth0['answer-state']),options={hash:{
    'text': ("text"),
    'answers': ("answerArray"),
    'savedOnDate': ("savedOnDate"),
    'collectionDataSourceName': ("collectionDataSourceName"),
    'collectionDate': ("consolidatedCollectionDate"),
    'questionnaire': ("questionnaire")
  },hashTypes:{'text': "ID",'answers': "ID",'savedOnDate': "ID",'collectionDataSourceName': "ID",'collectionDate': "ID",'questionnaire': "ID"},hashContexts:{'text': depth0,'answers': depth0,'savedOnDate': depth0,'collectionDataSourceName': depth0,'collectionDate': depth0,'questionnaire': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "answer-state", options))));
  data.buffer.push("\n");
  return buffer;
  
}); });