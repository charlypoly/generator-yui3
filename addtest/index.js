'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var fs = require("fs");
var scriptBase = require('../script-base');
var utils = require('../utils');

var Generator = module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);
    this.setUpPaths();

    if(this.context.where !== "module" || this.context.position !== "root"){
        this.log.error('You are not at the root of your module\n');
        process.exit(1);
    }







    // var packageJsonInfo = utils.reachFirst("package.json");
    // if (packageJsonInfo) {
    //     this.packageJsonPath = utils.reachFirst("package.json").pathFile;
    //     this.packageJson = JSON.parse(this.readFileAsString(this.packageJsonPath));
    //     this.yui3Version = this.packageJson.dependencies.yui;
    // }

    // this.yui3Version = this.configFileData.software_version.yui


};

util.inherits(Generator, scriptBase);

Generator.prototype.createStructure = function createStructure() {
    this.mkdir("tests");
    this.mkdir("tests/unit");
    this.mkdir("tests/unit/assets");
    this.template("unit/_module-name.html", "tests/unit/" + this.moduleName + ".html" );
    this.template("unit/assets/_module-name-test.js", "tests/unit/assets/" + this.moduleName + "-test.js" );
};
