'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");

var InteractionGenerator = module.exports = function InteractionGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the interaction subgenerator with the argument ' + this.name + '.');
};

util.inherits(InteractionGenerator, yeoman.generators.NamedBase);

InteractionGenerator.prototype.setPaths = function setPaths() {

    this.generatorYUI3FilePath = path.join(process.cwd(), ".generator-yui3.json");

};

InteractionGenerator.prototype.updateGeneratorYui3 = function updateGeneratorYui3() {

    this.projectName = this._currentProjectName();

    this.projectNameToAdd = arguments[0];
    this.base = arguments[1];

    var stringData = this.readFileAsString(path.join(__dirname, "../app/templates/.generator-yui3.json"));

    var file = JSON.parse(this.readFileAsString(this.generatorYUI3FilePath));

    file.interactions[this.projectNameToAdd] = {};
    file.interactions[this.projectNameToAdd].base = this.base;

    this.write(this.generatorYUI3FilePath, JSON.stringify(file));

};

InteractionGenerator.prototype.updateLoaderCommon = function updateLoaderCommon() {

    var stringData = this.readFileAsString(path.join(__dirname, "../app/templates/loader/tests/_common.js"));
    var interactions = JSON.parse(this.readFileAsString(this.generatorYUI3FilePath)).interactions;

    var keys = Object.keys(interactions),
        i,
        iLength = keys.length,
        projectName, value, base;

    for (i = 0; i < iLength; i++) {
        projectName = keys[i];
        value = interactions[projectName];
        base = value.base;
        console.log(projectName);
        console.log(value);

        stringData += "\n// " + projectName + "\n";
        stringData += "YUI_config.groups." + projectName + ".combine = false\n";
        stringData += "YUI_config.groups." + projectName + ".base = \"" + base + "\"\n";
        stringData += "YUI_config.groups." + projectName + ".filter = (window.location.search.match(/[?&]filter=([^&]+)/) || [])[1] || 'raw'";

    }

    this.write(path.join(process.cwd(), "src/" + this.projectName + "-loader/tests/common.js"), this.engine(stringData, {
        "projectName": this.projectName
    }));

    var muVar = this._lookForProjectRoot
    console.log(muVar);

}

// get currentProjectName
InteractionGenerator.prototype._currentProjectName = function _currentProjectName() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), './package.json')));
    return pkg.name;


};

/*
 * @method _lookForProjectRoot
 *
 */
TestgenGenerator.prototype._lookForProjectRoot = function _lookForProjectRoot() {
    var model = "";

    while (true) {

        var pathFile = path.join(process.cwd(), model, './package.json');
        if (fs.existsSync(pathFile)) {
            return pathFile;
        }
        //change path
        model = model + "../";
    }

};
