<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"

    var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
    sendXML.load(Request)

    var folder=sendXML.documentElement.getAttribute("folder")
     var FSO = Server.CreateObject("Scripting.FileSystemObject");
    var mapFolder=Server.MapPath("../DrawingLibrary/"+folder)
 	var newfolder=FSO.DeleteFolder(mapFolder);
    	delete FSO;
    FSO = null;


 var ownersXML =Server.CreateObject("Msxml2.DOMDocument.6.0");
    var xmlFile='../DrawingLibrary/zyKi33753Yam181941DaNAPAIgeLj/drawingOwners.xml'
    var xmlMap=Server.MapPath(xmlFile)
    ownersXML.load(xmlMap)
    var doc=ownersXML.documentElement
    for(var k=doc.childNodes.length-1;k>=0;k--)
    {
      var elem=doc.childNodes.item(k)
      if(elem.getAttribute("folder")==folder)
      {

        doc.removeChild(elem)
         ownersXML.save(xmlMap)
         Response.Write("OK")
          break
      }
    }



%>