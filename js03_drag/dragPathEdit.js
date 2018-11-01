//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveElemStartTrans
var ActiveElemEndTrans


//---mouse down over element---
function startDragPath(evt)
{

    if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.parentNode.getAttribute("id")=="domActiveElemG")
        {

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj")//---all other elems--
                objDragTarget = evt.target.parentNode
        }
        if(objDragTarget)
        {
                ActiveElemStartTrans=[SVGx,SVGy]
            addNoSelectAtText()

            var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragPath(evt)
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

        var transformRequest = objDragTarget.ownerSVGElement.createSVGTransform()
        //---attach new or existing transform to element, init its transform list---
        var myTransListAnim = objDragTarget.transform
        var transList = myTransListAnim.baseVal

        transformRequest.setTranslate(Pnt.x, Pnt.y)
        transList.appendItem(transformRequest)
        transList.consolidate()
       

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragPath(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

               var t3=d3.transform(ActiveElem.attr("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]

        if(LatLngPntSet==false)
                {
                            ActiveLL=StarProjection.invert([transX,transY])
                                                    //---align drag with previous d3.event.translate---
                        ActiveElemEndTrans=[SVGx,SVGy]

                        var alignX=PrevTransX+(ActiveElemEndTrans[0]-ActiveElemStartTrans[0])/StarView.k
                        var alignY=PrevTransY+(ActiveElemEndTrans[1]-ActiveElemStartTrans[1])/StarView.k
                        StarZoom.translate([alignX,alignY])
                }


        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false


    }

}
