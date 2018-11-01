function objTfm(id)
{

 	var elem=document.getElementById(id)

           elem.setAttribute("transform","")
	   elem.removeAttribute("transform")


	   var transformRequestObj=celestialSVG.createSVGTransform()
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



		var initZoom=parseInt(elem.getAttribute("InitZoom"),10)
		var scale = (Math.pow(2, MapZoom)/2)/(Math.pow(2, initZoom)/2);
		transformRequestObj.setScale(scale,scale)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
}



function tfm(id,transX,transY,scale)
{
	var domElem=document.getElementById(id)
	if(!scale)
	{
		var transform=domElem.getAttribute("transform")
		var pt=d3.transform(transform)
		var scale=pt.scale[0]
    }
	if(!transX)
	{
      	 var transform=domElem.getAttribute("transform")
		var pt=d3.transform(transform)
		var transX=pt.translate[0]
		var transY=pt.translate[1]
	}
	domElem.setAttribute("transform","")
	domElem.removeAttribute("transform")

	var transformRequestObj=celestialSVG.createSVGTransform()
	var animTransformList=domElem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()


}

function roteElem(id,angle)
{
	var domElem=document.getElementById(id)
	var transformRequestObj=celestialSVG.createSVGTransform()
	var animTransformList=domElem.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(angle,0,0)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
}

function rotePath(angle)
{
    var transform=domDrawX.getAttribute("transform")
		var pt=d3.transform(transform)
		var cx=pt.translate[0]
		var cy=pt.translate[1]


	var transformRequestObj=celestialSVG.createSVGTransform()
	var animTransformList=domActiveElemG.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(angle,cx,cy)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

      var transform=ActiveElemG.attr("transform")
	var pt=d3.transform(transform)
	ActiveElemG.data([{x: pt.translate[0] , y: pt.translate[1],scale:pt.scale[0],rotate:pt.rotate}])
    console.log(pt.scale)

   
}

