'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path  = require("path");
var fs = require("fs");

var AddtestGenerator = module.exports = function AddtestGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.Base.apply(this, arguments);

  // console.log("ed");

};

util.inherits(AddtestGenerator, yeoman.generators.Base);

AddtestGenerator.prototype.setPaths = function setPaths() {
    this.moduleRoot = process.cwd();
    this.buildFilePath = path.join(this.moduleRoot, './build.json');
};

AddtestGenerator.prototype.isInModule = function isInModule() {
    if (!fs.existsSync(this.buildFilePath)) {
        this.log.error('Please use this command inside a module !\n');
        process.exit(1);
    }
}

AddtestGenerator.prototype.createStructure = function createStructure() {
    this.mkdir("tests");
    this.mkdir("tests/unit");
    this.mkdir("tests/unit/assets");
};


