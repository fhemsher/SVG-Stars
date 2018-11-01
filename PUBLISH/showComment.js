

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
            {


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
		if(evt.target.nodeName=="text"||evt.target.nodeName=="image"||evt.target.nodeName=="polygon"||evt.target.nodeName=="path"||evt.target.nodeName=="circle"||evt.target.nodeName=="rect"||evt.target.nodeName=="ellipse")
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