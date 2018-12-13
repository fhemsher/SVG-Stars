
function planetSizeAdjust(factor)
{

    var mult = parseFloat(planetSizeAdjustSelect.options[planetSizeAdjustSelect.selectedIndex].text)
    var sizeAdd = parseFloat(factor)*mult

   adjustedPlantedSizeValue.value = sizeAdd+parseFloat(adjustedPlantedSizeValue.value)
    var radius=adjustedPlantedSizeValue.value

     //PlanetCoordsArray.push([path,planet,period])
     for(var k=0;k<PlanetCoordsArray.length;k++)
        PlanetCoordsArray[k][1].setAttribute("r",radius)
}