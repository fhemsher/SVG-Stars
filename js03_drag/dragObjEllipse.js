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
function startDragEllipse(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot")
        {

             if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                	objDragTarget = evt.target
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
            else
            {
                  domWrapper.style.display="block"
                  domWrapper.appendChild(activeElem)
                  var bbx=domWrapper.getBBox().x
                  var bby=domWrapper.getBBox().y
                  var bbw=domWrapper.getBBox().width
                  var bbh=domWrapper.getBBox().height
                  var cx=bby+.5*bbw
                  var cy=bbh*.5*bbh
                  domActiveElemG.insertBefore(activeElem,dragDot)
              CentXY=[cx,cy]



              }


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
function dragEllipse(evt)
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



     if(objDragTarget.getAttribute("id")=="dragDot" &&(DrawEllipse==true||EditEllipse==true))
     {
               var radiusX=parseFloat(ActiveElem.attr("rx"))
              radiusX=(Pnt.x+radiusX)
               var radiusY=parseFloat(ActiveElem.attr("ry"))
              radiusY=(Pnt.y+radiusY)

        if(radiusX>0&&radiusY>0)
        {

                             ActiveElem.attr("rx",radiusX)
                             ActiveElem.attr("ry",radiusY)

                       //---rescale radius to current scale----





                    objTransformRequestObj.setTranslate(Pnt.x,Pnt.y)
            		objTransList.appendItem(objTransformRequestObj)
            		objTransList.consolidate()




                 var t3=d3.transform(ActiveElem.attr("transform"))
                       var transX=t3.translate[0]
                      var transY=t3.translate[1]
                   CentXY=[transX,transY]
            var centerLatLng=StarProjection.invert(CentXY)
            var wx=CentXY[0]+radiusX
            var wy=CentXY[1]
            var hx=CentXY[0]
            var hy=CentXY[1]+radiusY


                  var widthLatLng=StarProjection.invert([wx,wy])
                  var heightLatLng=StarProjection.invert([hx,hy])
            // lyX=xyDist(RectCorner,[wx,wy])
            //var lyY=xyDist(RectCorner,[hx,hy])

             var distWidthRads=d3.geo.distance(centerLatLng, widthLatLng)
            var parsecsWidth=(distWidthRads*180/Math.PI)*60
            var lyWidth=parsecsWidth*3.26156*2

             var distHeightRads=d3.geo.distance(centerLatLng, heightLatLng)
            var parsecsHeight=(distHeightRads*180/Math.PI)*60
            var lyHeight=parsecsHeight*3.26156*2

            commentDiv.innerHTML="w:"+numberWithCommas(lyWidth.toFixed(fixedVal))+" x h:"+numberWithCommas(lyHeight.toFixed(fixedVal)) +" ly"


                        var x=evt.clientX
                        var y=evt.clientY+30
                        //commentDiv.innerHTML="horiz(ly): "+lyX+"<br>vert(ly): "+lyY
                        commentDiv.style.top=y+"px"
                        commentDiv.style.left=x+"px"
                        commentDiv.style.visibility="visible"




                     var t3=d3.transform(DragDot.attr("transform"))
                       var transX=t3.translate[0]
                      var transY=t3.translate[1]
                      dragDot.setAttribute("transform","translate("+(transX)+" "+transY+")")


                }

      }
      else if((objDragTarget.getAttribute("id")=="activeElem"&&LatLngPntSet==false)&& (DrawEllipse==true||EditEllipse==true))
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
function endDragEllipse(evt)
{
	if(DraggingObj)
	{

		DraggingObj = false;

         var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]


        if(objDragTarget.getAttribute("id")=="activeElem"&&LatLngPntSet==false)
        {
              ActiveLL=StarProjection.invert([transX,transY])
                          //---align drag with previous d3.event.translate---
            ActiveElemEndTrans=[SVGx,SVGy]
            var alignX=PrevTransX+(ActiveElemEndTrans[0]-ActiveElemStartTrans[0])/StarView.k
            var alignY=PrevTransY+(ActiveElemEndTrans[1]-ActiveElemStartTrans[1])/StarView.k
            StarZoom.translate([alignX,alignY])
        }






        objDragTarget=null
		  DraggingObj=false


    }


}


