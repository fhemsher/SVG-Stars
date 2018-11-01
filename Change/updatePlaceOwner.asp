<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"

function getNodePlace(doc,folder,placeId)
{
   var n= doc.childNodes.length
	for(var z=0;z<n;z++)
	{
		var elemFolder=doc.childNodes.item(z).getAttribute("folder")
		var myId=doc.childNodes.item(z).getAttribute("id")
		if(elemFolder==folder && myId==placeId)
		{
			return doc.childNodes.item(z)
			break
		}
	}
}
	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")
	var placeId=sendXML.documentElement.getAttribute("placeId")
	var placeName=sendXML.documentElement.getAttribute("placeName")
	var placeDescription=sendXML.documentElement.getAttribute("placeDescription")
    var visitOnly=sendXML.documentElement.getAttribute("visitOnly")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/zyKi33753Yam181941DaNAPAIgeLj/communityOwners.xml'
	var myMap=Server.MapPath(xmlFile)


	myXML.load(myMap)
	var xmlDoc=myXML.documentElement

	var updateMe=getNodePlace(xmlDoc,folder,placeId)
    if(visitOnly)
	    updateMe.setAttribute("visitOnly","true")
    else
        updateMe.removeAttribute("visitOnly")

	updateMe.setAttribute("name",placeName)
	updateMe.setAttribute("description",placeDescription)
	myXML.save(myMap)


	Response.Write("OK")



%>
