
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

//---except arc paths---
function screenPath(path)
{
    var sCTM = path.getCTM()
    var svgRoot = path.ownerSVGElement

    var segList = path.pathSegList
    var segs = segList.numberOfItems
    //---change segObj values
    for(var k = 0; k<segs; k++)
    {
        var segObj = segList.getItem(k)

        if(segObj.x && segObj.y)
        {
            var mySVGPoint = svgRoot.createSVGPoint();
            mySVGPoint.x = segObj.x
            mySVGPoint.y = segObj.y
            mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
            segObj.x = mySVGPointTrans.x
            segObj.y = mySVGPointTrans.y
        }

        if(segObj.x1 && segObj.y1)
        {
            var mySVGPoint1 = svgRoot.createSVGPoint();
            mySVGPoint1.x = segObj.x1
            mySVGPoint1.y = segObj.y1
            mySVGPointTrans1 = mySVGPoint1.matrixTransform(sCTM)
            segObj.x1 = mySVGPointTrans1.x
            segObj.y1 = mySVGPointTrans1.y
        }
        if(segObj.x2 && segObj.y2)
        {
            var mySVGPoint2 = svgRoot.createSVGPoint();
            mySVGPoint2.x = segObj.x2
            mySVGPoint2.y = segObj.y2
            mySVGPointTrans2 = mySVGPoint2.matrixTransform(sCTM)
            segObj.x2 = mySVGPointTrans2.x
            segObj.y2 = mySVGPointTrans2.y
        }
    }
    //---force removal of transform--
    path.setAttribute("transform", "")
    path.removeAttribute("transform")
}