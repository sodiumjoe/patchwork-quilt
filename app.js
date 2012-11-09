var express = require('express'),
    app = express(),
    routes = require('./routes');

app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public/img'));
app.get('/*', routes.pages);

app.listen(process.env.VCAP_APP_PORT || 3000);
