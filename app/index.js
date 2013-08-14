'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Yui3Generator = module.exports = function Yui3Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  //TODO : use 
  //  - https://github.com/yeoman/generator/wiki/base#baseusage
  //  - https://github.com/yeoman/generator/wiki/base#basedefaultfor

  if (args.length < 1) {
    this.log.write('Usage : yo yui3 <project_name> [--!config]');
    process.exit(1);
  }

};

util.inherits(Yui3Generator, yeoman.generators.Base);

Yui3Generator.prototype.create = function create() {

     var config_file = this._.isUndefined(this.options['!config']) ?  true : config_file;

     this.projectName = this._.slugify(this.args[0]);

     this.log.info("Init "+this.projectName+' scaffold');
     this.log.info('init project with' +(config_file ? '' : 'out')+ ' config file');


     this.mkdir(this.projectName);

     if (config_file) {
        this.copy('.generator-yui3.json', this.projectName+'/.generator-yui3.json');
     }


     // # src/ folder

     //   # src/common folder
     this.mkdir(this.projectName+'/src/common');
     this.mkdir(this.projectName+'/src/common/docs');
     this.directory('project/src/common/docs', this.projectName+'/src/common/docs');

     //   # src/<projectname>-loader folder

     this.mkdir(this.projectName+'/src/'+this.projectName+'-loader');
     this.directory('project/src/projectName-loader/scripts', this.projectName+'/src/'+this.projectName+'-loader/scripts');
     this.directory('project/src/projectName-loader/template', this.projectName+'/src/'+this.projectName+'-loader/template');

     this.mkdir(
        this.projectName+'/src/'+this.projectName+'-loader/js');
     this.copy(
        'project/src/projectName-loader/js/projectName.js', 
        this.projectName+'/src/'+this.projectName+'-loader/js/'+this.projectName+'.js'
      );
     this.copy(
        'project/src/projectName-loader/build.json',
        this.projectName+'/src/'+this.projectName+'-loader/build.json'
      );

     // # test folder
     this.mkdir(this.projectName+'/tests');
     this.copy('project/tests/index.html', this.projectName+'/tests/index.html');

};