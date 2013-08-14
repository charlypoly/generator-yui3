'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path'),
fs      = require('fs');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);


ModuleGenerator.prototype.chooseType = function chooseType() {
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


ModuleGenerator.prototype.loadConfigurationFile = function loadConfigurationFile() {
    var cb = this.async();
    this._setDefaultConfiguration();
    try {
        if (fs.existsSync(path.resolve('../.generator-yui3.json'))) {
            var conf = fs.readFileSync(path.resolve('../.generator-yui3.json'));
            conf = JSON.parse(conf);
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


ModuleGenerator.prototype.configure = function configure() {

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

};

/**
 * @method beforeCreate
 *
 */
 ModuleGenerator.prototype.beforeCreate = function beforeCreate(){
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
    if (this.configuration.create.tests) {
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
    if (this.configuration.create.templates) {
        this.mkdir(this.name + "/templates/");
        this.write(this.name + "/templates/"+this.name+".handlebars.html", "");
    }
};

ModuleGenerator.prototype.assets = function assets() {
    if (this.configuration.create.assets) {
        this.mkdir(this.name + "/assets/");
        // this.write(this.name + "assets/"+this.name+".handlebars.html", "");
    }
};

ModuleGenerator.prototype.i18n = function i18n() {
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

    if (this.configuration.create.i18n) {
        meta[this.name].lang = [
            'en'
        ];

        if (!meta[this.name].requires || !meta[this.name].requires.length) {
            meta[this.name].requires = ['intl'];
        } else if (!!~meta[this.name].requires.indexOf('intl')) { //ensure "intl" not in deps
            meta[this.name].requires.push('intl');
        }
    }

    if (this.configuration.create.assets) {
        meta[this.name].skinnable = true;
    }

    if (this.configuration.create.templates) {
        if (!meta[this.name].requires || !meta[this.name].requires.length) {
            meta[this.name].requires = ['handlebars-base'];
        } else if (!!~meta[this.name].requires.indexOf('handlebars-base')) { //ensure "handlebars-base" not in deps
            meta[this.name].requires.push('handlebars-base');
        }
    }

    return JSON.stringify(meta);

};


ModuleGenerator.prototype._generateBuild = function() {
    var build = JSON.parse(this.engine(this.read('_build.json'), this));

    if (this.configuration.create.templates) {

        //template compilation
        if (!build.exec || !build.exec.length) {
            build.exec = ['yo yui3:handlebars'];
        } else if (!!~build.execs.indexOf('yo yui3:handlebars')) { 
            build.exec.push('yo yui3:handlebars');
        }

        //post clean
        // if (!build.postexec || !build.postexec.length) {
        //     build.postexec = ['yo yui3:post_clean'];
        // } else if (!!~build.execs.indexOf('yo yui3:post-clean')) { 
        //     build.postexec.push('yo yui3:post-clean');
        // }

        try {
            build.builds[this.name].jsfiles.unshift('../templates/'+this.name+'.js')
        } catch (err) {
            this.log.error('fail to add template to the build file, ensure the build.json file has been created with yo yui3:module');
        }
    }

    return JSON.stringify(build);

};


ModuleGenerator.prototype._setDefaultConfiguration = function _setDefaultConfiguration() {
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