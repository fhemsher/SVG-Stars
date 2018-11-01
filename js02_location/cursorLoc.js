/*
var click=false; // flag to indicate when shape has been clicked
var clickX, clickY; // stores cursor location upon first click
var moveX=0, moveY=0; // keeps track of overall transformation
var lastMoveX=0, lastMoveY=0; // stores previous transformation (move)

var elementWithFocus = null;

 function mouseDown(evt){
  evt.preventDefault();
  click=true;
        elementWithFocus = evt.target;
  clickX = evt.clientX;
  clickY = evt.clientY;
    }

    function move(evt){
     evt.preventDefault();
     if(click){
         moveX = lastMoveX + ( evt.clientX - clickX );
         moveY = lastMoveY + ( evt.clientY - clickY );
      elementWithFocus.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
       }
    }

    function endMove(evt){
        if(evt.type == 'mouseout' && click) {
            return;
        }
  click=false;
        elementWithFocus = null;
  lastMoveX = moveX;
  lastMoveY = moveY;
    }

*/


var SVGx
var SVGy
var LatLng
function startCursorLoc()
{
    zoomLevelDiv.style.visibility = "visible"
    //raDecDiv.style.visibility="visible"
    starSVG.setAttribute("onkeydown", "rotateMyStar(evt)")

    d3.select("#starSVG").on("mousemove", function()
        {

            SVGx = d3.mouse(this)[0]
            SVGy = d3.mouse(this)[1]
            if(addElemImageViz==true)trackDrawImage()
                if(addElemIconViz==true)trackDrawIcon()
                if(addElemSymbolViz==true)trackDrawSymbol()
                if(addElemCircleViz==true)trackDrawCircle()
                if(addElemEllipseViz==true)trackDrawEllipse()
                if(addElemRectViz==true)trackDrawRect()
                if(addElemPolygonViz==true)trackDrawPolygon()
                if(DrawTextStarted==true)trackDrawText()
                if(DrawPath==true||DrawPathStart==true)trackDrawPath()
                if(DrawPathEdit==true)trackDrawPathEdit()

                if(ShowDistance==true)trackDistance()

                LatLng = StarProjection.invert(d3.mouse(this))

                var ra = LatLng[0]
                if(ra<0)
                ra = 360+ra
                dec = LatLng[1]
                if(LatLngPntSet==false)
            {
                raValue.value = ra.toFixed(10)
                decValue.value = dec.toFixed(10)

            }

        }
    );

}

function stopCursorLoc()
{
    zoomLevelDiv.style.visibility = "hidden"
    d3.select("#starSVG").on("mousemove", null)
}

var LatLngPntSet = false
var LatLngSetPnt//---loc value
var LatLngPntSetElement = false
var SETx
var SETy

function setRaDecChecked()
{
    raValue.style.borderColor = ""
    decValue.style.borderColor = ""

    if(setRaDecCheck.checked==true)
    {
        LatLngPntSet = true
        setRaDecButton.disabled = false
        setRaDecButton.style.background = "violet"

        raValue.value = ""
        decValue.value = ""
        setRaDecButton.style.visibility = "visible"
        LatLngSetPnt=null
    }
    else
    {
        setRaDecButton.disabled = true
        setRaDecButton.style.background = ""
        latLngX.style.display = "none"
        setRaDecButton.style.borderColor = ""
        setRaDecButton.style.borderStyle = ""
        setRaDecButton.style.visibility = "hidden"
        LatLngPntSet = false
         LatLngSetPnt=null  
    }
}

function setRaDecButtonClicked()
{
    if(raValue.value!="" && decValue.value!="")
    {
        LatLngPntSet = true

        var lng = parseFloat(raValue.value)
        var lat = parseFloat(decValue.value)
        var ll =[lng, lat]
        var xy = StarProjection(ll)
        SETx = xy[0]
        SETy = xy[1]

        LatLngX.attr("transform", StarPoint(ll))
        LatLngSetPnt = ll
        latLngX.style.display = "block"
        raValue.style.borderColor = "violet"
        decValue.style.borderColor = "violet"
        setRaDecButton.style.borderColor = "violet"
        setRaDecButton.style.borderStyle = "inset"
        setRaDecButton.disabled = true
        if(ActiveElem)//---place the active elem at set point---
        {
            if(ActiveElem&&(SymbolPlantStart==true|| DrawIcon == true|| DrawCircle == true|| DrawEllipse == true))
            {
                activeElem.setAttribute("transform", "translate("+SETx+" "+SETy+")")
                ActiveElem.attr("class", null)
                ActiveElem.style("cursor", "default")

                ActiveLL = StarProjection.invert([SETx, SETy])
                DrawX.style("display", "none")

            }

        }
        else
        {
            if(SymbolPlantStart==true)
                plantSymbol()
                else if(DrawIcon==true)
                    placeDrawIcon()
                    else if(DrawCircle==true)
                        placeDrawCircle()
                    else if(DrawEllipse==true)
                        placeDrawEllipse()

        }

    }
}