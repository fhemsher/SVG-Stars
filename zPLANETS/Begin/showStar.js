function cancelMyStar()
{

    if(PreviewHost==true)
        resetPreviewHostStar()
        else
        {
            var cw = beginCw
            cw.showExoDataButton.disabled = true
            cw.hostStarSelect.disabled = false
            cw.cancelMyStarButton.disabled = true
            cw.beginMyStarButton.disabled = true
            cw.sentRegistrationSpan.innerHTML = "&nbsp;"
            cw.hostStarSelect.selectedIndex = 0
            cw.hostStarSelect.disabled = false
            cw.placeDescriptionValue.value = ""
            var stars = hostStarG.childNodes
            for(var k = stars.length-1; k>=0; k--)
                hostStarG.removeChild(stars.item(k))

                var planets = domPlanetG.childNodes
                for(var k = planets.length-1; k>=0; k--)
                domPlanetG.removeChild(planets.item(k))

        }

}

var SelectedCon

var SelectedStar
var SelectedStarName
var HostStarXML //---string for registration---
var ExoPlanets =[]
var ExoPlanetXML //---string for registration---

function hostStarSelected()
{


    ExoPlanets =[]
    ExoPlanetXML = "<EXOPLANETS>"

    SelectedStar = null
    var cw = beginCw

    if(cw.hostStarSelect.selectedIndex!=0)
    {
        cw.showExoDataButton.disabled = true
        cw.previewHostStarButton.disabled = false

        var host = cw.hostStarSelect.options[cw.hostStarSelect.selectedIndex].value

        d3.json("../Begin/starPacket.js", function(data)
            {
                for(k = 0; k<data.length; k++)
                {

                    var starName = data[k].S_Name

                    if(starName==host)
                    {
                        SelectedStarName = host
                        SelectedStar = data[k]
                        HostStarXML = JSON.stringify(SelectedStar)
                        HostStarXML = HostStarXML.replace(/:/g, "=")
                        HostStarXML = HostStarXML.replace(/,/g, " ")
                        HostStarXML = HostStarXML.replace(/\{/, "")
                        HostStarXML = HostStarXML.replace(/\}/, "")
                        HostStarXML = HostStarXML.replace(/\"S_/g, "")
      HostStarXML = HostStarXML.replace(/\"\=/g, "=")
      HostStarXML = "<HOST id='hostStar"+(new Date().getTime())+"' "+HostStarXML+" />"


      SelectedCon = SelectedStar.S_Constellation
      placeHostStar()

      d3.json("../Begin/exoPacket.js", function(exos)
       {
        for(var j = 0; j<exos.length; j++)
        {
         var exoStar = exos[j].S_Name
         if(exoStar==host)
         {

          ExoPlanets.push(exos[j])
          var exoXML = JSON.stringify(exos[j])
          exoXML = exoXML.replace(/:/g, "=")
          exoXML = exoXML.replace(/,/g, " ")
          exoXML = exoXML.replace(/\{/, "")
          exoXML = exoXML.replace(/\}/, "")
          exoXML = exoXML.replace(/\"S_/g, "Host")
          exoXML = exoXML.replace(/\"P_/g, "")
          exoXML = exoXML.replace(/\"\=/g, "=")


          exoXML = "<EXO id='exoplanet"+(new Date().getTime())+"' "+exoXML+" />"
          ExoPlanetXML += exoXML


         }
        }

        ExoPlanetXML += "</EXOPLANETS>"

       }
      )

      cw.showExoDataButton.disabled = false
      cw.hostStarSelect.disabled = true
      break


     }


    }


   }
  )
 }
}

var HostStar =[]
function placeHostStar()
{
 /*
 {"S_Name":"1RXS 1609","S_NameHD":"","S_NameHIP":"","S_Constellation":"Sco",
 "S_Type":"K7V","S_Radius":"1.35","S_Teff":"4060.0","S_Luminosity":"0.444285",
 "S_FeH":"","S_Age":"0.011","S_ApparMag":"","S_Distance":"145.00",
 "S_RA":"16.1583","S_DEC":"-21.0828","S_MagfromPlanet":"-13.2",
 "S_SizefromPlanet":"0.0022","S_No_Planets":"1","S_No_PlanetsHZ":"0"
 ,"S_HabZoneMin":"0.540","S_HabZoneMax":"1.362","S_HabCat":"0"}


 */


 //---remove previous stars from universe--




 var stars = hostStarG.childNodes

 for(var k = stars.length-1; k>=0; k--)
  hostStarG.removeChild(stars.item(k))
  SelectedStar.S_Distance = 3.26156*(+SelectedStar.S_Distance) //---parsecs to ly---
  // dec==latitude, ra=hrs*15longitude
  SelectedStar.S_RA = 15*(+SelectedStar.S_RA)
  var ra = SelectedStar.S_RA
  var dec = (+SelectedStar.S_DEC)


  HostStar =[SelectedStar.S_Constellation, SelectedStar.S_Name, ra, dec]
  var con = SelectedStar.S_Constellation
  var code = parseInt("2734", 16)



  var hostStar = HostStarG.append("text")
  .attr("id", "hostStar")
  .attr("class", "host")
  .attr("stroke-width", 40*.02)
  .attr("font-size", 40)
  .attr("font-family", "Arial Unicode MS")
  .attr("x", -.4*40)
  .attr("y", .335*40)
  .attr("transform", CelestialPoint([ra, dec])+"scale("+(CelestialView.k/CelestialScale)+")")
  .text(String.fromCharCode(code))
  .attr("fill", "gold")
  .attr("name", SelectedStar.S_Name)
  .attr("stroke", "black")
  .style("cursor", "default")
  .attr("onmouseover", "showStarName(evt)")
  .attr("onmouseout", "hideStarName(evt)")





}

function showExoData()
{
 if(SelectedStar)
 {
  writeExoplanetDataTable()

  exoplanetDataTableDiv.style.display = "block"
 }
}



function writeExoplanetDataTable()
{

 S_NameTD.innerHTML = SelectedStar.S_Name,
 S_NameHDTD.innerHTML = SelectedStar.S_NameHD,
 S_NameHIPTD.innerHTML = SelectedStar.S_NameHIP,
 S_ConstellationTD.innerHTML = SelectedStar.S_Constellation,
 S_TypeTD.innerHTML = SelectedStar.S_Type,
 S_MassTD.innerHTML = SelectedStar.S_Mass,
 S_RadiusTD.innerHTML = SelectedStar.S_Radius,
 S_TeffTD.innerHTML = SelectedStar.S_Teff,
 S_LuminosityTD.innerHTML = SelectedStar.S_Luminosity,
 S_FeHTD.innerHTML = SelectedStar.S_FeH,
 S_AgeTD.innerHTML = SelectedStar.S_Age,
 S_ApparMagTD.innerHTML = SelectedStar.S_ApparMag,
 S_DistanceTD.innerHTML = SelectedStar.S_Distance,
 S_RATD.innerHTML = SelectedStar.S_RA,
 S_DECTD.innerHTML = SelectedStar.S_DEC,
 S_MagfromPlanetTD.innerHTML = SelectedStar.S_MagfromPlanet,
 S_SizefromPlanetTD.innerHTML = SelectedStar.S_SizefromPlanet,
 S_No_PlanetsTD.innerHTML = SelectedStar.S_No_Planets,
 S_No_PlanetsHZTD.innerHTML = SelectedStar.S_No_PlanetsHZ,
 S_HabZoneMinTD.innerHTML = SelectedStar.S_HabZoneMin,
 S_HabZoneMaxTD.innerHTML = SelectedStar. S_HabZoneMax,
 S_HabCatTD.innerHTML = SelectedStar.S_HabCat



 for(var m = 0; m<ExoPlanets.length; m++)
 {
  var exo = ExoPlanets[m]




  var sp = exo.P_Name.lastIndexOf(" ")
  var letter = exo.P_Name[sp+1]

  eval("S_NameTD"+letter).innerHTML = exo.S_Name


  eval("P_NameTD"+letter).innerHTML = exo.P_Name,
  eval("P_NameKeplerTD"+letter).innerHTML = exo.P_NameKepler,
  eval("P_NameKOITD"+letter).innerHTML = exo.P_NameKOI,
  eval("P_ZoneClassTD"+letter).innerHTML = exo.P_ZoneClass,
  eval("P_MassClassTD"+letter).innerHTML = exo.P_MassClass,
  eval("P_CompositionClassTD"+letter).innerHTML = exo.P_CompositionClass,
  eval("P_AtmosphereClassTD"+letter).innerHTML = exo.P_AtmosphereClass,
  eval("P_HabitableClassTD"+letter).innerHTML = exo.P_HabitableClass,
  eval("P_MinMassTD"+letter).innerHTML = exo.P_MinMass,
  eval("P_MassTD"+letter).innerHTML = exo.P_Mass,
  eval("P_MaxMassTD"+letter).innerHTML = exo.P_MaxMass,
  eval("P_RadiusTD"+letter).innerHTML = exo.P_Radius,
  eval("P_DensityTD"+letter).innerHTML = exo.P_Density,
  eval("P_GravityTD"+letter).innerHTML = exo.P_Gravity,
  eval("P_EscVelTD"+letter).innerHTML = exo.P_EscVel,
  eval("P_SFluxMinTD"+letter).innerHTML = exo.P_SFluxMin,
  eval("P_SFluxMeanTD"+letter).innerHTML = exo.P_SFluxMean,
  eval("P_SFluxMaxTD"+letter).innerHTML = exo.P_SFluxMax,
  eval("P_TeqMinTD"+letter).innerHTML = exo.P_TeqMin,
  eval("P_TeqMeanTD"+letter).innerHTML = exo.P_TeqMean,
  eval("P_TeqMaxTD"+letter).innerHTML = exo.P_TeqMax,
  eval("P_TsMinTD"+letter).innerHTML = exo.P_TsMin,
  eval("P_TsMeanTD"+letter).innerHTML = exo.P_TsMean,
  eval("P_TsMaxTD"+letter).innerHTML = exo.P_TsMax,
  eval("P_SurfPressTD"+letter).innerHTML = exo.P_SurfPress,
  eval("P_MagTD"+letter).innerHTML = exo.P_Mag,
  eval("P_ApparSizeTD"+letter).innerHTML = exo.P_ApparSize,
  eval("P_PeriodTD"+letter).innerHTML = exo.P_Period,
  eval("P_SemMajorAxisTD"+letter).innerHTML = exo.P_SemMajorAxis,
  eval("P_EccentricityTD"+letter).innerHTML = exo.P_Eccentricity,
  eval("P_EccentricityTD"+letter).innerHTML = exo.P_Eccentricity,
  eval("P_InclinationTD"+letter).innerHTML = exo.P_Inclination,
  eval("P_MeanDistanceTD"+letter).innerHTML = exo.P_MeanDistance,
  eval("P_OmegaTD"+letter).innerHTML = exo.P_Omega,
  eval("P_HZDTD"+letter).innerHTML = exo.P_HZD,
  eval("P_HZCTD"+letter).innerHTML = exo.P_HZC,
  eval("P_HZATD"+letter).innerHTML = exo.P_HZA,
  eval("P_HZITD"+letter).innerHTML = exo.P_HZI,
  eval("P_SPHTD"+letter).innerHTML = exo.P_SPH,
  eval("P_IntESITD"+letter).innerHTML = exo.P_IntESI,
  eval("P_SurfESITD"+letter).innerHTML = exo.P_SurfESI,
  eval("P_ESITD"+letter).innerHTML = exo.P_ESI,
  eval("S_HabCatTD"+letter).innerHTML = exo.S_HabCat,
  eval("P_HabitableTD"+letter).innerHTML = exo.P_Habitable,
  eval("P_HabMoonTD"+letter).innerHTML = exo.P_HabMoon,
  eval("P_ConfirmedTD"+letter).innerHTML = exo.P_Confirmed,
  eval("P_Disc_MethodTD"+letter).innerHTML = exo.P_Disc_Method,
  eval("P_Disc_YearTD"+letter).innerHTML = exo.P_Disc_Year





 }



}


function showPrimaryStarData()
{
 SelectedStar = HostStarDoc
 writePrimaryDataTable()


   exoplanetDataTableDiv.style.display = "block"

}


function writePrimaryDataTable()
{

 S_NameTD.innerHTML = SelectedStar.getAttribute("Name"),
 S_NameHDTD.innerHTML = SelectedStar.getAttribute("NameHD"),
 S_NameHIPTD.innerHTML = SelectedStar.getAttribute("NameHIP"),
 S_ConstellationTD.innerHTML = SelectedStar.getAttribute("Constellation"),
 S_TypeTD.innerHTML = SelectedStar.getAttribute("Type"),
 S_MassTD.innerHTML = SelectedStar.getAttribute("Mass"),
 S_RadiusTD.innerHTML = SelectedStar.getAttribute("Radius"),
 S_TeffTD.innerHTML = SelectedStar.getAttribute("Teff"),
 S_LuminosityTD.innerHTML = SelectedStar.getAttribute("Luminosity"),
 S_FeHTD.innerHTML = SelectedStar.getAttribute("FeH"),
 S_AgeTD.innerHTML = SelectedStar.getAttribute("Age"),
 S_ApparMagTD.innerHTML = SelectedStar.getAttribute("ApparMag"),
 S_DistanceTD.innerHTML = SelectedStar.getAttribute("Distance"),
 S_RATD.innerHTML = SelectedStar.getAttribute("RA"),
 S_DECTD.innerHTML = SelectedStar.getAttribute("DEC"),
 S_MagfromPlanetTD.innerHTML = SelectedStar.getAttribute("MagfromPlanet"),
 S_SizefromPlanetTD.innerHTML = SelectedStar.getAttribute("SizefromPlanet"),
 S_No_PlanetsTD.innerHTML = SelectedStar.getAttribute("No_Planets"),
 S_No_PlanetsHZTD.innerHTML = SelectedStar.getAttribute("No_PlanetsHZ"),
 S_HabZoneMinTD.innerHTML = SelectedStar.getAttribute("HabZoneMin"),
 S_HabZoneMaxTD.innerHTML = SelectedStar.getAttribute("HabZoneMax"),
 S_HabCatTD.innerHTML = SelectedStar.getAttribute("HabCat")


 var exoElems = ExoDoc.childNodes
 for(var m = 0; m<exoElems.length; m++)
 {
  var exo = exoElems.item(m)




  var sp = exo.getAttribute("Name").lastIndexOf(" ")
  var letter = exo.getAttribute("Name")[sp+1]

  eval("S_NameTD"+letter).innerHTML = letter


  eval("P_NameTD"+letter).innerHTML = exo.getAttribute("Name")
  eval("P_NameKeplerTD"+letter).innerHTML = exo.getAttribute("NameKepler")
  eval("P_NameKOITD"+letter).innerHTML = exo.getAttribute("NameKOI")
  eval("P_ZoneClassTD"+letter).innerHTML = exo.getAttribute("ZoneClass")
  eval("P_MassClassTD"+letter).innerHTML = exo.getAttribute("MassClass")
  eval("P_CompositionClassTD"+letter).innerHTML = exo.getAttribute("CompositionClass")
  eval("P_AtmosphereClassTD"+letter).innerHTML = exo.getAttribute("AtmosphereClass")
  eval("P_HabitableClassTD"+letter).innerHTML = exo.getAttribute("HabitableClass")
  eval("P_MinMassTD"+letter).innerHTML = exo.getAttribute("MinMass")
  eval("P_MassTD"+letter).innerHTML = exo.getAttribute("Mass")
  eval("P_MaxMassTD"+letter).innerHTML = exo.getAttribute("MaxMass")
  eval("P_RadiusTD"+letter).innerHTML = exo.getAttribute("Radius")
  eval("P_DensityTD"+letter).innerHTML = exo.getAttribute("Density")
  eval("P_GravityTD"+letter).innerHTML = exo.getAttribute("Gravity")
  eval("P_EscVelTD"+letter).innerHTML = exo.getAttribute("EscVel")
  eval("P_SFluxMinTD"+letter).innerHTML = exo.getAttribute("SFluxMin")
  eval("P_SFluxMeanTD"+letter).innerHTML = exo.getAttribute("SFluxMean")
  eval("P_SFluxMaxTD"+letter).innerHTML = exo.getAttribute("SFluxMax")
  eval("P_TeqMinTD"+letter).innerHTML = exo.getAttribute("TeqMin")
  eval("P_TeqMeanTD"+letter).innerHTML = exo.getAttribute("TeqMean")
  eval("P_TeqMaxTD"+letter).innerHTML = exo.getAttribute("TeqMax")
  eval("P_TsMinTD"+letter).innerHTML = exo.getAttribute("TsMin")
  eval("P_TsMeanTD"+letter).innerHTML = exo.getAttribute("TsMean")
  eval("P_TsMaxTD"+letter).innerHTML = exo.getAttribute("TsMax")
  eval("P_SurfPressTD"+letter).innerHTML = exo.getAttribute("SurfPress")
  eval("P_MagTD"+letter).innerHTML = exo.getAttribute("Mag")
  eval("P_ApparSizeTD"+letter).innerHTML = exo.getAttribute("ApparSize")
  eval("P_PeriodTD"+letter).innerHTML = exo.getAttribute("Period")
  eval("P_SemMajorAxisTD"+letter).innerHTML = exo.getAttribute("SemMajorAxis")
  eval("P_EccentricityTD"+letter).innerHTML = exo.getAttribute("Eccentricity")
  eval("P_EccentricityTD"+letter).innerHTML = exo.getAttribute("Eccentricity")
  eval("P_InclinationTD"+letter).innerHTML = exo.getAttribute("Inclination")
  eval("P_MeanDistanceTD"+letter).innerHTML = exo.getAttribute("MeanDistance")
  eval("P_OmegaTD"+letter).innerHTML = exo.getAttribute("Omega")
  eval("P_HZDTD"+letter).innerHTML = exo.getAttribute("HZD")
  eval("P_HZCTD"+letter).innerHTML = exo.getAttribute("HZC")
  eval("P_HZATD"+letter).innerHTML = exo.getAttribute("HZA")
  eval("P_HZITD"+letter).innerHTML = exo.getAttribute("HZI")
  eval("P_SPHTD"+letter).innerHTML = exo.getAttribute("SPH")
  eval("P_IntESITD"+letter).innerHTML = exo.getAttribute("IntESI")
  eval("P_SurfESITD"+letter).innerHTML = exo.getAttribute("SurfESI")
  eval("P_ESITD"+letter).innerHTML = exo.getAttribute("ESI")
  eval("S_HabCatTD"+letter).innerHTML = exo.getAttribute("HabCat")
  eval("P_HabitableTD"+letter).innerHTML = exo.getAttribute("Habitable")
  eval("P_HabMoonTD"+letter).innerHTML = exo.getAttribute("HabMoon")
  eval("P_ConfirmedTD"+letter).innerHTML = exo.getAttribute("Confirmed")
  eval("P_Disc_MethodTD"+letter).innerHTML = exo.getAttribute("Disc_Method")
  eval("P_Disc_YearTD"+letter).innerHTML = exo.getAttribute("Disc_Year")





 }



}
