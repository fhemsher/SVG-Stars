
/*
//----init svg after celestial loaded---
var CelestialWidth
var CelestialHeight
var CelestialSVG
var StarWrapper //---single star bb wrapper---
var PrimaryStarPath //---single star bb path---
var CentroidCelestial
var EarthPathCelestial
var CelestialG
var ProperNameG
var PrimaryStarG

var CelestialScale = 170 //---mollweide proj---
var CelestialCenter =[0, 0]
var CelestialProjection
var projOutline
var CelestialMap
var CelestialZoom
var CelestialOutline
var CelestialView // ---View = {r: [x, y, angle], k: scale}; see d3.geo.zoom()---
var StopCelestialZoom = false
var BeginStar = false
var dblClickError = false //---d3.geo.zoom dblClick crashes programming. This prevents the crash, but causes relatively minor disruption of zoom/rotate---
var Sun
var Earth
var celestialYY
var celestialXX
var CompanionStarsG
var HostStarsG

//---called via initMap---
function initCelestialMap()
{    topNavDiv.style.width=(screen.width-30)+"px"
    CelestialWidth = window.innerWidth-300
    CelestialHeight = (30+CelestialWidth / 2)
    CelestialSVG = d3.select("#celestialDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id", "celestialSVG")
    .attr("overflow", "hidden")
    .attr("viewBox", "0 0 "+CelestialWidth+" "+CelestialHeight)
    StarWrapper = CelestialSVG.append("svg")
    .attr("id", "starWrapper")

    var filter = CelestialSVG.append('filter').attr('id', 'lightMe');

    filter.append('feDiffuseLighting')
    .attr('id', 'lighting')
    .attr('in', 'SourceGraphic')
    .attr('result', 'light')
    .attr('lighting-color', 'blue')
    .append('fePointLight')
    .attr('x', CelestialWidth/2)
    .attr('y', CelestialHeight/2)
    .attr('z', 40);

    filter.append('feComposite')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'light')
    .attr('operator', 'arithmetic')
    .attr('k1', '1')
    .attr('k2', '0')
    .attr('k3', '0')
    .attr('k4', '0');
    CelestialG = CelestialSVG.append("g")
    .attr("id", "celestialG")
    .attr("onmousedown", "this.style.cursor='hand'")
    .attr("onmouseup", "this.style.cursor='default'")
    ProperNameG = CelestialSVG.append("g")
    .attr("id", "properNameG")

     CompanionStarsG=CelestialSVG.append("g")
    .attr("id", "companionStarsG")
     HostStarG=CelestialSVG.append("g")
    .attr("id", "hostStarG")

    CentroidCelestial = CelestialSVG.append("circle")
    .attr("id", "centroidCelestial")
    .attr("r", "4")
    .attr("fill", "blue")
    .attr("stroke", "white")
    .attr("stroke-width", "2")
    .style("cursor", "default")
    .attr("name", "Centroid")
    .attr("onmouseover", "showEarthName(evt)")
    .attr("onmouseout", "hideStarName(evt)")
    .style("display", "none")

    EarthPathCelestial = CelestialSVG.append("path")
    .attr("id", "earthPathCelestial")
    .attr("stroke", "white")
    .attr("stroke-width", ".5")
    .attr("stroke-dasharray", "5 2")
    .attr("fill", "none")

    PrimaryStarPath = CelestialSVG.append("path")
    .attr("id", "primaryStarPath")
    .attr("fill", "none")
    .attr("stroke-dasharray", "4 2")
    .attr("stroke-width", "1")
    .attr("stroke", "white")
    .style("display", "none")


    PrimaryStarG = CelestialSVG.append("g")
    .attr("id", "primaryStarG")
    CelestialProjection = d3.geo.mollweide().rotate([0.0, 0.0, 0.0]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale])
    projOutline = d3.geo.mollweide().translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale]); //projected non moving outline
    var graticule = d3.geo.graticule().minorStep([8, 4]);
    CelestialMap = d3.geo.path().projection(CelestialProjection);
    CelestialOutline = d3.geo.path().projection(projOutline)
    CelestialZoom = d3.geo.zoom().projection(CelestialProjection).size([CelestialWidth, CelestialHeight]).center([CelestialWidth/2, CelestialHeight/2]).scaleExtent([CelestialScale, CelestialScale*500]).on("zoom.redraw", celestialRedraw);
    CelestialG.append("path").datum(graticule.outline).attr("id", "celestialOutline").attr("d", CelestialOutline);
    CelestialG.append("path").datum(graticule).attr("class", "gridline").attr("d", CelestialMap);
    CelestialSVG.call(CelestialZoom).on("dblclick.zoom", null)
    celestialOutline.setAttribute("fill", "#191970")
    celestialOutline.setAttribute("filter", "url(#lightMe)")
    loadConstellations() //---constellations.js---

    

   // addProperNameStars()
    celestialYY = CelestialSVG.append("line")
    .attr("stroke", "red")
    .attr("stroke-width", "1.5")
    .attr("pointer-events", "none")
    .attr("x1", "50%")
    .attr("y1", "0")
    .attr("x2", "50%")
    .attr("y2", "100%")
    celestialXX = CelestialSVG.append("line")
    .attr("stroke", "red")
    .attr("stroke-width", "1.5")
    .attr("pointer-events", "none")
    .attr("x1", "0")
    .attr("y1", "50%")
    .attr("x2", "100%")
    .attr("y2", "50%")

    Sun = CelestialSVG.append("circle")
    .attr("id", "sun")
    .attr("r", "3")
    .attr("fill", "red")
    .attr("stroke", "yellow")
    .attr("stroke-width", "2")
    .attr("transform", CelestialPoint([sunDec, sunRA])+"scale("+(CelestialView.k/CelestialScale)+")")
    .style("cursor", "default")
    .attr("myData", "R.A. "+sunRA.toFixed(6)+", Dec. "+sunDec.toFixed(6))
    .attr("onmouseover", "showSunData(evt)")
    .attr("onmouseout", "hideStarName(evt)")

    Earth = CelestialSVG.append("circle")
    .attr("id", "earth")
    .attr("r", "5")
    .attr("fill", "lime")
    .attr("stroke", "orange")
    .attr("stroke-width", "3")
    .attr("transform", CelestialPoint([0, 0])+"scale("+(CelestialView.k/CelestialScale)+")")
    .style("cursor", "default")
    .attr("name", "Earth")
    .attr("onmouseover", "showEarthName(evt)")
    .attr("onmouseout", "hideStarName(evt)")


     CelestialView.k=170
        CelestialProjection.scale(CelestialView.k)
        CelestialZoom.scale(CelestialView.k)
    celestialRedraw()

}
*/


//==================Star Map=============================

var StarSVG
var ConStarG
var StarConBoundry
var EarthPathStar
var StarG
var MyStarG

var StarScale = 180 //---mollweide proj---
var StarProjection
var StarMap
var StarZoom
var StopStarZoom = false
var StarView
//---single star----
var PrimaryStarID
var PrimaryStarCoords =[]
var PrimaryStarBoundryCoords =[]
var PrimaryStarBoundry
var PrimaryStarZone
var PrimaryStarCorona
var PrimaryStarSurface
var PrimaryStarGraticule
var PrimaryStarRadius
var PrimaryStarX
var ExoplanetG  //---exoplanets--
var OrbitG  //---exoplanet orbits--
var CoronaBG

//---add elems===
var AddElemG //---all added elems container---
var AddPathG //---all added elems container---
var PlanetG //---exoplanet circles & text container---
var CoverRect
var LatLngX
var ActiveElemG
var Wrapper //---svg wrapper---
var DrawX
var DragDot //---used for circles/rects---
var DistancePath//---measure distance---
var DistanceDot//---measure distance---

var ImgDragArrow


var StarMapWidth
var StarMapHeight
//---called via initMap---
function initStarMap()
{
       StarMapWidth = window.innerWidth-300
    StarMapHeight = (30+StarMapWidth / 2)



    StarSVG = d3.select("#starDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id", "starSVG")
    .attr("fill", "none")
    .attr("viewBox", "0 0 "+StarMapWidth+" "+StarMapHeight)
    var defs = StarSVG.append("defs")
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

    var defs = StarSVG.append("defs")
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
    var arrowDefs = StarSVG.append("defs")
    .attr("id", "arrowDefs")

    var filter = StarSVG.append('filter').attr('id', 'lightStar');

    filter.append('feDiffuseLighting')
    .attr('id', 'lighting')
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

var defs = StarSVG.append("defs")
    var pattern=defs.append("pattern")
    .attr("shape-rendering","geometricPrecision")
     .attr("id","crosshatch")
    .attr("patternUnits","userSpaceOnUse")
    .attr("x","0")
    .attr("y","0")
    .attr("width","8")
    .attr("height","8")
    pattern.append("path")
    .attr("d","M-2,0 l8,8")
    .attr("stroke-width",".25")
    .attr("stroke","#1A773F")
    .attr("fill","none")
    pattern.append("path")
    .attr("d","M8,0 l-8,8")
    .attr("stroke-width",".25")
    .attr("stroke","#1A773F")
    .attr("fill","none")

    StarSVG.append("rect")
    .attr("id", "blackboard")
    .attr("fill", "#191970")
    .attr("filter", "url(#lightStar)")
    .attr("x", "-10%")
    .attr("y", "-10%")
    .attr("width", "120%")
    .attr("height", "120%")
    .style("display", "block")

    StarConBoundry = StarSVG.append("path")
    .attr("id", "starConBoundry")
    .attr("class", null)
    .attr("fill", "none")
    .attr("stroke", "#cc0")
    .attr("stroke-opacity", ".8")
    .attr("stroke-width", "2px")
    .attr("stroke-dasharray", "6 3")
    .style("dislpay", "none")
    ConStarG = StarSVG.append("g")
     .attr("id", "conStarG")
    PrimaryStarBoundry = StarSVG.append("path")
    .attr("id", "primaryStarBoundry")
    .attr("fill", "none")
    .attr("stroke-dasharray", "4 2")
    .attr("stroke-width", "1")
    .attr("stroke", "#cc0")
    .attr("stroke-opacity", ".8")

    EarthPathStar = StarSVG.append("path")
    .attr("id", "earthPathStar")
    .attr("stroke", "white")
    .attr("stroke-width", ".5")
    .attr("stroke-dasharray", "5 2")
    .attr("fill", "none")

    MyStarG = StarSVG.append("g")
    .attr("id", "myStarG")

    StarG = StarSVG.append("g")
    .attr("id", "starG")
        .attr("shape-rendering","geometricPrecision")

    PrimaryStarZone = StarG.append("path")
    .attr("id", "primaryStarZone")
    .attr("fill", "#9966CC")
    .attr("stroke", "none")
    .attr("onmouseover", "showStarName(evt)")
    .attr("onmouseout", "hideStarName(evt)")
        .attr("name", "Primary Star Zone")




    //---visual locator for center star--
    PrimaryStarX = StarSVG.append("g")
    .attr("id", "primaryStarX")
    .attr("transform", "translate(600 300)")

    PrimaryStarX.append("line") //---vert---
    .attr("stroke", "red")
    .attr("stroke-width", ".5")
    .attr("pointer-events", "none")
    .attr("x1", "0")
    .attr("y1", "-50%")
    .attr("x2", "0")
    .attr("y2", "50%")

    PrimaryStarX.append("line") //---horiz---
    .attr("stroke", "red")
    .attr("stroke-width", ".25")
    .attr("pointer-events", "none")
    .attr("x1", "-50%")
    .attr("y1", "0")
    .attr("x2", "50%")
    .attr("y2", "0")

    var defs = StarSVG.append("defs")
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

    var defs = StarSVG.append("defs")
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
    CoronaBG=StarG.append("rect")
    .attr("id","coronaBG")
    .attr("x","-40")
    .attr("y","-20")
    .attr("width","120%")
    .attr("height","110%")
    .attr("fill","white")
    .attr("stroke","none")
    PrimaryStarCorona = StarG.append("path")
    .attr("id", "primaryStarCorona")
    .attr("shape-rendering","geometricPrecision")
    .attr("fill", "white")
    .attr("stroke", "none")
    .attr("name", "Primary Star Corona")
    .attr("onmouseover", "showStarName(evt)")
    .attr("onmouseout", "hideStarName(evt)")


    OrbitG=StarG.append("g")
    .attr("shape-rendering","geometricPrecision")
    .attr("id", "orbitG")



    PrimaryStarSurface = StarG.append("path")
    .attr("id", "primaryStarSurface")
    .attr("fill", "url(#surfaceFill)")
    .attr("stroke", "none")
    .attr("ondblclick", "showPrimaryStarData()")
    .attr("onmouseover", "showStarName(evt)")
    .attr("onmouseout", "hideStarName(evt)")

    PrimaryStarGraticule = StarG.append("path")
    .attr("id", "primaryStarGraticule")
    .attr("fill", "url(#surfaceGraticule)")
    .attr("stroke", "none")
    .attr("pointer-events", "none")

    //--svg elem used as temp container to find native center of tranformed elem for active elem roatation---
    Wrapper = StarG.append("svg")
    .style("display", "block")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("overflow", "visible")
    .attr("id", "domWrapper")



        ExoplanetG=StarSVG.append("g")
        .attr("shape-rendering","geometricPrecision")
         .attr("id", "exoplanetG")



    AddElemG = StarG.append("g");
    AddElemG.attr("id", "domAddElemG")
    AddElemG.attr("text-rendering", "geometricPrecision")

    AddPathG = StarG.append("g");
    AddPathG.attr("id", "domAddPathG")

       PlanetG = StarG.append("g");
   PlanetG.attr("id", "domPlanetG")
    PlanetG.attr("text-rendering", "geometricPrecision")
    PlanetG.attr("shape-rendering", "geometricPrecision")


    LatLngX = StarG.append("g")
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
    CoverRect = StarG.append("rect")
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
    ActiveElemG = StarG.append("g");
    ActiveElemG.attr("id", "domActiveElemG")

    DrawX = ActiveElemG.append("g")
    .style("display", "none")
    .attr("id", "domDrawX")
    .attr("stroke", "red")
    .attr("stroke-width", ".5")
    //.attr("pointer-events","none")
    DrawX.append("circle")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "3")
    .attr("fill", "red")
    DrawX.append("line")
    .attr("x1", "0")
    .attr("y1", "-10%")
    .attr("x2", "0")
    .attr("y2", "10%")
    DrawX.append("line")
    .attr("x1", "-5%")
    .attr("y1", "0")
    .attr("x2", "5%")
    .attr("y2", "0")

    DragDot = StarG.append("circle")
    .attr("id", "dragDot")
    .attr("class", "dragTargetObj")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "12")
    .attr("fill", "white")
    .attr("fill-opacity", ".5")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .style("visibility", "hidden")
    .style("cursor", "default")

    //---measure distange---
    DistanceDot = StarSVG.append("circle")
    .attr("id", "distanceDot")
    .attr("stroke", "none")
    .attr("fill", "violet")
    .attr("r", "5")
    .attr("pointer-events", "none")
    .style("display", "none")

    DistancePath = StarSVG.append("path")
    .attr("id", "distancePath")
    .attr("stroke", "violet")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    .attr("marker-end", "url(#distanceArrow)")
    .style("display", "none")
      ImgDragArrow=StarSVG.append("image")
    .attr("id","imgDragArrow")
    .attr("href","../Images/ImgDragArrow.png")
    .attr("class","dragTargetObj")
    .attr("width","25")
    .attr("height","25")
    .attr("x","-12.5")
    .attr("y","-12.5")
    .style("visibility", "hidden")
    .style("cursor", "nw-resize")


}
//---operating vars---
var XMLBounds
var XMLDefaultBounds
var oNAME
var oEMAIL
var DrawingName
var StarName
var DrawingDescription
var ID
var FOLDER

var temp = "zyKi33753Yam181941DaNAPAIgeLj"
var XMLBounds //---filled via login---
var XMLDrawingsDoc //---filled via getCommunities()---
var NS = "http://www.w3.org/2000/svg"
var MyStars = false //----true if login loaded star--my star login----
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
   getConBoundries() //---constellation.js---

    initStarMap()
    getDrawingLibrary() //---returns XMLDrawingLibraryDoc: see visitDrawingLibrary.js---

   getExoXml()


    var drawings = XMLDrawingLibraryDoc.childNodes
    for(var k = 0; k<drawings.length; k++)
    {
        var drawing = drawings.item(k)
        var folder = drawing.getAttribute("folder")

        if(folder==FOLDER)
        {

            //---values that may have been changed---
            StarName = xml2txt(drawing.getAttribute("name"))
            DrawingDescription = xml2txt(drawing.getAttribute("description"))


            oNAME =  drawing.getAttribute("ownerName")
            oEMAIL = drawing.getAttribute("email")


            loginToDrawing()

            break;
        }

    }



}//--END INIT

var XMLDrawingLibraryDoc
function getDrawingLibrary()
{
  var xmlFile = "../DrawingLibrary/"+temp+"/drawingOwners.xml"
  var loadXML = new XMLHttpRequest();

  loadXML.onload = callbackPlaces;
  loadXML.open("GET", xmlFile, false);
  loadXML.send();
  function callbackPlaces()
  {
    var xmlString = loadXML.responseText
    var parser = new DOMParser();
    XMLDrawingLibraryDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
  }
}
var ExoXmlDoc
function getExoXml()
{

    var xmlFile = "../Exoplanet/Exoplanets.xml"
        var loadXML = new XMLHttpRequest;
        loadXML.onload = callbackExo;
        loadXML.open("GET", xmlFile, true);
        loadXML.send();
        function callbackExo()
        {
                var xml = loadXML.responseXML
                ExoXmlDoc=xml.documentElement
        }
}


//---fired via initMap---
function loginToDrawing()
{

        //----defaultBounds----
       var xml3File = "../DrawingLibrary/"+FOLDER+"/DefaultBounds.xml"
        var load3XML = new XMLHttpRequest;
        load3XML.onload = callback3;
        load3XML.open("GET", xml3File, true);
        load3XML.send();
        function callback3()
        {
             var xmlString = load3XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLDefaultBounds = parser.parseFromString(xmlString, "text/xml").documentElement;

         }
        var xml2File = "../DrawingLibrary/"+FOLDER+"/CelestialBounds.xml"
        var load2XML = new XMLHttpRequest;
        load2XML.onload = callback2;
        load2XML.open("GET", xml2File, true);
        load2XML.send();
        function callback2()
        {
            //---responseText---
            var xmlString = load2XML.responseText
            console.log(xmlString)
            //---DOMParser---
            var parser = new DOMParser();
            XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
            //<celestialBounds    constellation="'+conValue+'"  celestialScale="'+View.k+'" celestialRotate="'+View.r+'"  boundries='+boundries+'"   />

            var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
            var crd1 = parseFloat(centerSplit[0])
            var crd2 = parseFloat(centerSplit[1])
            PrimaryStarCoords =[crd1, crd2]

            var con = XMLBounds.getAttribute("constellation")
             SelectedCon=con

            var initStarView = XMLBounds.getAttribute("initStarDwg")
            var viewK = XMLBounds.getAttribute("celestialScale")
            var viewR = XMLBounds.getAttribute("celestialRotate")
            var trans = XMLBounds.getAttribute("celestialTranslate")




                initStarDwg(viewK, viewR, trans) //---stars.js creates star graticule and this star projection



               // goToDwgView(viewK, viewR, trans)  //---owner set view----
            getArrowDefs()//--preload for use in path end arrows---


            starContainerDiv.style.display = "block"
           getMyStars()
           if(initStarView=="false")
           {
              PlanetScale=+XMLBounds.getAttribute("planetScale")
               setTimeout(locatePlanets,1800)


           }

           // loadAddedPaths()
           // getAddedStarData()
            //---provides projection on all elements zoom/rotate celestial sphere---
            MyStars = true //--redraw()---
            StopStarZoom = false



            zoomLevelDiv.innerHTML = "&nbsp;"



                //---loaded at initMap---





            drawingNameDiv.innerHTML = "<span id=myDrawingNameSpan >"+StarName+" ("+con+")</span> <span style='color:green;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+oEMAIL+"?subject=SVG-Stars%20Drawing:%20"+StarName.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Star Drawing owner'  > "+oNAME +"</a></span>"
            drawingDescriptionDiv.innerHTML = DrawingDescription
            drawingDescriptionDiv.style.visibility = "visible"
            drawingNameDiv.style.visibility = "visible"
             measureDiv.style.visibility = "visible"


           zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

        }


}
var ConBoundries //---used to create clone boundry for my star---
function getConBoundries() //---constellation.html (iframe) onload---
{
    var file = "../Constellation/constellations.bounds.js"
    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    loadJSON(function(response)
        {
            // Parse JSON string into object
            ConBoundries = JSON.parse(response);

        }
    )

}
var ConLocArray =[]
ConLocArray[0] =['And', 513.918638517338,[-10.174770885558514, -40.47678815735467, 15.680546770975962]]
ConLocArray[1] =['Ant', 793.2819335932676,[-152.02931156570548, 34.21276498440891, 43.151477974997]]
ConLocArray[2] =['Aps', 1159.8154572955655,[115.97137512139341, 76.45552177370466, -64.62076451369668]]
ConLocArray[3] =['Aqr', 457.51582465914123,[24.117360720498542, 10.46396934278143, -112.47948634736213]]
ConLocArray[4] =['Aql', 707.5444494199846,[65.26482355555936, -2.0484388195663397, -88.65787160722752]]
ConLocArray[5] =['Ara', 760.3676543703818,[99.83900870364583, 54.522684286220496, -82.08734610835947]]
ConLocArray[6] =['Ari', 822.6702823148406,[-39.788753588800034, -20.20941916465855, 67.27759961218955]]
ConLocArray[7] =['Aur', 654.2391991923614,[-89.00122597156222, -41.20811824685977, 89.24396937562734]]
ConLocArray[8] =['Boo', 448.35933282022023,[141.10179542972344, -29.52945413415894, -121.42923130279236]]
ConLocArray[9] =['Cae', 880.5146650709147,[-71.26001648599619, 38.017097676899446, 101.58376029729604]]
ConLocArray[10] =['Cam', 412.91132033396156,[-85.42980315683187, -71.22389069267665, 85.8615764182714]]
ConLocArray[11] =['Cnc', 656.7461530094918,[-130.13879623655336, -19.506721533378464, 105.61078731662984]]
ConLocArray[12] =['CVn', 650.1786914793969,[162.6058014003523, -40.5447226658125, -154.17467862640964]]
ConLocArray[13] =['CMa', 887.8542943018793,[-102.36065699182038, 21.971520117407543, 85.3354768247277]]
ConLocArray[14] =['CMi', 1362.152647692882,[-114.4113345787699, -6.010533817726208, 91.79668238145102]]
ConLocArray[15] =['Cap', 822.670282314838,[44.5716521476006, 18.71616113330952, -108.03208474051573]]
ConLocArray[16] =['Car', 535.1067798674873,[-131.26868799424338, 63.51749458215539, 51.766120511089945]]
ConLocArray[17] =['Cas', 623.4674878401929,[-15.396823478358746, -62.722522131476296, 17.473129046721738]]
ConLocArray[18] =['Cen', 494.79270373740417,[163.9151975867733, 46.64777224721899, -22.136821168120175]]
ConLocArray[19] =['Cep', 551.4864798041503,[25.12271422131452, -72.04410608474954, -25.39742685634014]]
ConLocArray[20] =['Cet', 378.77045355719946,[-24.22981429694607, 8.995086164731708, 108.86592872495046]]
ConLocArray[21] =['Cha', 1013.5469456415817,[-159.0738718393493, 80.86201272199811, 21.199433184264862]]
ConLocArray[22] =['Cir', 1132.0268522210463,[137.6523820468557, 63.27931385509356, -45.6368975706981]]
ConLocArray[23] =['Col', 1085.5199454721987,[-86.85443201307989, 35.68053482737948, 91.73609319273045]]
ConLocArray[24] =['Com', 713.2097264074333,[168.63288516695647, -22.492662103682868, -151.99564149579865]]
ConLocArray[25] =['CrA', 1645.340564629677,[80.23097360159882, 41.473697737674584, -97.04864570057826]]
ConLocArray[26] =['CrB', 1321.6953519037572,[121.63075586164435, -32.244171453612346, -108.48713114374821]]
ConLocArray[27] =['Crv', 1192.8395553103082,[173.64197377991982, 18.198460912154026, -19.167775912298335]]
ConLocArray[28] =['Crt', 878.9757513588615,[-171.10970436224642, 15.739871234000235, 30.293521580022933]]
ConLocArray[29] =['Cru', 2493.8699513607776,[173.34835860751934, 60.22818476156919, -8.471327177904563]]
ConLocArray[30] =['Cyg', 515.0892764351637,[50.72354926201662, -43.06353767664297, -61.43438079411414]]
ConLocArray[31] =['Del', 985.4866138673709,[49.829535105057985, -12.139614276112198, -80.55889404182324]]
ConLocArray[32] =['Dor', 915.0316493182837,[-75.4028908788296, 61.44557256758892, 102.95272164742131]]
ConLocArray[33] =['Dra', 473.57713148123815,[105.18260661494993, -68.103777864711, -105.1639571970055]]
ConLocArray[34] =['Equ', 1852.7628184434734,[41.95697246474792, -7.453967759924446, -82.33619563016086]]
ConLocArray[35] =['Eri', 431.7240052404125,[-56.93776718666188, 21.135190903872395, 103.17238442976927]]
ConLocArray[36] =['For', 784.1347346580017,[-41.56652941881585, 31.509977498420213, 120.35858784216741]]
ConLocArray[37] =['Gem', 772.9220560293833,[-107.22780973536116, -23.472198068962747, 96.93320039114548]]
ConLocArray[38] =['Gru', 837.4661854073255,[21.929486946446577, 45.58565720031743, -150.35983662815562]]
ConLocArray[39] =['Her', 422.17029982103674,[100.44613462770695, -28.486025585324047, -95.03274268245711]]
ConLocArray[40] =['Hor', 592.7181237183003,[-49.38238756552642, 53.36970489827765, 124.7269690615278]]
ConLocArray[41] =['Hya', 248.8602560271134,[-157.6672969511287, 19.757871562202382, 50.47433117599669]]
ConLocArray[42] =['Hyi', 945.0000000000006,[-35.47664915713809, 71.71159400599018, 143.3340727914932]]
ConLocArray[43] =['Ind', 582.1298545853767,[37.68706117964992, 58.71771115623272, -138.24296559109294]]
ConLocArray[44] =['Lac', 1085.5199454721987,[22.63207111730081, -45.15039801038044, -30.715769694592936]]
ConLocArray[45] =['Leo', 476.2832865182739,[-160.6566467541787, -15.137371797280757, 126.72012104743291]]
ConLocArray[46] =['LMi', 945.0000000000006,[-155.32628467621274, -33.55316365900584, 140.8235367179926]]
ConLocArray[47] =['Lep', 1197.8007623680257,[-83.57551506130116, 19.16243000222849, 92.29548688854726]]
ConLocArray[48] =['Lib', 685.106417480172,[131.6182248088105, 15.336647862773143, -76.84923288022485]]
ConLocArray[49] =['Lup', 623.2642747215145,[130.28425240224945, 42.4785785670914, -60.24503862065684]]
ConLocArray[50] =['Lyn', 623.4674878401928,[-121.15421312709636, -47.06029388994199, 113.95889118813594]]
ConLocArray[51] =['Lyr', 922.3582671016882,[77.24899944077087, -36.621261247369766, -82.14859705285659]]
ConLocArray[52] =['Men', 1305.7657735484283,[-82.10151285876886, 77.89437146063783, 98.12345178106588]]
ConLocArray[53] =['Mic', 958.2031402571189,[45.48008727829868, 36.1926616954398, -120.33739118003902]]
ConLocArray[54] =['Mon', 671.019941787984,[-105.17038087284243, 2.7559928111733814, 89.79378316287928]]
ConLocArray[55] =['Mus', 1470.0823692643892,[171.5271191361163, 70.32534609685666, -9.508474211054722]]
ConLocArray[56] =['Nor', 1015.6525090383168,[118.83600246931972, 51.67060361255639, -66.96515753949322]]
ConLocArray[57] =['Oct', 977.0968977195146,[37.689644499172545, 84.16255367161202, -142.3702194351318]]
ConLocArray[58] =['Oph', 398.75877594267973,[100.17309347280529, 5.422948633735468, -89.81425448500221]]
ConLocArray[59] =['Ori', 567.1892741136213,[-83.89324441575442, -5.287473491849532, 88.58677521323972]]
ConLocArray[60] =['Pav', 829.2573667340254,[66.08353128338318, 66.26801003242277, -112.41961221540235]]
ConLocArray[61] =['Peg', 408.78220713062035,[19.625885641165116, -19.412590392207708, -47.23178848823989]]
ConLocArray[62] =['Per', 502.74799197396646,[-52.96879381381709, -44.65803099492238, 61.823700322197084]]
ConLocArray[63] =['Phe', 523.9860191954906,[-11.789689344732343, 48.153896051416105, 164.18951707466638]]
ConLocArray[64] =['Pic', 1032.3186671120527,[-83.55751073242936, 52.57897097137324, 95.02346323233178]]
ConLocArray[65] =['Psc', 472.5000000000003,[-9.111489390416972, -11.142493747545517, 40.01232355505632]]
ConLocArray[66] =['PsA', 907.7632294500003,[25.69498998052761, 31.100838979576917, -137.5833104523182]]
ConLocArray[67] =['Pup', 459.0051198885259,[-114.68181605325803, 33.40578065714169, 75.73448105181697]]
ConLocArray[68] =['Pyx', 807.7108149588429,[-133.63569756620504, 28.551197179083832, 65.30249298794004]]
ConLocArray[69] =['Ret', 1318.955326816594,[-58.399982482311536, 60.844681626799385, 118.06077152264737]]
ConLocArray[70] =['Sge', 1085.5199454721987,[64.30736089710439, -18.73101255915683, -81.50275193034798]]
ConLocArray[71] =['Sgr', 494.79270373740417,[72.34655429959089, 27.811465153098773, -99.10616900822997]]
ConLocArray[72] =['Sco', 716.1760776761635,[108.48237536826667, 32.47273442315061, -80.50932439269326]]
ConLocArray[73] =['Scl', 542.5830654411654,[-7.05114165959359, 32.51006233463739, 166.8889284129074]]
ConLocArray[74] =['Sct', 1589.8598277927013,[79.92467841480482, 9.865691711911369, -91.98190440979198]]
ConLocArray[75] =['Ser', 298.2098888275769,[105.40248296079145, -11.365886270866865, -93.3199021432273]]
ConLocArray[76] =['Sex', 1025.3222571586723,[-153.9994415843746, 2.604327763770645, 84.65007701519797]]
ConLocArray[77] =['Tau', 623.4674878401936,[-66.35130438442273, -17.279941639437972, 82.46869598797865]]
ConLocArray[78] =['Tel', 945.0000000000016,[70.03109343903049, 51.71991196213742, -106.1445676407863]]
ConLocArray[79] =['Tri', 1321.6953519037575,[-32.00845506356546, -32.25295612647066, 48.77948185514446]]
ConLocArray[80] =['TrA', 1443.820935455535,[118.98879131006419, 66.20127631784214, -63.54488882917594]]
ConLocArray[81] =['Tuc', 835.8971936456539,[2.370228809478264, 64.92195944970946, -177.86618574869897]]
ConLocArray[82] =['UMa', 353.0388145716795,[-165.75600738625235, -54.615986617275, 162.7752124909139]]
ConLocArray[83] =['UMi', 966.385331050379,[134.12731201488467, -76.63442447581336, -133.3620216807162]]
ConLocArray[84] =['Vel', 611.1837989305124,[-143.85348966570496, 48.46210269203126, 44.39724252767519]]
ConLocArray[85] =['Vir', 465.11718750000045,[160.51956336283985, 2.8274737854498357, -81.26754571712354]]
ConLocArray[86] =['Vol', 1324.7083459188718,[-116.67163021034366, 70.06206111307387, 64.61215680883542]]
ConLocArray[87] =['Vul', 704.9858264624747,[55.72493718781566, -24.82566859283883, -74.6586987453131]]

