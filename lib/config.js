var yaml = require('yamlparser'),
    mongoose = require('mongoose'),
    async = require('async'),
    fs = require('fs'),
    configYaml = fs.readFileSync('./config.yml', 'utf8'),
    config = yaml.eval(configYaml),
    db = mongoose.createConnection('localhost', config.github.user + '-' + config.github.repo),
    docsColl = new mongoose.Schema({
        name: String,
        title: String,
        body: String,
        redirect: String,
        path: String
    }),
    menuColl = new mongoose.Schema({
        menuArray: Array
    });
    config.Doc = db.model('document', docsColl);
    config.Menu = db.model('menu', menuColl);
    docsColl.on('error', console.error.bind(console, 'mongo connection error:'));
    menuColl.on('error', console.error.bind(console, 'mongo connection error:'));

module.exports = config;
