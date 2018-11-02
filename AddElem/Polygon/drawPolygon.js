//----create regular polygon based on a radius length:circumradius (radius of a circle passing through all points)--
function regPolyCircleRad(vCnt, radius, centerX, centerY)
{
    if(activeElem)
    {
        activeElem.setAttribute("vCnt", vCnt)
        activeElem.setAttribute("length", radius)
        var myPoints = activeElem.points
        myPoints.clear()
        var polyXPts = Array(vCnt);
        var polyYPts = Array(vCnt);
        var vertexAngle = 360/vCnt;
        //---init polygon points processor---
        for(var v = 0; v<vCnt; v++)
        {
            theAngle = (v*vertexAngle)*Math.PI/180;
            polyXPts[v] = radius*Math.cos(theAngle);
            polyYPts[v] = -radius*Math.sin(theAngle);
        }
        //--note points are CCW(this is important for future ref)---
        for(var v = 0; v<vCnt; v++)
        {
            var point = starSVG.createSVGPoint();
            point.x = centerX+polyXPts[v]
            point.y = centerY+polyYPts[v]
            myPoints.appendItem(point)
        }
    }
}
//---create polygon with specific edge length---
function regPolyEdgeLenth(vCnt, edge, cx, cy)
{
    if(activeElem)
    {
        activeElem.setAttribute("vCnt", vCnt)
        activeElem.setAttribute("length", edge)

        var myPoints = activeElem.points
        myPoints.clear()
        var polyXPts = Array(vCnt);
        var polyYPts = Array(vCnt);
        var vertexAngle = 360/vCnt;
        var computeRad = .5*edge/Math.sin((vertexAngle/2)*Math.PI/180)
        //---init polygon points processor---
        for(var v = 0; v<vCnt; v++)
        {
            theAngle = (v*vertexAngle)*Math.PI/180;
            polyXPts[v] = computeRad*Math.cos(theAngle);
            polyYPts[v] = -computeRad*Math.sin(theAngle);
        }
        //--note points are CCW(this is important for future ref)---
        for(var v = 0; v<vCnt; v++)
        {
            var point = starSVG.createSVGPoint();
            point.x = cx+polyXPts[v]
            point.y = cy+polyYPts[v]
            myPoints.appendItem(point)
        }
    }
}
///---X button and iframe close all---
function closeDrawPolygon()
{
    if(addElemPolygonViz==true)
    {
        closeIframe("addElemPolygon");
        coverOff()

        var cw = addElemPolygonCw

        if(EditPolygon==true && PolygonDeleted==false)
        {
            starSVG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")
            var elemObjEdit = document.getElementById(DrawPolygonEditId)
            elemObjEdit.style.display = "inline"
            if(domActiveElemG.childNodes.length>0)
                domActiveElemG.removeChild(domActiveElemG.firstChild)
                elemObjEdit.setAttribute("onmousedown", "editPolygonDraw("+DrawPolygonEditId+",evt)")

        }
        DraggingObj = false
        DrawPolygon = false
        EditPolygon = false
        PolygonDeleted = false

        starSVG.removeAttribute("onmousedown")
        starSVG.removeAttribute("onmousemove")
        starSVG.removeAttribute("onmouseup")

        starSVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            starSVG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")

        }
        activeElem = null
        ActiveElem = null
        cw.adjustedRotatePolygonValue.value = 0
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")
        cw.drawPolygonFinishButton.disabled = true
        cw.drawPolygonCancelButton.disabled = true
        cw.drawPolygonCancelButton.style.borderColor = ""
        cw.drawPolygonDeleteButton.style.visibility = "hidden"

         cw.drawPolygonEditSpan.innerText = "Draw Polygons"

        cw.containerDiv.style.backgroundColor = "linen"

    }
}

//---on add icon DrawX follows cursor
function trackDrawPolygon()
{
    var cw = addElemPolygonCw

    if(LatLngPntSet==false&&  ActiveElem==null&&EditPolygon==false && PolygonDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditPolygon = false
var DrawPolygon = false
var PolygonDeleted = false

function startPolygonDraw()
{
    var cw = addElemPolygonCw
    if(EditPolygon==false)
    {
        ActiveElem = null
        activeElem = null
        DrawPolygon = true
        DrawX.style("display", "inline")
        starSVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---

    }
    if(cw.adjustedRotatePolygonValue)
        cw.adjustedRotatePolygonValue.value = 0
}

//--click on svg---
function placeDrawPolygon()
{
    var cw = addElemPolygonCw
    coverOn()

    var strokeColor = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawPolygonStrokeWidthSelect.options[cw.drawPolygonStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text
    if(cw.drawPolygonFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("polygon")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)

    if(cw.drawPolygonShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawPolygonStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        var size = +cw.drawPolygonSizeSelect.options[cw.drawPolygonSizeSelect.selectedIndex].text
        var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
        if(cw.polygonRadiusRadio.checked)
        regPolyCircleRad(vCnt, size, 0, 0)
        if(cw.polygonEdgeRadio.checked)
        regPolyEdgeLenth(vCnt, size, 0, 0)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.style("visibility", "hidden")
        PolygonCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        starSVG.removeAttribute('onclick')
        starSVG.style.cursor = ""
        starSVG.setAttribute("onmousedown", "startDragPolygon(evt)")
        starSVG.setAttribute("onmousemove", "dragPolygon(evt)")
        starSVG.setAttribute("onmouseup", "endDragPolygon(evt)")

        cw.drawPolygonCancelButton.disabled = false
        cw.drawPolygonFinishButton.disabled = false
     if(LatLngPntSet==false)
    {
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

    }
    else
    {
        activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")

        ActiveElem.attr("class", null)
        ActiveElem.style("cursor", "default")

    }
    var t3 = d3.transform(ActiveElem.attr("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]
    ActiveLL = StarProjection.invert([transX, transY])
    ActiveScale = StarView.k/StarScale
}

function finishDrawPolygon()
{
    if(EditPolygon==true)
        finishEditPolygon()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemPolygonCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeElem").cloneNode(true)
            var id = "polygon"+new Date().getTime()
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var t3 = d3.transform(activeElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            RotateAngle = t3.rotate
            finishedElem.setAttribute("rotateAngle", RotateAngle)

            var ll = ActiveLL
            var rotate = ""
            if(RotateAngle!=0)
                rotate = "rotate("+RotateAngle+")"

                if(cw.drawPolygonFadeCheck.checked==true)
                finishedElem.setAttribute("fade", "true")
                finishedElem.setAttribute("myZoom", PrevZoomInteger)
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])
                var fade = finishedElem.getAttribute("fade")
                AddElemCoordsArray.push([ll, ActiveScale, id, RotateAngle, fade])

                finishedElem.setAttribute("class", "addElem")
                finishedElem.style.cursor = "default"
                    if(cw.drawPolygonShadowCheck.checked==true)
                    finishedElem.setAttribute("filter", "url(#drop-shadow)")
                finishedElem.setAttribute("ondblclick", "editPolygonDraw("+id+")")

                if(cw.drawPolygonCommentValue.value!="Polygonangle comment here(optional)..." && cw.drawPolygonCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawPolygonCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }

            if(oEMAIL)
                finishedElem.setAttribute("createdBy", oEMAIL)


                if(LatLngPntSet==true)
                {
                    setRaDecCheck.checked = false
                    setRaDecChecked() //---turn off---
                }

                starSVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---
                DrawX.style("display", "none")


                cw.drawPolygonFinishButton.disabled = true
                cw.drawPolygonCancelButton.disabled = true
                coverOff()
                commentDiv.style.visibility = "hidden"



            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null

            finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")rotate("+RotateAngle+")")
            domAddElemG.appendChild(finishedElem)
            newPolygon(id)

        }
}

function cancelDrawPolygon()
{
    var cw = addElemPolygonCw
    if(EditPolygon==true)
        cancelEditPolygon()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            starSVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            starSVG.appendChild(dragDot)
            cw.drawPolygonFinishButton.disabled = true
            cw.drawPolygonCancelButton.disabled = true
            cw.adjustedRotatePolygonValue.value = 0


            coverOff()

        }

        cw.drawPolygonCancelButton.style.borderColor = ""

}
//---radio button---
function sizePolygon()
{
    var cw = addElemPolygonCw
    var size = +cw.drawPolygonSizeSelect.options[cw.drawPolygonSizeSelect.selectedIndex].text
    var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
    if(cw.polygonRadiusRadio.checked)
        regPolyCircleRad(vCnt, size, 0, 0)
        if(cw.polygonEdgeRadio.checked)
        regPolyEdgeLenth(vCnt, size, 0, 0)
}

//====================edit/update circle===============================

var EditPolygon = false
var DrawPolygonEditId
var EditThisPolygon
//--mousedown/right button on circle---
//--dblclick on circle---
function editPolygonDraw(elemObjEdit)
{

    if(DrawPolygon==false)
        if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisPolygon = elemObjEdit

            DrawPolygonEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--


            ActiveElem = null
            activeElem = null

            EditPolygon = true
            if(addElemPolygonLoad==false)
            {
                openIframe("AddElem", "addElemPolygon", 10)

            }
            else if(addElemPolygonViz==false)
            {
                openIframe("AddElem", "addElemPolygon", 10)
                setEditPolygon()
            }
            else
                setEditPolygon()
        }
    }
}

//---after iframe loaded see sendSize() at addElemPolygon.htm---
var EditPolygonObj
function setEditPolygon()
{
    coverOn()

    var cw = addElemPolygonCw

    var elemObjEdit = document.getElementById(DrawPolygonEditId)

    EditPolygonObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditPolygonObj.setAttribute("id", "activeElem")
    EditPolygonObj.setAttribute("class", "dragTargetObj")
 EditPolygonObj.removeAttribute("onmouseover")
    EditPolygonObj.removeAttribute("onmouseout")
    EditPolygonObj.removeAttribute("ondblclick")

    if(EditPolygonObj.getAttribute("filter"))
        cw.drawPolygonShadowCheck.checked = true
        else
            cw.drawPolygonShadowCheck.checked = false

            //---is this text rotated?---
            var ctm = elemObjEdit.getCTM()
            RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotatePolygonValue.value = rotatedDeg

        var size = EditPolygonObj.getAttribute("size")
        if(size=="radius")
        cw.polygonRadiusRadio.checked = true
        if(size=="edge")
        cw.polygonEdgeRadio.checked = true

        domActiveElemG.appendChild(EditPolygonObj)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")

        cw.drawPolygonDeleteButton.style.visibility = "visible"
        cw.drawPolygonEditSpan.innerHTML = "Edit Polygon"
        cw.drawPolygonTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"

        //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
        //activeElem.removeAttribute("transform")
        cw.drawPolygonCancelButton.disabled = false
        cw.drawPolygonFinishButton.disabled = false


        var stroke = EditPolygonObj.getAttribute("stroke")
        var strokeWidth = EditPolygonObj.getAttribute("stroke-width")
        var fill = EditPolygonObj.getAttribute("fill")
        var opacity = EditPolygonObj.getAttribute("fill-opacity")
        var vcnt = +EditPolygonObj.getAttribute("vcnt")
        cw.drawPolygonVerticeSelect.selectedIndex = 3-vcnt

        if(opacity!="0")
    {
        setSelect("Polygon", "Opacity", opacity)
        setSelect("Polygon", "Fill", fill)
        cw.drawPolygonFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawPolygonFillBg.style.backgroundColor = ""
        cw.drawPolygonFillSelect.selectedIndex = 0

    }



    setSelect("Polygon", "Stroke", stroke)
    setSelect("Polygon", "StrokeWidth", strokeWidth)

    var vCnt = EditPolygonObj.getAttribute("vCnt")
    for(var k = 0; k<cw.drawPolygonVerticeSelect.options.length; k++)
    {
        var txt = cw.drawPolygonVerticeSelect.options[k].text
        if(txt==vCnt)
        {
            cw.drawPolygonVerticeSelect.selectedIndex = k
            break
        }
    }
    var length = EditPolygonObj.getAttribute("length")

    for(var k = 0; k<cw.drawPolygonSizeSelect.options.length; k++)
    {
        var txt = cw.drawPolygonSizeSelect.options[k].text
        if(txt==length)
        {
            cw.drawPolygonSizeSelect.selectedIndex = k
            break
        }
    }
    //---update bg colors---
    cw.drawPolygonStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawPolygonStrokeDashCheck.checked = true
        else
            cw.drawPolygonStrokeDashCheck.checked = false

        var fade = EditPolygonObj.getAttribute("fade")
        if(fade)
        cw.drawPolygonFadeCheck.checked = true
        else
            cw.drawPolygonFadeCheck.checked = false

  commentDiv.style.visibility = "hidden"
    if(EditThisPolygon.getAttribute("comment"))
        cw.drawPolygonCommentValue.value = xml2txt(EditPolygonObj.getAttribute("comment"))
        else
            cw.drawPolygonCommentValue.value = ""


                ActiveScale = parseFloat(EditPolygonObj.getAttribute("myScale"))
                var ll0 = parseFloat(EditPolygonObj.getAttribute("ll0"))
                var ll1 = parseFloat(EditPolygonObj.getAttribute("ll1"))
                ActiveLL =[ll0, ll1]

                var t3 = d3.transform(ActiveElem.attr("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                ActiveElem.style("cursor", "move")
                DrawX.attr("stroke", "darkorange")
                DrawX.style("display", "inline")
                DrawX.attr("transform", ActiveElem.attr("transform"))
            //--place dragDot----
            setPolygonEditDrag()

            starSVG.style.cursor = ""

}

function setPolygonEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    //DragDot.style("visibility", "visible")
    starSVG.setAttribute("onmousedown", "startDragPolygon(evt)")
    starSVG.setAttribute("onmousemove", "dragPolygon(evt)")
    starSVG.setAttribute("onmouseup", "endDragPolygon(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditPolygon()
{

  if(document.getElementById("activeElem"))
    {
        var cw = addElemPolygonCw
        activeElem.removeAttribute("class")
        var finishedElem = document.getElementById(DrawPolygonEditId).cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))

         finishedElem.setAttribute("class", "addElem")
        finishedElem.setAttribute("fill", ActiveElem.attr("fill"))
        finishedElem.setAttribute("fill-opacity", ActiveElem.attr("fill-opacity"))
        finishedElem.setAttribute("stroke-width", ActiveElem.attr("stroke-width"))
        finishedElem.setAttribute("stroke", ActiveElem.attr("stroke"))
        if(ActiveElem.attr("stroke-dasharray"))
            finishedElem.setAttribute("stroke-dasharray", ActiveElem.attr("stroke-dasharray"))
            else
                finishedElem.removeAttribute("stroke-dasharray")
                
              if(cw.drawPolygonShadowCheck.checked==true)
                    finishedElem.setAttribute("filter", "url(#drop-shadow)")


            //---update array--
            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var rotateAngle=t3.rotate
            var rotate = ""
            if(rotateAngle!=0)
            rotate = "rotate("+rotateAngle+")"
            finishedElem.setAttribute("rotateAngle", rotateAngle)
            var ll = ActiveLL

            finishedElem.setAttribute("transform", StarPoint(ll)+rotate)
            finishedElem.setAttribute("ll0", ll[0])
            finishedElem.setAttribute("ll1", ll[1])

            if(cw.drawPolygonFadeCheck.checked==true)
            finishedElem.setAttribute("fade", "true")
            else
                finishedElem.removeAttribute("fade")

             for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var myId = AddElemCoordsArray[k][2]
                if(myId==DrawPolygonEditId)
                {
                    AddElemCoordsArray[k][0] = ll
                    AddElemCoordsArray[k][3] = rotateAngle
                    AddElemCoordsArray[k][4] = finishedElem.getAttribute("fade")
                  //AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle, fade])
                    break
                }

            }

            if(cw.drawPolygonCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawPolygonCommentValue.value))
            finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
            finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")
        }
        else
        {
            finishedElem.removeAttribute("comment")
            finishedElem.removeAttribute("onmouseover")
            finishedElem.removeAttribute("onmouseout")
        }
        finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")rotate("+rotateAngle+")")


        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem = null
        activeElem = null
        finishedElem.style.cursor = "default"
        finishedElem.style.display = ""


         
            finishedElem.setAttribute("ondblclick", "editPolygonDraw("+DrawPolygonEditId+")")
            finishedElem.setAttribute("id", DrawPolygonEditId)
             UpdateThisPolygon = finishedElem
             console.log(UpdateThisPolygon)

            domAddElemG.insertBefore(finishedElem, EditThisPolygon)
            domAddElemG.removeChild(EditThisPolygon)
             updatePolygon()
         EditPolygon = false
       closeDrawPolygon()
    }


}

function resetEditPolygon()
{

    var cw = addElemPolygonCw

    document.getElementById(DrawPolygonEditId).setAttribute("opacity", 1)

    EditPolygon = false
    cw.drawPolygonEditSpan.innerText = "Draw Polygons"
    cw.drawPolygonTopTable.style.backgroundColor = "linen"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")

    cw.drawPolygonDeleteButton.style.visibility = "hidden"
    cw.drawPolygonCancelButton.disabled = false
    cw.drawPolygonFinishButton.disabled = false
    DrawPolygon = true
    starSVG.setAttribute('onclick', "placeDrawPolygon()")

}

function cancelEditPolygon()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawPolygonEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null
    starSVG.appendChild(dragDot) //--place drag dot on top---
    closeDrawPolygon()

}

//=======================delete==================
var PolygonDeleted = false
//---button---
function removeCurrentDrawPolygon()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawPolygonEditId)
    domAddElemG.removeChild(elemObjEdit)
    PolygonDeleted = true

    deleteDrawPolygon(DrawPolygonEditId)
    closeDrawPolygon()

}


function showDrawPolygonStrokeBg()
{
    var cw = addElemPolygonCw
    var stroke = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPolygonStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPolygonStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawPolygonStrokeSelected()
{
    var cw = addElemPolygonCw
    var stroke = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawPolygonFillBg()
{
    var cw = addElemPolygonCw
    var fill = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawPolygonFillBg.style.backgroundColor = fill
        else
            cw.drawPolygonFillBg.style.backgroundColor = ""
            if(cw.drawPolygonFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawPolygonFillSelected()
{
    var cw = addElemPolygonCw
    var fill = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    if(cw.drawPolygonFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawPolygonOpacitySelected()
{
    var cw = addElemPolygonCw
    var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}
function drawPolygonVerticeSelected()
{
    var cw = addElemPolygonCw
    var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
    var size = +cw.drawPolygonSizeSelect.options[cw.drawPolygonSizeSelect.selectedIndex].text
    {
        if(cw.polygonRadiusRadio.checked)
            regPolyCircleRad(vCnt, size, 0, 0)
            if(cw.polygonEdgeRadio.checked)
            regPolyEdgeLenth(vCnt, size, 0, 0)
    }

}
function drawPolygonSizeSelected()
{
    var cw = addElemPolygonCw
    var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
    var size = +cw.drawPolygonSizeSelect.options[cw.drawPolygonSizeSelect.selectedIndex].text
    if(ActiveElem)
    {
        if(cw.polygonRadiusRadio.checked)
            regPolyCircleRad(vCnt, size, 0, 0)
            if(cw.polygonEdgeRadio.checked)
            regPolyEdgeLenth(vCnt, size, 0, 0)
    }
}

function drawPolygonStrokeWidthSelected()
{
    var cw = addElemPolygonCw
    var strokeWidth = cw.drawPolygonStrokeWidthSelect.options[cw.drawPolygonStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawPolygonStrokeDashChecked()
{
    var cw = addElemPolygonCw
    if(cw.drawPolygonStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", "8 4")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", null)

    }

}

function drawPolygonShadowChecked()
{

    var cw = addElemPolygonCw
    if(cw.drawPolygonShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("filter", null)

    }

}

function rotatePolygonAdjust(factor)
{
    var cw = addElemPolygonCw
    var mult = parseFloat(cw.rotateDrawPolygonAdjustSelect.options[cw.rotateDrawPolygonAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePolygonValue.value = rotateAdd+parseFloat(cw.adjustedRotatePolygonValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
        ActiveElem.attr("rotateAngle", RotateAngle)

    }
}

function newPolygon(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Polygon/newPolygon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
    var cw = addElemPolygonCw

}
var UpdateThisPolygon
function updatePolygon()
{
    var sendMe = UpdateThisPolygon.cloneNode("true")
    var editId = UpdateThisPolygon.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Polygon/updatePolygon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}


function deleteDrawPolygon(DrawPolygonEditId)
{
    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawPolygonEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }
 
    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawPolygonEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Polygon/deletePolygon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}