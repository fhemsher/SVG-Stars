
<%@ Language=jScript %>
<%


// into a text or textarea...exactly as user plugged it in
function xml2txt(inputXml)
{
		var reAmp=/AMP/g
		var reQuote=/QUOTE/g
		var reApost=/APOST/g
		var reGT=/GT/g
		var reLT=/LT/g
   if(inputXml)
   {
		var inputXml1=inputXml.replace(reAmp,"&")
		var inputXml2=inputXml1.replace(reQuote,"\"")
		var inputXml3=inputXml2.replace(reApost,"'")
		var inputXml4=inputXml3.replace(reGT,">")
		var text=inputXml4.replace(reLT,"<")
	return text
	}
	else
	return "";

}


	var sendXML = new ActiveXObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var sendJoin=sendXML.documentElement

	var folder=sendJoin.getAttribute("folder")
	var communityID=sendJoin.getAttribute("communityID")
	var communityName=sendJoin.getAttribute("communityName")
	var communityDescription=sendJoin.getAttribute("communityDescription")
	var ownerName=sendJoin.getAttribute("ownerName")
	var userEmail=sendJoin.getAttribute("userEmail")
	var ownerEmail=sendJoin.getAttribute("ownerEmail")

	var myXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
	var xmlFile='../Communities/zyKi33753Yam181941DaNAPAIgeLj/communityUsers.xml' //---all users in a single file---
	var userMap=Server.MapPath(xmlFile)

	myXML.load(userMap)
	var xmlDoc=myXML.documentElement

//---valid ID---??
function getNodeAttr(doc,attr,match)
{
    var found=false
	var q= doc.childNodes.length
	for(var z=0;z<q;z++)
	{
		elemAttr=doc.childNodes.item(z).getAttribute(attr)
		if(elemAttr==match)
		{
			found=true
			break
		}
	}
    return found
}
//---already a member??---
function currentMember()
{
    var alreadyMember=false
	var q= xmlDoc.childNodes.length
	for(var z=0;z<q;z++)
	{
		elemId=xmlDoc.childNodes.item(z).getAttribute("id")
		elemEmail=xmlDoc.childNodes.item(z).getAttribute("email")
		if(elemId==communityID&& (elemEmail==userEmail || userEmail==ownerEmail))
		{
           alreadyMember=true
			break
		}
	}
    return alreadyMember
}

 var ownerXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
        var xmlFile='../Communities/zyKi33753Yam181941DaNAPAIgeLj/communityOwners.xml' //---all users in a single file---
        var myMap=Server.MapPath(xmlFile)
        	ownerXML.load(myMap)
           	var xmlOwnerDoc=ownerXML.documentElement

var validId=getNodeAttr(xmlOwnerDoc,"id",communityID)
if(validId)
{
    var alreadyUser=currentMember()
     if(!alreadyUser)
     {
        var user=myXML.createElement("user")
        user.setAttribute("email",userEmail)
        user.setAttribute("ownerEmail",ownerEmail)
        user.setAttribute("id",communityID)
        user.setAttribute("folder",folder)
        user.setAttribute("ownerName",ownerName)
        user.setAttribute("name",communityName)
        user.setAttribute("description",communityDescription)
    	var joinMs=new Date().getTime()
        user.setAttribute("dateJoined",joinMs)
        user.setAttribute("posts",0)

    	xmlDoc.appendChild(user)
    	myXML.save(userMap)
        //---update users count---

        	var q=xmlOwnerDoc.childNodes.length
        	for(var z=0;z<q;z++)
        	{
        	   myFolder=xmlOwnerDoc.childNodes.item(z).getAttribute("folder")
        		if(myFolder==folder)
        		{
                   var users=parseInt(xmlOwnerDoc.childNodes.item(z).getAttribute("users"),10)+1
        			xmlOwnerDoc.childNodes.item(z).setAttribute("users",users)
                    ownerXML.save(myMap)
                    break
        		}
        	}
       /*
            var myMail=Server.CreateObject("CDO.Message")

            myMail.Subject="Emerald Map Community - Joined: "+xml2txt(communityName)
            myMail.From="admin@emeraldMap.com"
            myMail.To=userEmail
            myMail.HTMLBody = "The Community ID for this community is: <b>"+communityID+"</b>

            myMail.Configuration.Fields.item("http://schemas.microsoft.com/cdo/configuration/sendusing")=2
            myMail.Configuration.Fields.item("http://schemas.microsoft.com/cdo/configuration/smtpserver")="mail.emeraldmap.com"
            myMail.Configuration.Fields.item("http://schemas.microsoft.com/cdo/configuration/smtpserverport")=25
            myMail.Configuration.Fields.item("http://schemas.microsoft.com/cdo/configuration/sendusername") ="admin@emeraldmap.com"
            myMail.Configuration.Fields.item("http://schemas.microsoft.com/cdo/configuration/sendpassword") ="ki33753"
            myMail.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1
            myMail.Configuration.Fields.Update()

        	myMail.Send()
         */
        Response.Write("OK")
    }
    else
     Response.Write("alreadyUser")
}
else
   Response.Write("invalidId")

%>
