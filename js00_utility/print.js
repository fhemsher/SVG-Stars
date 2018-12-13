
function beforePrint()
{

    document.body.style.background="white"
    commentDiv.style.visibility="hidden"
    blackboard.style.display="none"
    topNavDiv.style.display="none"
    measureDiv.style.display="none"
    zoomLevelDiv.style.visibility="hidden"
    navTable.style.visibility="hidden"
    if(PrevZoomInteger>180)
    {
        PrimaryStarZone.attr("fill","none")

    }
    if(PrevZoomInteger>300)
    {
        PrimaryStarCorona.attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width","3")
    }

}

function afterPrint()
{

    document.body.style.background="#F0F8FF"
    blackboard.style.display=""
    measureDiv.style.display=""
    navTable.style.visibility="visible"
    topNavDiv.style.display=""
    zoomLevelDiv.style.visibility="visible"


    if(PrevZoomInteger>180)
    {
        PrimaryStarZone.attr("fill","#9966CC")
        .attr("stroke","none")
        .attr("stroke-width",null)
    }
    if(PrevZoomInteger>300)
    {
        PrimaryStarCorona.attr("fill","white")
        .attr("stroke","none")
        .attr("stroke-width",null)
    }

}
//---Chrome Browser---
 if (window.matchMedia)
    {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql)
            {
                if (mql.matches)
                {
                    beforePrint();
                }
                else
                {
                    afterPrint();
                }
            }
        );
    }

     //---IE & FF---
window.onbeforeprint = beforePrint
window.onafterprint = afterPrint;