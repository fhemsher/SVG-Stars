<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"

	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var folder=sendXML.documentElement.getAttribute("folder")
	var idIndex=sendXML.documentElement.getAttribute("idIndex")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");

    if(idIndex!="path")
    {
    	var xmlFile='../Communities/'+folder+'/addElem.xml'
    	var myMap=Server.MapPath(xmlFile)

    	myXML.load(myMap)
    	var xmlDoc=myXML.documentElement
    	var elems=xmlDoc.childNodes
        for(var k=elems.length-1;k>=0;k--)
    	{
    		var id=elems.item(k).getAttribute("id")
    		if(id.indexOf(idIndex)!=-1)
         		 xmlDoc.removeChild(elems.item(k))
    	}
    }
    else
    {
    	var xmlFile='../Communities/'+folder+'/addPathxml'
    	var myMap=Server.MapPath(xmlFile)

    	myXML.load(myMap)
    	var xmlDoc=myXML.documentElement
    	var elems=xmlDoc.childNodes
        for(var k=elems.length-1;k>=0;k--)
    	{
    		var id=elems.item(k).getAttribute("id")
    		if(id.indexOf(idIndex)!=-1)
         		 xmlDoc.removeChild(elems.item(k))
    	}
    }
	myXML.save(myMap)


	if(idIndex=="overlayImage")
	{
       	//---remove images from OverlayImages Folder

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



	}

	Response.Write("OK")
  
%>