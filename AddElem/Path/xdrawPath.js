// fired at cursorLoc.js---
function trackDrawPath()
{if
    (ActiveElem==null&&DrawPathStart==true)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }

    activeElem = document.getElementById("activeElem") //--for edit---

    if(activeElem&&ActiveElem&&ActiveElemStop==false) //   &&ActiveElemStop==false
    {
        var cw = addElemPathCw

        var currentPoints = activeElem.getAttribute("d");

        var pnt = starSVG.createSVGPoint();
        pnt.x = SVGx;
        pnt.y = SVGy;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = domActiveElemG.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        NextX = SVGx
        NextY = SVGy
        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        if(currentPoints.indexOf("Z")==-1)
            var lastSeg = pathSegs.getItem(segs-1)
            else
                var lastSeg = pathSegs.getItem(segs-2)

                var lastX = lastSeg.x
                var lastY = lastSeg.y

                //---rightAngle---
                if(cw.drawPathRightAngleCheck.checked==true)
            {
                var xDiff = Math.abs(lastX-SVGx);
                var yDiff = Math.abs(lastY-SVGy);
                if(xDiff>yDiff)NextY = lastY;
                if(yDiff>xDiff)NextX = lastX;

            }
            if(RubberLine&&PausePath==false&&PathClosed==false)
        {
            rubberLine.setAttribute("x2", NextX)
            rubberLine.setAttribute("y2", NextY)
            var latLng = StarProjection.invert([NextX, NextY])
            var ra = latLng[0]
            if(ra<0)
                ra = 360+ra
                dec = latLng[1]

                var rads = d3.geo.distance(PrevLatLng, latLng)
                var parsecs = (rads*180/Math.PI)*60
                commentDiv.style.visibility = "visible"
                var ly = parsecs*3.26156

                commentDiv.innerHTML = ra.toFixed(fixedVal)+","+dec.toFixed(fixedVal) +"<br>Distance = "+ly.toFixed(fixedVal) +" ly"
                commentDiv.style.top = SVGy-20+"px"
                commentDiv.style.left = SVGx+"px"
        }

        SegNextX = NextX
        SegNextY = NextY
        if(PathClosed==false)
        {
            // var svgPnt=L.point(SVGx,SVGy)
            // var mapLatLng=MyMap.layerPointToLatLng(svgPnt)
            // var mapLat=mapLatLng.lat.toFixed(4)
            // var mapLng=mapLatLng.lng.toFixed(4)

        }
    }
}

var DrawPath = false
var DrawPathStart = false
var ActiveElemStop = false
//---on frame load or open drawPath---
function startPathDraw()
{

    ActiveScale = StarView.k/StarScale

    starSVG.setAttribute('onclick', "placeDrawPath()")
    ActiveElem = null
    DrawPathStart = true
    DrawPath = false
    NewEndArrow = null
    window.addEventListener("keypress", keyPressPath, false);
    //---attach point drag to starSVG---
    starSVG.setAttribute("onmousedown", "startDragPoint(evt)")
    starSVG.setAttribute("onmousemove", "dragPoint(evt)")
    starSVG.setAttribute("onmouseup", "endDragPoint()")

    coverOn()
    var cw = addElemPathCw

}
//---click on svg layer---
var ActivePoint
function placeDrawPath()
{
    var cw = addElemPathCw
   starSVG.addEventListener("keypress", keyPressPath, false)

    PathLLArray =[]

    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    var fillColor = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].text



    ActiveElem = ActiveElemG.append("path")
    .attr("id", "activeElem")
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .style("cursor", "default")

    if(fillColor=="none")
    ActiveElem.attr("fill-opacity", "0")

    var firstX
    var firstY
    if(LatLngPntSet==false)
    {
          firstX=SVGx
          firstY=SVGy
    }
    else
    {
          firstX=SETx
          firstY=SETy
    }



    DrawX.style("display", "inline")
    tfm("domDrawX", firstX, firstY, 1)

    if(cw.drawPathStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")
        if(cw.drawPathStrokeArrowCheck.checked==true)
        ActiveElem.attr("marker-end", "url(#"+EndArrowId+")")

        activeElem = document.getElementById("activeElem")




        var pathSegM0 = activeElem.createSVGPathSegMovetoAbs(firstX, firstY)
        activeElem.pathSegList.appendItem(pathSegM0)

        RubberLine = ActiveElemG.append("line")
        .attr("id", "rubberLine")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("marker-end", "url(#endArrow)")
        .attr("x1", firstX)
        .attr("y1", firstY)
        .attr("x2", firstX)
        .attr("y2", firstY)

        DragCircleG = ActiveElemG.append("g")
        .attr("id", "dragCircleG")
        .append("circle")
        .attr("id", "dragPnt0")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("transform", "translate("+firstX+" "+firstY+")")
        .attr("r", 8)
        .attr("opacity", ".6")
        .attr("fill", "lime")
        .attr("stroke", "black")
        .attr("stroke-width", "1")
        .attr("Point", 0)
        .attr("class", "dragTarget")

        .style("cursor", "move")

        tfm("dragCircleG", 0, 0, 1)
        SegSetX = firstX
        SegSetY = firstY

        FirstPathPointSet = true
        PathPointArray.push([firstX, firstY])

       var firstLatLng = StarProjection.invert([firstX,firstY])

        PathLLArray.push(firstLatLng)
        PrevLatLng = firstLatLng
        ActivePoint = firstLatLng//--celestial map
        starSVG.setAttribute('onclick', "clickNextPathPoint()")
        PathStart =[firstX, firstY]



        cw.drawPathPauseButton.disabled = true
        cw.drawPathUndoButton.disabled = true
        cw.drawPathCancelButton.disabled = true
        cw.drawPathFinishButton.disabled = true
        cw.drawPathCancelButton.innerText = "cancel[C]"
        cw.drawPathPauseButton.innerText = "pause [P]"
        cw.drawPathEncloseButton.disabled = true

        cw.drawPathPauseButton.disabled = false
        cw.drawPathCancelButton.disabled = false

        DrawPath = true
}

var DragCircleG;
//var NextPoints;  //----used  to pick points 2+,
var DragPointArray =[]
var Point = 0;
var FirstPathPointSet = false;
var TwoPlusPointsSet = false;
var PathClosed = false;
var PathDecoupled = false;
var PathFinished = false;
var PathCancelled = false;
//---used to realign the last point on right angle, closed---
var RubberLine = null;
var DragPointOK = false
var DragThisPoint = null;
var DragPointOK = false;
var PathPointArray =[]
var PathLLArray =[]
var PausePathPoint = null
var PausePath = false
var PrevKeyPath = null
var PrevLatLng
//---tracking--
var NextX
var NextY

var SegSetX
var SegSetY
var SegNextX
var SegNextY

//----each mouse click fired from the SVG---
function clickNextPathPoint()
{

    var cw = addElemPathCw
    Point++;

    var pnt = starSVG.createSVGPoint();
    pnt.x = SVGx;
    pnt.y = SVGy;
    //---elements in different(svg) viewports, and/or transformed ---
    var sCTM = domActiveElemG.getScreenCTM();
    var Pnt = pnt.matrixTransform(sCTM.inverse());

    var nextX = SVGx
    var nextY = SVGy

    //---rightAngle---
    if(cw.drawPathRightAngleCheck.checked==true)
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
    dragCircleG.appendChild(circle)

    RubberLine.attr("x1", nextX);
    RubberLine.attr("y1", nextY);
    PathPointArray.push([nextX, nextY])
    PrevLatLng = StarProjection.invert([nextX, nextY])
    PathLLArray.push(PrevLatLng)
    if(cw.drawPathStrokeArrowCheck.checked==true)
    {
        createPathArrow()
        activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
    }

    SegSetX = nextX
    SegSetY = nextY
    var pathSegL = activeElem.createSVGPathSegLinetoAbs(nextX, nextY)
    activeElem.pathSegList.appendItem(pathSegL)
    //--update
    var d = activeElem.getAttribute("d")
    ActiveElem.attr("d", d)

    if(TwoPlusPointsSet==false)
        cw.drawPathFinishButton.disabled = false
        else if(TwoPlusPointsSet==true)
        {
            cw.drawPathEncloseButton.disabled = false
            cw.smoothPathButton.disabled = false
        }

        TwoPlusPointsSet = true;

    cw.drawPathUndoButton.disabled = false
    cw.drawPathFinishButton.disabled = false

    cw.drawPathUndoButton.disabled = false
    cw.drawPathFinishButton.disabled = false
    if(Point>1)
        cw.drawPathEncloseButton.disabled = false

        ActiveElem.datum({type: "LineString", coordinates: PathLLArray})
        .attr("d", StarMap)
        if(DrawPathType=="basis")
    {
        if(activeElem.getAttribute("d").indexOf("z")==-1)
            var line = d3.svg.line().interpolate("basis");
        else
            var line = d3.svg.line().interpolate("basis-closed");  ;

        d3.select("#drawPathSmooth").attr('d', line);

    }

}

var DrawPathType = 'linear'
var DrawPathSmooth
function drawPathSmoothSelected()
{
    var cw = addElemPathCw
    DrawPathType = "basis" //--bundle---
    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    var fillColor = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].text

    //if(document.getElementById("drawPathSmooth"))
    //domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))

    //---get linear points---
    if(!DrawPathSmooth)
    {
        if(activeElem.getAttribute("d").indexOf("z")==-1)
           var line = d3.svg.line().interpolate("basis");
        else
            var line = d3.svg.line().interpolate("basis-closed");

        var data = PathPointArray
        DrawPathSmooth = ActiveElemG.append('path')
        .data([data])
        .attr("id", "drawPathSmooth")
        .attr("pointer-events", "none")
        .attr("fill", fillColor)
        .attr("fill-opacity", opacity)
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr('d', line)

        activeElem.setAttribute("fill", "none")
        activeElem.setAttribute("fill-opacity", "0")

        if(cw.drawPathStrokeDashCheck.checked==true)
            DrawPathSmooth.attr("stroke-dasharray", "8 4")
        if(cw.drawPathStrokeArrowCheck.checked==true)
            drawPathSmooth.setAttribute("marker-end", "url(#"+EndArrowId+")")

            cw.drawPathRightAngleCheck.checked = false
            activeElem.removeAttribute("rightAngle")

            if(PathClosed==true)
        {
            var line = d3.svg.line().interpolate("basis-closed");
            DrawPathSmooth.attr("d", line)
        }
        if(ActiveElem)
        {
            ActiveElem.attr("type", DrawPathType)
            ActiveElem.attr("linearD", ActiveElem.attr("d"))
            ActiveElem.attr("opacity", ".3")
        }
        //  ActiveElemG.attr("pointer-events","none")

        cw.smoothPathButton.innerHTML = "linear[S]"
        DrawPathType = "basis"

    }
    else
    {
        if(ActiveElem)
        {
            activeElem.setAttribute("fill", fillColor)
            activeElem.setAttribute("fill-opacity", opacity)
            activeElem.removeAttribute("opacity")
            activeElem.removeAttribute("linearD")
            activeElem.removeAttribute("opacity")
            dragCircleG.setAttribute("visibility", "visible")
            domActiveElemG.removeChild(drawPathSmooth)
            DrawPathSmooth = null

        }
        ActiveElemG.attr("pointer-events", null)
        cw.smoothPathButton.innerHTML = "smooth[S]"
        DrawPathType = "linear"

    }
    window.focus()
}

function showDrawPathFillBg()
{
    var cw = addElemPathCw
    var fill = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].value

    if(fill!="none")
        cw.drawPathFillBg.style.backgroundColor = fill
        else
            cw.drawPathFillBg.style.backgroundColor = ""

            if(ActiveElem)
        {
            if(cw.drawPathFillSelect.selectedIndex==0)
            {
                ActiveElem.attr("fill", "white")
                ActiveElem.attr("fill-opacity", 0)

            }
            if(DrawPathType!="linear")
            {
                DrawPathSmooth.attr("fill", fill)
                if(fill!="none")DrawPathSmooth.attr("fill", fill)

            }
            else
            {
                ActiveElem.attr("fill", fill)
                if(fill!="none")ActiveElem.attr("fill-opacity", opacity)

            }

        }

        window.focus()

}
function showDrawPathStrokeBg()
{
    var cw = addElemPathCw
    var stroke = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPathStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPathStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)
            if(cw.drawPathStrokeArrowCheck.checked==true)
        {
            createPathArrow()
            if(DrawPathType!="linear")
                DrawPathSmooth.attr("marker-end", "url(#"+EndArrowId+")")
        }
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke", stroke)
        window.focus()
}
function drawPathFillSelected()
{
    var cw = addElemPathCw
    var fill = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    if(cw.drawPathFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }
    window.focus()

}
function drawPathFillOpacitySelected()
{
    var cw = addElemPathCw
    var fillOpacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", fillOpacity)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("fill-opacity", fillOpacity)

      window.focus()
}

function drawPathStrokeSelected()
{
    var cw = addElemPathCw
    var stroke = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

        if(cw.drawPathStrokeArrowCheck.checked==true)
        drawPathStrokeArrowChecked()
}

function drawPathStrokeWidthSelected()
{
    var cw = addElemPathCw
    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke-width", strokeWidth)
        window.focus()
}

function drawPathStrokeDashChecked()
{
    var cw = addElemPathCw
    if(cw.drawPathStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", "8 4")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("stroke-dasharray", "8 4")
    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", null)
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("stroke-dasharray", null)
    }
      window.focus()
}

function drawPathStrokeArrowChecked()
{
    var cw = addElemPathCw
    if(cw.drawPathStrokeArrowCheck.checked==true)
    {
        createPathArrow()

        if(ActiveElem)
            ActiveElem.attr("marker-end", "url(#"+EndArrowId+")")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("marker-end", "url(#"+EndArrowId+")")
    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("marker-end", null)
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("marker-end", null)
    }
     window.focus()
}
//---create and/or changes arrow id=pathArrow for this path--
var EndArrowId
var NewEndArrow = false
function createPathArrow()
{
    var cw = addElemPathCw
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
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

function rotatePathAdjust(factor)
{
    var cw = addElemPathCw
    var mult = parseFloat(cw.rotateDrawPathAdjustSelect.options[cw.rotateDrawPathAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePathValue.value = rotateAdd+parseFloat(cw.adjustedRotatePathValue.value)

    if(ActiveElem)
    {

        rote("domDrawX", rotateAdd)

        var t3r = d3.transform(DrawX.attr("transform"))

        var cx = t3r.translate[0]
        var cy = t3r.translate[1]

        var domElem = document.getElementById("domActiveElemG")
        var transformRequestObj = starSVG.createSVGTransform()
        var animTransformList = domElem.transform
        var transformList = animTransformList.baseVal
        transformRequestObj.setRotate(rotateAdd, cx, cy)
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        var t3r = d3.transform(domElem.getAttribute("transform"))

        RotateAngle = t3r.rotate

    }
}
