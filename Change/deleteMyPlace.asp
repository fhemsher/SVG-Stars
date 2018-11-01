<%@  Language=jScript%>
<%

Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"
function getNodeFolder(doc,folder)
{
   var n= doc.childNodes.length
	for(var z=0;z<n;z++)
	{
		var elemFolder=doc.childNodes.item(z).getAttribute("folder")
		if(elemFolder==folder)
		{
			return doc.childNodes.item(z)
			break
		}
	}
}
	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")

	var ownerXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/zyKi33753Yam181941DaNAPAIgeLj/communityOwners.xml'
	var ownerMap=Server.MapPath(xmlFile)
	ownerXML.load(ownerMap)
	var ownerDoc=ownerXML.documentElement

	var deleteMe=getNodeFolder(ownerDoc,folder)
    if(deleteMe)
	ownerDoc.removeChild(deleteMe)
	ownerXML.save(ownerMap)


    //---clear all this folder friends---
    var userXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/zyKi33753Yam181941DaNAPAIgeLj/communityUsers.xml'
	var userMap=Server.MapPath(xmlFile)
	userXML.load(userMap)
	var userDoc=userXML.documentElement
    var users=userDoc.childNodes
    var n=users.length;
	 for(var k=n-1;k>=0;k--)
     {
        var user=users.item(k)
        var myFolder=user.getAttribute("folder")
        if(myFolder==folder)
            userDoc.removeChild(user)
     }
	userXML.save(userMap)

   //---remove Personal Name---
           var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
        var xmlFile="../4ME/4MeNames.xml"
        var myMap=Server.MapPath(xmlFile)
        myXML.load(myMap)
       
        var xmlDoc=myXML.documentElement
        var deleteMe=getNodeFolder(xmlDoc,folder)
    if(deleteMe)
	    xmlDoc.removeChild(deleteMe)
         myXML.save(myMap)

	//---delete folder---
    	var folderMap=Server.MapPath("../Communities/"+folder)

	var FSO = Server.CreateObject("Scripting.FileSystemObject");
		FSO.DeleteFolder(folderMap);
		FSO = null;

	Response.Write("OK")

%>