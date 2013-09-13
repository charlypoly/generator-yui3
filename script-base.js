/**
 * functionalities often used
 * @module utils
 */


'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var utils = require('./util');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

/*
 * @method setUpPaths
 *
 */
Generator.prototype.setUpPaths = function setUpPaths() {

    this.projectRootPath = utils.reachFirst(".generator-yui3.json").pathFolder;
    this.generatorFileConfigPath = path.join(this.projectRootPath, ".generator-yui3.json");
    // where we lunch yo
    this.currentPath = process.cwd();
    // as we are in a module we set the projectName
    this.projectName = JSON.parse(this.readFileAsString(this.generatorFileConfigPath)).projectName;

    // --------------------------------------------------
    // generator part
    // --------------------------------------------------
    this.generatorRootPath = __dirname;

    // --------------------------------------------------
    // target part
    // --------------------------------------------------

    // set entity context. could be "project" or "module"
    // if it is project we have the .generator-yui3.json
    if (fs.existsSync(path.join(this.currentPath, ".generator-yui3.json"))) {
        this.entityContext = "project";
    }
    // if it is module we have the build.json
    if (fs.existsSync(path.join(this.currentPath, "build.json"))) {
        this.entityContext = "module";
    }

    if (this.entityContext === "module") {

        this.moduleRootPath = process.cwd();

        // build file path
        this.buildFilePath = path.join(this.currentPath, './build.json');
        var buildFile = JSON.parse(this.readFileAsString(this.buildFilePath));
        // console.log(buildFile);
        this.entityName = buildFile.name;

        // meta file path
        this.metaFilePath = path.join(this.currentPath, 'meta/' + this.entityName + '.json');
        var metaFile = JSON.parse(this.readFileAsString(this.metaFilePath));
        // console.log(metaFile);

    } else {

    }

}

Generator.prototype._isInModule = function _isInModule() {
    if (this.entityContext !== "module") {
        this.log.error('Please use this command inside a module !\n');
        process.exit(1);
    }
};

/**
 * Only push once a string element
 *
 * @method pushOnce
 * @param tab {Array} tab to push the element in if it is unique
 * @param el {String} the element to push in
 * @param inverse if true do not push but unshift
 */
Generator.prototype._pushOnce = function _pushOnce(tab, el, inverse) {
    var i,
        tabLength = tab.length;

    for (i = 0; i < tabLength; i++) {
        if (tab[i] === el) {
            return;
        }
    }

    if (inverse) {
        tab.unshift(el);
        return true;
    } else {
        tab.push(el);
        return true;
    }
};
