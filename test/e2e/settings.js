/* global require, browser, describe, before, beforeEach, it, element, by */

/* eslint-disable func-names */

( function() {
  "use strict";

  var chai = require( "chai" ),
    chaiAsPromised = require( "chai-as-promised" ),
    expect;

  chai.use( chaiAsPromised );
  expect = chai.expect;

  browser.driver.manage().window().setSize( 1024, 768 );

  describe( "RSS Settings - e2e Testing", function() {

    beforeEach( function() {
      browser.get( "/src/settings-e2e.html" );
    } );

    describe( "Initialization", function() {
      it( "Should load Save button", function() {
        expect( element( by.css( "button#save" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Cancel button", function() {
        expect( element( by.css( "button#cancel" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Title Font Setting component", function() {
        expect( element( by.css( "#title-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Description Font Setting component", function() {
        expect( element( by.css( "#story-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Timestamp Font Setting component", function() {
        expect( element( by.css( "#timestamp-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Author Font Setting component", function() {
        expect( element( by.css( "#author-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Transition component", function() {
        expect( element( by.css( "select[name='transition-by']" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should load Separator Color Picker component", function() {
        expect( element( by.model( "settings.additionalParams.separator.color" ) ).isDisplayed() ).to.eventually.be.true;
      } );

      it( "Should not load URL field", function() {
        expect( element( by.id( "custom-layout" ) ).isPresent() ).to.eventually.be.false;
      } );
    } );

    describe( "Defaults", function() {
      it( "Should set default value for 'Items to Show'", function() {
        expect( element( by.id( "items-to-show" ) ).getAttribute( "value" ) ).to.eventually.equal( "1" );
      } );

      it( "Should set default value for 'Max Items in Queue'", function() {
        expect( element( by.model( "settings.additionalParams.itemsInQueue" ) ).getAttribute( "value" ) ).to.eventually.equal( "5" );
      } );

      it( "Should select 'Show Title'", function() {
        expect( element( by.model( "settings.additionalParams.dataSelection.showTitle" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should select 'Show Timestamp'", function() {
        expect( element( by.model( "settings.additionalParams.dataSelection.showTimestamp" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should select 'Show Author'", function() {
        expect( element( by.model( "settings.additionalParams.dataSelection.showAuthor" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should select 'Show Image'", function() {
        expect( element( by.model( "settings.additionalParams.dataSelection.showImage" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should have default value for snippet length", function() {
        expect( element( by.model( "settings.additionalParams.dataSelection.snippetLength" ) ).getAttribute( "value" ) ).to.eventually.equal( "120" );
      } );

      it( "Should select 'Show Description Snippet'", function() {
        expect( element( by.css( "input[type='radio'][value='snippet']" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should select default layout", function() {
        expect( element( by.css( "input[type='radio'][value='layout-4x1']" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should select 'Show Separator'", function() {
        expect( element( by.model( "settings.additionalParams.separator.show" ) ).isSelected() ).to.eventually.be.true;
      } );

      it( "Should set default for Separator size", function() {
        expect( element( by.model( "settings.additionalParams.separator.size" ) ).getAttribute( "value" ) ).to.eventually.equal( "1" );
      } );

      it( "Should set default for Separator color", function() {
        expect( element( by.model( "settings.additionalParams.separator.color" ) ).getAttribute( "value" ) ).to.eventually.equal( "rgb(238,238,238)" );
      } );

      it( "Should not show warning message regarding RSS feed", function() {
        expect( element( by.id( "invalid-feed" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "Should not show authentication warning message", function() {
        expect( element( by.id( "authentication" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "Should not show not a feed warning message", function() {
        expect( element( by.id( "not-a-feed" ) ).isPresent() ).to.eventually.be.false;
      } );
    } );

    describe( "Visibility", function() {
      it( "Should show URL field if 'Custom Layout URL' is selected", function() {
        element( by.css( "input[type='radio'][value='custom']" ) ).click();

        expect( element( by.id( "custom-layout" ) ).isDisplayed() ).to.eventually.be.true;
      } );

      it( "should not show 'Items to Show' if horizontal scrolling selected", function() {
        element( by.name( "transition-by" ) ).element( by.css( "option[value='scroll']" ) ).click();
        element( by.name( "transition-direction" ) ).element( by.css( "option[value='left']" ) ).click();

        expect( element( by.id( "items-to-show" ) ).isPresent() ).to.eventually.be.false;

      } );

      it( "should not show 'Show Image' if horizontal scrolling selected", function() {
        element( by.name( "transition-by" ) ).element( by.css( "option[value='scroll']" ) ).click();
        element( by.name( "transition-direction" ) ).element( by.css( "option[value='left']" ) ).click();

        expect( element( by.model( "settings.additionalParams.dataSelection.showImage" ) ).isPresent() ).to.eventually.be.false;

      } );

      it( "should not show 'Layout' section if horizontal scrolling selected", function() {
        element( by.name( "transition-by" ) ).element( by.css( "option[value='scroll']" ) ).click();
        element( by.name( "transition-direction" ) ).element( by.css( "option[value='left']" ) ).click();

        expect( element( by.id( "layouts" ) ).isPresent() ).to.eventually.be.false;

      } );
    } );

    describe( "Warning messages", function() {
      it( "should not show invalid feed warning when URL Field is receiving input", function() {
        element( by.css( "#rssUrl input[name='url']" ) ).sendKeys( "http://test.com/rss" );

        expect( element( by.id( "invalid-feed" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "should not show authentication warning when URL Field is receiving input", function() {
        element( by.css( "#rssUrl input[name='url']" ) ).sendKeys( "http://test.com/rss" );

        expect( element( by.id( "authentication" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "should not show not a feed warning when URL Field is receiving input", function() {
        element( by.css( "#rssUrl input[name='url']" ) ).sendKeys( "http://test.com/rss" );

        expect( element( by.id( "not-a-feed" ) ).isPresent() ).to.eventually.be.false;
      } );
    } );

    describe( "Saving", function() {
      it( "Should enable Save button", function() {
        expect( element( by.css( "button#save[disabled=disabled" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "Should set form to valid", function() {
        expect( element( by.css( "form[name='settingsForm'].ng-invalid" ) ).isPresent() ).to.eventually.be.false;
      } );

      it( "Should disable Save button for invalid url", function() {
        element( by.name( "url" ) ).sendKeys( "invalidURL" );
        expect( element( by.css( "button#save[disabled=disabled" ) ).isPresent() ).to.eventually.be.true;
      } );

      it( "Should correctly save settings", function() {
        var settings = {
          params: {},
          additionalParams: {
            "url": "",
            "itemsInQueue": 5,
            "itemsToShow": 1,
            "headline": {
              "fontStyle": {
                "font": {
                  "family": "verdana,geneva,sans-serif",
                  "type": "standard",
                  "url": ""
                },
                "size": "24px",
                "customSize": "",
                "align": "left",
                "bold": true,
                "italic": false,
                "underline": false,
                "forecolor": "black",
                "backcolor": "transparent",
                "verticalAlign": "middle"
              }
            },
            "story": {
              "fontStyle": {
                "font": {
                  "family": "verdana,geneva,sans-serif",
                  "type": "standard",
                  "url": ""
                },
                "size": "18px",
                "customSize": "",
                "align": "left",
                "bold": true,
                "italic": false,
                "underline": false,
                "forecolor": "black",
                "backcolor": "transparent",
                "verticalAlign": "middle"
              }
            },
            "timestamp": {
              "fontStyle": {
                "font": {
                  "family": "verdana,geneva,sans-serif",
                  "type": "standard",
                  "url": ""
                },
                "size": "14px",
                "customSize": "",
                "align": "left",
                "bold": true,
                "italic": false,
                "underline": false,
                "forecolor": "#969696",
                "backcolor": "transparent",
                "verticalAlign": "middle"
              }
            },
            "author": {
              "fontStyle": {
                "font": {
                  "family": "verdana,geneva,sans-serif",
                  "type": "standard",
                  "url": ""
                },
                "size": "14px",
                "customSize": "",
                "align": "left",
                "bold": true,
                "italic": false,
                "underline": false,
                "forecolor": "#969696",
                "backcolor": "transparent",
                "verticalAlign": "middle"
              }
            },
            "transition": {
              "type": "none",
              "direction": "up",
              "duration": 10,
              "pud": 10,
              "resume": 5,
              "speed": "medium"
            },
            "dataSelection": {
              "showTitle": true,
              "showTimestamp": true,
              "showAuthor": true,
              "showImage": true,
              "showDescription": "snippet",
              "snippetLength": 120
            },
            "layout": "layout-4x1",
            "layoutUrl": "",
            "separator": {
              "show": true,
              "size": 1,
              "color": "rgb(238,238,238)"
            }
          }
        };

        element( by.id( "save" ) ).click();

        expect( browser.executeScript( "return window.result" ) ).to.eventually.deep.equal(
          {
            "additionalParams": JSON.stringify( settings.additionalParams ),
            "params": ""
          } );
      } );
    } );

  } );

  describe( "RSS Settings - deselection", function() {

    before( function() {
      browser.get( "/src/settings-e2e.html" );
    } );

    it( "Should not load Title Font Setting component", function() {
      element( by.model( "settings.additionalParams.dataSelection.showTitle" ) ).click();
      expect( element( by.css( "#title-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.false;
    } );

    it( "Should not load Date Font Setting component", function() {
      element( by.model( "settings.additionalParams.dataSelection.showTimestamp" ) ).click();
      expect( element( by.css( "#timestamp-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.false;
    } );

    it( "Should not load Date Font Setting component", function() {
      element( by.model( "settings.additionalParams.dataSelection.showAuthor" ) ).click();
      expect( element( by.css( "#author-font .mce-tinymce" ) ).isPresent() ).to.eventually.be.false;
    } );

    it( "Should not display size and color selections for Separator", function() {
      element( by.model( "settings.additionalParams.separator.show" ) ).click();
      expect( element( by.model( "settings.additionalParams.separator.size" ) ).isPresent() ).to.eventually.be.false;
      expect( element( by.model( "settings.additionalParams.separator.color" ) ).isPresent() ).to.eventually.be.false;
    } );

    it( "Should not show snippet length field", function() {
      element.all( by.model( "settings.additionalParams.dataSelection.showDescription" ) ).get( 1 ).click();
      expect( element( by.id( "snippetLength" ) ).isPresent() ).to.eventually.be.false;
    } );

    it( "Should correctly save settings", function() {
      var settings = {
        params: {},
        additionalParams: {
          "url": "",
          "itemsInQueue": 5,
          "itemsToShow": 1,
          "headline": {
            "fontStyle": {}
          },
          "story": {
            "fontStyle": {
              "font": {
                "family": "verdana,geneva,sans-serif",
                "type": "standard",
                "url": ""
              },
              "size": "18px",
              "customSize": "",
              "align": "left",
              "bold": true,
              "italic": false,
              "underline": false,
              "forecolor": "black",
              "backcolor": "transparent",
              "verticalAlign": "middle"
            }
          },
          "timestamp": {
            "fontStyle": {}
          },
          "author": {
            "fontStyle": {}
          },
          "transition": {
            "type": "none",
            "direction": "up",
            "duration": 10,
            "pud": 10,
            "resume": 5,
            "speed": "medium"
          },
          "dataSelection": {
            "showTitle": false,
            "showTimestamp": false,
            "showAuthor": false,
            "showImage": true,
            "showDescription": "full",
            "snippetLength": 120
          },
          "layout": "layout-4x1",
          "layoutUrl": "",
          "separator": {
            "show": false,
            "size": 1,
            "color": "rgb(238,238,238)"
          }
        }
      };

      element( by.id( "save" ) ).click();

      expect( browser.executeScript( "return window.result" ) ).to.eventually.deep.equal(
        {
          "additionalParams": JSON.stringify( settings.additionalParams ),
          "params": ""
        } );
    } );

  } );

} )();
