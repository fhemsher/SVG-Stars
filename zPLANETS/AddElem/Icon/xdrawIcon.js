
function previewIconSelect(k)
{
    var cw = addElemIconCw
    cw.drawIconSelect.selectedIndex = k
    cw.setIcon();
    drawIconPreviewDiv.style.visibility = "hidden"

}
///---X button and iframe close all---
function closeDrawIcon()
{
    if(addElemIconViz==true)
    {
        closeIframe("addElemIcon");
        coverOff()
         StopStarZoom=false 
        var cw = addElemIconCw
      
        if(EditIcon==true && IconDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawIconEditId)
            elemObjEdit.style.visibility = "visible"
        }
        DraggingObj = false
        DrawIcon = false
        EditIcon = false
        IconDeleted = false

        starSVG.removeAttribute("onmousedown")
        starSVG.removeAttribute("onmouseup")
        starSVG.style.cursor = "default"

        starSVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null

            DrawX.style("display", "none")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", null)

            var cw = addElemIconCw

            cw.drawIconCommentValue.value = "Icon comment here(optional)..."
            cw.finishDrawIconButton.disabled = true
            cw.cancelDrawIconButton.disabled = true
            cw.iconDrawDeleteButton.style.visibility = "hidden"

            cw.drawIconTopTable.style.backgroundColor = "linen"

            domWrapper.style.display = "none"
            drawIconPreviewDiv.style.visibility = "hidden"

    }
}
//---on add icon DrawX follows cursor
function trackDrawIcon()
{

    if(ActiveElem==null&&EditIcon==false && IconDeleted==false &&LatLngPntSet==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}
var DrawIcon = false
var IconCenter =[]

function startIconDraw()
{
    var cw = addElemIconCw
    coverOn()
    StopStarZoom=true
    if(EditIcon==false)
    {

        starSVG.style.cursor = ""
        starSVG.setAttribute("onmousedown", "startDragObjIcon(evt)")
        starSVG.setAttribute("onmousemove", "dragObjIcon(evt)") //;showStarComment(evt)
        starSVG.setAttribute("onmouseup", "endDragObjIcon(evt)")

        //d3SVG.style("cursor", "default")
        ActiveElem = null
        activeElem = null
        DrawX.attr("transform", null)
        DrawIcon = true
        if(LatLngPntSet==true)
            placeDrawIcon()
            else
            {
                starSVG.setAttribute('onclick', " placeDrawIcon()") //---click to add more icons for this session---
                DrawX.style("display", "block")
            }
    }

}

function getIcon(alias)
{
    var cw = addElemIconCw
    for(var k in cw.SVGFontIcon.icon)
    {
        if (cw.SVGFontIcon.icon[k].alias == alias)
        {
            return cw.SVGFontIcon.icon[k];
            break;
        }
    }
}
//---click on svg layer---
var IconElem //--g child node---
var IconAlias //---filled via select--
var IconCode //---filled via select--
var IconFamily //---filled via select--

//--click on svg---
function placeDrawIcon()
{
    var cw = addElemIconCw


    var fillColor = cw.drawIconFillColorSelect.options[cw.drawIconFillColorSelect.selectedIndex].value
    var strokeColor = "none"
    var fontSize = parseInt(cw.drawIconFontSizeSelect.options[cw.drawIconFontSizeSelect.selectedIndex].text, 10)
    var alias = cw.drawIconSelect.options[cw.drawIconSelect.selectedIndex].value
    var fontIcon = getIcon(alias)

    var code = parseInt(fontIcon.code, 16)
    var fontFamily = fontIcon.font

    ActiveElem = ActiveElemG.append("svg:text")
    .attr("id", "activeElem")
    .attr("fill", fillColor)
    .attr("stroke", strokeColor)
    .attr("font-size", fontSize)
    .attr("font-family", fontFamily)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text(String.fromCharCode(code))

    ActiveElem.attr("class", "dragTargetObj")

    activeElem = document.getElementById("activeElem")

    if(LatLngPntSet==false)
    {
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        IconCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)
    }
    else
    {
        activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")
        IconCenter =[SETx, SETy]
        ActiveElem.attr("class", null)
        ActiveElem.style("cursor", "default")

    }
    ActiveScale = StarView.k/StarScale
    var t3 = d3.transform(ActiveElem.attr("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]
    ActiveLL = StarProjection.invert([transX, transY])

    starSVG.removeAttribute('onclick')

    cw.finishDrawIconButton.disabled = false
    cw.cancelDrawIconButton.disabled = false
}

//---change size,icon, or stroke width---
function iconReset()
{
    if(ActiveElem)
    {

        var cw = addElemIconCw
        var fontSize = parseInt(cw.drawIconFontSizeSelect.options[cw.drawIconFontSizeSelect.selectedIndex].text, 10)

        var alias = cw.drawIconSelect.options[cw.drawIconSelect.selectedIndex].value

        var fontIcon = getIcon(alias)

        var code = parseInt(fontIcon.code, 16)
        var fontFamily = fontIcon.font

        ActiveElem.attr("font-size", fontSize)
        ActiveElem.attr("font-family", fontFamily)
        ActiveElem.text(String.fromCharCode(code))

    }

}

function finishDrawIcon()
{

    if(EditIcon==true)
        finishEditIcon()
        else if(document.getElementById("activeElem"))
        {coverOff()
            var cw = addElemIconCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeElem").cloneNode(true)
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "icon"+new Date().getTime()

            domAddElemG.appendChild(finishedElem)
            //finishedElem.setAttribute("ondblclick", "editIconDraw("+id+")")
            finishedElem.style.cursor = "default"
            finishedElem.setAttribute("id", id)
            if(cw.drawIconCommentValue.value!="Icon comment here(optional)..." && cw.drawIconCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawIconCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }
            finishedElem.removeAttribute("onmouseup")
            finishedElem.setAttribute("onmousedown", "emailElemCreator("+id+")")
            finishedElem.setAttribute("ondblclick", "editIconDraw("+id+")")
            if(cw.drawIconFadeCheck.checked==true)
                finishedElem.setAttribute("fade", "true")

                var t3 = d3.transform(finishedElem.getAttribute("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                var ll = StarProjection.invert([transX, transY])
                finishedElem.setAttribute("transform", StarPoint(ll))
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])
                var fade = finishedElem.getAttribute("fade")
                AddElemCoordsArray.push([ll, ActiveScale, id, '', fade])

                finishedElem.setAttribute("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")")

                finishedElem.setAttribute("class", "addElem")
                var alias = cw.drawIconSelect.options[cw.drawIconSelect.selectedIndex].value
                finishedElem.setAttribute("alias", alias) //--used in edit--

                if(oEMAIL)
                finishedElem.setAttribute("createdBy", oEMAIL)


                    ActiveElem = null
                    activeElem = null

                    //d3SVG.style("cursor", "default")
                    starSVG.setAttribute('onclick', "placeDrawIcon()") //---click to add more icons for this session---

                    DrawX.attr("transform", null)
                    DrawX.style("display", "none")
                    cw.finishDrawIconButton.disabled = true
                    cw.cancelDrawIconButton.disabled = true
                    if(LatLngPntSet==true)
                {
                    setRaDecCheck.checked = false
                    setRaDecChecked() //---turn off---
                }

            newIcon(id)
            starRedraw()
        }
}

function cancelDrawIcon()
{
    if(EditIcon==true)
        cancelEditIcon()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            //d3SVG.style("cursor", "default")
            ActiveElem = null

            starSVG.setAttribute('onclick', "placeDrawIcon()") //---click to add more icons for this session---
            //DrawX.style("display","none")
            var cw = addElemIconCw
            cw.finishDrawIconButton.disabled = true
            cw.cancelDrawIconButton.disabled = true
            coverOff()
            domWrapper.style.display = "none"
        }
}
function newIcon(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Icon/newIcon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}
//====================edit/update icon===============================

var EditIcon = false
var DrawIconEditId
var EditThisIcon
var DrawIconEditScale
function editIconDraw(elemObjEdit) //--dblclick on icon---
{
    if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")
        if(oEMAIL==createdBy)
        {
            EditThisIcon = elemObjEdit

            DrawIconEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--
            DrawIconEditScale = parseFloat(elemObjEdit.getAttribute("myScale"))


            //d3SVG.style("cursor", "default")
            ActiveElem = null

            EditIcon = true
            if(addElemIconLoad==false)
            {
                openIframe("AddElem", "addElemIcon", 10)
                setTimeout(setEditIcon, 800)
            }
            else if(addElemIconViz==false)
            {
                openIframe("AddElem", "addElemIcon", 10)
                setEditIcon()
            }
            else
                setEditIcon()

        }
    }
}
//---after iframe loaded see sendSize() at addElemIcon.htm---
var EditIconObj
function setEditIcon()
{
    coverOn()

    EditIconObj = EditThisIcon.cloneNode(true)
    var cw = addElemIconCw


    starSVG.removeAttribute('onclick')

    var elemObjEdit = document.getElementById(DrawIconEditId)

    // var initZoom = parseInt(elemObjEdit.getAttribute("InitZoom"), 10)
    // MyMap.setZoom(initZoom)

    elemObjEdit.style.visibility = "hidden"
    EditIconObj.setAttribute("id", "activeElem")
    EditIconObj.setAttribute("class", "dragTargetObj")
    EditIconObj.removeAttribute("ondblclick")
    EditIconObj.removeAttribute("onmouseover")
    EditIconObj.removeAttribute("onmouseout")

    var fade = EditIconObj.getAttribute("fade")
    if(fade)
        cw.drawIconFadeCheck.checked = true
        else
            cw.drawIconFadeCheck.checked = false

            commentDiv.style.visibility = "hidden"
            if(EditThisIcon.getAttribute("comment"))
            cw.drawIconCommentValue.value = xml2txt(EditIconObj.getAttribute("comment"))
            else
                cw.drawIconCommentValue.value = ""

                EditIconObj.style.cursor = "move"

                domActiveElemG.appendChild(EditIconObj)
                ActiveElem = d3.select("#activeElem")
                activeElem = document.getElementById("activeElem")

                ActiveScale = parseFloat(activeElem.getAttribute("myScale"))
                var t3 = d3.transform(ActiveElem.attr("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                ActiveLL = StarProjection.invert([transX, transY])

                cw.drawIconTopTable.style.backgroundColor = "orange"

                cw.iconDrawDeleteButton.style.visibility = "visible"
                cw.finishDrawIconButton.disabled = false
                cw.cancelDrawIconButton.disabled = false
                //---set values in selections ---
                var fontSize = EditIconObj.getAttribute("font-size")
                var fill = EditIconObj.getAttribute("fill")
                var alias = EditIconObj.getAttribute("alias")

                setSelect("Icon", "", alias) //drawIconSelect
                setSelect("Icon", "FontSize", fontSize)
                setSelect("Icon", "FillColor", fill)
                //---update bg colors---
                cw.drawIconFillBg.style.backgroundColor = fill

                cw.showIconLocal()

                //d3SVG.style("cursor", "default")
                ActiveElem.style("cursor", "move")
                DrawX.attr("stroke", "darkorange")
                DrawX.style("display", "inline")
                DrawX.attr("transform", "translate("+transX+" "+transY+")")
                starSVG.removeAttribute('onclick')
                //---timeout??---
                starSVG.setAttribute("onmousedown", "startDragObjIcon(evt)")
                starSVG.setAttribute("onmousemove", "dragObjIcon(evt)")
                starSVG.setAttribute("onmouseup", "endDragObjIcon(evt)")

}

function finishEditIcon()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemIconCw
        activeElem.removeAttribute("class")

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "addElem")
        var t3 = d3.transform(finishedElem.getAttribute("transform"))
        var transX = t3.translate[0]
        var transY = t3.translate[1]
        var ll = StarProjection.invert([transX, transY])
        finishedElem.setAttribute("transform", StarPoint(ll))
        finishedElem.setAttribute("ll0", ll[0])
        finishedElem.setAttribute("ll1", ll[1])

        finishedElem.setAttribute("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")")

        finishedElem.setAttribute("myScale", ActiveScale)

        if(cw.drawIconFadeCheck.checked==true)
            finishedElem.setAttribute("fade", "true")
            else
                finishedElem.removeAttribute("fade")
                //---update array--
                for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var myId = AddElemCoordsArray[k][2]
                if(myId==DrawIconEditId)
                {var fade = finishedElem.getAttribute("fade")
                    AddElemCoordsArray[k][0] = ll
                    AddElemCoordsArray[k][4] = fade
                    break
                }

            }

            finishedElem.style.cursor = "default"
            var alias = cw.drawIconSelect.options[cw.drawIconSelect.selectedIndex].value
            finishedElem.setAttribute("alias", alias) //--used in edit--
            if(cw.drawIconCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawIconCommentValue.value))
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



            UpdateThisIcon = finishedElem
            finishedElem.removeAttribute("onmouseup")
            finishedElem.setAttribute("onmousedown", "emailElemCreator("+DrawIconEditId+")")
            finishedElem.setAttribute("ondblclick", "editIconDraw("+DrawIconEditId+")")
            finishedElem.setAttribute("id", DrawIconEditId)
            domAddElemG.insertBefore(finishedElem, EditThisIcon)
            domAddElemG.removeChild(EditThisIcon)

            UpdateThisIcon = finishedElem

            starRedraw()

            updateIcon(DrawIconEditId)


        closeDrawIcon()

    }
}
function resetEditIcon()
{

    var cw = addElemIconCw
    EditIcon = false
    cw.editIconSpan.innerText = "Add Icon(s)"
    cw.drawIconTopTable.style.backgroundColor = "linen"
    ActiveElem = null
    activeElem = null

    //d3SVG.style("cursor", "default")
    DrawX.style("display", "none")
    DrawX.attr("stroke", "linen")

    cw.iconDrawDeleteButton.style.visibility = "hidden"
    cw.finishDrawIconButton.disabled = true
    cw.cancelDrawIconButton.disabled = true
    DrawIcon = true
    starSVG.setAttribute('onclick', " placeDrawIcon()")

    //---click to add more icons for this session---

}

function cancelEditIcon()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawIconEditId)
    elemObjEdit.style.visibility = "visible"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    ActiveElem = null
    activeElem = null
    setEditIcon()
}

var UpdateThisIcon
function updateIcon()
{
    var sendMe = UpdateThisIcon.cloneNode("true")
    var editId = UpdateThisIcon.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Icon/updateIcon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

//=======================delete icon==================
var IconDeleted = false
//---button---
function removeCurrentDrawIcon()
{

    domActiveElemG.removeChild(activeElem)
    IconDeleted = true

    var cw = addElemIconCw


    if(DrawIconEditId.indexOf("timelineElem")==-1)
        deleteIcon(DrawIconEditId)

        closeDrawIcon()

}

function deleteIcon(DrawIconEditId)
{

    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawIconEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }

    domAddElemG.removeChild(EditThisIcon)
    activeElem = null
    ActiveElem = null

    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawIconEditId+"\" />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Icon/deleteIcon.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

function drawIconFontSizeSelected()
{
    if(ActiveElem)
        iconReset()

}
function drawIconIconSelected()
{
    if(ActiveElem)
        iconReset()

}

function showDrawIconFillBg()
{
    var cw = addElemIconCw
    var fill = cw.drawIconFillColorSelect.options[cw.drawIconFillColorSelect.selectedIndex].value
    cw.drawIconFillBg.style.backgroundColor = fill
    if(ActiveElem)
        ActiveElem.attr("fill", fill)
        cw.changePreviewIconColor()

}
