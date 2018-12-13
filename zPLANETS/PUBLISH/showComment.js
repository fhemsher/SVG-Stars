

var ClientX
var ClientY

var SVGx
var SVGy
var LatLng

var StarFill
function showStarName(evt)
{
       ClientX = evt.clientX;
      ClientY = evt.clientY;
       var target=evt.target
       if(target.getAttribute("name"))
       {

         var comment="<center><b>"+target.getAttribute("name")+"</b></center>"

         commentDiv.style.backgroundColor="linen"
             commentDiv.innerHTML=comment
    	     commentDiv.style.left=ClientX+10+"px"
    	     commentDiv.style.top=ClientY+20+"px"
              commentDiv.style.visibility="visible"
       }

          /*
              if(ConStarsLoaded==false&& ConStarSize==true&&(celestialSearchViz==false))
             {


                 name+="<br>"
                 if(ConStarSizeType=="mag") name+="Magnitude = "
                 else if(ConStarSizeType=="absmag") name+="Absolute Magnitude = "
                 else if(ConStarSizeType=="lum") name+="Luminosity = "
                 else if(ConStarSizeType=="ci") name+="Color Index = "
                 else if(ConStarSizeType=="dist") name+="Distance = "
                 else if(ConStarSizeType=="rv") name+="Radial Velocity = "
                 else if(ConStarSizeType=="radius") name+="Radius = "
                 else if(ConStarSizeType=="mass") name+="Mass = "
                 else if(ConStarSizeType=="temp") name+="Temperature = "

                name+=target.getAttribute(ConStarSizeType)
             }

         */


           var fill=target.getAttribute("fill")

  if(target.getAttribute("id")=="primaryStarSurface"&& (PrevZoomInteger<400))
            showSurface=false
       else
           showSurface=true




       if(target.getAttribute("id")=="primaryStarCorona" &&  (PrevZoomInteger>290 || PrevZoomInteger<350) )
            showCorona = true
         else
            showCorona=false

       if(PrevZoomInteger>200 && target.getAttribute("id")=="primaryStarZone")
            showPrimary=false
       else
            showPrimary=true

        if(showSurface==true&&ShowDistance == false )
        {
            if(target.getAttribute("id")=="primaryStarSurface")
            {   /*
            <HOST id="hostStar1538405450411"
            Name="16 Cyg B" NameHD="HD 186427" NameHIP="HIP 96901" Constellation="Cyg"
            Type="G2.5 V"
            Mass="1.01"
            Radius="0.98"
            Teff="5766.0"
            Luminosity="0.952446" FeH="0.080" Age="8.000" ApparMag="6.2"
            Distance="21.41" RA="19.6975" DEC="50.5175" MagfromPlanet="-26.2"
            SizefromPlanet="0.4289" No_Planets="1" No_PlanetsHZ="0" HabZoneMin="0.733"
            HabZoneMax="1.727" HabCat="0"/>
                 */



                 var name=HostStarDoc.getAttribute("Name")



                var comment="<center><b>"+name+"</b><br>(double-click star to view its data)</center>"





         }



        }



     if((PrevZoomInteger>200 && target.getAttribute("id")=="primaryStarZone")||(target.getAttribute("id")=="primaryStarCorona" &&  PrevZoomInteger>310))
       commentDiv.style.visibility="hidden"
       else if(StopStarZoom==false)
       {
            commentDiv.style.backgroundColor=fill
            commentDiv.innerHTML=comment
            commentDiv.style.left=ClientX+10+"px"
            commentDiv.style.top=ClientY+20+"px"
            commentDiv.style.visibility="visible"
       }

}
function showVertexCoord(evt)
{
    ClientX = evt.clientX;
    ClientY = evt.clientY;
    var target=evt.target

    var coord=target.getAttribute("coord")
    commentDiv.innerHTML=coord
    commentDiv.style.left=ClientX+10+"px"
    commentDiv.style.top=ClientY+20+"px"

    commentDiv.style.visibility="visible"
}
function showSunData(evt)
{
       ClientX = evt.clientX;
        ClientY = evt.clientY;
         	var target=evt.target

	  var myData=target.getAttribute("myData")
	     commentDiv.innerHTML="Sun @ "+myData+"<br>"+new Date()
	     commentDiv.style.left=ClientX+10+"px"
	     commentDiv.style.top=ClientY+20+"px"

	     commentDiv.style.visibility="visible"
}

function showCentroidData(evt)
{
    ClientX = evt.clientX;
    ClientY = evt.clientY;
    var target=evt.target

    var myData=target.getAttribute("myData")
    commentDiv.innerHTML="Centroid @ "+myData
    commentDiv.style.left=ClientX+10+"px"
    commentDiv.style.top=ClientY+20+"px"
    commentDiv.style.visibility="visible"
}


function showEarthName(evt)
{
       ClientX = evt.clientX;
        ClientY = evt.clientY;
         	var target=evt.target

	  var name=target.getAttribute("name")



	     commentDiv.innerHTML=name




	     commentDiv.style.left=ClientX+10+"px"
	     commentDiv.style.top=ClientY+20+"px"

	     commentDiv.style.visibility="visible"





}



function hideStarName(evt)
{         if(ShowDistance == false)
          {
              commentDiv.style.backgroundColor="linen"
              commentDiv.style.visibility="hidden"
          }
}


function showSymbolComment(evt)
{

	if(Mobile==false)
	{
		if((evt.target.parentNode.id.indexOf("symbol")==-1)&&(evt.target.nodeName=="text"||evt.target.nodeName=="image"||evt.target.nodeName=="polygon"||evt.target.nodeName=="path"||evt.target.nodeName=="circle"||evt.target.nodeName=="rect"||evt.target.nodeName=="ellipse") )
         	var target=evt.target
        else
			var target=evt.target.parentNode



	  var comment=target.getAttribute("comment")
	  if(comment.indexOf("(optional)")==-1)
	  {

	     commentDiv.innerHTML=xml2txt(comment)



	      commentDiv.style.left=evt.clientX+10+"px"
	     commentDiv.style.top=evt.clientY+30+"px"


	     commentDiv.style.visibility="visible"

	  }

	}

}

function hideSymbolComment(evt)
{       /*
		if(evt.target.nodeName=="text"||evt.target.nodeName=="image"||evt.target.nodeName=="path")
         	var target=evt.target
        else
			var target=evt.target.parentNode
        */
   		commentDiv.style.visibility="hidden"
        commentDiv.style.backgroundColor="linen"
}


 var PrevStarFill
function showStarComment(evt)
{

	if(Mobile==false)
	{
         	var target=evt.target

           ProfileStar=target



	  var comment=target.getAttribute("comment")
      if(comment)
      {
               PrevStarFill=target.getAttribute("fill")
       target.setAttribute("fill","crimson")

	     commentDiv.innerHTML=xml2txt(comment)




	     commentDiv.style.left=SVGx+20+"px"
	     commentDiv.style.top=SVGy+30+"px"

	     commentDiv.style.visibility="visible"
        var transform=d3.transform(target.getAttribute("transform"))
        var transX=transform.translate[0]
        var transY=transform.translate[1]
        //hiliteCircle.setAttribute("stroke",PrevStarFill)
        //hiliteCircle.setAttribute("stroke-width",4/PrevScale)
        //hiliteCircle.setAttribute("r",20/PrevScale)
        //hiliteCircle.setAttribute("cx",20/PrevScale)
        //hiliteCircle.setAttribute("r",20/PrevScale)
               //hiliteCircle.setAttribute("transform","translate("+transX+" "+transY+")scale("+(1/PrevScale)+")")


        //hiliteCircle.style.visibility="visible"
       }


	}

}

function hideStarComment(evt)
{
			var target=evt.target
           target.setAttribute("fill",PrevStarFill)
   		//commentDiv.style.visibility="hidden"
          //hiliteCircle.style.visibility="hidden"
}

function showPlotComment(evt)
{
      ClientX = evt.clientX;
      ClientY = evt.clientY;
       var target=evt.target.parentNode
       var comment=target.getAttribute("comment")
       var ob=target.getAttribute("ob")
       var pointNum=target.getAttribute("pointNum")
       var xValue=target.getAttribute("xValue")


       commentDiv.innerHTML="(#"+pointNum+") <b>"+xValue+"</b><br>"+ob+"<br>"+comment
       if(comment.length>40)
       commentDiv.style.width="200px"
	     commentDiv.style.left=ClientX+10+"px"
	     commentDiv.style.top=ClientY+20+"px"

	     commentDiv.style.visibility="visible"


}

function hidePlotComment()
{
    commentDiv.style.visibility="hidden"
     commentDiv.style.width=""

}


 //---mouse over planet---
function showExoplanet(evt)
{
    var planet=evt.target
    var name=planet.getAttribute("name")
          ClientX = evt.clientX;
      ClientY = evt.clientY;
       commentDiv.style.width="100px"
	     commentDiv.style.left=ClientX+10+"px"
	     commentDiv.style.top=ClientY+20+"px"
         commentDiv.style.visibility="visible"

        commentDiv.innerHTML=name

}
//---mouse out planet---
function hideExoplanet(evt)
{

  commentDiv.style.visibility="hidden"
     commentDiv.style.width=""


}