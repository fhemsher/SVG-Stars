//--used in paths---
function getArrowDefs()
{
      //---CLEAR ARROW DEFS---
      arrowDefs=document.getElementById("arrowDefs")
 	var elems=arrowDefs.childNodes
    for(var j=elems.length-1;j>=2;j--)
	{
      arrowDefs.removeChild(elems.item(j))
	}
    	var xmlFile="../DrawingLibrary/"+FOLDER+"/ArrowDefs.xml"
	var loadXML = new XMLHttpRequest;
	loadXML.onload = callbackArrow;
	loadXML.open("GET", xmlFile, true);
	loadXML.send();
	function callbackArrow()
	{
		//---responseText---
		var xmlString=loadXML.responseText
		//---DOMParser---
		var parser = new DOMParser();
		var bogie=loadXML.responseText
		var fixed=bogie.replace(/xmlns=""/g,"")
		var defsDoc=parser.parseFromString(fixed,"text/xml").documentElement ;
		var arrows=defsDoc.childNodes

		for(var k=0;k<arrows.length;k++)
		{
            var addDef=arrows.item(k).cloneNode(true)
			arrowDefs.appendChild(addDef)
		}


	}
}

var AddPathXMLDoc

var AddPathBBCoordsArray=[]  //---center of path bbox---
function loadAddedPaths()
{

    //---clear previous---
    var elems=domAddPathG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      domAddPathG.removeChild(elems.item(j))
	}

	 AddPathBBCoordsArray=[]
  	var xmlFile="../DrawingLibrary/"+FOLDER+"/AddPath.xml"
	var loadXML = new XMLHttpRequest;
	loadXML.onload = callback;
	loadXML.open("GET", xmlFile, true);
	loadXML.send();
	function callback()
	{
		//---responseText---
		var xmlString=loadXML.responseText
		//---DOMParser---
		var parser = new DOMParser();
		var bogie=loadXML.responseText

		var fixed=bogie.replace(/xmlns=""/g,"")

		AddPathXMLDoc=parser.parseFromString(fixed,"text/xml").documentElement ;


		var addedPaths=AddPathXMLDoc.childNodes


        //---places circles at 'bottom', so other elements are on top---
		for(var k=0;k<addedPaths.length;k++)
		{


		    var myScale=parseFloat(addedPaths.item(k).getAttribute("myScale"))


            var myId=addedPaths.item(k).getAttribute("id")
            var bbCoords=parseFloat(addedPaths.item(k).getAttribute("bbCoords"))
             var coordString=addedPaths.item(k).getAttribute("bbCoords").split(",")
            var coords=[parseFloat(coordString[0]),parseFloat(coordString[1])]


            AddPathBBCoordsArray.push([coords,myScale,myId])
            //AddPathCoordsArray.push([coords,myScale,myId,linearD])

           domAddPathG.appendChild(addedPaths.item(k).cloneNode(true))


            d3.select("#"+myId).attr("transform",PlanetPoint(coords)+"scale("+(PlanetView.k/PlanetScale)/myScale+")"  )

        }




    }



}



//--login on load---
var AddElemXMLDoc
var AddElemCoordsArray=[]

function loadAddedElems()
{

    //---clear previous---
    var elems=domAddElemG.childNodes
    for(var j=elems.length-1;j>=0;j--)
	{
      domAddElemG.removeChild(elems.item(j))
	}

	 AddElemCoordsArray=[]
  	var xmlFile="../DrawingLibrary/"+FOLDER+"/AddElem.xml"
	var loadXML = new XMLHttpRequest;
	loadXML.onload = callback;
	loadXML.open("GET", xmlFile, true);
	loadXML.send();
	function callback()
	{
		//---responseText---
		var xmlString=loadXML.responseText
		//---DOMParser---
		var parser = new DOMParser();
		var bogie=loadXML.responseText

		var fixed=bogie.replace(/xmlns=""/g,"")
		AddElemXMLDoc=parser.parseFromString(fixed,"text/xml").documentElement ;

		var addedElems=AddElemXMLDoc.childNodes


		for(var k=0;k<addedElems.length;k++)
		{
		    var ll0=parseFloat(addedElems.item(k).getAttribute("ll0"))
		    var ll1=parseFloat(addedElems.item(k).getAttribute("ll1"))
		    var myScale=parseFloat(addedElems.item(k).getAttribute("myScale"))
		    var rotateAngle=parseFloat(addedElems.item(k).getAttribute("rotateAngle"))
             var rotate=""
            if(rotateAngle)
            rotate="rotate("+rotateAngle+")"


            var myId=addedElems.item(k).getAttribute("id")

            AddElemCoordsArray.push([[ll0,ll1],myScale,myId,rotateAngle])
	            var addedElem=addedElems.item(k).cloneNode(true)

                if(Mobile==true)
                {
                   addedElem.removeAttribute("onmousedown")
                   addedElem.removeAttribute("ondblclick")
                        //addedElem.removeAttribute("onmouseover")
                addedElem.setAttribute("onclick","showSymbolComment(evt)")

                }

                if(addedElem.nodeName=="image")
                {
                    addedElem.style.display="none"
                    addedElem.setAttribute("onload","this.style.display='block'")
                }

               	domAddElemG.appendChild(addedElem)
              
               addedElem.setAttribute("transform",PlanetPoint([ll0,ll1])+"scale("+(PlanetView.k/PlanetScale)/myScale+")"+rotate)

             
		}
       console.log(domAddElemG)

      if(Mobile==false)
      planetRedraw()
      ///else
        //starMobileRedraw()
	}
}