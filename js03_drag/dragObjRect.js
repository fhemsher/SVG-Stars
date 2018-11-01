//----mouse down---
var DraggingObj=false
 var objTransformRequestObj
var objTransList
var objDragTarget=null;
var ObjStartX
var ObjStartY
var ActiveScale
var RectUL=[]
//---mouse down over element---
function startDragRect(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.getAttribute("id")=="activeRect" || evt.target.getAttribute("id")=="dragDot")
        {

                if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---g--

               if( evt.target.getAttribute("id")=="dragDot")
                objDragTarget = evt.target
                else
                  objDragTarget = evt.target.parentNode

         }
       if(objDragTarget)
	   {



  		var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = SVGx;
		pnt.y = SVGy;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());


               //---used for align of projection/zoom on end drag---
              if(objDragTarget.getAttribute("id")=="activeElem")
              {
                  ActiveElemStartTrans=[SVGx,SVGy]



              }
              else
              {
                  domWrapper.style.display="block"
                  domWrapper.appendChild(activeElem)
                  var x=domWrapper.getBBox().x
                  var y=domWrapper.getBBox().y
                           domActiveElemG.appendChild(activeElem)
              RectUL=[x,y]



              }


			objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTarget.transform
			objTransList=myTransListAnim.baseVal

			ObjStartX = Pnt.x
			ObjStartY = Pnt.y



			DraggingObj=true

             //DrawX.style("display","inline")
             //DragDot.style("display","inline")


		}
    }
	else
      	DraggingObj=false

}
//---mouse move---
function dragRect(evt)
{
	if(DraggingObj)
	{

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = SVGx;
		pnt.y = SVGy;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartX;
		Pnt.y -= ObjStartY;




     if(objDragTarget.getAttribute("id")=="dragDot")
     {
        var width=Pnt.x +parseFloat(ActiveRect.attr("width"))
        var height=Pnt.y +parseFloat(ActiveRect.attr("height"))
        if(width>0&& height>0)
        {
		objTransformRequestObj.setTranslate(Pnt.x ,Pnt.y )
		objTransList.appendItem(objTransformRequestObj)
		objTransList.consolidate()

          ActiveRect.attr("width",width)
          ActiveRect.attr("height",height)


                 var t3=d3.transform(ActiveElem.attr("transform"))
                       var transX=t3.translate[0]
                      var transY=t3.translate[1]
                   cornerXY=[transX,transY]
            var cornerX=cornerXY[0]
            var cornerY=cornerXY[1]

            var cornerLatLng=StarProjection.invert(cornerXY)
            var wx=cornerX+width
            var wy=cornerY
            var hx=cornerX
            var hy=cornerY+height
                  var widthLatLng=StarProjection.invert([wx,wy])
                  var heightLatLng=StarProjection.invert([hx,hy])
            // lyX=xyDist(RectCorner,[wx,wy])
            //var lyY=xyDist(RectCorner,[hx,hy])

             var distWidthRads=d3.geo.distance(cornerLatLng, widthLatLng)
            var parsecsWidth=(distWidthRads*180/Math.PI)*60

            var lyWidth=(parsecsWidth*3.26156).toFixed(fixedVal)

             var distHeightRads=d3.geo.distance(cornerLatLng, heightLatLng)
            var parsecsHeight=(distHeightRads*180/Math.PI)*60
            var lyHeight=(parsecsHeight*3.26156).toFixed(fixedVal)

            commentDiv.innerHTML="w:"+numberWithCommas(lyWidth)+" x h:"+numberWithCommas(lyHeight) +" ly"


            commentDiv.style.left=RectUL[0]+"px"
            commentDiv.style.top=RectUL[1]+30+"px"
            commentDiv.style.visibility="visible"




            var cw = addElemRectCw
            if(cw.drawRectStrokeRoundCheck.checked==true)
            {
               ActiveRect.attr("rx",5*parseFloat(ActiveRect.attr("stroke-width")))
                ActiveRect.attr("ry",5*parseFloat(ActiveRect.attr("stroke-width")))
            }

        }
      }
      else if (objDragTarget.getAttribute("id")!="dragDot")
      {
    	objTransformRequestObj.setTranslate(Pnt.x,Pnt.y)
	   objTransList.appendItem(objTransformRequestObj)
	   objTransList.consolidate()
        DrawX.attr("transform", ActiveElem.attr("transform"))


      }


	}
}
//--mouse up---
var transObjX
var transObjY
function endDragRect(evt)
{
	if(DraggingObj)
	{

		DraggingObj = false;



           if(objDragTarget.getAttribute("id")=="activeElem")
           {
               var t3=d3.transform(ActiveElem.attr("transform"))
               var transX=t3.translate[0]
              var transY=t3.translate[1]
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




