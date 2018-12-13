<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"


	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")


	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/'+folder+'/addElem.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement
   var elems=xmlDoc.childNodes
    for(var k=elems.length-1;k>=0;k--)
	{

     		 xmlDoc.removeChild(elems.item(k))
	}

	myXML.save(myMap)

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/'+folder+'/addPath.xml'
	var myMap=Server.MapPath(xmlFile)

	myXML.load(myMap)
	var xmlDoc=myXML.documentElement
   var elems=xmlDoc.childNodes
    for(var k=elems.length-1;k>=0;k--)
	{

     		 xmlDoc.removeChild(elems.item(k))
	}

	myXML.save(myMap)


	//---remove images from OverlayImages Folder---

		var imgMap=Server.MapPath("../Communities/"+folder+"/OverlayImages")
		var FSO = Server.CreateObject("Scripting.FileSystemObject");
	    f = FSO.GetFolder(imgMap);
	    fc = new Enumerator(f.Files);
	    for (; !fc.atEnd(); fc.moveNext())
	    {
	        var file = fc.item();
	         FSO.deleteFile(file, true);
		}

       delete FSO;
		FSO = null;

	Response.Write("OK")
  
%>