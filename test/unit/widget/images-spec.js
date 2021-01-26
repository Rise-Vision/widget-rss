/* global describe, it, assert, RiseVision */

/* eslint-disable func-names */

"use strict";

describe( "load", function() {

  it( "should execute callback", function( done ) {
    assert.doesNotThrow( function() {

      var urls = [ "image1.jpg", "image2.jpg" ];

      RiseVision.RSS.Images.load( urls, function() {
        done();
      } );
    } );
  } );

} );

describe( "getImages", function() {

  it( "should return array of image objects", function() {
    var images = RiseVision.RSS.Images.getImages();

    assert.isArray( images );
    assert.equal( images.length, 2 );
    assert.equal( typeof images[ 0 ], "object" );
    assert.equal( typeof images[ 1 ], "object" );
  } );

} );

describe( "additional load() calls", function() {

  it( "should execute callback", function( done ) {
    assert.doesNotThrow( function() {

      var urls = [ "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg" ];

      RiseVision.RSS.Images.load( urls, function() {
        done();
      } );
    } );
  } );

  it( "should return correct array of image objects", function() {
    var images = RiseVision.RSS.Images.getImages();

    assert.isArray( images );
    assert.equal( images.length, 4 );
  } );

} );
