

var PathClosedEdit = false;
var PathDecoupledEdit = false;
var PathFinishedEdit = false;
var PathCancelledEdit = false;
var PausePathEdit = false
var PrevKeyPathEdit = null

function resetPathEdit()
{
    var cw = addElemPathEditCw

    //--return---
    DrawX.style("display", "none")
    domDrawX.removeAttribute("transform")
    NewEndArrow = false

    CurrentPathArrow = null
    DrawPathEdit = false
    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosedEdit = false;
    PathDecoupledEdit = false;
    PathFinishedEdit = false;
    PathCancelledEdit = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
        domActiveElemG.removeChild(document.getElementById("rubberLine"))
        RubberLine = null;
    DrawPathStart = false
    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPointEdit = null
    PausePathEdit = false
    PrevKeyPathEdit = null

    PrevArrowKey = null
    PrevDashKey = null

    cw.drawPathEditRightAngleCheck.checked = false
    cw.drawPathEditStrokeDashCheck.checked = false
    cw.drawPathEditStrokeArrowCheck.checked = false

    cw.drawPathEditPauseButton.disabled = true
    cw.drawPathEditUndoButton.disabled = true
    cw.drawPathEditCancelButton.disabled = true
    cw.drawPathEditFinishButton.disabled = true
    cw.drawPathEditCancelButton.innerHTML = "cancel[C]"
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    cw.drawPathEditEncloseButton.disabled = true
    cw.smoothPathEditButton.innerHTML = "smooth[S]"
    cw.smoothPathEditButton.disabled = true

    if(document.getElementById("dragCircleG"))
    {
                    if(domDrawX.parentNode==dragCircleG)
                        starG.insertBefore(domDrawX, dragDot)
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))
        DragCircleG = null
    }

    if(ActiveElem)
    {

        if(activeElem)
            domActiveElemG.removeChild(activeElem)
            ActiveElem.attr("opacity", null)//--via smoothPath request---
            ActiveElem = null
    }
    var myFrame = document.getElementById('addElemPathEditFrame')
    addElemPathFrameDiv.style.height = addElemPathFrameDiv.scrollHeight+"px"
    myFrame.height = addElemPathEditFrameDiv.scrollHeight
    commentDiv.style.visibility = "hidden"
    starSVG.removeAttribute('onclick')
}

//---X button---or[X] key---
function closeDrawPathEdit()
{
    var cw = addElemPathEditCw
    StopStarZoom = false
    starSVG.removeAttribute("onclick")
    closeIframe("addElemPathEdit")

    DrawPathStart = false
    DrawPathEdit = false
    var cw = addElemPathEditCw
    var elemTimelinded = false

    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosedEdit = false;
    PathDecoupledEdit = false;
    PathFinishedEdit = false;
    PathCancelledEdit = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
        domActiveElemG.removeChild(document.getElementById("rubberLine"))
        RubberLine = null;

    DragPointArray =[]
    PathPointArray =[]
    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPointEdit = null
    PausePathEdit = false
    PrevKeyPathEdit = null
    PrevArrowKey = null
    PrevDashKey = null
    myKeyPath = null
    cw.drawPathEditRightAngleCheck.checked = false
    cw.drawPathEditPauseButton.disabled = true
    cw.drawPathEditUndoButton.disabled = true
    cw.drawPathEditCancelButton.disabled = true
    cw.drawPathEditFinishButton.disabled = true
    cw.drawPathEditCancelButton.innerHTML = "cancel[C]"
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    cw.drawPathEditEncloseButton.disabled = true
    //--via legend reset---
    cw.drawPathEditStrokeArrowCheck.disabled = false
    cw.drawPathEditStrokeDashCheck.disabled = false
    cw.drawPathEditStrokeArrowCheck.checked = false
    cw.drawPathEditStrokeDashCheck.checked = false
    cw.drawPathEditStrokeSelect.disabled = false

    cw.drawPathEditCancelButton.style.backgroundColor = ""
    cw.drawPathEditCancelButton.title = "cancel this path"
    //---show: needed--
    // cw.rightAngleEditSpan.style.visibility="visible"
    // cw.drawPathEditSmoothSelect.style.visibility="visible"
    cw.drawPathEditTopButtons.style.visibility = "visible"
    // cw.nextLatLngEditSet.style.visibility="visible"
    cw.smoothPathEditButton.innerHTML = "smooth[S]"
    cw.smoothPathEditButton.disabled = true

    DrawPathType = 'linear'

    if(document.getElementById("activeElem"))
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        if(document.getElementById("drawPathSmooth"))
        domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))
        if(document.getElementById("dragCircleG"))
    {
                    if(domDrawX.parentNode==dragCircleG)
                        starG.insertBefore(domDrawX, dragDot)
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))

    }

    //----edit in process---
    if(document.getElementById(DrawPathEditId))
    {
        document.getElementById(DrawPathEditId).style.display = "block"
        var editPath = document.getElementById(DrawPathEditId)
        if(editPath.getAttribute("comment"))
        {
            elemObjEdit.setAttribute("onmouseover", "showSymbolComment(evt)")
            elemObjEdit.setAttribute("onmouseout", "hideSymbolComment(evt)")
        }
    }
    DrawPathEditId = null

    ActiveElem = null

    // var myFrame=document.getElementById('addElemPathEditFrame')
    // addElemPathFrameDiv.style.height=addElemPathEditFrameDiv.scrollHeight+"px"
    // myFrame.height=addElemPathEditFrameDiv.scrollHeight

    //---detach point drag to starSVG---
    starSVG.removeAttribute("onmousemove")
    starSVG.removeAttribute("onmousedown")
    starSVG.removeAttribute("onmouseup")
    window.removeEventListener("keypress", keyPressPathEdit)
    ActiveElemG.attr("transform", null)

    DrawX.style("display", "none")
    coverOff()
    commentDiv.style.visibility = "hidden"

}
var PrevKeyPathEdit = null
var PrevArrowKey = null
var PrevDashKey = null
var myKeyPath = null
function keyPressPathEdit(evt)
{

    myKeyPath = (evt.charCode)? evt.which: evt.keyCode //===ff===
        var cw = addElemPathEditCw

        if(myKeyPath) //--looses focus on finish/close---
    {

        if(ActiveElem)
        {
            //---e key for enclose path---!
            if(myKeyPath==101) //---E: enclose path
            {
                if(PathClosedEdit==false)
                    encloseDrawPathEdit()
                    else
                        reopenDrawPathEdit()
            }
            else if(myKeyPath==117) //---u:undo---!
            {
                undoDrawPathEdit()
            }
            else if(myKeyPath==112) //---p;pause---
            {
                if(PrevKeyPathEdit==112)
                    unPauseDrawPathEdit()
                    else
                        pauseDrawPathEdit()
            }
            else if(myKeyPath==99) //---C:cancel---!
                closeDrawPathEdit()
                else if(myKeyPath==102 && TwoPlusPointsSet==true) //---F; end,close,finish--
                {
                    stopPathPointsEdit()
                    finishDrawPathEdit()
                }
                else if(myKeyPath==120) //---X close---
                {

                    closeDrawPathEdit()
                }

                else if(myKeyPath==115) //[0]---Linear path---
                {

                    drawPathEditSmoothSelected()
                }

        }

        if(myKeyPath==100) //[D]---Dash---
        {
            if(PrevDashKey!=100)
            {
                cw.drawPathEditStrokeDashCheck.checked = true
                PrevDashKey = 100
            }
            else
            {
                cw.drawPathEditStrokeDashCheck.checked = false
                PrevDashKey = null
            }
            drawPathEditStrokeDashChecked()
        }
        else if(myKeyPath==97) //[Z]---Arrow---
        {
            if(PrevArrowKey!=97)
            {
                cw.drawPathEditStrokeArrowCheck.checked = true
                PrevArrowKey = 97
            }
            else
            {
                cw.drawPathEditStrokeArrowCheck.checked = false
                PrevArrowKey = null
            }
            drawPathEditStrokeArrowChecked()
        }
        else if(myKeyPath==108) //---L:right ANGLE---!
        {
            if(cw.drawPathEditRightAngleCheck.checked==true)
            {
                cw.drawPathEditRightAngleCheck.checked = false
                if(RubberLine)
                {
                    rubberLine.setAttribute("x2", SVGx)
                    rubberLine.setAttribute("y2", SVGy)
                }
            }
            else
            {
                cw.drawPathEditRightAngleCheck.checked = true
                if(RubberLine)
                {
                    rubberLine.setAttribute("x2", NextX)
                    rubberLine.setAttribute("y2", NextY)
                }
            }
        }

    }
    return false
}

var PausePathPointEdit = null
var PausePathEdit = false
//---toggle pause button[P]
function pauseDrawPathEdit()
{
    var cw = addElemPathEditCw
    if(PausePathEdit==false)
    {
        PausePathEdit = true //---stop track---
        //--get last dragPoint---
        PausePathPointEdit = document.getElementById("dragPnt"+Point)

        stopPathPointsEdit()

        PrevKeyPathEdit = 112

        cw.drawPathEditPauseButton.innerHTML = "restart[P]"
        //---remove click event---
        starSVG.removeAttribute("onclick")

        PathDecoupledEdit = true;

    }
    else
        unPauseDrawPathEdit()

}
//---pause, enclose, finish---
function stopPathPointsEdit()
{
    var cw = addElemPathEditCw
    if(PathCancelledEdit==false && PathDecoupledEdit==false && TwoPlusPointsSet==true)
    {
        RubberLine.style("visibility", "hidden")
        PathDecoupledEdit = true;
        //----remove startNewPath function from svg---
        starSVG.removeAttribute("onclick")

    }
}
function unPauseDrawPathEdit()
{
    PathDecoupledEdit = false;
    var cw = addElemPathEditCw

    RubberLine.style("visibility", "visible")
    .attr("x2", SVGx)
    .attr("y2", SVGy)
    PausePathEdit = false
    PrevKeyPathEdit = null
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    starSVG.setAttribute('onclick', 'clickNextPathPointEdit()')
}

//---toggle Undo[U]----
function undoDrawPathEdit()
{
    var cw = addElemPathEditCw

    if(PathClosedEdit==false)
    {
        //---allows undo if pause in effect----
        if(PausePathEdit==true&& activeElem.pathSegList.numberOfItems>0)
            unPauseDrawPathEdit()

            if(RubberLine && activeElem.pathSegList.numberOfItems>1)
        {
            //---extract circle from array used for writeTrackTable()
            PathPointArray.splice(Point, 1)
            PathLLArray.splice(Point, 1)
            var segs = activeElem.pathSegList.numberOfItems
            var lastSeg = activeElem.pathSegList.getItem(segs-1)

            var dragPnt = document.getElementById("dragPnt"+(segs-1))

            if(dragPnt)
                dragCircleG.removeChild(dragPnt)

                activeElem.pathSegList.removeItem(segs-1)
                Point--
                var newD = activeElem.getAttribute("d")
                activeElem.setAttribute("d", newD)
                if(DrawPathType!="linear")
            {
                 var line = d3.svg.line().interpolate("basis");
                DrawPathEditSmooth.data([PathPointArray])
                DrawPathEditSmooth.attr('d', line);
            }

            if((segs-1)==1)
            {
                var segs = activeElem.pathSegList.numberOfItems
                var lastSeg = activeElem.pathSegList.getItem(segs-1)

                var x = lastSeg.x
                var y = lastSeg.y

                RubberLine.attr("x1", x)
                RubberLine.attr("y1", y)

                cw.drawPathEditUndoButton.disabled = true
                cw.drawPathEditFinishButton.disabled = true
            }

            if((segs-1)!=1)
            {
                var segs = activeElem.pathSegList.numberOfItems
                var lastSeg = activeElem.pathSegList.getItem(segs-1)

                var x = lastSeg.x
                var y = lastSeg.y
                RubberLine.attr("x1", x)
                RubberLine.attr("y1", y)

            }

            if((segs-1)<3)
                cw.drawPathEditEncloseButton.disabled = true

        }
    }
}

//--enclose[E] button----
function encloseDrawPathEdit()
{
    if(PathClosedEdit==false) //==needed for button---
    {

        var cw = addElemPathEditCw

        stopPathPointsEdit();
        cw.drawPathEditUndoButton.disabled = true
        cw.drawPathEditPauseButton.disabled = true

        //---adjust last point at right angle to first point---
        if(cw.drawPathEditRightAngleCheck.checked==true)
        {
            var pathSegs = activeElem.pathSegList
            var segs = pathSegs.numberOfItems

            var startSeg = pathSegs.getItem(0)
            var firstX = startSeg.x
            var firstY = startSeg.y
            var lastSeg = pathSegs.getItem(segs-1)
            var prevSeg = pathSegs.getItem(segs-2)

            var lastX = lastSeg.x
            var lastY = lastSeg.y
            var prevX = prevSeg.x
            var prevY = prevSeg.y

            if(prevX==lastX)
            {
                var finalY = firstY;
                var finalX = lastX;
            }
            if(prevY==lastY)
            {
                var finalX = firstX;
                var finalY = lastY;
            }

            lastSeg.x = finalX
            lastSeg.y = finalY
            var lastPoint = document.getElementById("dragPnt"+Point)
            lastPoint.setAttribute("transform", "translate("+finalX+" "+finalY+")");
            PathPointArray[Point] =[finalX, finalY]
        }

        var pathSegZ = activeElem.createSVGPathSegClosePath()
        activeElem.pathSegList.appendItem(pathSegZ)

        PathClosedEdit = true;
        cw.drawPathEditEncloseButton.innerHTML = "reopen [E]"

        if(cw.drawPathEditRightAngleCheck.checked==true)
        {
            var pathSegs = activeElem.pathSegList
            var segs = pathSegs.numberOfItems

            PathPointArray =[];
            for(var k = 0; k<segs; k++)
            {
                var mySeg = pathSegs.getItem(k)
                PathPointArray.push([mySeg.x, mySeg.y])
            }
        }
        if(DrawPathEditSmooth)
        {
            var line = d3.svg.line().interpolate("basis-closed");
            DrawPathEditSmooth.attr("d", line)

        }
    }
    else //when selected via button---
        reopenDrawPathEdit()

}

function reopenDrawPathEdit()
{
    var pathSegs = activeElem.pathSegList
    var segs = pathSegs.numberOfItems

    activeElem.pathSegList.removeItem(segs-1)

    PausePathPointEdit = document.getElementById("dragPnt"+Point)
    unPauseDrawPathEdit()

    var cw = addElemPathEditCw
    cw.drawPathEditEncloseButton.innerHTML = "enclose[E]"
    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditPauseButton.disabled = false

    PathClosedEdit = false;

        if(DrawPathEditSmooth)
    {
        var line = d3.svg.line().interpolate("basis");
        DrawPathEditSmooth.attr("d", line)

    }

}

//---button or [F]---
function finishDrawPathEdit()
{
    var cw = addElemPathEditCw
    DrawPathEdit = false
    var elemObj = document.getElementById(DrawPathEditId)
    var finishedElem = activeElem.cloneNode(true)
   

    if(DrawPathType=="basis")
    {

        finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
        finishedElem.setAttribute("fill", drawPathSmooth.getAttribute("fill"))
        finishedElem.setAttribute("fill-opacity", drawPathSmooth.getAttribute("fill-opacity"))
        finishedElem.setAttribute("d", drawPathSmooth.getAttribute("d"))
        finishedElem.setAttribute("type", "basis")
        domActiveElemG.removeChild(drawPathSmooth)

    }
    else
    {

        finishedElem.setAttribute("type", "linear")

    }




    finishedElem.removeAttribute("stroke-opacity")
    finishedElem.setAttribute("id", DrawPathEditId)




    finishedElem.setAttribute("class", "addPath")
    finishedElem.style.cursor = "default"

   finishedElem.setAttribute("ondblclick", "startPathDrawEdit("+DrawPathEditId+")")
    finishedElem.setAttribute("vector-effect", "non-scaling-stroke")
    if(cw.drawPathEditFadeCheck.checked==true)
        finishedElem.setAttribute("fade", "true")
        else
            finishedElem.removeAttribute("fade")

            for(var k = 0; k<AddPathBBCoordsArray.length; k++)
        {
            var myId = AddPathBBCoordsArray[k][2]
            if(myId==DrawPathEditId)
            {




                AddPathBBCoordsArray[k][3] = finishedElem.getAttribute("fade")
                break
            }
        }
     if(cw.drawPathEditCommentValue.value!="Path comment goes here(optional)..." && cw.drawPathEditCommentValue.value!="")
    {
        finishedElem.setAttribute("comment", txt2xml(cw.drawPathEditCommentValue.value))
        finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
        finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")
    }
    else
    {
        finishedElem.removeAttribute("comment")
        finishedElem.removeAttribute("onmouseover")
        finishedElem.removeAttribute("onmouseout")
    }

    domAddPathG.insertBefore(finishedElem, elemObj)
    UpdateThisPath = finishedElem
    domAddPathG.removeChild(elemObj)
    updatePath()

    closeDrawPathEdit()
}
/*
//---button or [F]---
function finishDrawPathEdit()
{
    var cw = addElemPathEditCw

    DrawPathEdit = false
    var elemObj = document.getElementById(DrawPathEditId)

    var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
    var fillOpacity = cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].value
    var strokeOpacity = cw.drawPathEditStrokeOpacitySelect.options[cw.drawPathEditStrokeOpacitySelect.selectedIndex].value

    var finishedElem = activeElem.cloneNode(true)
    if(domActiveElemG.getAttribute("transform"))
        finishedElem.setAttribute("transform", domActiveElemG.getAttribute("transform"))
        if(EditPathFill.indexOf("url")!=-1&&cw.drawPathEditFillSelect.selectedIndex==0)
    {
        finishedElem.setAttribute("fill", EditPathFill)
        finishedElem.setAttribute("fill-opacity", EditPathFillOpacity)
    }
    else
    {
        finishedElem.setAttribute("fill", fill)
        finishedElem.setAttribute("fill-opacity", fillOpacity)
    }

    if(DrawPathType=="basis")
    {

        finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
        finishedElem.setAttribute("d", drawPathEditSmooth.getAttribute("d"))
        finishedElem.setAttribute("type", "basis")
        domActiveElemG.removeChild(drawPathEditSmooth)

    }
    else
    {

        finishedElem.setAttribute("type", "linear")

    }

    finishedElem.setAttribute("stroke-opacity", strokeOpacity)
    finishedElem.removeAttribute("opacity")
    //finishedElem.setAttribute("stroke-opacity",opacityStroke)
    finishedElem.setAttribute("id", DrawPathEditId)
    finishedElem.setAttribute("class", "pathElem")
    finishedElem.style.cursor = "default"

    finishedElem.setAttribute("onmousedown", "startPathDrawEdit("+DrawPathEditId+",evt)")
    finishedElem.setAttribute("pointer-events", "visible")
    var ctm = finishedElem.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
    finishedElem.setAttribute("rotateAngle", rotateAngle)

    domElemG.insertBefore(finishedElem, elemObj)
    UpdateThisPath = finishedElem
    domElemG.removeChild(elemObj)

    if(PathEditZoneMarker)
    {

        var unicode = cw.pathEditZoneMarkerSelect.options[cw.pathEditZoneMarkerSelect.selectedIndex].value
        var fill = cw.pathEditZoneMarkerFillColorSelect.options[cw.pathEditZoneMarkerFillColorSelect.selectedIndex].value
        var fontSize = +cw.pathEditZoneMarkerFontSizeSelect.options[cw.pathEditZoneMarkerFontSizeSelect.selectedIndex].text
        var quantity = +cw.pathEditZoneMarkerQuantitySelect.options[cw.pathEditZoneMarkerQuantitySelect.selectedIndex].text

        finishedElem.setAttribute("markers", "true")
        finishedElem.setAttribute("marker-unicode", unicode)
        finishedElem.setAttribute("marker-fill", fill)
        finishedElem.setAttribute("marker-fontsize", fontSize)
        finishedElem.setAttribute("marker-quantity", quantity)

        var oldMarkers = document.getElementsByClassName(DrawPathEditId)
        for(var k = oldMarkers.length-1; k>=0; k--)
        {
            var oldMarker = oldMarkers[k]
            domElemG.removeChild(oldMarker)
        }

        screenPath(finishedElem) //--remove transform, recalc points---
        if(DrawPathType=="basis")
        {
            screenPath(activeElem)
            finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
        }
        var direction = -1

        var pathEditLen = finishedElem.getTotalLength()

        var seg = (pathEditLen/quantity)
        for (var k = 0; k<ZoneMarkerEditArray.length; k++)
        {
            direction *= -1;
            var segLen = k*seg

            var p1 = finishedElem.getPointAtLength(segLen),
            p2 = finishedElem.getPointAtLength((segLen)+direction),
            angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

            var marker = ZoneMarkerEditArray[k]
            marker.setAttribute("transform", "translate(" + p1.x + "," + p1.y + ")rotate(" + angle + ")");
            marker.setAttribute("class", DrawPathEditId)
            domElemG.insertBefore(marker, finishedElem)

        }

        ZoneMarkerEditArray =[]
        PathEditZoneMarker = false
        cw.pathEditZoneMarkerCheck.checked = false

    }
    else
    {
        var dumpMarkers = document.getElementsByClassName(DrawPathEditId)
        for(var k = 0; k<dumpMarkers.length; k++)
        {
            var dump = dumpMarkers[k]
            domElemG.removeChild(dump)

        }
        finishedElem.removeAttribute("markers")
        finishedElem.removeAttribute("marker-unicode")
        finishedElem.removeAttribute("marker-fill")
        finishedElem.removeAttribute("marker-fontsize")
        finishedElem.removeAttribute("marker-quantity")

    }
    domActiveElemG.removeAttribute("transform")

    screenPath(finishedElem)
    if(DrawPathType=="basis")
    {

        finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
    }

    domActiveElemG.removeChild(activeElem)
    activeElem = null

    closeDrawPathEdit()

}

*/



var UpdateThisPath
function updatePath()
{
    var sendMe = UpdateThisPath.cloneNode("true")
    var editId = UpdateThisPath.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Path/updatePath.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

/*
<?xml version="1.0" encoding="UTF-8"?>
<ADDPATH xmlns="http://www.w3.org/2000/svg"><path xmlns="" id="path1453735750523" fill="white" fill-opacity="0" stroke="#0000FF" stroke-width="2" d="M378.2800598144531,159.39117431640625L389.5027872721354,172.88686116536456C400.7255147298177,186.3825480143229,423.17096964518225,213.37392171223956,453.1456044514973,227.01166788736978C483.12023925781244,240.6494140625,520.6240539550781,240.93353271484375,550.0304514567057,228.43226369222006C579.4368489583333,215.93099466959634,600.7458292643229,190.6443379720052,625.3221842447916,173.0289154052734C649.8985392252604,155.41349283854166,677.7422688802083,145.46930440266925,707.006601969401,146.4637247721354C736.2709350585938,147.45814514160156,766.9558715820312,159.39117431640625,782.2983398437499,165.35768890380857L797.6408081054688,171.32420349121094" style="cursor: default;" type="basis" linearD="M378.28005981445216,159.39117431640685L445.6164245605455,240.3652954101546L558.1278686523436,241.21765136718707L622.0548095703131,165.3576812744114L705.5859985351542,135.52511596679662L797.6408081054669,171.32420349120986" onmousedown="emailElemCreator(path1453735750523)" ondblclick="startPathDrawEdit(path1453735750523)" createdBy="owner" fade="true" vector-effect="non-scaling-stroke" myScale="192.98132363950276" pointsLL="40.06620968079408,22.01146105673382,39.99774894853197,21.851320678024333,40.081900104407076,21.660581358545155,40.24218407172753,21.59571871376186,40.34923811230627,21.471357259908974,40.365863397190736,21.295209211257838" bbCoords="40.01409774016367,22.742210560581857" class="addPath"/></ADDPATH>


<?xml version="1.0" encoding="UTF-8"?>
<ADDPATH xmlns="http://www.w3.org/2000/svg"><path xmlns="" id="path1453735750523" fill="white" fill-opacity="0" stroke="#0000FF" stroke-width="2" d="M378.28005981445216,159.39117431640685L389.50278727213436,172.8868611653648C400.7255147298166,186.38254801432277,423.170969645181,213.37392171223865,453.14560445149624,227.01166788736873C483.1202392578115,240.64941406249875,520.6240539550776,240.9335327148429,550.0304514567056,228.43226369221904C579.4368489583335,215.93099466959518,600.7458292643232,190.64433797200329,625.3221842447916,173.02891540527156C649.89853922526,155.4134928385398,677.7422688802071,145.4693044026682,707.0066019693993,146.4637247721346C736.2709350585917,147.45814514160102,766.9558715820292,159.39117431640545,782.298339843748,165.35768890380766L797.6408081054669,171.32420349120986" style="cursor: default; display: inline;" type="basis" linearD="M378.28005981445216,159.39117431640685L389.50278727213436,172.8868611653648C400.7255147298166,186.38254801432277,423.170969645181,213.37392171223865,453.14560445149624,227.01166788736873C483.1202392578115,240.64941406249875,520.6240539550776,240.9335327148429,550.0304514567056,228.43226369221904C579.4368489583335,215.93099466959518,600.7458292643232,190.64433797200329,625.3221842447916,173.02891540527156C649.89853922526,155.4134928385398,677.7422688802071,145.4693044026682,707.0066019693993,146.4637247721346C736.2709350585917,147.45814514160102,766.9558715820292,159.39117431640545,782.298339843748,165.35768890380766L797.6408081054669,171.32420349120986" createdBy="owner" fade="true" vector-effect="non-scaling-stroke" myScale="192.98132363950276" pointsLL="40.06620968079408,22.01146105673382,39.99774894853197,21.851320678024333,40.081900104407076,21.660581358545155,40.24218407172753,21.59571871376186,40.34923811230627,21.471357259908974,40.365863397190736,21.295209211257838" bbCoords="40.01409774016367,22.742210560581857" stroke-opacity="0.3" class="addPath" onmousedown="emailElemCreator(path1453735750523)" ondblclick="startPathDrawEdit(path1453735750523)"/></ADDPATH>




*/