'use strict';
var util    = require('util'),
    yeoman  = require('yeoman-generator'),
    path    = require('path'),
    fs      = require('fs');

var Generator = module.exports = function Generator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    this.configurators = {
        'base'      : this._configureBase,
        'widget'    : this._configureWidget
    };

};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.configure = function() {
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
 * Check we are in a project sources folder
 *
 */
Generator.prototype.beforeCreate = function beforeCreate(){
    if(!this._srcExists()){
        this.log.error("We are not in a project folder \n (ensure we are in '<projectName>/src' folder)");
        process.exit(1);
    }
};

/**
 * @method chooseNamespace
 *
 * Enter a namespace for the module if wanted
 *
 * default: Y.ModuleName
 * else: Y.namespace('MyNamespace').ModuleName
 *
 */
Generator.prototype.chooseNamespace = function chooseNamespace(){
   var cb = this.async();

   this.prompt({
      "type" : 'input',
      "name" : 'module-namespace',
      "message" : 'Choose a module namespace (defaults to Y.)',
      "default" : ''
   }, this._.bind(function(answers) {
      this.namespace = answers['module-namespace'];
      cb();
   }, this));
};


/**
 *
 * @method chooseType
 *
 * Prompt the module type to generate
 *
 */
Generator.prototype.chooseType = function chooseType() {
    var cb = this.async();

    this.prompt({
        "type" : 'list',
        "name" : 'module-type',
        "message" : 'Choose a module type',
        "choices" : [
        {
            name : "Base (scaffold a class that inherit Y.Base)",
            value : "base"
        }
        // , {
        //     name : "Widget (scaffold a basic Widget)",
        //     value : "widget"
        // },{
        //     name : "View (scaffold a basic View)",
        //     value : "view"
        // },{
        //     name : "Model (scaffold a basic Model)",
        //     value : "model"
        // }
        ],
        "default" : 'base'
    }, this._.bind(function(answers) {
        this.moduleType = answers['module-type'];
        cb();
    }, this));
};

/**
 *
 * @method loadConfigurationFile
 *
 * Override default configuration file with .generator-yui3.json configuration file
 *
 */
Generator.prototype.loadConfigurationFile = function loadConfigurationFile() {
    var cb = this.async();
    this._setDefaultConfiguration();
    try {
        if (fs.existsSync(path.resolve('../.generator-yui3.json'))) {
            var conf = fs.readFileSync(path.resolve('../.generator-yui3.json'));
            conf = JSON.parse(conf);
            console.log(conf);
            conf = conf.modules[this.moduleType];

            //config
            this._.each(this.configuration.create, this._.bind(function(value, index, configuration) {
                if (!!~conf.create.indexOf(index)) {
                    this.configuration.create[index] = true;
                }
            }, this));

            if (conf.i18n && conf.i18n.length) {
                this.configuration.i18n = conf.i18n;
            }

            cb();
        } else {
            cb();
        }
    } catch(err) {
        console.dir(err);
        this.log.error('Fails to load project configuration file : \n');
        this.log.error(err + '\n');
        this.prompt({
            "type" : 'list',
            "name" : 'configuration-load-fail',
            "message" : 'Fails to load project configuration file, continue ?',
            "choices" : [{
                name : "Continue generation with default configuration",
                value : "ok"
            }, {
                name : "Abort generation",
                value : "nope"
            }],
            "default" : 'base'
        }, this._.bind(function(answers) {
            var answer = answers['configuration-load-fail'];
             if (answer === 'ok') {
                cb();
             } else {
                process.exit(1);
             }
        }, this));
    }
};

/**
 *
 * @method configure
 *
 * Override default configuration file with options (--tests, --templates, etc...)
 *
 */

Generator.prototype.configure = function configure() {

    if (!!this.options['assets']) {
        this.configuration.create.assets = true;
    }

    if (!!this.options['no-assets']) {
        this.configuration.create.assets = false;
    }

    if (!!this.options['i18n']) {
        this.configuration.create.i18n = true;
    }

    if (!!this.options['no-i18n']) {
        this.configuration.create.i18n = false;
    }

    if (!!this.options['templates']) {
        this.configuration.create.templates = true;
    }

    if (!!this.options['no-templates']) {
        this.configuration.create.templates = false;
    }

    if (!!this.options['docs']) {
        this.configuration.create.docs = true;
    }

    if (!!this.options['no-docs']) {
        this.configuration.create.docs = false;
    }

    if (!!this.options['tests']) {
        this.configuration.create.tests = true;
    }

    if (!!this.options['no-tests']) {
        this.configuration.create.tests = false;
    }
}






Generator.prototype.tests = function tests() {

    var projectName = this.projectName = this._getProjectName();

    this.mkdir(this.name + "/tests");
    this.mkdir(this.name + "/tests/unit");
    this.mkdir(this.name + "/tests/unit/assets");
    this.template("tests/_moduleName-test.js",this.name +  "/tests/unit/assets/" + this.name + "-test.js");
    this.template("tests/_moduleName.html",this.name +  "/tests/unit/" + this.name + ".html");


    if(!projectName){
        this.log.error("Provide a package.json file to your project !!");
        process.exit(1);
    } else {
        this.projectName = projectName;
    }

    this.template("tests/_moduleName-test.js", this.name + "/tests/unit/assets/" + this.name + "-test.js");
    this.template("tests/_moduleName.html", this.name + "/tests/unit/" + this.name + ".html");
};

/**
 * minimum structure needed to shift the module (main js file and build.json)
 * @method createStructure
 *
 */
Generator.prototype.createStructure = function createStructure() {
    this.mkdir(this.name);
    this.mkdir(this.name + "/js");

    this.write(this.name +"/build.json", JSON.stringify(this._generateBuild(), null, 4) );

    this.configurators[this.moduleType].call(this); //configure with proper module type
};


/**
 * @method tests
 *
 *  Handle tests related files and directories
 *
 */
Generator.prototype.tests = function tests() {
    if (this.configuration.create.tests) {
        this.mkdir(this.name + "/tests");
        this.mkdir(this.name + "/tests/unit");
        this.mkdir(this.name + "/tests/unit/assets");
        this.template(
            "tests/_moduleName-test.js",
            this.name +  "/tests/unit/assets/" + this.name + "-test.js"
        );
        this.template(
            "tests/_moduleName.html",
            this.name +  "/tests/unit/" + this.name + ".html"
        );

        var projectName = this._getProjectName();

        if(!projectName){
            this.log.error("Provide a package.json file to your project !!");
            process.exit(1);
        }
    }

};

/**
 * @method templates
 *
 *  Handle templates related files and directories
 *
 */
Generator.prototype.templates = function templates() {
    if (this.configuration.create.templates) {
        this.mkdir(this.name + "/templates/");
        this.write(this.name + "/templates/"+this.name+".handlebars.html", "");
    }
};

/**
 * @method assets
 *
 *  Handle assets related files and directories
 *
 */
Generator.prototype.assets = function assets() {
    if (this.configuration.create.assets) {
        this.mkdir(this.name + "/assets/");
        // this.write(this.name + "assets/"+this.name+".handlebars.html", "");
    }
};

/**
 * @method i18n
 *
 *  Handle i18n related files and directories
 *
 */
Generator.prototype.i18n = function i18n() {
    if (this.configuration.create.i18n) {
        this.mkdir(this.name + "/lang/");
        this._.each(this.configuration.i18n, this._.bind(function(lang) {
            this.write(this.name + "/lang/"+lang+".js" , "{}");
        }, this));
    }
};


// private
// -------------------------------------------------------------------------------------------------
/**
 * @method _getProjectName
 * @private
 *
 */
Generator.prototype._getProjectName = function _getProjectName() {
    try {
        var pkg = JSON.parse(
            this.readFileAsString(path.join(process.cwd(), '../package.json'))
        );
        return pkg.name;
    } catch (err) {
        this.log.error('Fails to fetch project name with package.json file \n '+err);
        process.exit(1);
    }
};

/**
 * @method this._srcExists
 * @private
 *
 */
Generator.prototype._srcExists = function _srcExists() {
     var srcPathTab = process.cwd().split("/");
     var length = srcPathTab.length;
     return srcPathTab[length - 1] === "src";
};

/**
 * @method this._generateMeta
 * @private
 *
 *  Return the module meta/<moduleName>.json object with proper configuration
 *
 *
 * @return object
 */
Generator.prototype._generateMeta = function() {
    var meta = JSON.parse(this.engine(this.read('meta/_meta.json'), this));

    if (this.configuration.create.i18n) {
        meta[this.name].lang = this.configuration.i18n;

        if (!meta[this.name].requires || !meta[this.name].requires.length) {
            meta[this.name].requires = ['intl'];
        } else if (!!!~meta[this.name].requires.indexOf('intl')) { //ensure "intl" not in deps
            meta[this.name].requires.push('intl');
        }
    }

    if (this.configuration.create.assets) {
        meta[this.name].skinnable = true;
    }

    if (this.configuration.create.templates) {
        if (!meta[this.name].requires || !meta[this.name].requires.length) {
            meta[this.name].requires = ['handlebars-base'];
        } else if (!!!~meta[this.name].requires.indexOf('handlebars-base')) { //ensure "handlebars-base" not in deps
            meta[this.name].requires.push('handlebars-base');
        }
    }

    return meta;

};

/**
 * @method this._generateBuild
 * @private
 *
 * Return the module build.json file content with proper configuration
 *
 * @return string/JSON
 *
 */
Generator.prototype._generateBuild = function() {
    var build = JSON.parse(this.engine(this.read('_build.json'), this));

    if (this.configuration.create.templates) {

        //template compilation
        if (!build.exec || !build.exec.length) {
            build.exec = ['yo yui3:handlebars'];
        } else if (!!~build.execs.indexOf('yo yui3:handlebars')) {
            build.exec.push('yo yui3:handlebars');
        }

        //post cleaner
        if (!build.postexec || !build.postexec.length) {
            build.postexec = ['yo yui3:post-cleaner'];
        } else if (!!~build.execs.indexOf('yo yui3:post-cleaner')) {
            build.postexec.push('yo yui3:post-cleaner');
        }

        try {
            build.builds[this.name].jsfiles.unshift('../templates/'+this.name+'.js')
        } catch (err) {
            this.log.error('fail to add template to the build file, ensure the build.json file has been created with yo yui3:module');
        }
    }

    return build;

};

/**
 * @method this._setDefaultConfiguration
 * @private
 *
 *  Return the default configuration
 *
 */
Generator.prototype._setDefaultConfiguration = function _setDefaultConfiguration() {
    this.configuration = {
        create : {
            assets : false,
            templates : false,
            i18n : false,
            docs : false,
            tests : false
        },
        i18n : ['en']
    };
}

// ## Private module configuration by type

/**
 * @method this._setDefaultConfiguration
 * @private
 *
 *  Return the default configuration
 *
 */
Generator.prototype._configureBase = function _configureBase() {
    //add base deps in meta file
    this.template("js/base/_moduleName.js", this.name + "/js/" + this.name + ".js");
    var meta = this._generateMeta();

    if (!meta[this.name].requires || !meta[this.name].requires.length) {
        meta[this.name].requires = ['base'];
    } else if (!!!~meta[this.name].requires.indexOf('base')) { //ensure "base" not in deps
        meta[this.name].requires.push('base');
    }

    this.write(this.name +"/meta/"+this.name+".json", JSON.stringify(meta, null, 4) );
}
