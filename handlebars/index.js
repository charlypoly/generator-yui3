'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require("fs");
var Handlebars = require('yui/handlebars').Handlebars;
var path = require("path");
var scriptBase = require('../script-base');

var Generator = module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);

    this.setUpPaths();
    this._isInModule();
};

util.inherits(Generator, scriptBase);

Generator.prototype.setPaths = function setPaths() {
    this.templatesFolderPath = path.join(this.moduleRootPath, "./templates");
};

Generator.prototype.actions = function actions() {

    var files = fs.readdirSync(this.templatesFolderPath),
        i, fileLength = files.length,
        fileName, matches, templateFileRaw;


    for (i = 0; i < fileLength; i++) {
        fileName = files[i];
        matches = fileName.match(/^([^\.]*)\.handlebars.html$/);

        if (matches) {
            templateFileRaw = this.readFileAsString(path.join(this.templatesFolderPath, fileName));
            var content = "Y.namespace('templates')['" + matches[1] + "'] = Y.Handlebars.template(" + Handlebars.precompile(templateFileRaw) + ");\n"
            this.write(path.join(this.templatesFolderPath, matches[1] + ".js"), content);
        }
    }

};
