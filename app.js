var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'afdocs'),
    docsColl = new mongoose.Schema({
        name: String,
        title: String,
        body: String
    }),
    Doc = db.model('document', docsColl);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db conn');
});

app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('index.jade', {title: 'Hello'})
});

app.get('/favicon.ico', function(req, res){
    
});

app.get('/*', function(req, res){
    Doc.findOne({"path": req.url.substring(1)}, function(err, doc){
        if(err){
            console.log(err);
        }else if(doc){
            console.log(doc.title);
            res.render('doc.jade', {
                title: doc.title,
                body: doc.body
            });
        }else{
            console.log(req.url + ' not found');
            res.send(req.url + ' not found');
        }
    });
});

app.listen(process.env.VCAP_APP_PORT || 3000);
