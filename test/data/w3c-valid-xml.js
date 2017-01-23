var validFeedResponse = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + // eslint-disable-line
  "<env:Envelope xmlns:env=\"http://www.w3.org/2003/05/soap-envelope\">" +
  "<env:Body>" +
  "<m:feedvalidationresponse env:encodingStyle=\"http://www.w3.org/2003/05/soap-encoding\" xmlns:m=\"http://www.w3.org/2005/10/feed-validator\">" +
  "<m:uri>http://test.com/valid</m:uri>" +
  "<m:checkedby>http://validator.w3.org/feed/check.cgi</m:checkedby>" +
  "<m:date>2016-03-28T15:35:03.046372</m:date>" +
  "<m:validity>true</m:validity>" +
  "<m:errors>" +
  "<m:errorcount>0</m:errorcount>" +
  "<m:errorlist></m:errorlist>" +
  "</m:errors>" +
  "<m:warnings>" +
  "<m:warningcount>0</m:warningcount>" +
  "<m:warninglist></m:warninglist>" +
  "</m:warnings>" +
  "</m:feedvalidationresponse>" +
  "</env:Body>" +
  "</env:Envelope>";
