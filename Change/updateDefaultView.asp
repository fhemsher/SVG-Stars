<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"


	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)
	var folder=sendXML.documentElement.getAttribute("folder")

	var planetScale=sendXML.documentElement.getAttribute("planetScale")
	var celestialScale=sendXML.documentElement.getAttribute("celestialScale")
	var celestialRotate=sendXML.documentElement.getAttribute("celestialRotate")
    var celestialTranslate=sendXML.documentElement.getAttribute("celestialTranslate")


	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../DrawingLibrary/'+folder+'/CelestialBounds.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement


	xmlDoc.setAttribute("initStarDwg","false")
	xmlDoc.setAttribute("planetScale",planetScale)
	xmlDoc.setAttribute("celestialScale",celestialScale)
	xmlDoc.setAttribute("celestialRotate",celestialRotate)
	xmlDoc.setAttribute("celestialTranslate",celestialTranslate)
   

    myXML.save(myMap)

  	Response.Write("OK")




%>