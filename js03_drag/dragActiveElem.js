


var ActiveElemStop=false


var dragActiveElem = d3.behavior.drag()
.on("dragstart", activeDragStart)
.on("drag", activeDragMove)
.on("dragend", activeDragEnd);

//----mouse down---
var ActiveDragging=false
function activeDragStart()
{
   if(ActiveElem)
      ActiveDragging=true
    if(DrawText==true)
	{
		   if(document.getElementById("textBlinker"))
			{
		        clearInterval(TextBlinkerInterval)
		       activeText.removeChild(textBlinker)
			}
	}
        if(DrawPathEdit==true)
       	ActiveElemG.style("cursor","move")




		  MyMap.dragging.disable()
}


function activeDragMove(d, i)
{

	if(ActiveElem&&ActiveDragging==true)
	{
		d.x += d3.event.dx;
		d.y += d3.event.dy;
        if(DrawPathEdit==false)
		  {
            var transformRequestObj=domSVG.createSVGTransform()
			var animTransformList=activeElem.transform
			var transformList=animTransformList.baseVal
			transformRequestObj.setTranslate(d3.event.dx,d3.event.dy)
			transformList.appendItem(transformRequestObj)
			transformList.consolidate()

			DrawX.attr("transform",ActiveElem.attr("transform"))
			  ClickDot.attr("transform",ActiveElem.attr("transform"))

			if(DrawCircle==true)
				addElemCircleCw.drawCircleCenterValue.value=SVGLatLng.lat.toFixed(3)+","+SVGLatLng.lng.toFixed(3)
			if(DrawIcon==true)
				addElemIconCw.drawIconCenterValue.value=SVGLatLng.lat.toFixed(3)+","+SVGLatLng.lng.toFixed(3)


		  }
	  	 else
		 {

            var transformRequestObj=domSVG.createSVGTransform()
			var animTransformList=domActiveElemG.transform
			var transformList=animTransformList.baseVal
			transformRequestObj.setTranslate(d3.event.dx,d3.event.dy)
			transformList.appendItem(transformRequestObj)
			transformList.consolidate()


		 }

	 }
}


//----mouse up---
function activeDragEnd()
{

	if(ActiveElem&&ActiveDragging==true)
	{
       if(DrawPathEdit==false)
	   {
       //---get latLng of DrawX center---
		var transform=domDrawX.getAttribute("transform")
		var pt=d3.transform(transform)
		var cntrX=pt.translate[0]
		var cntrY=pt.translate[1]

		var svgPnt=L.point(cntrX,cntrY)
		var cntrLatLng=MyMap.layerPointToLatLng(svgPnt)
		var cntrLat=cntrLatLng.lat
		var cntrLng=cntrLatLng.lng

		ActiveElem.attr("lat",cntrLat)
		ActiveElem.attr("lng",cntrLng)
       var mapZoom=MyMap.getZoom()
              MyMap.dragging.enable()



                zoomUpdateActiveElem(mapZoom)
	   		    var transform=ActiveElem.attr("transform")
			var pt=d3.transform(transform)
			ActiveElem.data([{x: pt.translate[0] , y: pt.translate[1],scale:pt.scale[0],}])




		 }




       }
	   else
	   {
          /*
           //---get latLng of DrawX center---
		var transform=domDrawX.getAttribute("transform")
		var pt=d3.transform(transform)
		var cntrX=pt.translate[0]
		var cntrY=pt.translate[1]

		var svgPnt=L.point(cntrX,cntrY)
		var cntrLatLng=MyMap.layerPointToLatLng(svgPnt)
		var cntrLat=cntrLatLng.lat
		var cntrLng=cntrLatLng.lng

		ActiveElemG.attr("lat",cntrLat)
		ActiveElemG.attr("lng",cntrLng)
        */
		    var transform=ActiveElemG.attr("transform")
			var pt=d3.transform(transform)
			ActiveElemG.data([{x: pt.translate[0] , y: pt.translate[1],scale:pt.scale[0],rotate:pt.rotate}])

       	ActiveElemG.style("cursor","default")

         console.log(new XMLSerializer().serializeToString(domActiveElemG) ) 
	   }
		ActiveDragging=false




}


//---active elem finished, again---
function removeActiveDrag()
{
	DrawX.style("display","none")
	DrawX.attr("transform",null)
	ClickDot.style("display","none")
	ClickDot.attr("transform",null)


     d3SVG.style('cursor',null)
	var domElem=document.getElementById("activeElem")
	if(domElem)
		domActiveElemG.removeChild(domElem)
    ActiveElem=null
   ActiveElemStop=false
   ActiveDragging=false
	 MyMap.dragging.enable();
}


