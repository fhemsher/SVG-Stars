<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"
function getNodeId(doc,id)
{
   var n= doc.childNodes.length
	for(var z=0;z<n;z++)
	{
		var elemId=doc.childNodes.item(z).getAttribute("id")
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
	var deleteId=sendXML.documentElement.getAttribute("deleteId")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../../DrawingLibrary/'+folder+'/addElem.xml'
	var myMap=Server.MapPath(xmlFile)
	myXML.load(myMap)
	var xmlDoc=myXML.documentElement

	var deleteMe=getNodeId(xmlDoc,deleteId)
	xmlDoc.removeChild(deleteMe)
	myXML.save(myMap)
	//---update posts for this community---
 function updatePosts(doc,folder)
{
   var n= doc.childNodes.length
	for(var z=0;z<n;z++)
	{
		var elemFolder=doc.childNodes.item(z).getAttribute("folder")
		if(elemFolder==folder)
		{
			var posts=parseInt(doc.childNodes.item(z).getAttribute("posts"),10)+1
            doc.childNodes.item(z).setAttribute("posts")=posts
			var lastPost=new Date().getTime() //---this file called;  milliseconds---
             doc.childNodes.item(z).setAttribute("lastPost")=lastPost
			ownersXML.save(xmlMap)
			break
		}
	}
}
 var ownersXML =Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../../DrawingLibrary/zyKi33753Yam181941DaNAPAIgeLj/drawingOwners.xml'
	var xmlMap=Server.MapPath(xmlFile)
	ownersXML.load(xmlMap)
    updatePosts(ownersXML.documentElement,folder)
	Response.Write("OK")


%>