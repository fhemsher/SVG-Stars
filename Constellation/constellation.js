
//---init Celestial Map, preload ----
function loadConstellations()
{
    d3.json("../Constellation/constellations.js", function(error, json)
        {
            CelestialG.selectAll(".constnames")
            .data(json.features)
            .enter().append("text")
            .attr("class", "constname")
            .attr("transform", function(d, i) {return CelestialPoint(d.geometry.coordinates);})
            .text(function(d) {return d.properties.name;})
        }
    );
    d3.json("../Constellation/constellations.bounds.js", function(error, json)
        {
            CelestialG.selectAll(".boundaryline")
            .data(json.features)
            .enter().append("path")
            .attr("class", "boundaryline")
            .attr("stroke", "#cc0")
            .attr("id", function(d, i) {return d.id})
            .attr("d", CelestialMap);
        }
    );

}
//---Host Star Constellation--------
function loadHostConsellation() //---see showStar.js---
{
            var file = "../Constellation/"+SelectedCon+".js"
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
}


function showHostStarConstellation()  //---previewHostStar.js---
{

        constellationZoom()
      hiliteMapCon(SelectedCon)

     celestialContainerDiv.style.width = "100%"
                celestialContainerDiv.style.height = "100%"
                celestialContainerDiv.style.left = "-10px"
                celestialContainerDiv.style.top = "0px"

        setTimeout(showHostStarBox,1000)
}


function showHostStarBox()
{


        var tf=d3.transform(hostStar.getAttribute("transform"))
                        var transX=tf.translate[0]
                        var transY=tf.translate[1]
                        PrimaryStarLL =CelestialProjection.invert([transX, transY])







                        starWrapper.appendChild(hostStar)
                        var bb = starWrapper.getBBox()
                        hostStarG.appendChild(hostStar)
                               /*
                               //---center of primary star---
                                            PrimaryStarG.append("circle")
                                                .attr("id","goldDot")
                                                .attr("class","star")
                                                .attr("pointer-events","none")
                                                .attr("r",".01")
                                                .attr("fill","red")
                                                .attr("stroke","gold")
                                                .attr("stroke-width","0.005")
                                                //.attr("transform",PrimaryStar.getAttribute("transform"))

                                */




                        var bbx = bb.x
                        var bby = bb.y
                        var bbw = bb.width
                        var bbh = bb.height
                        x0 = bbx-3
                        y0 = bby-3
                        x1 = x0
                        y1 = y0+6+bbh
                        x2 = x0+6+bbw
                        y2 = y1
                        x3 = x2
                        y3 = y0
                        var ll0 = CelestialProjection.invert([x0, y0])
                        var ll1 = CelestialProjection.invert([x1, y1])
                        var ll2 = CelestialProjection.invert([x2, y2])
                        var ll3 = CelestialProjection.invert([x3, y3])
                        var ll4 = ll0
                        PrimaryStarBoundryCoords =[ll0, ll1, ll2, ll3, ll4]

                        PrimaryStarPath.datum({type: "LineString", coordinates: PrimaryStarBoundryCoords})
                        .attr("d", CelestialMap)
                        PrimaryStarPath.style("display","block")


    connectEarthLine()













}









//================Found Constellation Stars===============
/*
Fields FoundStarsJson:

id: The database primary key.
hip: The star's ID in the Hipparcos catalog, if known.
hd: The star's ID in the Henry Draper catalog, if known.
hr: The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog.
gl: The star's ID in the third edition of the Gliese Catalog of Nearby Stars.
bf: The Bayer / Flamsteed designation, primarily from the Fifth Edition of the Yale Bright Star Catalog. This is a combination of the two designations. The Flamsteed number, if present, is given first; then a three-letter abbreviation for the Bayer Greek letter; the Bayer superscript number, if present; and finally, the three-letter constellation abbreviation. Thus Alpha Andromedae has the field value "21Alp And", and Kappa1 Sculptoris (no Flamsteed number) has "Kap1Scl".
ra, dec: The star's right ascension and declination, for epoch and equinox 2000.0.
proper: A common name for the star, such as "Barnard's Star" or "Sirius". I have taken these names primarily from the Hipparcos project's web site, which lists representative names for the 150 brightest stars and many of the 150 closest stars. I have added a few names to this list. Most of the additions are designations from catalogs mostly now forgotten (e.g., Lalande, Groombridge, and Gould ["G."]) except for certain nearby stars which are still best known by these designations.
dist: The star's distance in parsecs, the most common unit in astrometry. To convert parsecs to light years, multiply by 3.262. A value >= 10000000 indicates missing or dubious (e.g., negative) parallax data in Hipparcos.
pmra, pmdec: The star's proper motion in right ascension and declination, in milliarcseconds per year.
rv: The star's radial velocity in km/sec, where known.
mag: The star's apparent visual magnitude.
absmag: The star's absolute visual magnitude (its apparent magnitude from a distance of 10 parsecs).
spect: The star's spectral type, if known.
ci: The star's color index (blue magnitude - visual magnitude), where known.
x,y,z: The Cartesian coordinates of the star, in a system based on the equatorial coordinates as seen from Earth. +X is in the direction of the vernal equinox (at epoch 2000), +Z towards the north celestial pole, and +Y in the direction of R.A. 6 hours, declination 0 degrees.
vx,vy,vz: The Cartesian velocity components of the star, in the same coordinate system described immediately above. They are determined from the proper motion and the radial velocity (when known). The velocity unit is parsecs per year; these are small values (around 1 millionth of a parsec per year), but they enormously simplify calculations using parsecs as base units for celestial mapping.
rarad, decrad, pmrarad, prdecrad: The positions in radians, and proper motions in radians per year.
bayer: The Bayer designation as a distinct value
flam: The Flamsteed number as a distinct value
con: The standard constellation abbreviation
comp, comp_primary, base: Identifies a star in a multiple star system. comp = ID of search star, comp_primary = ID of primary star for this component, and base = catalog ID or name for this multi-star system. Currently only used for Gliese stars.
lum: Star's luminosity as a multiple of Solar luminosity.
var: Star's standard variable star designation, when known.
var_min, var_max: Star's approximate magnitude range, for variables. This value is based on the Hp magnitudes for the range in the original Hipparcos catalog, adjusted to the V magnitude scale to match the "mag" field.

*/

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'constellationsJSON.js', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
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

var Xnt = 0
var ConStars = null
var ConStarsLoaded = false
var SearchCon
var AllSearchStars//---loaded at starup---
function constellationSelected()
{
    FoundAll=false
    var cw = constellationCw
                //cw.starPrimaryNumberValue.style.backgroundColor = "honeydew"
    CelestialSearchG.selectAll(".search").remove("*")

    clearPreviewDatabaseTable()

    if(celestialSearchLoad==true)
        resetCelestialSearch()

        CelestialSearchG.style("display", "none")

        beginTitle.style.visibility = "hidden"
               // cw.starPrimaryNumberValue.value = ""
               // cw.starSecondaryNumberValue.value = "HD12345,HIP7654,HD5432...etc."
        cw.notFoundStarSpan.innerHTML = ""
        cw.includeTr.style.backgroundColor = "white"
                //cw.starPrimaryNumberValue.disabled = false
                //cw.starPrimaryNumberValue.focus()
                //cw.starSecondaryNumberValue.disabled = false
        cw.addStarButton.disabled = false
        cw.placeNameValue.value=""
         cw.exoplanetIncludeCheck.checked=false
        cw.exoplanetIncludeCheck.disabled=true
        cw.exoCntSpan.innerHTML=""


        // celestialSearch.conCodeDiv.style.display="none"
        CelestialPreviewLoaded = false
        ConStars = null
        ConStarsLoaded = false
        CentroidCelestial.style("display", "block")
        var con = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].text.split(" (")[0]
        var conId = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value
        SearchCon = conId
     if(SearchCon!="All")
    {
        var file = "../Constellation/"+con+".js"
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
                ConStars = JSON.parse(response);
                ConStarsLoaded = false
                constellationZoom()
                hiliteMapCon(SearchCon)

                celestialPreviewLoad(SearchCon) //----celestialSearch.js---

                constellationCw.goToSearchImg.src = "../About/Images/goToSearchArrow.png"
                constellationCw.constellationStarSizeSelect.disabled = false

                constellationCw.includeTr.style.backgroundColor = "white"
                            //constellationCw.starPrimaryNumberValue.disabled = false
                            //constellationCw.starSecondaryNumberValue.disabled = false

                celestialContainerDiv.style.width = "100%"
                celestialContainerDiv.style.height = "100%"
                celestialContainerDiv.style.left = "-10px"
                celestialContainerDiv.style.top = "0px"

            }
        )

    }
    else
    {

        CelestialView.k = 1
        CelestialView.r =[0, 0, 0]
        CelestialProjection.scale(CelestialView.k)
        CelestialProjection.rotate(CelestialView.r)
        CelestialProjection.rotate([0.0, 0.0, 0.0]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale])
        CelestialZoom.projection(CelestialProjection).size([CelestialWidth, CelestialHeight]).center([CelestialWidth/2, CelestialHeight/2]).scaleExtent([CelestialScale, CelestialScale*500]);

        ProperNameG.selectAll(".proper").style("display", null)
        PrimaryStarPath.attr("d", null)

        EarthPathCelestial.attr("d", null)
        CentroidCelestial.style("display", "none")
        CelestialG.selectAll(".constname").style("display", "block")
        CelestialG.selectAll(".boundaryline").style("display", "block")
        .attr("stroke", "lime")
        CelestialG.selectAll(".gridline").style("display", "block")

        BeginStar = false

        celestialRedraw()

        constellationCw.celestialSearchButton.disabled = false
        constellationCw.goToSearchImg.src = "../About/Images/goToSearchArrow.png"
    }

}

////////////////hilight selected constellation///////////////////////
var Constell
function hiliteMapCon(conId)
{
    CelestialG.selectAll(".boundaryline")
    .style("display", "none")

    if(conId=="Ser")
    {
        document.getElementById("SerC").setAttribute("stroke", "lime")
        document.getElementById("SerC").style.display = "block"
        document.getElementById("SerG").setAttribute("stroke", "lime")
        document.getElementById("SerG").style.display = "block"

    }
    else
    {
        document.getElementById(conId).setAttribute("stroke", "lime")
        document.getElementById(conId).style.display = "block"
    }

   // var cw = constellationCw
   // cw.constellationSelect.disabled = false
   // cw.constellationSelect.blur()

   // BeginStar = true

}
function hideHighlightCon()
{


    if(SelectedCon=="Ser")
    {
        document.getElementById("SerC").removeAttribute("stroke")
     document.getElementById("SerC").style.display = "none"
        document.getElementById("SerG").removeAttribute("stroke")
      document.getElementById("SerG").style.display = "block"

    }
    else
    {
        document.getElementById(SelectedCon).removeAttribute("stroke")
        document.getElementById(SelectedCon).style.display = "none"
    }

   // var cw = constellationCw
   // cw.constellationSelect.disabled = false
   // cw.constellationSelect.blur()

  //  BeginStar = false

}
function addStarButtonClicked()
{
    var cw = constellationCw

    cw.addStarButton.style.color="blue"
    cw.addStarButton.innerHTML="loading..."



    setTimeout(findPrimaryStar,200)

}

 //--not used---
function starNamePrefixSelected()
{


    var cw = constellationCw
    var reDash=/-/
    var reSpace=/ /
    var found = false


    if(cw.starNamePrefixSelect.selectedIndex!=0)
    {
        var findMyStarPrefix = cw.starNamePrefixSelect.options[cw.starNamePrefixSelect.selectedIndex].text.toLowerCase()
        var findMyStarId = cw.starNameIdFormatValue.value.toLowerCase()
        var findMyStarName=findMyStarPrefix+findMyStarId+"/"
             FindPrimaryStarRealName=cw.starNamePrefixSelect.options[cw.starNamePrefixSelect.selectedIndex].text+cw.starNameIdFormatValue.value
    }
     else
     {
        var findMyStarName=cw.starNameLongValue.value.toLowerCase()+"/"

        if(findMyStarName.indexOf("-")<5)
        findMyStarName=findMyStarName.replace(reDash,"")
        findMyStarName=findMyStarName.replace(reSpace,"")
         FindPrimaryStarRealName=cw.starNameLongValue.value

     }

    FindPrimaryStarName=findMyStarName

}



//var  FoundStarsJson=[{"type":"FeatureCollection","features":[]}]
var SearchJson =[]
var jsonCnt = 0
var FoundIt = false
 var FindPrimaryStarName
 var FindPrimaryStarRealName
 var Registered4Me=false


function findPrimaryStar()
{




Registered4Me=false
    FoundIt = false
    var cw = constellationCw
    cw.name4MeValue.disabled=false
    SearchCon = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value

    celestialPreviewLoad(SearchCon)

    //AppendConSearchStars[SearchCon] = {"type": "FeatureCollection", "features":[]}
    //FoundStarsJson=[{"type":"FeatureCollection","features":[]}]
    //jsonCnt = 0
    //SearchJson = PreviewJson.slice(0);
       cw.exoCntSpan.innerHTML=""
        IncludeExos=false
    cw.exoplanetIncludeCheck.checked=false
    cw.exoplanetIncludeCheck.disabled=true


     var reDash=/-/
    var reSpace=/ /


    if(cw.starNamePrefixSelect.selectedIndex!=0)
    {
        var findMyStarPrefix = cw.starNamePrefixSelect.options[cw.starNamePrefixSelect.selectedIndex].text.toLowerCase()
        var findMyStarId = cw.starNameIdFormatValue.value.toLowerCase()
        var findMyStarName=findMyStarPrefix+findMyStarId+"/"
             FindPrimaryStarRealName=cw.starNamePrefixSelect.options[cw.starNamePrefixSelect.selectedIndex].text+" "+cw.starNameIdFormatValue.value
    }
     else
     {
        var findMyStarName=cw.starNameLongValue.value.toLowerCase()+"/"

        if(findMyStarName.indexOf("-")<5)
        findMyStarName=findMyStarName.replace(reDash,"")
        findMyStarName=findMyStarName.replace(reSpace,"")
         FindPrimaryStarRealName=cw.starNameLongValue.value

     }

    FindPrimaryStarName=findMyStarName

     if(FindPrimaryStarName.indexOf("4me")!=-1)
     {    var re4=/4me/
          names4Me=XMLDoc4MeNames.childNodes
          for(var k=0;k<names4Me.length;k++)
          {
             var elem=names4Me.item(k)
             var myName=elem.getAttribute("name4ME")
                myName=myName.toLowerCase()+"/"
                if(myName==FindPrimaryStarName.replace(re4,""))
                {   FindPrimaryStarRealName=elem.getAttribute("name")
                   FindPrimaryStarName=elem.getAttribute("name").toLowerCase()+"/"
                    cw.name4MeValue.value=xml2txt(elem.getAttribute("name4ME"))
                    cw.name4MeValue.disabled=true
                    Registered4Me=true
                }
          }

     }

    var file = "../Constellation/AllConStars.js"
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
        var conStars = JSON.parse(response);
        //---append _newStarsData.xml---
        var addedDataStars=StarsDataAddedDocXML.childNodes
        for(var j=0;j<addedDataStars.length;j++)
        {
            var addXml=addedDataStars.item(j)
            var id=addXml.getAttribute("id")
            var con=addXml.getAttribute("con")
            var name=addXml.getAttribute("name")
            addJson={"id":id,"con": con, "name":name }
            conStars.push(addJson)
        }

        for(j = 0; j<conStars.length; j++)
        {
            var star = conStars[j]


            var name=star.name+"/"
            if(name.indexOf("-")<5)
            name=name.replace(reDash,"")
            if(name.indexOf(" ")<5)
            name=name.replace(reSpace,"")
            name=name.toLowerCase()

            if(name.indexOf(FindPrimaryStarName)!=-1 )
            {
                //---get file name---
                var myCon = star.con
                if(myCon==SearchCon)
                {      var cw = constellationCw
                    FoundIt=true
                        star.primary = star.id
                        //PrimaryStarID = "star"+star.id
                        PrimaryStarID = star.id
                        cw.placeNameValue.value=FindPrimaryStarRealName
                        cw.notFoundStarSpan.innerHTML=""
                        var me=document.getElementById("search"+star.id)
                        PrimaryStar=me.cloneNode(true)
                        PrimaryStar.setAttribute("id","star"+PrimaryStarID)
                        PrimaryStar.setAttribute("r",.5)
                        PrimaryStar.setAttribute("fill","#9966CC")
                        PrimaryStar.setAttribute("class","star")
                        PrimaryStar.setAttribute("onmouseover", "showStarName(evt);scrollDataTo(evt)")
                        PrimaryStar.setAttribute("onmouseout", "hideStarName(evt)")
                        PrimaryStar.removeAttribute("onclick")

                        ProperNameG.selectAll(".proper").style("display", "none")

                        starSizeDiv.style.visibility = "visible"

                        CelestialSearchG.style("display", "none")

                        var tf=d3.transform(PrimaryStar.getAttribute("transform"))
                        var transX=tf.translate[0]
                        var transY=tf.translate[1]
                        PrimaryStarLL =CelestialProjection.invert([transX, transY])

                        NewStarScale = CelestialView.k
                        ConStarsLoaded = true
                        //PrimaryStar.setAttribute("transform", CelestialPoint(PrimaryStarLL)+"scale("+(CelestialView.k/CelestialScale)+")") //;


                        primaryStarG.appendChild(PrimaryStar)





                        starWrapper.appendChild(PrimaryStar)
                        var bb = starWrapper.getBBox()
                        primaryStarG.appendChild(PrimaryStar)

                               //---center of primary star---
                                            PrimaryStarG.append("circle")
                                                .attr("id","goldDot")
                                                .attr("class","star")
                                                .attr("pointer-events","none")
                                                .attr("r",".01")
                                                .attr("fill","red")
                                                .attr("stroke","gold")
                                                .attr("stroke-width","0.005")
                                                //.attr("transform",PrimaryStar.getAttribute("transform"))






                        var bbx = bb.x
                        var bby = bb.y
                        var bbw = bb.width
                        var bbh = bb.height
                        x0 = bbx-3
                        y0 = bby-3
                        x1 = x0
                        y1 = y0+6+bbh
                        x2 = x0+6+bbw
                        y2 = y1
                        x3 = x2
                        y3 = y0
                        var ll0 = CelestialProjection.invert([x0, y0])
                        var ll1 = CelestialProjection.invert([x1, y1])
                        var ll2 = CelestialProjection.invert([x2, y2])
                        var ll3 = CelestialProjection.invert([x3, y3])
                        var ll4 = ll0
                        PrimaryStarBoundryCoords =[ll0, ll1, ll2, ll3, ll4]

                        PrimaryStarPath.datum({type: "LineString", coordinates: PrimaryStarBoundryCoords})
                        .attr("d", CelestialMap)
                        PrimaryStarPath.style("display","block")

                        connectEarthLine()
                        var primaryStng=new XMLSerializer().serializeToString(PrimaryStar)
                        //console.log(primaryStng)
                            if(CelestialView.k>1||CelestialPreviewLoaded==true)
                             setTimeout(celestialRedraw, 500)
                        cw.beginMyStarButton.disabled=false
                        cw.cancelMyStarButton.disabled=false
                        cw.starClearButton.disabled=false
                        cw.updatedExosDiv.innerHTML="&nbsp;"
                        cw.viewStarExoButton.disabled=false
                        break
                }

            }




        }
           var cw = constellationCw
        if(FoundIt==false)
        {
              cw.notFoundStarSpan.innerHTML = "Retry - Not Found:"+FindPrimaryStarRealName
        }
        else
        {

          primaryStarExo()
              var cw = constellationCw
         cw.addStarButton.disabled=true


        }
             var cw = constellationCw
         cw.addStarButton.style.color=""
        cw.addStarButton.innerHTML="Wiki This Star"

    })
}

var PrimaryStarLL
function connectEarthLine()
{

        EarthPathCelestial.datum({type: "LineString", coordinates:[[0, 0], PrimaryStarLL]})
        .attr("d", CelestialMap)
}

//----hide all constellations except searched---
function clearUniv()
{
    var cw = constellationCw
    var conId = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value

    var elems = celestialG.childNodes
    for(var k = 0; k<elems.length; k++)
    {
        var elem = elems.item(k)
        var myClass = elem.getAttribute("class")
        var myId = elem.getAttribute("id")
        var myName = elem.getAttribute("name")
        if(myClass=="constname")
            elem.style.display = "none"
            else if(myClass=="boundaryline")
                elem.style.display = "none"
                else if(myClass!="gridline"&&myId!="celestialOutline")
                    elem.style.display = "none"
    }
}
//---clear button----
//---return the constellation's stars---
function starClearButtonClicked()
{
  if(constellationViz==true)
  {
     var cw = constellationCw

       ProperNameG.selectAll(".proper").style("display", "block")

                        starSizeDiv.style.visibility = "hidden"

                        CelestialSearchG.style("display", "block")
      //---return earth-centroid line---
      EarthPathCelestial.datum({type: "LineString", coordinates:[[0, 0], CentroidConLL]})
    primaryStarG.removeChild(PrimaryStar)
    primaryStarG.removeChild(document.getElementById("goldDot"))
      PrimaryStarPath.style("display","none")
      FoundIt=false
      cw.starClearButton.disabled=true
       cw.addStarButton.disabled=false
      cw.updatedExosDiv.innerHTML=""
          cw.placeNameValue.value=""
      cw.beginMyStarButton.disabled=true
     cw.cancelMyStarButton.disabled=true
     cw.viewStarExoButton.disabled=true
        cw.exoplanetIncludeCheck.disabled=true
         cw.viewStarExoButton.disabled=true
       cw.exoCntSpan.innerHTML=""
    celestialRedraw()
  }

 /*

    var cw = constellationCw

     cw.placeNameValue.value=""
    starSizeDiv.style.visibility = "hidden"
    showDatabaseTableCheck.checked = false

    celestialContainerDiv.style.width = "60%"
    celestialContainerDiv.style.height = "60%"
    celestialContainerDiv.style.left = "35%"
    celestialContainerDiv.style.top = "15%"
    CelestialView.k = 1
    CelestialView.r =[0, 0, 0]
    CelestialProjection.scale(CelestialView.k)
    CelestialProjection.rotate(CelestialView.r)
    CelestialProjection.rotate([0.0, 0.0, 0.0]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale])
    CelestialZoom.projection(CelestialProjection).size([CelestialWidth, CelestialHeight]).center([CelestialWidth/2, CelestialHeight/2]).scaleExtent([CelestialScale, CelestialScale*500]);

    BeginStar = false
    celestialRedraw()

    if(FoundIt==true)
    {

        cw.notFoundStarSpan.innerHTML = ""
        cw.starPrimaryNumberValue.value = ""
        cw.starPrimaryNumberValue.style.backgroundColor = ""
        cw.starSecondaryNumberValue.value = "HD12345,HIP7654,HD5432...etc."
        cw.secondaryStarCntSpan.innerHTML = ""
        cw.constellationSelect.selectedIndex = 0
        starSizeDiv.style.visibility = "hidden"
        showDatabaseTableCheck.checked = false

        elems = starNewG.childNodes
        if(elems.length>0)
        {
            for(var k = elems.length-1; k>=0; k--)
            {
                var elem = elems.item(k)
                starNewG.removeChild(elem)
            }

            CelestialSearchG.selectAll(".search").remove("*")
            ProperNameG.selectAll(".proper").style("display", null)
            PrimaryStarPath.attr("d", null)

            EarthPathCelestial.attr("d", null)
            CentroidCelestial.style("display", "none")
            CelestialG.selectAll(".constname").style("display", "block")
            CelestialG.selectAll(".boundaryline").style("display", "block")
            .attr("stroke", "#cc0")
            CelestialG.selectAll(".gridline").style("display", "block")
            beginStarDataDiv.innerHTML = ""
            BeginDatabaseTableWritten = false
            beginStarDataDiv.style.visibility = "hidden"
            showDatabaseTableCheck.checked = false
            starSizeDiv.visibility = "hidden"
            BeginStarData =[]

            cw.starPrimaryNumberValue.style.backgroundColor = "honeydew"
            cw.starPrimaryNumberValue.value = ""
            cw.starSecondaryNumberValue.value = "HD12345,HIP7654,HD5432...etc."
            cw.secondaryStarCntSpan.innerHTML = ""

            cw.includeTr.style.backgroundColor = "gainsboro"
            cw.starPrimaryNumberValue.disabled = false
            cw.starSecondaryNumberValue.disabled = false

            cw.beginMyStarButton.disabled = true
            cw.cancelMyStarButton.disabled = true
            cw.constellationSelect.disabled = false
            cw.starClearButton.disabled = true
            cw.addStarButton.disabled = true
            CelestialSearchG.selectAll(".search")
            .attr("opacity", null)
            .attr("stroke", null)
            .attr("stroke-width", null)

        }
        clearBubbleChart()
        cw.celestialSearchButton.disabled = true
        constellationCw.goToSearchImg.src = "../About/Images/goToSearchDisabled.png"
        ConStarsLoaded = false
    }
    else //---not found---
    {

    }
   */
}

//----remove a found star---
//---double click on star---
function removeStar(evt)
{
    var target = evt.target
    var loc = target.getAttribute("loc")

    starNewG.removeChild(target)
    //---remove from---
    var obj = AppendConSearchStars[SearchCon].features

    for(var k in obj)
    {
        if(obj[k].properties.id==loc)
        {
            AppendConSearchStars[SearchCon].features.splice(k, 1)
            BeginStarData.splice(k, 1) //---remove from starData---
            //---remove from data tables---
            if(BeginDatabaseTableWritten==true)
            {
                var removeTable = document.getElementById("dataTable"+loc)
                beginStarDataDiv.removeChild(removeTable)
                //---delete 1 from found count---

            }
            if(beginStarDataDiv.childNodes.length==0)
            {
                BeginDatabaseTableWritten = false
                showDatabaseTableCheck.checked = false
                beginStarDataDiv.style.visibility = "hidden"

            }

            break;
        }

    }
}

//===================BEGIN MY STAR====================

var Centroid
var CentroidConLL
function cancelMyStar()
{
    returnMyStar()
    closeIframe("constellation")

}

function addProperNameStars()
{
    ProperNameG.selectAll(".proper")
    .data(ProperNameArray)
    .enter().append("circle")
    .attr("class", "proper")
    .attr("transform", function(d) {return CelestialPoint([d[3], d[4]])})
    .attr("name", function(d) {return d[1]})
    .attr("r", "1")
    .attr("fill", "white")
    .attr("stroke", "none")
    .style("cursor", "default")
    .attr("onmouseover", "showStarName(evt)")
    .attr("onmouseout", "hideStarName(evt)")
}

var ProperNameArray =[]
ProperNameArray[0] =["And", "Alpheratz", 358, 2.096862964844082, 29.09043194972281]
ProperNameArray[1] =["And", "Mirach", 6860, 17.43291658699056, 35.620557623538275]
ProperNameArray[2] =["And", "Almaak", 12533, 30.974767412165484, 42.32972465620756]
ProperNameArray[3] =["Aqr", "Sadalsuud", 204867, 322.88972433441126, -5.571172206545314]
ProperNameArray[4] =["Aqr", "Sadalmelik", 209750, 331.44598169133167, -0.3198506662756604]
ProperNameArray[5] =["Aql", "Tarazed", 186791, 296.56491339756633, 10.6132611419168]
ProperNameArray[6] =["Aql", "Altair", 187642, 297.6958128916716, 8.868321943043426]
ProperNameArray[7] =["Aql", "Alshain", 188512, 298.82830440571604, 6.4067634044484825]
ProperNameArray[8] =["Ari", "Sheratan", 11636, 28.66002167349864, 20.808034992587334]
ProperNameArray[9] =["Ari", "Hamal", 12929, 31.793320958446653, 23.462423075800128]
ProperNameArray[10] =["Aur", "Hassaleh", 31398, 74.2484095314566, 33.1660902215097]
ProperNameArray[11] =["Aur", "Capella", 34029, 79.17224848860671, 45.99799101134946]
ProperNameArray[12] =["Aur", "Menkalinan", 40183, 89.88223527850327, 44.94743267459879]
ProperNameArray[13] =["Boo", "Mufrid", 121370, 208.671168917548, 18.39771696538688]
ProperNameArray[14] =["Boo", "Arcturus", 124897, 213.91545597619665, 19.182410287320682]
ProperNameArray[15] =["Boo", "Izar", 129988, 221.2467551937429, 27.07422240107975]
ProperNameArray[16] =["CVn", "Cor Caroli", 112413, 194.00710284192476, 38.318379721219436]
ProperNameArray[17] =["CMa", "Mirzam", 44743, 95.67493888946869, -17.95591768763995]
ProperNameArray[18] =["CMa", "Sirius", 48915, 101.28721369784863, -16.716115776876777]
ProperNameArray[19] =["CMa", "Adhara", 52089, 104.6564506991152, -28.972083700665973]
ProperNameArray[20] =["CMa", "Wezen", 54605, 107.09785158181633, -26.393199627283607]
ProperNameArray[21] =["CMa", "Aludra", 58350, 111.0237616105774, -29.303103513199726]
ProperNameArray[22] =["CMi", "Gomeisa", 58715, 111.787678822624, 8.289315423243206]
ProperNameArray[23] =["CMi", "Luyten's Star", 36208, 111.8520737150768, 5.225785184529887]
ProperNameArray[24] =["CMi", "Procyon", 61421, 114.82550003073865, 5.224993035149917]
ProperNameArray[25] =["Car", "Canopus", 45348, 95.98792604334638, -52.6956603534459]
ProperNameArray[26] =["Car", "Avior", 71129, 125.62854103549672, -59.50948296812412]
ProperNameArray[27] =["Car", "Miaplacidus", 80007, 138.30061975783428, -69.71720764086275]
ProperNameArray[28] =["Car", "Tureis", 80404, 139.2725718309053, -59.27522915459934]
ProperNameArray[29] =["Cas", "Caph", 432, 2.2933124380656533, 59.14977950161972]
ProperNameArray[30] =["Cas", "Shedir", 3712, 10.126735748522337, 56.537330991114914]
ProperNameArray[31] =["Cas", "Cih", 5394, 14.177150286369624, 60.71674026537847]
ProperNameArray[32] =["Cas", "Ruchbah", 8538, 21.453235070876694, 60.23528306384762]
ProperNameArray[33] =["Cen", "Hadar", 122451, 210.9559359833287, -60.373039220569126]
ProperNameArray[34] =["Cen", "Menkent", 123139, 211.67092358256406, -36.36995436792436]
ProperNameArray[35] =["Cen", "Proxima Centauri", 70890, 217.4397702684803, -62.67948487275167]
ProperNameArray[36] =["Cen", "Rigil Kentaurus", 128620, 219.91146979947186, -60.833975842366584]
ProperNameArray[37] =["Cep", "Alderamin", 203280, 319.6444536016955, 62.58557250293053]
ProperNameArray[38] =["Cep", "Kruger 60", 239960, 336.9996242679042, 57.69587491835718]
ProperNameArray[39] =["Cet", "Diphda", 4128, 10.897350283317879, -17.986604531624153]
ProperNameArray[40] =["Cet", "Mira", 14386, 34.83663597440887, -2.9776425827400352]
ProperNameArray[41] =["Cet", "268 G. Cet", 16160, 39.02035872039034, 6.8868702803182105]
ProperNameArray[42] =["Cet", "Menkar", 18884, 45.569883901003124, 4.089733946111699]
ProperNameArray[43] =["Col", "Phakt", 37795, 84.91224934928846, -34.07410781744755]
ProperNameArray[44] =["CrB", "Alphekka", 139006, 233.67191508835973, 26.71469295600838]
ProperNameArray[45] =["Crv", "Gienah Ghurab", 106625, 183.95156117527446, -17.54192941895317]
ProperNameArray[46] =["Crv", "Algorab", 108767, 187.46608585947277, -16.515432482298735]
ProperNameArray[47] =["Crv", "Kraz", 109379, 188.59681037084607, -23.39675909443372]
ProperNameArray[48] =["Cru", "Acrux", 108248, 186.64966951628372, -63.099091552746906]
ProperNameArray[49] =["Cru", "Gacrux", 108903, 187.79143962405357, -57.1132116091208]
ProperNameArray[50] =["Cru", "Becrux", 111123, 191.93037772150257, -59.68876350473599]
ProperNameArray[51] =["Cyg", "Albireo", 183912, 292.6803375483646, 27.959681045833165]
ProperNameArray[52] =["Cyg", "Campbell's Hydrogen Star", 184738, 293.68846929599823, 30.516371108648674]
ProperNameArray[53] =["Cyg", "Cygnus X1", 226868, 299.5903165997081, 35.20160410467908]
ProperNameArray[54] =["Cyg", "Sadr", 194093, 305.55708888578, 40.256679167269496]
ProperNameArray[55] =["Cyg", "Deneb", 197345, 310.3579759951137, 45.28033788864589]
ProperNameArray[56] =["Cyg", "Gienah", 197989, 311.5526661389869, 33.97025604539122]
ProperNameArray[57] =["Dra", "Thuban", 123299, 211.09747065218315, 64.37585038352852]
ProperNameArray[58] =["Dra", "Rastaban", 159181, 262.60819873211574, 52.301387005446344]
ProperNameArray[59] =["Dra", "Etamin", 164058, 269.15155321731044, 51.488894886702006]
ProperNameArray[60] =["Eri", "Achernar", 10144, 24.428345845303003, -57.23675735520918]
ProperNameArray[61] =["Eri", "Acamar", 18622, 44.565351616432515, -40.30467233541178]
ProperNameArray[62] =["Eri", "82 G. Eri", 20794, 49.979154236623735, -43.069783810541644]
ProperNameArray[63] =["Eri", "Zaurak", 25025, 59.50735555957237, -13.508515304652926]
ProperNameArray[64] =["Eri", "Cursa", 33111, 76.96243855735474, -5.086446132349498]
ProperNameArray[65] =["Eri", "p Eridani", 10361, 24.94503827067425, -56.19461951605709]
ProperNameArray[66] =["Gem", "Alhena", 47105, 99.42792118344474, 16.39925210564631]
ProperNameArray[67] =["Gem", "Castor", 60179, 113.64951727675235, 31.888276224328067]
ProperNameArray[68] =["Gem", "Pollux", 62509, 116.32916165804521, 28.02619855682677]
ProperNameArray[69] =["Gru", "Alnair", 209952, 332.05812800072675, -46.9609753228823]
ProperNameArray[70] =["Her", "Kornephoros", 148856, 247.55501723001433, 21.489613194911243]
ProperNameArray[71] =["Her", "Rasalgethi", 156014, 258.66191007595864, 14.39033278233877]
ProperNameArray[72] =["Hya", "Alphard", 81797, 141.89684708037123, -8.658602512277756]
ProperNameArray[73] =["Lac", "Babcock's star", 215441, 341.0312629693684, 55.58922570609909]
ProperNameArray[74] =["Leo", "Ras Elased Australis", 84441, 146.46281441180267, 23.774254597536046]
ProperNameArray[75] =["Leo", "Regulus", 87901, 152.09297434934496, 11.967207047135386]
ProperNameArray[76] =["Leo", "Algieba", 89484, 154.99309563090577, 19.841488657376676]
ProperNameArray[77] =["Leo", "Zosma", 97603, 168.52706509956022, 20.523716743541318]
ProperNameArray[78] =["Leo", "Denebola", 102647, 177.26494652699958, 14.572060255537467]
ProperNameArray[79] =["Lep", "Nihal", 36079, 82.06134725913647, -20.759440909645406]
ProperNameArray[80] =["Lep", "Arneb", 36673, 83.18256568076704, -17.82228850200635]
ProperNameArray[81] =["Lib", "Zubenelgenubi", 130841, 222.7196481222302, -16.041778116005172]
ProperNameArray[82] =["Lib", "Zubeneschemali", 135742, 229.25173124413, -9.382917374445642]
ProperNameArray[83] =["Lyr", "Vega", 172167, 279.23459649962285, 38.78369169996268]
ProperNameArray[84] =["Lyr", "Sheliak", 174638, 282.5199767839258, 33.36266695829153]
ProperNameArray[85] =["Mic", "Lacaille 8760", 202560, 319.315875023472, -38.867362233158225]
ProperNameArray[86] =["Mon", "Red Rectangle", 44179, 94.99256687196622, -10.637414163128032]
ProperNameArray[87] =["Oph", "Rasalhague", 159561, 263.73362025615785, 12.56003475085208]
ProperNameArray[88] =["Oph", "Cebalrai", 161096, 265.8681378523919, 4.567302781225764]
ProperNameArray[89] =["Oph", "Barnard's Star", 87937, 269.4520833375473, 4.693388288778663]
ProperNameArray[90] =["Ori", "Rigel", 34085, 78.63446782009994, -8.20164049617646]
ProperNameArray[91] =["Ori", "Bellatrix", 35468, 81.28276265750773, 6.34970218338871]
ProperNameArray[92] =["Ori", "Mintaka", 36486, 83.00166944760149, -0.29909200438703515]
ProperNameArray[93] =["Ori", "Hatsya", 37043, 83.85825999819366, -5.909901307144227]
ProperNameArray[94] =["Ori", "Alnilam", 37128, 84.05338907809633, -1.201919806117312]
ProperNameArray[95] =["Ori", "Alnitak", 37742, 85.18969616891043, -1.9425722226153668]
ProperNameArray[96] =["Ori", "Saiph", 38771, 86.93911997822424, -9.669604727821804]
ProperNameArray[97] =["Ori", "Betelgeuse", 39801, 88.79293785093229, 7.407062679832736]
ProperNameArray[98] =["Pav", "Peacock", 193924, 306.41189172389585, -56.735089968184454]
ProperNameArray[99] =["Peg", "Algenib", 886, 3.3089695425919086, 15.183595879460546]
ProperNameArray[100] =["Peg", "Enif", 206778, 326.04649052220753, 9.875011222378344]
ProperNameArray[101] =["Peg", "Matar", 215182, 340.7505670914687, 30.221245112313785]
ProperNameArray[102] =["Peg", "Scheat", 217906, 345.94351155955724, 28.082789015822808]
ProperNameArray[103] =["Peg", "Markab", 218045, 346.1902181294081, 15.205264347115016]
ProperNameArray[104] =["Per", "Algol", 19356, 47.042212823799076, 40.95564759104755]
ProperNameArray[105] =["Per", "Mirphak", 20902, 51.08067733081206, 49.861179512780716]
ProperNameArray[106] =["Phe", "Ankaa", 2261, 6.570846320291441, -42.30598139690846]
ProperNameArray[107] =["Pic", "Kapteyn's Star", 33793, 77.91253355575951, -45.018417146640104]
ProperNameArray[108] =["Psc", "96 G. Psc", 4628, 12.095730285548086, 5.280614872818386]
ProperNameArray[109] =["PsA", "Fomalhaut", 216956, 344.41257290939524, -29.622236073804686]
ProperNameArray[110] =["PsA", "Lacaille 9352", 217987, 346.46296851895625, -35.85307251550508]
ProperNameArray[111] =["Pup", "Naos", 66811, 120.89605039770336, -40.00314763757705]
ProperNameArray[112] =["Sgr", "Nash", 165135, 271.45204995119695, -30.424091213270952]
ProperNameArray[113] =["Sgr", "Kaus Meridionalis", 168454, 275.2484957410075, -29.828103170644233]
ProperNameArray[114] =["Sgr", "Kaus Australis", 169022, 276.04301286368275, -34.38461605606614]
ProperNameArray[115] =["Sgr", "Kaus Borealis", 169916, 276.9926802337249, -25.421700062409034]
ProperNameArray[116] =["Sgr", "Nunki", 175191, 283.8163528509439, -26.296722171291123]
ProperNameArray[117] =["Sgr", "Albaldah", 178524, 287.4409707216674, -21.023614820505706]
ProperNameArray[118] =["Sco", "Dschubba", 143275, 240.08336074488017, -22.62170984648706]
ProperNameArray[119] =["Sco", "Graffias", 144217, 241.3592952092895, -19.805453291387913]
ProperNameArray[120] =["Sco", "Antares", 148478, 247.3519228582173, -26.432002441001075]
ProperNameArray[121] =["Sco", "Shaula", 158926, 263.40217160450123, -37.1038210484935]
ProperNameArray[122] =["Sco", "Sargas", 159532, 264.3297050540732, -42.997823778594196]
ProperNameArray[123] =["Ser", "Unukalhai", 140573, 236.06697594678423, 6.425626930728258]
ProperNameArray[124] =["Tau", "Alcyone", 23630, 56.87114757799008, 24.10513710495621]
ProperNameArray[125] =["Tau", "Aldebaran", 29139, 68.98015429192894, 16.50930136689625]
ProperNameArray[126] =["Tau", "Alnath", 35497, 81.57296433401072, 28.607449952180772]
ProperNameArray[127] =["TrA", "Atria", 150798, 252.16615032289383, -69.02771490560183]
ProperNameArray[128] =["UMa", "Merak", 95418, 165.46015974669274, 56.38242669353305]
ProperNameArray[129] =["UMa", "Lalande 21185", 95735, 165.8344735386357, 35.96987745865506]
ProperNameArray[130] =["UMa", "Dubhe", 95689, 165.9323217228472, 61.75103311740201]
ProperNameArray[131] =["UMa", "Groombridge 1830", 103095, 178.24229892768705, 37.71867936545583]
ProperNameArray[132] =["UMa", "Phad", 103287, 178.4575168861687, 53.69476000793105]
ProperNameArray[133] =["UMa", "Megrez", 106591, 183.85628927835705, 57.032616793928476]
ProperNameArray[134] =["UMa", "Alioth", 112185, 193.507075270425, 55.959821064960515]
ProperNameArray[135] =["UMa", "Mizar", 116656, 200.9812102737956, 54.92536167575132]
ProperNameArray[136] =["UMa", "Alcor", 116842, 201.3061905410759, 54.98795754836243]
ProperNameArray[137] =["UMa", "Alkaid", 120315, 206.8853138356472, 49.31326497543042]
ProperNameArray[138] =["UMi", "Polaris", 8890, 37.94625420718415, 89.26410938447289]
ProperNameArray[139] =["UMi", "Kochab", 131873, 222.67656861255568, 74.1555047829532]
ProperNameArray[140] =["Vir", "Porrima", 110379, 190.41517633353692, -1.4493748211411275]
ProperNameArray[141] =["Vir", "Vindemiatrix", 113226, 195.54416671643435, 10.959150341682097]
ProperNameArray[142] =["Vir", "Spica", 116658, 201.29824864176092, -11.161322011735175]

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

function constellationZoom()
{
   // var cw = constellationCw
   // var index = cw.constellationSelect.selectedIndex-1

    for(var k=0;k<ConLocArray.length;k++)
    {
        var con=ConLocArray[k][0]
        if(con==SelectedCon)
        {

           var index=k
            break
        }


    }



    CelestialProjection.rotate([0.0, 0.0, 0.0]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialScale])

    var conZoom = ConLocArray[index]
    CelestialView.k = conZoom[1]
    CelestialView.r = conZoom[2]
    CelestialProjection.scale(CelestialView.k)
    CelestialProjection.rotate(CelestialView.r)
    CelestialZoom.scale(conZoom[1])
    rotationValue.value = CelestialView.r[2].toFixed(2)

    setTimeout(doIt, 50)
}
var CentroidConLL

function doIt()
{
   // var cw = constellationCw
   // var con = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value

    for(var j = 0; j<ConBoundries.features.length; j++)
    {
        var id = ConBoundries.features[j].id
        if(id==SelectedCon)
        {
            MyConBoundries = ConBoundries.features[j]
            ConVertice = MyConBoundries.geometry.coordinates[0]
            ConVerticePts =[]
            for(var k = 0; k<ConVertice.length; k++)
            {
                var pt = ConVertice[k]
                var xy = CelestialProjection(pt)
                var x = xy[0]
                var y = xy[1]
                ConVerticePts.push({"x": x, "y": y})
            }

            CentroidCelestial.style("display", "block")
            CentroidConLL = getConstellationCentroid(ConVerticePts).lonLat
            CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
            EarthPathCelestial.datum({type: "LineString", coordinates:[[0, 0], CentroidConLL]})
            .attr("d", CelestialMap)

            setTimeout(celestialRedraw, 50)

            break
        }

    }
}
var AllLoad = false
var AllConStars
function loadAllConStars(ConStars)
{

    var starColor = d3.scale.category20();
    CelestialSearchG.selectAll(".search")
    .data(ConStars)
    .enter().append("circle")
    .attr("class", "search")
    .attr("stroke", "none")
    .attr("r", ".75")
    .attr("con", function(d) {return d.con})
    .attr("id", function(d) {return "search"+d.id})
    .attr("transform", function(d, i) {return CelestialPoint(d.coords)})
    .attr("fill", function(d, i)
        {
            return starColor(i)

        }
    )
    celestialSearchG.style.display = 'block'
    console.log(celestialSearchG.childNodes.length)

    AllLoad = true
    StopCelestialZoom = true

}

function getStarCentroid(pts) {

    var first = pts[0], last = pts[pts.length-1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea = 0,
    x = 0, y = 0,
    nPts = pts.length,
    p1, p2, f;
    for (var i = 0, j = nPts-1; i<nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x*p2.y - p2.x*p1.y;
        twicearea += f;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;

    var x = x/f
    var y = y/f

    var lonLat = StarProjection.invert([x, y])

    return {x: x, y: y, lonLat: lonLat};
}

function getConstellationCentroid(pts) {

    var first = pts[0], last = pts[pts.length-1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea = 0,
    x = 0, y = 0,
    nPts = pts.length,
    p1, p2, f;
    for (var i = 0, j = nPts-1; i<nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x*p2.y - p2.x*p1.y;
        twicearea += f;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;

    var x = x/f
    var y = y/f

    var lonLat = CelestialProjection.invert([x, y])

    return {x: x, y: y, lonLat: lonLat};
}

var locCnt = 0
function setConLoc()
{
    var cw = constellationCw
    var con = cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value

    var conLoc = "ConLocArray["+(locCnt++)+"]=['"+con+"',"+CelestialView.k+",["+CelestialView.r+"]]\n"

    myValue.value += conLoc

    myValue.scrollTop = myValue.scrollHeight;

}