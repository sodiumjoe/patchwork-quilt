var conf = require('./config');
var menu = [],
    redirectList = [
        {
            url: "/frameworks/java",
            redirect: "/languages/java/overview"
        },
        {
            url: "/frameworks/node",
            redirect: "/languages/node"
        },
        {
            url: "/frameworks/php",
            redirect: "/languages/php/overview"
        },
        {
            url: "/frameworks/python",
            redirect: "/languages/python/overview"
        },
        {
            url: "/frameworks/ruby",
            redirect: "/languages/ruby/overview"
        }
    ];

exports.search = function(req, res){

    conf.Menu.findOne({"title": "menu"}, function(err, menuArr){
        if(err){
            console.log(err);
        }else{
            if(menuArr){
                menu = menuArr.menuArray;
            }else{
                console.log('no menu object in db');
            }
        }
    });

    res.render('search.jade', {
        title: 'Search',
        body: '<div id="search-results"><h2>Search results for "' + req.query.q + '":</h2><div id="inner"></div></div>',
        menu: menu,
        path: '/search',
        searchifyPublicURL: conf.searchify + '/v1/indexes/' + conf.github.user + '-' + conf.github.repo
    });
};

exports.pages = function(req, res, next){

    conf.Menu.findOne({"title": "menu"}, function(err, menuArr){
        if(err){
            console.log(err);
        }else{
            if(menuArr){
                menu = menuArr.menuArray;
            }else{
                console.log('no menu object in db');
            }
        }
    });

    var pathArr = req.url.substring(1).split('/');
    if(req.url === '/'){
        conf.Doc.findOne({"path": "index"}, function(err,doc){
            if(err){
            }else if(doc){
                res.render('doc.jade', {
                    title: doc.title,
                    body: doc.body,
                    menu: menu,
                    path: req.url.substring(1)
                });
            }else{
                next(err);
            }
        });
    }else{
        if(req.url[req.url.length - 1] === '/'){
            res.redirect(301, req.url.substring(0, req.url.length - 1));
        }else if(req.url.substring(req.url.length - 8) === 'overview'){
            res.redirect(301, req.url.replace('/overview',''));
        }else{
            conf.Doc.findOne({"path": req.url.substring(1)}, function(err, doc){
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
                    console.log(req.url);
                    conf.Doc.findOne({"path": req.url.substring(1) + '/index'}, function(err, doc){
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
                            var notfound = new NotFound;
                            next(notfound);
                        }
                    });
                }
            });
        }
    }
};

function checkRedirectList(req, callback){
    var redirectObj = null;
    async.forEach(redirectList, function(item, forCallback){
        if(req.url === item.url){
            redirectObj = item;
        }
        forCallback(null);
    }, function(err){
        if(err){
            callback(err, null);
        }else{
            callback(null, redirectObj);
        }
    });
}

exports.errorHandler = function(err, req, res, next){
    res.render('doc.jade', {
        title: '404 - Not Found',
        menu: menu,
        body: "<h2>Sorry, we don't have anything there.</h2>",
        path: '/'
    });
}

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
