function loginClearAll()
{

    //---clear all vars---
     Visitor=false
    gettingStartedLoad = false
    addElemIconLoad = false
    addElemCircleLoad = false
    addElemRectLoad = false
    addElemImageLoad = false
    addElemTextLoad = false
    addElemPathLoad = false
    addElemPathEditLoad = false
    addElemPolygonLoad = false
    addElemPgonLoad = false
    DefaultViewChanged=false



    PrimaryStarZone.attr("d", null)
    PrimaryStarCorona.attr("d", null)
    PrimaryStarSurface.attr("d", null)


        //---clear stars and boundry--
        var elems = hostStarG.childNodes
        for(var j = elems.length-1; j>=0; j--)
    {
    hostStarG.removeChild(elems.item(j))
    }


           var elems = domPlanetG.childNodes
        for(var j = elems.length-1; j>=0; j--)
    {
        domPlanetG.removeChild(elems.item(j))
    }
        var elems = orbitG.childNodes
        for(var j = elems.length-1; j>=0; j--)
    {
        orbitG.removeChild(elems.item(j))
    }
      PlanetsLoaded=false
     PlanetCoordsArray=[]



    var elems = domAddPathG.childNodes
    for(var j = elems.length-1; j>=0; j--)
    {
        domAddPathG.removeChild(elems.item(j))
    }

    //---clear previous added elems, Also Symbols---
    var elems = domAddElemG.childNodes
    for(var j = elems.length-1; j>=0; j--)
    {
        domAddElemG.removeChild(elems.item(j))
    }




     for(var k=exoplanetG.childNodes.length-1;k>=0;k--)
        exoplanetG.removeChild(exoplanetG.childNodes.item(k))

    beginTitle.style.visibility = "hidden"
     OwnerDrawing=false
}

//---fired via initMap or login select---
function loginToDrawing()
{
    loginClearAll()

    if(XMLActiveLoginArray.length==0)
    {
        //--GET all owners+users with cookie email
        if(oEMAIL)
            var cookieEmail = oEMAIL
            else
                var cookieEmail = uEMAIL
                for(var k = 0; k<XMLloginArray.length; k++)
            {
                var logMe = XMLloginArray[k]
                var node = logMe.nodeName
                if(node=="owner")
                {
                    var ownerEmail = logMe.getAttribute("email")
                    if(ownerEmail==cookieEmail)
                        XMLActiveLoginArray.push(logMe)
                }

            }
    }



    if(FOLDER)
    {
        //----defaultBounds----
       var xml3File = "../DrawingLibrary/"+FOLDER+"/DefaultBounds.xml"
        var load3XML = new XMLHttpRequest;
        load3XML.onload = callback3;
        load3XML.open("GET", xml3File, true);
        load3XML.send();
        function callback3()
        {
             var xmlString = load3XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLDefaultBounds = parser.parseFromString(xmlString, "text/xml").documentElement;

         }
        var xml2File = "../DrawingLibrary/"+FOLDER+"/CelestialBounds.xml"
        var load2XML = new XMLHttpRequest;
        load2XML.onload = callback2;
        load2XML.open("GET", xml2File, true);
        load2XML.send();
        function callback2()
        {
            //---responseText---
            var xmlString = load2XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
            //<celestialBounds    constellation="'+conValue+'"  celestialScale="'+View.k+'" celestialRotate="'+View.r+'"  boundries='+boundries+'"   />

            var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
            var crd1 = parseFloat(centerSplit[0])
            var crd2 = parseFloat(centerSplit[1])
            PrimaryStarCoords =[crd1, crd2]

            var con = XMLBounds.getAttribute("constellation")


            var initStarView = XMLBounds.getAttribute("initStarDwg")
            var viewK = XMLBounds.getAttribute("celestialScale")
            var viewR = XMLBounds.getAttribute("celestialRotate")
            var trans = XMLBounds.getAttribute("celestialTranslate")



                initStarDwg(viewK, viewR, trans) //---stars.js creates star graticule and this star projection



               // goToDwgView(viewK, viewR, trans)  //---owner set view----
            getArrowDefs()//--preload for use in path end arrows---
            getMyStars()
            celestialContainerDiv.style.display = "none"
            starContainerDiv.style.display = "block"

           if(initStarView=="false")
           {
              PlanetScale=+XMLBounds.getAttribute("planetScale")
               setTimeout(locatePlanets,1800)


           }

           // loadAddedPaths()
           // getAddedStarData()
            //---provides projection on all elements zoom/rotate celestial sphere---
            MyStars = true //--redraw()---
            StopStarZoom = false



            zoomLevelDiv.innerHTML = "&nbsp;"



                //---loaded at initMap---

               // DrawingNAME = hiddenDrawingNameValue.value
                DrawingDescription = hiddenDrawingDescriptionValue.value
                SelectedStarName = hiddenDrawingNameValue.value


            hiddenConValue.value=con
            drawingNameDiv.innerHTML = "<span id=myDrawingNameSpan >"+SelectedStarName+" ("+con+")</span> <span style='color:green;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+oEMAIL+"?subject=SVG-Stars%20Drawing:%20"+SelectedStarName.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Star Map owner'  > "+oNAME +"</a></span>"
            drawingDescriptionDiv.innerHTML = DrawingDescription
            drawingDescriptionDiv.style.visibility = "visible"
            drawingNameDiv.style.visibility = "visible"
            if(Mobile==false)
             measureDiv.style.visibility = "visible"
            
            navTable.style.visibility = "visible"
           zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

             navButtonViz()

           

            if(FOLDER)
            {  deleteAllCookies()
                CookieSetDate = "@"+new Date().getTime()
                setCookie("_SVGStars_Folder"+CookieSetDate, FOLDER, 180)
                setCookie(FOLDER+"_SVGStars_DrawingNAME"+CookieSetDate, SelectedStarName, 180)
                setCookie(FOLDER+"_SVGStars_DrawingDescription"+CookieSetDate, DrawingDescription, 180)
                setCookie(FOLDER+"_SVGStars_Owner_NAME"+CookieSetDate, oNAME, 180)
                setCookie(FOLDER+"_SVGStars_ID"+CookieSetDate, ID, 180)
                if(oEMAIL)
                    setCookie(FOLDER+"_SVGStars_Owner_EMAIL"+CookieSetDate, oEMAIL, 180)
                 openOwnerDrawingsButton.disabled=false
                    openOwnerDrawingsButton.style.opacity=1

            }



        }
       if(Mobile==true)
       {
          topNavDiv.style.visibility="hidden"
          svgStarsDiv.style.display="none"
          openVisitButton.style.visibility="visible"
            measureDiv.style.visibility="hidden"
       }

    }


}




