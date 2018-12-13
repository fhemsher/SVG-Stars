function closeDrawSymbol()
{
    if(addElemSymbolViz==true)
    {
        closeIframe("addElemSymbol");
        coverOff()

        var cw = addElemSymbolCw

        if(EditSymbol==true && SymbolDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawSymbolEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("ondblclick", "editSymbolDraw("+DrawSymbolEditId+")")

        }
        DraggingObj = false
        DrawSymbol = false
        EditSymbol = false
        SymbolDeleted = false
         SymbolPlantStart=false
        planetSVG.removeAttribute("onmousedown")
        planetSVG.removeAttribute("onmousemove")
        planetSVG.removeAttribute("onmouseup")

        planetSVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))

        }
        activeElem = null
        ActiveElem = null
        ActiveSymbol = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

        cw.drawSymbolFinishButton.disabled = true
        cw.drawSymbolCancelButton.disabled = true
        cw.drawSymbolCancelButton.style.borderColor = ""
        cw.drawSymbolDeleteButton.style.visibility = "hidden"
        cw.drawSymbolEditSpan.innerText = "Photometric Filter Symbols"
        cw.drawSymbolCommentValue.value = "Symbol comment here(optional)..."

        ///cw.drawSymbolTopTable.style.backgroundColor = "honeydew"

        commentDiv.style.visibility = "hidden"
        if(cw.CheckedBND)
        {
            uncheck = cw.document.getElementById("request"+cw.CheckedBND+"Check")
            uncheck.checked = false
            var changeTD = cw.document.getElementById("td"+cw.CheckedBND)
            changeTD.style.backgroundColor = ""
        }
        cw.CheckedBND = null
        cw.SelectedSymbol = null
        cw.SelelectedScale = null
    }
}
function editSymbolStart(elemObjEdit)
{

    if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisSymbol = elemObjEdit

            DrawSymbolEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveElem = null
            activeElem = null

            EditSymbol = true
            if(addElemSymbolLoad==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)

            }
            else if(addElemSymbolViz==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)
            }

        }
    }
}
var SymbolPlantStart=false
function startSymbolDraw()
{
     SymbolPlantStart=true
    planetSVG.setAttribute("onclick", "plantSymbol(event)")

}
//---on add icon DrawX follows cursor
var EditSymbol = false
var SymbolDeleted = false

function trackDrawSymbol()
{
    var cw = addElemSymbolCw
    if(cw.SelectedSymbol)
    {
        if(LatLngPntSet==false&&ActiveElem==null&&EditSymbol==false && SymbolDeleted==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}

//---click on app svg---
var ActiveSymbol = null
var DrawSymbol = false
function plantSymbol(event)
{
    var cw = addElemSymbolCw
    if(!ActiveSymbol&&cw.SelectedSymbol)
    {
        coverOn()
        DrawSymbol = true
       SymbolPlantStart=false
        var offsets = planetDiv.getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        //---requred for FF----
        var eventObj = event || window.event;

        var x = eventObj.clientX-left
        var y = eventObj.clientY-top

        var nativeScale = cw.SelectedScale
        var symbolG = cw.SelectedSymbol.cloneNode(true)
        for(var k = 0; k<symbolG.childNodes.length; k++)
            symbolG.childNodes.item(k).setAttribute("transform", "scale("+nativeScale+")")

            activeElem = symbolG
            activeElem.id = "activeElem"
            ActiveElem = d3.select("#activeElem")
            activeElem.setAttribute("nativeScale", nativeScale)
            activeElem.setAttribute("myBnd", cw.CheckedBND)

            activeElem.setAttribute("class", "addElem")
            if(oEMAIL)
            activeElem.setAttribute("createdBy", oEMAIL)

            domActiveElemG.appendChild(activeElem)

        if(LatLngPntSet==false)
        {
            activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

            SymbolCenter =[SVGx, SVGy]
            activeElem.style.cursor = "move"
            activeElem.setAttribute("class", "dragTargetObj")
            activeElem.setAttribute("pointer-events", null)
            planetSVG.removeAttribute('onclick')
            planetSVG.style.cursor = ""
            planetSVG.setAttribute("onmousedown", "startDragSymbol(evt)")
            planetSVG.setAttribute("onmousemove", "dragSymbol(evt)") //;showStarComment(evt)
            planetSVG.setAttribute("onmouseup", "endDragSymbol(evt)")

        }
        else
        {
            activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")

            SymbolCenter =[SETx, SETy]
            activeElem.removeAttribute("class")
            activeElem.style.cursor = "default"

        }
        if(cw.drawSymbolShadowCheck.checked==true)
            activeElem.setAttribute("filter", "url(#drop-shadow)")

        var t3 = d3.transform(activeElem.getAttribute("transform"))
        var transX = t3.translate[0]
        var transY = t3.translate[1]
        ActiveLL = PlanetProjection.invert([transX, transY])
        ActiveScale = PlanetView.k/PlanetScale
        cw.drawSymbolCancelButton.disabled = false
        cw.drawSymbolFinishButton.disabled = false

    }
}
function symbolNativeScaleSelected()
{
    var cw = addElemSymbolCw
    var nativeScale = cw.symbolNativeScaleSelect.options[cw.symbolNativeScaleSelect.selectedIndex].text
    if(ActiveElem)
    {
        activeElem.setAttribute("nativeScale", nativeScale)
        for(var k = 0; k<activeElem.childNodes.length; k++)
            activeElem.childNodes.item(k).setAttribute("transform", "scale("+nativeScale+")")
    }
}

function drawSymbolShadowChecked()
{

    var cw = addElemSymbolCw
    if(cw.drawSymbolShadowCheck.checked==true)
    {
        if(activeElem)
            activeElem.setAttribute("filter", "url(#drop-shadow)")

    }
    else
    {
        if(activeElem)
            activeElem.removeAttribute("filter")

    }

}


function finishDrawSymbol()
{

    if(EditSymbol==true)
        finishEditSymbol()
        else if(ActiveElem)
        {
            var cw = addElemSymbolCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()
            //---time stamp @ id---
            var utcMS = new Date().getTime()
            var id = "symbol"+utcMS
            var finishedElem = activeElem.cloneNode(true)
            finishedElem.id = id
            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(activeElem)

            if(cw.drawSymbolCommentValue.value!="Symbol comment here(optional)..." && cw.drawSymbolCommentValue.value!="")
            {
                finishedElem.setAttribute("comment", txt2xml(cw.drawSymbolCommentValue.value))
                finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

            }

            finishedElem.setAttribute("ondblclick", "editSymbolDraw("+id+")")
            domAddElemG.appendChild(finishedElem)
            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var ll = PlanetProjection.invert([transX, transY])
            var nativeScale = +finishedElem.getAttribute("nativeScale")
                finishedElem.setAttribute("myZoom", PrevZoomInteger)
            ActiveScale = (PlanetView.k/PlanetScale)



                console.log(ActiveScale)
                AddElemCoordsArray.push([ll, ActiveScale, id, ""])

                // finishedElem.setAttribute("transform", StarPoint(ll))
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])

                finishedElem.setAttribute("class", "addElem")

                finishedElem.setAttribute("createdBy", oEMAIL)

            if(cw.drawSymbolShadowCheck.checked==true)
                finishedElem.setAttribute("filter", "url(#drop-shadow)")


                ActiveElem = null
                activeElem = null

            if(LatLngPntSet==true)
            {
                setRaDecCheck.checked = false
                setRaDecChecked() //---turn off---
            }

            // d3SVG.style("cursor", "default")
            planetSVG.setAttribute('onclick', "plantSymbol(event)") //---click to add more icons for this session---
            DrawX.style("display", "none")

            cw.drawSymbolFinishButton.disabled = true
            cw.drawSymbolCancelButton.disabled = true

            commentDiv.style.visibility = "hidden"

            finishedElem.setAttribute("transform", PlanetPoint(ll))

            newSymbol(id)

        }
}

function cancelDrawSymbol()
{
    var cw = addElemSymbolCw
    if(EditSymbol==true)
        cancelEditSymbol()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            planetSVG.setAttribute("onclick", "plantSymbol(event)")

            cw.drawSymbolFinishButton.disabled = true
            cw.drawSymbolCancelButton.disabled = true
            coverOff()

        }
        commentDiv.style.visibility = "hidden"

        cw.drawSymbolCancelButton.style.borderColor = ""

}
//====================edit/update circle===============================

var EditSymbol = false
var DrawSymbolEditId
var EditThisSymbol
//--dblclick on circle---
function editSymbolDraw(elemObjEdit)
{

    if(DrawSymbol==false && addElemSymbolViz==false)
        if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")

        if(oEMAIL==createdBy)
        {
            EditThisSymbol = elemObjEdit

            DrawSymbolEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveElem = null
            activeElem = null

            EditSymbol = true
            if(addElemSymbolLoad==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)

            }
            else if(addElemSymbolViz==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)
                setEditSymbol()
            }
            else
                setEditSymbol()
        }
    }
}
//---after iframe loaded see sendSize() at addElemSymbol.htm---
var EditSymbolObj
function setEditSymbol()
{
    coverOn()
    EditSymbol = true
    planetSVG.removeAttribute('onclick')
    var cw = addElemSymbolCw
    var elemObjEdit = document.getElementById(DrawSymbolEditId)

    EditSymbolObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditSymbolObj.setAttribute("id", "activeElem")
    EditSymbolObj.setAttribute("class", "dragTargetObj")
    EditSymbolObj.removeAttribute("onmouseover")
    EditSymbolObj.removeAttribute("onmouseout")
    EditSymbolObj.removeAttribute("ondblclick")

    commentDiv.style.visibility = "hidden"

    if(EditThisSymbol.getAttribute("comment"))
        cw.drawSymbolCommentValue.value = xml2txt(EditSymbolObj.getAttribute("comment"))
        else
            cw.drawSymbolCommentValue.value = ""

            EditSymbolObj.style.cursor = "move"

            domActiveElemG.appendChild(EditSymbolObj)
            ActiveElem = d3.select("#activeElem")
            activeElem = document.getElementById("activeElem")
            cw.drawSymbolDeleteButton.style.visibility = "visible"
            cw.drawSymbolEditSpan.innerText = "Edit Symbol"
            var myBnd = activeElem.getAttribute("myBnd")
            cw.CheckedBND = myBnd
            cw.SelectedSymbol = cw.document.getElementById("band_"+myBnd)

            var changeTD = cw.document.getElementById("td"+myBnd)
            changeTD.style.backgroundColor = "orange"
            cw.drawSymbolCancelButton.disabled = false
            cw.drawSymbolFinishButton.disabled = false

            var changeCheck = cw.document.getElementById("request"+myBnd+"Check")
            changeCheck.checked = true
            var nativeScale = activeElem.getAttribute("nativeScale")
            var scaleSelect = cw.symbolNativeScaleSelect
            for(var k = 0; k<scaleSelect.options.length; k++)
        {
            var text = scaleSelect.options[k].text
            if(text==nativeScale)
            {
                scaleSelect.selectedIndex = k
                cw.SelelectedScale = nativeScale
                break
            }

        }



         if(EditSymbolObj.getAttribute("filter"))
           cw.drawSymbolShadowCheck.checked=true
          else
           cw.drawSymbolShadowCheck.checked=false



            ActiveScale = parseFloat(EditSymbolObj.getAttribute("myScale"))
            var ll0 = parseFloat(EditSymbolObj.getAttribute("ll0"))
            var ll1 = parseFloat(EditSymbolObj.getAttribute("ll1"))
            ActiveLL =[ll0, ll1]

            var t3 = d3.transform(ActiveElem.attr("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            ActiveElem.style("cursor", "move")
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")

            DrawX.attr("transform", "translate("+transX+" "+transY+")")

            planetSVG.removeAttribute('onclick')
            //---timeout??---
            planetSVG.setAttribute("onmousedown", "startDragSymbol(evt)")
            planetSVG.setAttribute("onmousemove", "dragSymbol(evt)")
            planetSVG.setAttribute("onmouseup", "endDragSymbol(evt)")

}

function finishEditSymbol()
{

    if(ActiveElem)
    {
        var cw = addElemSymbolCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "addElem")

        var ll = ActiveLL
        //---rescale radius to current scale----

        finishedElem.setAttribute("myScale", ActiveScale)
        finishedElem.setAttribute("ll0", ll[0])
        finishedElem.setAttribute("ll1", ll[1])

        finishedElem.setAttribute("id", DrawSymbolEditId)


        if(cw.drawSymbolShadowCheck.checked==true)
            finishedElem.setAttribute("filter", "url(#drop-shadow")
            else
             finishedElem.removeAttribute("filter")



                finishedElem.setAttribute("myZoom", PrevZoomInteger)

                for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var addId = AddElemCoordsArray[k][2]
                if(addId==DrawSymbolEditId)
                {

                    AddElemCoordsArray[k] =[ll, ActiveScale, DrawSymbolEditId, '']

                    break
                }
            }

            if(cw.drawSymbolCommentValue.value!="")
        {
            finishedElem.setAttribute("comment", txt2xml(cw.drawSymbolCommentValue.value))
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
        finishedElem.setAttribute("transform", PlanetPoint(ActiveLL)+"scale("+(PlanetView.k/PlanetScale)/ActiveScale+")")

        finishedElem.setAttribute("createdBy", oEMAIL)
        finishedElem.setAttribute("ondblclick", "editSymbolDraw("+DrawSymbolEditId+")")
        finishedElem.setAttribute("id", DrawSymbolEditId)
        domAddElemG.insertBefore(finishedElem, EditThisSymbol)
        domAddElemG.removeChild(EditThisSymbol)

        UpdateThisSymbol = finishedElem
        updateSymbol(DrawSymbolEditId)

        closeDrawSymbol()
    }

}

function resetEditSymbol()
{

    var cw = addElemSymbolCw

    document.getElementById(DrawSymbolEditId).setAttribute("opacity", 1)

    EditSymbol = false
    cw.editSymbolSpan.innerText = "Draw Symbols"
    cw.drawSymbolTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    domPlanetViewG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "honeydew")
    DragDot.style("visibility", "hidden")

    cw.drawSymbolDeleteButton.style.visibility = "hidden"
    cw.drawSymbolCancelButton.disabled = false
    cw.drawSymbolFinishButton.disabled = false
    DrawSymbol = true
    planetSVG.setAttribute('onclick', "placeDrawSymbol()")

    //---click to add more circles for this session---
    commentDiv.style.visibility = "hidden"

}

function cancelEditSymbol()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawSymbolEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    commentDiv.style.visibility = "hidden"
    ActiveElem = null
    domPlanetViewG.appendChild(dragDot) //--place drag dot on top---
    closeDrawSymbol()
    //setEditSymbol()

}
var UpdateThisSymbol
function updateSymbol()
{
    var sendMe = UpdateThisSymbol.cloneNode("true")
    var editId = UpdateThisSymbol.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Symbol/updateSymbol.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

function deleteDrawSymbol()
{

    var deleteId = EditThisSymbol.id
    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==deleteId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }

    domAddElemG.removeChild(EditThisSymbol)
    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+deleteId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Symbol/deleteSymbol.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.onreadystatechange = function()
    {
        if (this.status == 500)
        {
            console.log(this.responseText)
        }
    };

    XMLFile.send(sendXML);
    SymbolDeleted = true
    closeDrawSymbol()
}
function newSymbol(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Symbol/newSymbol.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)

}