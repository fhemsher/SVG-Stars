

function attachPlanetAnimation()
{      var periodArray=[]
    //----create period Factor: animation duration/rotation speed---
    for(var k=0;k<PlanetCoordsArray.length;k++)
    {
        var period=+PlanetCoordsArray[k][2]
        periodArray.push(period)
    }


    var maxPeriod = periodArray[0];
    for (var i = 0; i < periodArray.length; i++) {
        if (maxPeriod < periodArray[i] ) {
            maxPeriod = periodArray[i];
        }
    }

    //---PlanetCoordsArray.push([ll,path,planet,period])
     for(var k=0;k<PlanetCoordsArray.length;k++)
    {
        var period=+PlanetCoordsArray[k][2]
        if(period==0)
            var duration=30000
         else
            var duration=(30000*period/maxPeriod).toFixed(0)

        if(duration<3000)
            duration=1000*Math.random() +4000

     console.log("duration "+duration)
        var path=PlanetCoordsArray[k][0]
        var myPlanet=PlanetCoordsArray[k][1]
        runAnim(path,myPlanet,duration)
    }


}

/*
provide options:
1) range(end value)
2) frames per second(delay = 1000/frames per second)
3) duration in ms
4) delta: equation(linear,etc.)
5) output:  This application's output function
*/

/*---generalized animate core function
Allows progress/output to follow a specific/customized equation(delta)
by: Ilya Kantor - http://javascript.info/tutorial/animation
*/
var AnimateJS=function(options){
    this.options=options
	var start = new Date
	var iT = setInterval(
	function(){
		var timePassed = new Date - start
		var progress = timePassed / options.duration
		if (progress > 1) progress = 1
		this.progress=progress
		var delta = options.delta(progress)
		options.output(delta)
		if (progress == 1)clearInterval(iT);
	},options.delay)
}


var StartScale
var StartScaleInit
function runAnim(path,myPlanet,duration)
{
      if(!StartScale)
      {
        StartScale=StarView.k
        StartScaleInit=StarView.k
      }


delta=function linear(p){return p}
 var FPS=100
		new AnimateJS(
		{
			delay: 1000/FPS,
			duration: duration,
			delta: delta,
			output: function(delta)
			{

            var currentScale=StarView.k
            var ratioScale=StartScale/currentScale

            pathLength=path.getTotalLength()
            var length=pathLength*delta
            var Pnt=path.getPointAtLength(length)

             myPlanet.setAttribute("cx",Pnt.x*ratioScale)
             myPlanet.setAttribute("cy",Pnt.y*ratioScale)
             

            myPlanet.setAttribute("transform", "scale("+(StarView.k/StarScale)/PlanetScale+")")


        		//---finished---
				if(progress==1)
                runAnim(path,myPlanet,duration)
			}
		})

}

