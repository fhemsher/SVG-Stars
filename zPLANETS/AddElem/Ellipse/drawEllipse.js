///---X button and iframe close all---
function closeDrawEllipse()
{
    if(addElemEllipseViz==true)
    {
        closeIframe("addElemEllipse");
        coverOff()
        RotateAngle = 0
        var cw = addElemEllipseCw
        cw.adjustedRotateEllipseValue.value = 0
        var elemTimelinded = false


        if(EditEllipse==true && EllipseDeleted==false&&elemTimelinded==false)
        {
            var elemObjEdit = document.getElementById(DrawEllipseEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("ondblclick", "editEllipseDraw("+DrawEllipseEditId+")")

        }
        DraggingObj = false
        DrawEllipse = false
        EditEllipse = false
        EllipseDeleted = false

        planetSVG.removeAttribute("onmousedown")
        planetSVG.removeAttribute("onmousemove")
        planetSVG.removeAttribute("onmouseup")

        planetSVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            starG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")

        }
        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")


        cw.drawEllipseFinishButton.disabled = true
        cw.drawEllipseCancelButton.disabled = true
        cw.drawEllipseCancelButton.style.borderColor = ""
        cw.drawEllipseDeleteButton.style.visibility = "hidden"
        cw.drawEllipseEditSpan.innerText = "Draw Ellipses"
        cw.drawEllipseTopTable.style.backgroundColor = "honeydew"

        commentDiv.style.visibility = "hidden"

    }
}

//---on add icon DrawX follows cursor
function trackDrawEllipse()
{
    var cw = addElemEllipseCw

    if(LatLngPntSet==false&&ActiveElem==null&&EditEllipse==false && EllipseDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditEllipse = false
var DrawEllipse = false
var EllipseDeleted = false
var EllipseCenter =[]
var EllipseCenterLL
var EllipseRadiusLL

function startEllipseDraw()
{
    var cw = addElemEllipseCw
    RotateAngle = 0

    if(EditEllipse==false)
    {
        ActiveElem = null
        activeElem = null

        DrawEllipse = true
        if(LatLngPntSet==true)
            placeDrawEllipse()
            else
            {
                planetSVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---

            }

    }

    if(cw.adjustedRotateEllipseValue)
        cw.adjustedRotateEllipseValue.value = 0
}

//--click on svg---
function placeDrawEllipse()
{
    var cw = addElemEllipseCw
    coverOn()
    cw.drawEllipseCommentValue.value = "Ellipse comment here(optional)..."
    var strokeColor = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawEllipseStrokeWidthSelect.options[cw.drawEllipseStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text
    if(cw.drawEllipseFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("ellipse")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    .attr("vector-effect", "non-scaling-stroke")

    if(cw.drawEllipseStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 60)

        if(LatLngPntSet==false)
    {
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        EllipseCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

    }
    else
    {
        activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")
        DragDot.attr("transform", "translate("+(SETx)+" "+SETy+")")
        EllipseCenter =[SETx, SETy]
        ActiveElem.attr("class", null)
        ActiveElem.style("cursor", "default")

    }
    var t3 = d3.transform(ActiveElem.attr("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]
    ActiveLL = PlanetProjection.invert([transX, transY])
    ActiveScale = PlanetView.k/PlanetScale

    ActiveElem.attr("rx", 60)
    ActiveElem.attr("ry", 30)

    DragDot.style("visibility", "visible")

    planetSVG.removeAttribute('onclick')
    planetSVG.style.cursor = ""
    planetSVG.setAttribute("onmousedown", "startDragEllipse(evt)")
    planetSVG.setAttribute("onmousemove", "dragEllipse(evt)") //;showPlanetComment(evt)
    planetSVG.setAttribute("onmouseup", "endDragEllipse(evt)")

    cw.drawEllipseCancelButton.disabled = false
    cw.drawEllipseFinishButton.disabled = false

}

function finishDrawEllipse()
{

    if(EditEllipse==true)
        finishEditEllipse()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemEllipseCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "ellipse"+new Date().getTime()
            domAddElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)
            if(cw.drawEllipseCommentValue.value!="Ellipse comment here(optional)..." && cw.drawEllipseCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawEllipseCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }
            finishedElem.setAttribute("onmousedown", "emailElemCreator("+id+")")
            finishedElem.setAttribute("ondblclick", "editEllipseDraw("+id+")")

            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var ll = PlanetProjection.invert([transX, transY])

            var rotateAngle = t3.rotate
            var rotate = ""
            if(rotateAngle!=0)
                rotate = "rotate("+rotateAngle+")"

                finishedElem.setAttribute("rotateAngle", rotateAngle)


                finishedElem.setAttribute("myZoom", PrevZoomInteger)
                finishedElem.setAttribute("transform", PlanetPoint(ll))
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])


                AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle])

                finishedElem.setAttribute("class", "addElem")

                if(oEMAIL)
                finishedElem.setAttribute("createdBy", oEMAIL)


                    ActiveElem = null
                    activeElem = null
                    if(LatLngPntSet==true)
                {
                    setRaDecCheck.checked = false
                    setRaDecChecked() //---turn off---
                }

                // d3SVG.style("cursor", "default")
                planetSVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---
                DrawX.style("display", "none")
                DragDot.style("visibility", "hidden")
                planetViewG.appendChild(dragDot)
                cw.drawEllipseFinishButton.disabled = true
                cw.drawEllipseCancelButton.disabled = true

                commentDiv.style.visibility = "hidden"

            finishedElem.setAttribute("transform", PlanetPoint(ActiveLL)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")rotate("+RotateAngle+")")

            newEllipse(id)

        }
}

function cancelDrawEllipse()
{var cw = addElemEllipseCw
    if(EditEllipse==true)
        cancelEditEllipse()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            planetSVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            planetViewG.appendChild(dragDot)
            cw.drawEllipseFinishButton.disabled = true
            cw.drawEllipseCancelButton.disabled = true
            cw.adjustedRotateEllipseValue.value = 0

            coverOff()

        }
        commentDiv.style.visibility = "hidden"

        cw.drawEllipseCancelButton.style.borderColor = ""

}
function newEllipse(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Ellipse/newEllipse.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
    var cw = addElemEllipseCw

}
//====================edit/update ellipse===============================

var EditEllipse = false
var DrawEllipseEditId
var EditThisEllipse
//--dblclick on ellipse---
function editEllipseDraw(elemObjEdit)
{

    if(DrawEllipse==false)
        if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisEllipse = elemObjEdit

            DrawEllipseEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--


            ActiveElem = null

            EditEllipse = true
            if(addElemEllipseLoad==false)
            {
                openIframe("AddElem", "addElemEllipse", 10)

            }
            else if(addElemEllipseViz==false)
            {
                openIframe("AddElem", "addElemEllipse", 10)
                setEditEllipse()
            }
            else
                setEditEllipse()
        }
    }
}
//---after iframe loaded see sendSize() at addElemEllipse.htm---
var EditEllipseObj
function setEditEllipse()
{
    coverOn()

    planetSVG.removeAttribute('onclick')
    var cw = addElemEllipseCw
    var elemObjEdit = document.getElementById(DrawEllipseEditId)

    EditEllipseObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditEllipseObj.setAttribute("id", "activeElem")
    EditEllipseObj.setAttribute("class", "dragTargetObj")
    EditEllipseObj.removeAttribute("onmouseover")
    EditEllipseObj.removeAttribute("onmouseout")
    EditEllipseObj.removeAttribute("ondblclick")


    commentDiv.style.visibility = "hidden"

    if(EditThisEllipse.getAttribute("comment"))
        cw.drawEllipseCommentValue.value = xml2txt(EditEllipseObj.getAttribute("comment"))
        else
            cw.drawEllipseCommentValue.value = ""

            EditEllipseObj.style.cursor = "move"

            domActiveElemG.appendChild(EditEllipseObj)
            ActiveElem = d3.select("#activeElem")
            activeElem = document.getElementById("activeElem")
            domActiveElemG.appendChild(dragDot) //--place drag dot on top---
            cw.drawEllipseDeleteButton.style.visibility = "visible"
            cw.drawEllipseEditSpan.innerText = "Edit Ellipse"
            cw.drawEllipseTopTable.style.backgroundColor = "orange"
            //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
            //activeElem.removeAttribute("transform")
            cw.drawEllipseCancelButton.disabled = false
            cw.drawEllipseFinishButton.disabled = false

            var stroke = EditEllipseObj.getAttribute("stroke")
            var strokeWidth = EditEllipseObj.getAttribute("stroke-width")
            var fill = EditEllipseObj.getAttribute("fill")
            var opacity = EditEllipseObj.getAttribute("fill-opacity")

            if(opacity!="0")
        {
            setSelect("Ellipse", "Opacity", opacity)
            setSelect("Ellipse", "Fill", fill)
            cw.drawEllipseFillBg.style.backgroundColor = fill
        }
        else
        {
            cw.drawEllipseFillBg.style.backgroundColor = ""
            cw.drawEllipseFillSelect.selectedIndex = 0

        }

            setSelect("Ellipse", "Stroke", stroke)
            setSelect("Ellipse", "StrokeWidth", strokeWidth)
            //---update bg colors---
            cw.drawEllipseStrokeBg.style.backgroundColor = stroke
            if(ActiveElem.attr("stroke-dasharray"))
            cw.drawEllipseStrokeDashCheck.checked = true
            else
                cw.drawEllipseStrokeDashCheck.checked = false

                ActiveScale = parseFloat(EditEllipseObj.getAttribute("myScale"))
                var ll0 = parseFloat(EditEllipseObj.getAttribute("ll0"))
                var ll1 = parseFloat(EditEllipseObj.getAttribute("ll1"))
                ActiveLL =[ll0, ll1]
                var pt = d3.transform(elemObjEdit.getAttribute("transform"))
                RotateAngle = pt.rotate
                var rotatedDeg = pt.rotate.toFixed(0)
                if(!rotatedDeg) rotatedDeg = 0
                cw.adjustedRotateEllipseValue.value = rotatedDeg
                var t3 = d3.transform(ActiveElem.attr("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]

                ActiveElem.style("cursor", "move")
                DrawX.attr("stroke", "darkorange")
                DrawX.style("display", "inline")
                DrawX.attr("transform", ActiveElem.attr("transform"))
                var radiusX = parseFloat(ActiveElem.attr("rx"))
                var radiusY = parseFloat(ActiveElem.attr("ry"))
                DragDot.attr("cx", radiusX)
                DragDot.attr("cy", radiusY)

                DragDot.attr("transform", "translate("+transX+" "+transY+")")

                DragDot.style("visibility", "visible")
                //--place dragDot----

                planetSVG.removeAttribute('onclick')
                //---timeout??---
                planetSVG.setAttribute("onmousedown", "startDragEllipse(evt)")
                planetSVG.setAttribute("onmousemove", "dragEllipse(evt)")
                planetSVG.setAttribute("onmouseup", "endDragEllipse(evt)")

}

function finishEditEllipse()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemEllipseCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "addElem")
        finishedElem.setAttribute("ondblclick", "editEllipseDraw("+DrawEllipseEditId+")")

        var ll = ActiveLL

        finishedElem.setAttribute("myScale", ActiveScale)
        finishedElem.setAttribute("ll0", ll[0])
        finishedElem.setAttribute("ll1", ll[1])
        var rotate = ""
        if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"
            finishedElem.setAttribute("rotateAngle", RotateAngle)
            var ll = ActiveLL

            finishedElem.setAttribute("transform", PlanetPoint(ll)+rotate)
            finishedElem.setAttribute("id", DrawEllipseEditId)

            for(var k = 0; k<AddElemCoordsArray.length; k++)
        {
            var addId = AddElemCoordsArray[k][2]
            if(addId==DrawEllipseEditId)
            {

                AddElemCoordsArray[k][0] = ll
                AddElemCoordsArray[k][3] = RotateAngle

                break
            }
        }

        if(cw.drawEllipseCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawEllipseCommentValue.value))
            finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
            finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

        }
        else
        {
            finishedElem.removeAttribute("comment")
            finishedElem.removeAttribute("onmouseover")
            finishedElem.removeAttribute("onmouseout")

        }


                domActiveElemG.removeChild(document.getElementById("activeElem"))
                finishedElem.style.cursor = "default"
                finishedElem.setAttribute("transform", PlanetPoint(ActiveLL)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")rotate("+RotateAngle+")")


                finishedElem.setAttribute("onmousedown", "emailElemCreator("+DrawEllipseEditId+")")
                finishedElem.setAttribute("ondblclick", "editEllipseDraw("+DrawEllipseEditId+")")
                finishedElem.setAttribute("id", DrawEllipseEditId)
                domAddElemG.insertBefore(finishedElem, EditThisEllipse)
                domAddElemG.removeChild(EditThisEllipse)
                UpdateThisEllipse = finishedElem
                updateEllipse(DrawEllipseEditId)


            closeDrawEllipse()
    }

}

function resetEditEllipse()
{

    var cw = addElemEllipseCw

    document.getElementById(DrawEllipseEditId).setAttribute("opacity", 1)

    EditEllipse = false
    cw.editEllipseSpan.innerText = "Draw Ellipses"
    cw.drawEllipseTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "honeydew")
    DragDot.style("visibility", "hidden")

    cw.drawEllipseDeleteButton.style.visibility = "hidden"
    cw.drawEllipseCancelButton.disabled = false
    cw.drawEllipseFinishButton.disabled = false
    DrawEllipse = true
    planetSVG.setAttribute('onclick', "placeDrawEllipse()")

    //---click to add more ellipses for this session---
    commentDiv.style.visibility = "hidden"

}

function cancelEditEllipse()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawEllipseEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    commentDiv.style.visibility = "hidden"
    ActiveElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    closeDrawEllipse()
    //setEditEllipse()

}

var UpdateThisEllipse
function updateEllipse()
{
    var sendMe = UpdateThisEllipse.cloneNode("true")
    var editId = UpdateThisEllipse.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Ellipse/updateEllipse.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

//=======================delete ellipse==================
var EllipseDeleted = false
//---button---
function removeCurrentDrawEllipse()
{

    domActiveElemG.removeChild(activeElem)
    EllipseDeleted = true

    var cw = addElemEllipseCw


    
        closeDrawEllipse()

}

function deleteDrawEllipse(DrawEllipseEditId)
{
    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawEllipseEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }
    domAddElemG.removeChild(EditThisEllipse)
    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawEllipseEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Ellipse/deleteEllipse.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

function showDrawEllipseStrokeBg()
{
    var cw = addElemEllipseCw
    var stroke = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawEllipseStrokeBg.style.backgroundColor = stroke
        else
            cw.drawEllipseStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawEllipseStrokeSelected()
{
    var cw = addElemEllipseCw
    var stroke = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawEllipseFillBg()
{
    var cw = addElemEllipseCw
    var fill = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawEllipseFillBg.style.backgroundColor = fill
        else
            cw.drawEllipseFillBg.style.backgroundColor = ""
            if(cw.drawEllipseFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawEllipseFillSelected()
{
    var cw = addElemEllipseCw
    var fill = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    if(cw.drawEllipseFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawEllipseOpacitySelected()
{
    var cw = addElemEllipseCw
    var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawEllipseStrokeWidthSelected()
{
    var cw = addElemEllipseCw
    var strokeWidth = cw.drawEllipseStrokeWidthSelect.options[cw.drawEllipseStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawEllipseStrokeDashChecked()
{
    var cw = addElemEllipseCw
    if(cw.drawEllipseStrokeDashCheck.checked==true)
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

function rotateEllipseAdjust(factor)
{
    var cw = addElemEllipseCw
    var mult = parseFloat(cw.rotateDrawEllipseAdjustSelect.options[cw.rotateDrawEllipseAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateEllipseValue.value = rotateAdd+parseFloat(cw.adjustedRotateEllipseValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}