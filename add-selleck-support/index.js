/*global require module*/
"use strict";
var util = require("util");
var yeoman = require("yeoman-generator");
var path = require("path");
var fs = require("fs");
var scriptBase = require("../script-base");

module.exports = function Generator(args, options, config) {
    scriptBase.apply(this, arguments);
    this.setUpPaths();
    this._isInRootModule();
};

util.inherits(Generator, scriptBase);

Generator.prototype.createStructure = function createStructure() {

    if (this.entityContext = "module") {

        this.mkdir("docs");

        this.mkdir("assets/skins");
        this.mkdir("assets/skins/sam");
        this.template("assets/skins/sam/moduleName-skin.css", "assets/skins/sam/" + this.moduleName + "-skin.css");
        this.template("assets/moduleName-core.css", "assets/" + this.moduleName + "-core.css");
    }

};
