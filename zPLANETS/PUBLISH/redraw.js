function planetRedraw()
{
    if(StopPlanetZoom==false)
    {

       PlanetProjection.translate(PlanetProjection.translate()).scale(PlanetProjection.scale());
        if(d3.event)
        {

            planetG.style.cursor = "default"
            PlanetProjection.translate(d3.event.translate).rotate(PlanetProjection.rotate()).scale(d3.event.scale);
         }






        PlanetView =
        {
        r: PlanetProjection.rotate(), k: PlanetProjection.scale()
        };

        PlanetViewGrid.attr("d", PlanetMap);
        //PlanetAtmos.attr("d", PlanetMap);
        //PlanetComp.attr("d", PlanetMap);
        projOutline.scale(PlanetProjection.scale());
    PlanetG.select("#planetAtmos").attr("d", PlanetMap);
    PlanetG.select("#planetComp").attr("d", PlanetMap);

         zoomLevelDiv.innerHTML=PlanetView.k.toFixed(0)







                if(LatLngPntSet==true&&LatLngSetPnt)
            {
                PlanetSVG.select("#latLngX").attr("transform", PlanetPoint(LatLngSetPnt))
                //---update SETx,SETy
                var xy = PlanetProjection(LatLngSetPnt)
                SETx = xy[0]
                SETy = xy[1]
            }




        if(AddElemCoordsArray.length>0)
        {
            d3.select("#domAddElemG").selectAll(".addElem")
            .data(AddElemCoordsArray)
            .attr("transform", function(d)
                {
                        var rote=""
                        if(d[3])
                        {
                           rote="rotate("+d[3]+")"


                        }

                        return PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1]+")"+rote
            })



        }

        //----added paths----------------
        if(AddPathBBCoordsArray.length>0)
        {

            d3.select("#domAddPathG").selectAll(".addPath")
            .data(AddPathBBCoordsArray)
            .attr("transform", function(d)
                {
                    console.log(PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1])
                        return PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1]+")"

                }
            )



        }

                if(d3.event)
                {
                    PrevPlanetScale = d3.event.scale
                    PrevPlanetTransX = d3.event.translate[0]
                    PrevPlanetTransY = d3.event.translate[1]

                }

    }
}
function PlanetPoint(coords)
{
    if
    (coords)
    return "translate(" + PlanetProjection(coords) + ")";
}
function starMobileRedraw()
{
    if(StopPlanetZoom==false)
    {
        if(d3.event)
        {

            PlanetProjection.translate(d3.event.translate).rotate(PlanetProjection.rotate()).scale(d3.event.scale);

            ConstellationView = false
            DefaultView = false
            ZoneView = false
            CoronaView = false
            SurfaceView = false
        }
        else //---rotateZoomPlanet.js   keys[+,-,*] or arrow keys---
        {
            PlanetProjection.translate([PrevTransX, PrevTransY]).rotate(PlanetProjection.rotate()).scale(PrevScale);
            PlanetZoom.translate([PrevTransX, PrevTransY])
            PlanetZoom.scale(PrevScale)
        }

        PlanetView =
        {
        r: PlanetProjection.rotate(), k: PlanetProjection.scale()
        };

        if(MyPlanets==true)
        {
            var thisScale = (PlanetView.k/PlanetScale) //--opacity control---

            PrimaryPlanetZone.attr("d", PlanetMap)
            PrimaryPlanetCorona.attr("d", PlanetMap)
            PrimaryPlanetSurface.attr("d", PlanetMap)

            PrimaryPlanetX.attr("transform", PlanetPoint(PrimaryPlanetCoords))
            if(PrevScale>10000)
                PlanetConBoundry.style("display", "none")
                else
                {

                    if(!MyConBoundries)
                    {
                        var myCon = PlanetsDoc.getAttribute("con")

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
                                        PlanetConBoundry.datum(MyConBoundries)
                                        .attr("d", PlanetMap)

                                        break
                                    }
                                }
                                break
                            }
                        }
                    }

                    PlanetConBoundry.attr("d", PlanetMap)
                    PlanetConBoundry.style("display", "block")
                }
                if(PrevScale>10000)
            {
                ConPlanetG.style("display", "none")
                ConPlanetViz = false //---database ----
            }
            else
            {
                ConPlanetViz = true //---database ----
                ConPlanetG.selectAll(".conPlanet")
                .attr("transform", function(d)
                    {
                        return PlanetPoint(d.geometry.coordinates)+"scale("+(PlanetView.k/PlanetScale)+")"
                    }
                ) //;
                ConPlanetG.style("display", "block")
            }
            /*
   MyPlanetG.selectAll(".star")
   .data(PlanetCoordsArray)
   .attr("transform", function(d)
   {
   return PlanetPoint(d)+"scale("+(PlanetView.k/PlanetScale)+")"
   }
   )
   */

            if(MyExoplanet==true)
            {
                alert(MyExoplanet)
                //ExoplanetG.select(".planet")
                //.data(ExoplanetCoordsArray)
                ZZexo.setAttribute("transform", PlanetPoint(PrimaryPlanetCoords)+"scale("+(PlanetView.k/PlanetScale)+")")
                // {
                // return PlanetPoint(PrimaryPlanetCoords)+"scale("+(PlanetView.k/PlanetScale)+")"
                // })
            }

            d3.select("#"+PrimaryPlanetID).attr("transform", PlanetPoint(PrimaryPlanetCoords)+"scale("+thisScale+")")

            if(AddElemCoordsArray.length>0)
            {
                d3.select("#domAddElemG").selectAll(".addElem")
                .data(AddElemCoordsArray)
                .attr("transform", function(d)
                    {
                        var rotate = ""
                        if(d[3])
                            rotate = "rotate("+d[3]+")"
                            return PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1]+")"+rotate
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
                        if((PlanetView.k/PlanetScale)>=(d[1]))
                                return PlanetPoint(d[0])
                            else
                                return PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1]+")"
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
                        return PlanetPoint(d[0])+"scale("+(PlanetView.k/PlanetScale)/d[1]+")"
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
        //zoomLevelDiv.innerHTML=((200000*Math.log(PlanetView.k)/Math.log(200000))/1000).toFixed(0)

        PrevZoomInteger = Math.floor((200000*Math.log(PlanetView.k)/Math.log(200000))/1000)
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





function zoomVis(myId, myScale, thisScale)
{
    if(PlanetView.k!=PrevScale) //---not on pan---
    {
        var me = document.getElementById(myId)
        var myOpacity = parseFloat(me.getAttribute("opacity"))
        if(!myOpacity||myOpacity>1)
            myOpacity = 1

            if(!myScale)//--path--
            var myScale = parseFloat(me.getAttribute("myScale"))

            var zoomInteger = Math.floor((200000*Math.log(PlanetView.k)/Math.log(200000))/1000)
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