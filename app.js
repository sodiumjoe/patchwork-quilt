var express = require('express'),
    conf = require('./lib/config.js'),
    app = express(),
    routes = require('./lib/routes');

app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public'));

if(process.env.VCAP_SERVICES){
    app.get('*', function(req, res, next){
        if(req.headers["x-forwarded-proto"] != "https"){
            res.redirect("https://" + req.headers.host + req.url);
        }else{
            next();
        }
    });
}

app.get('/img/*', function(req, res){
    res.redirect(301, conf.assets + req.url);
});

app.get('/search', routes.search);
app.get('/*', routes.pages);
app.use(routes.errorHandler);

app.listen(process.env.VCAP_APP_PORT || 3000);
