var express = require('express'),
    app = express(),
    routes = require('./routes');

app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));
//app.use('/img', express.static('https://s3.amazonaws.com/afdocs/assets/img'));
app.get('/img/*', function(req, res){
    res.redirect(301, 'https://s3.amazonaws.com/afdocs/assets' + req.url);
});
app.get('/search', routes.search);
app.get('/*', routes.pages);

app.listen(process.env.VCAP_APP_PORT || 3000);
