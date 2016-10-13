/* global gadgets, _ */

var RiseVision = RiseVision || {};
RiseVision.RSS = {};

RiseVision.RSS = (function (document, gadgets) {
  "use strict";

  var _additionalParams = null,
    _prefs = new gadgets.Prefs();

  var _message = null,
    _riserss = null,
    _content = null;

  var _currentFeed = null;

  var _viewerPaused = true,
    _errorTimer = null,
    _errorLog = null,
    _errorFlag = false;

  /*
   *  Private Methods
   */
  function _ready() {
    gadgets.rpc.call("", "rsevent_ready", null, _prefs.getString("id"), true, true, true, true, true);
  }

  function _done() {
    gadgets.rpc.call("", "rsevent_done", null, _prefs.getString("id"));

    // Any errors need to be logged before the done event.
    if (_errorLog !== null) {
      logEvent(_errorLog, true);
    }

    // log "done" event
    logEvent({ "event": "done", "feed_url": _additionalParams.url }, false);
  }

  function _noFeedItems() {
    var params = {
      "event": "error",
      "event_details": "no feed items",
      "feed_url": _additionalParams.url
    };

    logEvent(params, true);
    showError("There are no items to show from this RSS feed.");
  }

  function _clearErrorTimer() {
    clearTimeout(_errorTimer);
    _errorTimer = null;
  }

  function _startErrorTimer() {
    _clearErrorTimer();

    _errorTimer = setTimeout(function () {
      // notify Viewer widget is done
      _done();
    }, 5000);
  }

  /* Show message that the feed is loading. */
  function _showLoadingMessage() {
    _message = new RiseVision.Common.Message(document.getElementById("container"),
      document.getElementById("messageContainer"));

    _message.show("Please wait while your feed is loaded.");
  }

  /* Load Google and custom fonts. */
  function _loadFonts(cb) {
    var fontSettings = [
      {
        "class": "story_font-style",
        "fontStyle": _additionalParams.story.fontStyle
      }
    ];

    if (_additionalParams.headline && !_.isEmpty(_additionalParams.headline.fontStyle)) {
      fontSettings.push({
        "class": "headline_font-style",
        "fontStyle": _additionalParams.headline.fontStyle
      });
    }

    if (_additionalParams.timestamp && !_.isEmpty(_additionalParams.timestamp.fontStyle)) {
      fontSettings.push({
        "class": "timestamp_font-style",
        "fontStyle": _additionalParams.timestamp.fontStyle
      });
    }

    if (_additionalParams.author && !_.isEmpty(_additionalParams.author.fontStyle)) {
      fontSettings.push({
        "class": "author_font-style",
        "fontStyle": _additionalParams.author.fontStyle
      });
    }

    if (cb && (typeof cb === "function")) {
      RiseVision.Common.Utilities.loadFonts(fontSettings, cb);
    }
    else {
      RiseVision.Common.Utilities.loadFonts(fontSettings);
    }
  }

  function _initRiseRSS() {
    _riserss = new RiseVision.RSS.RiseRSS(_additionalParams);
    _riserss.init();
  }

  /* Load the layout file. */
  function _loadLayout() {
    var url = window.location.pathname,
      index = url.lastIndexOf("/") + 1;

    url = url.substr(0, index) + "layouts/";

    if (typeof _additionalParams.layout === "undefined") {
      url += "layout-4x1.html";
    }
    else if (_additionalParams.layout === "custom") {
      url = _additionalParams.layoutUrl;
    }
    else {
      url += _additionalParams.layout + ".html";
    }

    // Load the layout and add it to the DOM.
    $.get(url)
      .done(function(data) {
        _onLayoutLoaded(data);
      })
      .fail(function() {
        _onLayoutNotLoaded(url);
      });
  }

  /* Layout file was loaded successfully. */
  function _onLayoutLoaded(data) {
    $("#container").append(data);
    _showLoadingMessage();
    _loadFonts();
    _initRiseRSS();
    _ready();
  }

  /* Layout file failed to load. */
  function _onLayoutNotLoaded(url) {
    _message = new RiseVision.Common.Message(document.getElementById("container"),
      document.getElementById("messageContainer"));

    _message.show("The layout file could not be loaded.");

    logEvent({
      "event": "error",
      "event_details": "layout not loaded",
      "error_details": url,
      "feed_url": _additionalParams.url
    }, true);

    _ready();
  }

  function _isHorizontalScroll() {
    if (!_additionalParams.transition) {
      return false;
    }
    else if ((_additionalParams.transition.type === "scroll") && (_additionalParams.transition.direction === "left")) {
      return true;
    }
    else {
      return false;
    }
  }

  function _initHorizontalScroll() {
    document.getElementById("scroller").style.display = "block";

    _showLoadingMessage();

    _loadFonts(function() {
      _initRiseRSS();
      _ready();
    });
  }

  /*
   *  Public Methods
   */
  function getTableName() {
    return "rss_events";
  }

  function logEvent(params, isError) {
    if (isError) {
      _errorLog = params;
    }

    RiseVision.Common.LoggerUtils.logEvent(getTableName(), params);
  }

  function onContentDone() {
    _done();
  }

  function onRiseRSSInit(feed) {
    _content = new RiseVision.RSS.Content(_prefs, _additionalParams);

    if (feed.items && feed.items.length > 0) {
      // remove a message previously shown
      _message.hide();

      _currentFeed = _.clone(feed);

      _content.init(_currentFeed);

      if (!_viewerPaused) {
        _content.play();
      }
    }
    else {
      _noFeedItems();
    }
  }

  function onRiseRSSRefresh(feed) {
    var updated = false;

    if (!feed.items || feed.items.length === 0) {
      _noFeedItems();
    }
    else if (!_currentFeed || feed.items.length !== _currentFeed.items.length) {
      updated = true;
    }
    else {
      // run through each item and compare, if any are different, feed has been updated
      for (var i = 0; i < _currentFeed.items.length; i += 1) {
        if (!_.isEqual(feed.items[i], _currentFeed.items[i])) {
          updated = true;
          break;
        }
      }
    }

    if (updated) {
      _currentFeed = _.clone(feed);

      if (_errorFlag) {
        if (!_content) {
          // create content module instance
          _content = new RiseVision.RSS.Content(_prefs, _additionalParams);
        }

        _message.hide();
        _content.init(_currentFeed);

        // refreshed feed fixed previous error, ensure flag is removed so next playback shows content
        _errorFlag = false;
        _errorLog = null;
      }
      else {
        _content.update(feed);
      }

    }
  }

  function pause() {
    _viewerPaused = true;

    if (_errorFlag) {
      _clearErrorTimer();
      return;
    }

    if (_content) {
      _content.pause();
    }
  }

  function play() {
    _viewerPaused = false;

    logEvent({ "event": "play", "feed_url": _additionalParams.url }, false);

    if (_errorFlag) {
      _startErrorTimer();
      return;
    }

    if (_content) {
      _content.play();
    }
  }

  function setAdditionalParams(additionalParams) {
    _additionalParams = JSON.parse(JSON.stringify(additionalParams));
    _prefs = new gadgets.Prefs();

    _additionalParams.width = _prefs.getInt("rsW");
    _additionalParams.height = _prefs.getInt("rsH");

    document.getElementById("container").style.width = _additionalParams.width + "px";
    document.getElementById("container").style.height = _additionalParams.height + "px";

    if (_isHorizontalScroll()) {
      _initHorizontalScroll();
    }
    else {
      _loadLayout();
    }
  }

  function showError(message) {
    _errorFlag = true;

    if (!_content) {
      _content = new RiseVision.RSS.Content(_prefs, _additionalParams);
    }

    _content.reset();
    _currentFeed = null;
    _message.show(message);

    if (!_viewerPaused) {
      _startErrorTimer();
    }
  }

  function stop() {
    pause();
  }

  return {
    "getTableName": getTableName,
    "logEvent": logEvent,
    "onContentDone": onContentDone,
    "onRiseRSSInit": onRiseRSSInit,
    "onRiseRSSRefresh": onRiseRSSRefresh,
    "pause": pause,
    "play": play,
    "setAdditionalParams": setAdditionalParams,
    "showError": showError,
    "stop": stop
  };

})(document, gadgets);
