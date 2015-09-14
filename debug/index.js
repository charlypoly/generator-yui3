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




    var remain = options.argv.remain,
        remainLength = remain.length;
    this.langToAdd = [];

    this.prefix = options.prefix ? options.prefix : "";

    if (remainLength) {
        this.langToAdd = remain;
    } else {
        // def
        this.langToAdd = JSON.parse(this.readFileAsString(this.configFilePath)).lang;
    }




};

util.inherits(Generator, scriptBase);

Generator.prototype.actions = function actions() {


    if(false){




        console.log("this.configFileInfo: "); console.log(this.configFileInfo);
        console.log("this.projectRootPath: "); console.log(this.projectRootPath);
        console.log("this.configFileInfo: "); console.log(this.configFileInfo);
        console.log("this.configFilePath: "); console.log(this.configFilePath);
        console.log("this.configFileInfo: "); console.log(this.configFileInfo);
        console.log("this.configFileData: "); console.log(this.configFileData);
        console.log("this.configFilePath: "); console.log(this.configFilePath);
        console.log("this.prefixedModuleName: "); console.log(this.prefixedModuleName);
        console.log("this.configFilePath: "); console.log(this.configFilePath);
        console.log("this.metaFilePath "); console.log(this.metaFilePath);
    }






};
