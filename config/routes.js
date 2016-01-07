var request = require('request');

module.exports = function(app, session){

    // Service Proxies
    app.all('/externalservices*', function(req, res, next) {
        var options = {
            url: 'https://dpqacr01-coaching.healthmedia.com' + req.url
        }
        req.pipe(request(options)).pipe(res);
    });

    // App Routes
    app.all('/login', function(req, res, next) {
        require('../controllers/Login').run(req, res, next);
    });
    app.all('/logout', function(req, res, next) {
        require('../controllers/Logout').run(req, res);
    });
    app.all('/mhmsite/*', requireLogin, function(req, res, next) {
        next();
    });
    app.all('/mhmsite/program-coaching/digital-health-coaching', function(req, res, next) {
    	require('../controllers/Products').run(req, res, next);
    });
    // SAML over to Drupal site
    app.all('/mhmsite/program/succeed/options', function(req, res, next) {
        require('../controllers/Saml').run(req, res, next);
    });
    app.all('/product/:product', function(req, res, next) {
    	require('../controllers/Product').run(req, res, next);
    });
    app.all('/*', function(req, res, next) {
        require('../controllers/Home').run(req, res, next);
    });

    function requireLogin(req, res, next){
        require('../controllers/Auth').run(req, res, next);
    }
};
