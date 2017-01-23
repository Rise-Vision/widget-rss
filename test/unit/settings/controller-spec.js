/* global describe, beforeEach, it, expect, module, inject */

/* eslint-disable func-names */

"use strict";

describe( "Unit Tests - Settings Controller", function() {

  var defaultSettings,
    scope;

  beforeEach( module( "risevision.widget.rss.settings" ) );

  beforeEach( inject( function( $injector, $rootScope, $controller, _feedValidator_ ) {
    defaultSettings = $injector.get( "defaultSettings" );
    scope = $rootScope.$new();
    $controller( "rssSettingsController", {
      $scope: scope,
      feedValidator: _feedValidator_
    } );

    scope.settingsForm = {
      $setValidity: function() {
        return;
      }
    };

    scope.settings = {
      params: defaultSettings.params,
      additionalParams: defaultSettings.additionalParams
    };

  } ) );

  it( "should define defaultSettings", function() {
    expect( defaultSettings ).to.be.truely;
    expect( defaultSettings ).to.be.an( "object" );
  } );

  it( "Should set horizontalScrolling to true when 'scroll' and 'left' chosen from transition setting", function() {
    expect( scope.horizontalScrolling ).to.be.false;

    scope.settings.additionalParams.transition.type = "scroll";
    scope.settings.additionalParams.transition.direction = "left";

    scope.$digest();

    expect( scope.horizontalScrolling ).to.be.true;
  } );

} );
