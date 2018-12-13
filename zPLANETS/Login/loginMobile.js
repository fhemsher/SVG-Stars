
function loginVisitorMobile(myFolder,placeName)
{
    PlaceNAME=placeName
    FOLDER= myFolder
      //---clear all vars---
     visitMobileCommunityDiv.style.visibility="hidden"

    symbolLegendLoad=false

     //---clear previous added elems, Also Symbols---
    var elems=domAddElemG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      domAddElemG.removeChild(elems.item(j))
	}
	 AddElemZoomUpdate=[]

    var elems=symbolG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      symbolG.removeChild(elems.item(j))
	}
	if(SymbolRegXMLDoc)
	{
	    var elems=SymbolRegXMLDoc.childNodes
	    for(var j=elems.length-1;j>=0;j--)
		{
	      SymbolRegXMLDoc.removeChild(elems.item(j))
		}
    }

            	var xml2File="../Communities/"+myFolder+"/CelestialBounds.xml"
				var load2XML = new XMLHttpRequest;
				load2XML.onload = callback2;
				load2XML.open("GET", xml2File, true);
				load2XML.send();
				function callback2()
				{
					//---responseText---
					var xmlString=load2XML.responseText

					//---DOMParser---
					var parser = new DOMParser();
				   XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
            //<celestialBounds    constellation="'+conValue+'"  celestialScale="'+View.k+'" celestialRotate="'+View.r+'"  boundries='+boundries+'"   />

                var centerSplit=XMLBounds.getAttribute("primaryStarCoords").split(",")
                 var crd1=parseFloat(centerSplit[0])
                 var crd2=parseFloat(centerSplit[1])
                 PrimaryStarCoords=[crd1,crd2]

            var con=XMLBounds.getAttribute("constellation")

            var viewK=XMLBounds.getAttribute("celestialScale")
            var viewR=XMLBounds.getAttribute("celestialRotate")
            var trans=XMLBounds.getAttribute("celestialTranslate")
            initMyStar(viewK,viewR,trans)    //---stars.js creates star graticule and this star projection

           getArrowDefs()//--preload for use in path end arrows---
             starMobileContainerDiv.style.display="block"


            getMyStars()
            loadMyPlantedSymbols()
            getMyRegisteredSymbols()
            loadAddedElems()
            loadAddedPaths()

            setTimeout(loadMyConstellationStars,5000)
                 setTimeout(getConBoundries,6000)
             //---provides projection on all elements zoom/rotate celestial sphere---
               MyStars=true   //--redraw()---
                setTimeout(starMobileRedraw,800)


                        placeNameDiv.innerHTML="<span  id=myPlaceNameSpan >"+PlaceNAME+"</span> "


               placeNameDiv.style.top="2px"
               placeNameDiv.style.color="green"
               zoomPresetDiv.style.visibility="visible"
               loginBgImg.style.visibility="hidden"

               loginButton.style.visibility="visible"
			}
}

//---fired via initMap or login select---
function loginToPlace()
{
//---clear all vars---
     loginMobileFrameDiv.style.visibility="hidden"

 symbolLegendLoad=false

     //---clear previous added elems, Also Symbols---
    var elems=domAddElemG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      domAddElemG.removeChild(elems.item(j))
	}
	 AddElemZoomUpdate=[]

    var elems=symbolG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      symbolG.removeChild(elems.item(j))
	}
	if(SymbolRegXMLDoc)
	{
	    var elems=SymbolRegXMLDoc.childNodes
	    for(var j=elems.length-1;j>=0;j--)
		{
	      SymbolRegXMLDoc.removeChild(elems.item(j))
		}
    }


   if(XMLActiveLoginArray.length==0)
   {
         //--GET all owners+users with cookie email
       if(oEMAIL)
       var cookieEmail=oEMAIL
       else
        var cookieEmail=uEMAIL
    		for(var k=0;k<XMLloginArray.length;k++)
    		{
    			var logMe=XMLloginArray[k]
    			var node=logMe.nodeName
    			if(node=="owner")
    			{
    				var ownerEmail=logMe.getAttribute("email")
    				 if(ownerEmail==cookieEmail)
    					XMLActiveLoginArray.push(logMe)
    			}
    			else if(node=="user")
    			{
    				var userEmail=logMe.getAttribute("email")
    			    if(userEmail==cookieEmail)
    				  	XMLActiveLoginArray.push(logMe)
    			}
    		}


		for(var j=0;j<XMLActiveLoginArray.length;j++)
		{
           var cw=loginMobileFrame.contentWindow

			var logSelect=XMLActiveLoginArray[j]
			var node=logSelect.nodeName

			var option=document.createElement("OPTION")
			var text=(j+1)+") "+xml2txt(logSelect.getAttribute("name"))

			option.text=text
			option.value=logSelect.getAttribute("id")
			cw.loginPlacesSelect.appendChild(option)
			if(logSelect.getAttribute("id")==ID)
			{
					cw.loginPlacesSelect.selectedIndex=j
					cw.loginPlaceIdValue.value=parent.ID
				if(node=="owner")
						cw.loginEmailValue.value=oEMAIL
				else if(node=="user")
						cw.loginEmailValue.value=uEMAIL
					cw.loginSelectDiv.style.visibility="visible"
					cw.loginSelectDiv.style.overflow=""
					cw.loginSelectDiv.style.height=""

			}

        }





     }



	  if(FOLDER)
	  {
        		var xml2File="../Communities/"+FOLDER+"/CelestialBounds.xml"
				var load2XML = new XMLHttpRequest;
				load2XML.onload = callback2;
				load2XML.open("GET", xml2File, true);
				load2XML.send();
				function callback2()
				{
					//---responseText---
					var xmlString=load2XML.responseText

					//---DOMParser---
					var parser = new DOMParser();
				   XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
            //<celestialBounds    constellation="'+conValue+'"  celestialScale="'+View.k+'" celestialRotate="'+View.r+'"  boundries='+boundries+'"   />

                var centerSplit=XMLBounds.getAttribute("primaryStarCoords").split(",")
                 var crd1=parseFloat(centerSplit[0])
                 var crd2=parseFloat(centerSplit[1])
                 PrimaryStarCoords=[crd1,crd2]

            var con=XMLBounds.getAttribute("constellation")

            var viewK=XMLBounds.getAttribute("celestialScale")
            var viewR=XMLBounds.getAttribute("celestialRotate")
            var trans=XMLBounds.getAttribute("celestialTranslate")
            initMyStar(viewK,viewR,trans)    //---stars.js creates star graticule and this star projection

           // getArrowDefs()//--preload for use in path end arrows---
             starMobileContainerDiv.style.display="block"


            getMyStars()
            loadMyPlantedSymbols()
            getMyRegisteredSymbols()
            loadAddedElems()
            loadAddedPaths()

            setTimeout(loadMyConstellationStars,5000)
                 setTimeout(getConBoundries,6000)
             //---provides projection on all elements zoom/rotate celestial sphere---
               MyStars=true   //--redraw()---
                setTimeout(starMobileRedraw,800)


              MobilePreview=false
               if(MobilePreview==false)
               {          placeNameDiv.innerHTML="<span  id=myPlaceNameSpan >"+PlaceNAME+"</span> "

        				 removeMobileCookies()

                          //---replace w/ new cookie---
                         CookieSetDate="@"+new Date().getTime()
                        setCookie("Mobile_Star_Folder"+CookieSetDate,FOLDER,180)
                        setCookie(FOLDER+"_Mobile_Star_Owner_NAME"+CookieSetDate,oNAME,180)
        				setCookie(FOLDER+"_Mobile_Star_Place_ID"+CookieSetDate,ID,180)
        				if(oEMAIL)
        					setCookie(FOLDER+"_Mobile_Star_Owner_EMAIL"+CookieSetDate,oEMAIL,180)
                        else
        				{
                         	setCookie(FOLDER+"_Mobile_Star_User_EMAIL"+CookieSetDate,uEMAIL,180)
                        }
                       			//---modify getting Started
                         setCookie(FOLDER+"_Mobile_Star_PlaceNAME"+CookieSetDate,PlaceNAME,180)
               }
               else
               {
                    placeNameDiv.innerHTML="<span  title='Symbol Legend' id=legendButton style='background-color:linen;border:2px solid #800020;border-radius:10px;padding:5px;font-size:90%;visibility:hidden;' onClick=legendButtonClicked()>Symbol Legend</span> <span  title='Click here to return to original view' id=myPlaceNameSpan onClick=placeHomeBounds() >"+PlaceNAME+"</span> <button title='Visit your communities' id=loginButton style='visibility:hidden;background-color:gainsboro;border:2px solid black;box-shadow: 4px 4px 4px #888888;-webkit-box-shadow:4px 4px 4px #888888;border-radius:10px;padding:5px;font-size:1px;' onClick=loginButtonClicked()>xx</button>"


               }
               placeNameDiv.style.top="2px"
               placeNameDiv.style.color="green"
               zoomPresetDiv.style.visibility="visible"
               loginBgImg.style.visibility="hidden"
               if(XMLActiveLoginArray.length>0)
               loginButton.style.visibility="visible"
			}
		}
        else
			loginUserToPlace()

}

function loginUserToPlace()
{
     var cw=document.getElementById("loginMobileFrame").contentWindow
     var placeID=cw.loginPlaceIdValue.value
     var logEmail=cw.loginEmailValue.value
     cw.sentLoginSpan.innerText=""


   if(XMLActiveLoginArray.length==0)
   {

    		for(var k=0;k<XMLloginArray.length;k++)
    		{
    			var logMe=XMLloginArray[k]
    			var node=logMe.nodeName

    			if(node=="owner")
    			{
    				var ownerEmail=logMe.getAttribute("email")
    				 if(ownerEmail==logEmail)
    					XMLActiveLoginArray.push(logMe)
    			}
    			else if(node=="user")
    			{
    				var userEmail=logMe.getAttribute("email")
    			    if(userEmail==logEmail)
    				  	XMLActiveLoginArray.push(logMe)
    			}
    		}

    		for(var j=0;j<XMLActiveLoginArray.length;j++)
    		{
    			var logSelect=XMLActiveLoginArray[j]
    			var node=logSelect.nodeName

    			var option=document.createElement("OPTION")
    			var text=(j+1)+") "+xml2txt(logSelect.getAttribute("name"))

    			option.text=text
    			option.value=logSelect.getAttribute("id")
    			cw.loginPlacesSelect.appendChild(option)
    			if(logSelect.getAttribute("id")==placeID)
    			{
    				cw.loginPlacesSelect.selectedIndex=j
                   FOLDER=logSelect.getAttribute("folder")
                   ID=logSelect.getAttribute("id")
                   if(node=="owner")
                   {
                   oEMAIL=logSelect.getAttribute("email")
                   uEMAIL=null
                   }
                   else
                   {
                    uEMAIL=logSelect.getAttribute("email")
                    oEMAIL=logSelect.getAttribute("ownerEmail")
                   }
                   oNAME=logSelect.getAttribute("ownerName")
                  PlaceNAME=xml2txt(logSelect.getAttribute("name"))


    			}
    		}
            if(XMLActiveLoginArray.length>0)
            {
               cw.loginSelectDiv.style.visibility="visible"
    				cw.loginSelectDiv.style.overflow=""
    				cw.loginSelectDiv.style.height=""
            }

               loginMobileFrameDiv.style.zIndex=""

     }

     if(FOLDER)
        loginToPlace()
     else
     cw.sentLoginSpan.innerText="Not Found!"

}
