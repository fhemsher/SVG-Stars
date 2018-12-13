<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"


	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/'+folder+'/RegisteredSymbols.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement
    var elems=xmlDoc.childNodes
    for(var k=elems.length-1;k>=0;k--)
	{
     	xmlDoc.removeChild(elems.item(k))
	}

	myXML.save(myMap)

   





	Response.Write("OK")
  
%>