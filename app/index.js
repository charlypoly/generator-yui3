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

  // if (args.length < 1) {
  //   this.log.write('Usage : yo yui3 <project_name> [--!config]');
  //   process.exit(1);
  // }

  this.args = args

};

util.inherits(Yui3Generator, yeoman.generators.Base);

Yui3Generator.prototype.create = function create() {

    if (this.options["config-file-only"]) {

        this.projectName = path.basename(process.cwd())
        this.copy('.generator-yui3.json','.generator-yui3.json');
        this.copy('.generator-yui3.example.json', '.generator-yui3.example.json');
    } else {

        this.projectName = this._.slugify(this.args[0]);

        var config_file = this._.isUndefined(this.options['no-config']) ? true : !! this.options['no-config'],
            gitignore = this._.isUndefined(this.options['gitignore']) ? false : !! this.options['gitignore'];

        if (gitignore && config_file) {
            this._appendToGitignore();
        }

        this.log.info("Init " + this.projectName + ' scaffold');
        this.log.info('init project with' + (config_file ? '' : 'out') + ' config file');


        this.mkdir(this.projectName);

        if (config_file) {
            this.copy('.generator-yui3.json', this.projectName + '/.generator-yui3.json');
            this.copy('.generator-yui3.example.json', this.projectName + '/.generator-yui3.example.json');
        }

        this.mkdir(this.projectName + '/src/' + this.projectName + '-loader');
        this.directory('project/src/projectName-loader/scripts', this.projectName + '/src/' + this.projectName + '-loader/scripts');
        this.directory('project/src/projectName-loader/template', this.projectName + '/src/' + this.projectName + '-loader/template');

        this.mkdir(this.projectName + '/src/' + this.projectName + '-loader/js');
        this.copy('project/src/projectName-loader/js/projectName.js', this.projectName + '/src/' + this.projectName + '-loader/js/' + this.projectName + '.js');
        this.copy('project/src/projectName-loader/build.json', this.projectName + '/src/' + this.projectName + '-loader/build.json');
    }

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
 Yui3Generator.prototype._loader = function _loader() {
    this.mkdir(this.projectName + '/src/' + this.projectName + '-loader/tests');
    this.mkdir(this.projectName + '/src/' + this.projectName + '-loader/scripts');
    this.template("loader/tests/_common.js", this.projectName + '/src/' + this.projectName + '-loader/tests/' +"common.js" );
 };

