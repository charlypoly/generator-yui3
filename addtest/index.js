'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AddtestGenerator = module.exports = function AddtestGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the addtest subgenerator with the argument ' + this.name + '.');
};

util.inherits(AddtestGenerator, yeoman.generators.NamedBase);

AddtestGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
