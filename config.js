var yaml = require('yamlparser'),
    fs = require('fs'),
    configYaml = fs.readFileSync('./config.yml', 'utf8'),
    config = yaml.eval(configYaml);

module.exports = config;
