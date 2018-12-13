function closeDrawIcon()
{
    if(addElemIconViz==true)
    {
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        closeIframe("addElemIcon");
        planetSVG.removeAttribute("onclick")
        var cw = addElemIconCw
         cw.PlantUnicode=null
        planetSVG.removeAttribute("onmousedown")
        planetSVG.removeAttribute("onmousemove")
        planetSVG.removeAttribute("onmouseup")
        ActiveElem=null
        DrawIcon=false
        EditIcon=false
        ActiveIconId=null
            StopPlanetZoom=false
        cw.containerDiv.style.background = "linen"
        cw.iconDrawSpan.innerHTML = "Select & Plant Icons"
        //cw.editIconSpan.innerHTML = "Select icon button, choose color/size, then click on drawing to plant it."

        var buttons = cw.drawIconButtonDiv.getElementsByTagName("button")
        for(var k = 0; k<buttons.length; k++)
        {
            buttons[k].style.borderStyle = ""
            buttons[k].style.borderColor = ""

        }

            cw.IconObj = null
            cw.drawIconCommentValue.value="Icon comment goes here(optional)..."
                           cw.drawIconTopTable.style.backgroundColor = "linen"
                 cw.iconDrawSpan.innerHTML="Select & Plant Icons"
            cw.drawIconDeleteButton.style.visibility="hidden"
            cw.cancelDrawIconButton.disabled=true
            cw.finishDrawIconButton.disabled=true

    }
    coverOff()

}

var IconActiveElem


var  DrawIcon=false
function startIconDraw()
{     DrawIcon=true
     coverOn()
    planetSVG.setAttribute("onclick", "plantIcon(event)")
    StopPlanetZoom=true
}

//---click on app svg---
var ActiveIconId
function plantIcon(event)
{
    var cw = addElemIconCw
       if(cw.PlantUnicode)
        {

                cw.finishDrawIconButton.disabled=false
            cw.cancelDrawIconButton.disabled=false

        var unicode = cw.PlantUnicode

        for(var k = 0; k<cw.IconUnicode.length; k++)
        {
            var myCode = cw.IconUnicode[k]


            if(myCode==unicode)
            {

                var code = parseInt(myCode, 16)
                //var textNode=document.createTextNode(String.fromCharCode(code))
                var fontSize = +cw.drawIconFontSizeSelect[cw.drawIconFontSizeSelect.selectedIndex].text

                var strokeFactor = .02
                var strokeWidth = strokeFactor*fontSize

                var strokeWidth = strokeFactor*fontSize
                var fill = cw.drawIconFillColorSelect.options[cw.drawIconFillColorSelect.selectedIndex].value

                var utcMS = new Date().getTime()

                 ActiveIconId= "icon"+utcMS
                ActiveElem = ActiveElemG.append("text")
                .attr("id", "icon"+utcMS)
                .attr("class", "iconElem")
                .attr("font-size", fontSize)
                .attr("font-family", "Arial Unicode MS")
                .attr("stroke-width", strokeWidth)
                .attr("fill", fill)
                .attr("stroke", "black")
                .attr("code", code)
                .text(String.fromCharCode(code))

                var sizeMe = document.getElementById("icon"+utcMS)
                var bb = sizeMe.getBBox()
                ActiveElem.attr("x", -(bb.x+.5*bb.width))
                ActiveElem.attr("y", -(bb.y+.5*bb.height))

                       if(cw.drawIconShadowCheck.checked==true)
                            ActiveElem.attr("filter", "url(#drop-shadow)")


                 if(LatLngPntSet==false)
                {
                        ActiveElem.attr("transform", "translate("+SVGx+" "+SVGy+")")
                        DrawX.style("display", "inline")
                        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

                        CircleCenter =[SVGx, SVGy]
                        ActiveElem.style("cursor", "move")
                        ActiveElem.attr("class", "dragTargetObj")
                        ActiveElem.attr("pointer-events", null)

                }
                else
                {
                        ActiveElem.attr("transform", "translate("+SETx+" "+SETy+")")

                        CircleCenter =[SETx, SETy]
                        ActiveElem.attr("class", null)
                        ActiveElem.style("cursor", "default")

                }
                var t3 = d3.transform(ActiveElem.attr("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                ActiveLL = PlanetProjection.invert([transX, transY])
                ActiveScale = PlanetView.k/PlanetScale

                planetSVG.removeAttribute('onclick')
                planetSVG.style.cursor = ""
                planetSVG.setAttribute("onmousedown", "startDragObjIcon(evt)")
                planetSVG.setAttribute("onmousemove", "dragObjIcon(evt)") //;showStarComment(evt)
                planetSVG.setAttribute("onmouseup", "endDragObjIcon(evt)")

                break

            }

        }

    }
}

//---on add icon DrawX follows cursor
var EditIcon = false
var IconDeleted = false

function trackDrawIcon()
{
    var cw = addElemIconCw
    if(cw.PlantUnicode)
    {
        if(LatLngPntSet==false&&ActiveElem==null&&EditIcon==false && IconDeleted==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}

function drawIconFontSizeSelected()
{

    if(ActiveElem)
    {
        var cw = addElemIconCw
        var fontSize=+cw.drawIconFontSizeSelect.options[cw.drawIconFontSizeSelect.selectedIndex].text

        ActiveElem.attr("font-size", fontSize)
        var strokeFactor = .02
        var strokeWidth = strokeFactor*fontSize
        ActiveElem.attr("stroke-width", strokeWidth)

        if(EditIcon)
            var sizeMe = document.getElementById("activeElem")
        else
            var sizeMe = document.getElementById(ActiveIconId)

        var myX=+sizeMe.getAttribute("x")
        var myY=+sizeMe.getAttribute("y")



        var bb = sizeMe.getBBox()
        if(EditIcon==false)
        {
            ActiveElem.attr("x", -(bb.x+.5*bb.width)+myX)
            ActiveElem.attr("y", -(bb.y+.5*bb.height)+myY)
        }
        else
        {
            ActiveElem.attr("x", -(bb.x+.5*bb.width)+myX)
            ActiveElem.attr("y", -(bb.y+.5*bb.height)+myY)

        }
    }

}
function drawIconShadowChecked()
{

    var cw = addElemIconCw
    if(cw.drawIconShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("filter",null)

    }

}


var IconType="dingbat"
var Unicode
function finishDrawIcon()
{

    if(EditIcon==true)
        finishEditIcon()
        else if(document.getElementById(ActiveIconId))
        {coverOff()
            var cw = addElemIconCw
            document.getElementById(ActiveIconId).removeAttribute("class")

            var finishedElem = document.getElementById(ActiveIconId).cloneNode(true)
            domActiveElemG.removeChild(document.getElementById(ActiveIconId))



            domAddElemG.appendChild(finishedElem)
            //finishedElem.setAttribute("ondblclick", "editIconDraw("+id+")")
            finishedElem.style.cursor = "default"

            if(cw.drawIconCommentValue.value!="Icon comment here(optional)..." && cw.drawIconCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawIconCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }
            finishedElem.removeAttribute("onmouseup")

            finishedElem.setAttribute("ondblclick", "editIconDraw("+ActiveIconId+")")


                var t3 = d3.transform(finishedElem.getAttribute("transform"))
                var transX = t3.translate[0]
                var transY = t3.translate[1]
                var ll = PlanetProjection.invert([transX, transY])
                finishedElem.setAttribute("transform", PlanetPoint(ll))
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])

                AddElemCoordsArray.push([ll, ActiveScale, ActiveIconId, ''])

                finishedElem.setAttribute("transform", PlanetPoint(ll)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")")
                finishedElem.setAttribute("myZoom", ActiveScale)

                finishedElem.setAttribute("class", "addElem")
                finishedElem.setAttribute("iconType", IconType)
                finishedElem.setAttribute("unicode", Unicode)
               if(cw.drawIconShadowCheck.checked==true)
                finishedElem.setAttribute("filter", "url(#drop-shadow)")



                if(oEMAIL)
                finishedElem.setAttribute("createdBy", oEMAIL)


                    ActiveElem = null
                    activeElem = null

                    //d3SVG.style("cursor", "default")
                    planetSVG.setAttribute('onclick', "plantIcon(event)") //---click to add more icons for this session---

                    DrawX.attr("transform", null)
                    DrawX.style("display", "none")
                    cw.finishDrawIconButton.disabled = true
                    cw.cancelDrawIconButton.disabled = true
                    if(LatLngPntSet==true)
                {
                    setRaDecCheck.checked = false
                    setRaDecChecked() //---turn off---
                }
            cw.drawIconCommentValue.value="Icon comment goes here(optional)..."
            newIcon(ActiveIconId)
            planetRedraw()
        }
}

function cancelDrawIcon()
{
    if(EditIcon==true)
        cancelEditIcon()
        else if(ActiveIconId&&document.getElementById(ActiveIconId))
        {
            domActiveElemG.removeChild(document.getElementById(ActiveIconId))

            activeElem = null
            //d3SVG.style("cursor", "default")
            ActiveElem = null

            planetSVG.setAttribute('onclick', "plantIcon(event)") //---click to add more icons for this session---
            //DrawX.style("display","none")
            var cw = addElemIconCw
            cw.finishDrawIconButton.disabled = true
            cw.cancelDrawIconButton.disabled = true
            coverOff()
            domWrapper.style.display = "none"
             cw.drawIconCommentValue.value="Icon comment goes here(optional)..."
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

            ActiveIconId=DrawIconEditId
            //d3SVG.style("cursor", "default")
            ActiveElem = null

            EditIcon = true
            if(addElemIconLoad==false)
            {
                openIframe("AddElem", "addElemIcon", 10)

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


    planetSVG.removeAttribute('onclick')

    var elemObjEdit = document.getElementById(DrawIconEditId)

    // var initZoom = parseInt(elemObjEdit.getAttribute("InitZoom"), 10)
    // MyMap.setZoom(initZoom)

    elemObjEdit.style.visibility = "hidden"
    EditIconObj.setAttribute("id", "activeElem")
    EditIconObj.setAttribute("class", "dragTargetObj")
    EditIconObj.removeAttribute("ondblclick")
    EditIconObj.removeAttribute("onmouseover")
    EditIconObj.removeAttribute("onmouseout")



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
                ActiveLL = PlanetProjection.invert([transX, transY])

                cw.drawIconTopTable.style.backgroundColor = "orange"
                 cw.iconDrawSpan.innerHTML="Edit This Icon"
                cw.drawIconDeleteButton.style.visibility = "visible"
                cw.finishDrawIconButton.disabled = false
                cw.cancelDrawIconButton.disabled = false
                //---set values in selections ---
                var fontSize = EditIconObj.getAttribute("font-size")
                var fill = EditIconObj.getAttribute("fill")
                 var iconText=cw.drawIconButtonDiv.getElementsByTagName("text")
                for(var k=0;k<iconText.length;k++)
                {
                   var icon=iconText[k]
                   icon.setAttribute("fill",fill)
                }

          if(EditIconObj.getAttribute("filter"))
           cw.drawIconShadowCheck.checked=true
          else
           cw.drawIconShadowCheck.checked=false
                    setIconButton()


               // setSelect("Icon", "", alias) //drawIconSelect
                setSelect("Icon", "FontSize", fontSize)
                setSelect("Icon", "FillColor", fill)
                //---update bg colors---
                cw.drawIconFillBg.style.backgroundColor = fill



                //d3SVG.style("cursor", "default")
                ActiveElem.style("cursor", "move")
                DrawX.attr("stroke", "darkorange")
                DrawX.style("display", "inline")
                DrawX.attr("transform", "translate("+transX+" "+transY+")")
                planetSVG.removeAttribute('onclick')
                //---timeout??---
                planetSVG.setAttribute("onmousedown", "startDragObjIcon(evt)")
                planetSVG.setAttribute("onmousemove", "dragObjIcon(evt)")
                planetSVG.setAttribute("onmouseup", "endDragObjIcon(evt)")

}

function setIconButton()
{
    var cw = addElemIconCw

    var iconType = EditIconObj.getAttribute("iconType")
    for(var k=0;k<cw.unicodeTypeSelect.options.length;k++)
    {
        var type=cw.unicodeTypeSelect.options[k].value
        if(type==iconType)
        {
            cw.unicodeTypeSelect.selectedIndex=k
            cw.unicodeTypeSelected()
            break
        }
    }

    var unicode = EditIconObj.getAttribute("unicode")
    cw.PlantUnicode=unicode
    var buttonTable=eval("cw."+iconType+"Table")

    var buttons=buttonTable.getElementsByTagName("button")
    var unicodeButton="button"+unicode

    for(var k=0;k<buttons.length;k++)
    {
        var buttonId=buttons[k].id
        if(buttonId==unicodeButton)
        {
            buttons[k].style.borderStyle="inset"
            buttons[k].style.borderColor="violet"
            //----scroll button to top----
            buttons[k].scrollIntoView();
            break;
        }
    }

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
        var ll = PlanetProjection.invert([transX, transY])
        finishedElem.setAttribute("transform", PlanetPoint(ll))
        finishedElem.setAttribute("ll0", ll[0])
        finishedElem.setAttribute("ll1", ll[1])

        finishedElem.setAttribute("transform", PlanetPoint(ll)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")")

        finishedElem.setAttribute("myScale", ActiveScale)
        finishedElem.setAttribute("myZoom", PrevZoomInteger)

        if(cw.drawIconShadowCheck.checked==true)
            finishedElem.setAttribute("filter", "url(#drop-shadow")
            else
             finishedElem.removeAttribute("filter")

                //---update array--
                for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var myId = AddElemCoordsArray[k][2]
                if(myId==DrawIconEditId)
                {
                    AddElemCoordsArray[k][0] = ll

                    break
                }

            }

            finishedElem.style.cursor = "default"




         // finishedElem.setAttribute("alias", alias) //--used in edit--

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
            finishedElem.setAttribute("ondblclick", "editIconDraw("+DrawIconEditId+")")
            finishedElem.setAttribute("id", DrawIconEditId)
            domAddElemG.insertBefore(finishedElem, EditThisIcon)
            domAddElemG.removeChild(EditThisIcon)

            UpdateThisIcon = finishedElem

            planetRedraw()

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
    DrawX.attr("stroke", "violet")


    cw.finishDrawIconButton.disabled = true
    cw.cancelDrawIconButton.disabled = true
    DrawIcon = true
    planetSVG.setAttribute('onclick', " placeDrawIcon()")

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
