function trackDrawImage()
{
    var cw = addElemImageCw

    if(ActiveElem==null&&ImageHREF&&EditImage==false && ImageDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.attr("stroke", "violet")
    }
}
var EditImage = false
var DrawImage = false
var ImageDeleted = false

function startImageDraw()
{
    var cw = addElemImageCw
    if(EditImage==false)
    {
        ActiveElem = null
        activeElem = null
        DrawImage = true
        DrawX.style("display", "inline")
       starSVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
        cw.drawImageTopButton.style.visibility = "hidden"
   starSVG.setAttribute("cursor","default")

    }

}

function placeDrawImage()
{
    var cw = addElemImageCw
    if(cw.imgFile.value!="")
    {

        coverOn()

        var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text


        ActiveElem = ActiveElemG.append("image")
        .attr("id", "activeElem")
        .attr("fill-opacity", opacity)

        activeElem=document.getElementById("activeElem")
        activeElem.setAttribute("height", ImageHeight)
        activeElem.setAttribute("width", ImageWidth)
        activeElem.setAttribute("href", ImageHREF)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")

        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        domActiveElemG.appendChild(imgDragArrow)

         ActiveScale = ((StarView.k)/StarScale)
        ActiveLL = LatLng


         ImgDragArrow.attr("class", "dragTargetObj")
        ImgDragArrow.attr("transform", "translate("+(SVGx+ImageWidth)+" "+(SVGy+ImageHeight)+")")
        ImgDragArrow.style("visibility", "visible")


        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")


        cw.imageWidthValue.value = ImageWidth
        cw.imageHeightValue.value = ImageHeight
        ImageCorner =[SVGx, SVGy]

       starSVG.removeAttribute('onclick')

       starSVG.setAttribute("onmousedown", "startDragImage(evt)")
       starSVG.setAttribute("onmousemove", "dragImage(evt)")
       starSVG.setAttribute("onmouseup", "endDragImage(evt)")

        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false

    }
}

var ImageHREF
var ImageWidth
var ImageHeight
function loadImageFile()
{

    var cw = addElemImageCw

    var file = cw.document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function ()
        {

            ImageHREF = reader.result
             var image = new Image();
            image.src = reader.result;
            image.onload = function() {

                ImageWidth=image.naturalWidth/2
                ImageHeight=image.naturalHeight/2
                cw.imageWidthValue.value = ImageWidth
                cw.imageHeightValue.value = ImageHeight
            }
        }
        , false);

    if (file)
    {
        reader.readAsDataURL(file);

    }
}

///---X button and iframe close all---
function closeDrawImage()
{
    if(addElemImageViz==true)
    {
        closeIframe("addElemImage");
        coverOff()

        RotateAngle = 0
        var cw = addElemImageCw
        cw.adjustedRotateImageValue.value = 0
        var elemTimelinded = false

        if(EditImage==true && ImageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawImageEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("ondblclick", "editImageDraw(evt)")

        }
        DraggingObj = false
        DrawImage = false
        EditImage = false
        ImageDeleted = false

       starSVG.removeAttribute("onmousedown")
       starSVG.removeAttribute("onmousemove")
       starSVG.removeAttribute("onmouseup")
       starSVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
           starSVG.appendChild(imgDragArrow) //--place drag dot on top---


        }
        activeElem = null
        ActiveElem = null
        ImageHREF = null
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

        ImgDragArrow.attr("transform", null)
        ImgDragArrow.style("visibility", "hidden")
        imgDragArrow.setAttribute("x",-12.5)
        imgDragArrow.setAttribute("y",-12.5)

        cw.drawImageFinishButton.disabled = true
        cw.drawImageCancelButton.disabled = true
        cw.drawImageCancelButton.style.borderColor = ""
        cw.drawImageDeleteButton.style.visibility = "hidden"
        cw.drawImageEditSpan.innerText = "Draw Images"

        cw.containerDiv.style.backgroundColor = "linen"



    }
}

var EditImage = false
var DrawImage = false
var ImageDeleted = false

function startImageDraw()
{
    RotateAngle = 0
    // elemSizeDiv.innerHTML = "w = <input id=drawImageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawImageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemImageCw
    if(EditImage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawImage = true
       starSVG.setAttribute('onclick', " placeDrawImage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
   starSVG.setAttribute("cursor","default")
  }


        cw.adjustedRotateImageValue.value = 0
        cw.imgFile.value = ""
        cw.imageWidthValue.value = ""
        cw.imageHeightValue.value = ""
        ImageHREf = null

}

//--click on svg---

function finishDrawImage()
{

    if(EditImage==true)
        finishEditImage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemImageCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "image"+new Date().getTime()
            domAddElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

          //  finishedElem.setAttribute("onmousedown", "editImageDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)
                     var myScale = (StarView.k/StarScale)/(ActiveScale)

            var t3 = d3.transform(finishedElem.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var ll = StarProjection.invert([transX, transY])

            finishedElem.setAttribute("transform", StarPoint(ll))
            finishedElem.setAttribute("myScale", ActiveScale)
            finishedElem.setAttribute("ll0", ll[0])
            finishedElem.setAttribute("ll1", ll[1])
            finishedElem.setAttribute("myZoom", PrevZoomInteger)
            if(cw.drawImageFadeCheck.checked==true)
                finishedElem.setAttribute("fade", "true")
                var fade = finishedElem.getAttribute("fade")

             AddElemCoordsArray.push([ll, ActiveScale, id, RotateAngle, fade])

                finishedElem.setAttribute("class", "addElem")
                finishedElem.setAttribute("createdBy", oEMAIL)
                finishedElem.setAttribute("ondblclick", "editImageDraw(evt)")

            //finishedElem.setAttribute("class", "imageElem")

            ActiveElem = null
            activeElem = null
             ImageHREF = null
            // d3SVG.style("cursor", "default")
           starSVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---

           starRedraw()
            DrawX.style("display", "none")
            ImgDragArrow.style("visibility", "hidden")
            //topG.appendChild(imgDragArrow)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageCancelButton.disabled = true
           newImage(id)
        }

}
function newImage(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Image/newImage.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    setTimeout(updatePost, 3000)
    // setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
 //   var cw = addElemImageCw
    //if(cw.circleTimelineCheck.checked==true)
    //    closeDrawImage()
}
function cancelDrawImage()
{
    var cw = addElemImageCw
    if(EditImage==true)
        cancelEditImage()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null
            ImageHREF = null
           starSVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageBotButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.adjustedRotateImageValue.value = 0
            cw.imgFile.value=""
            cw.imageWidthValue.value=""
            cw.imageHeightValue.value=""

            coverOff()


        }

}

//====================edit/update rect===============================
//====================edit/update circle===============================

var EditImage = false
var DrawImageEditId
var EditThisImage
function editImageDraw(evt) //--dblclick on image---
{
    if(Mobile==false)
    {

        var elemObjEdit = evt.target
        var createdBy = elemObjEdit.getAttribute("createdBy")
       if(oEMAIL==createdBy)
       {

            starSVG.removeAttribute('onclick')
            EditThisImage = elemObjEdit
            DrawEditImageEditId = EditThisImage.getAttribute("id")

            DrawImageEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--
            DrawX.style("display", "inline")
            DrawX.attr("stroke", "darkorange")

            ActiveElem = null
            EditImage = true
            if(addElemImageLoad==false)
            {
                openIframe("AddElem", "addElemImage", 10)

            }
            else if(addElemImageViz==false)
            {
                openIframe("AddElem", "addElemImage", 10)
                setEditImage()
            }
            else
                setEditImage()

        }
   }

}

var EditImage = false
var DrawImageEditId
var EditThisImage

//---after iframe loaded see sendSize() at addElemImage.htm---
var EditImageObj
function setEditImage()
{
    coverOn()


   starSVG.removeAttribute('onclick')
    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
    EditThisImage=elemObjEdit
 EditImageObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditImageObj.setAttribute("id", "activeElem")
    EditImageObj.setAttribute("class", "dragTargetObj")

    EditImageObj.removeAttribute("ondblclick")

        domActiveElemG.insertBefore(EditImageObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(imgDragArrow) //--place drag dot on top---
        cw.drawImageDeleteButton.style.visibility = "visible"
        cw.drawImageEditSpan.innerHTML = "Edit Image"


        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false
        ActiveScale = parseFloat(activeElem.getAttribute("myScale"))
        RotateAngle = parseFloat(activeElem.getAttribute("rotateAngle"))
        cw.adjustedRotateImageValue.value = RotateAngle.toFixed(0)
        var t3 = d3.transform(ActiveElem.attr("transform"))
        var transX = t3.translate[0]
        var transY = t3.translate[1]
        ActiveLL = StarProjection.invert([transX, transY])

        //...slocate dargdot---
        var bb=activeElem.getBBox()
        imgDragArrow.setAttribute("x",bb.width-12.5)
        imgDragArrow.setAttribute("y",bb.height-12.5)
                imgDragArrow.setAttribute("transform",activeElem.getAttribute("transform"))

        setImageEditDrag()

}

function setImageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    ImgDragArrow.style("visibility", "visible")

    //---timeout??---
   starSVG.setAttribute("onmousedown", "startDragImage(evt)")
   starSVG.setAttribute("onmousemove", "dragImage(evt)")
   starSVG.setAttribute("onmouseup", "endDragImage(evt)")
    ActiveElem.style("cursor", "move")

}
function finishEditImage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemImageCw
        activeElem.removeAttribute("class")
        var finishedElem = activeElem.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))

        finishedElem.setAttribute("class", "addElem")
                            var ll = ActiveLL
                finishedElem.setAttribute("myScale", ActiveScale)
                finishedElem.setAttribute("ll0", ll[0])
                finishedElem.setAttribute("ll1", ll[1])

        finishedElem.setAttribute("opacity", ActiveElem.attr("opacity"))

        finishedElem.setAttribute("rotateAngle", RotateAngle)

        starSVG.appendChild(imgDragArrow)
        imgDragArrow.removeAttribute("transform")

        ActiveElem = null
        activeElem = null
        finishedElem.style.cursor = "default"
        finishedElem.style.visibility = ""
        //---is this a timelined elem---
        finishedElem.setAttribute("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
             if(cw.drawImageFadeCheck.checked==true)
                        finishedElem.setAttribute("fade", "true")
                        else
                                finishedElem.removeAttribute("fade")

                                for(var k = 0; k<AddElemCoordsArray.length; k++)
                        {
                                var addId = AddElemCoordsArray[k][2]
                                if(addId==DrawImageEditId)
                                {
                                        var fade = finishedElem.getAttribute("fade")
                                        AddElemCoordsArray[k] =[ll, ActiveScale, DrawImageEditId, '', fade]

                                        break
                                }
                        }

                 if(cw.drawImageCommentValue.value!="")
                {
                        finishedElem.setAttribute("comment", txt2xml(cw.drawImageCommentValue.value))
                        finishedElem.setAttribute("onmouseover", "showSymbolComment(evt)")
                        finishedElem.setAttribute("onmouseout", "hideSymbolComment(evt)")

                }
                else
                {
                        finishedElem.removeAttribute("comment")
                        finishedElem.removeAttribute("onmouseover")
                        finishedElem.removeAttribute("onmouseout")

                }

      finishedElem.setAttribute("ondblclick", "editImageDraw(evt)")
        finishedElem.setAttribute("id", DrawImageEditId)
        UpdateThisImage = finishedElem
        //updateImage()
        domAddElemG.insertBefore(finishedElem, EditThisImage)
        domAddElemG.removeChild(EditThisImage)

         UpdateThisImage = finishedElem
        EditImage = false
         starRedraw()
        updateImage()
    }
    closeDrawImage()
}
var UpdateThisImage
function updateImage()
{
    var sendMe = UpdateThisImage
    var editId = UpdateThisImage.getAttribute("id")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)
    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\"  editId=\""+editId+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Image/updateImage.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);
    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}
function resetEditImage()
{

    var cw = addElemImageCw
    EditImage = false
    cw.editImageSpan.innerText = "Draw Images"
    cw.drawImageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    ImgDragArrow.style("visibility", "hidden")


    cw.drawImageDeleteButton.style.visibility = "hidden"
    cw.drawImageCancelButton.disabled = false
    cw.drawImageFinishButton.disabled = false
    DrawImage = true

    //---click to add more circles for this session---

}

function cancelEditImage()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawImageEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    //topG.appendChild(imgDragArrow) //--place drag dot on top---
    closeDrawImage()
    //setEditEllipse()

}

//=======================delete image==================
var ImageDeleted = false
//---button---
function removeCurrentDrawImage()
{

    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
    domAddElemG.removeChild(elemObjEdit)
    ImageDeleted = true

    EditImage = false
    DrawImage = false
    deleteDrawImage(DrawImageEditId)


    closeDrawImage()
        DrawImageEditId = null
}

function deleteDrawImage(DrawImageEditId)
{
    //---remove from Celestial array---
    for(var k = 0; k<AddElemCoordsArray.length; k++)
    {

        var myId = AddElemCoordsArray[k][2]
        if(myId==DrawImageEditId)
        {
            AddElemCoordsArray.splice(k, 1)
            break
        }

    }

    var sendXML = "<SEND  folder=\""+FOLDER+"\" deleteId=\""+DrawImageEditId+"\"  />"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Image/deleteImage.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---
}

function rotateImageAdjust(factor)
{
    var cw = addElemImageCw
    var mult = parseFloat(cw.rotateDrawImageAdjustSelect.options[cw.rotateDrawImageAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateImageValue.value = rotateAdd+parseFloat(cw.adjustedRotateImageValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

