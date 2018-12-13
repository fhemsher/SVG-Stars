var XMLDrawingLibraryDoc
function getDrawingLibrary()
{
  var xmlFile = "../DrawingLibrary/"+temp+"/drawingOwners.xml"
  var loadXML = new XMLHttpRequest();

  loadXML.onload = callbackPlaces;
  loadXML.open("GET", xmlFile, false);
  loadXML.send();
  function callbackPlaces()
  {
    var xmlString = loadXML.responseText
    var parser = new DOMParser();
    XMLDrawingLibraryDoc = parser.parseFromString(xmlString, "text/xml").documentElement;


  if(Mobile==true)
     measureDiv.style.visibility="hidden"

  }
}


function writeDrawingLibrary()
{

  openVisitButton.style.borderStyle = "inset"
  if(Mobile==false)
       topNavDiv.style.display="none"  
  var cw = visitDrawingLibraryCw

  //---clear current table---
  var rows = cw.drawingTable.rows
  for(var k = rows.length-1; k>0; k--)
    cw.drawingTable.deleteRow(k)

    var drawings = XMLDrawingLibraryDoc.childNodes

  for(var k = 0; k<drawings.length; k++)
  {
    var drawing = drawings.item(k)
    var folder = drawing.getAttribute("folder")
    var row = cw.drawingTable.insertRow(k+1)

    var rowFactor = (k/2)+""
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
        var visitCell = row.insertCell(4).innerHTML = "<button title='View this drawing' onClick=parent.visitThisDrawing('"+folder+"',"+k+") >view</button>"
        var publishCell = row.insertCell(5).innerHTML = "<button title='Publish this drawing to a web page' onClick=parent.publishThisDrawing('"+folder+"',"+k+") >publish</button>"


  }


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
function sec30Cookie(name, value) {  //---change to 10 secs--
  var date = new Date();
  date.setTime(date.getTime()+(10*1000));
  var expires = "; expires="+date.toGMTString();

  document.cookie = name+"="+value+expires+"; path=/";
}
var Visitor=false
var SavedOwnerEmail
function visitThisDrawing(folder, k)
{              measureDiv.style.visibility="hidden"
      saveDrawingButtonDiv.style.visibility="hidden"
     var myDrawing=XMLDrawingLibraryDoc.childNodes.item(k)
        var starName = xml2txt(myDrawing.getAttribute("name"))
       var description = xml2txt(myDrawing.getAttribute("description"))
        var ownerName = xml2txt(myDrawing.getAttribute("ownerName"))
        var email = myDrawing.getAttribute("email")
        FOLDER=folder

   var xml2File = "../DrawingLibrary/"+folder+"/PlanetBounds.xml"
        var load2XML = new XMLHttpRequest;
        load2XML.onload = callback2;
        load2XML.open("GET", xml2File, true);
        load2XML.send();
        function callback2()
        {   loginClearAll()
            //---responseText---
            var xmlString = load2XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
          //"<bounds planetRotation=\""+PlanetView.r+"\"  planetScale=\""+PlanetView.k+"\" />"

            var viewK = XMLBounds.getAttribute("planetScale")
            var viewR = XMLBounds.getAttribute("planetRotation")

                var rSplit = viewR.split(",")
                var r0 = parseFloat(rSplit[0])
                var r1 = parseFloat(rSplit[1])
                var r2 = parseFloat(rSplit[2])
                var k = parseFloat(viewK)
                PlanetView =
                {
                r: [r0, r1, r2], k: k
                };


                getArrowDefs()//--preload for use in path end arrows---




           // loadAddedPaths()
           // getAddedStarData()
            //---provides projection on all elements zoom/rotate celestial sphere---

            StopPlanetZoom = false


           setTimeout(planetRedraw,800)



                //---loaded at initMap---

               // DrawingNAME = hiddenDrawingNameValue.value
                DrawingDescription = description
                SelectedStarName = starName
                if(oEMAIL)
                    SavedOwnerEmail=oEMAIL
                oEMAIL=null



            drawingNameDiv.innerHTML = "<span id=myDrawingNameSpan >"+SelectedStarName+" ("+con+")</span> <span style='color:green;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+email+"?subject=SVG-Stars%20Drawing:%20"+SelectedStarName.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Star Map owner'  > "+ownerName +"</a></span>"
            drawingDescriptionDiv.innerHTML = DrawingDescription
            drawingDescriptionDiv.style.visibility = "visible"
            drawingNameDiv.style.visibility = "visible"



            zoomLevelDiv.innerHTML = (PlanetView.k).toFixed(0)



             closeIframe("visitDrawingLibrary")
              topNavDiv.style.visibility = "hidden"

              measureDiv.style.visibility = "hidden"
              if(Mobile==false)
              {   navTable.style.visibility = "visible"
                openBeginButton.style.visibility = "visible"
                navButtonViz()
              }



            Visitor=true

                       /*
          sec30Cookie("Visitor_SVGStars_Folder", folder)
          sec30Cookie("Visitor_Owner_NAME", ownerName)
          sec30Cookie("Visitor_Drawing_ID", id)
          sec30Cookie("drawingName", name)
          sec30Cookie("drawingDescription", description)
          */

      }
}


