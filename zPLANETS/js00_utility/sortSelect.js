function sortSelected()
{
  var cw=beginCw

   if(cw.sortSelect.selectedIndex==1)
    sortSelectedStar()
   if(cw.sortSelect.selectedIndex==2)
    sortAlpha()
   if(cw.sortSelect.selectedIndex==3)
    sortDate()

   if(cw.sortSelect.selectedIndex==4)
   planetHabSort()
   if(cw.sortSelect.selectedIndex==5)
   planetAtmosSort()
   if(cw.sortSelect.selectedIndex==6)
   planetCompSort()
      if(cw.sortSelect.selectedIndex==7)
            openCustomSortDiv()





}


var ExoPacket
function buildSortPacket() //---onload---
{


      d3.json("../Begin/exoPacket.js", function(data)
      {
        ExoPacket=data
        //sortAlpha()
      })



}

function sortSelectedStar()
{



}

function sortAlpha()
{
  var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

   var option=document.createElement("option")
   option.text="Select Planet Name"
   cw.planetSelect.appendChild(option)


   var planetSelectArray=[]
    var prevHost=","

    for(var k=0;k<ExoPacket.length;k++)
    {
        var planet=ExoPacket[k].P_Name


            planetSelectArray.push(planet)


    }


    planetSelectArray.sort()
     for(var k=0;k<planetSelectArray.length;k++)
     {
             var option=document.createElement("option")
             var planet=planetSelectArray[k]

              option.value=planet
              option.text=planet
              cw.planetSelect.appendChild(option)
     }
}

function sortDate()
{
  var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Discovery Date"
   cw.planetSelect.appendChild(option)


   var planetSelectArray=[]


    for(var k=0;k<ExoPacket.length;k++)
    {
        //var host=ExoPacket[k].S_Name
        var planet=ExoPacket[k].P_Name

            var discYr=+ExoPacket[k].P_Disc_Year
            planetSelectArray.push({discYr:discYr,planet:planet})


    }


    planetSelectArray.sort(function(a, b){return a.discYr-b.discYr})
    planetSelectArray.reverse()

     for(var k=0;k<planetSelectArray.length;k++)
     {
             var option=document.createElement("option")

             var planet=planetSelectArray[k].planet
             var discYr=planetSelectArray[k].discYr

              option.value=planet
              option.text=discYr+" "+planet
              cw.planetSelect.appendChild(option)


     }
}


//===================Custom Sort=======================
var PacketsBuilt=false
function openCustomSortDiv()
{
    var myDiv=d3.select("#customSortDiv")
    var height=560
    myDiv.style("visibility","visible")
    myDiv.transition().duration(800).style("height",height+"px")

}




function closeCustomSortDiv()
{     var cw=beginCw   
    var myDiv=d3.select("#customSortDiv")
    var height=1
    //myDiv.style("visibility","visible")
    myDiv.transition().duration(400).style("height",height+"px")
   setTimeout('customSortDiv.style.visibility="hidden"',600)
   cw.sortSelect.selectedIndex=0
}

function sortPlanetOn(value)
{
   var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

  var td=document.getElementById(value)
  var optionText=td.previousSibling.innerHTML

   var option=document.createElement("option")
   option.text=optionText
   cw.planetSelect.appendChild(option)


    var planetSelectArray=[]
        var foundCnt=0
     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=eval("planet."+value)
       if(foundValue!="")
       {
          if(value=="S_NameHD")
          foundValue=+foundValue.replace(/HD /,"")
          if(value=="S_NameHIP")
     foundValue=+foundValue.replace(/HIP /,"")

         var myplanet=planet.P_Name
         foundSortArray.push({num:foundValue,name:myplanet})

       }


   }


  foundSortArray.sort(function(a, b){return a.num-b.num})


  for(var k=0;k<foundSortArray.length;k++)
  {

     var num=foundSortArray[k].num
     if(value=="S_NameHD")
         num="HD "+num
     if(value=="S_NameHIP")
         num="HD "+num

    var option=document.createElement("option")
    option.value=foundSortArray[k].name
      option.text="("+num+") "+foundSortArray[k].name
     cw.planetSelect.appendChild(option)
  }

  closeCustomSortDiv()
}



function planetHabSort()
{    var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Habitable Class"
   cw.planetSelect.appendChild(option)


    var planetSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_HabitableClass
       if(foundValue!="")
       {



       var myplanet=planet.P_Name

         foundSortArray.push([foundValue,myplanet])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var hab=foundSortArray[k][0]

    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=hab+" @ "+foundSortArray[k][1]
     cw.planetSelect.appendChild(option)
  }


}

function planetAtmosSort()
{    var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Atmosphere Class"
   cw.planetSelect.appendChild(option)


    var planetSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_AtmosphereClass
       if(foundValue!="")
       {


         var myplanet=planet.P_Name

         foundSortArray.push([foundValue,myplanet])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var atmos=foundSortArray[k][0]
     var planetLetter=foundSortArray[k][2]
    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=atmos+" @ "+foundSortArray[k][1]
     cw.planetSelect.appendChild(option)
  }


}

function planetCompSort()
{     var cw=beginCw

  for(var k=cw.planetSelect.options.length-1;k>=0;k--)
    cw.planetSelect.removeChild(cw.planetSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Composition Class"
   cw.planetSelect.appendChild(option)


    var planetSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_CompositionClass
       if(foundValue!="")
       {


         var myplanet=planet.P_Name

         foundSortArray.push([foundValue,myplanet])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var comp=foundSortArray[k][0]

    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=comp+" @ "+foundSortArray[k][1]
     cw.planetSelect.appendChild(option)
  }


}
