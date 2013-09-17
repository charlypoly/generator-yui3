'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var fs = require("fs");
var beautify = require('js-beautify').js_beautify;
var scriptBase = require('../script-base');

var Generator = module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);
    this.setUpPaths();
    this._isInModule();
};

util.inherits(Generator, scriptBase);

Generator.prototype.createStructure = function createStructure() {
    this.mkdir("assets");
    this.mkdir("assets/skins");
    this.mkdir("assets/skins/sam");
    this.template("assets/skins/sam/moduleName-skin.css", "assets/skins/sam/"+ this.moduleName +"-skin.css");
    this.template("assets/moduleName-core.css", "assets/"+ this.moduleName +"-core.css");
};
