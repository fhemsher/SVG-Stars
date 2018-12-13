

//---button immediately updates default view---
function changeMyDefaultView()
{


 // var bounds="<bounds planetRotation=\""+PlanetView.r+"\"  planetScale=\""+PlanetView.k+"\" />"
           //  var bounds="<bounds   planetScale=\""+PlanetProjection.scale()+"\"  planetTranslate=\""+PlanetProjection.translate()+"\" />"

    var sendXML = "<SEND folder='"+FOLDER+"'  planetScale='"+PlanetProjection.scale()+"'  planetTranslate='"+PlanetProjection.translate()+"' />"

   var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../Change/updateDefaultView.asp", false);
   XMLFile.onload = function()
    {
        if (this.status == 200)
        { //---OK---
             saveDefaultViewSpan.innerHTML = "&#10004;Saved"

        }
        if (this.status == 500)
        { //---Error---
            console.log(this.responseText)
            saveDefaultViewSpan.innerHTML = " Failed"
        }
    };
     XMLFile.send(sendXML);


}


