'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var fs = require("fs");
var scriptBase = require('../script-base');

var Generator = module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);
    this.setUpPaths();
    if(this.context.where !== "module" || this.context.position !== "root"){
        this.log.error('You are not at the root of your module\n');
        process.exit(1);
    }
};

util.inherits(Generator, scriptBase);

Generator.prototype.createStructure = function createStructure() {
    this.mkdir("assets");
    this.mkdir("assets/skins");
    this.mkdir("assets/skins/sam");
    this.template("assets/skins/sam/moduleName-skin.css", "assets/skins/sam/" + this.moduleName + "-skin.css");
    this.template("assets/moduleName-core.css", "assets/" + this.moduleName + "-core.css");
};

Generator.prototype.updateMeta = function updateMeta() {
    var metaFile = JSON.parse(this.readFileAsString(this.metaFilePath));
    metaFile[this.moduleName].skinnable = true;
    this.write(this.metaFilePath, JSON.stringify(metaFile, null, 4));
};

Generator.prototype.advices = function advices() {
    console.log("Please...");
    console.log("shift your module");
    console.log("shift your loader");
};
