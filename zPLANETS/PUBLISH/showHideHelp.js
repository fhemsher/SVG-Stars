
var CurrentHelpDiv
function closeCurrentHelp()
{
     if(CurrentHelpDiv)
     {
          var helpSelect="#"+CurrentHelpDiv
         var height = 1
    d3.select(helpSelect).transition().duration(300).style("height", height+"px")
    setTimeout(CurrentHelpDiv+'.style.display="none"', 330)

        CurrentHelpDiv=null

     }



}



function openBeginHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv="beginHelpDiv"
     beginHelpDiv.style.display = "block"
    var height = beginHelpDiv.scrollHeight
    d3.select("#beginHelpDiv").transition().duration(800).style("height", height+"px")


}

function closeBeginHelp()
{
    var height = 1
    d3.select("#beginHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('beginHelpDiv.style.display="none"', 900)
         CurrentHelpDiv=null


}
function openPreviewHostHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='previewHostHelpDiv'
     previewHostHelpDiv.style.display = "block"
    var height = 550
    d3.select("#previewHostHelpDiv").transition().duration(800).style("height", height+"px")


}

function closePreviewHostHelp()
{
    var height = 1
    d3.select("#previewHostHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('previewHostHelpDiv.style.display="none"', 900)
        CurrentHelpDiv=null


}

function openSaveDrawingViewHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='saveDrawingViewHelpDiv'
     saveDrawingViewHelpDiv.style.display = "block"
    var height =saveDrawingViewHelpDiv.scrollHeight
    d3.select("#saveDrawingViewHelpDiv").transition().duration(800).style("height", height+"px")


}

function closeSaveDrawingViewHelp()
{
    var height = 1
    d3.select("#saveDrawingViewHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('saveDrawingViewHelpDiv.style.display="none"', 900)

          CurrentHelpDiv=null

}

function openCompanionHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='companionHelpDiv'
     companionHelpDiv.style.display = "block"
    var height = 550
    d3.select("#companionHelpDiv").transition().duration(800).style("height", height+"px")


}

function closeCompanionHelp()
{
    var height = 1
    d3.select("#companionHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('companionHelpDiv.style.display="none"', 900)
        CurrentHelpDiv=null
}

function openInitStarDrawingHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='initStarDrawingHelpDiv'
     initStarDrawingHelpDiv.style.display = "block"
    var height = 550
    d3.select("#initStarDrawingHelpDiv").transition().duration(800).style("height", height+"px")


}

function closeInitStarDrawingHelp()
{
    var height = 1
    d3.select("#initStarDrawingHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('initStarDrawingHelpDiv.style.display="none"', 900)
        CurrentHelpDiv=null
}
  function openZoomHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='zoomHelpDiv'
     zoomHelpDiv.style.display = "block"
    var height = 550
    d3.select("#zoomHelpDiv").transition().duration(800).style("height", height+"px")


}

function closeZoomHelp()
{
    var height = 1
    d3.select("#zoomHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('zoomHelpDiv.style.display="none"', 900)
        CurrentHelpDiv=null
}
  function openPublishHelp()
{
    closeCurrentHelp()
    CurrentHelpDiv='publishHelpDiv'
     publishHelpDiv.style.display = "block"
    var height = publishHelpDiv.scrollHeight
    d3.select("#publishHelpDiv").transition().duration(800).style("height", height+"px")


}

function closePublishHelp()
{
    var height = 1
    d3.select("#publishHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('publishHelpDiv.style.display="none"', 900)
        CurrentHelpDiv=null
}




