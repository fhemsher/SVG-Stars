var AllStars

function go()
{
    var file = '../Constellation/All.js'

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET',file , true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    var allConStars=[]
        loadJSON(function(response)
        {
            // Parse JSON string into object
            AllStars = JSON.parse(response);
              for(var k = 0; k<10; k++)
                {
                    var star = AllStars[k]
                    var id = star.id
                    var con = star.con
                    var name = ""
                    if(star.proper!="")
                        name += star.proper+"/"
                        if(star.hd!="")
                        name += "HD"+star.hd;
                    if(name!=""&& star.hip!="")
                        name += "/HIP"+star.hip;
                    else if(name==""&& star.hip!="")
                        name += "HIP"+star.hip;
                    if(name!="" && star.gl!="")
                        name += "/GL:"+star.gl;
                    else if(name=="" && star.gl!="")
                        name += "GL:"+star.gl;
                    allConStars[k]={id:id,con:con,name:name}

                }

                console.log(JSON.stringify(allConStars))
        }
    )



}