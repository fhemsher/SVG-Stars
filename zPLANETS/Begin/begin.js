 var MySelectedStarName
function writePlanetSelect()
{         var cw=beginFrame.contentWindow
             cw.sortSelect.options[1].disabled=false  
    if(parent.ExoDoc)
    {

       var planets = parent.ExoDoc.childNodes


      for(var k=0;k<planets.length;k++)
      {
         var planet=planets[k]
          var option=cw.document.createElement("option")
            option.value=planet.getAttribute("Name")    
            option.text=planet.getAttribute("Name")
            cw.planetSelect.appendChild(option)


      }

    }
    else
    {
          cw.sortSelect.options[1].disabled=true
          cw.sortSelect.selectedIndex=2
       if(!ExoPacket)
       {
             d3.json("../Begin/exoPacket.js", function(data)
          {
            ExoPacket=data
            sortAlpha()
          })



       }
       else
        sortAlpha()


    }


}

var SelectedPlanet
var SelectedPlanetName
var SelectedPlanetJSON
function planetSelected()
{
       var cw=beginFrame.contentWindow
    if(cw.planetSelect.selectedIndex!=0)
    {
        cw.beginMyPlanetButton.disabled=false
        var planetId=cw.planetSelect.options[cw.planetSelect.selectedIndex].value
        var planetName=cw.planetSelect.options[cw.planetSelect.selectedIndex].value


        SelectedPlanetName=planetName
       // SelectedPlanet=parent.document.getElementById(planetId)
          cw.planetNameSpan.innerHTML=SelectedPlanetName

        d3.json("../Begin/exoPacket.js", function(exos)
       {
            for(var j = 0; j<exos.length; j++)
            {
                 var exoPlanet = exos[j].P_Name
                 if(exoPlanet==SelectedPlanetName)
                 {
                       SelectedPlanetJSON=exos[j]
                        
                    var comp=SelectedPlanetJSON.P_CompositionClass
                    var atmos=SelectedPlanetJSON.P_AtmosphereClass
                    var hab=SelectedPlanetJSON.P_HabitableClass
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
                    break
                 }
            }
        })




    }
}
function cancelMyPlanet()
{


    
    closeBegin()

}
