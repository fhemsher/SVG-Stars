<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"

	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")
	//---if sendObjString---
	var sendObj=sendXML.documentElement.firstChild

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../../DrawingLibrary/'+folder+'/ArrowDefs.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement
	xmlDoc.appendChild(sendObj)
	myXML.save(myMap)

	Response.Write("OK")

%>