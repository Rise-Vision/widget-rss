var RiseVision = RiseVision || {};

RiseVision.RSS = RiseVision.RSS || {};

RiseVision.RSS.Utils = ( function() {
  "use strict";

  /*
   *  Public  Methods
   */

  function stripScripts( html ) {
    var div = document.createElement( "div" ),
      scripts,
      i;

    div.innerHTML = html;
    scripts = div.getElementsByTagName( "script" );
    i = scripts.length;

    while ( i-- ) {
      scripts[ i ].parentNode.removeChild( scripts[ i ] );
    }

    return div.innerHTML;
  }

  /* Truncate text while preserving word boundaries. */
  function truncate( text, length ) {
    var maxLength = ( length ) ? length : 120;

    if ( text.length > maxLength ) {
      text = text.substring( 0, maxLength );

      // Ensure that we don't truncate mid-word.
      text = text.replace( /\w+$/, "" );
      text += " ...";
    }

    return text;
  }

  return {
    "stripScripts": stripScripts,
    "truncate": truncate
  };

} )();
