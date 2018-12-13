// fired at cursorLoc.js---
function trackDrawPathEdit()
{
    if(!Dragging)
    {
        var cw = addElemPathEditCw
        activeElem = document.getElementById("activeElem") //--for edit---
        var currentPoints = activeElem.getAttribute("d");

        // NextX=SVGx;
        //NextY=SVGy;

        var pnt = planetSVG.createSVGPoint();
        pnt.x = SVGx
        pnt.y = SVGy
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = domActiveElemG.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        NextX = Pnt.x
        NextY = Pnt.y

        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        if(currentPoints.indexOf("Z")==-1)
            var lastSeg = pathSegs.getItem(segs-1)
            else
                var lastSeg = pathSegs.getItem(segs-2)

                var lastX = lastSeg.x
                var lastY = lastSeg.y

                //---rightAngle---
                if(cw.drawPathEditRightAngleCheck.checked==true)
            {
                var xDiff = Math.abs(lastX-SVGx);
                var yDiff = Math.abs(lastY-SVGy);
                if(xDiff>yDiff)NextY = lastY;
                if(yDiff>xDiff)NextX = lastX;
            }
            if(RubberLine)
        {
            rubberLine.setAttribute("x2", SVGx)
            rubberLine.setAttribute("y2", SVGy)

        }
        SegNextX = NextX
        SegNextY = NextY
        if(PathClosedEdit==false)
        {
            //var svgPnt=L.point(SVGx,SVGy)
            //var mapLatLng=MyMap.layerPointToLatLng(svgPnt)
            //var mapLat=mapLatLng.lat.toFixed(4)
            //var mapLng=mapLatLng.lng.toFixed(4)

        }
    }

}

//---double click on element to open iframe---

var elemObjEdit
function startPathDrawEdit(elemObj)
{        
    if(Mobile==false)
    {
        var createdBy = elemObj.getAttribute("createdBy")
        if(oEMAIL==createdBy)
        {

            elemObjEdit = elemObj

            DrawPathEditId = elemObjEdit.getAttribute("id")

            //elemObjEdit.removeAttribute("onmouseover")
            //elemObjEdit.removeAttribute("onmouseout")
            commentDiv.style.visibility = "hidden"
            coverOn()

            if(addElemPathEditLoad==false)
                openIframe("AddElem", "addElemPathEdit", 10)
                else
                {
                    openIframe("AddElem", "addElemPathEdit", 10)
                    editAddPathElem(elemObjEdit)
                }
        }

    }
}

//================EDIT======================
var EditObj
var DrawPathEdit = false

var DrawPathEditId
var DrawPathEditObj
var CurrentPathArrow //--existing arrow id---
var PathDeleted = false
var EditBBCoords
//---fired after frame loaded, via sendSize(), or cancel edit ---
function editAddPathElem(elemObjEdit)
{
    DrawPathEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--
  
    PathDeleted = false
    DrawPathEdit = false
    NewEndArrow = null
    planetSVG.removeAttribute('onclick')
    window.addEventListener("keypress", keyPressPathEdit, false);
    //---attach point drag to planetSVG---
    planetSVG.setAttribute("onmousedown", "startDragEdit(evt)")
    planetSVG.setAttribute("onmousemove", "dragEdit(evt)")
    planetSVG.setAttribute("onmouseup", "endDragEdit()")
    var cw = addElemPathEditCw

    cw.smoothPathEditButton.disabled = false
    cw.drawPathEditCancelButton.disabled = false

    cw.drawPathEditCancelButton.title = "cancel these changes"
    cw.drawPathEditFinishButton.disabled = false

    //---set values in selections and drag points,etc.
    var fill = elemObjEdit.getAttribute("fill")
    var fillOpacity = elemObjEdit.getAttribute("fill-opacity")
    cw.drawPathEditFillBg.style.background=fill

    var stroke = elemObjEdit.getAttribute("stroke")
    cw.drawPathEditStrokeBg.style.background=stroke
    var strokeWidth = elemObjEdit.getAttribute("stroke-width")
    var dash = elemObjEdit.getAttribute("stroke-dasharray")
    var rightAngle = elemObjEdit.getAttribute("rightAngle")
    var arrow = elemObjEdit.getAttribute("marker-end")
    DrawPathType = elemObjEdit.getAttribute("type")
    if(elemObjEdit.getAttribute("comment"))
    {
        cw.drawPathEditCommentValue.value = xml2txt(elemObjEdit.getAttribute("comment"))

    }


            setSelect("Path", "Fill", fill, true)
            setSelect("Path", "FillOpacity", fillOpacity, true)
            setSelect("Path", "Stroke", stroke, true)
            setSelect("Path", "StrokeWidth", strokeWidth, true)
            // setSelect("Path","Smooth",type,true)
        if(rightAngle=="true")
            cw.drawPathEditRightAngleCheck.checked=true
          else
            cw.drawPathEditRightAngleCheck.checked=false


            if(dash)
            cw.drawPathEditStrokeDashCheck.checked = true
            if(arrow)
        {//---url(#arrowHex)---
            var urlId = arrow.split("url(#")[1].replace(/\)/, "")
            CurrentPathArrow = urlId
            cw.drawPathEditStrokeArrowCheck.checked = true
        }

        setActivePathEdit()

        return false

}

function setActivePathEdit()
{

    var cw = addElemPathEditCw
    var elemObjEdit = document.getElementById(DrawPathEditId)

    if(DrawPathType=="linear")
    {
        EditObj = elemObjEdit.cloneNode(true)
        EditObj.setAttribute("id", "activeElem")

        domActiveElemG.appendChild(EditObj)
    }
    else //---smooth path--
    {
        var pathSmooth = elemObjEdit.cloneNode(true)
        pathSmooth.removeAttribute("class")
        // pathSmooth.removeAttribute("transform")
        pathSmooth.setAttribute("id", "drawPathSmooth")
        pathSmooth.removeAttribute("onmousedown")
        pathSmooth.removeAttribute("ondblclick")
        pathSmooth.removeAttribute("onmouseover")
        pathSmooth.removeAttribute("onmouseout")

        domActiveElemG.appendChild(pathSmooth)
        DrawPathEditSmooth = d3.select("#drawPathSmooth")

        var straightPath = elemObjEdit.cloneNode(true)
        // straightPath.removeAttribute("transform")
        var linearD = elemObjEdit.getAttribute("linearD")
        straightPath.setAttribute("d", linearD)
        straightPath.setAttribute("stroke-opacity", .3)
        EditObj = straightPath
        EditObj.setAttribute("id", "activeElem")
        // domActiveElemG.setAttribute("transform", elemObjEdit.getAttribute("transform")   )
        domActiveElemG.appendChild(EditObj)

    }
    EditObj.removeAttribute("onmousedown")
    EditObj.removeAttribute("ondblclick")
    EditObj.removeAttribute("onmouseover")
    EditObj.removeAttribute("onmouseout")
    EditObj.removeAttribute("class")
    //EditObj.removeAttribute("transform")

    elemObjEdit.style.display = "none"

    activeElem = document.getElementById("activeElem")
    ActiveElem = d3.select("#activeElem")
  var t3 = d3.transform(ActiveElem.attr("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]
    ActiveLL = PlanetProjection.invert([transX, transY])

    ActiveScale = parseFloat(EditObj.getAttribute("myScale"))
    var bbCoords = EditObj.getAttribute("bbCoords").split(",")
    EditBBCoords =[parseFloat(bbCoords[0]), parseFloat(bbCoords[1])]
    domActiveElemG.setAttribute("transform", PlanetPoint(EditBBCoords)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")")
    editThisPath()

}
function editThisPath()
{
    if(DrawPathEdit==false)
    {

        var cw = addElemPathEditCw

        //---attach point drag to planetSVG---
        //planetSVG.setAttribute("onmousedown","startDragEdit(evt)")
        //planetSVG.setAttribute("onmousemove","dragEdit(evt)")
        //planetSVG.setAttribute("onmouseup","endDragEdit()")

        var stroke = EditObj.getAttribute("stroke")
        var strokeWidth = EditObj.getAttribute("stroke-width")

        //----rebuild---
        PathPointArray =[]
        PathLLArray =[]
        var segList = EditObj.pathSegList
        var segs = segList.numberOfItems
        for(var k = 0; k<segs; k++)
        {
            var segObj = segList.getItem(k)

            if(segObj.x && segObj.y)
            {

                var pnt = planetSVG.createSVGPoint();
                pnt.x = segObj.x
                pnt.y = segObj.y
                var sCTM = activeElem.getScreenCTM();
                var Pnt = pnt.matrixTransform(sCTM.inverse());

                PathPointArray.push([segObj.x, segObj.y])
                var ll = PlanetProjection.invert([Pnt.x, Pnt.y])
                PathLLArray.push(ll)
                if(k==0)
                    ActivePoint = ll

            }

        }
        Point = PathPointArray.length-1
        TwoPlusPointsSet = true
        var x0, y0
        DragCircleG = ActiveElemG.append("g")
        .attr("id", "dragCircleG")
        .attr("transform", ActiveElem.attr("transform"))

        dragCircleG.appendChild(domDrawX)
        DrawX.style("display", "inline")
        DrawX.attr("stroke", "orange")
        DrawX.attr("transform", "translate("+PathPointArray[0][0]+" "+PathPointArray[0][1]+")")
        //---build Rubberline----
        RubberLine = ActiveElemG.append("line")
        .attr("id", "rubberLine")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("marker-end", "url(#endArrow)")
        .style("visibility", "hidden")

        /*
    var t3=d3.transform(ActiveElem.attr("transform"))
    var xtr=t3.translate[0]
    var ytr=t3.translate[1]
  tfm("dragCircleG",0,0,1)
  */

        for(var k = 0; k<PathPointArray.length; k++)
        {
            var circle = document.createElementNS(NS, "circle")
            var transX = PathPointArray[k][0]
            var transY = PathPointArray[k][1]
            circle.setAttribute("id", "dragPnt"+k)
            circle.setAttribute("cx", 0)
            circle.setAttribute("cy", 0)
            circle.setAttribute("transform", "translate("+transX+" "+transY+")")
            circle.setAttribute("r", 20)
            circle.setAttribute("opacity", ".6")
            if(k==0)
                circle.setAttribute("fill", "lime")
                else
                    circle.setAttribute("fill", "white")

                    circle.setAttribute("stroke", "black")
                    circle.setAttribute("stroke-width", "1")
                    circle.setAttribute("Point", k)
                    circle.setAttribute("class", "dragTarget")
                    circle.setAttribute("style", "cursor:move")
                    //circle.setAttribute("onmousedown","StopStarZoom=true")
                    //circle.setAttribute("onmouseup","StopStarZoom=false")
                    dragCircleG.appendChild(circle)

                    if(k==0)
                {
                    x0 = transX
                    y0 = transY
                }
        }
        //  activeElem.appendChild(domDrawX)

        if(EditObj.getAttribute("rightAngle")=="true")
            cw.drawPathEditRightAngleCheck.checked = true

            if(EditObj.getAttribute("d").indexOf("Z")!=-1)
        {
            PathClosed = true
            PathDecoupled = true;
            cw.drawPathEditEncloseButton.innerText = "reopen [E]"
            cw.drawPathEditPauseButton.disabled = true
            cw.drawPathEditUndoButton.disabled = true
        }
        else
        {
            cw.drawPathEditUndoButton.disabled = false

            cw.drawPathEditPauseButton.disabled = false
            pauseDrawPathEdit()
        }
        cw.drawPathEditEncloseButton.disabled = false

        PausePathPoint = document.getElementById("dragPnt"+Point)
        var x = PathPointArray[Point][0]
        var y = PathPointArray[Point][1]
        var pnt = planetSVG.createSVGPoint();
        pnt.x = x
        pnt.y = y
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = PausePathPoint.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        RubberLine.attr("x1", x)
        RubberLine.attr("y1", y)

        DrawPathEdit = true
        if(DrawPathType!="linear")
        {
            cw.smoothPathEditButton.innerText = "linear[S]"

            activeElem.setAttribute("fill", "none")
            activeElem.setAttribute("fill-opacity", "0")

            if(PathClosed==true)
            {
                var d = DrawPathEditSmooth.attr("d")+"z"
                DrawPathEditSmooth.attr("d", d)
            }

        }


        /*
   ActiveElem.datum({type: "LineString", coordinates:PathLLArray})
    .attr("d", StarMap)
        d3.select("#drawPathSmooth")
            .attr("transform", StarPoint(EditBBCoords) )

   //       d3.select("#drawPathSmooth").attr('d',ActiveElem.attr("d"))
   // d3.select("#drawPathSmooth").attr('d', d3.svg.line().interpolate(DrawPathType));


     // planetRedraw()
  */

        coverOn()
        return false
    }
}
//----each mouse click fired from the SVG---
function clickNextPathPointEdit()
{
    var cw = addElemPathEditCw
    Point++;

    var pnt = planetSVG.createSVGPoint();
    pnt.x = SVGx
    pnt.y = SVGy
    //---elements in different(svg) viewports, and/or transformed ---
    var sCTM = activeElem.getScreenCTM();
    var Pnt = pnt.matrixTransform(sCTM.inverse());

    nextX = Pnt.x
    nextY = Pnt.y
    //---rightAngle---
    if(cw.drawPathEditRightAngleCheck.checked==true)
    {
        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        var lastSeg = pathSegs.getItem(segs-1)
        var lastX = lastSeg.x
        var lastY = lastSeg.y

        var xDiff = Math.abs(lastX-SVGx);
        var yDiff = Math.abs(lastY-SVGy);
        if(xDiff>yDiff)nextY = lastY;
        if(yDiff>xDiff)nextX = lastX;
    }
    //---place a drag circle at each point--

    var circle = document.createElementNS(NS, "circle")
    circle.setAttribute("id", "dragPnt"+Point)
    circle.setAttribute("cx", 0)
    circle.setAttribute("cy", 0)
    circle.setAttribute("transform", "translate("+nextX+" "+nextY+")")
    circle.setAttribute("r", 8)
    circle.setAttribute("opacity", ".6")
    circle.setAttribute("fill", "white")
    circle.setAttribute("stroke", "black")
    circle.setAttribute("stroke-width", "1")
    circle.setAttribute("Point", Point)
    circle.setAttribute("class", "dragTarget")
    circle.setAttribute("style", "cursor:move")
    circle.setAttribute("onmousedown", "StopPlanetZoom=true")
    circle.setAttribute("onmouseup", "StopPlanetZoom=false")

    dragCircleG.appendChild(circle)

    RubberLine.attr("x1", nextX);
    RubberLine.attr("y1", nextY);
    PathPointArray.push([nextX, nextY])
    PathLLArray.push(LatLng)

    if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        createPathEditArrow()
        activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
    }

    SegSetX = nextX
    SegSetY = nextY
    var pathSegL = activeElem.createSVGPathSegLinetoAbs(nextX, nextY)
    activeElem.pathSegList.appendItem(pathSegL)
    //--update
    var d = activeElem.getAttribute("d")
    //ActiveElem.attr("d",d)

    if(TwoPlusPointsSet==false)
        cw.drawPathEditFinishButton.disabled = false
        else if(TwoPlusPointsSet==true)
            cw.drawPathEditEncloseButton.disabled = false

            TwoPlusPointsSet = true;

    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditFinishButton.disabled = false

    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditFinishButton.disabled = false
    if(Point>1)
        cw.drawPathEditEncloseButton.disabled = false

}

var DrawPathType = 'linear'
var DrawPathEditSmooth
function drawPathEditSmoothSelected()
{
    var cw = addElemPathEditCw
    var currentType = DrawPathType

    var fillOpacity = cw.drawPathEditFillOpacitySelect.options[cw.drawPathEditFillOpacitySelect.selectedIndex].value
    var fillColor = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
    var strokeWidth = cw.drawPathEditStrokeWidthSelect.options[cw.drawPathEditStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    if(currentType=="basis")
    {
        if(document.getElementById("drawPathSmooth"))
            domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))
            activeElem.removeAttribute("stroke-opacity")
            DrawPathType = "linear"
            cw.smoothPathEditButton.innerHTML = "smooth[S]"
    }
    else if(currentType=="linear")
    {
        var data = PathPointArray
        var smoothPath = activeElem.cloneNode(true)
        smoothPath.setAttribute("id", "drawPathSmooth")
        domActiveElemG.insertBefore(smoothPath, activeElem)
        DrawPathEditSmooth = d3.select("#drawPathSmooth")
        DrawPathEditSmooth.data([data])
        .attr("fill", "none")
        .attr('d', d3.svg.line().interpolate("basis"));

        activeElem.setAttribute("stroke-opacity", '.5')

        DrawPathType = "basis"
        cw.smoothPathEditButton.innerHTML = "linear[S]"
        if(cw.drawPathEditStrokeDashCheck.checked==true)
            DrawPathEditSmooth.attr("stroke-dasharray", "8 4")
            if(cw.drawPathEditStrokeArrowCheck.checked==true)
        {
            // if(CurrentPathArrow)
            //   var url="url(#"+CurrentPathArrow+")"
            //  else
            var url = "url(#"+EndArrowId+")"

            DrawPathEditSmooth.attr("marker-end", url)

        }

        if(PathClosedEdit==true)
        {
            var d = DrawPathEditSmooth.attr("d")+"Z"
            DrawPathEditSmooth.attr("d", d)
        }

    }
    if(ActiveElem)
    {
        ActiveElem.attr("type", DrawPathType)
        ActiveElem.attr("linearD", ActiveElem.attr("d"))
        ActiveElem.attr("opacity", ".3")
    }

}
function showDrawPathEditFillBg()
{
    var cw = addElemPathEditCw
    var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawPathEditFillBg.style.backgroundColor = fill
        else
            cw.drawPathEditFillBg.style.backgroundColor = ""

            if(ActiveElem)
            {

              if(fill=="none")
              {
                  activeElem.setAttribute("fill-opacity", 0)

              }
               activeElem.setAttribute("fill", fill)


            }



        if(DrawPathType!="linear")
        {
             if(fill=="none")
                {
                DrawPathEditSmooth.setAttribute("fill-opacity", 0)

                }
                DrawPathEditSmooth.attr("fill", fill)
             ActiveElem.attr("fill", "none")
        }

}

function drawPathEditFillSelected()
{
    var cw = addElemPathEditCw
    var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
        cw.drawPathEditFillBg.style.background=fill
    var fillOpacity = cw.drawPathEditFillOpacitySelect.options[cw.drawPathEditFillOpacitySelect.selectedIndex].value


    if(ActiveElem)
    {
       if(DrawPathType!="linear")
       {
          DrawPathEditSmooth.attr("fill", fill)
          DrawPathEditSmooth.attr("fill-opacity", fillOpacity)
       }
       else
       {
            activeElem.setAttribute("fill", fill)
            activeElem.setAttribute("fill-opacity", fillOpacity)

        }


       if(fill=="none")
       {
            if(DrawPathType!="linear")
            {
            DrawPathEditSmooth.attr("fill-opacity", 0)
            DrawPathEditSmooth.attr("fill", "white")

            }
        else
       {

            activeElem.setAttribute("fill-opacity", 0)
            activeElem.setAttribute("fill", "white")
            }

       }
    }
}

function drawPathEditFillOpacitySelected()
{
    var cw = addElemPathEditCw
    var fillOpacity = cw.drawPathEditFillOpacitySelect.options[cw.drawPathEditFillOpacitySelect.selectedIndex].value

    if(ActiveElem)
    {

       if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("fill-opacity", fillOpacity)
        else
        activeElem.setAttribute("fill-opacity", fillOpacity)
    }
}


function showDrawPathEditStrokeBg()
{
    var cw = addElemPathEditCw
    var stroke = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPathEditStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPathEditStrokeBg.style.backgroundColor = ""

            if(ActiveElem)
            activeElem.setAttribute("stroke", stroke)

            if(cw.drawPathEditStrokeArrowCheck.checked==true)
        {
            drawPathEditStrokeArrowChecked()

        }
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("stroke", stroke)
}

function drawPathEditStrokeSelected()
{
    var cw = addElemPathEditCw
    var stroke = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value

    if(ActiveElem)
        activeElem.setAttribute("stroke", stroke)

        if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        drawPathEditStrokeArrowChecked()
        if(ActiveElem)
            activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("marker-end", "url(#"+EndArrowId+")")
    }

}

function drawPathEditStrokeWidthSelected()
{
    var cw = addElemPathEditCw
    var strokeWidth = cw.drawPathEditStrokeWidthSelect.options[cw.drawPathEditStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        activeElem.setAttribute("stroke-width", strokeWidth)
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("stroke-width", strokeWidth)
}

function drawPathEditStrokeDashChecked()
{
    var cw = addElemPathEditCw
    if(cw.drawPathEditStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            activeElem.setAttribute("stroke-dasharray", "8 4")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("stroke-dasharray", "8 4")
    }
    else
    {
        if(ActiveElem)
            activeElem.setAttribute("stroke-dasharray", null)
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("stroke-dasharray", null)
    }
}

function drawPathEditStrokeArrowChecked()
{
    var cw = addElemPathEditCw
    if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        createPathEditArrow()

        if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("marker-end", "url(#"+EndArrowId+")")

            if(ActiveElem)
            activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")

    }
    else
    {
        if(ActiveElem)
            activeElem.setAttribute("marker-end", null)
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("marker-end", null)
    }
}

//---create and/or changes arrow id=pathArrow for this path--
function createPathEditArrow()
{
    var cw = addElemPathEditCw
    var strokeColor = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    var colorHex = strokeColor.replace("#", "")
    EndArrowId = "arrow"+colorHex
    if(!document.getElementById(EndArrowId))
    {
        //---does an arrow have same fill color?--
        var found = false
        var arrows = arrowDefs.childNodes
        for(var k = 0; k<arrows.length; k++)
        {
            var fill = arrows.item(k).getAttribute("fill")
            var fillHex = fill.replace("#", "")
            arrows.item(k).setAttribute("id", "arrow"+fillHex)
            if(fill==strokeColor)
            {NewEndArrow = false
                found = true
                break
            }
        }
        if(found==false)
        {
            var addArrow = cloneArrow.cloneNode(true)
            addArrow.setAttribute("id", EndArrowId)
            addArrow.setAttribute("fill", strokeColor)
            arrowDefs.appendChild(addArrow)
            NewEndArrow = true

        }
    }

}

//=====================DELETE PATH==========================

//---button---
function deleteDrawPathEdit()
{

    for(var k = 0; k<AddPathBBCoordsArray.length; k++)
    {
        var addElemId = AddPathBBCoordsArray[k][2]
        if(addElemId==DrawPathEditId)
        {
            AddPathBBCoordsArray.splice(k, 1)
            break;
        }
    }

    var cw = addElemPathEditCw
    var deleteMe = document.getElementById(DrawPathEditId)

    deletePath(DrawPathEditId)

    closeIframe("addElemPathEdit")
    closeDrawPathEdit()
}

function deletePath(DrawPathEditId)
{

    var deleteMe = document.getElementById(DrawPathEditId)

    PathDeleted = true

    domAddPathG.removeChild(deleteMe)

    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawPathEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Path/deletePath.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

function rotatePathEditAdjust(factor)
{
    var cw = addElemPathEditCw
    var mult = parseFloat(cw.rotateDrawPathEditAdjustSelect.options[cw.rotateDrawPathEditAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePathEditValue.value = rotateAdd+parseFloat(cw.adjustedRotatePathEditValue.value)

    if(ActiveElem)
    {

        rote("domDrawX", rotateAdd)

        var t3r = d3.transform(DrawX.attr("transform"))

        var cx = t3r.translate[0]
        var cy = t3r.translate[1]

        var domElem = document.getElementById("domActiveElemG")
        var transformRequestObj = planetSVG.createSVGTransform()
        var animTransformList = domElem.transform
        var transformList = animTransformList.baseVal
        transformRequestObj.setRotate(rotateAdd, cx, cy)
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        var t3r = d3.transform(domElem.getAttribute("transform"))

        RotateAngle = t3r.rotate

    }
}
//---------------------DRAG PATH================================

function dragPathChecked()
{
    var cw = addElemPathEditCw

    if(cw.dragPathCheck.checked)
    {
        planetSVG.setAttribute("onmousedown", "startDragPath(evt)")
        planetSVG.setAttribute("onmousemove", "dragPath(evt)")
        planetSVG.setAttribute("onmouseup", "endDragPath(evt)")

        domActiveElemG.setAttribute("class", "dragTargetObj")
          if(DrawPathType=="basis")
            drawPathSmooth.style.cursor = "move"
          else
            activeElem.style.cursor = "move"//("cursor","move")

        dragCircleG.setAttribute("visibility", "hidden")
    }
    else
    {
        planetSVG.setAttribute("onmousedown", "startDragEdit(evt)")
        planetSVG.setAttribute("onmousemove", "dragEdit(evt)")
        planetSVG.setAttribute("onmouseup", "endDragEdit(evt)")

        domActiveElemG.removeAttribute("class")
        if(DrawPathType=="basis")
            drawPathSmooth.style.cursor = ""
        else
            activeElem.style.cursor = ""//("cursor","move")
        dragCircleG.setAttribute("visibility", "")
    }

}

function dragDrawPathEditFinish()
{
    if(ActiveElem)
    {
        PathPointArray =[]
        var sCTM = activeElem.getCTM()
        var svgRoot = activeElem.ownerSVGElement

        var segList = activeElem.pathSegList
        var segs = segList.numberOfItems
        //---change segObj values
        for(var k = 0; k<segs; k++)
        {
            var segObj = segList.getItem(k)

            if(segObj.x && segObj.y)
            {
                var planetSVGPoint = svgRoot.createSVGPoint();
                planetSVGPoint.x = segObj.x
                planetSVGPoint.y = segObj.y
                planetSVGPointTrans = planetSVGPoint.matrixTransform(sCTM)
                segObj.x = planetSVGPointTrans.x
                segObj.y = planetSVGPointTrans.y
                PathPointArray.push([segObj.x, segObj.y])
            }

            if(segObj.x1 && segObj.y1)
            {
                var planetSVGPoint1 = svgRoot.createSVGPoint();
                planetSVGPoint1.x = segObj.x1
                planetSVGPoint1.y = segObj.y1
                planetSVGPointTrans1 = planetSVGPoint1.matrixTransform(sCTM)
                segObj.x1 = planetSVGPointTrans1.x
                segObj.y1 = planetSVGPointTrans1.y
                PathPointArray.push([segObj.x1, segObj.y1])
            }
            if(segObj.x2 && segObj.y2)
            {
                var planetSVGPoint2 = svgRoot.createSVGPoint();
                planetSVGPoint2.x = segObj.x2
                planetSVGPoint2.y = segObj.y2
                planetSVGPointTrans2 = planetSVGPoint2.matrixTransform(sCTM)
                segObj.x2 = planetSVGPointTrans2.x
                segObj.y2 = planetSVGPointTrans2.y
                PathPointArray.push([segObj.x2, segObj.y2])
            }
        }

        activeElem.removeAttribute("transform")

        DrawX.attr("transform", "translate("+PathPointArray[0][0]+" "+PathPointArray[0][1]+")")

        var circles = dragCircleG.childNodes
        var pntCnt = 0
        for(var k = 0; k<circles.length; k++)
        {
            if(circles.item(k).getAttribute("class")=="dragTarget")
            {
                var pnt = PathPointArray[pntCnt++]

                circles.item(k).setAttribute("transform", "translate("+pnt[0]+","+pnt[1]+")")

            }

        }

        if(DrawPathType!="linear")
        {
            var sCTM = drawPathEditSmooth.getCTM()
            var svgRoot = drawPathEditSmooth.ownerSVGElement

            var segList = drawPathEditSmooth.pathSegList
            var segs = segList.numberOfItems
            //---change segObj values
            for(var k = 0; k<segs; k++)
            {
                var segObj = segList.getItem(k)

                if(segObj.x && segObj.y)
                {
                    var planetSVGPoint = svgRoot.createSVGPoint();
                    planetSVGPoint.x = segObj.x
                    planetSVGPoint.y = segObj.y
                    planetSVGPointTrans = planetSVGPoint.matrixTransform(sCTM)
                    segObj.x = planetSVGPointTrans.x
                    segObj.y = planetSVGPointTrans.y
                    //PathPointArray.push([segObj.x, segObj.y])
                }

                if(segObj.x1 && segObj.y1)
                {
                    var planetSVGPoint1 = svgRoot.createSVGPoint();
                    planetSVGPoint1.x = segObj.x1
                    planetSVGPoint1.y = segObj.y1
                    planetSVGPointTrans1 = planetSVGPoint1.matrixTransform(sCTM)
                    segObj.x1 = planetSVGPointTrans1.x
                    segObj.y1 = planetSVGPointTrans1.y
                    //PathPointArray.push([segObj.x1, segObj.y1])
                }
                if(segObj.x2 && segObj.y2)
                {
                    var planetSVGPoint2 = svgRoot.createSVGPoint();
                    planetSVGPoint2.x = segObj.x2
                    planetSVGPoint2.y = segObj.y2
                    planetSVGPointTrans2 = planetSVGPoint2.matrixTransform(sCTM)
                    segObj.x2 = planetSVGPointTrans2.x
                    segObj.y2 = planetSVGPointTrans2.y
                    //PathPointArray.push([segObj.x2, segObj.y2])
                }
            }

            drawPathEditSmooth.removeAttribute("transform")

        }

    }
}
