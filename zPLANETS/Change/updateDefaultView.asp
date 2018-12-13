<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"


	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)
	var folder=sendXML.documentElement.getAttribute("folder")
	var planetScale=sendXML.documentElement.getAttribute("planetScale")
	var planetTranslate=sendXML.documentElement.getAttribute("planetTranslate")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../DrawingLibrary/'+folder+'/PlanetBounds.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement

	xmlDoc.setAttribute("planetScale",planetScale)
	xmlDoc.setAttribute("planetTranslate",planetTranslate)


    myXML.save(myMap)

  	Response.Write("OK")




%>