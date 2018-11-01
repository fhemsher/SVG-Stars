function zoomUpdate()
{
	var mapZoom=MyMap.getZoom()
	if(BoundsRect&&BoundsRect.style("visibility")=="visible")
		zoomUpdateBoundsRect(mapZoom)
	zoomUpdateAddElems(mapZoom)
	zoomUpdateSymbols(mapZoom)

    if(mapZoom>PlaceZoom)
    {

       legendButton.style.visibility="hidden"
       loginButton.style.visibility="hidden"



    }
    else
    {
       legendButton.style.visibility="visible"
       loginButton.style.visibility="visible"


    }
}


var AddElemZoomUpdate=[]
function zoomUpdateAddElems(mapZoom)
{
	for(var k=0;k<AddElemZoomUpdate.length;k++)
	{
		var elem=document.getElementById(AddElemZoomUpdate[k][0])
          //----rotated element?---
		var pt=d3.transform(elem.getAttribute("transform"))
	    var rotate=pt.rotate

		elem.setAttribute("transform","")

		var transformRequestObj=domSVG.createSVGTransform()
      
		var animTransformList=elem.transform

		var transformList=animTransformList.baseVal

		var lat=parseFloat(elem.getAttribute("lat"))
		var lng=parseFloat(elem.getAttribute("lng"))
		var latLng= new  L.latLng(lat, lng)
		var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
		if(elem.getAttribute("overlayScaleX"))//---overlay image---
		{
			var scaleX=parseFloat(elem.getAttribute("overlayScaleX"))
			var scaleY=parseFloat(elem.getAttribute("overlayScaleY"))
			transformRequestObj.setScale(scaleX,scaleY)
			transformList.appendItem(transformRequestObj)
			transformList.consolidate()
		}
        if(rotate!=0)
		{
	      transformRequestObj.setRotate(rotate,0,0)
				transformList.appendItem(transformRequestObj)
				transformList.consolidate()
		}
		var initZoom=parseInt(elem.getAttribute("InitZoom"),10)
		var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
		transformRequestObj.setScale(scale,scale)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
	}
}


function zoomUpdateSymbols(mapZoom)
{
   symbolG=document.getElementById("symbolG")
   var elems=symbolG.childNodes
   for(var k=0;k<elems.length;k++)
   {
   		var elem=elems.item(k)
		var pt=d3.transform(elem.getAttribute("transform"))
		var scale=pt.scale[0]
		elem.setAttribute("transform","")
		var lat=parseFloat(elem.getAttribute("lat"))
		var lng=parseFloat(elem.getAttribute("lng"))
		var latLng= new  L.latLng(lat, lng)
		var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		var transformRequestObj=domSVG.createSVGTransform()
		var animTransformList=elem.transform
		var transformList=animTransformList.baseVal

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()

		transformRequestObj.setScale(scale,scale)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
    }

}


function zoomUpdateBoundsRect(mapZoom)
{
	boundsRect.setAttribute("transform","")

	var transformRequestObj=domSVG.createSVGTransform()
	var animTransformList=boundsRect.transform
	var transformList=animTransformList.baseVal

	var lat=parseFloat(boundsRect.getAttribute("lat"))
	var lng=parseFloat(boundsRect.getAttribute("lng"))
	var latLng= new  L.latLng(lat, lng)
	var transX=MyMap.latLngToLayerPoint(latLng).x
	var transY=MyMap.latLngToLayerPoint(latLng).y

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

	var initZoom=parseInt(boundsRect.getAttribute("InitZoom"),10)
	var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

		if(mapZoom<(PlaceZoom-2))
			BoundsRect.attr("fill","#00A693")
		else
			BoundsRect.attr("fill","none")

}
