/**
 * functionalities often used
 * @module utils
 */


'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var Generator = module.exports = function Generator() {
   yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

/*
 * @method setUpPaths
 *
 */
Generator.prototype.setUpPaths = function setUpPaths() {
   
   // --------------------------------------------------
   // generator part
   // --------------------------------------------------
   this.generatorRootPath = __dirname;





   // --------------------------------------------------
   // target part
   // --------------------------------------------------

   // depends on the context could be project or module
   this.rootPath = process.cwd();

   // set entity context. could be "project" or "module"
   // if it is project we have the .generator-yui3.json
   if (fs.existsSync(path.join(this.rootPath, ".generator-yui3.json"))) {
      this.entityContext =  "project";
   }
   // if it is module we have the build.json
   if (fs.existsSync(path.join(this.rootPath, "build.json"))) {
      this.entityContext =  "module";
   }


}