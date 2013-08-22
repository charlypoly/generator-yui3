'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var fs = require("fs");

var AddlangGenerator = module.exports = function AddlangGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.rootFolder = process.cwd();
    this.buildFilePath = path.join(this.rootFolder, './build.json');


    this._isInModule();
    this.moduleName = JSON.parse(this.readFileAsString(this.buildFilePath)).name;
    this.metaFilePath = path.join(this.rootFolder, 'meta/' + this.moduleName + '.json');
    this.pathToGenYUI3 = path.join(process.cwd(), "../..", ".generator-yui3.json");

    // console.log(this.rootFolder);
    // console.log(this.buildFilePath);
    // console.log(this.moduleName);
    // console.log(this.pathToGenYUI3);

    var remain = options.argv.remain,
        remainLength = remain.length;
    this.langToAdd = [];

    // extra name for file template
    if (remainLength) {
        this.langToAdd = remain;
    } else {
        // def
        this.langToAdd = JSON.parse(this.readFileAsString(this.pathToGenYUI3)).lang;
    }

    if (this.langToAdd) {
        console.log("add lang : " + this.langToAdd);
    }

};

util.inherits(AddlangGenerator, yeoman.generators.Base);

AddlangGenerator.prototype.actions = function actions() {

    var lang, langLength = this.langToAdd.length,
        i, fileToCreate,
        metaFile = JSON.parse(this.readFileAsString(  this.metaFilePath  )),
        updateMeta = false;





    // create lang folder if needed
    // ---------------------------------------------------------
    if (fs.existsSync(path.join(this.rootFolder, "lang"))) {
        this.mkdir(path.join(this.rootFolder, "lang"));
    }

    // create lang files if needed & update build.json
    // ---------------------------------------------------------

    fileToCreate = path.join(this.rootFolder, "/lang/", this.moduleName + ".js");
    if (!fs.existsSync(fileToCreate)) {
        this.write(fileToCreate, "{}");
    }

    for (i = 0; i < langLength; i++) {
        lang = this.langToAdd[i];
        fileToCreate = path.join(this.rootFolder, "/lang/", this.moduleName + "_" + lang + ".js");
        if (!fs.existsSync(fileToCreate)) {
            updateMeta = true;
            this.write(fileToCreate, "{}");
            this._pushOnce( metaFile[this.moduleName].lang , lang);
        }
    }

    if(updateMeta){
        this.write(this.metaFilePath, JSON.stringify(metaFile));
    }else{
        this.log.info("Nothing to do...");
    }

};

// private
// --------------------------------------------------------------------------
AddlangGenerator.prototype._isInModule = function _isInModule() {
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
AddlangGenerator.prototype._pushOnce = function _pushOnce(tab, el, inverse) {
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
