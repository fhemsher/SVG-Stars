function publishMap(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Map.svg", true);
    xhr.onload = function()
    {

        var xmlString = this.responseText
        //---DOMParser---
        var parser = new DOMParser();
        MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

        var groups = MapDoc.childNodes

        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
            if(group.nodeName!="#text")
            {
                var mapId = group.getAttribute("id")

                if(mapId==id)
                {
                    publishG=group.cloneNode(true)
                    for(k=0;k<publishG.childNodes.length;k++)
                    {

                       var elem=publishG.childNodes.item(k)
                            elem.removeAttribute("onmouseover")
                            elem.removeAttribute("onmouseout")
                            elem.removeAttribute("onmousedown")

                    }
                    var svgString= new XMLSerializer().serializeToString(publishG)
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "_ASP/publishMap.asp", true);
                    xhr.onload = function()
                    {
                        if (this.status == 200)
                        {















                            closeMapTable()
                          publishValue.value = "<!DOCTYPE HTML>\n"+
                          "<html>\n"+
                            "<script>\n"+
                                "  window.open('http://svg-maps.com/PUBLISH/index.htm\\?id="+mapId+"','_self')\n"+
                            "</script>\n"+
                            "</html>"
                            publishMapDiv.style.visibility="visible"
                        }

                    };
                    xhr.send(svgString);

                    break
                }
            }

        }

    }
    xhr.send()}