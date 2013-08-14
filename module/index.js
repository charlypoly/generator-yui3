'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);


/**
 * @method beforeCreate
 *
 */
 ModuleGenerator.prototype.beforeCreate = function(){
    if(!this._srcExists()){
        this.log.error("bejlhezu");
        process.exit(1);
    }
}
/**
 * minimum structure needed to shift the module
 * @method createStructure
 *
 */
ModuleGenerator.prototype.createStructure = function createStructure() {
    this.mkdir(this.name);
    this.mkdir(this.name + "/js");
    this.template("_moduleName.js", this.name + "/js/" + this.name + ".js");
    this.template("_build.json", this.name + "/build.json");
};

/**
 * @method meta
 *
 */
ModuleGenerator.prototype.meta = function meta() {
    this.mkdir(this.name + "/meta");
    this.template("meta/_meta.json", this.name + "/meta/" + this.name + ".json");
}

/**
 * @method tests
 *
 */
ModuleGenerator.prototype.tests = function tests() {
    this.mkdir(this.name + "/tests");
    this.mkdir(this.name + "/tests/unit");
    this.mkdir(this.name + "/tests/unit/assets");
    this.template("tests/_moduleName-test.js",this.name +  "/tests/unit/assets/" + this.name + "-test.js");
    this.template("tests/_moduleName.html",this.name +  "/tests/unit/" + this.name + ".html");

    var projectName = this._getProjectName();

    if(!projectName){
        this.log.error("Provide a package.json file to your project !!");
        process.exit(1);
    }

}

// private
// -------------------------------------------------------------------------------------------------
/**
 * @method _getProjectName
 * @private
 *
 */
ModuleGenerator.prototype._getProjectName = function _getProjectName() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), '../package.json')));
    return pkg.name;
}

/**
 * @method this._srcExists
 * @private
 *
 */
ModuleGenerator.prototype._srcExists = function _srcExists() {
     var srcPathTab = process.cwd().split("/");
     var length = srcPathTab.length;
     return srcPathTab[length - 1] === "src";
}


ModuleGenerator.prototype._generateMeta = function() {
    
}