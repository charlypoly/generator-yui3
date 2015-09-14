'use strict';
var NAME        = "testgen",
    util        = require('util'),
    yeoman      = require('yeoman-generator'),
    path        = require("path"),
    fs          = require("fs"),
    scriptBase  = require('../script-base');

module.exports = Generator;

function Generator(args, options, config) {
    scriptBase.apply(this, arguments);

     this.setUpPaths();
    // scriptBase._isInRootModule();


    // this.getModuleDepedencies();

    // console.log(NAME ? NAME : "" ," this.whereAmI() : ", this.whereAmI());
};

util.inherits(Generator, scriptBase);

Generator.prototype.consoleLogProps = function consoleLogProps() {
    console.log("this.configFileInfo : ", this.configFileInfo);
    console.log("");
    console.log("this.projectRootPath : ", this.projectRootPath);
    console.log("");
    console.log("this.configFilePath : ", this.configFilePath);
    console.log("");
    console.log("this.configFileData : ", this.configFileData);
    console.log("");
    console.log("this.buildPrefix : ", this.buildPrefix);
    console.log("");
    console.log("this.currentPath : ", this.currentPath);
    console.log("");
    console.log("this.projectName : ", this.projectName);
    console.log("");
    console.log("this.generatorRootPath : ", this.generatorRootPath);
    console.log("");
    console.log("this.context : ", this.context);
    console.log("");
    console.log("this.buildFileInfo : ", this.buildFileInfo);
    console.log("");
    console.log("this.moduleName : ", this.moduleName);
    console.log("");
    console.log("this.metaFilePath : ", this.metaFilePath);
}
