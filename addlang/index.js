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



    if (remainLength) {
        this.langToAdd = remain;
    } else {
        // def
        this.langToAdd = JSON.parse(this.readFileAsString(this.configFilePath)).lang;
    }

    console.log(this.langToAdd);

};

util.inherits(Generator, scriptBase);

Generator.prototype.actions = function actions() {

    var lang, langLength = this.langToAdd.length,
        i, fileToCreate,
        metaFile = JSON.parse(this.readFileAsString(  this.metaFilePath  )),
        updateMeta = false;

    // create lang folder if needed
    // ---------------------------------------------------------
    if (!fs.existsSync("lang")) {
        this.mkdir("lang");
        metaFile[this.moduleName].lang = [];
    }

    // create lang files if needed & update build.json
    // ---------------------------------------------------------

    fileToCreate = path.join("lang/", this.moduleName + ".js");
    if (!fs.existsSync(fileToCreate)) {
        this.write(fileToCreate, "{}");
    }

    for (i = 0; i < langLength; i++) {
        lang = this.langToAdd[i];
        fileToCreate = path.join("lang/", this.moduleName + "_" + lang + ".js");
        if (!fs.existsSync(fileToCreate)) {
            updateMeta = true;
            this.write(fileToCreate, "{}");
            console.log(metaFile)
            this._pushOnce( metaFile[this.moduleName].lang , lang);
        }
    }

    if(updateMeta){
        this.write(this.metaFilePath, JSON.stringify(metaFile, null, 4) );
    }else{
        this.log.info("Nothing to do...");
    }

};

// private
// --------------------------------------------------------------------------
Generator.prototype._isInRootModule = function _isInRootModule() {
    if (!fs.existsSync(this.buildFilePath)) {
        this.log.error('Please use this command inside a module !\n');
        process.exit(1);
    }
}

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
}
