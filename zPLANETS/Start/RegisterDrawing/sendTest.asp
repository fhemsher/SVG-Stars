
<%@ Language=jScript %>
<%
   	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)
	var test=sendXML.getAttribute("test")
  	Response.Write(test)
%>
