module.exports = {
   base : function(name, option) {
      return module.exports.create.call(this, ['base', name, options]);
   },

   widget : function(name, option) {
      return module.exports.create.call(this, ['widget', name, options]);
   },

   //view, model, and so on..

   create : function(name, type, options) {
      //create folder
      
      //dashetize name : 
      name = this._.slugify(name);
      this.mkdir(name);
   },

   update : function(options) {

   }
}