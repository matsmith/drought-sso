var BaseController = require("./Base"),
	View = require("../views/Base")
	//model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({
	name: "Home",
    nav: null,
	content: null,
	run: function(req, res, next) {
        this.getNav();
		this.getContent();
		new View(res, 'home').render( this.content, { nav: 'nav' } );
	},
	getContent: function(callback) {
		this.content = {};
 		this.content.bannerTitle = 'Home Title';
 		this.content.bannerText = 'Home Banner Text';
 		var blogArticles = '';
		blogArticles += '\
			<div class="item">\
                <img src="images/blog-article-img1.jpg" alt="" />\
                <a href="/blog/1">Blog Title 1</a>\
            </div>\
		';
 		this.content.blogArticles = blogArticles;
	}
});
