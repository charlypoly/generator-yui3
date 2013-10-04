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
    this._isInModule();

    var packageJsonInfo = utils.reachFirst("package.json");
    if (packageJsonInfo) {
        this.packageJsonPath = utils.reachFirst("package.json").pathFile;
        this.packageJson = JSON.parse(this.readFileAsString(this.packageJsonPath));
        this.yui3Version = this.packageJson.dependencies.yui;
    }

};

util.inherits(Generator, scriptBase);

Generator.prototype._createStructure = function _createStructure() {
    this.mkdir("tests");
    this.mkdir("tests/unit");
    this.mkdir("tests/unit/assets");
};
