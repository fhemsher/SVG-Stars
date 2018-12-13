var RotateOK = false
var ZoomOK = false
var ConstellationView = false
var DefaultView = true //---on login---
var ZoneView = false
var CoronaView = false
var SurfaceView = false
//---keypress---
function rotateZoomMyStar()
{
    console.log(constellationLoad+" "+MyStars +" "+starContainerDiv.style.display)
    var cw = constellationCw
    if(constellationLoad==false&&MyStars==true&&starContainerDiv.style.display=="block")
    {
              if(MyExoplanet==true)
            {

               ExoplanetG.style("display","none")


            }



        myKey = (event.charCode)? event.which: event.keyCode //===ff===

            var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
            var crd1 = parseFloat(centerSplit[0])
            var crd2 = parseFloat(centerSplit[1])
            var coordXY = StarProjection([crd1, crd2])

            var centerDivX = CelestialWidth/2;
        var centerDivY = CelestialHeight/2;

        if(myKey==109&&ConstellationView==false) //- key----zoom OUT to constellation(hide ALL elems, show constellation outline) ------
        {
            ZoneView = false
            CoronaView = false

            var myCon = StarsDoc.getAttribute("con")

            for(var k = 0; k<ConLocArray.length; k++)
            {

                var con = ConLocArray[k][0]

                if(con==myCon)
                {
                    var conZoom = ConLocArray[k]

                    StarView.k = conZoom[1]
                    break;
                }
            }

            var trans = XMLBounds.getAttribute("celestialTranslateInit")

            var tSplit = trans.split(",")
            var boundsTransX = parseFloat(tSplit[0])
            var boundsTransY = parseFloat(tSplit[1])
            var myTrans =[boundsTransX, boundsTransY]
            var conZoom = ConLocArray[k]

            StarView.k = conZoom[1]

            StarView.r = conZoom[2]
            PrevScale = StarView.k
            PrevTransX = myTrans[0]
            PrevTransY = myTrans[1]
            ConstellationView = true
            DefaultView = true
            StarConBoundry.style("display", "block")

        }
        else if(myKey==107) // + key----FULL zoom IN to primary star zone------
        {

            StarConBoundry.style("display", "none")
            ConstellationView = false
            DefaultView = true
            var viewK = XMLBounds.getAttribute("celestialScaleInit")
            var viewR = XMLBounds.getAttribute("celestialRotateInit")
            var trans = XMLBounds.getAttribute("celestialTranslateInit")
            initMyStar(viewK, viewR, trans)

            if(ZoneView==false&&CoronaView==false)
            {
                var scale = 100000

                ZoneView = true

                StarProjection.scale(scale);
                var coordXY = StarProjection([crd1, crd2])
                var coordX = coordXY[0]
                var coordY = coordXY[1]

                var transX = centerDivX+(centerDivX-coordX)
                var transY = centerDivY+(centerDivY-coordY)

                PrevScale = scale
                PrevTransX = transX
                PrevTransY = transY

            }
            else if(ZoneView==true&&CoronaView==false) //----corona---
            {
                StarConBoundry.style("display", "none")

                var scale = 100000000

                CoronaView = true

                StarProjection.scale(scale);
                var coordXY = StarProjection([crd1, crd2])
                var coordX = coordXY[0]
                var coordY = coordXY[1]

                var transX = centerDivX+(centerDivX-coordX)
                var transY = centerDivY+(centerDivY-coordY)

                PrevScale = scale
                PrevTransX = transX
                PrevTransY = transY
            }
            else if(ZoneView==true&&CoronaView==true) //----surface----
            {
                StarConBoundry.style("display", "none")
                //---fine-tune scale for radius---
                var solRad = parseFloat(StarsDoc.getAttribute("radius"))
                if(solRad<.05)
                    solRad = .05
                    var scale = 800000000000*90/solRad
                     /*
                    if(scale>50000000000000)
                    scale = 50000000000000
                     */
                    ZoneView = false
                    CoronaView = false
                    StarProjection.scale(scale);
                var coordXY = StarProjection([crd1, crd2])
                var coordX = coordXY[0]
                var coordY = coordXY[1]

                var transX = centerDivX+(centerDivX-coordX)
                var transY = centerDivY+(centerDivY-coordY)

                PrevScale = scale
                PrevTransX = transX
                PrevTransY = transY
                 if(MyExoplanet==true)
            {

                ExoplanetG.style("display","block")
              ExoplanetG.selectAll(".planet")
                .data(ExoplanetCoordsArray)
                .attr("transform", function(d)
                {
                   return StarPoint(d)
                })
                 ExoplanetG.selectAll(".orbit").attr("d", StarMap);

            }

        }
        else if(DefaultView==true && myKey==106) // * key----RETURN to original scale/rotate------
        {
            ZoneView = false
            CoronaView = false
            ConstellationView = false
            StarConBoundry.style("display", "none")

            var viewK = XMLBounds.getAttribute("celestialScale")
            var viewR = XMLBounds.getAttribute("celestialRotate")
            var trans = XMLBounds.getAttribute("celestialTranslate")
            var rSplit = viewR.split(",")
            var r0 = parseFloat(rSplit[0])
            var r1 = parseFloat(rSplit[1])
            var r2 = parseFloat(rSplit[2])
            var k = parseFloat(viewK)
            StarView = {r:[r0, r1, r2], k: k};

            var tSplit = trans.split(",")
            transX = parseFloat(tSplit[0])
            transY = parseFloat(tSplit[1])
            var myTrans =[transX, transY]

            PrevTransX = transX
            PrevTransY = transY
            PrevScale = StarView.k

            StarConBoundry.style("display", "none")
            ConstellationView = false
            DefaultView = false

        }
        //---fine tune-----

        else if(myKey==38||myKey==40) //---zoom---
        {

            //---do not zoom at/above Corona level--
            if(PrevZoomInteger<225)
            {ConstellationView = false
                DefaultView = true
                var currentScale = StarView.k

                if(myKey==38)
                    var newScale = currentScale+(StarView.k*.01)
                    else if(myKey==40)
                        var newScale = currentScale-(StarView.k*.01)
                        StarView.k = newScale
                        StarProjection.scale(newScale)
                        StarZoom.scale(StarView.k)

                        PrevScale = newScale
            }
        }

        starRedraw()
        zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(2)
    }

        }  
    else if(StopCelestialZoom==false)
    {
        myKey = (event.charCode)? event.which: event.keyCode //===ff===

            //---clockwise 37---
            //---ccw 39----
            if(myKey==37||myKey==39)
        {
            var currentRotate = CelestialView.r[2]

            if(myKey==37)
                currentRotate += 1
                else if(myKey==39)
                    currentRotate -= 1
                    CelestialView.r[2] = currentRotate
                    CelestialProjection.rotate([CelestialView.r[0], CelestialView.r[1], CelestialView.r[2]])
                    RotateOK = true
             celestialRedraw()
        }
        else if(myKey==38||myKey==40)
        {
            //---zoom in 38---
            //---zoom out 40----

            var currentScale = CelestialView.k
            if(myKey==38)
                currentScale += (CelestialView.k/100)
                else if(myKey==40)
                    currentScale -= (CelestialView.k/100)
                    CelestialView.k = currentScale
                    CelestialProjection.scale(currentScale)
                    CelestialZoom.scale(CelestialView.k)
            celestialRedraw()
        }


    }


}

//---Preset Zoom Levels---
function zoomConView() //---[-]---
{   ConstellationView = true
    ZoneView = false
    CoronaView = false
    SurfaceView = false


     if(MyExoplanet==true)
            {

               ExoplanetG.style("display","none")


            }
    var myCon = HostStarDoc.getAttribute("Constellation")

    for(var k = 0; k<ConLocArray.length; k++)
    {
        var con = ConLocArray[k][0]

        if(con==myCon)
        {
            var conZoom = ConLocArray[k]

            StarView.k = conZoom[1]
            break;
        }
    }

    var trans = XMLBounds.getAttribute("celestialTranslateInit")

    var tSplit = trans.split(",")
    var boundsTransX = parseFloat(tSplit[0])
    var boundsTransY = parseFloat(tSplit[1])
    var myTrans =[boundsTransX, boundsTransY]
    var conZoom = ConLocArray[k]

    StarView.k = conZoom[1]

    StarView.r = conZoom[2]

    PrevScale = StarView.k
    PrevTransX = myTrans[0]
    PrevTransY = myTrans[1]
    ConstellationView = true
    DefaultView = false

    StarConBoundry.style("display", "block")


        starRedraw()


}

function zoomDefaultView()
{
    ConstellationView = false
    DefaultView = true
    ZoneView = false
    CoronaView = false
    SurfaceView = false
    StarConBoundry.style("display", "none")
     if(MyExoplanet==true)
    ExoplanetG.style("display","none")

    var viewK = XMLDefaultBounds.getAttribute("defaultScale")
    var viewR = XMLDefaultBounds.getAttribute("defaultRotate")
    var trans = XMLDefaultBounds.getAttribute("defaultTranslate")
    var rSplit = viewR.split(",")
    var r0 = parseFloat(rSplit[0])
    var r1 = parseFloat(rSplit[1])
    var r2 = parseFloat(rSplit[2])
    var k = parseFloat(viewK)
    StarView = {r:[r0, r1, r2], k: k};

    var tSplit = trans.split(",")
    transX = parseFloat(tSplit[0])
    transY = parseFloat(tSplit[1])
    var myTrans =[transX, transY]


    PrevTransX = transX
    PrevTransY = transY
    PrevScale = StarView.k

    StarConBoundry.style("display", "none")


        starRedraw()

}

function zoomPrimaryStarZoneView()
{
    if(MyExoplanet==true)
        ExoplanetG.style("display","none")

        saveDefaultViewSpan.innerHTML = ""
    ConstellationView = false
    DefaultView = false
    ZoneView = true
    CoronaView = false
    SurfaceView = false
    StarConBoundry.style("display", "none")
    var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
    var crd1 = parseFloat(centerSplit[0])
    var crd2 = parseFloat(centerSplit[1])
    var coordXY = StarProjection([crd1, crd2])

    var centerDivX = CelestialWidth/2;
    var centerDivY = CelestialHeight/2;

    var viewK = XMLBounds.getAttribute("celestialScaleInit")
    var viewR = XMLBounds.getAttribute("celestialRotateInit")
    var trans = XMLBounds.getAttribute("celestialTranslateInit")
    initStarDwg(viewK, viewR, trans)

    var scale = 100000

    StarProjection.scale(scale);
    var coordXY = StarProjection([crd1, crd2])
    var coordX = coordXY[0]
    var coordY = coordXY[1]

    var transX = centerDivX+(centerDivX-coordX)
    var transY = centerDivY+(centerDivY-coordY)

    PrevScale = scale
    PrevTransX = transX
    PrevTransY = transY


        starRedraw()


}

function zoomPrimaryStarCoronaView()
{
   if(MyExoplanet==true)
       ExoplanetG.style("display","none")
           saveDefaultViewSpan.innerHTML = ""
    ConstellationView = false
    DefaultView = false
    ZoneView = false
    CoronaView = true
    SurfaceView = false
    StarConBoundry.style("display", "none")
    var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
    var crd1 = parseFloat(centerSplit[0])
    var crd2 = parseFloat(centerSplit[1])
    var coordXY = StarProjection([crd1, crd2])

    var centerDivX = CelestialWidth/2;
    var centerDivY = CelestialHeight/2;

    var viewK = XMLBounds.getAttribute("celestialScaleInit")
    var viewR = XMLBounds.getAttribute("celestialRotateInit")
    var trans = XMLBounds.getAttribute("celestialTranslateInit")
    initStarDwg(viewK, viewR, trans)

    var scale = 100000000
    StarProjection.scale(scale);
    var coordXY = StarProjection([crd1, crd2])
    var coordX = coordXY[0]
    var coordY = coordXY[1]

    var transX = centerDivX+(centerDivX-coordX)
    var transY = centerDivY+(centerDivY-coordY)

    PrevScale = scale
    PrevTransX = transX
    PrevTransY = transY


        starRedraw()


}
var PlanetScale
function zoomPrimaryStarSurfaceView()
{

    saveDefaultViewSpan.innerHTML = ""
    StopCelestialZoom=true
    ConstellationView = false
    DefaultView = false
    ZoneView = false
    CoronaView = true




    SurfaceView = true
    StarConBoundry.style("display", "none")
   if(DefaultViewChanged==false)
   {
        var viewK = XMLBounds.getAttribute("celestialScaleInit")
        var viewR = XMLBounds.getAttribute("celestialRotateInit")
        var trans = XMLBounds.getAttribute("celestialTranslateInit")
        initStarDwg(viewK, viewR, trans)
        var solDiam = parseFloat(HostStarDoc.getAttribute("Radius"))*2
        if(solDiam<.1)
        solDiam = .1
        var scale = 800000000000*90/solDiam
        console.log(scale)
        if(scale>50000000000000)
        scale = 50000000000000
        // console.log(scale)

        StarView.k=scale


            StarProjection.scale(scale);
           var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
            var crd1 = parseFloat(centerSplit[0])
            var crd2 = parseFloat(centerSplit[1])
            var coordXY = StarProjection([crd1, crd2])

            var centerDivX = CelestialWidth/2;
            var centerDivY = CelestialHeight/2;

        var coordXY = StarProjection([crd1, crd2])
        var coordX = coordXY[0]
        var coordY = coordXY[1]

        var transX = centerDivX+(centerDivX-coordX)
        var transY = centerDivY+(centerDivY-coordY)

        PrevScale = scale
        PrevTransX = transX
        PrevTransY = transY
        if(PlanetsLoaded==false)
        {
           PlanetScale=StarView.k/StarScale
           StartScale=null
           setTimeout("StopStarZoom=true",800) 
           setTimeout(locatePlanets,1800)
        }
   }
   else
   {
        var viewK=DrawingViewScale
        var viewR=DrawingViewRotate
        var trans=DrawingViewTranslate


        goToDwgView(viewK, viewR, trans)
   }

    if(MyExoplanet==true)
            {

                ExoplanetG.style("display","block")
                 ExoplanetG.selectAll(".planet")
                .data(ExoplanetCoordsArray)
                .attr("transform", function(d)
                {
                   return StarPoint(d)
                })
                 ExoplanetG.selectAll(".orbit").attr("d", StarMap);
            }

    PrevZoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)



                                    setTimeout(starRedraw,200)




}


//=====================MOBILE=======================
function presetMobileZoomSelected()
{

    var selIndex = presetMobileZoomSelect.selectedIndex
    if(selIndex==1) //----constellation view---
        zoomConView()
        else if(selIndex==2) //----default view---
            zoomDefaultView()
            else if(selIndex==3) //----zone view---
                zoomPrimaryStarZoneView()
                else if(selIndex==4) //----corona view---
                    zoomPrimaryStarCoronaView()
                    else if(selIndex==5) //----surface view---
                        zoomPrimaryStarSurfaceView()

}
