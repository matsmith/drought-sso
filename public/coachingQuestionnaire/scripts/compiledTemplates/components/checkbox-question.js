define('coachingQuestionnaire/scripts/compiledTemplates/components/checkbox-question', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						<div class=\"help-text\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "helpText", options) : helperMissing.call(depth0, "renderSafeString", "helpText", options))));
  data.buffer.push("</div>\n					");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n						<li>\n							<label>\n								<input type=\"checkbox\"\n									");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'name': ("dataDefinitionName"),
    'value': ("dataDefinitionName")
  },hashTypes:{'name': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n									");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'checked': ("selected")
  },hashTypes:{'checked': "STRING"},hashContexts:{'checked': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\n\n								<div class=\"checkbox-img\">\n									<div class=\"check\">\n										");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("checkmark"),
    'fillColor': ("fill-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n									</div>\n								</div>\n								<p>");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</p>\n\n								<div class=\"choice-hover-state background-color-3\"></div>\n							</label>\n						</li>\n					");
  return buffer;
  }

  data.buffer.push("<form>\n	<div class=\"question-outer-wrapper viewstate-wrapper\">\n		<div class=\"question-inner-wrapper\">\n			<div class=\"question-content\">\n				<div class=\"h1-wrapper\">\n					<h1 class=\"title-text font-color-4\">");
  data.buffer.push(escapeExpression((helper = helpers.renderSafeString || (depth0 && depth0.renderSafeString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "text", options) : helperMissing.call(depth0, "renderSafeString", "text", options))));
  data.buffer.push("</h1>\n					");
  stack1 = helpers['if'].call(depth0, "helpText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</div>\n				<ul class=\"question-container\">\n					");
  stack1 = helpers.each.call(depth0, "choices", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</ul>\n				<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("active::savedOnDateInactive")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n					");
  data.buffer.push(escapeExpression((helper = helpers['saved-on-date'] || (depth0 && depth0['saved-on-date']),options={hash:{
    'savedOnDate': ("savedOnDate"),
    'collectionDataSourceName': ("collectionDataSourceName"),
    'questionnaire': ("controller.question"),
    'formattedSavedOnDate': ("formattedSavedOnDate"),
    'formattedCollectionDate': ("formattedCollectionDate")
  },hashTypes:{'savedOnDate': "ID",'collectionDataSourceName': "ID",'questionnaire': "ID",'formattedSavedOnDate': "ID",'formattedCollectionDate': "ID"},hashContexts:{'savedOnDate': depth0,'collectionDataSourceName': depth0,'questionnaire': depth0,'formattedSavedOnDate': depth0,'formattedCollectionDate': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "saved-on-date", options))));
  data.buffer.push("\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"questionNavButtons\">\n		<div class=\"submit-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("submitButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n		");
  data.buffer.push(escapeExpression((helper = helpers['submit-button'] || (depth0 && depth0['submit-button']),options={hash:{
    'active': ("enableSubmitButton"),
    'requiredButUnanswered': ("requiredButUnanswered")
  },hashTypes:{'active': "ID",'requiredButUnanswered': "ID"},hashContexts:{'active': depth0,'requiredButUnanswered': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "submit-button", options))));
  data.buffer.push("\n		</div>\n		<div class=\"back-button-dom-id\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-dom-id': ("backButtonDomId")
  },hashTypes:{'data-dom-id': "ID"},hashContexts:{'data-dom-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n			");
  data.buffer.push(escapeExpression((helper = helpers['question-back-button'] || (depth0 && depth0['question-back-button']),options={hash:{
    'navigateAction': ("navigate")
  },hashTypes:{'navigateAction': "STRING"},hashContexts:{'navigateAction': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "question-back-button", options))));
  data.buffer.push("\n		</div>\n	</div>\n</form>\n");
  return buffer;
  
}); });