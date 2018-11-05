/* global describe, it, assert, RiseVision */

/* eslint-disable func-names */

"use strict";

describe( "getImageUrl", function() {

  it( "should extract an image URL", function() {
    var item = {
        "enclosures": [ {
          "url": "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.jpg",
          "type": "image/jpg",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.equal( url, "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.jpg" );
  } );

  it( "should not extract an image URL when the content type is invalid", function() {
    var item = {
        "enclosures": [ {
          "url": "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.jpg",
          "type": "image/invalid",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.isNull( url );
  } );

  it( "should extract an image URL when content type is generic image and extension is valid", function() {
    var item = {
        "enclosures": [ {
          "url": "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.jpg",
          "type": "image",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.equal( url, "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.jpg" );
  } );

  it( "should not extract an image URL when content type is generic image and extension is not valid", function() {
    var item = {
        "enclosures": [ {
          "url": "https://static01.nyt.com/images/2018/11/02/business/02apple/02apple-moth.invalid",
          "type": "image",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.isNull( url );
  } );

  it( "should not extract an image URL when content type is generic image and URL is not valid", function() {
    var item = {
        "enclosures": [ {
          "url": "invalid",
          "type": "image",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.isNull( url );
  } );

  it( "should not extract an image URL when content type is generic image and there is no URL", function() {
    var item = {
        "enclosures": [ {
          "type": "image",
          "length": null,
          "height": "151",
          "width": "151"
        } ]
      },
      url = RiseVision.RSS.Content( null, {} ).getImageUrl( item );

    assert.isNull( url );
  } );

} );
