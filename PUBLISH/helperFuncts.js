
function reverse(s) {
    return s.split('').reverse().join('');
}


 //---rotate elem----
function rote(id,angle)
{

	var domElem=document.getElementById(id)
	var transformRequestObj=starSVG.createSVGTransform()
	var animTransformList=domElem.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(angle,0,0)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
   var t3=d3.transform(domElem.getAttribute("transform"))

RotateAngle=t3.rotate
  

}
//---used when adding/editing elements---
function coverOn()
{
  StopStarZoom=true
  CoverRect.style("display","block")
  myStarG.setAttribute("pointer-events","none")
  domAddElemG.setAttribute("pointer-events","none")
  domAddPathG.setAttribute("pointer-events","none")
 
  domActiveElemG.removeAttribute("transform")

}
function coverOff()
{
   StopStarZoom=false  
 CoverRect.style("display","none")
    myStarG.setAttribute("pointer-events","")
  domAddElemG.setAttribute("pointer-events","")
  domAddPathG.setAttribute("pointer-events","")

 domActiveElemG.removeAttribute("transform")
}


//---return  transformed x,y from computed x,y---
function XY(x,y)
{
   	var pnt = domSVG.createSVGPoint();
	pnt.x = x
	pnt.y = y
	var sCTM = domSVG.getScreenCTM();
	var PNT = pnt.matrixTransform(sCTM.inverse());
  	return {x:PNT.x,y:PNT.y}
}




//---real numbers---
function numberWithCommas(str)
 {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}
//--timedelay to check asp xml updates---
var XMLFile
function aspResponse()
{
  console.log(XMLFile.responseText)
}
//---check svg element's svg properties---
function svg2Stng(svgElem)
{
 console.log(new XMLSerializer().serializeToString(svgElem))
}

