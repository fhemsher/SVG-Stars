
//--- Begin/OK Star button---
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

            var drawingName = SelectedStarName
            var drawingDescription = txt2xml(cw.drawingDescriptionValue.value)
            var drawingEmail = txt2xml(cw.drawingEmailValue.value)
            var ownerName = txt2xml(cw.ownerNameValue.value)


            var register = "<register  email=\""+drawingEmail+"\"  ownerName=\""+ownerName+"\"   name=\""+drawingName+"\"  description=\""+drawingDescription+"\" />"

           PrimaryStarCoords=PrimaryStarLL //---host star coords----
          
            var  primaryStar=" initStarDwg=\"true\" primaryStarCoords=\""+PrimaryStarCoords+"\" primaryStarBoundryCoords=\""+PrimaryStarBoundryCoords.toString()+"\" "

            var conCoords=MyConBoundries.geometry.coordinates//---used to draw con on full zoom out(- key)---
            var celestialTrans=CelestialProjection.translate()
            var boundsObjString = '<celestialBounds '+primaryStar+' conCoords="'+conCoords+'" constellation="'+SelectedCon+'"  celestialScale="'+CelestialView.k+'" celestialRotate="'+CelestialView.r+'"  celestialTranslate="'+celestialTrans+'"  celestialScaleInit="'+CelestialView.k+'" celestialRotateInit="'+CelestialView.r+'"  celestialTranslateInit="'+celestialTrans+'"  />'
            var defaultBoundsObjString = '<defaultBounds defaultScale="'+CelestialView.k+'" defaultRotate="'+CelestialView.r+'"  defaultTranslate="'+celestialTrans+'"  celestialScaleInit="'+CelestialView.k+'" celestialRotateInit="'+CelestialView.r+'"  celestialTranslateInit="'+celestialTrans+'"  />'

            var sendXML = "<SEND>" +register+HostStarXML+ExoPlanetXML+boundsObjString+defaultBoundsObjString+"</SEND>"


                var XMLFile = new XMLHttpRequest();
                XMLFile.open("POST", "RegisterDrawing/sendDrawingRegistration.asp", false);
                XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                XMLFile.send(sendXML);
                if(XMLFile.responseText.length<50) //--no errors---
                {
                   ConStars=null
                      SingleStar=false
                    BeginStar=false
                   //FoundStarsJson=[{"type":"FeatureCollection","features":[]}]
                   PrimaryStarPath.attr("d",null)
                     //---clear stars and boundry--
                   //var cw = document.getElementById("constellationFrame").contentWindow

                    var cw=beginCw
                    FOLDER = XMLFile.responseText
                    oEMAIL = cw.drawingEmailValue.value
                    oNAME = cw.ownerNameValue.value
                    uEMAIL = null
                    DrawingNAME=SelectedStarName

                    DrawingDescription=cw.drawingDescriptionValue.value

                    closeBegin()

                    ID = reverse(FOLDER.substring(5, 9)).toLowerCase()
                    var cookieSetDate = "@"+new Date().getTime()


                    setCookie("_SVGStars_Folder"+cookieSetDate,FOLDER,180)
                    setCookie(FOLDER+"_SVGStars_Owner_NAME"+cookieSetDate,oNAME,180)
    				setCookie(FOLDER+"_SVGStars_ID"+cookieSetDate,ID,180)
                    setCookie(FOLDER+"_SVGStars_Owner_EMAIL"+cookieSetDate,oEMAIL,180)
                    setCookie(FOLDER+"_SVGStars_DrawingNAME"+cookieSetDate,DrawingNAME,180)
                    setCookie(FOLDER+"_SVGStars_DrawingDescription"+cookieSetDate,DrawingDescription,180)


                   PrevZoomInteger=0
                    loginToDrawing()
                    RegisterOK = true

                    ownerSelectSpan.style.visibility = "visible"

                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:white;font-family:verdana;font-size:12px'> Contact Me:<i style=color:yellow;text-decoration:underline title='Send email to this drawing owner' onClick=openEmail() > "+oNAME+"</i></span>"
                    drawingDescriptionDiv.innerHTML = DrawingDescription
                    drawingDescriptionDiv.style.visibility = "visible"


                }
                else
                {
                     cw.sentRegistrationSpan.innerHTML = "Registration Failed"
                     
                }

         }


}
 /*
















    if(cw.drawingEmailValue.value.length>5&&cw.drawingEmailValue.value.indexOf("@")!=-1)
    {
        if(cw.ownerNameValue.value.length>1)
        {
            if(cw.drawingEmailValue.value!="" && cw.ownerNameValue.value!="" && cw.drawingNameValue.value!="")
            {

                hiddenDrawingNameValue.value = cw.drawingNameValue.value
                hiddenDrawingDescriptionValue.value = cw.drawingDescriptionValue.value

                var reSp = / /g
                cw.drawingEmailValue.value = cw.drawingEmailValue.value.redrawing(reSp, "")

                var drawingName = txt2xml(cw.drawingNameValue.value)
                var drawingDescription = txt2xml(cw.drawingDescriptionValue.value)
                var drawingEmail = txt2xml(cw.drawingEmailValue.value)
                var ownerName = txt2xml(cw.ownerNameValue.value)


                var register = "<register  email=\""+drawingEmail+"\"  ownerName=\""+ownerName+"\"   name=\""+drawingName+"\"  description=\""+drawingDescription+"\" />"

                PrimaryStarCoords=PrimaryStarLL //---host star coords----

                  var  primaryStar=" primaryStarCoords=\""+PrimaryStarCoords+"\" primaryStarBoundryCoords=\""+PrimaryStarBoundryCoords.toString()+"\" "

                   var conCoords=MyConBoundries.geometry.coordinates//---used to draw con on full zoom out(- key)---
                var celestialTrans=CelestialProjection.translate()
              var boundsObjString = '<celestialBounds '+primaryStar+' conCoords="'+conCoords+'" constellation="'+conValue+'"  celestialScale="'+CelestialView.k+'" celestialRotate="'+CelestialView.r+'"  celestialTranslate="'+celestialTrans+'"  celestialScaleInit="'+CelestialView.k+'" celestialRotateInit="'+CelestialView.r+'"  celestialTranslateInit="'+celestialTrans+'"  />'

                var sendXML = "<SEND>" +register+HostStarXML+ExoplanetXML+CompanionStarsXML+boundsObjString+"</SEND>"

         console.log(sendXML)

             var XMLFile = new XMLHttpRequest();
                XMLFile.open("POST", "RegisterDrawing/sendDrawingRegistration.asp", false);
                XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                XMLFile.send(sendXML);


                //setTimeout(aspResponse, 500) //--remove 'var' at XMLFile---


                if(XMLFile.responseText.length<50) //--no errors---
                {
                   ConStars=null
                      SingleStar=false
                    BeginStar=false
                   //FoundStarsJson=[{"type":"FeatureCollection","features":[]}]
                   PrimaryStarPath.attr("d",null)
                     //---clear stars and boundry--
                   var cw = document.getElementById("constellationFrame").contentWindow

                    closeIframe("constellation")
                    FOLDER = XMLFile.responseText
                    oEMAIL = cw.drawingEmailValue.value
                    oNAME = cw.ownerNameValue.value
                    uEMAIL = null
                    DrawingNAME=cw.drawingNameValue.value

                    DrawingDescription=cw.drawingDescriptionValue.value

                     //---clear startFrame values---
                        cw.drawingEmailValue.value = ""
                        cw.ownerNameValue.value = ""
                        cw.drawingNameValue.value = ""
                        cw.drawingDescriptionValue.value = ""
                        cw.sentRegistrationSpan.innerHTML = ""

                    ID = reverse(FOLDER.substring(5, 9)).toLowerCase()
                    var cookieSetDate = "@"+new Date().getTime()


                    setCookie("_SVGStars_Folder"+cookieSetDate,FOLDER,180)
                    setCookie(FOLDER+"_SVGStars_Owner_NAME"+cookieSetDate,oNAME,180)
    				setCookie(FOLDER+"_SVGStars_ID"+cookieSetDate,ID,180)
                    setCookie(FOLDER+"_SVGStars_Owner_EMAIL"+cookieSetDate,oEMAIL,180)
                    setCookie(FOLDER+"_SVGStars_DrawingNAME"+cookieSetDate,DrawingNAME,180)
                    setCookie(FOLDER+"_SVGStars_DrawingDescription"+cookieSetDate,DrawingDescription,180)



                    loginToDrawing()
                    RegisterOK = true

                    ownerSelectSpan.style.visibility = "visible"

                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:white;font-family:verdana;font-size:12px'> Contact Me:<i style=color:yellow;text-decoration:underline title='Send email to this drawing owner' onClick=openEmail() > "+oNAME+"</i></span>"
                    drawingDescriptionDiv.innerHTML = DrawingDescription
                    drawingDescriptionDiv.style.visibility = "visible"


                }
                else
                {
                     cw.sentRegistrationSpan.innerHTML = "Registration Failed"
                    var width=cw.containerDiv.scrollWidth+30
                   var height=cw.containerDiv.scrollHeight+30
                    sizeFrame('constellation',width,height)

                }



        }
          else
            cw.sentRegistrationSpan.innerHTML = "Your user name must be more than 1 character"

    }
    else if(cw.drawingEmailValue.value.indexOf("@")==-1)
        cw.sentRegistrationSpan.innerHTML = "Not a valid email."
    else
         cw.sentRegistrationSpan.innerHTML = "Select a star."
    }
   */



