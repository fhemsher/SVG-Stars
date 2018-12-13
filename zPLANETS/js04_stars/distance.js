//---click on elem or create new elem/symbol, open any Iframe------
function disableMeasure() //---iframeSelection.js closeAllIframes()---------
{
    measureDistanceCheck.checked = false
    ShowDistance = false
    commentDiv.style.visibility = "hidden"
    DistancePath.style("display", "none")
    DistanceDot.style("display", "none")
    DistancePath.attr("d", null)
    DistanceDot.attr("cx", null)
    DistanceDot.attr("cy", null)
    StopPlanetZoom = false
    measureTd.style.backgroundColor = ""

}

var PlantedRadius
function measureDistanceChecked()
{
    if(measureDistanceCheck.checked==true)
    {
        planetSVG.setAttribute("onclick", "showDistance(evt)")
        planetSVG.setAttribute("onmousemove", "trackDistance(evt)")

       StopPlanetZoom = true
    }
    else
    {
        planetSVG.removeAttribute("onclick")
        planetSVG.removeAttribute("onmousemove")
        ShowDistance = false
        commentDiv.style.visibility = "hidden"
        DistancePath.style("display", "none")
        DistanceDot.style("display", "none")
        DistancePath.attr("d", null)
        DistanceDot.attr("cx", null)
        DistanceDot.attr("cy", null)
        StopPlanetZoom = false
        
    }
}

function trackDistance(evt)
{

   if(ShowDistance==true)
   {
    var xy = PlanetProjection(StartDistLatLng)
    distancePath.setAttribute("d", "M"+xy[0]+" "+xy[1]+",L"+SVGx+" "+SVGy)
    DistanceDot.attr("cx", xy[0])
    DistanceDot.attr("cy", xy[1])

    var raStart = StartDistLatLng[0]
    if(raStart<0)
        raStart = raStart+360
        var decStart = StartDistLatLng[1]

        var latLng = PlanetProjection.invert([SVGx, SVGy])
        var ra = latLng[0]
        if(ra<0)
        ra = 360+ra
        var dec = latLng[1]

        var km= xyDist(xy, [SVGx,SVGy])
                if(!isNaN(km))
                {
                   commentDiv.innerHTML = "<img align=top src=../Images/violetDot.png width=12 height=12 > @: "+raStart.toFixed(3)+", "+decStart.toFixed(3)+"<br>"
                    commentDiv.innerHTML += "To: "+ra.toFixed(3)+", "+dec.toFixed(3)

    commentDiv.innerHTML += "<br>Distance (KM) = "+numberWithCommas(km)

                }





            commentDiv.style.visibility = "visible"
           commentDiv.style.top = evt.clientY+30+"px"
        commentDiv.style.left = evt.clientX+30+"px"
      }
}

   function Deg2Rad( deg ) {
       return deg * Math.PI / 180;
    }

   function Deg2Rad( deg ) {
       return deg * Math.PI / 180;
    }


function getGeoDistance(lonLat1,lonLat2)
{

var c = d3.geo.distance(lonLat1, lonLat2)  // 0.17453292519943306 radians
  var R = 6371*PlanetRadius
  var d = R * c;
        return d.toFixed(0)
}

    function getDistanceKM(lat1,lon1,lat2,lon2)
    {
        lat1=Deg2Rad(lat1)
        lon1=Deg2Rad(lon1)
        lat2=Deg2Rad(lat2)
        lon2=Deg2Rad(lon2)
        latDiff = lat2-lat1;
        lonDiff = lon2-lon1;
        var R = 6371*PlanetRadius; // kmetres


        var a = Math.sin(latDiff/2) * Math.sin(latDiff/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(lonDiff/2) * Math.sin(lonDiff/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return d.toFixed(0)

    }
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcHaversine(lat1, lon1, lat2, lon2)
    {
      var R = 6371*PlanetRadius; // kmetres ; // km
      var dLat = Deg2Rad(lat2-lat1);
      var dLon = Deg2Rad(lon2-lon1);
      var lat1 = Deg2Rad(lat1);
      var lat2 = Deg2Rad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
       return d.toFixed(0)
    }

    // Converts numeric degrees to radians
    function toRad(Value)
    {
        return Value * Math.PI / 180;
    }

function haversine(coord1, coord2)
{


   // Coordinates in decimal degrees (e.g. 2.89078, 12.79797)

   var lon1=coord1[0]
   var lat1=coord1[1]
   var lon2=coord2[0]
   var lat2=coord2[1]



   var R = 6371*PlanetRadius;
   var phi_1 = Deg2Rad(lat1)
   var phi_2 = Deg2Rad(lat2)

    var delta_phi = Deg2Rad(lat2 - lat1)
    var delta_lambda = Deg2Rad(lon2 - lon1)

    var a = Math.sin(delta_phi / 2.0) * 2 + Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(delta_lambda / 2.0) * 2

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))


     var d = R * c;
        return d.toFixed(0)

}

//---click within primary star zone---
var ShowDistance = false
var StartDistLatLng
function showDistance(evt)
{
    if(ShowDistance==false)
    {
              commentDiv.style.visibility = "visible"

        StartDistLatLng = PlanetProjection.invert([SVGx, SVGy])
        ShowDistance = true
        DistancePath.style("display", "block")
        DistanceDot.style("display", "block")
        StopPlanetZoom = true
    }
    else
    {
        //---hide path---

        ShowDistance = false
        commentDiv.style.visibility = "hidden"
        DistancePath.style("display", "none")
        DistanceDot.style("display", "none")
        DistancePath.attr("d", null)
        DistanceDot.attr("cx", null)
        DistanceDot.attr("cy", null)
        StopPlanetZoom = false
    }

}

//---distance in km---
function xyDist(xy1, xy2)
{
    var latLng1 = PlanetProjection.invert(xy1)
    var latLng2 = PlanetProjection.invert(xy2)
    var lat1=latLng1[0]
    var lon1=latLng1[1]
    var lat2=latLng2[0]
    var lon2=latLng2[1]

    return getDistanceKM(lat1,lon1,lat2,lon2)
}
function llDist(ll1, ll2)
{
    var lat1=ll1[0]
    var lon1=ll1[1]
    var lat2=ll2[0]
    var lon2=ll2[1]

    return getDistanceKM(lat1,lon1,lat2,lon2)
}

function starDistanceMeasureChecked()
{
    if(starDistanceMeasureCheck.checked==true)
    {
        for (var k = 1; k<universeCircleG.childNodes.length; k++)
        {

            universeCircleG.childNodes.item(k).setAttribute("onclick", "measureDistance(evt)")

        }
    }
    else
    {

        for (var k = 1; k<universeCircleG.childNodes.length; k++)
        {

            universeCircleG.childNodes.item(k).removeAttribute("onclick")

        }

    }

    starDistanceMeasureValue.value = ""
}

var StartMeasure = false


//---between points---

/*
 Spherical coordinates equatorial geocentric:

 Ecliptic/Geocentric
  ecliptic longitude(Right Ascension) is measured positive eastwards in the fundamental plane (the ecliptic) from 0° to 360°
  Ecliptic latitude or celestial latitude (geocentric \beta),
  Distance ?
Summary of notation for ecliptic coordinates[5]
Spherical Rectangular
Longitude Latitude Distance
Geocentric ? ß ?
Heliocentric l b r x, y, z[note 1]

Ecliptic longitude or celestial longitude (symbols:  geocentric \lambda) measures the angular distance of an object along the ecliptic from the primary direction. Like right ascension in the equatorial coordinate system, the primary direction (0° ecliptic longitude) points from the Earth towards the Sun at the vernal equinox of the Northern Hemisphere. Because it is a right-handed system, ecliptic longitude is measured positive eastwards in the fundamental plane (the ecliptic) from 0° to 360°.

Ecliptic latitude or celestial latitude (symbols: heliocentric b, geocentric \beta), measures the angular distance of an object from the ecliptic towards the north (positive) or south (negative) ecliptic pole. For example, the north ecliptic pole has a celestial latitude of +90°.

Distance is also necessary for a complete spherical position (symbols: heliocentric r, geocentric \mathit\Delta). Different distance units are used for different objects. Within the Solar System, astronomical units are used, and for objects near the Earth, Earth radii or kilometers are used.



*/
   //---not used---
function getUnivPathLength(pathId)
{

    var uRadiusLy = 46.6*1000000000 //----radius of universe in billions of ly---
    /*      var uDiaLy=2*uRadiusLy
   var uAreaLy=Math.PI*uRadiusLy*uRadiusLy
   var celestialRadiusPx=Celestial.dia/2
   var uAreaPx=Math.PI*celestialRadiusPx*celestialRadiusPx


 var lyPerPx=(uAreaLy/uAreaPx)
 var scaleFactor=Celestial.scale/View.k
 */

    var pathLenPx = pathId.getTotalLength()
    //var startLenPx=pathLenPx*scaleFactor
    //var pathLenLy=startLenPx*lyPerPx
    var pathPntBegin = pathId.getPointAtLength(0)
    var pathPntEnd = pathId.getPointAtLength(pathLenPx)
    var x1 = pathPntBegin.x
    var y1 = pathPntBegin.y
    var x2 = pathPntEnd.x
    var y2 = pathPntEnd.y
    var lonLat1 = Celestial.mapProjection.invert([x1, y1])
    var lonLat2 = Celestial.mapProjection.invert([x2, y2])
    var lon1 = lonLat1[0]
    var lat1 = lonLat1[1]
    var lon2 = lonLat2[0]
    var lat2 = lonLat2[1]

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }

    //  area=      41253 square degrees.

    var R = 41253
    //has a problem with the .toRad() method below.
    var dx1 = lat2-lat1;
    var dLat = dx1.toRad();
    var dx2 = lon2-lon1;
    var dLon = dx2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; //---billion ly---

}
//---Parallex length of a line using arcseconds between 2 point's Declination, earth as reference point----
function getParallexDist(dist, pnt1Dec, pnt1Ra, pnt2Dec, pnt2Ra)
{
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }

    //----interior angle between star and point---
    //---known dist1(ly) from a point1 to earth---
    var distC = dist// /3.26163344   //---ly--
    var angleA = Math.abs(pnt1Dec-pnt2Dec)
    var Arad = angleA.toRad()
    var angleC = Math.abs(pnt1Ra-pnt2Ra)
    var Crad = angleC.toRad()
    var angleB = 180-angleA-angleC
    var Brad = angleB.toRad()

    var distA = Math.abs((distC*Math.sin(Arad))/Math.sin(Crad)) //---star to centroid--
    var distB = Math.abs((distC*Math.sin(Brad))/Math.sin(Crad)) //---earth to Centroid--

    return {dist0: distA, dist1: distB}

}

function findPointDistance(pnt1LL, pnt2LL)
{

    var distRad = d3.geo.distance([sunRA, sunDec], CentroidLL)

    // 1 au = 0.000015812281999789 ly
    // Dau = 1 AU / Math.tan(distRad)
    var Dly = Math.tan(distRad)/0.000015812281999789

}

//---between stars---
function findStarDistance(r1, ra1Deg, dec1Deg, r2, ra2Deg, dec2Deg)
{
    var d2r = 0.0174532925 //---degree to radians---
    if(ra1Deg<0)
        ra1Deg = 360+ra1Deg

        if(ra2Deg<0)
        ra2Deg = 360+ra2Deg
        var ra1Rad = ra1Deg*d2r
        var dec1Rad = dec1Deg*d2r
        var ra2Rad = ra2Deg*d2r
        var dec2Rad = dec2Deg*d2r

        var x1 = r1*Math.cos(ra1Rad)*Math.cos(dec1Rad)
        var y1 = r1*Math.sin(ra1Rad)*Math.cos(dec1Rad)
        var z1 = r1*Math.sin(dec1Rad)

        var x2 = r2*Math.cos(ra2Rad)*Math.cos(dec2Rad)
        var y2 = r2*Math.sin(ra2Rad)*Math.cos(dec2Rad)
        var z2 = r2*Math.sin(dec2Rad)

        var d = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1))
        return d
}