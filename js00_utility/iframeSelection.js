//---buttons at start.htm---
function openBegin()
{  rotationDiv.style.visibility="visible"
  zoomLevelDiv.style.visibility="hidden"
 drawingNameDiv.style.visibility="hidden"
 drawingDescriptionDiv.style.visibility = "hidden"
 zoomPresetDiv.style.visibility = "hidden"
     measureDiv.style.visibility="hidden"
saveDrawingButtonDiv.style.visibility="hidden"
    celestialContainerDiv.style.width="60%"
    celestialContainerDiv.style.height="60%"
    celestialContainerDiv.style.left="35%"
    celestialContainerDiv.style.top="15%"
    //starContainerDiv.style.display="none"
    celestialContainerDiv.style.display="block"
    CentroidCelestial.style("display","none")
    StopCelestialZoom=false
    BeginStar=true
    loadStars=false
  if(SavedOwnerEmail)  //---saved on Visiting---
        oEMAIL=SavedOwnerEmail
    SavedOwnerEmail=null

   starContainerDiv.style.display="none"

 if(beginLoad==true)
   {
       var cw=beginCw
       cw.hostStarSelect.selectedIndex=0
       cw.hostStarSelect.disabled=false
          cw.showExoDataButton.disabled=true
   }

    stopCursorLoc()
		openIframe("Begin","begin",40)
        openBeginButton.style.borderStyle="inset"


     topNavDiv.style.display="none"
      planetOpenButton.style.visibility="hidden"


}

function closeBegin()
{
    var cw=beginCw
    cw.previewHostStarButton.disabled=true
    cw.previewHostStarButton.innerHTML="Adjust Universe"
    rotationDiv.style.visibility="hidden"
    if(FOLDER)
    {
  zoomLevelDiv.style.visibility="visible"
 drawingNameDiv.style.visibility="visible"
 drawingDescriptionDiv.style.visibility = "visible"
 zoomPresetDiv.style.visibility = "visible"
 if(Visitor==false)
     measureDiv.style.visibility="visible"
     if(PrevZoomInteger>400)
     saveDrawingButtonDiv.style.visibility="visible"

    celestialContainerDiv.style.width="60%"
    celestialContainerDiv.style.height="60%"
    celestialContainerDiv.style.left="35%"
    celestialContainerDiv.style.top="15%"
    starContainerDiv.style.display="block"

    CentroidCelestial.style("display","block")
    StopCelestialZoom=true
    BeginStar=false
    loadStars=true

     planetOpenButton.style.visibility="visible"


    //stopCursorLoc()

           // returnMyStar();
    }

     if(PreviewHost==true)
        resetPreviewHostStar()
   BeginStar=false
     celestialContainerDiv.style.display="none"
     topNavDiv.style.display="block"
    closeIframe("begin")
    navButtonViz()
}

function openLogin()
{
		openIframe("Login","login",40)
        openLoginButton.style.borderStyle="inset"
		if(document.getElementById("myDrawingNameSpan"))
       		document.getElementById("myDrawingNameSpan").innerText="Visit A Star"
}



function openAbout()
{
		openIframe("About","about",40)
       // openHelpButton.style.borderStyle="inset"


}
function openHelpMobile()
{
		openIframe("Mobile","helpMobile",20)
        openHelpMobileButton.style.borderStyle="inset"


}

function openAddIconDraw()
{          if(addElemIconLoad==true)
       	startIconDraw()
		openIframe("AddElem","addElemIcon",0)

      openAddIconButton.style.borderStyle="inset"
}

function openAddSymbolDraw()
{          if(addElemSymbolLoad==true)
       	startSymbolDraw()
		openIframe("AddElem","addElemSymbol",0)

      openAddSymbolButton.style.borderStyle="inset"
}


function openAddCircleDraw()
{
        if(addElemCircleLoad==true)
        startCircleDraw()

		openIframe("AddElem","addElemCircle",20)

      openAddCircleButton.style.borderStyle="inset"
}

function openAddEllipseDraw()
{
        if(addElemEllipseLoad==true)
        startEllipseDraw()

		openIframe("AddElem","addElemEllipse",20)

      openAddEllipseButton.style.borderStyle="inset"
}
function openAddRectDraw()
{         if(addElemRectLoad==true)
       	startRectDraw()

		openIframe("AddElem","addElemRect",20)


      openAddRectButton.style.borderStyle="inset"
}

function openAddPolygonDraw()
{         if(addElemPolygonLoad==true)
       	startPolygonDraw()

		openIframe("AddElem","addElemPolygon",20)


      openAddPolygonButton.style.borderStyle="inset"
}




function openAddImageDraw()
{
		if(addElemImageLoad==true)
			startImageDraw()
		openIframe("AddElem","addElemImage",20)

        openAddImageButton.style.borderStyle="inset"

}
function openAddTextDraw()
{       	if(addElemTextLoad==true)
		   	startTextDraw()
		openIframe("AddElem","addElemText",20)

       openAddTextButton.style.borderStyle="inset"


}
function openAddPathDraw()
{

	     if(addElemPathLoad==false)
			openIframe("AddElem","addElemPath",20)
          else
		  {
           	openIframe("AddElem","addElemPath",20)
               startPathDraw()
		  }

		         openAddPathButton.style.borderStyle="inset"


}



function openReferrer()
{

		openIframe("Referrer","referrer",40)

       openReferrerButton.style.borderStyle="inset"
}









var AddElemOpen=false //--true if any addElem Frame is viz=true
function isAddElemOpen() //---called from iframeSelection.js---
{
	AddElemOpen=false
		 if(addElemIconViz==true)AddElemOpen=true;
		 if(addElemSymbolViz==true)AddElemOpen=true;
		 if(addElemImageViz==true)AddElemOpen=true;
		 if(addElemTextViz==true)AddElemOpen=true;
		 if(addElemCircleViz==true)AddElemOpen=true;
		 if(addElemEllipseViz==true)AddElemOpen=true;
		 if(addElemRectViz==true)AddElemOpen=true;
		 if(addElemPolygonViz==true)AddElemOpen=true;

}

function openIframe(Dir,name,left)
{
      svgBgImg.style.display="none"
closeAllFrames()
if(Mobile==false)
 topNavDiv.style.display="none"

	if(Dir.indexOf("DrawingLibrary")==-1)
        if(Dir!="StarData")closeAllFrames()

        var top=20

	var fName=eval(name+"Load")
      	var myFrame=document.getElementById(name+'Frame')
		var myDiv=d3.select("#"+name+"FrameDiv")
	if(fName==false)
	{
		eval(name+"Load=true")
		myFrame.src ="../"+ Dir+"/"+name+".htm";
		eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")
	}
    else
    {

		 var height=myFrame.scrollHeight


        if(name!="celestialSearch"&&name!="constellation" )
	     if(height>550)
		{
	       myDiv.style("overflow-y","auto")
	       height=550
		}

        if(name=="starData")
	       height=height+60


   }

   if(name=="about")
   {

        top=40

   }

         myFrame.style.overflow="hidden"


	      myDiv.transition().duration(800).style("height",height+"px")

	eval(name+"Viz=true")
	if(Dir!="StarData")
        myDiv.style("visibility","visible")
	myDiv.style("left",left+"px")
	myDiv.style("top",top+"px")

   if(name=="addElemRect")
   startRectDraw()
   if(name=="addElemCircle")
   startCircleDraw()
   if(name=="addElemIcon")
   startIconDraw()
   if(name=="addElemSymbol")
   startSymbolDraw()
   if(name=="addElemText")
   startTextDraw()
  
    if(Mobile==false)
    topNavDiv.style.display="none"
    planetOpenButton.style.visibility="hidden"
}

//---fired from iframe onload----
function sizeFrame(name,width,height)
{
	var myFrame=document.getElementById(name+'Frame')
	var myDiv=d3.select("#"+name+"FrameDiv")

	myFrame.style.width=width+"px"
    	myFrame.style.height=height+"px"

	if(height>550)
	{
		myDiv.style("overflow-y","auto")
		height=550
	}

	myDiv.style("width",width+"px")
	myDiv.transition().duration(800).style("height",height+"px")

}
//---X button in iframe---
function closeIframe(name)
{

  /*
     if(document.getElementById("myDrawingNameSpan")&&hiddenDrawingNameValue.value)
       document.getElementById("myDrawingNameSpan").innerHTML=hiddenDrawingNameValue.value+" ("+hiddenConValue.value+")"
else if(document.getElementById("myDrawingNameSpan"))
  myDrawingNameSpan.innerHTML="Star Drawing"
 */

//if(name!="emailIndexAdmin"  &&  CloneBounds)
   //	domSVG.removeChild(CloneBounds)

  openVisitButton.style.borderStyle=""

 if(Mobile==false)
 {
    planetOpenButton.style.visibility="visible"
 openAddIconButton.style.borderStyle=""
 openAddSymbolButton.style.borderStyle=""
 openAddCircleButton.style.borderStyle=""
 openAddEllipseButton.style.borderStyle=""
 openAddRectButton.style.borderStyle=""
 openAddPolygonButton.style.borderStyle=""
 openAddImageButton.style.borderStyle=""
 openAddTextButton.style.borderStyle=""
 openAddPathButton.style.borderStyle=""
 openVisitButton.style.borderStyle=""
 openOwnerDrawingsButton.style.borderStyle=""
 openReferrerButton.style.borderStyle=""
 openBeginButton.style.borderStyle=""
     topNavDiv.style.display=""

 }

	var myDiv=d3.select("#"+name+"FrameDiv")
	myDiv.transition().style("height",1+"px")
	.each("end",function(){
		myDiv.style("visibility","hidden")
	})
	eval(name+"Viz=false")






}

//---Only one frame visable: fired when another  frame is chosen
function closeAllFrames()
{   disableMeasure()
	if(Mobile==false)
	{
     closeCurrentHelp()
    topNavDiv.style.display="block"
    planetOpenButton.style.visibility="visible"

	 openAddIconButton.style.borderStyle=""
	 openAddSymbolButton.style.borderStyle=""
	 openAddCircleButton.style.borderStyle=""
    openAddEllipseButton.style.borderStyle=""
	 openAddRectButton.style.borderStyle=""
	 openAddPolygonButton.style.borderStyle=""
	 openAddImageButton.style.borderStyle=""
	 openAddTextButton.style.borderStyle=""
	 openAddPathButton.style.borderStyle=""
	 openVisitButton.style.borderStyle=""
     openOwnerDrawingsButton.style.borderStyle=""

	 openReferrerButton.style.borderStyle=""

 openBeginButton.style.borderStyle=""
// openStarDataButton.style.borderStyle=""
  }
// openLoginButton.style.borderStyle=""
 	for(var k=0;k<iframeNameArray.length;k++)
   {
      	var name=iframeNameArray[k]
         var viz=eval(name+"Viz")
   	  if(viz==true)
	  {
           if(name=="addElemIcon")
			 	parent.closeDrawIcon()
           if(name=="addElemSymbol")
			 	parent.closeDrawSymbol()
           if(name=="addElemText")
			   closeDrawText()
           if(name=="addElemImage")
			   closeDrawImage()
           if(name=="addElemCircle")
			   closeDrawCircle()
           if(name=="addElemEllipse")
			   closeDrawEllipse()
           if(name=="addElemRect")
			   closeDrawRect()
           if(name=="addElemPolygon")
			   closeDrawPolygon()

			   if(name=="addElemPath")
			   {
                  closeDrawPath()

			   }


         	var myDiv=d3.select("#"+name+"FrameDiv")
			myDiv.style("height",1+"px")
			myDiv.style("visibility","hidden")
			myDiv.style("overflow","hidden")
        //---reset on all add elements--
      // DrawX.attr("transform", null)

	  }
      eval(name+"Viz=false")
   }


}

//----button---
function visitDrawingLibrary(Dir,name,index)
{

   if(visitDrawingLibraryLoad==true)
    writeDrawingLibrary()
	var indr=""
	if(!index)
	{
       indr="../"

	}
       openVisitButton.style.borderStyle="inset"


	var top=20

	var fName=eval(name+"Load")
      	var myFrame=document.getElementById(name+'Frame')
		var myDiv=d3.select("#"+name+"FrameDiv")
	if(fName==false)
	{
		eval(name+"Load=true")
		myFrame.src =indr+Dir+"/"+name+".htm";
		eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")

	}
	else
	{
		 var height=myFrame.scrollHeight
	     if(height>560)
		{
	       myDiv.style("overflow-y","auto")
	       height=560
		}
         myFrame.style.overflow=""
	      myDiv.transition().duration(800).style("height",height+"px")
	}
	eval(name+"Viz=true")
	myDiv.style("visibility","visible")
	myDiv.style("left","20px")
	myDiv.style("top",top+"px")
}

function visitDrawingLibraryClose(name)
{
	var myDiv=d3.select("#"+name+"FrameDiv")
	myDiv.transition().style("height",1+"px")
	.each("end",function(){
		myDiv.style("visibility","hidden")
	})
	eval(name+"Viz=false")

     openVisitButton.style.borderStyle=""

}
//----button---
function visitThisDrawingLibraryOpenIndex(Dir,name)
{

	var top=80
	var fName=eval(name+"Load")
      	var myFrame=document.getElementById(name+'Frame')
		var myDiv=d3.select("#"+name+"FrameDiv")
	if(fName==false)
	{
		eval(name+"Load=true")
		myFrame.src =Dir+"/"+name+".htm";
		eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")

	}
	else
	{
		 var height=myFrame.scrollHeight
	     if(height>560)
		{
	       myDiv.style("overflow-y","auto")
	       height=560
		}
         myFrame.style.overflow=""
	      myDiv.transition().duration(800).style("height",height+"px")
	}
	eval(name+"Viz=true")
	myDiv.style("visibility","visible")
	myDiv.style("left","20px")
	myDiv.style("top",top+"px")
}


function visitThisDrawingLibraryClose(name)
{
	var myDiv=d3.select("#"+name+"FrameDiv")
	myDiv.transition().style("height",1+"px")
	.each("end",function(){
		myDiv.style("visibility","hidden")
	})
	eval(name+"Viz=false")

     openVisitButton.style.borderStyle=""

}



 var addElemIconLoad=false
 var addElemSymbolLoad=false
 var addElemCircleLoad=false
 var addElemEllipseLoad=false
 var addElemRectLoad=false
 var addElemPolygonLoad=false
 var addElemImageLoad=false
 var addElemTextLoad=false
 var addElemPathLoad=false
 var addElemPathEditLoad=false
 var emailOwnerLoad=false
 var emailElemCreatorLoad=false
 var loginLoad=false
 var aboutLoad=false
 var emailAdminLoad=false

 var referrerLoad=false
 var visitDrawingLibraryLoad=false
 var ownerDrawingsLoad=false
 var visitThisDrawingLibraryLoad=false
  var inviteFriendLoad=false
  var beginLoad=false
  var constellationLoad=false
  var constellationDataLoad=false
  var starDataLoad=false
  var emailAddStarCreatorLoad=false
  var exoplanetViewLoad=false
  var exoplanetAddLoad=false
  var exoplanetUpdateLoad=false
  var exoplanetCurrentLoad=false
  var exoplanetLoad=false

 var beginViz=false

 var addElemIconViz=false
 var addElemSymbolViz=false
 var addElemCircleViz=false
 var addElemEllipseViz=false
 var addElemRectViz=false
 var addElemPolygonViz=false
 var addElemImageViz=false
 var addElemTextViz=false
 var addElemPathViz=false
 var addElemPathEditViz=false
 var emailOwnerViz=false
 var emailAdminViz=false
 var emailElemCreatorViz=false
 var loginViz=false
 var aboutViz=false
 var referrerViz=false
 var ownerDrawingsViz=false
 var visitDrawingLibraryViz=false
 var visitThisDrawingLibraryViz=false
   var inviteFriendViz=false
   var beginViz=false
   var constellationViz=false
   var constellationDataViz=false
   var starDataViz=false
  var emailAddStarCreatorViz=false
  var exoplanetViewViz=false
  var exoplanetAddViz=false
  var exoplanetUpdateViz=false
  var exoplanetCurrentViz=false
  var exoplanetViz=false



 var addElemIconCw
 var addElemSymbolCw
 var addElemCircleCw
 var addElemEllipseCw
 var addElemRectCw
 var addElemPolygonCw
 var addElemImageCw
 var addElemTextCw
 var addElemPathCw
  var addElemPathEditCw
 var emailOwnerCw
 var emailAdminCw
 var emailElemCreatorCw
 var loginCw
 var aboutCw
 var referrerCw
 var ownerDrawingsCw
 var visitDrawingLibraryCw
 var visitThisDrawingLibraryCw
   var inviteFriendCw
   var beginCw
   var constellationCw
   var constellationDataCw
   var starDataCw
  var emailAddStarCreatorCw
  var exoplanetViewCw
  var exoplanetAddCw
  var exoplanetUpdateCw
  var exoplanetCurrentCw
  var exoplanetCw




//---each iframe---

var iframeNameArray=[]
iframeNameArray[0]='addElemEllipse'
 iframeNameArray[1]='addElemIcon'
iframeNameArray[2]='addElemImage'
iframeNameArray[3]='addElemText'
iframeNameArray[4]='addElemPolygon'
iframeNameArray[5]='emailOwner'
iframeNameArray[6]='emailElemCreator'
iframeNameArray[7]='login'
iframeNameArray[8]='begin'
iframeNameArray[9]='about'
iframeNameArray[10]='emailAdmin'
iframeNameArray[11]='addElemPath'
iframeNameArray[12]='addElemPathEdit'
iframeNameArray[13]='ownerDrawings'
iframeNameArray[14]='exoplanet'
iframeNameArray[15]='referrer'
iframeNameArray[16]='visitDrawingLibrary'
iframeNameArray[17]='addElemRect'

iframeNameArray[18]='addElemCircle'
iframeNameArray[19]='inviteFriend'
iframeNameArray[20]='constellationData'
iframeNameArray[21]='starData'
iframeNameArray[22]='addElemEllipse'
 iframeNameArray[23]='addElemSymbol'










