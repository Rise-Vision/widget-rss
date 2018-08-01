var RiseVision = RiseVision || {};

RiseVision.RSS = RiseVision.RSS || {};

RiseVision.RSS.HorizontalScroll = function( params, content ) {
  "use strict";

  var _items = [],
    _waitingForUpdate = false,
    _waitingToStart = false,
    _scrollerReady = false,
    _scroller = null;

  /*
   *  Private Methods
   */

  function _initScroller() {
    var scrollerElem = document.querySelector( "#scroller" );

    _scroller = new RiseVision.Common.Scroller( params );

    scrollerElem.addEventListener( "scroller-oversized-canvas", function() {

      RiseVision.RSS.logEvent( {
        "event": "warning",
        "event_details": "canvas width is over the max size",
        "feed_url": params.url
      } );

    } );

    scrollerElem.addEventListener( "ready", _onScrollerReady );
    scrollerElem.addEventListener( "done", _onScrollerDone );

    _scroller.init( _getItems() );
  }

  function _getItems() {
    var title = "",
      author = "",
      date = "",
      story = "",
      item = null,
      items = [],
      showSeparator = params.separator && params.separator.show,
      i;

    for ( i = 0; i < _items.length; i++ ) {
      title = content.getTitle( _items[ i ] );
      author = content.getAuthor( _items[ i ] );
      date = content.getDate( _items[ i ] );
      story = content.getStory( _items[ i ] );

      // Title
      if ( title && ( ( typeof params.dataSelection.showTitle === "undefined" ) || params.dataSelection.showTitle ) ) {
        item = {};
        item.text = title;
        item.fontStyle = params.headline.fontStyle;
        items.push( item );
      }

      // Author
      if ( author && ( ( typeof params.dataSelection.showAuthor === "undefined" ) || params.dataSelection.showAuthor ) ) {
        item = {};
        item.text = author;
        item.fontStyle = params.author.fontStyle;
        items.push( item );
      }

      // Date
      if ( date && ( ( typeof params.dataSelection.showTimestamp === "undefined" ) || params.dataSelection.showTimestamp ) ) {
        item = {};
        item.text = date;
        item.fontStyle = params.timestamp.fontStyle;
        items.push( item );
      }

      // Story
      if ( story ) {
        item = {};
        item.text = story;
        item.fontStyle = params.story.fontStyle;
        items.push( item );
      }

      if ( showSeparator ) {
        item = {};
        item.separator = true;
        item.size = params.separator.size;
        item.color = params.separator.color;
        items.push( item );
      }
    }

    return items;
  }

  function _onScrollerReady() {
    _scrollerReady = true;
    start();
  }

  function _onScrollerDone() {
    if ( _waitingForUpdate ) {
      _waitingForUpdate = false;

      // Refresh scroller.
      _scroller.refresh( _getItems() );
    }

    RiseVision.RSS.onContentDone();
  }

  /*
   *  Public Methods
   */
  function init( items ) {
    document.getElementById( "container" ).style.display = "none";

    _items = items;
    _initScroller();

    if ( _waitingToStart ) {
      _waitingToStart = false;
      start();
    }
  }

  function reset() {
    _waitingToStart = false;
    _items = [];
  }

  function start() {
    if ( _scroller && _scrollerReady && ( _items.length > 0 ) ) {
      _scroller.play();
    } else {
      _waitingToStart = true;
    }
  }

  function stop() {
    _waitingToStart = false;

    if ( _scroller ) {
      _scroller.pause();
    }
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
