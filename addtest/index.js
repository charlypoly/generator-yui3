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
    this.moduleRootPath = process.cwd();
    this.buildFilePath = path.join(this.moduleRootPath, './build.json');
    this._isInModule();

    this.moduleName = JSON.parse(this.readFileAsString(this.buildFilePath)).name;
    this.generatorRootPath = this._lookForProjectRoot();
    this.packageFileFromGeneratorPath = path.join(this.generatorRootPath, './package.json');

    this.yuiVersionUsed = JSON.parse(this.readFileAsString(this.packageFileFromGeneratorPath));

    console.log(this.yuiVersionUsed)

};

AddtestGenerator.prototype._createStructure = function createStructure() {
    this.mkdir("tests");
    this.mkdir("tests/unit");
    this.mkdir("tests/unit/assets");
    this.template("assets/_module-name-test.js", "tests/unit/assets/" + this.moduleName + "-test.js" );
    this.template("_module-name.html", "tests/unit/" + this.moduleName + ".html" );
};

AddtestGenerator.prototype._isInModule = function _isInModule() {
    if (!fs.existsSync(this.buildFilePath)) {
        this.log.error('Please use this command inside a module !\n');
        process.exit(1);
    }
}

/*
 * @method _lookForProjectRoot
 *
 */
AddtestGenerator.prototype._lookForProjectRoot = function _lookForProjectRoot() {
    var model = "";

    while (true) {
        var pathFolder = path.join(     process.cwd()  TODO __dirname    , model);
        var pathFile = path.join(pathFolder, './package.json');
        if (fs.existsSync(pathFile)) {
            return pathFolder;
        }
        //change path
        model = model + "../";
    }

};
