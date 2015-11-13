define(['handlebars'], function(Handlebars) {

this["notificationToastWidget"] = this["notificationToastWidget"] || {};

this["notificationToastWidget"]["notificationToastTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"notificationToast\">\n	<div class=\"notificationToastMessage\" data-dom-id=\"achievement-view\" data-bindpoint=\"achievementView\">\n		<p class=\"notificationIconTrophy\" ></p>\n		<p class=\"certificateText\" >"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.content)),stack1 == null || stack1 === false ? stack1 : stack1.model)),stack1 == null || stack1 === false ? stack1 : stack1.toastNotificationContent)),stack1 == null || stack1 === false ? stack1 : stack1.newCertificateEarned)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</div>\n</div>\n";
  return buffer;
  });

return this["notificationToastWidget"];

});