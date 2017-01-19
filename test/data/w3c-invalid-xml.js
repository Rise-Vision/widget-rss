var invalidFeedResponse = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + // eslint-disable-line
  "<env:Envelope xmlns:env=\"http://www.w3.org/2003/05/soap-envelope\">" +
  "<env:Body>" +
  "<m:feedvalidationresponse env:encodingStyle=\"http://www.w3.org/2003/05/soap-encoding\" xmlns:m=\"http://www.w3.org/2005/10/feed-validator\">" +
  "<m:uri>http://test.com/invalid</m:uri>" +
  "<m:checkedby>http://validator.w3.org/feed/check.cgi</m:checkedby>" +
  "<m:date>2016-03-28T15:35:03.046372</m:date>" +
  "<m:validity>false</m:validity>" +
  "<m:errors>" +
  "<m:errorcount>1</m:errorcount>" +
  "<m:errorlist></m:errorlist>" +
  "<error>" +
  "<level>error</level>" +
  "<type>MissingAttribute</type>" +
  "<line>21</line>" +
  "<column>22</column>" +
  "<text>Missing enclosure attribute: length</text>" +
  "<msgcount>10</msgcount>" +
  "<attr>length</attr>" +
  "<backupcolumn>22</backupcolumn>" +
  "<backupline>21</backupline>" +
  "<element>enclosure</element>" +
  "<parent>item</parent>" +
  "</error>" +
  "</m:errors>" +
  "<m:warnings>" +
  "<m:warningcount>0</m:warningcount>" +
  "<m:warninglist></m:warninglist>" +
  "</m:warnings>" +
  "</m:feedvalidationresponse>" +
  "</env:Body>" +
  "</env:Envelope>";
