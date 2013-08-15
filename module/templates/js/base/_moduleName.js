/**
* 
* @module <%= name %>
*/

/**
* <%= _.capitalize(name) %>
*
* @class <%= _.capitalize(name) %>
* @constructor
*/

var <%= _.capitalize(_.camelize(name)) %> = new Y.Base.create("<%= name %>", Y.Base, [], {
   /**
    * @method initializer
    *
    */
   initializer: function() {},
   /**
    * @method destructor
    *
    */
   destructor: function() {}
},
{
   // ATTRS : {}
});

Y.<%= _.capitalize(_.camelize(name)) %> = <%= _.capitalize(_.camelize(name)) %>;