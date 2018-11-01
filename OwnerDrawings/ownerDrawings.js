

function writeOwnerDrawings()
{
   if(SavedOwnerEmail)  //---saved on Visiting---
        oEMAIL=SavedOwnerEmail
  openOwnerDrawingsButton.style.borderStyle = "inset"
       topNavDiv.style.display="none"
  var cw = ownerDrawingsCw

  var tables=cw.document.getElementsByTagName("table")
var drawingTable=tables[2]

  //---clear current table---

          var rows = drawingTable.rows
          for(var k = rows.length-1; k>0; k--)
            drawingTable.deleteRow(k)

    var drawings = XMLDrawingLibraryDoc.childNodes


    var rowCnt=0
  for(var k = 0; k<drawings.length; k++)
  {
    var drawing = drawings.item(k)
    var email= drawing.getAttribute("email")
    if(email==oEMAIL)
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
        var starName = xml2txt(myDrawing.getAttribute("name"))
       var description = xml2txt(myDrawing.getAttribute("description"))
        var ownerName = xml2txt(myDrawing.getAttribute("ownerName"))
        var email = myDrawing.getAttribute("email")
        FOLDER=folder

   var xml2File = "../DrawingLibrary/"+folder+"/CelestialBounds.xml"
        var load2XML = new XMLHttpRequest;
        load2XML.onload = callback2;
        load2XML.open("GET", xml2File, true);
        load2XML.send();
        function callback2()
        {   loginClearAll()
             OwnerDrawing=true
            //---responseText---
            var xmlString = load2XML.responseText

            //---DOMParser---
            var parser = new DOMParser();
            XMLBounds = parser.parseFromString(xmlString, "text/xml").documentElement;
            //<celestialBounds    constellation="'+conValue+'"  celestialScale="'+View.k+'" celestialRotate="'+View.r+'"  boundries='+boundries+'"   />

            var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
            var crd1 = parseFloat(centerSplit[0])
            var crd2 = parseFloat(centerSplit[1])
            PrimaryStarCoords =[crd1, crd2]

            var con = XMLBounds.getAttribute("constellation")

            var initStarView = XMLBounds.getAttribute("initStarDwg")
            var viewK = XMLBounds.getAttribute("celestialScale")
            var viewR = XMLBounds.getAttribute("celestialRotate")
            var trans = XMLBounds.getAttribute("celestialTranslate")
            console.log(initStarView)

            //if(initStarView=="true")
               initStarDwg(viewK, viewR, trans) //---stars.js creates star graticule and this star projection
           // else
               // goToDwgView(viewK, viewR, trans)  //---owner set view----
            getArrowDefs()//--preload for use in path end arrows---

            celestialContainerDiv.style.display = "none"
            starContainerDiv.style.display = "block"
           getMyStars()


           // loadAddedPaths()
           // getAddedStarData()
            //---provides projection on all elements zoom/rotate celestial sphere---
            MyStars = true //--redraw()---
            StopStarZoom = false
           if(initStarView=="false")
            {
                PlanetScale=+XMLBounds.getAttribute("planetScale")
                setTimeout(locatePlanets,1800)
             }

                //setTimeout(starRedraw,800)


            zoomLevelDiv.innerHTML = "&nbsp;"



                //---loaded at initMap---

               // DrawingNAME = hiddenDrawingNameValue.value
                DrawingDescription = description
                SelectedStarName = starName




            drawingNameDiv.innerHTML = "<span id=myDrawingNameSpan >"+SelectedStarName+" ("+con+")</span> <span style='color:green;font-family:verdana;font-size:12px'> Contact:<a href=mailto:"+email+"?subject=SVG-Stars%20Drawing:%20"+SelectedStarName.replace(/ /g,'%20')+" target=_blank style=color:red;text-decoration:underline title='Send email to this Star Map owner'  > "+ownerName +"</a></span>"
            drawingDescriptionDiv.innerHTML = DrawingDescription
            drawingDescriptionDiv.style.visibility = "visible"
            drawingNameDiv.style.visibility = "visible"



           zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

             navButtonViz()

             closeIframe("ownerDrawings")
              topNavDiv.style.visibility = "visible"
              navTable.style.visibility = "visible"
              measureDiv.style.visibility = "visible"
              openBeginButton.style.visibility = "visible"

            deleteAllCookies()
                CookieSetDate = "@"+new Date().getTime()
                setCookie("_SVGStars_Folder"+CookieSetDate, FOLDER, 180)
                setCookie(FOLDER+"_SVGStars_DrawingNAME"+CookieSetDate, SelectedStarName, 180)
                setCookie(FOLDER+"_SVGStars_DrawingDescription"+CookieSetDate, DrawingDescription, 180)
                setCookie(FOLDER+"_SVGStars_Owner_NAME"+CookieSetDate, oNAME, 180)
                setCookie(FOLDER+"_SVGStars_ID"+CookieSetDate, ID, 180)
                if(oEMAIL)
                    setCookie(FOLDER+"_SVGStars_Owner_EMAIL"+CookieSetDate, oEMAIL, 180)


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
