
var DefaultViewChanged = false
//---button immediately updates default view---
function changeMyDefaultView()
{

    //  PrimaryStarCoords=PrimaryStarLL
    var celestialTrans =[PrevTransX, PrevTransY]
    var sendXML = "<SEND folder='"+FOLDER+"' planetScale='"+PlanetScale+"'  celestialScale='"+StarView.k+"'   celestialRotate='"+StarView.r+"'   celestialTranslate='"+celestialTrans+"'    />"

   var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../Change/updateDefaultView.asp", false);
   XMLFile.onload = function()
    {     var cw = changeCw
        if (this.status == 200)
        { //---OK---
             cw.saveDefaultViewSpan.innerHTML = "&#10004;Saved"
            DefaultViewChanged = true
        }
        if (this.status == 500)
        { //---Error---
            console.log(this.responseText)
            cw.saveDefaultViewSpan.innerHTML = " Failed"
        }
    };
     XMLFile.send(sendXML);


}


