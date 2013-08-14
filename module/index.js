'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

/**
 * minimum structure needed to shift the module
 * @method createStructure
 *
 */
 ModuleGenerator.prototype.createStructure = function createStructure() {

    this.mkdir(this.name);
    this.mkdir(this.name+"/js");
    this.template("_moduleName.js", this.name+"/js/"+ this.name +".js");
    this.template("_build.json", this.name+"/build.json");

};
