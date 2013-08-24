'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require("fs");
var Handlebars = require('yui/handlebars').Handlebars;
var path = require("path");


var HandlebarsGenerator = module.exports = function HandlebarsGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(HandlebarsGenerator, yeoman.generators.Base);

HandlebarsGenerator.prototype.setPaths = function setPaths() {

    this.rootPath = process.cwd();
    this.templatesPath = path.join(this.rootPath, "./templates");
    this.jsPath = path.join(this.rootPath, "./js");

};

HandlebarsGenerator.prototype.actions = function actions() {

    var files = fs.readdirSync(this.templatesPath),
        i, fileLength = files.length,
        fileName, matches, templateFileRaw;


    for (i = 0; i < fileLength; i++) {
        fileName = files[i];
        matches = fileName.match(/^([^\.]*)\.handlebars.html$/);

        if (matches) {

            templateFileRaw = this.readFileAsString(path.join(this.templatesPath, fileName));
            var content = "Y.namespace('templates')['" + matches[1] + "'] = " + Handlebars.precompile(templateFileRaw) + ";\n"
            this.write(path.join(this.templatesPath, matches[1] + ".js"), content);
        }
    }

};
