'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var HandlebarsGenerator = module.exports = function HandlebarsGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(HandlebarsGenerator, yeoman.generators.NamedBase);

HandlebarsGenerator.prototype.compileFiles = function files() {

   var fs         = require('fs'),
   Handlebars      = require('handlebars'),
   content = null, compiler = null, compileFile = null;

   compiler = function (content) {
         return 'Y.Handlebars.template(' + Handlebars.precompile(content) + ')';
   };


   compileFile = function (filename) {
      
      var matches = filename.match(/^([^\.]*)\.handlebars.html$/);

      if (matches === null) {
         return;
      }

      var templateName = matches[1];
   
      console.log('compiling '+filename+' with the handlebars');

      fs.readFile('./templates/'+filename, 'utf8', function (err, data) {
         if (err) {
            throw err;
         }

         content = "Y.namespace('templates')['" + templateName + "'] = " + compiler(data) + ";\n";
         fs.writeFile('templates/' + templateName + '.js', content, 'utf8');
      });
   };

   fs.readdir('./templates', function (err, files) {
      if (err) {
         throw err;
      }
      files.forEach(compileFile);
   });

};
