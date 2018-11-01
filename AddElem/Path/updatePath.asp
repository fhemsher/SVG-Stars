<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"
function getNodeId(doc,id)
{
	n= doc.childNodes.length
	for(var z=0;z<n;z++)
	{
		elemId=doc.childNodes.item(z).getAttribute("id")
		if(elemId==id)
		{
			return doc.childNodes.item(z)
			break
		}
	}
}


	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")
	var id=sendXML.documentElement.getAttribute("editId")
	//---if sendObjString---
	var sendObj=sendXML.documentElement.firstChild
      var timelineLastValue=sendObj.getAttribute("timelineLastValue")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../../DrawingLibrary/'+folder+'/addPath.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement

	var replaceMe=getNodeId(xmlDoc,id)

	xmlDoc.insertBefore(sendObj,replaceMe)
	xmlDoc.removeChild(replaceMe)
	myXML.save(myMap)


	Response.Write("OK")

%>