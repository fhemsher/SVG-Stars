
//--- Begin/OK Star button---
var SelectedPlanetXML  //---show planetData see:startPlanet.htm----
function sendDrawingRegistration()
{



    var cw=beginCw

        cw.sentRegistrationSpan.innerHTML="&nbsp;"
        var errorMsg=""
        if(cw.drawingEmailValue.value==""||cw.drawingEmailValue.value.indexOf("@")==-1)
            errorMsg+="Include Email "
        if(cw.ownerNameValue.value.length <2)
            errorMsg+="Include User Name "
        if(cw.drawingDescriptionValue.value.length <10)
            errorMsg+="Include Description"
        if(errorMsg!="")
            cw.sentRegistrationSpan.innerHTML=errorMsg
        else
        {



            hiddenDrawingNameValue.value = SelectedStarName
            hiddenDrawingDescriptionValue.value = cw.drawingDescriptionValue.value

            var reSp = / /g
            cw.drawingEmailValue.value = cw.drawingEmailValue.value.replace(reSp, "")

            var drawingName = SelectedPlanetName
            var drawingDescription = txt2xml(cw.drawingDescriptionValue.value)
            var drawingEmail = txt2xml(cw.drawingEmailValue.value)
            var ownerName = txt2xml(cw.ownerNameValue.value)


            var register = "<register  email=\""+drawingEmail+"\"  ownerName=\""+ownerName+"\"   name=\""+drawingName+"\"  description=\""+drawingDescription+"\" />"


             var exoXML = JSON.stringify(SelectedPlanetJSON)
            exoXML = exoXML.replace(/:/g, "=")
            exoXML = exoXML.replace(/,/g, " ")
            exoXML = exoXML.replace(/\{/, "")
            exoXML = exoXML.replace(/\}/, "")
            exoXML = exoXML.replace(/\"S_/g, "Host")
            exoXML = exoXML.replace(/\"P_/g, "")
            exoXML = exoXML.replace(/\"\=/g, "=")



            var planetXML = "<EXO id='exoplanet"+(new Date().getTime())+"' "+exoXML+" />"
              //---show planetData see:startPlanet.htm----
                     var parser = new DOMParser();
                SelectedPlanetXML = parser.parseFromString(planetXML, "text/xml").documentElement;



            var bounds="<bounds   planetScale=\""+PlanetProjection.scale()+"\"  planetTranslate=\""+PlanetProjection.translate()+"\" />"

            var sendXML = "<SEND>" +register+planetXML+bounds+"</SEND>"


                var XMLFile = new XMLHttpRequest();
                XMLFile.open("POST", "RegisterDrawing/sendDrawingRegistration.asp", false);
                XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                XMLFile.send(sendXML);
                if(XMLFile.responseText.length<50) //--no errors---
                {

                    BeginPlanet=true

                    var cw=beginCw
                    FOLDER = XMLFile.responseText
                    oEMAIL = cw.drawingEmailValue.value
                    oNAME = cw.ownerNameValue.value
                    uEMAIL = null
                    DrawingNAME=SelectedPlanetName



                    DrawingDescription=cw.drawingDescriptionValue.value

                    cw.planetSelect.selectedIndex=0
                    cw.planetNameSpan.innerHTML=""
                     topNavDiv.style.display="block"
                    closeIframe("begin")
                    navButtonViz()

                    ID = reverse(FOLDER.substring(5, 9)).toLowerCase()
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
                    loginClearAll()

                    ownerSelectSpan.style.visibility = "visible"

                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:black;font-family:verdana;font-size:12px'> Contact:<i style=color:blue;text-decoration:underline title='Send email to this drawing owner' onClick=openEmail() > "+oNAME+"</i></span>"
                    drawingDescriptionDiv.innerHTML = DrawingDescription+'<br><a style=font-size:80% title="See data table for this planet" href=javascript:showPlanetData()>Planet Data</a>'
                    PlanetRadius=SelectedPlanetJSON.P_Radius//--in EU---
                    diaSpan.innerHTML=numberWithCommas((2*6371*PlanetRadius).toFixed(0))+" KM"
                    measureDiv.style.visibility="visible"
                    drawingNameDiv.style.visibility="visible"
                    drawingDescriptionDiv.style.visibility="visible"
                    saveDrawingButtonDiv.style.visibility="visible"
                 }
                else
                {
                    console.log(XMLFile.responseText)
                     cw.sentRegistrationSpan.innerHTML = "Registration Failed"

                }

         }


}
