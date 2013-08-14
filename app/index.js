'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Yui3Generator = module.exports = function Yui3Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Yui3Generator, yeoman.generators.Base);
