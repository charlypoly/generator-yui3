'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');


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

     var config_file = this._.isUndefined(this.options['no-config']) ?  true : !!this.options['no-config'],
     gitignore = this._.isUndefined(this.options['gitignore']) ?  false : !!this.options['gitignore'];

     if (gitignore && config_file) {
      this._appendToGitignore();
     }

     this.projectName = this._.slugify(this.args[0]);

     this.log.info("Init "+this.projectName+' scaffold');
     this.log.info('init project with' +(config_file ? '' : 'out')+ ' config file');


     this.mkdir(this.projectName);

     if (config_file) {
        this.copy('.generator-yui3.json', this.projectName+'/.generator-yui3.json');
     }

     // this.copy('project/package.json', this.projectName+'/package.json');

     // # src/ folder

     //   # src/common folder

    // keep the creation of a project minimal
     // this.mkdir(this.projectName+'/src/common');
     // this.mkdir(this.projectName+'/src/common/docs');
     // this.directory('project/src/common/docs', this.projectName+'/src/common/docs');

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

     // # test folder // keep the creation of a project minimal
     // this.mkdir(this.projectName+'/tests');
     // this.copy('project/tests/index.html', this.projectName+'/tests/index.html');

};

Yui3Generator.prototype._appendToGitignore = function() {
  if (fs.existsSync(path.resolve('./.gitignore'))) {
    var gitignore = fs.readFileSync(path.resolve('./.gitignore'), {
      encoding : 'utf-8'
    }),
    entries = gitignore.split('\n');

    if (!!!~entries.indexOf('.generator-yui3.json')) {
      entries.push('.generator-yui3.json');
    }

    fs.writeFileSync('.gitignore', entries.join('\n'));
    this.log.info('.gitignore updated !');
  } else {
    this.log.error('no .gitignore file found..');
  }

}

/**
 * @method tests
 *
 */
 Yui3Generator.prototype.loader = function loader() {
    this.mkdir(this.projectName + '/src/' + this.projectName + '-loader/tests');
    this.mkdir(this.projectName + '/src/' + this.projectName + '-loader/scripts');
    this.template("loader/tests/_common.js", this.projectName + '/src/' + this.projectName + '-loader/tests/' +"common.js" );
 };

