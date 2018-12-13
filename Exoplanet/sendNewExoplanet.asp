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


function getNodeAttr(doc,attr,match)
{
	var q= doc.childNodes.length
	for(var z=0;z<q;z++)
	{
		elemAttr=doc.childNodes.item(z).getAttribute(attr)
		if(elemAttr==match)
		{
			return doc.childNodes.item(z)
			break
		}
	}
}
// var myZZ=getNodeAttr(xxXmlDoc,zzAttr,zzMatch)

	var sendXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var sendObj=sendXML.documentElement


	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Exoplanet/Exoplanets.xml'
	var myMap=Server.MapPath(xmlFile)
	myXML.load(myMap)
	var xmlDoc=myXML.documentElement
    var exos=xmlDoc.childNodes
    //---chck for duplicate name---
    var dup=false

    var newName=sendObj.getAttribute("name").toLowerCase()
    newName=newName.replace(/ /g,"")
    newName=newName.replace(/-/g,"")
    for(var k=0;k<exos.length;k++)
    {
      var exoName=exos.item(k).getAttribute("name").toLowerCase()
           exoName=exoName.replace(/ /g,"")
             exoName=exoName.replace(/-/g,"")
       if(newName==exoName)
       {
           dup=true
           break;
       }

    }

    if(dup==false)
    {
        xmlDoc.appendChild(sendObj)
        myXML.save(myMap)
        Response.Write("OK")

    }
    else
      Response.Write("dup")


%>