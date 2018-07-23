( function( window ) {
  "use strict";

  window.gadget = window.gadget || {};
  window.gadget.settings = {
    "params": {},
    "additionalParams": {
      "url": "http://test.com/feed.rss",
      "itemsInQueue": 4,
      "itemsToShow": 2,
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
        type: "none",
        duration: 10,
        pud: 10,
        resume: 5,
        speed: "medium"
      },
      "dataSelection": {
        "showTitle": true,
        "showTimestamp": true,
        "showAuthor": true,
        "showImage": true,
        "showDescription": "snippet",
        "snippetLength": 130
      },
      "separator": {
        "show": true,
        "size": 1,
        "color": "rgb(238,238,238)"
      },
      "layout": "layout-4x1",
      "layoutUrl": ""
    }
  };
} )( window );
