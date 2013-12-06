/**
 * functionalities often used
 * @module utils
 */


'use strict';
var NAME    = "script-base",
    path    = require('path'),
    util    = require('util'),
    yeoman  = require('yeoman-generator'),
    fs      = require('fs'),
    utils   = require('./utils');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

/*
 * @method setUpPaths
 *
 */
Generator.prototype.setUpPaths = function setUpPaths() {

    if(!utils.reachFirst({type : "file", name : ".generator-yui3.json"})){
        this.log.error("You don\'t have a .generator-yui3.json file ! Please provide one by invoking 'yo yui3 --config-file-only' at the root of your project !\n");
        process.exit(1);
    }

    // severals info about .generator-yui3.json
    this.configFileInfo = utils.reachFirst({type : "file", name : ".generator-yui3.json"});

    // absolute path to the root folder of the project
    this.projectRootPath = this.configFileInfo.absContainer;
    // absolute path to the config file of the project
    this.configFilePath = this.configFileInfo.absNode;

    this.configFileData = JSON.parse(this.readFileAsString(this.configFilePath));
    // is source modules and build modules have same name ?
    this.prefixedModuleName = this.configFilePath["prefixed-modules"];

    // console.log(this.prefixedModuleName);

    // where we lunch yo
    this.currentPath = process.cwd();
    this.projectName = this.entityName = this.configFileData.projectName;

    // --------------------------------------------------
    // generator part
    // --------------------------------------------------
    this.generatorRootPath = __dirname;

    // --------------------------------------------------
    // target part
    // --------------------------------------------------

    this.context = this.whereAmI();

    if(this.context.where === "module"){
        this.buildFileInfo = utils.reachFirst({type : "file", name : "build.json"});
        this.moduleName = this.context.name;
        this.metaFilePath = path.join( this.buildFileInfo.relativeContainer, "meta" , this.moduleName + ".json" );
    } else if(this.context.where === "project"){

    }

/*


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
        if(buildFile.name){
            this.entityName = this.moduleName = buildFile.name;
        }

        // meta file path
        this.metaFilePath = path.join(this.currentPath, 'meta/' + this.entityName + '.json');
        var metaFile = JSON.parse(this.readFileAsString(this.metaFilePath));
        // console.log(metaFile);

    } else {

    }



*/


}



Generator.prototype.whereAmI = function whereAmI() {
    // console.log(NAME ? NAME : "" , " : whereAmI");

    var returnObject = {
        where: "",
        position: "",
        name: "",
        positionFromRoot : ""
    };

    var configFileInfo = utils.reachFirst({
        type: "file",
        name: ".generator-yui3.json"
    });
    var buildFileInfo = utils.reachFirst({
        type: "file",
        name: "build.json"
    });
    var srcFolderInfo = utils.reachFirst({
        type: "folder",
        name: "src"
    });

    var currentPath = process.cwd();

    if (configFileInfo) {
        // in a project
        var projectName = JSON.parse(this.readFileAsString(configFileInfo.absNode)).projectName;
        if (configFileInfo.relativeContainer === "") {
            // root of the project
            returnObject.where = "project";
            returnObject.position = "root";
            returnObject.name = projectName;
        } else {
            // in the project but not root
            if (buildFileInfo) {
                // in a module
                var moduleName = JSON.parse(this.readFileAsString(buildFileInfo.relativeNode)).name;
                if (buildFileInfo.relativeContainer === "") {
                    // in a root module
                    returnObject.where = "module";
                    returnObject.position = "root";
                    returnObject.name = moduleName;
                } else {
                    // not in the root of the module
                    returnObject.where = "module";
                    returnObject.position = path.basename(currentPath);
                    returnObject.name = moduleName;
                }
            } else {
                // we are not in a module
                if (configFileInfo.relativeContainer === "../" && path.basename(currentPath) === "src") {
                    //src
                    returnObject.where = "project";
                    returnObject.position = "src";
                    returnObject.name = projectName;
                } else {

                    var dirName, ourPath = currentPath, relativePathTab = [];

                    while(path.basename(ourPath) !== projectName){
                        relativePathTab.unshift(path.basename(ourPath));
                        ourPath = path.dirname(ourPath);
                    }

                    // somewhere else in a project
                    returnObject.where = "project";
                    returnObject.name = projectName;
                    returnObject.positionFromRoot = relativePathTab.join("/")

                    // this.log.error('This generator will not help you where you are\n');
                }

            }
        }
    } else {
        // not in a project
        this.log.error('You are not in a YUI3 project\n');
        process.exit(1);
    }



    // console.log(NAME ? NAME : "" ," configFileInfo : ", configFileInfo);
    // console.log("------------------------------------------------------");
    // console.log(NAME ? NAME : "" ," buildFileInfo : ", buildFileInfo);
    // console.log("------------------------------------------------------");
    // console.log(NAME ? NAME : "" ," srcFolderInfo : ", srcFolderInfo);

    // console.log(NAME ? NAME : "" ," returnObject : ", returnObject);

    return returnObject;
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
};

/*
 * @method getModuleDepedencies
 * return {Array}
 */
Generator.prototype.getModuleDepedencies = function getModuleDepedencies() {
    var metaFile = JSON.parse(this.readFileAsString(this.metaFilePath));
    return metaFile.requires;
};
