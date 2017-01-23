/* global $ */

var RiseVision = RiseVision || {};

RiseVision.RSS = RiseVision.RSS || {};

RiseVision.RSS.TransitionNoScroll = function( params, content ) {

  "use strict";

  var _items = [],
    _currentItemIndex = 0,
    _transitionIntervalId = null,
    _waitingForUpdate = false,
    _waitingToStart = false;

  /*
   *  Private Methods
   */
  function _getTransitionConfig( index ) {
    var config = {};

    if ( ( index + params.itemsToShow ) >= ( _items.length - 1 ) ) {
      // account for not enough items to actually show from the feed
      config.itemsToShow = _items.length - ( index + 1 );
      config.currentItemIndex = ( _items.length - 1 );
    } else {
      config.itemsToShow = params.itemsToShow;
      // value is the index of the last item showing
      config.currentItemIndex = index + params.itemsToShow;
    }

    return config;
  }

  function _getStartConfig() {
    var config = {};

    if ( _items.length <= params.itemsToShow ) {
      // account for not enough items to actually show from the feed
      config.itemsToShow = _items.length;
      config.currentItemIndex = ( _items.length - 1 );
    } else {
      config.itemsToShow = params.itemsToShow;
      // value is the index of the last item showing
      config.currentItemIndex = ( params.itemsToShow - 1 );
    }

    return config;
  }

  function _clearPage( cb ) {
    $( ".page" ).empty();

    if ( !cb || typeof cb !== "function" ) {
      return;
    } else {
      cb();
    }
  }

  function _clear( cb ) {
    if ( params.transition.type === "fade" ) {
      $( ".item" ).one( "webkitTransitionEnd transitionend", function() {
        _clearPage( cb );
      } );

      $( ".item" ).addClass( "fade-out" ).removeClass( "fade-in" );
    } else {
      _clearPage( cb );
    }
  }

  function _show( index ) {
    content.showItem( index );

    if ( params.transition.type === "fade" ) {
      $( ".item" ).addClass( "fade-in" );
    }

    $( ".item" ).removeClass( "hide" );
  }

  function _makeTransition() {
    var startConfig = _getStartConfig(),
      transConfig = _getTransitionConfig( _currentItemIndex ),
      startingIndex,
      i;

    if ( _currentItemIndex === ( _items.length - 1 ) ) {

      _stopTransitionTimer();

      _clear( function() {

        // show the items
        for ( i = 0; i < startConfig.itemsToShow; i += 1 ) {
          _show( i );
        }

        _currentItemIndex = startConfig.currentItemIndex;

        RiseVision.RSS.onContentDone();
      } );

      _waitingForUpdate = false;

      return;
    }

    if ( _waitingForUpdate ) {
      _waitingForUpdate = false;

      content.loadImages( function() {
        _clear( function() {
          for ( i = 0; i < startConfig.itemsToShow; i += 1 ) {
            _show( i );
          }

          _currentItemIndex = startConfig.currentItemIndex;
        } );
      } );

    } else {
      startingIndex = _currentItemIndex + 1;

      _currentItemIndex = transConfig.currentItemIndex;

      _clear( function() {
        for ( i = startingIndex; i < ( startingIndex + transConfig.itemsToShow ); i += 1 ) {
          _show( i );
        }
      } );
    }

  }

  function _startTransitionTimer() {
    // legacy, backwards compatibility for duration value
    var duration = ( params.transition.duration / 1000 >= 1 ) ? params.transition.duration : params.transition.duration * 1000;

    if ( _transitionIntervalId === null ) {
      _transitionIntervalId = setInterval( function() {
        _makeTransition();
      }, duration );
    }
  }

  function _stopTransitionTimer() {
    clearInterval( _transitionIntervalId );
    _transitionIntervalId = null;
  }

  /*
   *  Public Methods
   */
  function init( items ) {
    var startConfig,
      i;

    _items = items;
    startConfig = _getStartConfig();

    _currentItemIndex = startConfig.currentItemIndex;

    // show the items
    for ( i = 0; i < startConfig.itemsToShow; i += 1 ) {
      _show( i );
    }

    if ( _waitingToStart ) {
      _waitingToStart = false;
      start();
    }
  }

  function reset() {
    _clear();
    _waitingToStart = false;
    _waitingForUpdate = false;
    _items = [];
  }

  function start() {
    if ( _items.length > 0 ) {
      _startTransitionTimer();
    } else {
      _waitingToStart = true;
    }
  }

  function stop() {
    _waitingToStart = false;
    _stopTransitionTimer();
  }

  function update( items ) {
    _items = items;
    _waitingForUpdate = true;
  }

  return {
    init: init,
    reset: reset,
    start: start,
    stop: stop,
    update: update
  };

};
