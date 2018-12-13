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


     OwnerDrawing=false
}

//---fired via initMap or login select---
function loginToDrawing()
{
    loginClearAll()

     console.log(FOLDER)



    if(FOLDER)
    {

       var xml3File = "../DrawingLibrary/"+FOLDER+"/Planet.xml"
        var load3XML = new XMLHttpRequest;
        load3XML.onload = callback3;
        load3XML.open("GET", xml3File, true);
        load3XML.send();
        function callback3()
        {
             var xmlString = load3XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            var planetXML = parser.parseFromString(xmlString, "text/xml").documentElement;



            var cookieSetDate = "@"+new Date().getTime()


                    setCookie("_SVGPlanets_Folder"+cookieSetDate,FOLDER,180)
                    setCookie(FOLDER+"_SVGPlanets_Owner_NAME"+cookieSetDate,oNAME,180)
    				setCookie(FOLDER+"_SVGPlanets_ID"+cookieSetDate,ID,180)
                    setCookie(FOLDER+"_SVGPlanets_Owner_EMAIL"+cookieSetDate,oEMAIL,180)
                    setCookie(FOLDER+"_SVGPlanets_DrawingNAME"+cookieSetDate,DrawingNAME,180)
                    setCookie(FOLDER+"_SVGPlanets_DrawingDescription"+cookieSetDate,DrawingDescription,180)

                   startCursorLoc()
                   zoomLevelDiv.innerHTML=(PlanetView.k).toFixed(0)
                    //loginToDrawing()
                    RegisterOK = true

                    ownerSelectSpan.style.visibility = "visible"

                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:black;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+oEMAIL+"?subject=SVG-Stars%20Drawing:%20"+SelectedPlanetName.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Planet Map owner'  > "+oNAME +"</a></span>"
                    drawingDescriptionDiv.innerHTML = DrawingDescription+'<br><a style=font-size:80% title="See data table for this planet" href=javascript:showPlanetData()>Planet Data</a>'
                    PlanetRadius=SelectedPlanetJSON.P_Radius//--in EU---
                    diaSpan.innerHTML=numberWithCommas((2*6371*PlanetRadius).toFixed(0))+" KM"
                    measureDiv.style.visibility="visible"
                    drawingNameDiv.style.visibility="visible"
                    drawingDescriptionDiv.style.visibility="visible"
                    saveDrawingButtonDiv.style.visibility="visible"


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





