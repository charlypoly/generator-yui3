'use strict';
var util = require('util'),
yeoman = require('yeoman-generator'),
path = require("path"),
fs = require("fs"),
beautify = require('js-beautify').js_beautify,
scriptBase = require('../script-base'),
utils = require('../utils'),
exec = require('child_process').exec,
child;

var Generator = module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);
    this.setUpPaths();
    // TODO create a this._isInModule() different from this._isAtRootModule()
};

util.inherits(Generator, scriptBase);

Generator.prototype.createStructure = function createStructure() {
    var buildFileInfo = utils.reachFirst("build.json");

    child = exec('shifter', {
            cwd: buildFileInfo.pathFolder
        },
        function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

};
