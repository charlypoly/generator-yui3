// In a single project only the part // current project has to be configured

// current project
YUI_config.groups.<%= projectName %>.base = "../../../../build/";
YUI_config.groups.<%= projectName %>.filter = (window.location.search.match(/[?&]filter=([^&]+)/) || [])[1] || 'raw';
YUI_config.groups.<%= projectName %>.combine = false;
