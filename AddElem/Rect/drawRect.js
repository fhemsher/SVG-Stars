

///---X button and iframe close all---
function closeDrawRect()
{
    if(addElemRectViz==true)
    {
        RotateAngle = 0
        closeIframe("addElemRect");
        var elemTimelinded = false
        var cw = addElemRectCw


        if(EditRect==true && RectDeleted==false&&elemTimelinded==false)
        {
            var elemObjEdit = document.getElementById(DrawRectEditId)
            elemObjEdit.style.visibility = ""

            elemObjEdit.setAttribute("ondblclick", "editRectDraw("+DrawRectEditId+")")
        }
        DraggingObj = false
        DrawRect = false
        EditRect = false
        RectDeleted = false

        starSVG.removeAttribute("onmousedown")
        starSVG.removeAttribute("onmousemove")
        starSVG.removeAttribute("onmouseup")
        starSVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {
            starG.appendChild(dragDot)
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null
            DrawX.style("display", "none")
            DrawX.attr("stroke", "honeydew")
            DrawX.attr("transform", null)
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)

            var cw = addElemRectCw

            cw.drawRectFinishButton.disabled = true
            cw.drawRectCancelButton.disabled = true
            cw.drawRectDeleteButton.style.visibility = "hidden"
            cw.drawRectEditSpan.innerText = "Draw Rectangles"
            cw.drawRectTopTable.style.backgroundColor = "honeydew"
            coverOff()
            domWrapper.style.display = "none"
            commentDiv.style.visibility = "hidden"

            cw.adjustedRotateRectValue.value = 0

    }
}

//---on add icon DrawX follows cursor
function trackDrawRect()
{

    if(LatLngPntSet==false&& ActiveElem==null&&EditRect==false && RectDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var EditRect = false
var DrawRect = false
var RectDeleted = false
var RectCorner =[]
var RectCornerLL
var ActiveRect

function startRectDraw()
{
    RotateAngle = 0

    var cw = addElemRectCw
    if(EditRect==false)
    {
        activeElem = null

        ActiveElem = null
        DrawRect = true
        starSVG.setAttribute('onclick', " placeDrawRect()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateRectValue)
        cw.adjustedRotateRectValue.value = 0
}

//--click on svg---
function placeDrawRect()
{
    var cw = addElemRectCw
    coverOn()

    cw.drawRectCommentValue.value = "Rectangle comment here(optional)..."
    var strokeColor = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text
    if(cw.drawRectFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }



    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("class", "dragTargetObj")

    ActiveRect = ActiveElem.append("rect")
    .attr("id", "activeRect")
    .style("cursor", "move")
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20)

    //---place dragDot in g---
    activeElem = document.getElementById("activeElem")
    activeElem.appendChild(dragDot)

    if(cw.drawRectStrokeDashCheck.checked==true)
        ActiveRect.attr("stroke-dasharray", "8 4")


    if(LatLngPntSet==false)
    {
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        RectCorner =[SVGx, SVGy]
    }
    else
    {
        activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")
        RectCorner =[SETx, SETy]
        DrawX.attr("transform", "translate("+SETx+" "+SETy+")")
    }

    DrawX.style("display", "inline")
    DrawX.attr("stroke", "violet")
                 ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)





        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")

        //RectCorner =[SVGx, SVGy]

        //DrawX.style("display", "inline")
        //DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

        DragDot.style("visibility", "visible")
        DragDot.attr("transform", "translate("+(20)+" "+(20)+")")
        DragDot.attr("cx", null)

        starSVG.removeAttribute('onclick')

        starSVG.setAttribute("onmousedown", "startDragRect(evt)")
        starSVG.setAttribute("onmousemove", "dragRect(evt)")
        starSVG.setAttribute("onmouseup", "endDragRect(evt)")

        cw.drawRectCancelButton.disabled = false
        cw.drawRectFinishButton.disabled = false
        ActiveScale = StarView.k/StarScale

        ActiveLL = LatLng

}

function finishDrawRect()
{

    if(EditRect==true)
        finishEditRect()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemRectCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeRect").cloneNode(true)
            var id = "rect"+new Date().getTime()
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var t3 = d3.transform(activeElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var rotateAngle = t3.rotate
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            var ll = ActiveLL
            var rotate = ""
            if(rotateAngle!=0)
                rotate = "rotate("+rotateAngle+")"

                if(cw.drawRectFadeCheck.checked==true)
                finishedElem.setAttribute("fade", "true")
                finishedElem.setAttribute("myZoom", PrevZoomInteger)
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])
                var fade = finishedElem.getAttribute("fade")
                AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle, fade])

                finishedElem.setAttribute("class", "addElem")
                finishedElem.style.cursor = "default"

                finishedElem.setAttribute("ondblclick", "editRectDraw("+id+")")

                if(cw.drawRectCommentValue.value!="Rectangle comment here(optional)..." && cw.drawRectCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawRectCommentValue.value))
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

                starSVG.setAttribute('onclick', "placeDrawRect()") //---click to add more icons for this session---
                DrawX.style("display", "none")
                DragDot.style("visibility", "hidden")

                cw.drawRectFinishButton.disabled = true
                cw.drawRectCancelButton.disabled = true
                coverOff()
                commentDiv.style.visibility = "hidden"


            starG.appendChild(dragDot)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null

            finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")rotate("+RotateAngle+")")
            domAddElemG.appendChild(finishedElem)
            newRect(id)

        }
}

function cancelDrawRect()
{
    if(EditRect==true)
        cancelEditRect()
        else if(document.getElementById("activeElem"))
        {
            starG.appendChild(dragDot)
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            starSVG.setAttribute('onclick', "placeDrawRect()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)
            //DrawX.style("visibility","hidden")
            DrawX.attr("transform", null)
            var cw = addElemRectCw
            cw.drawRectFinishButton.disabled = true
            cw.drawRectCancelButton.disabled = true
            cw.adjustedRotateRectValue.value = 0
            coverOff()
            domWrapper.style.display = "none"
        }
        commentDiv.style.visibility = "hidden"

}
function newRect(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Rect/newRect.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}
//====================edit/update rect===============================

var EditRect = false
var DrawRectEditId
var EditThisRect
function editRectDraw(elemObjEdit) //--dblclick on rect---
{
    if(DrawRect==false)
        if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisRect = elemObjEdit

            DrawRectEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveElem = null
            EditRect = true
            if(addElemRectLoad==false)
            {
                openIframe("AddElem", "addElemRect", 10)

            }
            else if(addElemRectViz==false)
            {
                openIframe("AddElem", "addElemRect", 10)
                setEditRect()
            }
            else
                setEditRect()

        }
    }
}
//---after iframe loaded see sendSize() at addElemRect.htm---
var EditRectObj
function setEditRect()
{coverOn()
    starSVG.removeAttribute('onclick')
    var cw = addElemRectCw
    var elemObjEdit = document.getElementById(DrawRectEditId)


    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("transform", elemObjEdit.getAttribute("transform"))
    .attr("class", "dragTargetObj")
    activeElem = document.getElementById("activeElem")
    EditRectObj = elemObjEdit.cloneNode(true)
    activeElem.appendChild(EditRectObj).setAttribute("id", "activeRect")

    ActiveRect = d3.select("#activeRect")
    .attr("transform", null)
    .attr("class", null)
    .attr("onmouseover", null)
    .attr("onmouseout", null)
    .attr("onmousedown", null)
    .attr("onmouseup", null)
    activeElem.appendChild(dragDot)

    ActiveScale = parseFloat(elemObjEdit.getAttribute("myScale"))
    var ll0 = parseFloat(elemObjEdit.getAttribute("ll0"))
    var ll1 = parseFloat(elemObjEdit.getAttribute("ll1"))
    ActiveLL =[ll0, ll1]
    //---is this text rotated?---
    var pt = d3.transform(elemObjEdit.getAttribute("transform"))
    RotateAngle = pt.rotate

    var rotatedDeg = pt.rotate.toFixed(0)
    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateRectValue.value = rotatedDeg

        commentDiv.style.visibility = "hidden"
        if(EditThisRect.getAttribute("comment"))
        cw.drawRectCommentValue.value = xml2txt(EditRectObj.getAttribute("comment"))
        else
            cw.drawRectCommentValue.value = ""

            EditRectObj.style.cursor = "move"
            elemObjEdit.style.visibility = "hidden"

            //  domActiveElemG.appendChild(EditRectObj)
            ActiveElem = d3.select("#activeElem")
            activeElem = document.getElementById("activeElem")

            cw.drawRectCancelButton.disabled = false
            cw.drawRectFinishButton.disabled = false

            var rx = EditRectObj.getAttribute("rx")
            var dash = EditRectObj.getAttribute("stroke-dasharray")
            if(rx)
            cw.drawRectStrokeRoundCheck.checked = true
            else
                cw.drawRectStrokeRoundCheck.checked = false
                if(dash)
                cw.drawRectStrokeDashCheck.checked = true
                else
                    cw.drawRectStrokeDashCheck.checked = false

                    var stroke = EditRectObj.getAttribute("stroke")
                    var strokeWidth = EditRectObj.getAttribute("stroke-width")
                    var fill = EditRectObj.getAttribute("fill")
                    var opacity = EditRectObj.getAttribute("fill-opacity")

                    if(opacity!="0")
                {
                    setSelect("Rect", "Opacity", opacity)
                    setSelect("Rect", "Fill", fill)
                    cw.drawRectFillBg.style.backgroundColor = fill
                }
                else
                {
                    cw.drawRectFillBg.style.backgroundColor = ""
                    cw.drawRectFillSelect.selectedIndex = 0

                }

                var fade = EditRectObj.getAttribute("fade")
                if(fade)
                cw.drawRectFadeCheck.checked = true
                else
                    cw.drawRectFadeCheck.checked = false

                    setSelect("Rect", "Stroke", stroke)
                    setSelect("Rect", "StrokeWidth", strokeWidth)
                    //---update bg colors---
                    cw.drawRectStrokeBg.style.backgroundColor = stroke
                    cw.drawRectDeleteButton.style.visibility = "visible"
                    cw.drawRectEditSpan.innerText = "Edit Rectangle"
                    cw.drawRectTopTable.style.backgroundColor = "orange"

                    ActiveElem.style("cursor", "move")
                    DrawX.attr("stroke", "darkorange")
                    DrawX.style("display", "inline")
                    DrawX.attr("transform", ActiveElem.attr("transform"))

                    var tr = d3.transform(ActiveElem.attr("transform"))
                    var cornerX = tr.translate[0]
                    var cornery = tr.translate[1]
                    RectCorner =[cornerX, cornery]

                    //--place dragDot----
                    var width = parseFloat(ActiveRect.attr("width"))
                    var height = parseFloat(ActiveRect.attr("height"))
                    var pt = d3.transform(ActiveElem.attr("transform"))
                    var transX = pt.translate[0]+width
                    var transY = pt.translate[1]+height

                    DragDot.attr("transform", "translate("+(width)+" "+(height)+")")

                    DragDot.style("visibility", "visible")

                    starSVG.removeAttribute('onclick')
                    //---timeout??---
                    starSVG.setAttribute("onmousedown", "startDragRect(evt)")
                    starSVG.setAttribute("onmousemove", "dragRect(evt)")
                    starSVG.setAttribute("onmouseup", "endDragRect(evt)")

}

function finishEditRect()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemRectCw
        activeElem.removeAttribute("class")
        var finishedElem = document.getElementById(DrawRectEditId).cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))
        finishedElem.setAttribute("width", ActiveRect.attr("width"))
        finishedElem.setAttribute("height", ActiveRect.attr("height"))
         finishedElem.setAttribute("class", "addElem")
        finishedElem.setAttribute("fill", ActiveRect.attr("fill"))
        finishedElem.setAttribute("fill-opacity", ActiveRect.attr("fill-opacity"))
        finishedElem.setAttribute("stroke-width", ActiveRect.attr("stroke-width"))
        finishedElem.setAttribute("stroke", ActiveRect.attr("stroke"))
        if(ActiveRect.attr("stroke-dasharray"))
            finishedElem.setAttribute("stroke-dasharray", ActiveRect.attr("stroke-dasharray"))
            else
                finishedElem.removeAttribute("stroke-dasharray")
                if(ActiveRect.attr("rx"))
            {
                finishedElem.setAttribute("rx", ActiveRect.attr("rx"))
                finishedElem.setAttribute("ry", ActiveRect.attr("ry"))

            }
            else
            {
                finishedElem.removeAttribute("rx")
                finishedElem.removeAttribute("ry")

            }

            //---update array--
            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            //var rotateAngle=t3.rotate
            var rotate = ""
            if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"
            finishedElem.setAttribute("rotateAngle", RotateAngle)
            var ll = ActiveLL

            finishedElem.setAttribute("transform", StarPoint(ll)+rotate)
            finishedElem.setAttribute("ll0", ll[0])
            finishedElem.setAttribute("ll1", ll[1])

            if(cw.drawRectFadeCheck.checked==true)
            finishedElem.setAttribute("fade", "true")
            else
                finishedElem.removeAttribute("fade")

             for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var myId = AddElemCoordsArray[k][2]
                if(myId==DrawRectEditId)
                {
                    AddElemCoordsArray[k][0] = ll
                    AddElemCoordsArray[k][3] = RotateAngle
                    AddElemCoordsArray[k][4] = finishedElem.getAttribute("fade")
                  //AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle, fade])
                    break
                }

            }

            if(cw.drawRectCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawRectCommentValue.value))
            finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
            finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")
        }
        else
        {
            finishedElem.removeAttribute("comment")
            finishedElem.removeAttribute("onmouseover")
            finishedElem.removeAttribute("onmouseout")
        }
                finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")rotate("+RotateAngle+")")

        domActiveElemG.appendChild(dragDot)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem = null
        activeElem = null
        finishedElem.style.cursor = "default"
        finishedElem.style.visibility = ""



            finishedElem.setAttribute("ondblclick", "editRectDraw("+DrawRectEditId+")")
            finishedElem.setAttribute("id", DrawRectEditId)
             UpdateThisRect = finishedElem
            updateRect()
            domAddElemG.insertBefore(finishedElem, EditThisRect)
            domAddElemG.removeChild(EditThisRect)

         EditRect = false
        closeDrawRect()
    }

}

function resetEditRect()
{

    var cw = addElemRectCw
    EditRect = false
    cw.editRectSpan.innerText = "Draw Rects"
    cw.drawRectTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "honeydew")
    DragDot.style("visibility", "hidden")

    cw.drawRectDeleteButton.style.visibility = "hidden"
    cw.drawRectCancelButton.disabled = false
    cw.drawRectFinishButton.disabled = false
    DrawRect = true
    starSVG.setAttribute('onclick', " placeDrawRect()")

    //---click to add more circles for this session---

    commentDiv.style.visibility = "hidden"

}

function cancelEditRect()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawRectEditId)
    elemObjEdit.style.visibility = ""
    starG.appendChild(dragDot)
    domActiveElemG.removeChild(document.getElementById("activeElem"))

    commentDiv.style.visibility = "hidden"
    ActiveElem = null
    setEditRect()
}

var UpdateThisRect
function updateRect()
{
    var sendMe = UpdateThisRect.cloneNode("true")
    var editId = UpdateThisRect.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Rect/updateRect.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

//=======================delete rect==================
var RectDeleted = false
//---button---
function removeCurrentDrawRect()
{
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawRectEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }

    var cw = addElemRectCw


    RectDeleted = true
    
        closeDrawRect()

}

function deleteDrawRect(DrawRectEditId)
{
    domAddElemG.removeChild(EditThisRect)
    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawRectEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Rect/deleteRect.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

}

function showDrawRectStrokeBg()
{
    var cw = addElemRectCw
    var stroke = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawRectStrokeBg.style.backgroundColor = stroke
        else
            cw.drawRectStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveRect.attr("stroke", stroke)

}

function drawRectStrokeSelected()
{
    var cw = addElemRectCw
    var stroke = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveRect.attr("stroke", stroke)

}

function showDrawRectFillBg()
{
    var cw = addElemRectCw
    var fill = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawRectFillBg.style.backgroundColor = fill
        else
            cw.drawRectFillBg.style.backgroundColor = ""
            if(cw.drawRectFillSelect.selectedIndex==0)
        {
            ActiveRect.attr("fill", "white")
            ActiveRect.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveRect.attr("fill", fill)
            var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text

            ActiveRect.attr("fill-opacity", opacity)

        }

}

function drawRectFillSelected()
{
    var cw = addElemRectCw
    var fill = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    if(cw.drawRectFillSelect.selectedIndex==0)
    {
        ActiveRect.attr("fill", "white")
        ActiveRect.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveRect.attr("fill", fill)
        var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text

        ActiveRect.attr("fill-opacity", opacity)

    }

}

function drawRectOpacitySelected()
{
    var cw = addElemRectCw
    var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveRect.attr("fill-opacity", opacity)

}

function drawRectStrokeWidthSelected()
{
    var cw = addElemRectCw
    var strokeWidth = cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
    {
        ActiveRect.attr("stroke-width", strokeWidth)
        if(cw.drawRectStrokeDashCheck.checked==true)
        {
            da1 = 8
            da2 = 3

            ActiveRect.attr("stroke-dasharray", da1+" "+da2)

        }
        if(cw.drawRectStrokeRoundCheck.checked==true)
        {
            rxy = 5*strokeWidth

            ActiveRect.attr("rx", rxy)
            ActiveRect.attr("ry", rxy)

        }

    }

}

function drawRectStrokeRoundChecked()
{
    var cw = addElemRectCw
    var strokeWidth = parseFloat(cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].text)
    if(ActiveElem)
    {
        if(cw.drawRectStrokeRoundCheck.checked==true)
        {

            ActiveRect.attr("rx", 5*strokeWidth)
            ActiveRect.attr("ry", 5*strokeWidth)

        }
        else
        {
            ActiveRect.attr("rx", null)
            ActiveRect.attr("ry", null)

        }

    }
}

function drawRectStrokeDashChecked()
{
    var cw = addElemRectCw
    if(cw.drawRectStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
        {
            var strokeWidth = parseFloat(cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].text)
            da1 = 8
            da2 = 3

            ActiveRect.attr("stroke-dasharray", da1+" "+da2)

        }

    }
    else
    {
        if(ActiveElem)
            ActiveRect.attr("stroke-dasharray", null)
    }

}

function rotateRectAdjust(factor)
{
    var cw = addElemRectCw
    var mult = parseFloat(cw.rotateDrawRectAdjustSelect.options[cw.rotateDrawRectAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateRectValue.value = rotateAdd+parseFloat(cw.adjustedRotateRectValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}