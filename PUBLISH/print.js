function beforePrint()
{
    blackboard.style.display="none"
   measureDiv.style.visibility="hidden"
   topNavDiv.style.visibility="hidden"

    if(PrevZoomInteger>180)
    {
        PrimaryStarZone.attr("fill","none")
        .attr("stroke","#9966CC")
        .attr("stroke-width","8")
    }
    if(PrevZoomInteger>300)
    {
        PrimaryStarCorona.attr("fill","none")
        .attr("stroke","gold")
        .attr("stroke-width","3")
    }

}

function afterPrint()
{
    blackboard.style.display="block"

        PrimaryStarZone.attr("fill","#9966CC")
        .attr("stroke","none")

        PrimaryStarCorona.attr("fill","gold")
        .attr("stroke","none")

         measureDiv.style.visibility="hidden"
   topNavDiv.style.visibility="hidden" 
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