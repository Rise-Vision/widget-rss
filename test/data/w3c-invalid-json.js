var invalidFeedJSON = { // eslint-disable-line
  "Envelope": [
    {
      "Body": [
        {
          "feedvalidationresponse": [
            {
              "errors": [
                {
                  "errorcount": [
                    {
                      "_text": 1
                    }
                  ],
                  "errorlist": [
                    {
                      "error": [
                        {
                          "attr": [
                            {
                              "_text": "length"
                            }
                          ],
                          "element": [
                            {
                              "_text": "enclosure"
                            }
                          ],
                          "level": [
                            {
                              "_text": "Error"
                            }
                          ],
                          "text": [
                            {
                              "_text": "Missing enclosure attribute: length"
                            }
                          ],
                          "type": [
                            {
                              "_text": "MissingAttribute"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              "validity": [
                {
                  "_text": false
                }
              ],
              "warnings": [
                {
                  "warningcount": [
                    {
                      "_text": 0
                    }
                  ],
                  "warninglist": [
                    {
                      "warning": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
