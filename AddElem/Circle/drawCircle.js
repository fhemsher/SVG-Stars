///---X button and iframe close all---
function closeDrawCircle()
{
    if(addElemCircleViz==true)
    {
        closeIframe("addElemCircle");
        coverOff()

        var cw = addElemCircleCw



        if(EditCircle==true && CircleDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawCircleEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("ondblclick", "editCircleDraw("+DrawCircleEditId+")")

        }
        DraggingObj = false
        DrawCircle = false
        EditCircle = false
        CircleDeleted = false

        starSVG.removeAttribute("onmousedown")
        starSVG.removeAttribute("onmousemove")
        starSVG.removeAttribute("onmouseup")

        starSVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
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

        cw.drawCircleFinishButton.disabled = true
        cw.drawCircleCancelButton.disabled = true
        cw.drawCircleCancelButton.style.borderColor = ""
        cw.drawCircleDeleteButton.style.visibility = "hidden"
        cw.drawCircleEditSpan.innerText = "Draw Circles"
        cw.drawCircleTopTable.style.backgroundColor = "honeydew"

        commentDiv.style.visibility = "hidden"

    }
}

//---on add icon DrawX follows cursor
function trackDrawCircle()
{
    var cw = addElemCircleCw

    if(LatLngPntSet==false&&ActiveElem==null&&EditCircle==false && CircleDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditCircle = false
var DrawCircle = false
var CircleDeleted = false
var CircleCenter =[]
var CircleCenterLL
var CircleRadiusLL

function startCircleDraw()
{
    var cw = addElemCircleCw

    if(EditCircle==false)
    {
        ActiveElem = null
        activeElem = null
        DrawCircle = true
        if(LatLngPntSet==true)
            placeDrawCircle()
            else
            {
                starSVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---

            }

    }


}

//--click on svg---
function placeDrawCircle()
{
    var cw = addElemCircleCw
    coverOn()

    var strokeColor = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawCircleStrokeWidthSelect.options[cw.drawCircleStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text
    if(cw.drawCircleFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("circle")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    .attr("vector-effect", "non-scaling-stroke")

    if(cw.drawCircleStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 20)

        if(LatLngPntSet==false)
    {
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        CircleCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

    }
    else
    {
        activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")
        DragDot.attr("transform", "translate("+(SETx)+" "+SETy+")")
        CircleCenter =[SETx, SETy]
        ActiveElem.attr("class", null)
        ActiveElem.style("cursor", "default")

    }
    var t3 = d3.transform(ActiveElem.attr("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]
    ActiveLL = StarProjection.invert([transX, transY])
    ActiveScale = StarView.k/StarScale

    ActiveElem.attr("r", 20)

    DragDot.style("visibility", "visible")

    starSVG.removeAttribute('onclick')
    starSVG.style.cursor = ""
    starSVG.setAttribute("onmousedown", "startDragCircle(evt)")
    starSVG.setAttribute("onmousemove", "dragCircle(evt)") //;showStarComment(evt)
    starSVG.setAttribute("onmouseup", "endDragCircle(evt)")

    cw.drawCircleCancelButton.disabled = false
    cw.drawCircleFinishButton.disabled = false

}

function finishDrawCircle()
{

    if(EditCircle==true)
        finishEditCircle()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemCircleCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "circle"+new Date().getTime()

            finishedElem.setAttribute("id", id)

            if(cw.drawCircleCommentValue.value!="Circle comment here(optional)..." && cw.drawCircleCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawCircleCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }

            finishedElem.setAttribute("ondblclick", "editCircleDraw("+id+")")
            domAddElemG.appendChild(finishedElem)
            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var ll = StarProjection.invert([transX, transY])

            finishedElem.setAttribute("myZoom", PrevZoomInteger)
            finishedElem.setAttribute("transform", StarPoint(ll))
            finishedElem.setAttribute("myScale", ActiveScale)
            finishedElem.setAttribute("ll0", ll[0])
            finishedElem.setAttribute("ll1", ll[1])

            if(cw.drawCircleFadeCheck.checked==true)
                finishedElem.setAttribute("fade", "true")
                var fade = finishedElem.getAttribute("fade")
                AddElemCoordsArray.push([ll, ActiveScale, id, "", fade])

                finishedElem.setAttribute("class", "addElem")


                    finishedElem.setAttribute("createdBy", oEMAIL)

                    ActiveElem = null
                    activeElem = null
                    if(LatLngPntSet==true)
                {
                    setRaDecCheck.checked = false
                    setRaDecChecked() //---turn off---
                }

                // d3SVG.style("cursor", "default")
                starSVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---
                DrawX.style("display", "none")
                DragDot.style("visibility", "hidden")
                starG.appendChild(dragDot)
                cw.drawCircleFinishButton.disabled = true
                cw.drawCircleCancelButton.disabled = true

                commentDiv.style.visibility = "hidden"


            finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")

            newCircle(id)

        }
}

function cancelDrawCircle()
{var cw = addElemCircleCw
    if(EditCircle==true)
        cancelEditCircle()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            starSVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            starG.appendChild(dragDot)
            cw.drawCircleFinishButton.disabled = true
            cw.drawCircleCancelButton.disabled = true
            coverOff()

        }
        commentDiv.style.visibility = "hidden"

        cw.drawCircleCancelButton.style.borderColor = ""

}
function newCircle(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Circle/newCircle.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
    var cw = addElemCircleCw

}
//====================edit/update circle===============================

var EditCircle = false
var DrawCircleEditId
var EditThisCircle
//--dblclick on circle---
function editCircleDraw(elemObjEdit)
{

    if(DrawCircle==false)
        if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisCircle = elemObjEdit

            DrawCircleEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--


            ActiveElem = null
            activeElem = null

            EditCircle = true
            if(addElemCircleLoad==false)
            {
                openIframe("AddElem", "addElemCircle", 10)

            }
            else if(addElemCircleViz==false)
            {
                openIframe("AddElem", "addElemCircle", 10)
                setEditCircle()
            }
            else
                setEditCircle()
        }
    }
}
//---after iframe loaded see sendSize() at addElemCircle.htm---
var EditCircleObj
function setEditCircle()
{
    coverOn()

    starSVG.removeAttribute('onclick')
    var cw = addElemCircleCw
    var elemObjEdit = document.getElementById(DrawCircleEditId)

    EditCircleObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditCircleObj.setAttribute("id", "activeElem")
    EditCircleObj.setAttribute("class", "dragTargetObj")
    EditCircleObj.removeAttribute("onmouseover")
    EditCircleObj.removeAttribute("onmouseout")
    EditCircleObj.removeAttribute("ondblclick")


    commentDiv.style.visibility = "hidden"

    if(EditThisCircle.getAttribute("comment"))
        cw.drawCircleCommentValue.value = xml2txt(EditCircleObj.getAttribute("comment"))
        else
            cw.drawCircleCommentValue.value = ""

            EditCircleObj.style.cursor = "move"

            domActiveElemG.appendChild(EditCircleObj)
            ActiveElem = d3.select("#activeElem")
            activeElem = document.getElementById("activeElem")
            domActiveElemG.appendChild(dragDot) //--place drag dot on top---
            cw.drawCircleDeleteButton.style.visibility = "visible"
            cw.drawCircleEditSpan.innerText = "Edit Circle"
            cw.drawCircleTopTable.style.backgroundColor = "orange"
            //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
            //activeElem.removeAttribute("transform")
            cw.drawCircleCancelButton.disabled = false
            cw.drawCircleFinishButton.disabled = false

            var stroke = EditCircleObj.getAttribute("stroke")
            var strokeWidth = EditCircleObj.getAttribute("stroke-width")
            var fill = EditCircleObj.getAttribute("fill")
            var opacity = EditCircleObj.getAttribute("fill-opacity")

            if(opacity!="0")
        {
            setSelect("Circle", "Opacity", opacity)
            setSelect("Circle", "Fill", fill)
            cw.drawCircleFillBg.style.backgroundColor = fill
        }
        else
        {
            cw.drawCircleFillBg.style.backgroundColor = ""
            cw.drawCircleFillSelect.selectedIndex = 0

        }

        var fade = EditCircleObj.getAttribute("fade")
        if(fade)
        cw.drawCircleFadeCheck.checked = true
        else
            cw.drawCircleFadeCheck.checked = false

            setSelect("Circle", "Stroke", stroke)
            setSelect("Circle", "StrokeWidth", strokeWidth)
            //---update bg colors---
            cw.drawCircleStrokeBg.style.backgroundColor = stroke
            if(ActiveElem.attr("stroke-dasharray"))
            cw.drawCircleStrokeDashCheck.checked = true
            else
                cw.drawCircleStrokeDashCheck.checked = false

                ActiveScale = parseFloat(EditCircleObj.getAttribute("myScale"))
                var ll0 = parseFloat(EditCircleObj.getAttribute("ll0"))
                var ll1 = parseFloat(EditCircleObj.getAttribute("ll1"))
                ActiveLL =[ll0, ll1]

                var t3 = d3.transform(ActiveElem.attr("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                ActiveElem.style("cursor", "move")
                DrawX.attr("stroke", "darkorange")
                DrawX.style("display", "inline")
                DrawX.attr("transform", ActiveElem.attr("transform"))
                var radius = parseFloat(ActiveElem.attr("r"))
                DragDot.attr("cx", radius)

                DragDot.attr("transform", "translate("+transX+" "+transY+")")

                DragDot.style("visibility", "visible")
                //--place dragDot----

                starSVG.removeAttribute('onclick')
                //---timeout??---
                starSVG.setAttribute("onmousedown", "startDragCircle(evt)")
                starSVG.setAttribute("onmousemove", "dragCircle(evt)")
                starSVG.setAttribute("onmouseup", "endDragCircle(evt)")

}

function finishEditCircle()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemCircleCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "addElem")

        var ll = ActiveLL
        //---rescale radius to current scale----
        var radius = parseFloat(finishedElem.getAttribute("r"))

        finishedElem.setAttribute("r", radius)
          var ll = ActiveLL
        finishedElem.setAttribute("myScale", ActiveScale)
        finishedElem.setAttribute("ll0", ll[0])
        finishedElem.setAttribute("ll1", ll[1])

        finishedElem.setAttribute("id", DrawCircleEditId)
        if(cw.drawCircleFadeCheck.checked==true)
            finishedElem.setAttribute("fade", "true")
            else
                finishedElem.removeAttribute("fade")

                for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var addId = AddElemCoordsArray[k][2]
                if(addId==DrawCircleEditId)
                {
                    var fade = finishedElem.getAttribute("fade")
                    AddElemCoordsArray[k] =[ll, ActiveScale, DrawCircleEditId, '', fade]

                    break
                }
            }

            if(cw.drawCircleCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawCircleCommentValue.value))
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
        finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")


            finishedElem.setAttribute("ondblclick", "editCircleDraw("+DrawCircleEditId+")")
            finishedElem.setAttribute("id", DrawCircleEditId)
            domAddElemG.insertBefore(finishedElem, EditThisCircle)
            domAddElemG.removeChild(EditThisCircle)

            UpdateThisCircle = finishedElem
            updateCircle(DrawCircleEditId)


        closeDrawCircle()
    }

}

function resetEditCircle()
{

    var cw = addElemCircleCw

    document.getElementById(DrawCircleEditId).setAttribute("opacity", 1)

    EditCircle = false
    cw.editCircleSpan.innerText = "Draw Circles"
    cw.drawCircleTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "honeydew")
    DragDot.style("visibility", "hidden")

    cw.drawCircleDeleteButton.style.visibility = "hidden"
    cw.drawCircleCancelButton.disabled = false
    cw.drawCircleFinishButton.disabled = false
    DrawCircle = true
    starSVG.setAttribute('onclick', "placeDrawCircle()")

    //---click to add more circles for this session---
    commentDiv.style.visibility = "hidden"

}

function cancelEditCircle()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawCircleEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    commentDiv.style.visibility = "hidden"
    ActiveElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    closeDrawCircle()
    //setEditCircle()

}

var UpdateThisCircle
function updateCircle()
{
    var sendMe = UpdateThisCircle.cloneNode("true")
    var editId = UpdateThisCircle.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Circle/updateCircle.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

//=======================delete circle==================
var CircleDeleted = false
//---button---
function removeCurrentDrawCircle()
{

    domActiveElemG.removeChild(activeElem)
    CircleDeleted = true

    var cw = addElemCircleCw



        deleteDrawCircle(DrawCircleEditId)
        closeDrawCircle()

}

function deleteDrawCircle(DrawCircleEditId)
{
    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawCircleEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }
    domAddElemG.removeChild(EditThisCircle)
    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawCircleEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Circle/deleteCircle.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

function showDrawCircleStrokeBg()
{
    var cw = addElemCircleCw
    var stroke = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawCircleStrokeBg.style.backgroundColor = stroke
        else
            cw.drawCircleStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawCircleStrokeSelected()
{
    var cw = addElemCircleCw
    var stroke = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawCircleFillBg()
{
    var cw = addElemCircleCw
    var fill = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawCircleFillBg.style.backgroundColor = fill
        else
            cw.drawCircleFillBg.style.backgroundColor = ""
            if(cw.drawCircleFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawCircleFillSelected()
{
    var cw = addElemCircleCw
    var fill = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    if(cw.drawCircleFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawCircleOpacitySelected()
{
    var cw = addElemCircleCw
    var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawCircleStrokeWidthSelected()
{
    var cw = addElemCircleCw
    var strokeWidth = cw.drawCircleStrokeWidthSelect.options[cw.drawCircleStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawCircleStrokeDashChecked()
{
    var cw = addElemCircleCw
    if(cw.drawCircleStrokeDashCheck.checked==true)
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