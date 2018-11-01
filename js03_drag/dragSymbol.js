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
//---mouse down over element---
function startDragSymbol(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.parentNode.getAttribute("id")=="activeElem")
        {
            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTarget = evt.target.parentNode

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
function dragSymbol(evt)
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


    	objTransformRequestObj.setTranslate(Pnt.x,Pnt.y)
	   objTransList.appendItem(objTransformRequestObj)
	   objTransList.consolidate()
        var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
           var transY=t3.translate[1]

       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}

function endDragSymbol(evt)
{
	if(DraggingObj)
	{

		DraggingObj = false;





         var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]
           ActiveLL=StarProjection.invert([transX,transY])

             //---align drag with previous d3.event.translate---
            ActiveElemEndTrans=[SVGx,SVGy]
            var alignX=PrevTransX+(ActiveElemEndTrans[0]-ActiveElemStartTrans[0])/StarView.k
            var alignY=PrevTransY+(ActiveElemEndTrans[1]-ActiveElemStartTrans[1])/StarView.k
            StarZoom.translate([alignX,alignY])
            StarProjection.translate([alignX,alignY])



        objDragTarget=null
		  DraggingObj=false





    }
}




