/* global describe, it, expect, RiseVision */

/* eslint-disable func-names */

"use strict";

describe( "truncate", function() {
  it( "should return non-truncated text", function() {
    var text = "Jujubes danish wafer toffee.";

    expect( RiseVision.RSS.Utils.truncate( text ) ).to.equal( text );
  } );

  it( "should return truncated text", function() {
    var text = "Jujubes danish wafer toffee. Biscuit lollipop fruitcake liquorice. Bear claw " +
      "carrot cake soufflé danish apple pie ice cream halvah chupa chups. Candy canes cupcake " +
      "brownie pie.",
      truncatedText = "Jujubes danish wafer toffee. Biscuit lollipop fruitcake liquorice. Bear " +
        "claw carrot cake soufflé danish apple pie ice  ...";

    expect( RiseVision.RSS.Utils.truncate( text ) ).to.equal( truncatedText );
  } );
} );
