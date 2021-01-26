var RiseVision = RiseVision || {};

RiseVision.RSS = RiseVision.RSS || {};

RiseVision.RSS.RiseRSS = function( data ) {
  "use strict";

  var _initialLoad = true,
    _timedOutCount = 0;

  /*
   *  Public Methods
   */
  function init() {
    var rss = document.querySelector( "rise-rss" );

    if ( !rss.go ) {
      setTimeout( init, 100 );

      console.log( "rise-rss component still not initialized; retrying" ); // eslint-disable-line no-console
      return;
    }

    _initRss( rss );
  }

  function _initRss( rss ) {
    rss.addEventListener( "rise-rss-response", function( e ) {
      _timedOutCount = 0;

      if ( e.detail && e.detail.feed ) {
        if ( _initialLoad ) {
          _initialLoad = false;

          RiseVision.RSS.onRiseRSSInit( e.detail.feed );

        } else {
          RiseVision.RSS.onRiseRSSRefresh( e.detail.feed );
        }
      }
    } );

    rss.addEventListener( "rise-rss-error", function( e ) {
      var errorDetails = "",
        params = {
          "event": "error",
          "feed_url": data.url
        },
        endpointParams = {
          "severity": "error"
        };

      if ( e.detail && typeof e.detail === "string" ) {
        errorDetails = e.detail;
      } else if ( e.detail && Array.isArray( e.detail ) && e.detail.length > 0 ) {
        // rise-rss-error passes error from gadgets.io.makeRequest which is always an Array with one item
        errorDetails = e.detail[ 0 ];
      }

      params.error_details = errorDetails;
      params.event_details = "rise rss error";
      endpointParams.errorCode = "E000000061";

      if ( errorDetails.toLowerCase() === "401 unauthorized" ) {
        params.event_details = "feed authentication error";
        endpointParams.errorCode = "E000000057";
        RiseVision.RSS.showError( "The feed at the URL provided cannot be shown because it is " +
          "protected and requires authentication." );
      } else if ( errorDetails.toLowerCase() === "404 not found" ) {
        params.event_details = "feed not found";
        endpointParams.errorCode = "E000000058";
        RiseVision.RSS.showError( "The feed URL <span class='error-link'>" + data.url + "</span> could not be found." );
      } else if ( errorDetails.toLowerCase() === "not a feed" ) {
        params.event_details = "not a feed";
        endpointParams.errorCode = "E000000059";
        RiseVision.RSS.showError( "The URL provided is not an RSS feed." );
      } else if ( errorDetails.indexOf( "403" ) > 0 && errorDetails.toLowerCase().indexOf( "forbidden" ) > 0 ) {
        params.event_details = "feed request error";
        endpointParams.errorCode = "E000000060";
        RiseVision.RSS.showError( "Sorry, there was a problem requesting the RSS feed, please contact the owner of the RSS feed to resolve." );
      } else {
        RiseVision.RSS.showError( "Sorry, there was a problem with the RSS feed." );
      }

      _timedOutCount = errorDetails.toUpperCase().indexOf( "ETIMEDOUT" ) !== -1 ? _timedOutCount + 1 : 0;

      if ( _timedOutCount > 0 && _timedOutCount < 3 ) {
        // prevent logging an ETIMEDOUT error until it occurs at least 3 consecutive times
        return;
      }

      RiseVision.RSS.logEvent( params, endpointParams );
    } );

    rss.setAttribute( "url", data.url );

    if ( data.itemsInQueue ) {
      rss.setAttribute( "entries", data.itemsInQueue );
    }

    rss.go();
  }

  return {
    "init": init
  };
};
