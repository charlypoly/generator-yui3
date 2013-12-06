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

**.generator-yui3.json**

Allow you to overwrite default configuration

```
{
   "project" : "awesomeProject",
   "lang" : ["fr", "en", "es", "de"]
}
```

This generator scaffold the following YUI3 project structure : 

```
awesomeproject
└── src
    └── awesomeproject-loader
        ├── build.json
        ├── js
        │   └── awesomeproject.js
        ├── scripts
        │   └── meta_join.js
        └── template
            └── meta.js
```


**Create module**

```
yo yui3:module <module_name>
```

**Add template to an existing module <template_name> is optionnal**

```
yo yui3:addtemplate <template_name>
```

**Add lang to an existing module**

Without arguments the scaffolder creates all the lang setted in the .generator-yui3.json.

```
yo yui3:addlang
```
or
```
yo yui3:addlang <lang1,lang2>
```


**Use yo yui3:build-module to shift the module**

This can be use whenever you are in the module (js, assets, build, meta, ...)

```
yo yui3:build-module
```

internals tasks for Shifter
==
 
**compile handlebars template**

```
yo yui3:handlebars
```
