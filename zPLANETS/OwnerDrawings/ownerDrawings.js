

function writeOwnerDrawings()
{
   if(SavedOwnerEmail)  //---saved on Visiting---
        oEMAIL=SavedOwnerEmail


  openOwnerDrawingsButton.style.borderStyle = "inset"
       topNavDiv.style.display="none"
  var cw = ownerDrawingsCw

  var tables=cw.document.getElementsByTagName("table")
var drawingTable=cw.document.getElementById("drawingTable")
   console.log(drawingTable)
  //---clear current table---

          var rows = drawingTable.rows
          for(var k = rows.length-1; k>0; k--)
            drawingTable.deleteRow(k)

    var drawings = XMLDrawingLibraryDoc.childNodes

     drawingTable
    var rowCnt=0
  for(var k = 0; k<drawings.length; k++)
  {
    var drawing = drawings.item(k)
    var email= drawing.getAttribute("email")
    if(email==oEMAIL||email==owner.oEMAIL)
    {
        var folder = drawing.getAttribute("folder")
        var row = drawingTable.insertRow()

        var rowFactor = (rowCnt/2)+""
        if(rowFactor.indexOf(".")!=-1)
            var bg = "#96D7AE"
          else
            var bg = "#CEEBD9"

            row.style.backgroundColor = bg
            var nameCell = row.insertCell(0)
            nameCell.innerHTML = xml2txt(drawing.getAttribute("name"))
            var descriptionCell = row.insertCell(1)

            descriptionCell.innerHTML = xml2txt(drawing.getAttribute("description"))
            var ownerCell = row.insertCell(2).innerHTML = xml2txt(drawing.getAttribute("ownerName"))

            var lastPost = parseInt(drawing.getAttribute("lastPost"), 10)
            if(isCH)
            var postLocale = new Date(lastPost).toLocaleString().split(",")[0]
            else
             var postLocale = new Date(lastPost).toLocaleString().split(" ")[0]

            var lastPostCell = row.insertCell(3).innerHTML = postLocale
            var publishCell = row.insertCell(4).innerHTML = "<button title='Publish this drawing to a web page' onClick=parent.publishThisDrawing('"+folder+"',"+k+") >publish</button>"
            var visitCell = row.insertCell(5).innerHTML = "<button title='View/Edit this drawing' onClick=parent.showThisOwnerDrawing('"+folder+"',"+k+") >view</button>"
            var deleteCell = row.insertCell(6).innerHTML = "<button title='Delete this drawing from Library' style=background:red; id=deleteButton"+rowCnt+" onClick=parent.deleteThisDrawing('"+folder+"',"+k+")>delete</button>"
            rowCnt++
     }
  }

   fadeTextSVG()
}



function writeMobileDrawingLibrary()
{


  //---clear current table---
  var rows = drawingTable.rows
  for(var k = rows.length-1; k>0; k--)
   drawingTable.deleteRow(k)

    var drawings = XMLDrawingLibraryDoc.childNodes

  for(var k = 0; k<drawings.length; k++)
  {
    var drawing = drawings.item(k)
    var folder = drawing.getAttribute("folder")
    var row = drawingTable.insertRow(k+1)
       var name= xml2txt(drawing.getAttribute("name"))


    var rowFactor = (k/2)+""
    if(rowFactor.indexOf(".")!=-1)
        var bg = "#96D7AE"
      else
        var bg = "#CEEBD9"

        row.style.backgroundColor = bg
        row.title = "Visit this Star Map"
        row.style.cursor = "default"
        row.setAttribute("onmouseover","this.style.color='blue'")
        row.setAttribute("onmouseout","this.style.color=''")
        row.setAttribute("onclick","this.style.fontWeight='bold';loginVisitorMobile('"+folder+"','"+name+"')")

        var nameCell = row.insertCell(0)
        nameCell.innerHTML = name
        var descriptionCell = row.insertCell(1)
        descriptionCell.innerHTML = xml2txt(drawing.getAttribute("description"))

          var ownerCell = row.insertCell(2).innerHTML = xml2txt(drawing.getAttribute("ownerName"))
        var startMS=parseInt(drawing.getAttribute("startDate"),10)
        var startDate=new Date(startMS)
        var mo=startDate.getMonth()+1
        var day=startDate.getDate()
        var yr=startDate.getFullYear()

        var dateCell = row.insertCell(3).innerHTML = mo+"/"+day+"/"+yr

  }


}
//--when an element is added---
function updatePost()
{
  var drawings = XMLDrawingLibraryDoc.childNodes
  for(var k = 0; k<drawings.length; k++)
  {
    var drawing = drawings.item(k)
    var folder = drawing.getAttribute("folder")
    if(folder==FOLDER)
    {
      var posts = parseInt(drawing.getAttribute("posts"), 10)+1
      drawing.setAttribute("posts", posts)
      var lastPost = new Date().getTime().toLocaleString().split(",")[0]
      drawing.setAttribute("lastPost", lastPost)
      break
    }
  }

}

var OwnerDrawing=false
function showThisOwnerDrawing(folder, k)
{

     var myDrawing=XMLDrawingLibraryDoc.childNodes.item(k)
        DrawingNAME = xml2txt(myDrawing.getAttribute("name"))
      DrawingDescription = xml2txt(myDrawing.getAttribute("description"))
        oNAME = xml2txt(myDrawing.getAttribute("ownerName"))
        oEMAIL = myDrawing.getAttribute("email")
        var ID = myDrawing.getAttribute("id")
        FOLDER=folder
      getArrowDefs()
       loadAddedPaths()
       loadAddedElems()

   var xml2File = "../DrawingLibrary/"+folder+"/PlanetBounds.xml"
        var load2XML = new XMLHttpRequest;
        load2XML.onload = callback2;
        load2XML.open("GET", xml2File, true);
        load2XML.send();
        function callback2()
        {


             OwnerDrawing=true
            //---responseText---
            var xmlString = load2XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;


            PlanetView.k=+XMLBounds.getAttribute("planetScale")
            PrevPlanetScale =PlanetView.k
           PrevPlanetTransX=+XMLBounds.getAttribute("planetTranslate").split(",")[0]
           PrevPlanetTransY=+XMLBounds.getAttribute("planetTranslate").split(",")[1]
          PlanetProjection.translate([PrevPlanetTransX,PrevPlanetTransY])
          PlanetProjection.scale(PrevPlanetScale);


          var xml3File = "../DrawingLibrary/"+FOLDER+"/Planet.xml"
        var load3XML = new XMLHttpRequest;
        load3XML.onload = callback3;
        load3XML.open("GET", xml3File, true);
        load3XML.send();
        function callback3()
        {
             var xmlString = load3XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            var planetXML = parser.parseFromString(xmlString, "text/xml").documentElement;

                    var comp=planetXML.getAttribute("CompositionClass")
                    var atmos=planetXML.getAttribute("AtmosphereClass")
                    var hab=planetXML.getAttribute("HabitableClass")
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

                    startCursorLoc()
                   zoomLevelDiv.innerHTML=(PlanetView.k).toFixed(0)
                  PlanetZoom.translate(PlanetProjection.translate()).scale(PlanetProjection.scale())


                    closeIframe("ownerDrawings")
                    ownerSelectSpan.style.visibility = "visible"

                    drawingNameDiv.innerHTML = "<span  >"+DrawingNAME+"</span> <span style='color:black;font-family:verdana;font-size:12px'> Contact:<i style=color:blue;text-decoration:underline title='Send email to this drawing owner' onClick=openEmail() > "+oNAME+"</i></span>"
                    drawingDescriptionDiv.innerHTML = DrawingDescription+'<br><a style=font-size:80% title="See data table for this planet" href=javascript:showPlanetData()>Planet Data</a>'
                    PlanetRadius=planetXML.getAttribute("Radius")//--in EU---
                    diaSpan.innerHTML=numberWithCommas((2*6371*PlanetRadius).toFixed(0))+" KM"
                    measureDiv.style.visibility="visible"
                    drawingNameDiv.style.visibility="visible"
                    drawingDescriptionDiv.style.visibility="visible"
                    saveDrawingButtonDiv.style.visibility="visible"
                   navButtonViz()


                    removeFolderPlanetCookies()
                    var cookieSetDate = "@"+new Date().getTime()


                    setCookie("_SVGPlanets_Folder"+cookieSetDate,FOLDER,180)
                    setCookie(FOLDER+"_SVGPlanets_Owner_NAME"+cookieSetDate,oNAME,180)
    				setCookie(FOLDER+"_SVGPlanets_ID"+cookieSetDate,ID,180)
                    setCookie(FOLDER+"_SVGPlanets_Owner_EMAIL"+cookieSetDate,oEMAIL,180)
                    setCookie(FOLDER+"_SVGPlanets_DrawingNAME"+cookieSetDate,DrawingNAME,180)
                    setCookie(FOLDER+"_SVGPlanets_DrawingDescription"+cookieSetDate,DrawingDescription,180)


            }

    }
}
function deleteThisDrawing(folder,k)
{
     var cw = ownerDrawingsCw
     var deleteButton=cw.document.getElementById("deleteButton"+k)
     deleteButton.disabled=true
     deleteButton.innerHTML="deleted"
        var sendXML = "<SEND  folder=\""+folder+"\"  />"
    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../OwnerDrawings/deleteThisDrawing.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.onload = function()
    {
        if (this.status == 200)
        {  getDrawingLibrary()
            FOLDER=null
        }
        else
        console.log(XMLFile.responseText)
    };
    XMLFile.send(sendXML);

}
