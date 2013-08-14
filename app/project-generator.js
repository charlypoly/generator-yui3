module.exports = {


   create : function(name, config_file) {
      config_file = this._.isUndefined(config_file) ?  true : config_file;

      name = this._.slugify(name);

      this.log.info("Init "+name+' scaffold');
      this.log.info('init project with' +(config_file ? '' : 'out')+ ' config file');


      this.mkdir(name);

      this.copy('.generator-yui3.json', name+'/.generator-yui3.json');

      // # SRC folder
      this.mkdir(name+'/src/common');

      this.directory('project/src/common/docs', name+'/src/common');

      this.mkdir(name+'/src/'+name+'-loader');

      // # test folder
      this.mkdir(name+'/tests');


   },
};