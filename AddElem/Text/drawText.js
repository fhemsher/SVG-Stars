
//---during drag of element add class 'noselect' to text elements---
//---start Drag---
function addNoSelectAtText()
{
    for(var k = 0; k<domAddElemG.childNodes.length; k++)
    {

        var elem = domAddElemG.childNodes.item(k)

        if(elem.nodeName=="text"&&elem.getAttribute("class").indexOf("path")==-1&&elem.getAttribute("class")!="iconElem")
            elem.setAttribute("class", "noselect")

    }

}
//---end drag---
function removeNoSelectAtText()
{
    for(var k = 0; k<domAddElemG.childNodes.length; k++)
    {

        var elem = domAddElemG.childNodes.item(k)
        if(elem.nodeName=="text"&&elem.getAttribute("class").indexOf("path")==-1&&elem.getAttribute("class")!="iconElem")
            elem.setAttribute("class", "addElem")

    }

}

//---on add icon DrawX follows cursor
function trackDrawText()
{

    if(ActiveElem==null&&DrawTextStarted==true)
    {

        DrawX.attr("stroke", "violet")
        DrawX.style("display", "inline")
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
    DrawX.attr("stroke", "violet")

}
var textFillColor = "black"
function setTextColor()
{
    var cw = addElemTextCw

    textFillColor = cw.drawTextFillSelect.options[cw.drawTextFillSelect.selectedIndex].value
    if(ActiveElem)
    {
        ActiveElem.attr('fill', textFillColor)
        TextBlinker.attr('fill', textFillColor)
    }
}
function drawTextFontFamilySelected()
{

    var cw = addElemTextCw

    var fontFamily = cw.drawTextFontFamilySelect.options[cw.drawTextFontFamilySelect.selectedIndex].value

    cw.fontFamilySpan.style.fontFamily = fontFamily
    if(ActiveElem)
    {
        ActiveElem.attr('font-family', fontFamily)

    }
}
var FontWeight = "normal"
function drawTextBoldChecked()
{
    var cw = addElemTextCw

    if(cw.drawTextBoldCheck.checked)
    {
        FontWeight = "bold"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "bold")
    }
    else
    {
        FontWeight = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "normal")
    }
    if(ActiveElem)
        textReset()
        cw.fontFamilySpan.style.fontWeight = FontWeight
}
var FontStyle = "normal"
function drawTextItalicChecked()
{
    var cw = addElemTextCw

    if(cw.drawTextItalicCheck.checked)
    {
        FontStyle = "italic"
        if(ActiveElem)
            ActiveElem.attr('font-style', "italic")

    }
    else
    {
        FontStyle = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-style', "normal")
    }

    cw.fontFamilySpan.style.fontStyle = FontStyle
    if(ActiveElem)
        textReset()
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
    var fontFamily = cw.drawTextFontFamilySelect.options[cw.drawTextFontFamilySelect.selectedIndex].value
    var textStrokeColor = cw.drawTextStrokeSelect.options[cw.drawTextStrokeSelect.selectedIndex].value
    if(ActiveElem)
        ActiveElem.attr('stroke', textStrokeColor)
        if(ActiveElem && textStrokeColor!="none")
    {
        var strokeWidth = .02*fontSize
        ActiveElem.attr('strokeWidth', strokeWidth)

    }
    var textFillColor = cw.drawTextFillSelect.options[cw.drawTextFillSelect.selectedIndex].value
    if(cw.drawTextBoldCheck.checked)
    {
        FontWeight = "bold"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "bold")
    }
    else
    {
        FontWeight = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "normal")
    }

    if(cw.drawTextItalicCheck.checked)
    {
        FontStyle = "italic"
        if(ActiveElem)
            ActiveElem.attr('font-style', "italic")

    }
    else
    {
        FontStyle = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-style', "normal")
    }
    var textStrokeColor = cw.drawTextStrokeSelect.options[cw.drawTextStrokeSelect.selectedIndex].value

    if(textStrokeColor!="none")
        var strokeWidth = .02*fontSize
        else
            var strokeWidth = 0

            ActiveElem = ActiveElemG.append("g")
            .attr("id", "activeElem")
            .attr("fill", textFillColor)
            .attr("stroke", textStrokeColor)
            .attr("stroke-width", strokeWidth)
            .attr("font-size", fontSize)
            .attr("font-family", fontFamily)
            .attr("font-weight", FontWeight)
            .attr("font-style", FontStyle)
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
    addNoSelectAtText()
    TextCenter =[SVGx, SVGy]

    var transformRequestObj = starSVG.createSVGTransform()
    var animTransformList = activeElem.transform
    var transformList = animTransformList.baseVal
    transformRequestObj.setTranslate(SVGx, SVGy)
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()

    DrawX.style("display", "inline")
    DrawX.attr("transform", ActiveElem.attr("transform"))

    // cw.shadowDrawTextButton.disabled = false
    cw.finishDrawTextButton.disabled = false
    cw.cancelDrawTextButton.disabled = false

    DrawText = true
    cw.focusText()
    ///----when elem contained in <g>----
    ActiveScale = StarView.k/StarScale
    ActiveLL = LatLng
    setTimeout('ActiveElem.style("cursor","move")', 1200)
}
//---change size,family---
function textReset()
{
    var cw = addElemTextCw
    var fontSize = parseInt(cw.drawTextFontSizeSelect.options[cw.drawTextFontSizeSelect.selectedIndex].text, 10)
    // var strokeWidth = .01*fontSize
    var fontFamily = cw.drawTextFontFamilySelect.options[cw.drawTextFontFamilySelect.selectedIndex].text
    if(cw.drawTextBoldCheck.checked)
    {
        FontWeight = "bold"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "bold")
    }
    else
    {
        FontWeight = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-weight', "normal")
    }

    if(cw.drawTextItalicCheck.checked)
    {
        FontStyle = "italic"
        if(ActiveElem)
            ActiveElem.attr('font-style', "italic")

    }
    else
    {
        FontStyle = "normal"
        if(ActiveElem)
            ActiveElem.attr('font-style', "normal")
    }

    TextBlinker.attr("font-size", fontSize)

    showDrawTextStrokeBg()
    ActiveElem.attr("font-weight", FontWeight)
    ActiveElem.attr("font-size", fontSize)
    ActiveElem.attr("font-style", FontStyle)
    ActiveElem.attr("font-family", fontFamily)
    removeNoSelectAtText()
}

function drawTextFontSizeSelected()
{
    if(ActiveElem)
        textReset()

}

//==================CLOSE/CANCEL/FINISH========================
function closeDrawText()
{
    var cw = addElemTextCw
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
    DrawX.style("display", "none")
    cw.finishDrawTextButton.disabled = true
    cw.cancelDrawTextButton.disabled = true
    cw.deleteDrawTextButton.style.visibility = "hidden"

    DrawText = false

    cw.drawTextWriteTextValue.removeEventListener("keypress", cw.drawTextKeyPress)
    cw.drawTextWriteTextValue.removeEventListener("keyup", cw.drawTextKeyUp)

    DrawTextStarted = false
        starSVG.removeAttribute("onmousedown")
        starSVG.removeAttribute("onmousemove")
        starSVG.removeAttribute("onmouseup")

        starSVG.removeAttribute('onclick')
    WriteText = "";
    cw.drawTextWriteTextValue.value = ""
    cw.botTextTable.style.backgroundColor = "linen"
    cw.drawTextTopTable.style.backgroundColor = "linen"
    cw.containerDiv.style.backgroundColor = "linen"
    cw.editTextSpan.innerHTML = "Write"
    cw.textClickOnTD.style.visibility = "visible"

    if(EditText==true&&TextDeleted==false)
    {
        var elemObjEdit = document.getElementById(DrawTextEditId)
        elemObjEdit.setAttribute("ondblclick", "editTextDraw("+DrawTextEditId+")")


        elemObjEdit.style.cursor = "default"
        EditText = false
        closeIframe("addElemText");
    }
    DrawX.attr("stroke", "violet")
    coverOff()
    TextDeleted = false
    cw.adjustedRotateTextValue.value = "0"
    removeNoSelectAtText()

}
function cancelDrawText()
{
    var cw = addElemTextCw
    starSVG.setAttribute('onclick', "placeDrawText()")

    cw.finishDrawTextButton.disabled = true
    cw.cancelDrawTextButton.disabled = true
    DrawText = false
    DrawX.attr("stroke", "violet")

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
    {
        closeDrawText()
        closeIframe("addElemText");

        var elemObjEdit = document.getElementById(DrawTextEditId)

        elemObjEdit.style.cursor = "default"

    }
    cw.adjustedRotateTextValue.value = "0"

}

function finishDrawText()
{
    if(WriteText!="")
    {
        if(EditText==true)
            finishEditText()
            else if(document.getElementById("activeElem"))
            {
                var cw = addElemTextCw
                activeElem.removeAttribute("class")
                activeElem.removeAttribute("onmouseup")
                var finishedElem = AddElemG.append('text')
                var id = "text"+new Date().getTime()
                finishedElem.attr("id", id)
                finishedElem.attr("font-family", ActiveElem.attr("font-family"))
                finishedElem.attr("font-size", ActiveElem.attr("font-size"))
                finishedElem.attr("font-weight", ActiveElem.attr("font-weight"))
                finishedElem.attr("font-style", ActiveElem.attr("font-style"))
                finishedElem.attr("stroke", ActiveElem.attr("stroke"))
                finishedElem.attr("stroke-width", ActiveElem.attr("stroke-width"))
                finishedElem.attr("fill", ActiveElem.attr("fill"))
                finishedElem.attr("transform", ActiveElem.attr("transform"))

                    finishedElem.attr("ondblclick", "editTextDraw("+id+")")

                    finishedElem.style("cursor", "default")


                    finishedElem.text(WriteText)
                if(oEMAIL)
                finishedElem.attr("createdBy", oEMAIL)
                    //---is this text rotated?---
                 var t3 = d3.transform(finishedElem.attr("transform"))
                    var transX = t3.translate[0]
                    var transY = t3.translate[1]
                    var rotateAngle = t3.rotate
                    finishedElem.attr("rotateAngle", rotateAngle)
                    if(cw.drawTextFadeCheck.checked==true)
                    finishedElem.attr("fade", "true")
                    var fade = finishedElem.attr("fade")
                    var rotate=""
                    if(rotateAngle!=0)
                        rotate = "rotate("+rotateAngle+")"

                   var ll = StarProjection.invert([transX, transY])
                   finishedElem.attr("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")"+rotate)
                    finishedElem.attr("myScale", ActiveScale)
                    finishedElem.attr("ll0", ll[0])
                    finishedElem.attr("ll1", ll[1])

                    AddElemCoordsArray.push([ll, ActiveScale, id, rotateAngle, fade])
                    finishedElem.attr("myZoom", PrevZoomInteger)
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
                coverOff()
                removeNoSelectAtText()
                 newText(id)
            }
    }
    else
    {
        closeIframe("addElemText")
        closeDrawText()
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


            ActiveElem = null
            activeElem = null

            EditText = true
            if(addElemTextLoad==false)
            {
                openIframe("AddElem", "addElemText", 10)

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
    cw.botTextTable.style.backgroundColor = "orange"
    cw.drawTextTopTable.style.backgroundColor = "orange"
    cw.containerDiv.style.backgroundColor = "orange"
    cw.textClickOnTD.style.visibility = "hidden"
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
    EditTextObj.removeAttribute("ondblclick")
    elemObjEdit.style.visibility = "hidden"
    addNoSelectAtText()
    textFillColor = elemObjEdit.getAttribute("fill")
    textStrokeColor = elemObjEdit.getAttribute("stroke")
    var fontFamily = elemObjEdit.getAttribute("font-family")
    var fontWeight = elemObjEdit.getAttribute("font-weight")
    var fontStyle = elemObjEdit.getAttribute("font-style")
    var fontSize = +elemObjEdit.getAttribute("font-size")

                var strokeWidth = fontSize*.02
                //----reset selections---
                for(var k = 0; k<cw.drawTextFontSizeSelect.options.length; k++)
            {
                var size = cw.drawTextFontSizeSelect.options[k].text
                if(size==fontSize)
                {
                    cw.drawTextFontSizeSelect.selectedIndex = k
                    break
                }
            }

            for(var k = 0; k<cw.drawTextFontFamilySelect.options.length; k++)
        {
            var family = cw.drawTextFontFamilySelect.options[k].text
            if(family==fontFamily)
            {
                cw.drawTextFontFamilySelect.selectedIndex = k
                break
            }
        }
        for(var k = 0; k<cw.drawTextFillSelect.options.length; k++)
    {
        var fill = cw.drawTextFillSelect.options[k].value
        if(fill==textFillColor)
        {
            cw.drawTextFillBg.style.background = textFillColor
            cw.drawTextFillSelect.selectedIndex = k
            break
        }
    }
    for(var k = 0; k<cw.drawTextStrokeSelect.options.length; k++)
    {
        var stroke = cw.drawTextStrokeSelect.options[k].value
        if(stroke==textStrokeColor)
        {
            cw.drawTextStrokeBg.style.background = textStrokeColor
            cw.drawTextStrokeSelect.selectedIndex = k
            break
        }
    }

    if(fontWeight=="bold")
        cw.drawTextBoldCheck.checked = true
        else
            cw.drawTextBoldCheck.checked = false

            if(fontStyle=="italic")
            cw.drawTextItalicCheck.checked = true
            else
                cw.drawTextItalicCheck.checked = false
                cw.fontFamilySpan.style.fontWeight = fontWeight
                cw.fontFamilySpan.style.fontStyle = fontStyle

                ActiveElem = ActiveElemG.append("g")
                .attr("id", "activeElem")
                .attr("fill", textFillColor)
                .attr("stroke", textStrokeColor)
                .attr("stroke-width", strokeWidth)
                .attr("font-size", fontSize)
                .attr("font-family", fontFamily)
                .attr("font-weight", fontWeight)
                .attr("font-style", fontStyle)
                .attr("transform", elemObjEdit.getAttribute("transform"))
                .attr("filter", elemObjEdit.getAttribute("filter"))
                .attr("class", "dragTargetObj")

                activeElem = document.getElementById("activeElem")

                var ctm = elemObjEdit.getCTM()
                RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    cw.adjustedRotateTextValue.value = rotatedDeg

    TextElem = ActiveElem.append("text")
    .attr("id", "activeText")
    .attr("x", 0)
    .attr("y", 0)

    ActiveTspan = TextElem.append("tspan")
    .attr("id", "activeTspan")
    .text(EditTextObj.textContent)

    WriteText = elemObjEdit.firstChild.textContent

    cw.drawTextWriteTextValue.value = WriteText

    activeTspan = document.getElementById("activeTspan")
    //---blinker---!
    var blink = "|";

    TextBlinker = TextElem.append("tspan")
    .text(blink)
    .style("visibility", "visible")
    .attr("id", "textBlinker")
    .attr("dx", "-.5")
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

    cw.botTextTable.style.backgroundColor = "orange"

    cw.drawTextTopTable.style.backgroundColor = "orange"
    cw.editTextSpan.innerText = "Edit This"
    cw.deleteDrawTextButton.style.visibility = "visible"
    cw.finishDrawTextButton.disabled = false
    cw.cancelDrawTextButton.disabled = false

    cw.drawTextWriteTextValue.addEventListener("keypress", cw.drawTextKeyPress, false)
    cw.drawTextWriteTextValue.addEventListener("keyup", cw.drawTextKeyUp, false)

    ActiveElem.style("cursor", "move")
    DrawX.attr("stroke", "darkorange")
    DrawX.style("display", "inline")
    DrawX.attr("transform", ActiveElem.attr("transform"))
    coverOn()
    cw.focusText()

                   ActiveScale = parseFloat(EditTextObj.getAttribute("myScale"))
                var ll0 = parseFloat(EditTextObj.getAttribute("ll0"))
                var ll1 = parseFloat(EditTextObj.getAttribute("ll1"))
                ActiveLL =[ll0, ll1]


}

function finishEditText()
{
    if(WriteText!="")
    {       removeNoSelectAtText()
        if(document.getElementById("activeElem"))
        {
             var cw = addElemTextCw
           if(activeElem.lastChild.nodeName=='tspan')
            {
                endScript = EditThisText.lastChild
                activeElem.removeChild(endScript)
            }
            if(endScript)
            {
                activeElem.appendChild(endScript)

            }


            var endScript = false
           var finishedElem = document.createElementNS(NS,"text")
            finishedElem.textContent = WriteText
            finishedElem.setAttribute("ondblclick", "editTextDraw("+DrawTextEditId+")")
            finishedElem.setAttribute("class", "addElem")
            finishedElem.setAttribute("myZoom", PrevZoomInteger)


            finishedElem.setAttribute("font-size", ActiveElem.attr("font-size"))
            finishedElem.setAttribute("stroke", ActiveElem.attr("stroke"))
            finishedElem.setAttribute("stroke-width", ActiveElem.attr("stroke-width"))
            finishedElem.setAttribute("fill", ActiveElem.attr("fill"))
            finishedElem.setAttribute("font-family", ActiveElem.attr("font-family"))
            finishedElem.setAttribute("font-weight", ActiveElem.attr("font-weight"))
            finishedElem.setAttribute("font-style", ActiveElem.attr("font-style"))
            finishedElem.setAttribute("transform", ActiveElem.attr("transform"))
            finishedElem.setAttribute("fade", ActiveElem.attr("fade"))

            finishedElem.textContent = WriteText
            finishedElem.setAttribute("style","cursor:default")
            finishedElem.setAttribute("createdBy",oEMAIL)

        var t3 = d3.transform(finishedElem.getAttribute("transform"))
        var transX = t3.translate[0]
        var transY = t3.translate[1]
        var rotateAngle = t3.rotate

        finishedElem.setAttribute("rotateAngle", rotateAngle)

        var rotate = ""
        if(rotateAngle!=0)
            rotate = "rotate("+rotateAngle+")"


             var ll = ActiveLL
            finishedElem.setAttribute("transform", StarPoint(ll)+"scale("+(StarView.k/StarScale)/ActiveScale+")"+rotate)
            finishedElem.setAttribute("ll0", ll[0])
            finishedElem.setAttribute("ll1", ll[1])

            if(cw.drawTextFadeCheck.checked==true)
            finishedElem.setAttribute("fade", "true")

            finishedElem.setAttribute("myScale", ActiveScale)

            //---update array--
            for(var k = 0; k<AddElemCoordsArray.length; k++)
        {
            var myId = AddElemCoordsArray[k][2]
            if(myId==DrawTextEditId)
            {
                AddElemCoordsArray[k][0] = ll
                AddElemCoordsArray[k][3] = rotateAngle
                AddElemCoordsArray[k][4] = finishedElem.getAttribute("fade")

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

            var elemObjEdit = document.getElementById(DrawTextEditId)
           domAddElemG.insertBefore(finishedElem, elemObjEdit)
            domAddElemG.removeChild(elemObjEdit)
             finishedElem.setAttribute("id", DrawTextEditId)

            console.log(domAddElemG)
            if(EditText==true)
            {
                EditText = false
                updateText(finishedElem)
            }

            starRedraw()
            closeIframe("addElemText")
            closeDrawText()

        }
    }
    else
    {
        closeIframe("addElemText")
        closeDrawText()
    }

}
function updateText(finishedElem)
{
    var sendMe = finishedElem.cloneNode("true")
    sendMe.setAttribute('style','cursor:default')
    sendMe.setAttribute('class','addElem')
    sendMe.removeAttribute('opacity')
    var editId = finishedElem.getAttribute("id")
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
function showDrawTextFillBg()
{
    var cw = addElemTextCw
    var fill = cw.drawTextFillSelect.options[cw.drawTextFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawTextFillBg.style.backgroundColor = fill
        else
            cw.drawTextFillBg.style.backgroundColor = ""
            if(cw.drawTextFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else
            if(ActiveElem)
        {
            ActiveElem.attr('fill', fill)
            TextBlinker.attr('fill', fill)
        }

}

function showDrawTextStrokeBg()
{
    var cw = addElemTextCw
    var stroke = cw.drawTextStrokeSelect.options[cw.drawTextStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawTextStrokeBg.style.backgroundColor = stroke
        else
            cw.drawTextStrokeBg.style.backgroundColor = ""
            if(cw.drawTextStrokeSelect.selectedIndex==0)
        {
            ActiveElem.attr("stroke", "none")
            ActiveElem.attr("stroke-width", 0)

        }
        else
            if(ActiveElem)
        {
            ActiveElem.attr('stroke', stroke)
            var fontSize = +cw.drawTextFontSizeSelect.options[cw.drawTextFontSizeSelect.selectedIndex].text
            ActiveElem.attr('stroke-width', fontSize*.02)

        }

}

function drawTextFillSelected()
{
    var cw = addElemTextCw
    var fill = cw.drawTextFillSelect.options[cw.drawTextFillSelect.selectedIndex].value
    if(cw.drawCircleTextSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else
        if(ActiveElem)
    {
        ActiveElem.attr('fill', fill)
        TextBlinker.attr('fill', fill)
    }

}
