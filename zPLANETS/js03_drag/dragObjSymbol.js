//----mouse down---
var DraggingObjSymbol = false
var objTransformRequestObjSymbol
var objTransListSymbol
var objDragTargetSymbol = null;
var ObjStartXSymbol
var ObjStartYSymbol
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragSymbol(evt)
{
    
    if(!DraggingObjSymbol &&addElemSymbolViz==true) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetSymbol = evt.target.parentNode

            if(objDragTargetSymbol)
        {

             
                    ActiveElemStartTrans=[SVGx,SVGy]
               UpdateThisSymbol=objDragTargetSymbol
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetSymbol.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetSymbol.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjSymbol = objDragTargetSymbol.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetSymbol.transform
            objTransListSymbol = myTransListAnim.baseVal

            ObjStartXSymbol = Pnt.x
            ObjStartYSymbol = Pnt.y

            DraggingObjSymbol = true

        }
    }
    else
        DraggingObjSymbol = false

}
//---mouse move---
function dragSymbol(evt)
{
    if(DraggingObjSymbol)
    {

        var pnt = objDragTargetSymbol.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetSymbol.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXSymbol;
        Pnt.y -= ObjStartYSymbol;

        objTransformRequestObjSymbol.setTranslate(Pnt.x, Pnt.y)
        objTransListSymbol.appendItem(objTransformRequestObjSymbol)
        objTransListSymbol.consolidate()

        var matrix = objDragTargetSymbol.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
        DrawX.attr("transform", "translate("+transX+" "+transY+")")










    }
}
//--mouse up---
function endDragSymbol(evt)
{
    if(DraggingObjSymbol)
    {
                 var t3=d3.transform(objDragTargetSymbol.getAttribute("transform"))
           var transX=t3.translate[0]
          var transY=t3.translate[1]






        if(LatLngPntSet==false)
        {
              ActiveLL=PlanetProjection.invert([transX,transY])
                          //---align drag with previous d3.event.translate---
            ActiveElemEndTrans=[SVGx,SVGy]
            var alignX=PrevPlanetTransX+(ActiveElemEndTrans[0]-ActiveElemStartTrans[0])/PlanetView.k
            var alignY=PrevPlanetTransY+(ActiveElemEndTrans[1]-ActiveElemStartTrans[1])/PlanetView.k
           PlanetZoom.translate([alignX,alignY])
        }


        DraggingObjSymbol = false;

        objDragTargetSymbol = null
        DraggingObjSymbol = false

       // updatePolygon()


    }
}
