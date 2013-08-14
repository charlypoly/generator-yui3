'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.configure = function() {
    this.configuration = {};

    this.configuration.assets = !!(this.options['assets'] && !this.options['!assets']);

    this.configuration.i18n = !!(this.options['i18n'] && !this.options['!i18n']);
    
    this.configuration.tests = !!(this.options['tests'] && !this.options['!tests']);
    
    this.configuration.templates = !!(this.options['templates'] && !this.options['!templates']);

    console.log('configuration : ', this.configuration);
}

/**
 * @method beforeCreate
 *
 */
 ModuleGenerator.prototype.beforeCreate = function(){
    if(!this._srcExists()){
        this.log.error("bejlhezu");
        process.exit(1);
    }
}
/**
 * minimum structure needed to shift the module
 * @method createStructure
 *
 */
ModuleGenerator.prototype.createStructure = function createStructure() {
    this.mkdir(this.name);
    this.mkdir(this.name + "/js");
    this.template("_moduleName.js", this.name + "/js/" + this.name + ".js");
    this.write(this.name +"/build.json", this._generateBuild());
};

/**
 * @method meta
 *
 */
ModuleGenerator.prototype.meta = function meta() {
    this.mkdir(this.name + "/meta");
    this.write(this.name +"/meta/" + this.name + ".json", this._generateMeta());
};

/**
 * @method tests
 *
 */
ModuleGenerator.prototype.tests = function tests() {
    if (this.configuration.tests) {
        this.mkdir(this.name + "/tests");
        this.mkdir(this.name + "/tests/unit");
        this.mkdir(this.name + "/tests/unit/assets");
        this.template("tests/_moduleName-test.js",this.name +  "/tests/unit/assets/" + this.name + "-test.js");
        this.template("tests/_moduleName.html",this.name +  "/tests/unit/" + this.name + ".html");

        var projectName = this._getProjectName();

        if(!projectName){
            this.log.error("Provide a package.json file to your project !!");
            process.exit(1);
        }
    }

};


ModuleGenerator.prototype.templates = function templates() {
    if (this.configuration.templates) {
        this.mkdir(this.name + "/templates/");
        this.write(this.name + "/templates/"+this.name+".handlebars.html", "");
    }
};

ModuleGenerator.prototype.assets = function assets() {
    if (this.configuration.assets) {
        this.mkdir(this.name + "/assets/");
        // this.write(this.name + "assets/"+this.name+".handlebars.html", "");
    }
};


// private
// -------------------------------------------------------------------------------------------------
/**
 * @method _getProjectName
 * @private
 *
 */
ModuleGenerator.prototype._getProjectName = function _getProjectName() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), '../package.json')));
    return pkg.name;
};

/**
 * @method this._srcExists
 * @private
 *
 */
ModuleGenerator.prototype._srcExists = function _srcExists() {
     var srcPathTab = process.cwd().split("/");
     var length = srcPathTab.length;
     return srcPathTab[length - 1] === "src";
};

ModuleGenerator.prototype._generateMeta = function() {
    var meta = JSON.parse(this.engine(this.read('meta/_meta.json'), this));

    if (this.configuration['i18n']) {
        meta.lang = [
            'en'
        ];

        if (!meta.requires || !meta.requires.length) {
            meta.requires = ['intl'];
        } else if (!!~meta.requires.indexOf('intl')) { //ensure "intl" not in deps
            meta.requires.push('intl');
        }
    }

    if (this.configuration['assets']) {
        meta.skinnable = true;
    }

    if (this.configuration['templates']) {
        if (!meta.requires || !meta.requires.length) {
            meta.requires = ['handlebars-base'];
        } else if (!!~meta.requires.indexOf('handlebars-base')) { //ensure "handlebars-base" not in deps
            meta.requires.push('handlebars-base');
        }
    }

    return JSON.stringify(meta);

};


ModuleGenerator.prototype._generateBuild = function() {
    var build = JSON.parse(this.engine(this.read('_build.json'), this));

    if (this.configuration['templates']) {

        //template compilation
        if (!build.exec || !build.exec.length) {
            build.exec = ['yo yui3:handlebars'];
        } else if (!!~build.execs.indexOf('yo yui3:handlebars')) { 
            build.exec.push('yo yui3:handlebars');
        }

        //post clean
        // if (!build.postexec || !build.postexec.length) {
        //     build.postexec = ['yo yui3:post_clean'];
        // } else if (!!~build.execs.indexOf('yo yui3:post_clean')) { 
        //     build.postexec.push('yo yui3:post_clean');
        // }

        try {
            build.builds[this.name].jsfiles.unshift('../templates/'+this.name+'.js')
        } catch (err) {
            this.log.error('fail to add template to the build file, ensure the build.json file has been created with yo yui3:module');
        }
    }

    return JSON.stringify(build);

}