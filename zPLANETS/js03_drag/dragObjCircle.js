//----mouse down---
var DraggingObj=false
 var objTransformRequestObj
var objTransList
var objDragTarget=null;
var ObjStartX
var ObjStartY
var ActiveScale
var ActiveElemStartTrans
var ActiveElemEndTrans
var CentXY
//---mouse down over element---
function startDragCircle(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot")
        {

             if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                	objDragTarget = evt.target

              console.log(objDragTarget)
         }
       if(objDragTarget)
	   {



  		var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

              //---used for align of projection/zoom on end drag---
              if(objDragTarget.getAttribute("id")=="activeElem")
                    ActiveElemStartTrans=[SVGx,SVGy]

			objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTarget.transform
			objTransList=myTransListAnim.baseVal

			ObjStartX = Pnt.x
			ObjStartY = Pnt.y



			DraggingObj=true




		}
    }
	else
      	DraggingObj=false

}
//---mouse move---
function dragCircle(evt)
{
	if(DraggingObj)
	{

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartX;
		Pnt.y -= ObjStartY;



     if(objDragTarget.getAttribute("id")=="dragDot" &&(DrawCircle==true||EditCircle==true))
     {
               var radius=parseFloat(ActiveElem.attr("r"))
              radius=(Pnt.x+radius)

        if(radius>0)
        {

                             ActiveElem.attr("r",radius)


                    objTransformRequestObj.setTranslate(Pnt.x,0)
            		objTransList.appendItem(objTransformRequestObj)
            		objTransList.consolidate()

                 var t3=d3.transform(ActiveElem.attr("transform"))
                       var transX=t3.translate[0]
                      var transY=t3.translate[1]
                   CentXY=[transX,transY]


                    var km=(xyDist(CentXY,[CentXY[0]+radius,CentXY[1]])*2).toFixed(0)
                       //objDragTarget.setAttribute("comment","radius(ly): "+ly)

                        var x=evt.clientX
                        var y=evt.clientY+30
                        commentDiv.innerHTML="dia. "+numberWithCommas(km)+" km"
                        commentDiv.style.left=x+"px"
                        commentDiv.style.top=y+"px"
                        commentDiv.style.visibility="visible"




                     var t3=d3.transform(DragDot.attr("transform"))
                       var transX=t3.translate[0]
                      var transY=t3.translate[1]
                      dragDot.setAttribute("transform","translate("+(transX)+" "+transY+")")


                }

      }
      else if((LatLngPntSet==false)&& (DrawCircle==true||EditCircle==true))
        {

           	var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=activeElem.transform
			var transList=myTransListAnim.baseVal


        transformRequest.setTranslate(Pnt.x ,Pnt.y)
		transList.appendItem(transformRequest)
		transList.consolidate()


     	var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=dragDot.transform
			var transList=myTransListAnim.baseVal


        transformRequest.setTranslate(Pnt.x ,Pnt.y)
		transList.appendItem(transformRequest)
		transList.consolidate()



   }
    DrawX.attr("transform",ActiveElem.attr("transform"))



	}
}
//--mouse up---
var transObjX
var transObjY
function endDragCircle(evt)
{
	if(DraggingObj)
	{

		DraggingObj = false;

         var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]

        if(objDragTarget.getAttribute("id")=="dragDot")
        {
            var radius=parseFloat(ActiveElem.attr("r"))
          dragDot.setAttribute("transform","translate("+(transX)+" "+transY+")")
          dragDot.setAttribute("cx",radius)

        }
        else if(LatLngPntSet==false)
        {
              ActiveLL=PlanetProjection.invert([transX,transY])
             //---align drag with previous d3.event.translate---
            ActiveElemEndTrans=[SVGx,SVGy]
            var alignX=PrevPlanetTransX+(ActiveElemEndTrans[0]-ActiveElemStartTrans[0])/PlanetView.k
            var alignY=PrevPlanetTransY+(ActiveElemEndTrans[1]-ActiveElemStartTrans[1])/PlanetView.k
           PlanetZoom.translate([alignX,alignY])
        }






        objDragTarget=null
		  DraggingObj=false


    }


}


