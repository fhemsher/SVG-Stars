//---on add icon DrawX follows cursor
function trackDrawText()
{

    if(ActiveElem==null&&DrawTextStarted==true)
    {
        DrawX.style("display", "inline")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var TextBlinker;
var TextBlinkerInterval;
var BlinkerLoc;
function startBlinker()
{
    TextBlinkerInterval = setInterval("blinkIt()", 500);
}
function blinkIt()
{
    var blinkVis = TextBlinker.style("visibility")
    if(blinkVis=="visible")
        TextBlinker.style("visibility", "hidden")
        else
            TextBlinker.style("visibility", "visible")
}

var NextLine = false
var TspanCnt = 0
//----enter key---
function nextTextLine()
{
    TspanCnt++;
    var prevLineLength = activeTspan.getComputedTextLength()

    ActiveTspan.attr("id", null)
    var NS = "http://www.w3.org/2000/svg"
    var span2 = document.createElementNS(NS, "tspan");
    //var dy=TspanCnt+"em"
    span2.setAttribute("dy", "1em");
    span2.setAttribute("id", "activeTspan")

    span2.setAttribute("dx", -prevLineLength);

    TextBlinker.style("visibility", "visible")

    // TextBlinker.removeAttribute("dy");

    NextLine = false

    TextBlinker.attr("dx", -prevLineLength);
    var dy = "1em"
    TextBlinker.attr("dy", dy);
    activeText.insertBefore(span2, textBlinker);

    ActiveTspan = d3.select("#activeTspan")
    activeTspan = document.getElementById("activeTspan")
    WriteText = "";

    NextLine = true

    return false
}
//---back button removes all characters of last tspan---
function removeLastTspan()
{

    TspanCnt--;
    var tspans = activeText.childNodes
    var tspanCnt = tspans.length
    var lastTspan = tspans.item(tspanCnt-2) //---last tspan before blinker---
    var currentTspan = tspans.item(tspanCnt-3)
    activeText.removeChild(lastTspan)
    currentTspan.setAttribute("id", "activeTspan")

    ActiveTspan = d3.select("#activeTspan")
    activeTspan = document.getElementById("activeTspan")
    WriteText = activeTspan.textContent;
    addElemTextCw.drawTextWriteTextValue.value = WriteText

    //TextBlinker.style("visibility","visible")

    // var active=new XMLSerializer().serializeToString(activeElem)

}

//----on Enter Key for multiple line text---!
var TspanCnt = 0;
var TSpanON = false;
var WriteText = "";
//---plant Tspan Blinker;;;
var ActiveTspan
var activeTspan

var DrawText = false
var DrawTextEdit = false
var TextCenter =[]
var RotateAngle

var DrawTextStarted = false
function startTextDraw()
{
    activeElem = null
    ActiveElem = null

    starSVG.setAttribute('onclick', "placeDrawText()")
    RotateAngle = 0
    TspanCnt = 0;
    TSpanON = true;
    InsertSpanON = false
    WriteText = "";

    DrawTextStarted = true
    DrawX.attr("stroke", "honeydew")
}
var textFillColor = "black"
function setTextColor()
{

    var cw = addElemTextCw
    if(cw.colorBlackRadio.checked==true)
        textFillColor = "black"
        else if(cw.colorWhiteRadio.checked==true)
            textFillColor = "white"

            if(ActiveElem)
        {
            ActiveElem.attr('fill', textFillColor)
            TextBlinker.attr('fill', textFillColor)
        }
}
//---click on svg layer---
var TextElem //--g child node---
function placeDrawText()
{

    var cw = addElemTextCw

    starSVG.removeAttribute("onclick")
    cw.drawTextWriteTextValue.value = ""

    cw.drawTextWriteTextValue.addEventListener("keypress", cw.drawTextKeyPress, false)
    cw.drawTextWriteTextValue.addEventListener("keyup", cw.drawTextKeyUp, false)

    var fontSize = parseInt(cw.drawTextFontSizeSelect.options[cw.drawTextFontSizeSelect.selectedIndex].text, 10)
    var fontFamily = "arial"

    var strokeWidth = .01*fontSize

    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("fill", textFillColor)
    .attr("stroke", "maroon")
    .attr("stroke-width", strokeWidth)
    .attr("font-size", fontSize)
    .attr("font-family", fontFamily)
    .attr("transform", "translate(0 0)")
    .attr("class", "dragTargetObj")

    activeElem = document.getElementById("activeElem")

    TextElem = ActiveElem.append("svg:text")
    .attr("id", "activeText")
    .attr("x", 0)
    .attr("y", 0)

    ActiveTspan = TextElem.append("tspan")
    .attr("id", "activeTspan")
    activeTspan = document.getElementById("activeTspan")
    //---blinker---!
    var blink = "|";

    TextBlinker = TextElem.append("tspan")
    .text(blink)
    .style("visibility", "visible")
    .attr("id", "textBlinker")
    .attr("dx", "4")
    .attr("stroke", "none")
    .attr("fill", textFillColor)
    .attr("fill-opacity", 1)
    .attr("font-weight", "normal")
    .attr("font-style", "normal")
    .attr("font-family", "Arial")
    .attr("font-size", fontSize)

    startBlinker()
    starSVG.setAttribute("onmousedown", "startDragText(evt)")
    starSVG.setAttribute("onmousemove", "dragText(evt)")
    starSVG.setAttribute("onmouseup", "endDragText(evt);addElemTextCw.focusText()")

    coverOn()

    TextCenter =[SVGx, SVGy]

    var transformRequestObj = starSVG.createSVGTransform()
    var animTransformList = activeElem.transform
    var transformList = animTransformList.baseVal
    transformRequestObj.setTranslate(SVGx, SVGy)
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()

    DrawX.style("display", "inline")
    DrawX.attr("transform", ActiveElem.attr("transform"))

    cw.finishDrawTextButton.disabled = false
    cw.cancelDrawTextButton.disabled = false

    ActiveScale = StarView.k/StarScale

    ActiveLL = LatLng

    DrawText = true
    cw.focusText()
    ///----when elem contained in <g>----

    setTimeout('ActiveElem.style("cursor","move")', 1200)
}
//---change size,family---
function textReset()
{
    var cw = addElemTextCw
    var fontSize = parseInt(cw.drawTextFontSizeSelect.options[cw.drawTextFontSizeSelect.selectedIndex].text, 10)
    var strokeWidth = .01*fontSize
    var fontFamily = "Verdana"

    TextBlinker.attr("font-size", fontSize)

    ActiveElem.attr("stroke-width", strokeWidth)
    ActiveElem.attr("font-size", fontSize)
    ActiveElem.attr("font-family", fontFamily)
    //TextElem.text(WriteText)
}

function drawTextFontSizeSelected()
{
    if(ActiveElem)
        textReset()

}

//==================CLOSE/CANCEL/FINISH========================
function closeDrawText()
{var cw = addElemTextCw
    if(ActiveElem&&activeElem)
    {
        domActiveElemG.removeChild(activeElem)
        var elemTimelinded = false

    }
    clearInterval(TextBlinkerInterval)
    ActiveElem = null

    activeElem = null
    NextLine = false
    TspanCnt = 0
    var cw = addElemTextCw
    RotateAngle = 0
    starSVG.removeAttribute("onclick")
    DrawX.style("display", "none")
    cw.finishDrawTextButton.disabled = true
    cw.cancelDrawTextButton.disabled = true
    cw.deleteDrawTextButton.style.visibility = "hidden"
    DrawText = false

    cw.drawTextWriteTextValue.removeEventListener("keypress", cw.drawTextKeyPress)
    cw.drawTextWriteTextValue.removeEventListener("keyup", cw.drawTextKeyUp)

    DrawTextStarted = false
    starSVG.removeAttribute("onmousedown")

    starSVG.removeAttribute("onmouseup")
    WriteText = "";
    cw.drawTextWriteTextValue.value = ""
    cw.drawTextTopTable.style.backgroundColor = "honeydew"
    cw.editTextSpan.innerHTML = "Write"
    if(EditText==true&&TextDeleted==false&&elemTimelinded==false)
    {
        var elemObjEdit = document.getElementById(DrawTextEditId)

        elemObjEdit.style.visibility = ""
        elemObjEdit.style.cursor = "default"
        EditText = false

    }
    DrawX.attr("stroke", "honeydew")
    coverOff()
    TextDeleted = false
    cw.adjustedRotateTextValue.value = "0"
}
function cancelDrawText()
{
    var cw = addElemTextCw
    starSVG.setAttribute('onclick', "placeDrawText()")

    cw.finishDrawTextButton.disabled = true
    cw.cancelDrawTextButton.disabled = true
    DrawText = false
    DrawX.attr("stroke", "honeydew")

    cw.drawTextWriteTextValue.removeEventListener("keypress", cw.drawTextKeyPress)
    cw.drawTextWriteTextValue.removeEventListener("keyup", cw.drawTextKeyUp)
    if(ActiveElem&&activeElem)
    {
        domActiveElemG.removeChild(activeElem)

    }
    WriteText = "";
    NextLine = false
    TspanCnt = 0
    clearInterval(TextBlinkerInterval)
    ActiveElem = null

    activeElem = null
    if(EditText==true)
    {closeDrawText()
        closeIframe("addElemText");

        var elemObjEdit = document.getElementById(DrawTextEditId)
        elemObjEdit.style.visibility = ""
        elemObjEdit.style.cursor = "default"
        //
        //DrawX.style("display","none")
        //DrawX.attr("stroke","honeydew")

    }
    cw.adjustedRotateTextValue.value = "0"

}

function finishDrawText()
{

    if(EditText==true)
        finishEditText()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemTextCw
            activeElem.removeAttribute("class")

            var finishedElem = AddElemG.append('svg:text')
            var id = "text"+new Date().getTime()
            finishedElem.attr("id", id)
            finishedElem.attr("font-family", ActiveElem.attr("font-family"))
            finishedElem.attr("font-size", ActiveElem.attr("font-size"))
            finishedElem.attr("font-weight", ActiveElem.attr("font-weight"))
            finishedElem.attr("stroke", ActiveElem.attr("stroke"))
            finishedElem.attr("stroke-width", ActiveElem.attr("stroke-width"))
            finishedElem.attr("fill", ActiveElem.attr("fill"))
            finishedElem.attr("transform", ActiveElem.attr("transform"))


            finishedElem.attr("ondblclick", "editTextDraw("+id+")")

            finishedElem.style("cursor", "default")
            finishedElem.style("visibility", null)
            finishedElem.text(WriteText)
            if(oEMAIL)
                finishedElem.attr("createdBy", oEMAIL)


                    var t3 = d3.transform(finishedElem.attr("transform"))
                    var transX = t3.translate[0]
                    var transY = t3.translate[1]
                    var rotateAngle = t3.rotate
                    finishedElem.attr("rotateAngle", rotateAngle)
                    if(cw.drawTextFadeCheck.checked==true)
                    finishedElem.attr("fade", "true")
                    var fade = finishedElem.attr("fade")

                    var ll = StarProjection.invert([transX, transY])


                    finishedElem.attr("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")"+rotate)
                    finishedElem.attr("myScale", ActiveScale)
                    finishedElem.attr("ll0", ll[0])
                    finishedElem.attr("ll1", ll[1])

                    AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle, fade])

                    finishedElem.attr("class", "addElem")

                    starSVG.setAttribute('onclick', "placeDrawText()") //---click to add more icons for this session---
                    DrawX.style("display", "none")

                    cw.finishDrawTextButton.disabled = true
                    cw.cancelDrawTextButton.disabled = true
                    coverOff()
                    WriteText = "";
            NextLine = false
            TspanCnt = 0

            clearInterval(TextBlinkerInterval)
            DrawText = false

            cw.drawTextWriteTextValue.removeEventListener("keypress", cw.drawTextKeyPress)
            cw.drawTextWriteTextValue.removeEventListener("keyup", cw.drawTextKeyUp)

            domActiveElemG.removeChild(activeElem)
            ActiveElem = null

            activeElem = null
            newText(id)
        }

}

function newText(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Text/newText.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)

    ///setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

//=====================EDIT==========================================

var EditText = false
var DrawTextEditId
var EditThisText
function editTextDraw(elemObjEdit) //--dblclick on icon---
{
    if(Mobile==false)
    {
        var createdBy = elemObjEdit.getAttribute("createdBy")
        if(oEMAIL==createdBy)
        {

            EditThisText = elemObjEdit

            DrawTextEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            TimelineParent = document.getElementById(DrawTextEditId).cloneNode(true)

            ActiveElem = null
            activeElem = null

            EditText = true
            if(addElemTextLoad==false)
            {
                openIframe("AddElem", "addElemText", 10)
                //startTextDraw()
            }
            else if(addElemTextViz==false)
            {
                openIframe("AddElem", "addElemText", 10)
                setEditText()
            }
            else
                setEditText()
        }
    }
}
//---after iframe loaded see sendSize() at addElemText.htm---
var EditTextObj
function setEditText()
{

    RotateAngle = 0
    var cw = addElemTextCw

    cw.drawTextTopTable.style.backgroundColor = "orange"
    cw.editTextSpan.innerHTML = "Edit This"
    starSVG.removeAttribute('onclick')

    var elemObjEdit = document.getElementById(DrawTextEditId)
    ActiveScale = parseFloat(elemObjEdit.getAttribute("myScale"))
    var fade = elemObjEdit.getAttribute("fade")
    if(fade)
        cw.drawTextFadeCheck.checked = true
        else
            cw.drawTextFadeCheck.checked = false
            EditTextObj = elemObjEdit.cloneNode(true)
            EditTextObj.setAttribute("id", "activeElem")

            elemObjEdit.style.visibility = "hidden"

            textFillColor = elemObjEdit.getAttribute("fill")

            if(textFillColor=="black")
            cw.colorBlackRadio.checked = true
            else
                cw.colorWhiteRadio.checked = true

                ActiveElem = ActiveElemG.append("g")
                .attr("id", "activeElem")
                .attr("fill", textFillColor)
                .attr("stroke", "maroon")
                .attr("stroke-width", elemObjEdit.getAttribute("stroke-width"))
                .attr("font-size", elemObjEdit.getAttribute("font-size"))
                .attr("font-family", "Verdana")
                .attr("transform", elemObjEdit.getAttribute("transform"))

                .attr("class", "dragTargetObj")
                activeElem = document.getElementById("activeElem")
                //---is this text rotated?---
                var pt = d3.transform(elemObjEdit.getAttribute("transform"))
                RotateAngle = pt.rotate

                var rotatedDeg = pt.rotate.toFixed(0)
                if(!rotatedDeg) rotatedDeg = 0
                cw.adjustedRotateTextValue.value = rotatedDeg

                TextElem = ActiveElem.append("svg:text")
                .attr("id", "activeText")
                .attr("x", 0)
                .attr("y", 0)

                ActiveTspan = TextElem.append("tspan")
                .attr("id", "activeTspan")
                .text(elemObjEdit.textContent)

                WriteText = elemObjEdit.textContent
                cw.drawTextWriteTextValue.value = WriteText
                activeTspan = document.getElementById("activeTspan")
                //---blinker---!
                var blink = "|";

    TextBlinker = TextElem.append("tspan")
    .text(blink)
    .style("visibility", "visible")
    .attr("id", "textBlinker")
    .attr("dx", "5")
    .attr("stroke", "none")
    .attr("fill", textFillColor)
    .attr("fill-opacity", 1)
    .attr("font-weight", "normal")
    .attr("font-style", "normal")
    .attr("font-family", "Arial")
    .attr("font-size", elemObjEdit.getAttribute("font-size"))

    startBlinker()
    starSVG.setAttribute("onmousedown", "startDragText(evt)")
    starSVG.setAttribute("onmousemove", "dragText(evt)")
    starSVG.setAttribute("onmouseup", "endDragText(evt);addElemTextCw.focusText()")

    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    var t3 = d3.transform(activeElem.getAttribute("transform"))
    var transX = t3.translate[0]
    var transY = t3.translate[1]

    ActiveLL = StarProjection.invert([transX, transY])

    cw.drawTextTopTable.style.backgroundColor = "orange"
    cw.editTextSpan.innerText = "Edit This"
    cw.deleteDrawTextButton.style.visibility = "visible"
    cw.finishDrawTextButton.disabled = false
    cw.cancelDrawTextButton.disabled = false

    cw.drawTextWriteTextValue.value = ""

    cw.drawTextWriteTextValue.addEventListener("keypress", cw.drawTextKeyPress, false)
    cw.drawTextWriteTextValue.addEventListener("keyup", cw.drawTextKeyUp, false)

    ActiveElem.style("cursor", "move")
    DrawX.attr("stroke", "darkorange")
    DrawX.style("display", "inline")
    DrawX.attr("transform", ActiveElem.attr("transform"))
    coverOn()
    cw.focusText()
}

function finishEditText()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemTextCw


        EditThisText.setAttribute("ondblclick", "editTextDraw("+DrawTextEditId+")")

        EditThisText.setAttribute("font-size", ActiveElem.attr("font-size"))
        EditThisText.setAttribute("stroke-width", ActiveElem.attr("stroke-width"))
        EditThisText.setAttribute("fill", ActiveElem.attr("fill"))
        EditThisText.setAttribute("transform", ActiveElem.attr("transform"))

        EditThisText.textContent = WriteText
        EditThisText.style.visibility = ""
        EditThisText.style.cursor = "default"
        EditThisText.setAttribute("class", "addElem")
        var t3 = d3.transform(EditThisText.getAttribute("transform"))
        var transX = t3.translate[0]
        var transY = t3.translate[1]
        var rotateAngle = t3.rotate

        EditThisText.setAttribute("rotateAngle", RotateAngle)
        var ll = StarProjection.invert([transX, transY])
        var rotate = ""
        if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"

            EditThisText.setAttribute("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")"+rotate)
            EditThisText.setAttribute("ll0", ll[0])
            EditThisText.setAttribute("ll1", ll[1])

            if(cw.drawTextFadeCheck.checked==true)
            EditThisText.setAttribute("fade", "true")

            EditThisText.setAttribute("myScale", ActiveScale)

            //---update array--
            for(var k = 0; k<AddElemCoordsArray.length; k++)
        {
            var myId = AddElemCoordsArray[k][2]
            if(myId==DrawTextEditId)
            {
                AddElemCoordsArray[k][0] = ll
                AddElemCoordsArray[k][3] = RotateAngle
                AddElemCoordsArray[k][4] = EditThisText.getAttribute("fade")

                break
            }

        }

        domActiveElemG.removeChild(activeElem)
        ActiveElem = null

        activeElem = null

        DrawX.style("display", "none")

        cw.finishDrawTextButton.disabled = true
        cw.cancelDrawTextButton.disabled = true
        coverOff()
        WriteText = "";
        NextLine = false
        TspanCnt = 0

        clearInterval(TextBlinkerInterval)
        if(cw.drawTextFadeCheck.checked==true)
            EditThisText.setAttribute("fade", "true")
            else
                EditThisText.removeAttribute("fade")

                EditThisText.style.display = ""

            if(EditText==true)
            {
                EditText = false
                updateText()
            }

            starRedraw()
            closeIframe("addElemText")
            closeDrawText()

    }

}

function updateText()
{
    var sendMe = EditThisText.cloneNode("true")
    var editId = EditThisText.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Text/updateText.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

var TextDeleted = false
//---button---
function removeCurrentDrawText()
{

    //---update array--
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {
        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawTextEditId)
        {
            AddElemCoordsArray.splice(k, 1)

            break
        }

    }

    domActiveElemG.removeChild(activeElem)
    TextDeleted = true
    EditText = false
    ActiveElem = null

    activeElem = null

    var cw = addElemTextCw

    deleteText(DrawTextEditId)

    closeDrawText()
    closeIframe("addElemText");

}
function deleteText(DrawTextEditId)
{
    domAddElemG.removeChild(EditThisText)

    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawTextEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Text/deleteText.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

function rotateTextAdjust(factor)
{
    var cw = addElemTextCw
    var mult = parseFloat(cw.rotateDrawTextAdjustSelect.options[cw.rotateDrawTextAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateTextValue.value = rotateAdd+parseFloat(cw.adjustedRotateTextValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}
