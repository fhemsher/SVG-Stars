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
//---called via initMap---
function initStarMap()
{
    StarSVG = d3.select("#starDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id", "starSVG")
    .attr("fill", "none")
    .attr("viewBox", "0 0 "+CelestialWidth+" "+CelestialHeight)
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

   //---drop shadow---
    var defsShadow=StarSVG.append("defs")
    .attr("id","defsShadow")
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

    var defs= StarSVG.append("defs")
    .attr("id","habDefs")
    var mesoplanetPatt = defs.append("pattern")
    .attr("id", "mesoplanet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/mesoplanet.svg")

    var psychroplanetPatt = defs.append("pattern")
    .attr("id", "psychroplanet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/psychroplanet.svg")

    var nonhabitablePatt = defs.append("pattern")
    .attr("id", "non-habitable")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/non-habitable.svg")

    var hypopsychroplanetPatt = defs.append("pattern")
    .attr("id", "hypopsychroplanet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/hypopsychroplanet.svg")

    var unknownPatt = defs.append("pattern")
    .attr("id", "unknown")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/unknown.svg")

    var thermoplanetPatt = defs.append("pattern")
    .attr("id", "thermoplanet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/thermoplanet.svg")

    var hypothermoplanetPatt = defs.append("pattern")
    .attr("id", "hypothermoplanet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", "1")
    .attr("width", "1")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", "../Images/hypothermoplanet.svg")



    CoronaBG=StarG.append("rect")
    .attr("id","coronaBG")
    .attr("x","-40")
    .attr("y","-40")
    .attr("id","coronaBG")
    .attr("width","120%")
    .attr("height","120%")
    .attr("fill","white")
    .attr("stroke","none")
    .style("display","none")
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

    AddPathG = StarG.append("g");
    AddPathG.attr("id", "domAddPathG")

    AddElemG = StarG.append("g");
    AddElemG.attr("id", "domAddElemG")
    AddElemG.attr("text-rendering", "geometricPrecision")


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
    .attr("stroke", "violet")
    .attr("stroke-width", "1.5")
    //.attr("pointer-events","none")
    DrawX.append("circle")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "3")
    .attr("fill", "violet")
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
    initCelestialMap()
    initStarMap()
    getDrawingLibrary() //---returns XMLDrawingLibraryDoc: see visitDrawingLibrary.js---
   // getAddedStarData()
   getExoXml()
 
  

        var lastLoginMS = mostRecentCookie()

        //----validate folder is still available---
        FOLDER = null
        var cookieFolder = getCookie("_SVGStars_Folder@"+lastLoginMS)


        if(cookieFolder)
        {
            var drawings = XMLDrawingLibraryDoc.childNodes
            for(var k = 0; k<drawings.length; k++)
            {
                var drawing = drawings.item(k)
                var folder = drawing.getAttribute("folder")

                if(folder==cookieFolder)
                {
                    FOLDER = cookieFolder
                    //---values that may have been changed---
                    DrawingName = xml2txt(drawing.getAttribute("name"))
                    DrawingDescription = xml2txt(drawing.getAttribute("description"))
                    openOwnerDrawingsButton.disabled=false
                    openOwnerDrawingsButton.style.opacity=1
                    ID = getCookie(FOLDER+"_SVGStars_ID@"+lastLoginMS)

                    oNAME = getCookie(FOLDER+"_SVGStars_Owner_NAME@"+lastLoginMS)
                    oEMAIL = getCookie(FOLDER+"_SVGStars_Owner_EMAIL@"+lastLoginMS)
                    hiddenDrawingNameValue.value = DrawingName
                    hiddenDrawingDescriptionValue.value = DrawingDescription

                    loginToDrawing()
                     openOwnerDrawingsButton.disabled=false
                    openOwnerDrawingsButton.style.opacity=1
                        removeStarFolderCookies()
                    break;
                }

            }
        }
       else
       svgBgImg.style.visibility = "visible"

}//--END INIT
