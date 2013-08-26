(NOT STABLE YET)


A Yeoman generator for YUI3 application using Shifter
==============

![yeoman](http://128bitstudios.com/images/logo/yeoman.png)
![yui](http://ebmedia.eventbrite.com/s3-s3/eventlogos/2254509/828699663-2.jpg)

**Installation**
```
npm install
sudo npm install js-beautify
```

**Create project**


```
yo yui3 <project_name> [ --no-config, --gitignore ]
```

- ```--gitignore``` option will put ```.yui3-project.json``` into your ```.gitignore``` file
- ```--no-config``` prevent the file ```.yui3-project.json``` to be created.

(if ```--no-config``` is active, ```--gitignore``` will not trigger the change of .gitignore file)


**.yui3-project.json**

Allow you to overwrite default configuration

```
{
   "project" : "projectName",
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
test/
├── README.md
├── package.json
├── src
│   ├── common
│   │   └── docs
│   │       ├── README.md
│   │       ├── developer-guide.mustache
│   │       ├── dist.json
│   │       ├── getting-started.mustache
│   │       ├── index.mustache
│   │       ├── layouts
│   │       │   ├── example.mustache
│   │       │   └── main.mustache
│   │       ├── partials
│   │       │   ├── need-skin-comment.mustache
│   │       │   ├── need-skin-note.mustache
│   │       │   ├── selleck-foot.mustache
│   │       │   └── test-runner.mustache
│   │       └── project.json
│   └── test-loader
│       ├── build.json
│       ├── js
│       │   └── test.js
│       ├── scripts
│       │   └── meta_join.js
│       └── template
│           └── meta.js
├── tests
│   └── index.html
│     
│── .yui3-project.json  
│     
└── yuidoc.json
```


**Create module**


```
yo yui3:module <module_name> [ --no-i18n, --no-assets, --no-docs, --no-templates, --no-tests  ]
```

Scaffold a YUI3 module structure with Y.Base and by default, the following folders : 

- docs (contain dtreeoc files)
- test (contain unit test files)
- templates (contains handlebars files)
- assets (contains images, css)


**Add template to a existing module**

```
yo yui3:addtemplate <template_name>[, <template_name>,...]
```

**Add lang to a existing module**

Create the lang part of a YUI module. Without arguments the scaffolder creates all the lang setted in the .generator-yui3.json. With argument it only creates the structure for the lang given as a parameter.

```
yo yui3:addlang <lang>[, <lang>,...]
```


internals tasks for Shifter
==
 
**compile handlebars template**

```
yo yui3:handlebars
```

**clean module files after shift**

```
yo yui3:post-cleaner
```
