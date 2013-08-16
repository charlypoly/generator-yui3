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

InteractionGenerator.prototype.updateGeneratorYui3 = function updateGeneratorYui3() {

    this.projectName = this._currentProjectName();

    this.projectNameToAdd = arguments[0];
    this.base = arguments[1];

    var stringData = this.readFileAsString(path.join(__dirname ,"../app/templates/.generator-yui3.json" ));

    var filePath = path.join(process.cwd(), ".generator-yui3.json");

    var file = JSON.parse(this.readFileAsString(filePath));

    file.interactions[this.projectNameToAdd] = {};
    file.interactions[this.projectNameToAdd].base = this.base;

    this.write(filePath, JSON.stringify(file));

};

InteractionGenerator.prototype.updateLoaderCommon = function updateLoaderCommon() {

    var stringData = this.readFileAsString(path.join(__dirname ,"../app/templates/loader/tests/_common.js" ));
    var yui3GenOriginFilePath = path.join(process.cwd(), ".generator-yui3.json");
    var interactions = JSON.parse(this.readFileAsString(yui3GenOriginFilePath)).interactions;

        var keys = Object.keys(interactions),
        i,
        iLength = keys.length,
        key, projectName;

    for( i = 0 ; i < iLength ; i++ ){
        key = keys[i];
        projectName = interactions[key];

        stringData += "\n// "+this.projectNameToAdd+"\n";
        stringData += "YUI_config.groups."+ key +".combine = false\n";
        stringData += "YUI_config.groups."+ key +".base = \"" + this.base + "\"\n";
        stringData += "YUI_config.groups."+ key +".filter = (window.location.search.match(/[?&]filter=([^&]+)/) || [])[1] || 'raw'";

    }
     this.write(path.join(process.cwd(), "src/" + this.projectName + "-loader/tests/common.js"),  this.engine(stringData, {"projectName" : this.projectName})  );
}

// get currentProjectName
InteractionGenerator.prototype._currentProjectName = function _currentProjectName() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), './package.json')));
    return pkg.name;
};
