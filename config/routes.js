var request = require('request');

module.exports = function(app){

    app.all('/externalservices*', function(req, res, next) {
        var options = {
            url: 'https://dpqacr01-coaching.healthmedia.com' + req.url
        }
        req.pipe(request(options)).pipe(res);
    });
    app.all('/mhmsite/program-coaching/digital-health-coaching', function(req, res, next) {
    	require('../controllers/Products').run(req, res, next);
    });
    app.all('/product/:product', function(req, res, next) {
    	require('../controllers/Product').run(req, res, next);
    });
    app.all('/careers', function(req, res, next) {
    	require('../controllers/Page').run('careers', req, res, next);
    });
    app.all('/contacts', function(req, res, next) {
    	require('../controllers/Page').run('contacts', req, res, next);
    });
    app.all('/*', function(req, res, next) {
        require('../controllers/Home').run(req, res, next);
    });
};
