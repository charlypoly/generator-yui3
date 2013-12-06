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

    // extra name for file template
    if (remainLength) {
        this.extraName = remain[0];
    }

    if (this.extraName) {
        console.log("extra name : " + this.extraName);
    }

};

util.inherits(Generator, scriptBase);

// 0 - get require info
// 1 - create templates folder
// 2 - add handlebars dependance in meta file
// 3 - update the build file

Generator.prototype.generator = function generator() {

    // create templates directory
    this.mkdir("templates");

    // create template file ?
    var name = this.extraName ? this.moduleName + "-" + this.extraName : this.moduleName

    console.log(this.buildFileInfo);

    var fileFullPath = "templates/" + name + ".handlebars.html"
    if (!fs.existsSync(fileFullPath)) {
        var data = this.engine(   this.readFileAsString(path.join(__dirname, "templates", "_myModule.handlebars.html"))   ,   {
            projectName : this.projectName,
            moduleName : this.moduleName,
            extraName : this.extraName
        });
        this.write( "templates/" + name + ".handlebars.html" , data );

    } else {
        this.log.info(fileFullPath, "Already exists...");
    }

    // update meta
    this._addDepsInMetaFile({
        metaFullPath: this.metaFilePath,
        moduleName: this.moduleName,
        depsTab: ["handlebars-base"]
    });

    // update build
    var buildFile = JSON.parse(this.readFileAsString( this.buildFileInfo.relativeNode ));
    this._pushOnce(buildFile.builds[this.moduleName].jsfiles, "../templates/" + name + ".js", true);
    if (!buildFile.exec) {
        buildFile.exec = [];
    }
    this._pushOnce(buildFile.exec, "yo yui3:handlebars");

    if (!buildFile.postexec) {
        buildFile.postexec = [];
    }
    this._pushOnce(buildFile.postexec, "ruby ../../../../../../script/post_shifter_cleaner.rb");

    this.write(this.buildFileInfo.relativeNode, JSON.stringify(buildFile, null, 4) );

}

Generator.prototype.notice = function notice() {

    var sreenName = this.extraName ? 'NAME' + ' + "-' + this.extraName + '"' : 'NAME';

    console.log(" ---------- copy/paste ----------")
    console.log(" var markup = Y.templates[" + sreenName + "]({}); ");

}

//private
// ------------------------------------------------------------------------------


/*
 * @method _addDepsInMetaFile
 * @param {Object} [options]
 *      @param {String} [options.metaFullPath]
 *      @param {String} [options.moduleName]
 *      @param {Array}  [options.depsTab]
 * @private
 *
 */
Generator.prototype._addDepsInMetaFile = function _addDepsInMetaFile(options) {

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
        dep = depsTab[i];
        update = this._pushOnce(requires, dep);
    }

    if (update) {
        this.write(metaFullPath, JSON.stringify(metaFile, null, 4));
    }

}
