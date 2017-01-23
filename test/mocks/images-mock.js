var RiseVision = RiseVision || {};

RiseVision.RSS = RiseVision.RSS || {};
RiseVision.RSS.Images = {};

RiseVision.RSS.Images = ( function() {

  "use strict";

  var _imagesToLoad = [],
    _imageCount = 0,
    _images = [],
    _callback = null;

  function _onImageLoaded( image ) {
    _images.push( image );
    _imageCount += 1;

    if ( _imageCount === _imagesToLoad.length && _callback && typeof _callback === "function" ) {
      _callback();
    }
  }

  function _loadImage() {
    var img = new Image();

    _onImageLoaded( img );
  }

  function _loadImages() {
    var i;

    for ( i = 0; i < _imagesToLoad.length; i += 1 ) {
      if ( _imagesToLoad[ i ] === null ) {
        _onImageLoaded( null );
      } else {
        _loadImage( _imagesToLoad[ i ] );
      }
    }
  }

  function load( images, callback ) {
    if ( images.length > 0 ) {
      _imagesToLoad = images;
      _images = [];
      _imageCount = 0;

      if ( callback ) {
        _callback = callback;
      } else {
        _callback = null;
      }

      _loadImages();


    } else if ( callback && typeof callback === "function" ) {
      callback();
    }
  }

  function getImages() {
    return _images;
  }

  return {
    getImages: getImages,
    load: load
  };

} )();
