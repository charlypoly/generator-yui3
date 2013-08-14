YUI_config.combine = false;

YUI_config.groups.inputex.combine = false;
YUI_config.groups.inputex.base = "../../../../../../lib/inputex-3.2.0/build/";

YUI_config.groups.<%= projectName %>.base = "../../../../build/";
YUI_config.groups.<%= projectName %>.filter = (window.location.search.match(/[?&]filter=([^&]+)/) || [])[1] || 'raw';

YUI_config.groups.clicrdv.combine = false;
YUI_config.groups.clicrdv.base = "../../../../../../clicrdv3/build/";
YUI_config.groups.clicrdv.filter = YUI_config.groups.<%= projectName %>.filter;