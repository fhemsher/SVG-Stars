//----mouse down---
var DraggingObj=false
 var objTransformRequestObj
var objTransList
var objDragTarget=null;
var ObjPlanetX
var ObjPlanetY
var ActiveScale
var ActiveElemPlanetTrans
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
                    ActiveElemPlanetTrans=[SVGx,SVGy]
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

			ObjPlanetX = Pnt.x
			ObjPlanetY = Pnt.y



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

		Pnt.x -= ObjPlanetX;
		Pnt.y -= ObjPlanetY;



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
            var centerLatLng=PlanetProjection.invert(CentXY)
            var wx=CentXY[0]+radiusX
            var wy=CentXY[1]
            var hx=CentXY[0]
            var hy=CentXY[1]+radiusY


                  var widthLatLng=PlanetProjection.invert([wx,wy])
                  var heightLatLng=PlanetProjection.invert([hx,hy])
            // lyX=xyDist(RectCorner,[wx,wy])
            //var lyY=xyDist(RectCorner,[hx,hy])


            // var km=(xyDist(CentXY,[CentXY[0]+radius,CentXY[1]])*2).toFixed(0)
             var kmX=(xyDist(CentXY,[CentXY[0]+radiusX,CentXY[0]])*2).toFixed(0)
             var kmY=(xyDist(CentXY,[CentXY[1]+radiusY,CentXY[1]])*2).toFixed(0)


            commentDiv.innerHTML="x dia.:"+numberWithCommas(kmX)+" km<br>y dia:"+numberWithCommas(kmY) +" km"


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
              ActiveLL=PlanetProjection.invert([transX,transY])
                          //---align drag with previous d3.event.translate---
            ActiveElemEndTrans=[SVGx,SVGy]
            var alignX=PrevPlanetTransX+(ActiveElemEndTrans[0]-ActiveElemPlanetTrans[0])/PlanetView.k
            var alignY=PrevPlanetTransY+(ActiveElemEndTrans[1]-ActiveElemPlanetTrans[1])/PlanetView.k
            PlanetZoom.translate([alignX,alignY])
        }






        objDragTarget=null
		  DraggingObj=false


    }


}


