function publishThisDrawing(folder)  //===visitor====
{

    publishValue.value = "<!DOCTYPE HTML>\n"+
    "<html>\n"+
        "<script>\n"+
                "  window.open('http://svg-stars.org/PUBLISH/index.htm\\?id="+folder+"','_self')\n"+
        "</script>\n"+
        "</html>"
        publishDrawingDiv.style.visibility="visible"

}
function publishOwnerDrawing(folder)  //===owner====
{

     publishValue.value = "<!DOCTYPE HTML>\n"+
"<html>\n"+
    "<script>\n"+
            "  window.open('http://svg-stars.org/PUBLISH/index.htm\\?id="+folder+"','_self')\n"+
    "</script>\n"+
    "</html>"
    publishDrawingDiv.style.visibility="visible"



}

function publishCurrentDrawing()//====any viewer===
{
   publishValue.value = "<!DOCTYPE HTML>\n"+
"<html>\n"+
    "<script>\n"+
            "  window.open('http://svg-stars.org/PUBLISH/index.htm\\?id="+FOLDER+"','_self')\n"+
    "</script>\n"+
    "</html>"


    publishDrawingDiv.style.visibility="visible"


}

function closePublishStarDrawing()
{
    publishDrawingDiv.style.visibility="hidden"



}