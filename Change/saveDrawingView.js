var PlaceXMLdoc
var CurrentName
var CurrentDescription
var CurrentPersonalName

//---onload and if loaded---
function getMyPlace()
{
    var cw = changeCw

    cw.placeNameValue.value = hiddenPlaceNameValue.value
    cw.placeDescriptionValue.value = hiddenPlaceDescriptionValue.value




    for(var k = 0; k<XMLloginArray.length; k++)
    {
        var logMe = XMLloginArray[k]

        var logID = logMe.getAttribute("id")
        if(logID==ID)
        {
                    if(logMe.getAttribute("name4ME"))
                    {
                         cw.name4MEValue.value=xml2txt(logMe.getAttribute("name4ME"))
                         CurrentPersonalName=xml2txt(logMe.getAttribute("name4ME"))

                    }

            if(logMe.nodeName=="owner")
            {
                var visitOnly = logMe.getAttribute("visitOnly")
                if(visitOnly)
                {
                    cw.visitOnlyCheck.checked = true
                    hiddenPlaceVisitOnlyValue.value = "true"
                    cw.hiddenVisitOnlyValue.value = "true"
                }
                else
                {
                    cw.visitOnlyCheck.checked = false
                    hiddenPlaceVisitOnlyValue.value = ""
                    cw.hiddenVisitOnlyValue.value = ""

                }
                break

            }
        }

    }

    BoundsChanged = false

    cw.removeMyPlaceCheck.checked = false
}

function removeMyPlaceChecked()
{
    var cw = changeCw

}

var DefaultViewChanged = false
var DrawingViewScale
var DrawingViewRotate
var DrawingViewTranslate
//---button immediately updates default view---
function saveDrawingView()
{
      saveDefaultViewSpan.innerHTML = ""



    var celestialTrans =[PrevTransX, PrevTransY]
    var sendXML = "<SEND folder='"+FOLDER+"'  planetScale='"+PlanetScale+"'  celestialScale='"+StarView.k+"'   celestialRotate='"+StarView.r+"'   celestialTranslate='"+celestialTrans+"'    />"

   var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../Change/updateDefaultView.asp", false);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    if(XMLFile.responseText=="OK")
    {
        saveDefaultViewSpan.innerHTML = "&#10004;Saved"
        DefaultViewChanged = true
        DrawingViewScale=StarView.k
        DrawingViewRotate=StarView.r
        DrawingViewTranslate=[PrevTransX,PrevTransY]

    }
    else
    {
       saveDefaultViewSpan.innerHTML = " Failed"
       console.log(XMLFile.responseText)
    }

}


