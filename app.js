var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'afdocs'),
    docsColl = new mongoose.Schema({
        name: String,
        title: String,
        body: String
    }),
    menuColl = new mongoose.Schema({
        menuArray: Array
    }),
    Doc = db.model('document', docsColl),
    Menu = db.model('menu', menuColl);

var menu = [];
Menu.findOne({"title": "menu"}, function(err, menuArr){
    menu = menuArr.menuArray;
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db conn');
});

app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public/img'));

app.get('/*', function(req, res){
    var pathArr = req.url.substring(1).split('/');
    Doc.findOne({"path": req.url.substring(1)}, function(err, doc){
        if(err){
            console.log(err);
        }else if(doc){
            res.render('doc.jade', {
                title: doc.title,
                body: doc.body,
                menu: menu,
                path: req.url.substring(1),
                pathArr: pathArr
            });
            console.log(req.url);
            console.log(pathArr);
        }else{
            console.log(req.url + ' not found');
            res.send(req.url + ' not found');
        }
    });
});

app.listen(process.env.VCAP_APP_PORT || 3000);
