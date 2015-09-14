'use strict';
var NAME        = "module",
    util        = require('util'),
    yeoman      = require('yeoman-generator'),
    path        = require("path"),
    fs          = require("fs"),
    scriptBase  = require('../script-base'),
    utils       = require('../utils');


var Generator = module.exports = function Generator(args, options, config) {

    scriptBase.apply(this, arguments);
    this.setUpPaths();

    //if(this.context.where !== "project" || this.context.position !== "src" ){
    //    this.log.error('You are not in the src folder\n');
    //    process.exit(1);
    //}

    this.name = this.args[0];

    if(!this.name){
        this.log.error('Give your module a name !!\n');
        process.exit(1);
    }

    this.namespace = "Y";

};

util.inherits(Generator, scriptBase);


Generator.prototype.createStructure = function createStructure() {
    this.mkdir(this.name);

    this.template("_build.json", this.name + "/build.json");

    this.mkdir(this.name + "/meta");
    this.template("_meta.json", this.name + "/meta/" + this.name + ".json");

    this.mkdir(this.name + "/js");
    this.template("js/base/_moduleName.js", this.name + "/js/" + this.name + ".js");
}
