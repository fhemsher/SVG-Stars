
//--click on data table Highlight button---
var HighlightConStar

function highlightConStar(id)
{

  if(HighlightConStar)
  {

     HighlightConStar.setAttribute("r",.15)
     HighlightConStar.setAttribute("stroke","none")
     HighlightConStar.removeAttribute("stroke-width")

  }
  if(CelestialPreviewVis==true||CirclePackChartVis==true)
    HighlightConStar=document.getElementById("search"+id)
   else 
    HighlightConStar=document.getElementById("conStar"+id)


      HighlightConStar.setAttribute("r",1.5)
     HighlightConStar.setAttribute("stroke","yellow")
     HighlightConStar.setAttribute("stroke-width",.5)

}







var MyConJson
var ConStarData =[]
var MyConStarsLoaded = false
var ConStarViz = false //---used in database table, filled via redraw---
function loadMyConstellationStars()
{
    ConStarG.selectAll(".conStar").remove("*")
    ConStarData =[]
    var myConCnt = 0
    MyConStarsJson =[{"type": "FeatureCollection", "features":[]}]
    MyConJson = ConStars.slice(0);
                    //---append _newStarsData.xml---
                var addedDataStars=StarsDataAddedDocXML.childNodes
               for(var j=0;j<addedDataStars.length;j++)
               {
                 var addXml=addedDataStars.item(j)
                 var con=addXml.getAttribute("con")
                 if(con==hiddenConValue.value)
                 {

                      var id=parseInt(addXml.getAttribute("id"),10 )
                      if(addXml.getAttribute("x")!="")
                      var x=parseFloat(addXml.getAttribute("x") )
                      if(addXml.getAttribute("y")!="")
                      var y=parseFloat(addXml.getAttribute("y") )
                      if(addXml.getAttribute("z")!="")
                      var z=parseFloat(addXml.getAttribute("z") )
                      var rarad=parseFloat(addXml.getAttribute("rarad") )
                      var decrad=parseFloat(addXml.getAttribute("decrad"))
                      var lum=parseFloat(addXml.getAttribute("lum") )
                      var ci=parseFloat(addXml.getAttribute("ci") )
                      var dist=parseFloat(addXml.getAttribute("dist") )
                      var mag=parseFloat(addXml.getAttribute("mag") )
                      var spect=addXml.getAttribute("spect")
                      var varz=addXml.getAttribute("var")

                       addJson={"id": id, "primary":"", "proper": "",hd:"",hip:"",gl:"",   "con": con, "mag": mag,  "lum": lum, "dist": dist,  "ci": ci, "x": x, "y": y, "z": z, "rarad": rarad, "decrad": decrad, "spect": spect, "var": varz}
                         MyConJson.push(addJson)

                 }
               }




    AddSecondaryConStarArray =[]
    var minMaxArray =[]

    for(var k = 0; k<MyConJson.length; k++)
    {
        var star = MyConJson[k]
         if(star.rarad)
        var coords =[star.rarad*57.2957795, star.decrad*57.2957795] //  dec==latitude, ra=longitude
         else
        var coords =[star.ra, star.dec] //  dec==latitude, ra= in hours:*15longitude

        //---compute star radius km----


        if(star.comp_primary!="")
            minMaxArray.push(star.comp_primary)

            //==============================
            //---solar units---
            if(star.ci)
            {
                var L = star.lum
                var M = Math.pow(L, .286)
                var R = Math.sqrt(L)
                var T = Math.pow((L/R*R), .25)
                star.radius = R
                star.mass = M
                star.temp = T
            }
            else
             star.ci=""

            if(star.name.indexOf("ID")==0)
            {
               var name = ""
            if(star.proper&&star.proper!="")
            name += star.proper+"/"
            if(star.hd&&star.hd!="")
            name += "HD"+star.hd;
        if(star.hip&&name!=""&& star.hip!="")
            name += "/HIP"+star.hip;
        else if(star.hip&&name==""&& star.hip!="")
            name += "HIP"+star.hip;
        if(star.gl&&name!="" && star.gl!="")
            name += "/GL:"+star.gl;
        else if(star.gl&&name=="" && star.gl!="")
            name += "GL:"+star.gl;

             star.name=name




            }



            ConStarData.push(star)






        MyConStarsJson[0].features[myConCnt] = {"type": "Feature", "id": myConCnt, "properties": {"id": star.id, "primary": star.primary, "proper": star.proper, "hd": star.hd, "hip": star.hip, "gl": star.gl,  "ucac": star.ucac,  "tycho": star.tycho,  "usno": star.usno,  "nomad": star.nomad, "gsc": star.gsc, "name": star.name, "search": star.name, "con": star.con, "mag": star.mag, "absmag": star.absmag, "radius": R, "lum": L, "temp": T, "dist": star.dist, "mass": M, "ci": star.ci}, "geometry": {"type": "Point", "coordinates": coords}}
        myConCnt++

    }

    MyConStarsLoaded = true
    var starColor = d3.scale.category20();
    ConStarG.selectAll(".conStar")
    .data(MyConStarsJson[0].features)
    .enter().append("circle")
    .attr("class", "conStar")
    .attr("id", function(d, i) {return "conStar"+d.properties.id})
    .attr("transform", function(d) {return StarPoint(d.geometry.coordinates)})
    .attr("fill", function(d, i)
        {if
            (!d.properties.proper||d.properties.proper=="")
                return starColor(i)
                else
                    return "white"
        }
    )
    .style("cursor", "default")
    .attr("onmouseover", "showStarName(evt);scrollDataTo(evt)")
    .attr("onmouseout", "hideStarName(evt)")
    .attr("name", function(d)
        {
            
                return d.properties.name
        }
    )
    .attr("stroke", "none")
    .attr("r", function(d)
        {if
            (d.properties.proper&&d.properties.proper!="")
                return 1
                else return .15
        }
    )
    .attr("loc", function(d) {return d.properties.id;}) //---database table locator scroll to--

    /*
    var conSplit=XMLBounds.getAttribute("conCoords").split(",")
    MyConBoundries=[]
    for(var k=0;k<conSplit.length;k++)
    MyConBoundries.push(parseFloat(conSplit[k]))

    StarConBoundry.datum(MyConBoundries)
    .attr("d",StarMap)
   */
}

var AddSecondaryConStarArray =[]
function addConStar(evt)
{

    var target = evt.target
    if(target.getAttribute("stroke")!="yellow")
    {
        target.setAttribute("stroke", "yellow")
        target.setAttribute("stroke-width", ".15")
        var name = target.getAttribute("name")

        AddSecondaryConStarArray.push(name)

    }
    else
    {
        target.setAttribute("stroke", "none")
        target.removeAttribute("stroke-width")

        for(var k = 0; k<AddSecondaryConStarArray.length; k++)
        {
            var nameAdd = AddSecondaryConStarArray[k]
            var name = target.getAttribute("name")

            if(name==nameAdd)
            {
                AddSecondaryConStarArray.splice(k, 1)
                break
            }
        }

    }
    if(myPlaceLoad==true)
    {

        myPlaceCw.addedSecondaryStarValue.value = AddSecondaryConStarArray

    }

}
