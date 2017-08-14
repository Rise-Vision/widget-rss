angular.module( "risevision.widget.rss.settings" )
  .controller( "rssSettingsController", [ "$scope", "$log", "feedValidator",
    function( $scope, $log, feedValidator ) {

      function isHorizontalConfigured() {
        return $scope.settings.additionalParams.transition.direction === "left" &&
          $scope.settings.additionalParams.transition.type === "scroll";
      }

      $scope.feedValid = true;
      $scope.requiresAuthentication = false;
      $scope.notAFeed = false;
      $scope.horizontalScrolling = false;

      $scope.validateFeed = function() {
        feedValidator.isValid( $scope.settings.additionalParams.url ).then( function( value ) {
          $scope.feedValid = value;
        } );
      };

      $scope.checkWithFeedParser = function() {
        if ( $scope.settings.additionalParams.url && $scope.settingsForm.rssUrl.$valid ) {
          feedValidator.isParsable( $scope.settings.additionalParams.url )
            .then( function( value ) {
              if ( value === "401 Unauthorized" ) {
                $scope.requiresAuthentication = true;
              } else if ( value === "Not a feed" ) {
                $scope.notAFeed = true;
              }
              if ( !value ) {
                $scope.requiresAuthentication = false;
                $scope.notAFeed = false;
                $scope.validateFeed();
              }
            } );
        } else {
          $scope.requiresAuthentication = false;
          $scope.notAFeed = false;
          $scope.feedValid = true;
        }
      };

      $scope.$on( "urlFieldBlur", function() {
        $scope.checkWithFeedParser();
      } );

      $scope.$watch( "settings.additionalParams.url", function( newVal, oldVal ) {
        if ( typeof oldVal === "undefined" && newVal && newVal !== "" ) {
          // previously saved settings are being shown
          $scope.checkWithFeedParser();
        } else {
          if ( typeof newVal !== "undefined" ) {
            // ensure warning message doesn't get shown while url field is receiving input
            $scope.feedValid = true;
            $scope.requiresAuthentication = false;
          }
        }

      } );

      $scope.$watch( "settings.additionalParams.transition.type", function( value ) {
        if ( typeof value !== "undefined" ) {
          $scope.horizontalScrolling = isHorizontalConfigured();
        }
      } );

      $scope.$watch( "settings.additionalParams.transition.direction", function( value ) {
        if ( typeof value !== "undefined" ) {
          $scope.horizontalScrolling = isHorizontalConfigured();
        }
      } );

      $scope.$watch( "settings.additionalParams.dataSelection.showTitle", function( value ) {
        if ( typeof value !== "undefined" && value !== "" && !value ) {
          $scope.settings.additionalParams.headline.fontStyle = {};
        }
      } );

      $scope.$watch( "settings.additionalParams.dataSelection.showTimestamp", function( value ) {
        if ( typeof value !== "undefined" && value !== "" && !value ) {
          $scope.settings.additionalParams.timestamp.fontStyle = {};
        }
      } );

      $scope.$watch( "settings.additionalParams.dataSelection.showAuthor", function( value ) {
        if ( typeof value !== "undefined" && value !== "" && !value ) {
          $scope.settings.additionalParams.author.fontStyle = {};
        }
      } );

      $scope.$watch( "settings.additionalParams.dataSelection.showDescription", function( value ) {
        if ( typeof value !== "undefined" && value !== "snippet" ) {
          if ( $scope.settings.additionalParams.dataSelection.snippetLength ) {
            $scope.settings.additionalParams.dataSelection.snippetLength = $scope.settings.additionalParams.dataSelection.snippetLength;
          } else {
            $scope.settings.additionalParams.dataSelection.snippetLength = 120;
          }
        }
      } );

    } ] )
  .filter( "escape", function() {
    return window.encodeURIComponent;
  } )
  .value( "defaultSettings", {
    "params": {},
    "additionalParams": {
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
          "backcolor": "transparent"
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
          "backcolor": "transparent"
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
          "backcolor": "transparent"
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
          "backcolor": "transparent"
        }
      },
      "transition": {},
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
  } );
