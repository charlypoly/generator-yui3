(NOT STABLE YET)


A Yeoman generator for YUI3 Projects
==============
**Installation**
```
sudo npm install -g generator-yui3
```

**Create project**

```
yo yui3 awesomeProject
```

**.yui3-project.json**

Allow you to overwrite default configuration

```
{
   "project" : "awesomeProject",
   "modules" : {
      "base" : {
         "create" : [],
         "i18n" : ["en"]
      },
      "widget" : {
         "create" : ["templates"],
         "i18n" : ["en"]
      }
   }
}
```



This generator scaffold the following YUI3 project structure : 

```
awesomeproject
└── src
    └── awesomeproject-loader
        ├── build.json
        ├── js
        │   └── awesomeproject.js
        ├── scripts
        │   └── meta_join.js
        └── template
            └── meta.js
```


**Create module**


```
yo yui3:module <module_name>
```

**Add template to a existing module <template_name> is optionnal**

```
yo yui3:addtemplate <template_name>
```

Use it like that :
```
var markup = Y.templates[NAME]({});
```

**Add lang to a existing module**

Create the lang part of a YUI module. Without arguments the scaffolder creates all the lang setted in the .generator-yui3.json. With argument it only creates the structure for the lang given as a parameter.

```
yo yui3:addlang <lang1,lang2>
```

**Use yo yui3:build-module to shift the module**

This can be use whenever you are inside the module (js, scss, build, meta, ...)

```
yo yui3:build-module
```

1 step integration with your favorite editor example with Sublime-Text : Tool --> Build System --> New Build System.
then shell_cmd = "yo yui3:build-module" that's it ;)





internals tasks for Shifter
==
 
**compile handlebars template**

```
yo yui3:handlebars
```
