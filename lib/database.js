var mongoose = require('mongoose'),
    config = require('./lib/config'),
    async = require('async'),
    db = mongoose.createConnection('localhost', config.github.user + '-' + config.github.repo),
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
    docsColl.on('error', console.error.bind(console, 'mongo connection error:'));
    menuColl.on('error', console.error.bind(console, 'mongo connection error:'));


exports.Doc = Doc;
exports.Menu = Menu;
