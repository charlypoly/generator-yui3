'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var glob = require("glob");
var fs = require('fs');

var PostCleanerGenerator = module.exports = function PostCleanerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the post_cleaner subgenerator with the argument ' + this.name + '.');


   this.gsub = function(source, pattern, replacement) {
      var match, result;
      if (!((pattern != null) && (replacement != null))) {
       return source;
      }
      result = '';
      while (source.length > 0) {
       if ((match = source.match(pattern))) {
         result += source.slice(0, match.index);
         result += replacement;
         source = source.slice(match.index + match[0].length);
       } else {
         result += source;
         source = '';
       }
      }
      return result;
   };

};

util.inherits(PostCleanerGenerator, yeoman.generators.NamedBase);

PostCleanerGenerator.prototype.cleaner = function cleaner() {

   function clean(path, oldext, newext) {

     glob(path + "." + oldext, options, this._.bind(function (er, files) {
       this._.each(files, this._.bind(function(file, index, list) {
            file = this.gsub(new Regexp(oldext + '\z'), newext);
            if (fs.existsSync(file)) {
               fs.unlinkSync(file);
               console.log('INFO'.blue.blackGB + ' delete file '+ file);
            }
       }, this));
     }, this));

   }

   clean("css/*",          "scss", "css");
   clean("assets/**/*",    "scss", "css");
   clean("templates/**/*", "handlebars.html", "js");
   clean("templates/**/*", "erb.html", "js");
   clean("templates/**/*", "html", "js");


};
