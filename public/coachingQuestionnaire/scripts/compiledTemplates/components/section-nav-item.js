define('coachingQuestionnaire/scripts/compiledTemplates/components/section-nav-item', ['ember'], function(Ember) { return Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<span class=\"activeIncomplete\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("activeIncomplete"),
    'fillColor': ("stroke-color-3 fill-path-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n		</span>\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isActiveComplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<span class=\"activeComplete\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("activeComplete"),
    'fillColor': ("stroke-color-3 fill-path-color-3")
  },hashTypes:{'src': "STRING",'fillColor': "STRING"},hashContexts:{'src': depth0,'fillColor': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n		</span>\n	");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isInactiveIncomplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<span class=\"inactiveIncomplete\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("inactiveIncomplete")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n		</span>\n	");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isInactiveComplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<span class=\"inactiveComplete\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("inactiveComplete")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n		</span>\n	");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		<span class=\"placeholderIncomplete\">\n			");
  data.buffer.push(escapeExpression((helper = helpers.renderImage || (depth0 && depth0.renderImage),options={hash:{
    'src': ("placeholderIncomplete")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "renderImage", options))));
  data.buffer.push("\n		</span>\n	");
  return buffer;
  }

  data.buffer.push("	\n	");
  stack1 = helpers['if'].call(depth0, "isActiveIncomplete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
}); });