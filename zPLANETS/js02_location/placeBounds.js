//--click on star map title--
function placeHomeBounds()
{

    var con=XMLBounds.getAttribute("constellation")
    var viewK=XMLBounds.getAttribute("celestialScale")
    var viewR=XMLBounds.getAttribute("celestialRotate")
    var trans=XMLBounds.getAttribute("celestialTranslate")

    var rSplit=viewR.split(",")
    var r0=parseFloat(rSplit[0])
    var r1=parseFloat(rSplit[1])
    var r2=parseFloat(rSplit[2])
    var k=parseFloat(viewK)
    StarView= {r: [r0, r1, r2], k: k};

    var tSplit=trans.split(",")
    transX=parseFloat(tSplit[0])
    transY=parseFloat(tSplit[1])
    var myTrans=[transX,transY]


    StarZoom.translate(myTrans)

    StarZoom.scale(StarView.k)
    StarProjection.translate(myTrans).scale(StarView.k);
    StarView = {r: StarProjection.rotate(), k: StarProjection.scale()};
    EarthStar.attr("transform",StarPoint([0,0]))//+"scale("+(CelestialView.k/CelestialScale)+")")
    SunStar.attr("transform",StarPoint([sunDec,sunRA]))//+"scale("+(CelestialView.k/CelestialScale)+")")
    MyStarG.selectAll(".gridline").attr("d", StarMap);
    StarConBoundry.attr("d",StarMap)
    CentroidStar.attr("transform",StarPoint(CentroidLL))
    EarthPathStar.attr("d", StarMap)

    MyStarG.selectAll(".star")
    .data(StarCoordsArray)
    .attr("transform", function(d) {
    return StarPoint(d)+"scale("+(StarView.k/StarScale)+")"
    })


}




function openMyPlace()
{
 	openIframe("OwnerManage","omPlaceBounds",980)
        BoundsCenter.style("display","inline")
	   setTimeout(showCurrentMapBounds,1000)
	   setTimeout(showBoundsRect,1800)





}

