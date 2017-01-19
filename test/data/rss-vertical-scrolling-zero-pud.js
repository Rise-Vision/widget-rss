( function( window ) {
  "use strict";

  window.gadget = window.gadget || {};
  window.gadget.settings = {
    "params": {},
    "additionalParams": {
      "url": "http://test.com/feed.rss",
      "itemsInQueue": 1,
      "itemsToShow": 1,
      "headline": {
        "fontStyle": {
          "font": {
            "family": "verdana,geneva,sans-serif",
            "type": "standard"
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
            "type": "standard"
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
            "type": "standard"
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
            "type": "standard"
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
      "transition": {
        type: "scroll",
        duration: 10,
        direction: "up",
        pud: 0,
        resume: 5,
        speed: "medium"
      },
      "dataSelection": {
        "showTitle": true,
        "showTimestamp": true,
        "showAuthor": true,
        "showImage": true,
        "showDescription": "snippet",
        "snippetLength": 120
      }
    }
  };
} )( window );
