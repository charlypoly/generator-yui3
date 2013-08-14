A Yeoman generator for YUI3 application using Shifter
==============

![yeoman](http://128bitstudios.com/images/logo/yeoman.png)
![yui](http://ebmedia.eventbrite.com/s3-s3/eventlogos/2254509/828699663-2.jpg)


**Create project**


```
yo yui3 <project_name> [ --!config ]
```

Scaffold the following YUI3 project structure : 

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


If --!config argument passed, the file ```.yui3-project.json``` will not be created.



**Create module**


```
yo yui3:module <module_name> [ --!i18n, --!assets, --!docs, --!templates, --!tests  ]
```

Scaffold a YUI3 module structure with Y.Base and by default, the following folders : 

- docs (contain doc files)
- test (contain unit test files)
- templates (contains handlebars files)
- assets (contains images, css)


internals tasks for Shifter
==
 
**compile handlebars template**

```
yo yui3:handlebars
```

**clean module files after shift**

```
yo yui3:module-clean
```
