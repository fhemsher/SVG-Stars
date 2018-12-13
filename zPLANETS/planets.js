//---from stars---
var planetFramesLoaded=false
function openPlanet()
{
   if(planetFramesLoaded==false)
   {
      planetsFrame.src="../zPLANETS/Start/startPlanet.htm"
       planetFramesLoaded=true
       MySelectedStarName=parent.SelectedStarName

       
   }
 else
   {
       var cw=planetsFrame.contentWindow
      planetsFrameDiv.style.visibility="visible"
       var height=window.innerHeight
    var myDiv=d3.select("#planetsFrameDiv")
    myDiv.transition().duration(800).style("height",height+"px")

   }

}


