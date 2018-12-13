


//--my star loaded see:stars.js getMyStars()
var MyExoplanet=false
var ExoplanetCoordsArray=[]

function drawMyExoplanets(exos)
{

     var reSp=/ /
    var reDash=/-/

   ExoplanetCoordsArray=[]
   MyExoplanet=true
   var primaryRD=PrimaryStarCoords //---y location of exos--
   var primaryRA=primaryRD[0]
   var primaryDEC=primaryRD[1]

   var starDia= parseFloat(PrimaryStarSurface.attr("radius"))*2
     var solarDeg = starDia*0.000000000197//---convert solar radius to degrees---
        var exoElems=ExoXmlDoc.childNodes
    var exoSplit=exos.split(",")
    for(var k=0;k<exoSplit.length;k++)
    {
       var exo=exoSplit[k]
       for(j=0;j<exoElems.length;j++)
       {
          var exoName=exoElems[j].getAttribute("name")



           if(exoName==exo)
           {
               //---add circle to ExoplanetG---
               var distAU=parseFloat(exoElems[j].getAttribute("meanDistance"))

                    var arcSecs=distAU
                 var arcSecs2Deg=arcSecs* 0.000277778
                 var exoRA=primaryRA-(arcSecs2Deg*4.84814e-6+solarDeg)

                 var orbitDeg=arcSecs2Deg*4.84814e-6

               var myExoCoords=[exoRA,primaryDEC]
               var hab=exoElems[j].getAttribute("habitableClass") //--fill color---
               var atmos=exoElems[j].getAttribute("atmosphereClass") //--stroke color---
              //var orbitPath = d3.geo.circle().angle(arcSecs2Deg).origin(PrimaryStarCoords)
              var orbitPath = d3.geo.circle().angle(orbitDeg+solarDeg).origin(PrimaryStarCoords)
                 var orbit=ExoplanetG.append("path")
                .attr("class","orbit")
                .attr("stroke-dasharray","4 4")
                .attr("stroke","black")
                .attr("stroke-width",".2")
                .attr("fill","none")

               orbit.datum(orbitPath)
                    .attr("d", StarMap);

/*
Atmosphere Class<option>no-atmosphere</option><option>metals-rich</option><option>hydrogen-rich</option></select></td></tr>
Habitable Class<option>mesoplanet</option><option>thermoplanet</option><option>psychroplanet</option><option>hypopsychroplanet</option><option>hyperthermoplanet</option><option>non-habitable</option></select></td></tr>
*/
            var fill="#B4B4B4"
            var stroke="#B4B4B4"

           if(atmos=="no-atmosphere")stroke="black"
           if(atmos=="metals-rich")stroke="red"
           if(atmos=="hydrogen-rich")stroke="lime"
        console.log(atmos)

           if(hab=="mesoplanet")fill="blue"
           if(hab=="thermoplanet")fill="red"
           if(hab=="psychroplanet")fill="#00FFF"
           if(hab=="hypopsychroplanet")fill="#C675EC"
           if(hab=="hyperthermoplanet")fill="#E90080"
           if(hab=="non-habitable")fill="#FFC8FF"






                var planet=ExoplanetG.append("circle")
                .attr("class","planet")
                .attr("name",exoName)
                .attr("onmouseover","showExoplanet(evt)")
                .attr("onmouseout","hideExoplanet(evt)")
                .attr("onclick","showExoplanetData(evt)")

                .attr("stroke",stroke)
                .attr("stroke-width","3")
                .attr("fill",fill)
                .attr('r',6)
                ExoplanetCoordsArray.push(myExoCoords)
              break;

           }
       }



    }


            starRedraw()

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
