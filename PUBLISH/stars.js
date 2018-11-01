//---login---
function initStarDwg(viewK, viewR, trans)
{
    var rSplit = viewR.split(",")
    var r0 = parseFloat(rSplit[0])
    var r1 = parseFloat(rSplit[1])
    var r2 = parseFloat(rSplit[2])
    var k = parseFloat(viewK)
    StarView =
    {
    r: [r0, r1, r2], k: k
    };

    var tSplit = trans.split(",")
    transX = parseFloat(tSplit[0])
    transY = parseFloat(tSplit[1])
    var myTrans =[transX, transY]

    DefaultViewChanged = false

    StopCelestialZoom = true
    //---rotate and scale this to match celestial---
    StarProjection = d3.geo.mollweide().rotate([StarView.r[0], StarView.r[1], StarView.r[2]]).translate(myTrans).scale([StarView.k])
    StarMap = d3.geo.path().projection(StarProjection);

    MyStars = true
    PrimaryStarZone.style("display", null)
    PrimaryStarCorona.style("display", null)
    MyConBoundries = null

    var primaryStarCircle = d3.geo.circle().angle(.077).origin(PrimaryStarCoords)
    PrimaryStarZone.datum(primaryStarCircle)
    .attr("d", StarMap);
    //var coronaCircle = d3.geo.circle().angle(.000077).origin(PrimaryStarCoords)
    // PrimaryStarCorona.datum(coronaCircle)
    //.attr("d", StarMap);

    PrimaryStarX.attr("transform", StarPoint(PrimaryStarCoords))

    StarZoom = d3.behavior.zoom().translate(StarProjection.translate()).scale(StarProjection.scale()).size([StarMapWidth, StarMapHeight]).scaleExtent([450, 60000000000000]).on("zoom", starRedraw);

    //---restructure zoom for higher scale performance, PAN in lieu of rotation---
    if(Mobile==false) //---dblclick OK in mobile---
        StarSVG.call(StarZoom).on("dblclick.zoom", null)
        else
            StarSVG.call(StarZoom)

            StarZoom.translate(myTrans).scale(StarView.k)

            PrevScale = StarView.k
            PrevTransX = StarProjection.translate()[0]
            PrevTransY = StarProjection.translate()[1]

}

function goToDwgView(viewK, viewR, trans)
{
    DefaultViewChanged = true

    //StarView = {r:viewR, k:viewK};

    transX = trans[0]
    transY = trans[1]
    var myTrans = trans

    StopCelestialZoom = true
    //---rotate and scale this to match celestial---
    StarProjection = d3.geo.mollweide().rotate([StarView.r[0], StarView.r[1], StarView.r[2]]).translate(myTrans).scale([StarView.k])
    StarMap = d3.geo.path().projection(StarProjection);

    MyStars = true
    PrimaryStarZone.style("display", null)
    PrimaryStarCorona.style("display", null)
    MyConBoundries = null

    if(!StarZoom)
    {
        var primaryStarCircle = d3.geo.circle().angle(.077).origin(PrimaryStarCoords)
        PrimaryStarZone.datum(primaryStarCircle)
        .attr("d", StarMap);

        PrimaryStarX.attr("transform", StarPoint(PrimaryStarCoords))

        StarZoom = d3.behavior.zoom().translate(StarProjection.translate()).scale(StarProjection.scale()).size([CelestialWidth, CelestialHeight]).scaleExtent([450, 60000000000000]).on("zoom", starRedraw);

        if(Mobile==false) //---dblclick OK in mobile---
            StarSVG.call(StarZoom).on("dblclick.zoom", null)
            else
                StarSVG.call(StarZoom)

    }

    StarZoom.translate(myTrans).scale(StarView.k)
    PrevScale = StarView.k
    PrevTransX = transX
    PrevTransY = transY

}

//---at constellation selected---
var NewStarScale
function beginStarMap()
{
    StopCelestialZoom = true
    //---star view ditto celestial view
    StarView = CelestialView

    if(!StarProjection)
    {
        console.log("!StarProjection")
        //---rotate and scale this to match celestial---
        StarProjection = d3.geo.mollweide().rotate([CelestialView.r[0], CelestialView.r[1], CelestialView.r[2]]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialView.k])
        StarMap = d3.geo.path().projection(StarProjection);
        //---creates a 'shadow' grid identical to celestial---
        var graticule = d3.geo.graticule().minorStep([8, 4]);
        MyStarG.append("path").datum(graticule).attr("class", "gridline").attr("d", StarMap);

        //---restructure zoom for higher scale performance, PAN in lieu of rotation---
        StarZoom = d3.behavior.zoom().translate(StarProjection.translate()).scale(StarProjection.scale()).size([CelestialWidth, CelestialHeight]).scaleExtent([(CelestialView.k/4), 240000]).on("zoom", starRedraw)
        StarSVG.call(StarZoom).on("dblclick.zoom", null)
    }
    NewStarScale = CelestialView.k
    StarView.k = CelestialView.k
    StarView.r = CelestialView.r
    StarProjection.scale(StarView.k)
    StarProjection.rotate(StarView.r)
    StarZoom.scale(CelestialView.k)

    ownerSelectSpan.style.visibility = "visible"
    beginTitle.style.visibility = "hidden"
    ownerSelectSpan.style.visibility = "visible"
    printButton.style.visibility = "visible"
    openChangeButton.style.visibility = "visible"
    openTimelineButton.style.visibility = "visible"
    openReferrerButton.style.visibility = "visible"

    placeDescriptionDiv.style.visibility = "visible"
    placeNameDiv.style.visibility = "visible"
    navTable.style.visibility = "visible"
    celestialContainerDiv.style.display = "none"
    starContainerDiv.style.display = "block"
    // zoomPresetDiv.style.visibility="visible"
    //zoomLevelDiv.style.visibility="visible"
    //raDecDiv.style.visibility="visible"
    startCursorLoc()
}

//--- close constellation----
function returnMyStar()
{

    if(BeginStar==true)
    {
        var cw = constellationCw
        //starClearButtonClicked()///---also clears chart---
        cw.starClearButton.disabled = true
        cw.placeNameValue.value = ""
        cw.beginMyStarButton.disabled = true
        cw.cancelMyStarButton.disabled = true
        cw.viewStarExoButton.disabled = true
        cw.exoplanetIncludeCheck.disabled = true
        cw.exoCntSpan.innerHTML = ""
        if(FoundIt==true)
        {

            primaryStarG.removeChild(PrimaryStar)
            PrimaryStarPath.style("display", "none")
            FoundIt = false

        }

    }

    beginTitle.style.visibility = "hidden"

    //  constellationCw.constellationSelect.selectedIndex = 0
    //  constellationLoad = false

    CelestialPreviewLoaded = false
    CelestialPreviewVis = false

    CelestialG.selectAll(".boundaryline")
    .attr("stroke", "#cc0")
    .style("display", "block")

    //---reset constellation---
    CentroidCelestial.attr("transform", null)
    EarthPathCelestial.attr("d", null)
    PrimaryStarCorona.style("display", null)
    PrimaryStarSurface.style("display", null)

    PrimaryStarG.selectAll("*").remove()
    ProperNameG.selectAll(".proper").style("display", null)
    CelestialG.selectAll(".boundarylineHilite").attr("class", "boundaryline")
    CelestialView.k = 1
    CelestialView.r =[0, 0, 0]
    CelestialProjection.scale(CelestialView.k)
    CelestialProjection.rotate(CelestialView.r)
    CelestialProjection.rotate([0.0, 0.0, 0.0]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale])
    projOutline.translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale]); //projected non moving outline
    CelestialOutline = d3.geo.path().projection(projOutline)
    CelestialZoom.projection(CelestialProjection).size([CelestialWidth, CelestialHeight]).center([CelestialWidth/2, CelestialHeight/2]).scaleExtent([CelestialScale, CelestialScale*100]).on("zoom.redraw", celestialRedraw);
    BeginStar = false
    loadStars = false
    ConStars = null
    celestialRedraw()
    if(MyStars==true)
    {
        celestialContainerDiv.style.display = "none"
        beginTitle.style.visibility = "hidden"
        measureDiv.style.visibility = "visible"
        placeDescriptionTable.style.visibility = "visible"
        placeDescriptionDiv.style.visibility = "visible"
        placeNameDiv.style.visibility = "visible"
        starContainerDiv.style.display = "block"
        StopCelestialZoom = true

        startCursorLoc()
        rotationValue.value = StarView.r[2].toFixed(2)
    }

}

var indexOf = function(needle)
{
    if(typeof Array.prototype.indexOf === 'function')
    {
        indexOf = Array.prototype.indexOf;
    }
    else
    {
        indexOf = function(needle)
        {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++)
            {
                if(this[i] === needle)
                {
                    index = i;
                    break;
                }
            }

            return index;
        };

    }

    return indexOf.call(this, needle);
};

/*
var myArray = [0,1,2],
    needle = 1,
    index = indexOf.call(myArray, needle); // 1


*/
var ConStars
var HostStarDoc
var HostXML
var ExoDoc
var ExoXML
var MyStarScale //---filled when new star map created---
var MyConBoundries
var ConVertice
var ConVerticePts
var StarsIDArray =[]
var MyStarSize
var StarCoordsArray =[]
var CentroidLL
var ExoplanetRotateArray =[]

var HZone = false

function getMyStars()
{
    loadAddedElems()
    loadAddedPaths()


    startCursorLoc()
    PlanetCoordsArray =[]
    StarCoordsArray =[]
    StarsIDArray =[]
    StarData =[]
    ExoplanetRotateArray =[]
    StopCelestialZoom = true
    HZone = false

    var xmlHostFile = "../DrawingLibrary/"+FOLDER+"/Host.xml"
    var loadHostXML = new XMLHttpRequest;
    loadHostXML.onload = callbackHost;
    loadHostXML.open("GET", xmlHostFile, true);
    loadHostXML.send();
    function callbackHost()
    {
        ExoplanetG.style("display", "block")
        OrbitG.style("display", "block")
        rotatePlanet = 0
        //---responseText---
        var xmlHostString = loadHostXML.responseText
        console.log(xmlHostString)
        //---DOMParser---
        var parser = new DOMParser();
        HostStarDoc = parser.parseFromString(xmlHostString, "text/xml").documentElement;

        PrimaryStarID = HostStarDoc.getAttribute("id")

        var coronaCircle = d3.geo.circle().angle(.000077).origin(PrimaryStarCoords)
        PrimaryStarCorona.datum(coronaCircle)
        .attr("d", StarMap)

        var solRad = +HostStarDoc.getAttribute("Radius")
        PrimaryStarSurface.attr("radius", solRad)
        if(solRad<.05)
            solRad = .05

            var solarDeg = (solRad*2)*0.000000000197 //---convert solar radius to degrees---

            var surfaceCircle = d3.geo.circle().angle(solarDeg).origin(PrimaryStarCoords)
            PrimaryStarSurface.datum(surfaceCircle)
            .attr("d", StarMap);

        PrimaryStarSurface.style("display", null)
        PrimaryStarCorona.style("display", null)

        PrimaryStarGraticule.datum(surfaceCircle)
        .attr("d", StarMap);
        //----habitable zone--------------
        var hzMin = +HostStarDoc.getAttribute("HabZoneMin")
        var hzMax = +HostStarDoc.getAttribute("HabZoneMax")

        var xmlExoFile = "../DrawingLibrary/"+FOLDER+"/Exo.xml"
        var loadExoXML = new XMLHttpRequest;
        loadExoXML.onload = callbackExo;
        loadExoXML.open("GET", xmlExoFile, true);
        loadExoXML.send();
        function callbackExo()
        {
            var rotateOffset = 45
            //---responseText---
            var xmlExoString = loadExoXML.responseText
            //---DOMParser---
            var parser = new DOMParser();
            ExoDoc = parser.parseFromString(xmlExoString, "text/xml").documentElement;

            ExoplanetRotateArray =[]
            MyExoplanet = true
            var primaryRD = PrimaryStarCoords //---y location of exos--
            var primaryRA = primaryRD[0]
            var primaryDEC = primaryRD[1]

            var starDia = parseFloat(PrimaryStarSurface.attr("radius"))*2
            var solarDeg = starDia*0.000000000197//---convert solar radius to degrees---
            // var starRadius= parseFloat(PrimaryStarSurface.attr("radius"))
            //var solarDeg = starRadius*0.000000000197//---convert solar radius to degrees---
            var exoElems = ExoDoc.childNodes
            ExoplanetG.style("display", "block")
            OrbitG.style("display", "block")

            for(var k = 0; k<exoElems.length; k++)
            {
                var exo = exoElems.item(k)
                var comp = exo.getAttribute("CompositionClass") //--fill color---
                var hab = exo.getAttribute("HabitableClass") //--fill color---
                var atmos = exo.getAttribute("AtmosphereClass") //--stroke color---
                var name = exo.getAttribute("Name") //--stroke color---
                var letterIndex = name.lastIndexOf(" ")
                var letter = name.charAt(letterIndex+1)
                //<EXOPLANETS><EXO id="exoplanet1538338800304" HostName="16 Cyg B" Name="16 Cyg B b" NameKepler="" NameKOI="" ZoneClass="Cold" MassClass="Jovian" CompositionClass="gas" AtmosphereClass="hydrogen-rich" HabitableClass="non-habitable" MinMass="534.14" Mass="534.14" MaxMass="" Radius="11.06" Density="0.39" Gravity="4.36" EscVel="6.95" SFluxMin=" 0.1183426" SFluxMean=" 0.4656991" SFluxMax="3.489002" TeqMin="149.4" TeqMean="187.6" TeqMax="348.2" TsMin="" TsMean="" TsMax="" SurfPress="210.6" Mag="-21.94" ApparSize="21.15" Period="799.50" SemMajorAxis="1.6800" Eccentricity="0.69" Inclination="" MeanDistance="1.22" Omega="83.4" HZD="1.15" HZC="7.17" HZA="7.16" HZI="0.09" SPH="" IntESI="0.00" SurfESI="0.00" ESI="0.39" HostHabCat="0" Habitable="0" HabMoon="0" Confirmed="1" Disc_Method="Radial Velocity" Disc_Year="1996.00"/></EXOPLANETS>
                //---add circle to ExoplanetG---
                var distAU = +exo.getAttribute("MeanDistance")

                var arcSecs = distAU
                var arcSecs2Deg = arcSecs* 0.000277778
                var exoRA = primaryRA-(arcSecs2Deg*4.84814e-6+solarDeg)

                var orbitDeg = arcSecs2Deg*4.84814e-6
                if(HZone==false)
                {

                    //------Habitable zone---------------------
                    var hzMinDeg = hzMin* 0.000277778*4.84814e-6
                    var hzMaxDeg = hzMax* 0.000277778*4.84814e-6
                    var hzCenterDeg = hzMinDeg+.5*hzMax
                    var hzMinPath = d3.geo.circle().angle(hzMinDeg+solarDeg).origin(PrimaryStarCoords)

                    var hzOrbitMin = OrbitG.append("path")
                    .attr("id", "hzMinPath")
                    .attr("class", "orbit")
                    .attr("stroke", "#1A773F")

                    .attr("stroke-width", ".5")
                    .attr("fill", "none")

                    hzOrbitMin.datum(hzMinPath)
                    .attr("d", StarMap);

                    var hzMaxPath = d3.geo.circle().angle(hzMaxDeg+solarDeg).origin(PrimaryStarCoords)
                    var hzOrbitMax = OrbitG.append("path")
                    .attr("id", "hzMaxPath")
                    .attr("class", "orbit")
                    .attr("stroke", "#1A773F")
                    .attr("stroke-width", ".5")
                    .attr("fill", "none")
                    hzOrbitMax.datum(hzMaxPath)
                    .attr("d", StarMap);

                    //====hz zone================
                    var minZoneD = hzOrbitMin.attr("d")
                    var maxZoneD = hzOrbitMax.attr("d")
                    var hzPathD = minZoneD+" "+maxZoneD

                    var hzPath = OrbitG.append("path")
                    .attr("id", "hzZonePath")
                    .attr("class", "hzZone")
                    .attr("stroke", "none")
                    .attr("fill", "#1A773F")
                    .attr("fill-opacity", ".1")
                    .attr("fill-rule", "evenodd")
                    .attr("name", "Habitable Zone")
                    .attr("onmouseover", "showStarName(evt)")
                    .attr("onmouseout", "hideStarName(evt)") .attr("d", hzPathD);

                    HZone = true

                }

                //var orbitPath = d3.geo.circle().angle(arcSecs2Deg).origin(PrimaryStarCoords)
                var eccentricity = +exo.getAttribute("Eccentricity")

                var orbitPath = d3.geo.circle().angle(orbitDeg+solarDeg).origin(PrimaryStarCoords)

                var orbit = OrbitG.append("path")
                .attr("id", "orbit"+k)
                .attr("class", "orbit")
                .attr("stroke-dasharray", "4 4")
                .attr("stroke", "black")
                .attr("stroke-width", "1")
                .attr("fill", "white")
                .attr("pointer-events", "none")
                .attr("fill-opacity", "0")

                orbit.datum(orbitPath)
                .attr("d", StarMap);

                //----planet----

                var ll =[exoRA, primaryDEC]
                var xy = StarProjection(ll)
                var x = xy[0]
                var y = xy[1]

                var c = StarProjection(PrimaryStarCoords)

                setOrbitPlanet(ll, name, atmos,comp, hab, letter, k, exoElems.length)
            }


        }

    }
}
var PlanetCoordsArray =[]
var rotatePlanet = 0
function setOrbitPlanet(ll, name, atmos,comp, hab, letter, k, qnty)
{

    var id = "planet"+k
    var fill = "#unknown"
    var stroke = "gainsboro"

    if(atmos=="no-atmosphere")stroke = "white"
        if(atmos=="metals-rich")stroke = "red"
        if(atmos=="hydrogen-rich")stroke = "blue"

        if(hab=="mesoplanet")fill = "url(#mesoplanet)"
        if(hab=="thermoplanet")fill = "url(#thermoplanet)"
        if(hab=="psychroplanet")fill = "url(#psychroplanet)"
        if(hab=="hypopsychroplanet")fill = "url(#hypopsychroplanet)"
        if(hab=="hyperthermoplanet")fill = "url(#hyperthermoplanet)"
        if(hab=="non-habitable")fill = "url(#non-habitable)"

        var xy = StarProjection(PrimaryStarCoords)
        var x = xy[0]
        var y = xy[1]

        var radius = 60/qnty
    var strokeWidth=12/qnty
        var exoCircle = PlanetG.append("circle")
        .attr("class", "exoCircle")
        .attr("id", id)
        .attr("r", radius)
        .attr("fill", fill)
        .attr("visibility", "hidden")
        .attr("stroke-width", strokeWidth)
        .attr("name", name+"<br><b>Atmoshpere:</b> "+atmos+"<br><b>Composition:</b> "+comp+"<br><b>Habitable:</b> "+hab)
        .attr("onmouseover", "showExoplanet(evt)")
        .attr("onmouseout", "hideExoplanet(evt)")
        .attr("stroke", stroke)

        /*
  var t3 = d3.transform(document.getElementById(id).getAttribute("transform"))
  var transX = t3.translate[0]
  var transY = t3.translate[1]
  circleLL = StarProjection.invert([transX, transY])
  ActiveScale = StarView.k/StarScale


  PlanetCoordsArray.push([circleLL, ActiveScale, id])
  //newPlanet(id)
  */

}

var PlanetsLoaded = false
function locatePlanets()
{
    console.log("locatePlanets")
    var planets = domPlanetG.childNodes

    var cnt = 0
    var orbitPaths = orbitG.childNodes

    for(var k = 0; k<orbitPaths.length; k++)
    {
        var path = orbitPaths.item(k)
        if(path.id.indexOf("orbit")!=-1)
        {
            var pathLength = path.getTotalLength()

            var lengthAtPoint = cnt*pathLength/8

            var Pnt = path.getPointAtLength(lengthAtPoint)

            var ll = StarProjection.invert([Pnt.x, Pnt.y])

            var planet = planets.item(cnt)
            planet.removeAttribute("visibility")
            planet.setAttribute("transform", StarPoint(ll)+"scale("+PlanetScale+")")

            PlanetCoordsArray.push(ll)
            cnt++
        }

    }

    PlanetsLoaded = true

    starRedraw()

}

var starColor =[]
starColor[0] = "#1f77b4"
starColor[1] = "#aec7e8"
starColor[2] = "#ff7f0e"
starColor[3] = "#ffbb78"
starColor[4] = "#2ca02c"
starColor[5] = "#98df8a"
starColor[6] = "#d62728"
starColor[7] = "#ff9896"
starColor[8] = "#9467bd"
starColor[9] = "#c5b0d5"
starColor[10] = "#8c564b"
starColor[11] = "#c49c94"
starColor[12] = "#e377c2"
starColor[13] = "#f7b6d2"
starColor[14] = "#7f7f7f"
starColor[15] = "#c7c7c7"
starColor[16] = "#bcbd22"
starColor[17] = "#dbdb8d"
starColor[18] = "#17becf"
starColor[19] = "#9edae5"
