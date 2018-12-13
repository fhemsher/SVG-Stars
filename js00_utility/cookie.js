 function setCookie(c_name,value,exdays)
 {
	 var exdate=new Date();
	 exdate.setDate(exdate.getDate() + exdays);
	 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	 document.cookie=c_name + "=" + c_value;

 }

function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
	 	c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
	 	c_value = null;
	}
	else
	{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)
		{
		 	c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}
function printCookies(){

	cStr = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
  console.log(pCOOKIES.length)
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();

		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0]){
		    console.log(NmeVal[0] + '=' + unescape(NmeVal[1]) );
		}
	}





}

function deleteAllStarCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
        if(cookie.indexOf("_SVGStars_")!=-1)
        {
        	var eqPos = cookie.indexOf("=");
        	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

/*
	var cookieSetDate="@"+new Date().getTime()
	setCookie(FOLDER+"_Place_ID"+cookieSetDate,ID,180)
	***not needed???setCookie(FOLDER+"_Owner_UID"+cookieSetDate,cw.placeUidValue.value,180)
	setCookie(FOLDER+"_Owner_EMAIL"+cookieSetDate,cw.placeEmailValue.value,180)
	setCookie("_Place_Folder"+cookieSetDate,FOLDER,180)

*/

//---ON UNLOAD ---
function setExitCookie()
{
      if(FOLDER && oEMAIL)
      {     var lastLoginMS= mostRecentCookie()


        if(lastLoginMS!=0)
        {     var cookieFolder = getCookie("_SVGStars_Folder@"+lastLoginMS)
            setCookie(cookieFolder+"_SVGStars_DrawingName@"+lastLoginMS, "", -1)
            setCookie(cookieFolder+"_SVGStars_PlaceDescription@"+lastLoginMS, "", -1)
            setCookie(cookieFolder+"_SVGStars_ID@"+lastLoginMS, "", -1)
            setCookie(cookieFolder+"_SVGStars_Owner_NAME@"+lastLoginMS, "", -1)
            setCookie(cookieFolder+"_SVGStars_Owner_EMAIL@"+lastLoginMS, "", -1)
            setCookie(cookieFolder+"_SVGStars_User_EMAIL@"+lastLoginMS, "", -1)
            setCookie("_SVGStars_Folder@"+lastLoginMS, "", -1)
        }


    }
}

var PrevCookieDate=0
//---if date=0, no cookies---
function mostRecentCookie(){
   var date=0
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++)
	{
	    if(pCOOKIES[bb].indexOf("Mobile")==-1&&pCOOKIES[bb].indexOf("_SVGStars_")!=-1)
        {
    		NmeVal  = new Array();
    		NmeVal  = pCOOKIES[bb].split('=');
    		if(NmeVal[0])
    		{
                var utcms=parseInt(NmeVal[0].split("@")[1],10)
                if(utcms>date)
    				date=utcms
    		}
        }
	}
  return date  //---PrevCookieDate---
}

/*--at next setcookies: remove the 3 cookies with the date equal setDate---

*/
function removeStarFolderCookies()
{


pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++)
	{
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0])
		{  var utcms=NmeVal[0].split("@")[1]
           var folderCookie="_SVGStars_Folder@"+utcms
           if(folderCookie==NmeVal[0])
		   {
              	var folder=NmeVal[1]

                  	dCOOKIES = new Array();
					dCOOKIES = document.cookie.split('; ');
					for(dd = 0; dd < dCOOKIES.length; dd++)
					{
						dNmeVal  = new Array();
						dNmeVal  = dCOOKIES[dd].split('=');
						if(dNmeVal[0])
						{
                           setCookie(folder+"_SVGStars_PlaceNAME@"+utcms,"",-1)
                           setCookie(folder+"_SVGStars_PlaceDescription@"+utcms,"",-1)
                           setCookie(folder+"_SVGStars_ID@"+utcms,"",-1)
		                 	setCookie(folder+"_SVGStars_Owner_NAME@"+utcms,"",-1)
							setCookie(folder+"_SVGStars_Owner_EMAIL@"+utcms,"",-1)
							setCookie(folder+"_SVGStars_User_EMAIL@"+utcms,"",-1)
							setCookie("_SVGStars_Folder@"+utcms,"",-1)
						}
					}
			}
		}
	}


}

//---if date=0, no cookies---
function mostRecentMobileCookie(){
   var date=0
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++)
	{
	    if(pCOOKIES[bb].indexOf("Mobile")!=-1)
        {
    		NmeVal  = new Array();
    		NmeVal  = pCOOKIES[bb].split('=');
    		if(NmeVal[0])
    		{
                var utcms=parseInt(NmeVal[0].split("@")[1],10)
                if(utcms>date)
    				date=utcms
    		}
        }
	}
  return date  //---PrevCookieDate---
}

function removeMobileCookies()
{
 	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++)
	{
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0])
		{  var utcms=NmeVal[0].split("@")[1]

           var folderCookie="Mobile_SVGStars_Folder@"+utcms
           if(folderCookie==NmeVal[0])
		   {
              	var folder=NmeVal[1]
                  	dCOOKIES = new Array();
					dCOOKIES = document.cookie.split('; ');
					for(dd = 0; dd < dCOOKIES.length; dd++)
					{
						dNmeVal  = new Array();
						dNmeVal  = dCOOKIES[dd].split('=');
						if(dNmeVal[0])
						{
						    setCookie(folder+"_Mobile_SVGStars_Owner_NAME@"+utcms,"",-1)
						     setCookie(folder+"_Mobile_SVGStars_Owner_EMAIL@"+utcms,"",-1)
                              setCookie(folder+"_Mobile_SVGStars_Place_ID@"+utcms,"",-1)
                              setCookie(folder+"_Mobile_SVGStars_PlaceNAME@"+utcms,"",-1)
                              setCookie(folder+"_Mobile_SVGStars_User_EMAIL@"+utcms,"",-1)

                              setCookie("Mobile_SVGStars_Folder@"+utcms,"",-1)

						}
					}
			}
		}
	}
}

/*---site cookies---
cookie:admin@www.uuglemap.com
cookie:admin@www.svgdiscovery.com
Authorization=Verified;mjNk85CgNOY_User_UID=fhemsher; mjNk85CgNOY_User_Email=fhemsher@gmail.com; mjNk85CgNOY_User_Folder=mjNk85CgNOY; mjNk85CgNOY_Owner_UID=fhemsher; mjNk85CgNOY_Owner_Email=fhemsher@gmail.com; wfPfVjux5A_Owner_UID=fhemsher; wfPfVjux5A_Owner_Email=fhemsher@gmail.com; b4U6vWGOJxk_User_UID=ffff; b4U6vWGOJxk_User_Email=ffff; b4U6vWGOJxk_User_Folder=b4U6vWGOJxk; h0nPmfG4NgQ_User_UID=fff; h0nPmfG4NgQ_User_Email=ff; h0nPmfG4NgQ_User_Folder=h0nPmfG4NgQ; Owner_Folder=xqDFrARpgc; whQDXzpvy5E_Owner_UID=gemstone; whQDXzpvy5E_Owner_Email=fhemsher@gmail.com; g3G1HIOPJDOy5JIW_Owner_UID=phoneHome; g3G1HIOPJDOy5JIW_Owner_Email=fhemsher@gmail.com; 97Md6x6RYwk7tYS5_Owner_UID=orchidMaster; 97Md6x6RYwk7tYS5_Owner_Email=fhemsher@gmail.com; xqDFrARpgc_Owner_UID=caveMan; xqDFrARpgc_Owner_Email=fhemsher@gmail.com; fTwDk3m7TGI_User_UID=fh; fTwDk3m7TGI_User_Email=test; fTwDk3m7TGI_User_Folder=fTwDk3m7TGI; Authorization=Verified; SICloud01=7dfd35730199804c4331182e0bc6f2c9ff70cbc9b28bf23a63275ede09e5193d
*/