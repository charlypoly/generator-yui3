'use strict';
var util = require('util'),
yeoman = require('yeoman-generator'),
generator = require('./module-generator.js'),

ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.start = function start() {
  generator.create.apply(this, name, type, options);
};
