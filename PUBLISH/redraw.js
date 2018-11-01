

var PrevTransX
var PrevTransY
var PrevScale
var PrevZoomInteger
var fixedVal //---changes decimal places based on zoom level---
function starRedraw()
{
    if(Mobile==false&&StopStarZoom==false)
    {
        if(d3.event)
        {
            starG.style.cursor = "default"
            StarProjection.translate(d3.event.translate).rotate(StarProjection.rotate()).scale(d3.event.scale);

            ConstellationView = false
            DefaultView = false
            ZoneView = false
            CoronaView = false
            SurfaceView = false
        }
        else //---rotateZoomStar.js   keys[+,-,*] or arrow keys---
        {
            console.log("rotateZoomStar")
            StarProjection.translate([PrevTransX, PrevTransY]).rotate(StarProjection.rotate()).scale(PrevScale);
            StarZoom.translate([PrevTransX, PrevTransY])
            StarZoom.scale(PrevScale)
            //---remove display on +- 50 ZoomInteger----
             var zoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)
                for(var k = 0; k<domAddElemG.childNodes.length; k++)
                {
                     var elem=domAddElemG.childNodes.item(k)
                     var myZoom=+elem.getAttribute("myZoom")
                     if(myZoom<(zoomInteger-50)||myZoom>(zoomInteger+50)  )
                        elem.setAttribute("display","none")
                     else
                      elem.removeAttribute("display")
                }
                for(var k = 0; k<domAddPathG.childNodes.length; k++)
                {
                    var path=domAddPathG.childNodes.item(k)
                    var myZoom=+path.getAttribute("myZoom")
                     if(myZoom<(zoomInteger-50)||myZoom>(zoomInteger+50)  )
                        path.setAttribute("display","none")
                     else
                      path.removeAttribute("display")
                }
             if(zoomInteger<400)
                 setTimeout('CoronaBG.style("display","none")',333)

        }

        StarView =
        {
        r: StarProjection.rotate(), k: StarProjection.scale()
        };

        if(MyStars==true)
        {
            var thisScale = (StarView.k/StarScale) //--opacity control---

            PrimaryStarZone.attr("d", StarMap)
            PrimaryStarCorona.attr("d", StarMap)
            PrimaryStarSurface.attr("d", StarMap)
            PrimaryStarGraticule.attr("d", StarMap)

            PrimaryStarZone.style("cursor", "default")
            PrimaryStarCorona.style("cursor", "default")
            PrimaryStarSurface.style("cursor", "default")

            PrimaryStarX.attr("transform", StarPoint(PrimaryStarCoords))
            if(PrevScale>10000)
                StarConBoundry.style("display", "none")
                else
                {
                    if(!MyConBoundries)
                    {
                        var myCon = HostStarDoc.getAttribute("Constellation")

                        for(var k = 0; k<ConLocArray.length; k++)
                        {
                            var con = ConLocArray[k][0]
                            if(con==myCon)
                            {
                                for(m = 0; m<ConBoundries.features.length; m++)
                                {
                                    var id = ConBoundries.features[m].id
                                    if(id==con)
                                    {
                                        MyConBoundries = ConBoundries.features[m]
                                        StarConBoundry.datum(MyConBoundries)
                                        .attr("d", StarMap)

                                        break
                                    }
                                }
                                break
                            }
                        }
                    }

                    StarConBoundry.attr("d", StarMap)
                    StarConBoundry.style("display", "block")

                }

            if(PrevZoomInteger>400)
            {

                    ExoplanetG.style("display", "block")
                    OrbitG.style("display", "block")

                    OrbitG.selectAll(".orbit").attr("d", StarMap)

                    var minZoneD = hzMinPath.getAttribute("d")
                    var maxZoneD = hzMaxPath.getAttribute("d")
                    var hzPathD = minZoneD+" "+maxZoneD
                    hzZonePath.setAttribute("d", hzPathD)

            }

            if(PlanetScale&&PlanetsLoaded)
            {
                PlanetG.style("display", "block")
                PlanetG.selectAll(".exoCircle")
                .data(PlanetCoordsArray)
                .attr("transform", function(d)
                    {

                        return StarPoint(d)+"scale("+(StarView.k/StarScale)/PlanetScale+")" //+"rotate("+d[1]+" "+d[2]+" "+d[3]+")"
                    }
                )
            }

        }
        else
        {

            ExoplanetG.style("display", "none")
            OrbitG.style("display", "none")
            PlanetG.style("display", "none")
            saveDrawingButtonDiv.style.visibility = "hidden"
        }
        if(PrevZoomInteger>500)
            CoronaBG.style("display", "block")
            else
                CoronaBG.style("display", "none")



                d3.select("#"+PrimaryStarID).attr("transform", StarPoint(PrimaryStarCoords)+"scale("+thisScale+")")

                if(LatLngPntSet==true&&LatLngSetPnt)
            {
                StarSVG.select("#latLngX").attr("transform", StarPoint(LatLngSetPnt))
                //---update SETx,SETy
                var xy = StarProjection(LatLngSetPnt)
                SETx = xy[0]
                SETy = xy[1]
            }

        if(AddElemCoordsArray.length>0)
        {
            d3.select("#domAddElemG").selectAll(".addElem")
            .data(AddElemCoordsArray)
            .attr("transform", function(d)
                {
                    var rotate = ""
                    if(d[3])
                        rotate = "rotate("+d[3]+")"
                        return StarPoint(d[0])+"scale("+(StarView.k/StarScale)/d[1]+")"+rotate
                }
            )

            for(var k = 0; k<AddElemCoordsArray.length; k++)
            {
                var myId = AddElemCoordsArray[k][2]
                var myScale = AddElemCoordsArray[k][1]
                var fade = AddElemCoordsArray[k][4]
                if(fade=="true")
                    zoomVis(myId, myScale, thisScale)
            }

        }

        //----added paths----------------
        if(AddPathBBCoordsArray.length>0)
        {

            //-- AddPathBBCoordsArray.push([pathBBCoords,ActiveScale,id,linearD])
            d3.select("#domAddPathG").selectAll(".addPath")
            .data(AddPathBBCoordsArray)
            .attr("transform", function(d)
                {
                    return StarPoint(d[0])+"scale("+(StarView.k/StarScale)/d[1]+")"
                }
            )

            for(var k = 0; k<AddPathBBCoordsArray.length; k++)
            {
                var myId = AddPathBBCoordsArray[k][2]
                var myScale = AddPathBBCoordsArray[k][1]
                var fade = AddPathBBCoordsArray[k][3]
                if(fade)
                    zoomVis(myId, myScale, thisScale)
            }

        }

        zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

        PrevZoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)
        if(PrevZoomInteger<280)
            fixedVal = 5
            else if(PrevZoomInteger<400)
                fixedVal = 8
                else if(PrevZoomInteger>=400)
                    fixedVal = 10

                 if(d3.event)
                {
                    PrevScale = d3.event.scale

                    PrevTransX = d3.event.translate[0]
                    PrevTransY = d3.event.translate[1]

                }

    }
    else if(Mobile==true)
        starMobileRedraw()
}

function starMobileRedraw()
{
    if(StopStarZoom==false)
    {
        if(d3.event)
        {

            StarProjection.translate(d3.event.translate).rotate(StarProjection.rotate()).scale(d3.event.scale);

            ConstellationView = false
            DefaultView = false
            ZoneView = false
            CoronaView = false
            SurfaceView = false
        }
        else //---rotateZoomStar.js   keys[+,-,*] or arrow keys---
        {
            StarProjection.translate([PrevTransX, PrevTransY]).rotate(StarProjection.rotate()).scale(PrevScale);
            StarZoom.translate([PrevTransX, PrevTransY])
            StarZoom.scale(PrevScale)
        }

        StarView =
        {
        r: StarProjection.rotate(), k: StarProjection.scale()
        };

        if(MyStars==true)
        {
            var thisScale = (StarView.k/StarScale) //--opacity control---

            PrimaryStarZone.attr("d", StarMap)
            PrimaryStarCorona.attr("d", StarMap)
            PrimaryStarSurface.attr("d", StarMap)

            PrimaryStarX.attr("transform", StarPoint(PrimaryStarCoords))
            if(PrevScale>10000)
                StarConBoundry.style("display", "none")
                else
                {

                    if(!MyConBoundries)
                    {
                        var myCon = StarsDoc.getAttribute("con")

                        for(var k = 0; k<ConLocArray.length; k++)
                        {
                            var con = ConLocArray[k][0]
                            if(con==myCon)
                            {
                                for(m = 0; m<ConBoundries.features.length; m++)
                                {
                                    var id = ConBoundries.features[m].id
                                    if(id==con)
                                    {
                                        MyConBoundries = ConBoundries.features[m]
                                        StarConBoundry.datum(MyConBoundries)
                                        .attr("d", StarMap)

                                        break
                                    }
                                }
                                break
                            }
                        }
                    }

                    StarConBoundry.attr("d", StarMap)
                    StarConBoundry.style("display", "block")
                }
                if(PrevScale>10000)
            {
                ConStarG.style("display", "none")
                ConStarViz = false //---database ----
            }
            else
            {
                ConStarViz = true //---database ----
                ConStarG.selectAll(".conStar")
                .attr("transform", function(d)
                    {
                        return StarPoint(d.geometry.coordinates)+"scale("+(StarView.k/StarScale)+")"
                    }
                ) //;
                ConStarG.style("display", "block")
            }

            if(MyExoplanet==true)
            {

                ZZexo.setAttribute("transform", StarPoint(PrimaryStarCoords)+"scale("+(StarView.k/StarScale)+")")

            }

            d3.select("#"+PrimaryStarID).attr("transform", StarPoint(PrimaryStarCoords)+"scale("+thisScale+")")

            if(AddElemCoordsArray.length>0)
            {
                d3.select("#domAddElemG").selectAll(".addElem")
                .data(AddElemCoordsArray)
                .attr("transform", function(d)
                    {
                        var rotate = ""
                        if(d[3])
                            rotate = "rotate("+d[3]+")"
                            return StarPoint(d[0])+"scale("+(StarView.k/StarScale)/d[1]+")"+rotate
                    }
                )

                for(var k = 0; k<AddElemCoordsArray.length; k++)
                {
                    var myId = AddElemCoordsArray[k][2]
                    var myScale = AddElemCoordsArray[k][1]
                    var fade = AddElemCoordsArray[k][4]
                    if(fade=="true")
                        zoomVis(myId, myScale, thisScale)

                }

            }


            if(AddPathBBCoordsArray.length>0)
            {

                //-- AddPathBBCoordsArray.push([pathBBCoords,ActiveScale,id,linearD])
                d3.select("#domAddPathG").selectAll(".addPath")
                .data(AddPathBBCoordsArray)
                .attr("transform", function(d)
                    {
                        return StarPoint(d[0])+"scale("+(StarView.k/StarScale)/d[1]+")"
                    }
                )

                for(var k = 0; k<AddPathBBCoordsArray.length; k++)
                {
                    var myId = AddPathBBCoordsArray[k][2]
                    var myScale = AddPathBBCoordsArray[k][1]
                    var fade = AddElemCoordsArray[k][4]
                    if(fade=="true")
                        zoomVis(myId, myScale, thisScale)

                }

            }

        }
        //zoomLevelDiv.innerHTML=((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

        PrevZoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)
        if(PrevZoomInteger<280)
            fixedVal = 5
            else if(PrevZoomInteger<400)
                fixedVal = 8
                else if(PrevZoomInteger>=400)
                    fixedVal = 10
                    if(d3.event)
                {
                    PrevScale = d3.event.scale
                    PrevTransX = d3.event.translate[0]
                    PrevTransY = d3.event.translate[1]

                }

    }
    //--end stopZoom---
}



function StarPoint(coords)
{
    if
    (coords)
    return "translate(" + StarProjection(coords) + ")";
}

function zoomVis(myId, myScale, thisScale)
{
    if(StarView.k!=PrevScale) //---not on pan---
    {
        var me = document.getElementById(myId)
        var myOpacity = parseFloat(me.getAttribute("opacity"))
        if(!myOpacity)
            myOpacity = 1

            if(!myScale)//--path--
            var myScale = parseFloat(me.getAttribute("myScale"))

            var zoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)
            //--each mousewheel zoom 'click' changes opacity by .1---
            var integerChange = PrevZoomInteger-zoomInteger //+/-  2 or 3
            if(integerChange<0)//--zoom in decrease opacity(fade)---
            opacityDelta = -.1
            else //---zoom out increase opacity
                opacityDelta = .1

                var display = me.style.display

                if(thisScale>myScale&&myOpacity>.1)
                var opacity = myOpacity+opacityDelta
                else if(thisScale>myScale&&myOpacity==.1)
                    var opacity = .1

                    var ratio = (thisScale/myScale).toFixed(2)

                    if(myOpacity==.1&&ratio>3&&ratio<4) //---increase opacity on zoom out---
                {
                    var opacity = myOpacity+opacityDelta
                    me.style.display = "inline"

                }
                if(thisScale<=myScale)
            {
                opacity = 1
                me.style.display = "inline"
            }

            if(opacity)
        {
            if(opacity<=.1)
                me.style.display = "none"
                me.setAttribute("opacity", opacity.toFixed(1))
        }
    }
}