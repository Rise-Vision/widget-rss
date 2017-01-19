/* exported config */
var config = {};

if ( typeof angular !== "undefined" ) {
  angular.module( "risevision.widget.rss.config", [] )
    .value( "layout4x1", "https://s3.amazonaws.com/widget-rss-test/1.0.0/dist/layout-4x1.html" )
    .value( "layout2x1", "https://s3.amazonaws.com/widget-rss-test/1.0.0/dist/layout-2x1.html" )
    .value( "layout1x2", "https://s3.amazonaws.com/widget-rss-test/1.0.0/dist/layout-1x2.html" );

  angular.module( "risevision.common.i18n.config", [] )
    .constant( "LOCALES_PREFIX", "locales/translation_" )
    .constant( "LOCALES_SUFIX", ".json" );
}

