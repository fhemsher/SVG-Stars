function celestialRedraw()
{
    if(StopCelestialZoom==false)
    {

        CelestialProjection.rotate(CelestialProjection.rotate()).scale(CelestialProjection.scale());

        var rot = CelestialProjection.rotate();
        projOutline.scale(CelestialProjection.scale());
        CelestialCenter =[-rot[0], -rot[1]];

        if(CelestialProjection.scale()<10000)
        {
            CelestialG.selectAll(".gridline").style("display", "block")

            CelestialG.selectAll(".gridline").attr("d", CelestialMap);

        }
        else
        {
            CelestialG.selectAll(".gridline").style("display", "none")

        }
        CelestialG.select("#celestialOutline").attr("d", CelestialOutline);

        rotationValue.value = CelestialView.r[2]

        Earth.attr("transform", CelestialPoint([0, 0]))//+"scale("+(CelestialView.k/CelestialScale)+")")
        Sun.attr("transform", CelestialPoint([sunDec, sunRA]))//+"scale("+(CelestialView.k/CelestialScale)+")")

        if(BeginStar==false)
        {
            CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);
            CelestialG.selectAll(".constname")
            .attr("transform", function(d)
                {
                    return CelestialPoint(d.geometry.coordinates);
                }
            )

            CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);
            CelestialG.selectAll(".constname")
            .attr("transform", function(d)
                {
                    return CelestialPoint(d.geometry.coordinates);
                }
            )

        }
        else
        {
            if(CelestialProjection.scale()<10000)
            {
                CelestialG.selectAll(".constname").style("display", "block")
                //CelestialG.selectAll(".boundaryline").style("display","block")
                CelestialG.selectAll(".constname")
                .attr("transform", function(d)
                    {
                        return CelestialPoint(d.geometry.coordinates);
                    }
                )

                CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);

            }
            else
            {
                CelestialG.selectAll(".constname").style("display", "none")

            }

            CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
            EarthPathCelestial.attr("d", CelestialMap)

        }
        if(ConStars)
        {
            if(ConStarsLoaded==true)
                PrimaryStarG.selectAll(".star")
                .attr("transform", CelestialPoint(PrimaryStarLL)+"scale("+(CelestialView.k/CelestialScale)+")") //;

                CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
                EarthPathCelestial.attr("d", CelestialMap)
                if(PrimaryStarPath.attr("d"))
                PrimaryStarPath.attr("d", CelestialMap)

        }

        if(PreviewHost==true)
        {
            CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
            EarthPathCelestial.attr("d", CelestialMap)
            if(PrimaryStarPath.attr("d"))
                PrimaryStarPath.attr("d", CelestialMap)
        }


            if(hostStarG.childNodes.length>0)
            HostStarG.selectAll(".host")
            .data([HostStar])
            .attr("transform", function(d)
                {
                    return CelestialPoint([d[2], d[3]])+"scale("+(CelestialView.k/CelestialScale)+")"
                }
            )
    }
}

function CelestialPoint(coords)
{
    if
    (coords)
    return "translate(" + CelestialProjection(coords) + ")";
}

var PrevTransX
var PrevTransY
var PrevScale
var PrevZoomInteger
var fixedVal //---changes decimal places based on zoom level---
function starRedraw()
{
    if(StopStarZoom==false)
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
                    if(HostStarDoc&&!MyConBoundries)
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

             if(MyExoplanet==true&&PrevZoomInteger>400)
            {
                if(Visitor==false&&Mobile==false)
                    saveDrawingButtonDiv.style.visibility = "visible"
                    saveDefaultViewSpan.innerHTML = ""
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
        if(MyExoplanet==true&&PrevZoomInteger>500)
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
            //============add/edit elements===================

        if(ActiveElem&&(EditImage||DrawImage)) //----image---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL)+"rotate("+RotateAngle+")")
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")"+"rotate("+RotateAngle+")")
                    DrawX.attr("transform", StarPoint(ActiveLL)+"rotate("+RotateAngle+")")
        }
        if(ActiveElem&&(EditIcon||DrawIcon)) //----icon---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL))
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
                    DrawX.attr("transform", StarPoint(ActiveLL))
        }
        if(ActiveElem&&(EditSymbol||DrawSymbol)) //----symbol---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL))
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
                    DrawX.attr("transform", StarPoint(ActiveLL))
        }
        if(ActiveElem&&(EditCircle||DrawCircle)) //----circle---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL))
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
                    DrawX.attr("transform", StarPoint(ActiveLL))
                    DragDot.attr("transform", StarPoint(ActiveLL))
        }

        if(ActiveElem&&(EditRect||DrawRect)) //----rect---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL))
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
                    DrawX.attr("transform", StarPoint(ActiveLL))
                    //DragDot.attr("transform",StarPoint(ActiveLL))
        }
        if(ActiveElem&&(EditText||DrawText)) //----text---
        {
            if((StarView.k/StarScale)>=(ActiveScale))
                ActiveElem.attr("transform", StarPoint(ActiveLL))
                else
                    ActiveElem.attr("transform", StarPoint(ActiveLL)+"scale("+(StarView.k/StarScale)/ActiveScale+")")
                    DrawX.attr("transform", StarPoint(ActiveLL))
                    //DragDot.attr("transform",StarPoint(ActiveLL))
        }

        if(ActiveElem&&(TwoPlusPointsSet==true||DrawPathEdit==true)) //---path----
        {
            d3.select("#activeElem").attr("d", StarMap)
            DrawX.attr("transform", StarPoint(ActivePoint))
            // DragCircleG.attr("transform",StarPoint(ActivePoint))
            for(var k = 0; k<PathLLArray.length; k++)
            {
                var dragCircle = document.getElementById("dragPnt"+k)
                var pnt = PathLLArray[k]
                dragCircle.setAttribute("transform", StarPoint(pnt)+"scale("+(StarView.k/StarScale)/ActiveScale+")")

            }
            var lastPntNum = PathLLArray.length-1
            var lastDragCircle = document.getElementById("dragPnt"+lastPntNum)
            var t3 = d3.transform(lastDragCircle.getAttribute("transform"))
            var transX = t3.translate[0]
            var transY = t3.translate[1]
            var pnt = starSVG.createSVGPoint();
            pnt.x = transX
            pnt.y = transY
            var sCTM = activeElem.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());
            RubberLine.attr("x1", Pnt.x)
            RubberLine.attr("y1", Pnt.y)

            if(DrawPathSmooth&&DrawPathEdit==false)
            {
                domWrapper.appendChild(activeElem)
                var bb = domWrapper.getBBox()
                var bbx = bb.x
                var bby = bb.y
                var bbw = bb.width
                var bbh = bb.height
                var bbCx = bbx+.5*bbw
                var bbCy = bby+.5*bbh
                drawPathSmooth.setAttribute("transform", "translate("+(-bbCx)+" "+(-bbCy)+")")
                var bb = domWrapper.getBBox()
                domActiveElemG.appendChild(activeElem)
                drawPathSmooth.removeAttribute("transform")
                var bbx = bb.x
                var bby = bb.y
                var bbw = bb.width
                var bbh = bb.height
                var bbCx = bbx+.5*bbw
                var bbCy = bby+.5*bbh
                var smoothBBCoords = StarProjection.invert([bbCx, bbCy])

                d3.select("#drawPathSmooth")
                .attr("transform", StarPoint(smoothBBCoords))

            }
            else if(DrawPathEditSmooth&&DrawPathEdit==true)
            {
                d3.select("#drawPathSmooth")
                .attr("transform", StarPoint(EditBBCoords))
            }

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
            /*
   MyStarG.selectAll(".star")
   .data(StarCoordsArray)
   .attr("transform", function(d)
   {
   return StarPoint(d)+"scale("+(StarView.k/StarScale)+")"
   }
   )
   */

            if(MyExoplanet==true)
            {
                alert(MyExoplanet)
                //ExoplanetG.select(".planet")
                //.data(ExoplanetCoordsArray)
                ZZexo.setAttribute("transform", StarPoint(PrimaryStarCoords)+"scale("+(StarView.k/StarScale)+")")
                // {
                // return StarPoint(PrimaryStarCoords)+"scale("+(StarView.k/StarScale)+")"
                // })
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
            if(SymbolCoordsArray.length>0)
            {
                d3.select("#symbolG").selectAll(".symbol")
                .data(SymbolCoordsArray)
                .attr("transform", function(d)
                    {
                        if((StarView.k/StarScale)>=(d[1]))
                                return StarPoint(d[0])
                            else
                                return StarPoint(d[0])+"scale("+(StarView.k/StarScale)/d[1]+")"
                    }
                )
                for(var k = 0; k<SymbolCoordsArray.length; k++)
                {
                    var myId = SymbolCoordsArray[k][2]
                    var myScale = SymbolCoordsArray[k][1]
                    zoomVis(myId, myScale)
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
        if(!myOpacity||myOpacity>1)
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
                    me.style.display = ""

                }
            if(thisScale<=myScale)
            {
                opacity = 1
                me.style.display = ""
            }

         if(opacity)
        {
            if(opacity<=.1)
                me.style.display = "none"

            if(opacity>1)opacity=1


                me.setAttribute("opacity", opacity.toFixed(1))
        }
    }
}