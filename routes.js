var mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'afdocs'),
    docsColl = new mongoose.Schema({
        name: String,
        title: String,
        body: String,
        redirect: String
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

exports.search = function(req, res){
    res.render('doc.jade', {
        title: 'Search',
        body: '<div id="search-results"><h2>Search results for "' + req.query.q + '":</h2><div id="inner"></div></div>',
        menu: menu,
        path: '/search'
    });
};

exports.pages = function(req, res){
    var pathArr = req.url.substring(1).split('/');
    if(req.url === '/'){
        Doc.findOne({"path": "overview"}, function(err,doc){
            if(err){
                console.log(err);
            }else if(doc){
                res.render('doc.jade', {
                    title: doc.title,
                    body: doc.body,
                    menu: menu,
                    path: req.url.substring(1)
                });
            }else{
                console.log(req.url + ' not found');
                res.send(req.url + ' not found');
            }
        });
    }else{
        if(req.url[req.url.length - 1] === '/'){
            res.redirect(301, req.url.substring(0, req.url.length - 1));
        }else{
            Doc.findOne({"path": req.url.substring(1)}, function(err, doc){
                if(err){
                    console.log(err);
                }else if(doc){
                    if(doc.redirect){
                        res.redirect(301, doc.redirect);
                    }else{
                        res.render('doc.jade', {
                            title: doc.title,
                            body: doc.body,
                            menu: menu,
                            path: req.url.substring(1)
                        });
                    }
                }else{
                    Doc.findOne({"path": req.url.substring(1) + '/overview'}, function(err, doc){
                        if(err){
                            console.log(err);
                        }else if(doc){
                            res.redirect(301, req.url.substring(1) + '/overview');
                        }else{
                            console.log(req.url + ' not found');
                            res.send(req.url + ' not found');
                        }
                    });
                }
            });
        }
    }
};
