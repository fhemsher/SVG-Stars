

//==================Planet Map=============================

var PlanetSVG

var PlanetG
var MyPlanetG

var PlanetScale  //--- init scale proj---
var PlanetProjection
var PlanetMap
var PlanetZoom
var StopPlanetZoom = false
var PlanetView


//---add elems===
var AddElemG //---all added elems container---
var AddPathG //---all added elems container---
var PlanetViewG //---exoplanet circles & text container---
var CoverRect
var LatLngX
var ActiveElemG
var Wrapper //---svg wrapper---
var DrawX
var DragDot //---used for circles/rects---
var DistancePath//---measure distance---
var DistanceDot//---measure distance---

var ImgDragArrow
var PlanetViewWidth
var PlanetViewHeight

//---called via initMap---
function initPlanetMap()
{
    PlanetViewHeight = window.innerWidth
    PlanetViewWidth  = (PlanetViewHeight / 2)
    PlanetSVG = d3.select("#planetDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id", "planetSVG")
    .attr("fill", "none")
    .attr("viewBox", "0 0 "+PlanetViewWidth+" "+PlanetViewHeight)

    var defs = PlanetSVG.append("defs")
    .append("marker")
    .attr("id", "endArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "white")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")
    defs.append("marker")
    .attr("id", "cloneArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "RGB(0,0,0)")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")

    var defs = PlanetSVG.append("defs")
    defs.append("marker")
    .attr("id", "distanceArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "violet")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "violet")

    //--holds all path end arrows---
    var arrowDefs = PlanetSVG.append("defs")
    .attr("id", "arrowDefs")



   //---drop shadow planet---
    var defsShadow=PlanetSVG.append("defs")
    .attr("id","defsShadow")
    var filter = defsShadow.append("filter")
    .attr("id", "drop-shadow-planet")
    .attr("height", "150%")
    .attr("width", "150%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 15)
    .attr("result", "blur");
    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 20)
    .attr("dy", 20)
    .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
 var filter = defsShadow.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%")
    .attr("width", "150%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");
    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


   PlanetG = PlanetSVG.append("g")
    .attr("id", "planetG")
        .attr("shape-rendering","geometricPrecision")


    var defs = PlanetSVG.append("defs")
    var radGrad = defs.append("radialGradient")
    .attr("id", "surfaceFill")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%")
    radGrad.append("stop")
    .attr("stop-color", "maroon")
    .attr("offset", "0%")
    radGrad.append("stop")
    .attr("stop-color", "crimson")
    .attr("offset", "60%")
    radGrad.append("stop")
    .attr("stop-color", "darkorange")
    .attr("offset", "100%")

    var defs = PlanetSVG.append("defs")
    var surfacePatt = defs.append("pattern")
    .attr("id", "surfaceGraticule")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../About/Images/graticuleRework.svg")



    PlanetViewG = PlanetSVG.append("g")
    .attr("id", "planetViewG")
        .attr("shape-rendering","geometricPrecision")
    //--svg elem used as temp container to find native center of tranformed elem for active elem roatation---
    Wrapper = PlanetViewG.append("svg")
    .style("display", "block")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("overflow", "visible")
    .attr("id", "domWrapper")


    AddPathG = PlanetViewG.append("g");
    AddPathG.attr("id", "domAddPathG")

    AddElemG = PlanetViewG.append("g");
    AddElemG.attr("id", "domAddElemG")
    AddElemG.attr("text-rendering", "geometricPrecision")





    LatLngX = PlanetViewG.append("g")
    .style("display", "none")
    .attr("id", "latLngX")
    .attr("stroke", "violet")
    .attr("stroke-width", ".5")
    .attr("pointer-events", "none")
    LatLngX.append("circle")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "2")
    .attr("fill", "violet")
    LatLngX.append("line")
    .attr("x1", "0")
    .attr("y1", "-10%")
    .attr("x2", "0")
    .attr("y2", "10%")
    LatLngX.append("line")
    .attr("x1", "-5%")
    .attr("y1", "0")
    .attr("x2", "5%")
    .attr("y2", "0")

    //---text/icon/path drag protect---
    CoverRect = PlanetViewG.append("rect")
    .style("display", "none")
    .attr("id", "coverRect")
    .attr("pointer-events", "none")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")
    .attr("opacity", 0)

    //---holds on the single Active Elem under construction---
    //---top of svg ---
    ActiveElemG = PlanetViewG.append("g");
    ActiveElemG.attr("id", "domActiveElemG")

    DrawX = ActiveElemG.append("g")
    .style("display", "none")
    .attr("id", "domDrawX")
    .attr("stroke", "violet")
    .attr("stroke-width", "4")
    .attr("vector-effect","non-scaling-stroke")

    DrawX.append("circle")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "3")
    .attr("fill", "violet")
    DrawX.append("line")
    .attr("x1", "0")
    .attr("y1", "-5%")
    .attr("x2", "0")
    .attr("y2", "5%")
    DrawX.append("line")
    .attr("x1", "-10%")
    .attr("y1", "0")
    .attr("x2", "10%")
    .attr("y2", "0")

    DragDot = PlanetViewG.append("circle")
    .attr("id", "dragDot")
    .attr("class", "dragTargetObj")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "30")
    .attr("fill", "white")
    .attr("fill-opacity", ".5")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .style("visibility", "hidden")
    .style("cursor", "default")

    //---measure distange---
    DistanceDot = PlanetSVG.append("circle")
    .attr("id", "distanceDot")
    .attr("stroke", "none")
    .attr("fill", "violet")
    .attr("r", "20")
    .attr("pointer-events", "none")
    .style("display", "none")

    DistancePath = PlanetSVG.append("path")
    .attr("id", "distancePath")
    .attr("stroke", "violet")
    .attr("stroke-width", "4")
    .attr("pointer-events", "none")
    .attr("marker-end", "url(#distanceArrow)")
    .style("display", "none")
    .attr("vector-effect","non-scaling-stroke")
      ImgDragArrow=PlanetSVG.append("image")
    .attr("id","imgDragArrow")
    .attr("href","../Images/ImgDragArrow.png")
    .attr("class","dragTargetObj")
    .attr("width","100")
    .attr("height","100")
    .attr("x","-50")
    .attr("y","-50")
    .style("visibility", "hidden")
    .style("cursor", "nw-resize")

    var svgText=PlanetSVG.append("text")
    .attr("id","textSVG")
    .attr("cursor","default")
    .attr("text-anchor","middle")
    .attr("pointer-events","none")
    .attr("x","50%")
    .attr("y","50%")
    .attr("dy",".33em")
    .attr("font-size","350")
    .attr("font-family","times new roman")
    .attr("font-weight","bold")
    .attr("fill","red")
    .attr("stroke-width","5")
    .attr("stroke","black")
    .attr("opacity","1")
    .attr("filter","url(#drop-shadow)")
    .text("SVG")

}
//---operating vars---
var Login = false
var XMLloginArray =[] //---places + non-owner visitors
var XMLActiveLoginArray =[] //---This specific user owned+visits
var XMLBounds
var XMLDefaultBounds
var Admin = false
var oNAME
var oEMAIL
var DrawingName
var PersonalNAME
var DrawingDescription
var UserOwnerEmail //--my community select:login.htm
var SendOwnerEmail //--my community select:login.htm
var ID
var FOLDER
var VisitorReturnFolder=null
var RegisterOK = false
var ActiveElem = null

var temp = "zyKi33753Yam181941DaNAPAIgeLj"
var Referrer = false
var ReferrerFolder = null
var XMLBounds //---filled via login---
var XMLDrawingsDoc //---filled via getCommunities()---
var XMLUsersDoc //---filled via getCommunities()---
var Visitor = false
var NewUser = false
var CookieOK = true //---check user computer public?---
var ActiveFolderArray =[] //--validate cookie folder and remove if folder was removed---
var NS = "http://www.w3.org/2000/svg"
var MyPlanets = false //----true if login loaded star--my star login----
//---onload---
function initMap()
{

    $(document).ready(function()
        {
            $("*").dblclick(function(e)
                {
                    e.preventDefault();
                }
            );
        }
    );
    // removeFolderCookies()
    window.name = 'parentWindow'; //---required for add Path---
    document.body.style.width=window.innerWidth+"px"
    document.body.style.overflow="hidden"

    initPlanetMap()
    beginPlanetMap()

getDrawingLibrary() //---returns XMLDrawingLibraryDoc: see visitDrawingLibrary.js---




        var lastLoginMS = mostRecentCookie()

        //----validate folder is still available---
        FOLDER = null
        var cookieFolder = getCookie("_SVGPlanets_Folder@"+lastLoginMS)
        console.log(cookieFolder)

        if(cookieFolder)
        {
          openOwnerDrawingsButton.disabled=false
          openOwnerDrawingsButton.style.opacity=1
          var drawings = XMLDrawingLibraryDoc.childNodes
            for(var k = 0; k<drawings.length; k++)
            {
                var myDrawing = drawings.item(k)

                var folder = myDrawing.getAttribute("folder")

                if(folder==cookieFolder)
                {
                    DrawingNAME = xml2txt(myDrawing.getAttribute("name"))
                  DrawingDescription = xml2txt(myDrawing.getAttribute("description"))
                    oNAME = xml2txt(myDrawing.getAttribute("ownerName"))
                    oEMAIL = myDrawing.getAttribute("email")
                    SavedOwnerEmail=oEMAIL
                    var ID = myDrawing.getAttribute("id")
                    FOLDER=folder
                  getArrowDefs()
                   loadAddedPaths()
                   loadAddedElems()

                    var xml2File = "../DrawingLibrary/"+folder+"/PlanetBounds.xml"
                    var load2XML = new XMLHttpRequest;
                    load2XML.onload = callback2;
                    load2XML.open("GET", xml2File, true);
                    load2XML.send();
                    function callback2()
                    {


                         OwnerDrawing=true
                        //---responseText---
                        var xmlString = load2XML.responseText

                        //---DOMParser---
                        var parser = new DOMParser();
                        XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;


                        PlanetView.k=+XMLBounds.getAttribute("planetScale")
                        PrevPlanetScale =PlanetView.k
                       PrevPlanetTransX=+XMLBounds.getAttribute("planetTranslate").split(",")[0]
                       PrevPlanetTransY=+XMLBounds.getAttribute("planetTranslate").split(",")[1]
                      PlanetProjection.translate([PrevPlanetTransX,PrevPlanetTransY])
                      PlanetProjection.scale(PrevPlanetScale);


                          var xml3File = "../DrawingLibrary/"+FOLDER+"/Planet.xml"
                        var load3XML = new XMLHttpRequest;
                        load3XML.onload = callback3;
                        load3XML.open("GET", xml3File, true);
                        load3XML.send();
                        function callback3()
                        {
                             var xmlString = load3XML.responseText

                            //---DOMParser---
                            var parser = new DOMParser();
                            var planetXML = parser.parseFromString(xmlString, "text/xml").documentElement;
                            SelectedPlanetXML=planetXML
                                    var comp=planetXML.getAttribute("CompositionClass")
                                    var atmos=planetXML.getAttribute("AtmosphereClass")
                                    var hab=planetXML.getAttribute("HabitableClass")
                                     var atmosStroke="gainsboro"
                                    if(atmos=="hydrogen-rich")atmosStroke="blue"
                                    if(atmos=="metals-rich")atmosStroke="red"
                                    if(atmos=="none")atmosStroke="grey"
                                    if(atmos=="unknown")atmosStroke="gainsboro"
                                    planetAtmos.setAttribute("stroke",atmosStroke)


                                    planetComp.setAttribute("fill","url(#"+comp+")")


                                    if(hab=="mesoplanet")gridStroke="#0000AA"
                                    if(hab=="thermoplanet")gridStroke="#CA0A14"
                                    if(hab=="psychroplanet")gridStroke="#37A1E7"
                                    if(hab=="hypopsychroplanet")gridStroke="#AC49E3"
                                    if(hab=="hyperthermoplanet")gridStroke="#F08F27"
                                    if(hab=="non-habitable")gridStroke="black"


                                    planetGrid.setAttribute("stroke",gridStroke)

                                    startCursorLoc()
                                   zoomLevelDiv.innerHTML=(PlanetView.k).toFixed(0)
                                  PlanetZoom.translate(PlanetProjection.translate()).scale(PlanetProjection.scale())



                                    ownerSelectSpan.style.visibility = "visible"

                                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:black;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+oEMAIL+"?subject=SVG-Stars%20Drawing:%20"+DrawingNAME.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Planet Map owner'  > "+oNAME +"</a></span>"
                                    drawingDescriptionDiv.innerHTML = DrawingDescription+'<br><a style=font-size:80% title="See data table for this planet" href=javascript:showPlanetData()>Planet Data</a>'
                                    PlanetRadius=planetXML.getAttribute("Radius")//--in EU---
                                    diaSpan.innerHTML=numberWithCommas((2*6371*PlanetRadius).toFixed(0))+" KM"
                                    measureDiv.style.visibility="visible"
                                    drawingNameDiv.style.visibility="visible"
                                    drawingDescriptionDiv.style.visibility="visible"
                                    saveDrawingButtonDiv.style.visibility="visible"
                                   navButtonViz()


                                    removeFolderPlanetCookies()
                                    var cookieSetDate = "@"+new Date().getTime()


                                    setCookie("_SVGPlanets_Folder"+cookieSetDate,FOLDER,180)
                                    setCookie(FOLDER+"_SVGPlanets_Owner_NAME"+cookieSetDate,oNAME,180)
                    				setCookie(FOLDER+"_SVGPlanets_ID"+cookieSetDate,ID,180)
                                    setCookie(FOLDER+"_SVGPlanets_Owner_EMAIL"+cookieSetDate,oEMAIL,180)
                                    setCookie(FOLDER+"_SVGPlanets_DrawingNAME"+cookieSetDate,DrawingNAME,180)
                                    setCookie(FOLDER+"_SVGPlanets_DrawingDescription"+cookieSetDate,DrawingDescription,180)

                                planetRedraw()

                             }

                        }

                        break
                    }

            }


        }


}//--END INIT
var PlanetProjection
var PlanetMap
var PlanetView

var PlanetProjection
var PlanetViewGrid
var PlanetAtmos
var PlanetComp
var PlanetSurface
var dblClickError = false //---d3.geo.zoom dblClick crashes programming. This prevents the crash, but causes relatively minor disruption of zoom/rotate---
var projOutline

var StopPlanetZoom=false

function beginPlanetMap()
{

    if(!PlanetProjection)
    {

        StopPlanetZoom = false
        //---star view ditto celestial view

         PlanetView = {r:[0, 0, 0], k: 400};
        //---rotate and scale this to match celestial---
        PlanetProjection = d3.geo.mollweide().rotate([0, 0, 0]).translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([400])
        PlanetMap = d3.geo.path().projection(PlanetProjection);
                var graticule = d3.geo.graticule().minorStep([8, 4]);

     //---static paths---
    projOutline = d3.geo.mollweide().translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([400]); //projected non moving outline

        PlanetAtmos = d3.geo.path().projection(projOutline)
        PlanetG.append("path").datum(graticule.outline).attr("id", "planetAtmos").attr("stroke","gainsboro").attr("fill","none").attr("stroke-width",20).attr("d", PlanetAtmos);
        PlanetComp = d3.geo.path().projection(projOutline)
        PlanetG.append("path").datum(graticule.outline).attr("filter", "url(#drop-shadow-planet)").attr("id", "planetComp").attr("stroke","none").attr("fill","none").attr("d", PlanetComp);

        PlanetViewGrid=PlanetG.append("path").datum(graticule).attr("id","planetGrid").attr("fill", "none").attr("pointer-events", "none").attr("stroke", "black").attr("stroke-width", ".5").attr("d", PlanetMap);

          PlanetScale=400
        //---restructure zoom for higher scale performance, PAN in lieu of rotation---
       PlanetZoom = d3.behavior.zoom().translate(PlanetProjection.translate()).scale(PlanetProjection.scale()).size([PlanetViewWidth, PlanetViewHeight]).scaleExtent([400, 100000]).on("zoom", planetRedraw);
       //  PlanetZoom = d3.geo.zoom().projection(PlanetProjection).size([PlanetViewWidth, PlanetViewHeight]).center([PlanetViewWidth/2, PlanetViewHeight/2]).scaleExtent([300, 100000]).on("zoom.redraw", planetRedraw);

       PlanetSVG.call(PlanetZoom).on("dblclick.zoom", null)

        PlanetScale=400
        PlanetView.k = 400
        PlanetView.r = [0,0,0]
        PlanetProjection.scale(PlanetView.k)
        PlanetProjection.rotate(PlanetView.r)
        PlanetProjection.translate([PlanetViewWidth/2, PlanetViewHeight/2])


        PlanetZoom.scale(PlanetView.k)


    }
    else
    {
        PlanetProjection.rotate([PlanetView.r[0], PlanetView.r[1], PlanetView.r[2]]).translate([PlanetViewWidth/2, PlanetViewHeight/2])
        PlanetProjection.scale([PlanetView.k])
         PrevPlanetScale = PlanetView.k
    }

}
var PrevPlanetTransX=0
var PrevPlanetTransY=0
var PrevPlanetScale=400