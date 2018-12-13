function sortSelected()
{
  var cw=beginCw

   if(cw.sortSelect.selectedIndex==1)
    sortAlpha()
   if(cw.sortSelect.selectedIndex==2)
    sortDate()
   if(cw.sortSelect.selectedIndex==3)
    sortPlanets()
   if(cw.sortSelect.selectedIndex==4)
    sortCon()
   if(cw.sortSelect.selectedIndex==5)
   planetHabSort()
   if(cw.sortSelect.selectedIndex==6)
   planetAtmosSort()
   if(cw.sortSelect.selectedIndex==7)
   planetCompSort()
      if(cw.sortSelect.selectedIndex==8)
            openCustomSortDiv()





}

var StarPacket
var ExoPacket
function buildSortPackets() //---onload---
{
   d3.json("../Begin/starPacket.js", function(data)
  {
        StarPacket=data
      d3.json("../Begin/exoPacket.js", function(data)
      {
        ExoPacket=data
        sortAlpha()
      })

  })

}

function sortAlpha()
{
  var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Select Star Name"
   cw.hostStarSelect.appendChild(option)


   var starSelectArray=[]
    var prevHost=","

    for(var k=0;k<StarPacket.length;k++)
    {
        var host=StarPacket[k].S_Name
        var tst=","+host+","
        if(prevHost.indexOf(tst)==-1)
        {

            starSelectArray.push(host)

        }
    }


    starSelectArray.sort()
     for(var k=0;k<starSelectArray.length;k++)
     {
             var option=document.createElement("option")
             var host=starSelectArray[k]

              option.value=host
              option.text=host
              cw.hostStarSelect.appendChild(option)
     }
}

function sortDate()
{
  var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Discovery Date"
   cw.hostStarSelect.appendChild(option)


   var starSelectArray=[]


    for(var k=0;k<ExoPacket.length;k++)
    {
        var host=ExoPacket[k].S_Name
        var planet=ExoPacket[k].P_Name

            var discYr=+ExoPacket[k].P_Disc_Year
            starSelectArray.push({discYr:discYr,host:host,planet:planet})


    }


    starSelectArray.sort(function(a, b){return a.discYr-b.discYr})
    starSelectArray.reverse()

     for(var k=0;k<starSelectArray.length;k++)
     {
             var option=document.createElement("option")
             var host=starSelectArray[k].host
             var planet=starSelectArray[k].planet
             var discYr=starSelectArray[k].discYr

              option.value=host
              option.text=discYr+" "+planet
              cw.hostStarSelect.appendChild(option)


     }
}
function sortPlanets()
{
  var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Star Number of Planets"
   cw.hostStarSelect.appendChild(option)


   var starSelectArray=[]


    for(var k=0;k<StarPacket.length;k++)
    {
        var host=StarPacket[k].S_Name
        var planets=StarPacket[k].S_No_Planets

            var discYr=+ExoPacket[k].P_Disc_Year
            starSelectArray.push({planets:planets,host:host})


    }


    starSelectArray.sort(function(a, b){return a.planets-b.planets})
    starSelectArray.reverse()

     for(var k=0;k<starSelectArray.length;k++)
     {
             var option=document.createElement("option")
             var host=starSelectArray[k].host
             var planets=starSelectArray[k].planets


              option.value=host
              option.text=planets+" "+host
              cw.hostStarSelect.appendChild(option)


     }
}

function sortCon()
{
  var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Star Consellation"
   cw.hostStarSelect.appendChild(option)


   var starSelectArray=[]

    for(var k=0;k<StarPacket.length;k++)
    {
        var host=StarPacket[k].S_Name

            var con=StarPacket[k].S_Constellation
            starSelectArray.push([con,host])


    }


    starSelectArray.sort()
     for(var k=0;k<starSelectArray.length;k++)
     {
             var option=document.createElement("option")
             var con=starSelectArray[k][0]
             var host=starSelectArray[k][1]

              option.value=host
              option.text=con+" "+host
              cw.hostStarSelect.appendChild(option)
     }
}



var conSortArray=[]
function conSort()
{
  var cw=beginCw

      var options=cw.hostStarSelect.options
   if(conSortArray.length==0)
   {

       for(var k=1;k<options.length;k++)
       {
            var value=options[k].value
            var text=options[k].text
            var lastOpen=text.lastIndexOf("[")
            var lastClosed=text.lastIndexOf("]")
            var cons=text.substr(lastOpen,lastClosed)
            conSortArray.push([cons,value,text])
       }
       conSortArray.sort()

   }

   for(var k=options.length-1;k>0;k--)
   {
      var option=options[k]
      cw.hostStarSelect.removeChild(option)
   }


   for(var k=0;k<conSortArray.length;k++)
   {
      var option=document.createElement("option")
      option.value=conSortArray[k][1]
      option.text=conSortArray[k][2]
      cw.hostStarSelect.appendChild(option)
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
    myDiv.style("visibility","visible")
    myDiv.transition().duration(400).style("height",height+"px")
   setTimeout('customSortDiv.style.visibility="hidden"',600)
   cw.sortSelect.selectedIndex=0
}

function sortStarOn(value)
{
   var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

  var td=document.getElementById(value)
  var optionText=td.previousSibling.innerHTML

   var option=document.createElement("option")
   option.text=optionText
   cw.hostStarSelect.appendChild(option)


    var starSelectArray=[]
        var foundCnt=0
     var foundSortArray=[]
   for(var k=0;k<StarPacket.length;k++)
   {
        var star=StarPacket[k]
       var foundValue=eval("star."+value)
       if(foundValue!="")
       {
          if(value=="S_NameHD")
          foundValue=+foundValue.replace(/HD /,"")
          if(value=="S_NameHIP")
     foundValue=+foundValue.replace(/HIP /,"")

         var myStar=star.S_Name
         foundSortArray.push({num:foundValue,name:myStar})

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
     cw.hostStarSelect.appendChild(option)
  }

  closeCustomSortDiv()
}

function sortPlanetOn(value)
{
     var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

  var td=document.getElementById(value)
  var optionText="Planet "+td.previousSibling.innerHTML

   var option=document.createElement("option")
   option.text=optionText
   cw.hostStarSelect.appendChild(option)


    var starSelectArray=[]
        var foundCnt=0
     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=eval("planet."+value)
       if(foundValue!="")
       {


         var myStar=planet.S_Name
       var letterIndex=planet.P_Name.lastIndexOf(" ")
       var planetLetter=planet.P_Name.substr(letterIndex)
         foundSortArray.push({num:foundValue,name:myStar,planetLetter:planetLetter})

       }


   }


  foundSortArray.sort(function(a, b){return a.num-b.num})


  for(var k=0;k<foundSortArray.length;k++)
  {

     var num=foundSortArray[k].num
     var planetLetter=foundSortArray[k].planetLetter


    var option=document.createElement("option")
    option.value=foundSortArray[k].name
      option.text="("+num+") @ "+foundSortArray[k].name+" "+ planetLetter
     cw.hostStarSelect.appendChild(option)
  }

  closeCustomSortDiv()
}

function planetHabSort()
{    var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Habitable Class"
   cw.hostStarSelect.appendChild(option)


    var starSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_HabitableClass
       if(foundValue!="")
       {


         var myStar=planet.S_Name
       var letterIndex=planet.P_Name.lastIndexOf(" ")
       var planetLetter=planet.P_Name.substr(letterIndex)
         foundSortArray.push([foundValue,myStar,planetLetter])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var hab=foundSortArray[k][0]
     var planetLetter=foundSortArray[k][2]
    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=hab+" @ "+foundSortArray[k][1]+" "+planetLetter
     cw.hostStarSelect.appendChild(option)
  }


}

function planetAtmosSort()
{    var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Atmosphere Class"
   cw.hostStarSelect.appendChild(option)


    var starSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_AtmosphereClass
       if(foundValue!="")
       {


         var myStar=planet.S_Name
       var letterIndex=planet.P_Name.lastIndexOf(" ")
       var planetLetter=planet.P_Name.substr(letterIndex)
         foundSortArray.push([foundValue,myStar,planetLetter])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var atmos=foundSortArray[k][0]
     var planetLetter=foundSortArray[k][2]
    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=atmos+" @ "+foundSortArray[k][1]+" "+planetLetter
     cw.hostStarSelect.appendChild(option)
  }


}

function planetCompSort()
{     var cw=beginCw

  for(var k=cw.hostStarSelect.options.length-1;k>=0;k--)
    cw.hostStarSelect.removeChild(cw.hostStarSelect.options[k])

   var option=document.createElement("option")
   option.text="Planet Composition Class"
   cw.hostStarSelect.appendChild(option)


    var starSelectArray=[]

     var foundSortArray=[]
   for(var k=0;k<ExoPacket.length;k++)
   {
        var planet=ExoPacket[k]
       var foundValue=planet.P_CompositionClass
       if(foundValue!="")
       {


         var myStar=planet.S_Name
       var letterIndex=planet.P_Name.lastIndexOf(" ")
       var planetLetter=planet.P_Name.substr(letterIndex)
         foundSortArray.push([foundValue,myStar,planetLetter])

       }


   }
  foundSortArray.sort()
  for(var k=0;k<foundSortArray.length;k++)
  {
     var comp=foundSortArray[k][0]
     var planetLetter=foundSortArray[k][2]
    var option=document.createElement("option")
    option.value=foundSortArray[k][1]
      option.text=comp+" @ "+foundSortArray[k][1]+" "+planetLetter
     cw.hostStarSelect.appendChild(option)
  }


}
