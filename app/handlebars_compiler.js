#!/usr/bin/env node

module.exports = function() {
   var fs         = require('fs'),
   Handlebars      = require('handlebars'),
   content = null, compiler = null, compileFile = null;

   compiler = function (content) {
         /**
          * Handlebar doesn't support precompile on nodejs yet
          */
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

         content = "Y.namespace('templates')['" + templateName + "'] = " + compilers[type](data) + ";\n";
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

