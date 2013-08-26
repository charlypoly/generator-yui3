'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var fs = require("fs");
var beautify = require('js-beautify').js_beautify;

var AddtemplateGenerator = module.exports = function AddtemplateGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    var remain = options.argv.remain,
        remainLength = remain.length;

    // extra name for file template
    if (remainLength) {
        this.extraName = remain[0];
    }

    if (this.extraName) {
        console.log("extra name : " + this.extraName);
    }

};

util.inherits(AddtemplateGenerator, yeoman.generators.Base);

// util.inherits(AddtemplateGenerator, yeoman.generators.NamedBase);

// 0 - get require info
// 1 - create templates folder
// 2 - add handlebars dependance in meta file
// 3 - update the build file

AddtemplateGenerator.prototype.preGenActions = function preGenActions() {



    this.rootFolder = process.cwd();
    this.buildFilePath = path.join(process.cwd(), './build.json');
    this._isInModule();

    this.moduleName = JSON.parse(this.readFileAsString(path.join(process.cwd(), './build.json'))).name;
    // get project name
    this.projectName = JSON.parse(this.readFileAsString(path.join(process.cwd(), '../../package.json'))).name;

    //paths
    this.metaFilePath = path.join(process.cwd(), './meta/' + this.moduleName + '.json');


    // console.log(this.moduleName);
    // console.log(this.projectName);
    // console.log(this.buildFilePath);
    // console.log(this.metaFilePath);

};

AddtemplateGenerator.prototype.generator = function generator() {

    // create templates directory
    this.mkdir("templates");

    // create template file ?
    var name = this.extraName ? this.moduleName + "-" + this.extraName : this.moduleName
    var fileFullPath = path.join(this.rootFolder, "templates/" + name + ".handlebars.html");
    if (!fs.existsSync(fileFullPath)) {
        this.template("_myModule.handlebars.html", "templates/" + name + ".handlebars.html");
    } else {
        this.log.info(fileFullPath, "Already exists...");
    }

    // update meta
    this._addDepsInMetaFile({
        metaFullPath : this.metaFilePath,
        moduleName : this.moduleName,
        depsTab : ["handlebars"]
    });

    // update build
    var buildFile = JSON.parse(this.readFileAsString(this.buildFilePath));
    this._pushOnce(buildFile.builds[this.moduleName].jsfiles, "../templates/" + name + ".js", true);
    if (!buildFile.exec) {
        buildFile.exec = [];
    }
    this._pushOnce(buildFile.exec, "yo yui3:handlebars");
    this.write(this.buildFilePath, beautify(JSON.stringify(buildFile), {
        indent_size: 3
    }));

}

AddtemplateGenerator.prototype.notice = function notice() {
    console.log(" ---------- copy/paste ----------")
    console.log(" var markup = Y.templates[NAME]({}); ");
}

//private
// ------------------------------------------------------------------------------

AddtemplateGenerator.prototype._isInModule = function _isInModule() {
    console.log(this.buildFilePath);
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
AddtemplateGenerator.prototype._pushOnce = function _pushOnce(tab, el, inverse) {
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

/*
 * @method _addDepsInMetaFile
 * @param {Object} [options]
 *      @param {String} [options.metaFullPath]
 *      @param {String} [options.moduleName]
 *      @param {Array}  [options.depsTab]
 * @private
 *
 */
AddtemplateGenerator.prototype._addDepsInMetaFile = function _addDepsInMetaFile(options) {

    var metaFullPath, moduleName,
        i, depsTab, dep, depsLength,
        // have to update the meta or not
        update = false;

    if (options) {
        if (!options.metaFullPath) {
            this.log.error(' addTemplate:index.js:_addDepsInMetaFile() : Please provide a metaFullPath !\n');
            process.exit(1);
        } else {
            metaFullPath = options.metaFullPath;
        }

        if (!options.moduleName) {
            this.log.error(' addTemplate:index.js:_addDepsInMetaFile() : Please provide a moduleName !\n');
            process.exit(1);
        } else {
            moduleName = options.moduleName;
        }

        if (!options.depsTab) {
            this.log.error(' addTemplate:index.js:_addDepsInMetaFile() : Please provide a depsTab !\n');
            process.exit(1);
        } else {
            depsTab = options.depsTab;
            depsLength = depsTab.length;
        }
    }

    var metaFile = JSON.parse(this.readFileAsString(metaFullPath)),
        requires = metaFile[moduleName].requires;

        for (i = 0; i < depsLength; i++) {
            dep = depsTab[i] ;
            update = this._pushOnce(requires, dep);
        }

        if(update){
            this.write( metaFullPath , JSON.stringify(metaFile) );
        }

    }
