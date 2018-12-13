
var StarScale=180 //---mollweide proj---
var StarProjection
var StarMap
var StarZoom
var StarView
//---single star----
var PrimaryStarID
var PrimaryStarCoords=[]
var PrimaryStarBoundryCoords=[]
var PrimaryStarBoundry
var StarConBoundry
var PrimaryStarRadius

var CelestialWidth
var CelestialHeight
var StarSVG
var ConStarG
var MyStarG
var StarG
var PrimaryStarZone
var PrimaryStarCorona
var PrimaryStarSurface
var PrimaryStarX
var AddPathG
var AddElemG
var SymbolG
var Mobile=true

    CelestialWidth=window.innerWidth
    CelestialHeight = (CelestialWidth / 2)
    StarSVG = d3.select("#starMobileDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id","starSVG")
    .attr("fill","none")
    .attr("overflow","hidden")
    .attr("viewBox","0 0 "+CelestialWidth+" "+CelestialHeight)

   var defs=StarSVG.append("defs")
    .append("marker")
    .attr("id","endArrow")
    .attr("viewBox","0 0 8000 8000")
    .attr("refX","250")
    .attr("refY","150")
    .attr("markerUnits","strokeWidth")
    .attr("markerWidth","300")
    .attr("markerHeight","300")
    .attr("orient","auto")
    .attr("fill","white")
    .attr("stroke-linejoin","bevel")
    .append("path")
    .attr("d","M2 59,293 148,1 243,121 151,Z")
    .attr("stroke","RGB(0,0,0)")
    defs.append("marker")
    .attr("id","cloneArrow")
    .attr("viewBox","0 0 8000 8000")
    .attr("refX","250")
    .attr("refY","150")
    .attr("markerUnits","strokeWidth")
    .attr("markerWidth","300")
    .attr("markerHeight","300")
    .attr("orient","auto")
    .attr("fill","RGB(0,0,0)")
    .attr("stroke-linejoin","bevel")
    .append("path")
    .attr("d","M2 59,293 148,1 243,121 151,Z")
    .attr("stroke","RGB(0,0,0)")

    //--holds all path end arrows---
    var arrowDefs=StarSVG.append("defs")
    .attr("id","arrowDefs")

    var filter = StarSVG.append('filter').attr('id', 'lightingMobile');

    filter.append('feDiffuseLighting')
    .attr('in', 'SourceGraphic')
    .attr('result', 'light')
    .attr('lighting-color', 'blue')
    .append('fePointLight')
    .attr('x', 500)
    .attr('y', 300)
    .attr('z', 40);

    filter.append('feComposite')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'light')
    .attr('operator', 'arithmetic')
    .attr('k1', '1')
    .attr('k2', '0')
    .attr('k3', '0')
    .attr('k4', '0');

   StarSVG.append("rect")
    .attr("id","blackboardMobile")
    .attr("fill","#191970")
    .attr("filter","url(#lightingMobile)")
    .attr("x","-10%")
    .attr("y","-10%")
    .attr("width","120%")
    .attr("height","120%")
    .style("display","block")


  StarConBoundry=StarSVG.append("path")
    .attr("id","starConBoundry")
    .attr("class", null)
    .attr("fill", "none")
    .attr("stroke","#cc0")
    .attr("stroke-opacity",".8")
    .attr("stroke-width","2px")
    .attr("stroke-dasharray","6 3")
    .style("dislpay", "none")
    ConStarG=StarSVG.append("g")

       MyStarG=StarSVG.append("g")
    .attr("id","myStarG")
       StarG=StarSVG.append("g")
    .attr("id","starG")

    PrimaryStarZone=StarG.append("path")
    .attr("id","primaryStarZone")
    .attr("fill","#9966CC")
    .attr("stroke","none")
    .attr("onmouseover","showStarName(evt)")
    .attr("onmouseout","hideStarName(evt)")

    PrimaryStarCorona=StarG.append("path")
    .attr("id","primaryStarCorona")
    .attr("fill","gold")
    .attr("stroke","none")
     .attr("onmouseover","showStarName(evt)")
      .attr("onmouseout","hideStarName(evt)")

//---visual locator for center star--
    PrimaryStarX=StarSVG.append("g")
    .attr("id","primaryStarX")

     PrimaryStarX.append("line") //---vert---
	.attr("stroke","red")
	.attr("stroke-width",".5")
	.attr("pointer-events","none")
	.attr("x1","0")
	.attr("y1","-50%")
	.attr("x2","0")
	.attr("y2","50%")

   PrimaryStarX.append("line") //---horiz---
	.attr("stroke","red")
	.attr("stroke-width",".25")
	.attr("pointer-events","none")
	.attr("x1","-50%")
	.attr("y1","0")
	.attr("x2","50%")
	.attr("y2","0")

    PrimaryStarSurface=StarG.append("path")
    .attr("id","primaryStarSurface")
     .attr("fill","orangered")
     .attr("stroke","none")
     .attr("onmouseover","showStarName(evt)")
   .attr("onmouseout","hideStarName(evt)")


	AddElemG = StarG.append("g");
 AddElemG.attr("text-rendering","geometricPrecision" )
 AddElemG.attr("id","domAddElemG")
    AddPathG = StarG.append("g");
	AddPathG.attr("id","domAddPathG")
    SymbolG = StarG.append("g");
	SymbolG.attr("id","symbolG")
   SymbolG.attr("shape-rendering","geometricPrecision" )
       	//--svg elem used as temp container to find native center of tranformed elem for active elem roatation---
	Wrapper=StarG.append("svg")
  	.style("display","block")
	.attr("width","100%")
	.attr("height","100%")
	.attr("overflow","visible")
	.attr("id","domWrapper")



//---operating vars---

var Login=false
var XMLloginArray=[] //---places + non-owner visitors
var XMLActiveLoginArray=[] //---This specific user owned+visits
var XMLBounds
var Admin=false
var oNAME
var oEMAIL
var uEMAIL
var PlaceNAME
var PlaceDescription
var UserOwnerEmail //--my community select:login.htm
var SendOwnerEmail //--my community select:login.htm
var ID
var FOLDER


var temp="zyKi33753Yam181941DaNAPAIgeLj"
var Referrer=false
var ReferrerFolder=null
var XMLBounds //---filled via login---
var XMLCommunitiesDoc //---filled via getCommunities()---
var XMLUsersDoc //---filled via getCommunities()---
var Visitor=false
var NewUser=false
var CookieOK=true  //---check user computer public?---
var ActiveFolderArray=[] //--validate cookie folder and remove if folder was removed---
 var NS="http://www.w3.org/2000/svg"
 var MyStars=false    //----true if login loaded star--my star login----
var StopStarZoom=false
 //---comment---
 var CirclePackLoad=false
 var ConStarSize=false
//---onload---
function initMapMobile()
{

   getCommunities() //---returns XMLCommunitiesdoc: see joinCommunity.js---
   writeMobileCommunities()
   var height=visitMobileCommunityDiv.scrollHeight
   if(height>350)
	{
		visitMobileCommunityDiv.style.overflowY="auto"
		height=350
	}

    var myDiv=d3.select("#visitMobileCommunityDiv")
	myDiv.transition().duration(800).style("height",height+"px")
     visitMobileCommunityDiv.style.visibility="visible"

}


function sizeMobileVisit(height)
{


		var myDiv=d3.select("#visitMobileCommunityDiv")
   myDiv.style("visibility","visible")
	myFrame.style.width="97%"
	myFrame.style.height=height+"px"

	if(height>350)
	{
		myDiv.style("overflow-y","auto")
		height=350
	}

	myDiv.transition().duration(800).style("height",height+"px")
}



//---negate events at stars---
function scrollMyConStarDataTo(evt)
{
return false
}

function addConStar(evt)
{
  return false

}