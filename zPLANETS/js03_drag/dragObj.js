//----mouse down---
var DraggingObj=false
 var objTransformRequestObj
var objTransList
var objDragTarget=null;
var ObjStartX
var ObjStartY
var ActiveScale
//---mouse down over element---
function startDragObj(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot")
        {

            if(evt.target.parentNode.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTarget = evt.target.parentNode.parentNode; //--<g>---

             if(evt.target.nodeName=="polygon")//---symbol-
                	objDragTarget = evt.target.parentNode

             else if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
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




			objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTarget.transform
			objTransList=myTransListAnim.baseVal

			ObjStartX = Pnt.x
			ObjStartY = Pnt.y



			DraggingObj=true

            if(DrawOverlayImage==true)
			{
             DrawX.style("display","inline")


			}

		}
    }
	else
      	DraggingObj=false

}
//---mouse move---
function dragObj(evt)
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

           //---rescale radius to current scale----

            if(EditCircle==true)
            {
                var myScale=(Celestial.scale/View.k)
               radius=radius*(DrawCircleEditScale/myScale)

            }












        objTransformRequestObj.setTranslate(Pnt.x,0)
		objTransList.appendItem(objTransformRequestObj)
		objTransList.consolidate()


                objDragTarget.setAttribute("comment","dia: "+2*radius.toFixed(2))

            var x=evt.clientX
            var y=evt.clientY+30
            commentDiv.innerHTML="dia: "+2*radius.toFixed(2)
            commentDiv.style.left=x+"px"
            commentDiv.style.top=y+"px"
            commentDiv.style.visibility="visible"


        }
      }


     else if(objDragTarget.getAttribute("id")=="dragDot"&&(DrawRect==true||EditRect==true) )
     {
        var width=Pnt.x +parseFloat(ActiveElem.attr("width"))
        var height=Pnt.y +parseFloat(ActiveElem.attr("height"))
        if(width>0&& height>0)
        {
		objTransformRequestObj.setTranslate(Pnt.x ,Pnt.y )
		objTransList.appendItem(objTransformRequestObj)
		objTransList.consolidate()

          ActiveElem.attr("width",width)
          ActiveElem.attr("height",height)


            var cornerX=RectCorner[0]
            var cornerY=RectCorner[1]
            var wx=cornerX+width
            var wy=cornerY
            var hx=cornerX+height
            var hy=cornerY+height
            commentDiv.innerHTML=numberWithCommas(width)+" x "+numberWithCommas(height)
            commentDiv.style.left=SVGx+"px"
            commentDiv.style.top=SVGy+"px"
            commentDiv.style.visibility="visible"

                objDragTarget.setAttribute("comment",numberWithCommas(width)+" x "+numberWithCommas(height) )
            showStarComment(evt)


            var cw = addElemRectCw
            if(cw.drawRectStrokeRoundCheck.checked==true)
            {
               ActiveElem.attr("rx",5*parseFloat(ActiveElem.attr("stroke-width")))
                ActiveElem.attr("ry",5*parseFloat(ActiveElem.attr("stroke-width")))
            }

        }
      }
      else if( objDragTarget.getAttribute("id")!="dragDot")
      {
    	objTransformRequestObj.setTranslate(Pnt.x,Pnt.y)
	   objTransList.appendItem(objTransformRequestObj)
	   objTransList.consolidate()
        DrawX.attr("transform", ActiveElem.attr("transform"))


      }







       if(DrawOverlayImage==true||EditOverlayImage==true)
			{

             var bb=domWrapper.getBBox()
                DrawX.attr("transform","translate("+bb.x+" "+bb.y+")")



			}


  if(objDragTarget.getAttribute("id")!="dragDot")
        if(DrawCircle==true||EditCircle==true||DrawRect==true||EditRect==true)
        {

           	var transformRequestDot = document.getElementById("dragDot").ownerSVGElement.createSVGTransform()
			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=document.getElementById("dragDot").transform
			var transList=myTransListAnim.baseVal


        transformRequestDot.setTranslate(Pnt.x ,Pnt.y)
		transList.appendItem(transformRequestDot)
		transList.consolidate()


    var t3=d3.transform(ActiveElem.attr("transform"))
    var transX=t3.translate[0]
    var transY=t3.translate[1]

        DrawX.attr("transform", "translate("+transX+" "+transY+")")
        DragDot.attr("transform", "translate("+transX+" "+transY+")")



        }
        else
        {
              var t3=d3.transform(ActiveElem.attr("transform"))
    var transX=t3.translate[0]
    var transY=t3.translate[1]

               DrawX.attr("transform", "translate("+transX+" "+transY+")" )

        }



      /*
        if(EditCircle==true)
        {     var radius = parseFloat(ActiveElem.attr("r"))
             var myScale=(Celestial.scale/View.k)

           radius=radius*(DrawCircleEditScale/myScale)
             dragDot.setAttribute("cx",radius)


        }
     */

	}
}
//--mouse up---
var transObjX
var transObjY
function endDragObj(evt)
{
	if(DraggingObj)
	{

		DraggingObj = false;



         if(DrawOverlayImage==true)
			{
                 var transform=objDragTarget.getAttribute("transform")
		var trfm=d3.transform(transform)
            OverlayScaleX=trfm.scale[0]
            OverlayScaleY=trfm.scale[1]

        objDragTarget.setAttribute("overlayScaleX",trfm.scale[0])
        	 objDragTarget.setAttribute("overlayScaleY",trfm.scale[1])



			}


     if(SymbolPlantStart==true||EditPlanted)
	{
		activeElem.removeAttribute("transform")
       var size=parseInt(activeElem.getAttribute("size"),10)
	var scale=.33*size
    var transformRequestObj=domSVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setTranslate(SVGx,SVGy)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

    }
		  if(DrawText==true)
             	addElemTextCw.focusText()


         var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]

        if(objDragTarget.getAttribute("id")=="dragDot")
        {
            var radius=parseFloat(ActiveElem.attr("r"))

          dragDot.setAttribute("transform","translate("+(transX)+" "+transY+")")
          dragDot.setAttribute("cx",radius)

        }
        else
        {
             //Celestial.ActiveLL=LatLng
            //Celestial.LatLngSetPnt=Celestial.mapProjection([transX,transY])

        }

              Celestial.ActiveLL=Celestial.mapProjection.invert([transX,transY])




        objDragTarget=null
		  DraggingObj=false





    }
}




