


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
var WikiExos=[]
function primaryStarExo()
{
    WikiExos=[]
 var cw=constellationCw
    var reSp=/ /
    var reDash=/-/
    var wikiStar=cw.placeNameValue.value.toLowerCase()+"/"

      if(wikiStar.indexOf("-")<5)
       wikiStar=wikiStar.replace(reDash,"")
       wikiStar=wikiStar.replace(reSp,"")



 var con=cw.constellationSelect.options[cw.constellationSelect.selectedIndex].value
    var exos=ExoXmlDoc.childNodes
    for(var k=0;k<exos.length;k++)
    {
       var exo=exos.item(k)
       var exoName=exo.getAttribute("name")
       var starName=exo.getAttribute("starName").toLowerCase()+"/"

      if(starName.indexOf("-")<5)
        starName=starName.replace(reDash,"")
           starName=starName.replace(reSp,"")

       var starCon=exo.getAttribute("starConstellation")
       //if(con==starCon)
       //console.log(starName)
        if(starName.indexOf(wikiStar)!=-1&&con==starCon)
        {

           WikiExos.push(exo)



        }
    }


    cw.exoCntSpan.innerHTML="("+WikiExos.length+")"
    if(WikiExos.length>0)
    {
       cw.viewStarExoButton.disabled=false
        cw.exoplanetIncludeCheck.disabled=false
        //---preload frame---
        exoplanetViewFrame.src="../Exoplanet/exoplanetView.htm"
        exoplanetViewCw=exoplanetViewFrame.contentWindow
    }
    else
    {
       cw.viewStarExoButton.disabled=true
        cw.exoplanetIncludeCheck.disabled=true
    }





}





var IncludeExos=false
function exoplanetIncludeChecked()
{
   var cw=constellationCw
   if(cw.exoplanetIncludeCheck.checked)
   {
     if(WikiExos.length>0)
      IncludeExos=true
      else
      IncludeExos=false
    }
  else
   IncludeExos=false

}


function viewStarExoButtonClicked()
{

    if(WikiExos.length>0)
    {

        var cw=exoplanetViewCw
         var table=cw.exoViewTable

        //---clear table---
        for(var k=table.rows.length-1;k>=0;k--)
            table.deleteRow(k)

        var rowCnt=0
        for(var k=0;k<WikiExos.length;k++)
        {
            var exo=WikiExos[k]
           if(k>0)
           {  //---spacer
               var row=table.insertRow(rowCnt++)
               var spacerCell=row.insertCell(0)
               spacerCell.colspan="2"
           }

           var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Planet name"
           row.insertCell(1).innerHTML=exo.getAttribute("name")
           var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Kepler name"
           row.insertCell(1).innerHTML=exo.getAttribute("keplerName")
           var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Kepler (KOI) name"
           row.insertCell(1).innerHTML=exo.getAttribute("nameKOI")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable zone classification"
           row.insertCell(1).innerHTML=exo.getAttribute("zoneClass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mass Class"
           row.insertCell(1).innerHTML=exo.getAttribute("massClass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Composition Class"
           row.insertCell(1).innerHTML=exo.getAttribute("compositionClass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Atmosphere Class"
           row.insertCell(1).innerHTML=exo.getAttribute("atmosphereClass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable Class"
           row.insertCell(1).innerHTML=exo.getAttribute("habitableClass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Min Mass (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("minMass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mass (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("mass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Max Mass (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("maxMass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Radius (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("radius")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Density (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("density")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Gravity (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("gravity")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Escape velocity (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("escVel")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Minimum stellar flux (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("sFluxMin")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mean stellar flux (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("sFluxMean")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Maximum stellar flux (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("sFluxMax")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Minimum equilibrium temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("teqMin")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mean equilibrium temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("teqMean")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Maximum equilibrium temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("teqMax")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Minimum surface temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("tsMin")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mean surface temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("tsMean")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Maximum surface temp. (&deg;K)"
           row.insertCell(1).innerHTML=exo.getAttribute("tsMax")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Surface pressure (EU)"
           row.insertCell(1).innerHTML=exo.getAttribute("surfPress")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Magnitude Moon-Earth distance"
           row.insertCell(1).innerHTML=exo.getAttribute("mag")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Apparent Moon-Earth distance (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("apparSize")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Period (days)"
           row.insertCell(1).innerHTML=exo.getAttribute("period")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Semi major axis (AU)"
           row.insertCell(1).innerHTML=exo.getAttribute("semMajorAxis")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Eccentricity"
           row.insertCell(1).innerHTML=exo.getAttribute("eccentricity")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Mean distance from the star (AU)"
           row.insertCell(1).innerHTML=exo.getAttribute("meanDistance")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Inclination (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("inclination")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Omega (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("omega")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star name"
           row.insertCell(1).innerHTML=exo.getAttribute("starName")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="HD Star name"
           row.insertCell(1).innerHTML=exo.getAttribute("starNameHD")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="HIP Star name"
           row.insertCell(1).innerHTML=exo.getAttribute("starNameHIP")

            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Constellation name (abbreviated)"
           row.insertCell(1).innerHTML=exo.getAttribute("starConstellation")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star type"
           row.insertCell(1).innerHTML=exo.getAttribute("starType")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star mass (solar)"
           row.insertCell(1).innerHTML=exo.getAttribute("starMass")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star radius (solar)"
           row.insertCell(1).innerHTML=exo.getAttribute("starRadius")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star effective temp. (solar)"
           row.insertCell(1).innerHTML=exo.getAttribute("starTeff")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star luminosity (solar)"
           row.insertCell(1).innerHTML=exo.getAttribute("starLuminosity")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star iron/hydrogen ratio [Fe/H]"
           row.insertCell(1).innerHTML=exo.getAttribute("starFeH")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star age (Gyrs)"
           row.insertCell(1).innerHTML=exo.getAttribute("starAge")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star apparent visual magnitude from Earth"
           row.insertCell(1).innerHTML=exo.getAttribute("starApparMag")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star distance from Earth (parsec)"
           row.insertCell(1).innerHTML=exo.getAttribute("starDistance")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star right ascension (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("starRA")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star declination (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("starDEC")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star apparent visual magnitude from planet"
           row.insertCell(1).innerHTML=exo.getAttribute("starMagfromPlanet")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star apparent size from planet (degrees)"
           row.insertCell(1).innerHTML=exo.getAttribute("starSizefromPlanet")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star number of planets"
           row.insertCell(1).innerHTML=exo.getAttribute("starNoPlanets")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star number of habitable planets"
           row.insertCell(1).innerHTML=exo.getAttribute("starNoPlanetsHab")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star inner edge habitable zone (AU)"
           row.insertCell(1).innerHTML=exo.getAttribute("starHabZoneMin")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star outer edge habitable zone (AU)"
           row.insertCell(1).innerHTML=exo.getAttribute("starHabZoneMax")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable Zone Distance (HZD)"
           row.insertCell(1).innerHTML=exo.getAttribute("habitableZoneDistance")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable Zone Composition (HZC)"
           row.insertCell(1).innerHTML=exo.getAttribute("habitableZoneComposition")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable Zone Atmosphere (HZA)"
           row.insertCell(1).innerHTML=exo.getAttribute("habitableZoneAtmosphere")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable Zone Index (HZI)"
           row.insertCell(1).innerHTML=exo.getAttribute("habitableZoneIndex")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Standard Primary Habitability (SPH)"
           row.insertCell(1).innerHTML=exo.getAttribute("standardPrimaryHabitability")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Interior Earth Similarity Index (iESI)"
           row.insertCell(1).innerHTML=exo.getAttribute("ineriorESI")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Surface Earth Similarity Index (sESI)"
           row.insertCell(1).innerHTML=exo.getAttribute("surfaceESI")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Earth Similarity Index (ESI)"
           row.insertCell(1).innerHTML=exo.getAttribute("ESI")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Star HabCat database"
           row.insertCell(1).innerHTML=exo.getAttribute("starHabCat")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable"
           row.insertCell(1).innerHTML=exo.getAttribute("habitable")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Habitable exomoons"
           row.insertCell(1).innerHTML=exo.getAttribute("habMoon")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Confirmed Kepler"
           row.insertCell(1).innerHTML=exo.getAttribute("confirmed")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Discovery method"
           row.insertCell(1).innerHTML=exo.getAttribute("discoveryMethod")
            var row=table.insertRow(rowCnt++)
           row.align="left"
           row.style.backgroundColor="white"
           row.insertCell(0).innerHTML="Discovery year"
           row.insertCell(1).innerHTML=exo.getAttribute("discoveryYear")
        }
        exoplanetViewFrameDiv.style.visibility="visible"

           var width=cw.containerDiv.scrollWidth+30
           var height=cw.containerDiv.scrollHeight+30
           sizeFrame('exoplanetView',width,height)


    }

}
function closeExoplanetView()
{
  	var myDiv=d3.select("#exoplanetViewFrameDiv")
	myDiv.transition().style("height",1+"px")
	.each("end",function(){
		myDiv.style("visibility","hidden")
     })
}

function addNewExoButtonClicked()
{

     openIframe("Exoplanet","exoplanetAdd",40)






}

function closeAddExoplanet()
{
   closeIframe("exoplanetAdd")



}

function verifyPrevExoSort()
{

  if(exoplanetCurrentLoad==true)
  fillCurrentExoTable()


}
//---exoplanetCurrent.htm onload---
function fillCurrentExoTable()
{

     //isWikiedCw.exoListButton.style.color="blue"
    // isWikiedCw.exoListButton.innerHTML="...loading..."


     var cw=exoplanetCurrentCw
     var table=cw.exoCurrentTable
    //--clear table---
    var rows=table.rows.length

    for(var k=rows-1;k>0;k--)
    {
        table.deleteRow(k)
    }
     var exos=ExoXmlDoc.childNodes
       var rowCnt=1
    if(isWikiedCw.alphSortRadio.checked==true)
    {


        for(k=0;k<exos.length;k++)
        {
            var exo=exos.item(k)
            var name=exo.getAttribute("name")
            var habitable=exo.getAttribute("habitable")
            var starName=exo.getAttribute("starName")
            var constellation=exo.getAttribute("starConstellation")
            var discoveryMethod=exo.getAttribute("discoveryMethod")
            var discoveryYear=exo.getAttribute("discoveryYear")
            var row=table.insertRow(rowCnt++)
            row.align="left"
            row.style.backgroundColor="white"
            row.insertCell(0).innerHTML=k+1
            row.insertCell(1).innerHTML=name
            row.insertCell(2).innerHTML=starName
            row.insertCell(3).innerHTML=constellation
            row.insertCell(4).innerHTML=discoveryMethod
            row.insertCell(5).innerHTML=discoveryYear

            var habCell=row.insertCell(6)
             if(habitable=="1")
             {
                 habCell.style.backgroundColor="lime"
                 habCell.innerHTML="Yes"

             }
        }
    }
    else
    {
        var sortArray=[]
       if(isWikiedCw.conSortRadio.checked==true)
       {
            for(k=0;k<exos.length;k++)
            {
                sortArray.push(exos.item(k).getAttribute("starConstellation")+"."+k)

            }


            sortArray.sort()


       }
       else if(isWikiedCw.yrSortRadio.checked==true)
       {
             for(k=0;k<exos.length;k++)
            {
                sortArray.push(parseInt(exos.item(k).getAttribute("discoveryYear"),10)+"."+k)

            }


            sortArray.sort(function(a, b){return a-b})




       }


            for(j=0;j<sortArray.length;j++)
            {
               var loc=parseInt(sortArray[j].split(".")[1],10)
                var exo=exos.item(loc)
            var name=exo.getAttribute("name")
            var habitable=exo.getAttribute("habitable")
            var starName=exo.getAttribute("starName")
            var constellation=exo.getAttribute("starConstellation")
            var discoveryMethod=exo.getAttribute("discoveryMethod")
            var discoveryYear=exo.getAttribute("discoveryYear")
            var row=table.insertRow(rowCnt++)
            row.align="left"
            row.style.backgroundColor="white"
            row.insertCell(0).innerHTML=j+1
            row.insertCell(1).innerHTML=name
            row.insertCell(2).innerHTML=starName
            row.insertCell(3).innerHTML=constellation
            row.insertCell(4).innerHTML=discoveryMethod
            row.insertCell(5).innerHTML=discoveryYear

            var habCell=row.insertCell(6)
             if(habitable=="1")
             {
                 habCell.style.backgroundColor="lime"
                 habCell.innerHTML="Yes"

             }



            }


    }

}

function closeCurrentExo()
{

   closeIframe('exoplanetCurrent')
   openIframe('IsWikied',"isWikied",40)




}

//---click planet---
var MyExoplanetShow
function showExoplanetData(evt)
{

   var planet=evt.target
   MyExoplanetShow=planet.getAttribute("name")
   if(exoplanetLoad==true)
        fillExoplanetData()
     openIframe("Exoplanet","exoplanet",40)

}
//---on load at exoplanet.htm
function fillExoplanetData()
{
        var cw=exoplanetCw
       var exos=ExoXmlDoc.childNodes
     var rowCnt=1
    for(k=0;k<exos.length;k++)
    {
        var exo=exos.item(k)
        var name=exo.getAttribute("name")
        if(name==MyExoplanetShow)
        {
            cw.nameSpan.innerHTML=name
            cw.keplerSpan.innerHTML=exo.getAttribute("keplerName")
            cw.koiSpan.innerHTML=exo.getAttribute("nameKOI")
            cw.zoneSpan.innerHTML=exo.getAttribute("zoneClass")
            cw.massClassSpan.innerHTML=exo.getAttribute("massClass")
            cw.compositionSpan.innerHTML=exo.getAttribute("compositionClass")
            cw.atmosphereSpan.innerHTML=exo.getAttribute("atmosphereClass")
            cw.habitableSpan.innerHTML=exo.getAttribute("habitableClass")
            cw.minMassSpan.innerHTML=exo.getAttribute("minMass")
            cw.massSpan.innerHTML=exo.getAttribute("mass")

            cw.maxMassSpan.innerHTML=exo.getAttribute("maxMass")
            cw.radiusSpan.innerHTML=exo.getAttribute("radius")
            cw.densitySpan.innerHTML=exo.getAttribute("density")
            cw.gravitySpan.innerHTML=exo.getAttribute("gravity")
            cw.escapeVelSpan.innerHTML=exo.getAttribute("escVel")
            cw.minFluxSpan.innerHTML=exo.getAttribute("sFluxMin")
            cw.meanFluxSpan.innerHTML=exo.getAttribute("sFluxMean")
            cw.maxFlusSpan.innerHTML=exo.getAttribute("sFluxMax")
            cw.minEqTempSpan.innerHTML=exo.getAttribute("teqMin")
            cw.meanEqTempSpan.innerHTML=exo.getAttribute("teqMean")
            cw.maxEqTempSpan.innerHTML=exo.getAttribute("teqMax")
            cw.minSurfaceTempSpan.innerHTML=exo.getAttribute("tsMin")
            cw.meanSurfaceTempSpan.innerHTML=exo.getAttribute("tsMean")
            cw.maxSurfaceTempSpan.innerHTML=exo.getAttribute("tsMax")
            cw.surfacePressureSpan.innerHTML=exo.getAttribute("surfPress")
            cw.magSpan.innerHTML=exo.getAttribute("mag")
            cw.apparSizeSpan.innerHTML=exo.getAttribute("apparSize")
            cw.periodSpan.innerHTML=exo.getAttribute("period")
            cw.semMajorAxisSpan.innerHTML=exo.getAttribute("semMajorAxis")
            cw.excentricitySpan.innerHTML=exo.getAttribute("excentricity")
            cw.meanDistSpan.innerHTML=exo.getAttribute("meanDistance")
            cw.inclinationSpan.innerHTML=exo.getAttribute("inclination")
            cw.omegaSpan.innerHTML=exo.getAttribute("omega")
            cw.starNameSpan.innerHTML=exo.getAttribute("starName")
            cw.hdNameSpan.innerHTML=exo.getAttribute("hdName")
            cw.hipNameSpan.innerHTML=exo.getAttribute("hipName")
            cw.conNameSpan.innerHTML=exo.getAttribute("starConstellation")
            cw.starTypeSpan.innerHTML=exo.getAttribute("starType")
            cw.starMassSpan.innerHTML=exo.getAttribute("starMass")
            cw.starRadiusSpan.innerHTML=exo.getAttribute("starRadius")
            cw.starEffTempSpan.innerHTML=exo.getAttribute("starTeff")
            cw.starLumSpan.innerHTML=exo.getAttribute("starLuminosity")
            cw.fehRatioSpan.innerHTML=exo.getAttribute("starFeH")
            cw.starAgeSpan.innerHTML=exo.getAttribute("starAge")
            cw.starAppMagEarthSpan.innerHTML=exo.getAttribute("starApparMag")
            cw.starDistSpan.innerHTML=exo.getAttribute("starDistance")
            cw.raSpan.innerHTML=exo.getAttribute("starRA")
            cw.decSpan.innerHTML=exo.getAttribute("starDEC")
            cw.sizePlanetSpan.innerHTML=exo.getAttribute("starSizefromPlanet")
            cw.magPlanetSpan.innerHTML=exo.getAttribute("starMagfromPlanet")
            cw.planetNumSpan.innerHTML=exo.getAttribute("starNoPlanets")
            cw.planetNumHabSpan.innerHTML=exo.getAttribute("starNoPlanetsHab")
            cw.habZoneMinSpan.innerHTML=exo.getAttribute("starHabZoneMin")
            cw.habZoneMaxSpan.innerHTML=exo.getAttribute("starHabZoneMax")
            cw.distHZDSpan.innerHTML=exo.getAttribute("habitableZoneDistance")
            cw.compHZDSpan.innerHTML=exo.getAttribute("habitableZoneComposition")
            cw.atmosHZDSpan.innerHTML=exo.getAttribute("habitableZoneAtmosphere")
            cw.hziSpan.innerHTML=exo.getAttribute("habitableZoneIndex")
            cw.sphSpan.innerHTML=exo.getAttribute("standardPrimaryHabitability")
            cw.iESISpan.innerHTML=exo.getAttribute("ineriorESI")
            cw.sESISpan.innerHTML=exo.getAttribute("surfaceESI")
            cw.ESISpan.innerHTML=exo.getAttribute("ESI")
            cw.habCatSpan.innerHTML=exo.getAttribute("starHabCat")
            cw.habPotSpan.innerHTML=exo.getAttribute("habitable")
            cw.habMoonSpan.innerHTML=exo.getAttribute("habMoon")
            cw.confirmedSpan.innerHTML=exo.getAttribute("confirmed")
            cw.discMethodSpan.innerHTML=exo.getAttribute("discoveryMethod")
            cw.discYearSpan.innerHTML=exo.getAttribute("discoveryYear")

           break;
       }
    }
}
//-----send new exoplanet---
//---send button---
function sendNewExoPlanet()
{
   var cw=exoplanetAddCw
   cw.responseDiv.innerHTML="sending"
 var planetName=cw.nameValue.value
 var nameKepler=cw.keplerValue.value
 var nameKOI =cw.koiValue.value
var zoneClass=cw.zoneSelect.options[cw.zoneSelect.selectedIndex].text
var massClass=cw.massClassSelect.options[cw.massClassSelect.selectedIndex].text
var compositionClass=cw.compositionSelect.options[cw.compositionSelect.selectedIndex].text
var atmosphereClass=cw.atmosphereSelect.options[cw.atmosphereSelect.selectedIndex].text
var habitableClass=cw.habitableSelect.options[cw.habitableSelect.selectedIndex].text
var minMass=cw.minMassValue.value
var mass=cw.massValue.value
var maxMass=cw.maxMassValue.value
var radius=cw.radiusValue.value
var density=cw.densityValue.value
var gravity=cw.gravityValue.value
var escVel=cw.escapeVelValue.value
var sFluxMin =cw.minFluxValue.value
var sFluxMean=cw.meanFluxValue.value
var sFluxMax=cw.maxFluxValue.value
var teqMin =cw.minEqTempValue.value
var teqMean=cw.meanEqTempValue.value
var teqMax=cw.maxEqTempValue.value
var tsMin=cw.minSurfaceTempValue.value
var tsMean=cw.meanSurfaceTempValue.value
var tsMax=cw.maxSurfaceTempValue.value
var surfPress=cw.surfacePressureValue.value
var mag=cw.magValue.value
var apparSize=cw.apparSizeValue.value
var period=cw.periodValue.value
var semMajorAxis=cw.semMajorAxisValue.value
var excentricity=cw.excentricityValue.value
var meanDistance=cw.meanDistValue.value
var inclination=cw.inclinationValue.value
var omega=cw.omegaValue.value
//---GET STAR NAME---
if(cw.starNamePrefixSelect.selectedIndex!=0 && cw.starNameValue.value!="")
{
   var pref=cw.starNamePrefixSelect.options[cw.starNamePrefixSelect.selectedIndex].text
   var name=cw.starNameValue.value
   var starName=pref+" "+name
}
else
  var starName=cw.starNameLongValue.value
var starNameHD=cw.starNameHDValue.value
var starNameHIP=cw.starNameHIPValue.value
var constellation=cw.conCodeSelect.options[cw.conCodeSelect.selectedIndex].text
var starType=cw.starTypeValue.value
var starMass=cw.starMassValue.value
var starRadius=cw.starRadiusValue.value
var starTeff=cw.starEffTempValue.value
var starLuminosity=cw.starLumValue.value
var starFeH=cw.fehRatioValue.value
var starAge=cw.starAgeValue.value
var starApparMag=cw.starAppMagValue.value
var starDistance=cw.starDistValue.value
var starRA=cw.raValue.value
var starDEC=cw.decValue.value
var starMagfromPlanet=cw.magPlanetValue.value
var starSizefromPlanet=cw.sizePlanetValue.value
var starNoPlanets=cw.planetNumValue.value
var starNoPlanetsHab=cw.planetNumHabValue.value
var starHabZoneMin=cw.habZoneMinValue.value
var starHabZoneMax=cw.habZoneMaxValue.value
var habitableZoneDistance=cw.distHZDValue.value
var habitableZoneComposition=cw.compHZCValue.value
var habitableZoneAtmosphere=cw.atmosHZAValue.value
var habitableZoneIndex=cw.hziValue.value
var standardPrimaryHabitability=cw.sphValue.value
var ineriorESI=cw.iESIValue.value
var surfaceESI=cw.sESIValue.value
var ESI=cw.ESIValue.value
var starHabCat=cw.habCatValue.value
var habitable=cw.habPotValue.value
var habMoon=cw.habMoonValue.value
var confirmed=cw.confirmedValue.value
var discoveryMethod=cw.discMethodSelect.options[cw.discMethodSelect.selectedIndex].text
var discoveryYear=cw.discYearValue.value

if(starName!="" &&  meanDistance!=""  &&  planetName!="" && discoveryYear!="")
{
    //---determine if star is in the database---
    if(isStarInDatabase(starName,constellation) ==true)
    {
      var exoDocType = document.implementation.createDocumentType ("exo", "SYSTEM", "<!ENTITY tf 'exoplanet'>");
                var xmlDoc = document.implementation.createDocument ("", "exo", exoDocType);

                var exoXml = xmlDoc.createElement ("exoplanet");

                xmlDoc.documentElement.appendChild (exoXml);

        exoXml.setAttribute("name",planetName)
        exoXml.setAttribute("nameKepler",nameKepler)
        exoXml.setAttribute("nameKOI",nameKOI)
        exoXml.setAttribute("zoneClass",zoneClass)
        exoXml.setAttribute("massClass",massClass)
        exoXml.setAttribute("compositionClass",compositionClass)
        exoXml.setAttribute("atmosphereClass",atmosphereClass)
        exoXml.setAttribute("habitableClass",habitableClass)
        exoXml.setAttribute("minMass",minMass)
        exoXml.setAttribute("mass",mass)
        exoXml.setAttribute("maxMass",maxMass)
        exoXml.setAttribute("radius",radius)
        exoXml.setAttribute("density",density)
        exoXml.setAttribute("gravity",gravity)
        exoXml.setAttribute("escVel",escVel)
        exoXml.setAttribute("sFluxMin",sFluxMin)
        exoXml.setAttribute("sFluxMean",sFluxMean)
        exoXml.setAttribute("sFluxMax",sFluxMax)
        exoXml.setAttribute("teqMin",teqMin)
        exoXml.setAttribute("teqMean",teqMean)
        exoXml.setAttribute("teqMax",teqMax)
        exoXml.setAttribute("tsMin",tsMin)
        exoXml.setAttribute("tsMean",tsMean)
        exoXml.setAttribute("tsMax",tsMax)
        exoXml.setAttribute("surfPress",surfPress)
        exoXml.setAttribute("mag",mag)
        exoXml.setAttribute("apparSize",apparSize)
        exoXml.setAttribute("period",period)
        exoXml.setAttribute("semMajorAxis",semMajorAxis)
        exoXml.setAttribute("eccentricity",excentricity)
        exoXml.setAttribute("meanDistance",meanDistance)
        exoXml.setAttribute("inclination",inclination)
        exoXml.setAttribute("omega",omega)
        exoXml.setAttribute("starName",starName)
        exoXml.setAttribute("starNameHD",starNameHD)
        exoXml.setAttribute("starNameHIP",starNameHIP)
        exoXml.setAttribute("starConstellation",constellation)
        exoXml.setAttribute("starType",starType)
        exoXml.setAttribute("starMass",starMass)
        exoXml.setAttribute("starRadius",starRadius)
        exoXml.setAttribute("starTeff",starTeff)
        exoXml.setAttribute("starLuminosity",starLuminosity)
        exoXml.setAttribute("starFeH",starFeH)
        exoXml.setAttribute("starAge",starAge)
        exoXml.setAttribute("starApparMag",starApparMag)
        exoXml.setAttribute("starDistance",starDistance)
        exoXml.setAttribute("starRA",starRA)
        exoXml.setAttribute("starDEC",starDEC)
        exoXml.setAttribute("starMagfromPlanet",starMagfromPlanet)
        exoXml.setAttribute("starSizefromPlanet",starSizefromPlanet)
        exoXml.setAttribute("starNoPlanets",starNoPlanets)
        exoXml.setAttribute("starNoPlanetsHab",starNoPlanetsHab)
        exoXml.setAttribute("starHabZoneMin",starHabZoneMin)
        exoXml.setAttribute("starHabZoneMax",starHabZoneMax)
        exoXml.setAttribute("habitableZoneDistance",habitableZoneDistance)
        exoXml.setAttribute("habitableZoneComposition",habitableZoneComposition)
        exoXml.setAttribute("habitableZoneAtmosphere",habitableZoneAtmosphere)
        exoXml.setAttribute("habitableZoneIndex",habitableZoneIndex)
        exoXml.setAttribute("standardPrimaryHabitability",standardPrimaryHabitability)
        exoXml.setAttribute("ineriorESI",ineriorESI)
        exoXml.setAttribute("surfaceESI",surfaceESI)
        exoXml.setAttribute("ESI",ESI)
        exoXml.setAttribute("starHabCat",starHabCat)
        exoXml.setAttribute("habitable",habitable)
        exoXml.setAttribute("habMoon",habMoon)
        exoXml.setAttribute("confirmed",confirmed)
        exoXml.setAttribute("discoveryMethod",discoveryMethod)
        exoXml.setAttribute("discoveryYear",discoveryYear)
        if(uEMAIL)
        var sentBy=uEMAIL
        else if(oEMAIL)
        var sentBy=oEMAIL
        var sentDate=new Date().getTime()
        exoXml.setAttribute("sentBy",sentBy)
        exoXml.setAttribute("sentDate",sentDate)

var sendXML=new XMLSerializer().serializeToString(exoXml)

   var XMLFile = new XMLHttpRequest();
   XMLFile.open("POST", "../Exoplanet/sendNewExoplanet.asp", true);
	XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
     XMLFile.onreadystatechange = function() {
        if (XMLFile.readyState == 4 && XMLFile.status == 200) {
           var response=XMLFile.responseText
           if(response=="OK")
           {
              closeIframe("exoplanetAdd")

             //---append to
             ExoXmlDoc.appendChild(exoXml)


           }
           else
           if(response=="dup")
           {
             cw.responseDiv.innerHTML="Planet is already in database"


           }
           else
           console.log(response)

        }
    };


    XMLFile.send(sendXML);

   // setTimeout(aspResponse,2000)

   }
   else
   cw.responseDiv.innerHTML="Star <b>"+starName+"</b> not found in database"

      //console.log(xmlStng)
}
else
cw.responseDiv.innerHTML="Please complete required values"

}

function isStarInDatabase(starName,constellation)
{
     var findStarName=starName
     var reDash=/-/
    var reSpace=/ /


   findStarName=findStarName.toLowerCase()+"/"
           findStarName=findStarName.replace(reDash,"")
        findStarName=findStarName.replace(reSpace,"")

        var file = "../Constellation/AllConStars.js"
    function loadJSON(callback)
     {

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
    {     var foundStar=false
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

                if(name.indexOf(findStarName)!=-1 )
                {
                    //---get file name---
                    var myCon = star.con
                    if(myCon==constellation)
                    {
                      foundStar=true
                      break
                    }
              }
            }

            return foundStar
   })

}

