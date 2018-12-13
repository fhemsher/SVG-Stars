
//---------NOT USED------------------

var myZoom=d3.behavior.zoom().scaleExtent([.5,100000]).on("zoom", mouseWheelZoom)
//---D3 URL to script: src="http://d3js.org/d3.v3.min.js" charset="utf-8" ---
function callZoomBehavior()
{
	//---attach to root svg---
	//d3.select("#"+SVGId)
	d3SVG.call(myZoom).on("dblclick.zoom", null)
	//---reset from previous file call---
	myZoom.translate([0,0])
	myZoom.scale(1)
	PrevScale=1
}

var PrevScale=1 //--previous scale event---
var PrevScaleRatio=1
var PrevTransX=0
var	PrevTransY=0
var MapRectX0
var MapRectY0
var MapRectX1
var MapRectY1
var MapRectWidth
var MapRectHeight
var MapCx
var MapCy

function mouseWheelZoom()
{



if(!ActiveElem&&DraggingRA==false)
{


//	//--place in d3 object--
	//var zoomG=d3.select("#starG")
	if(PrevScale!=d3.event.scale) //--transition on scale change--
	{
		StarG.transition().attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
		UniverseG.transition().attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
        if(StarGraticuleProjection)
           resizeStarGraticule()
}
	else//--no transition on pan---
	{
		StarG.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
		UniverseG.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")

    }

   PrevTransX=d3.event.translate[0]
   PrevTransY=d3.event.translate[1]


	PrevScale=d3.event.scale
    PrevScaleRatio=1/PrevScale
   // if(PrevScale>=1)
 //  Sun.attr("transform","translate(600 300)scale("+(1/PrevScale)+")")
   zoomLevelDiv.innerHTML= PrevScale.toFixed(1)
   zoomAdjustUniverse()
  // commentDiv.style.visibility="hidden"
  if(PrevScale>=1&&!StarGraticuleProjection)
   viewLyValue.value=(600/PrevScale).toFixed(12)

    var transform=d3.transform(hiliteCircle.getAttribute("transform"))
        var transX=transform.translate[0]
        var transY=transform.translate[1]
   hiliteCircle.setAttribute("transform","translate("+transX+" "+transY+")scale("+(1/PrevScale)+")")



}

}


function zoomAdjustUniverse()
{
   for(var k=0;k<universeCircleG.childNodes.length;k++)
   {
       var star=universeCircleG.childNodes.item(k)

       if(star.nodeName=="text")
       {
       var dT=d3.transform(star.getAttribute("transform"))
       var transX=dT.translate[0]
       var transY=dT.translate[1]


       star.setAttribute("transform","translate("+transX+" "+transY+")scale("+(1/PrevScale)+")")





       }

   }





  // console.log(starLyDia)

}
