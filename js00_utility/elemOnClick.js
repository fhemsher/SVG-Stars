/*cannot used dblckick in Celestial- creates error in map---




//=================method 1 Jquery===============================
//---used to prevent map pan triggering a click over an element: onClick=changeMe(evt)
//<p><button class="onclick">Target</button></p>

// This timeout, started on mousedown, triggers the beginning of a hold
var holdStarter = null;
// This is how many milliseconds to wait before recognizing a hold
var holdDelay = 500;

// This flag indicates the user is currently holding the mouse down
var holdActive = false;

// MouseDown
$('.target').mousedown(onMouseDown);
function onMouseDown(){
    // Do not take any immediate action - just set the holdStarter
    //  to wait for the predetermined delay, and then begin a hold
    holdStarter = setTimeout(function() {
		holdStarter = null;
		holdActive = true;
		// begin hold-only operation here, if desired
        $('.status').text('holding...');
	}, holdDelay);
}

// MouseUp
$('.onclick').mouseup(onMouseUp);
function onMouseUp(){
    // If the mouse is released immediately (i.e., a click), before the
    //  holdStarter runs, then cancel the holdStarter and do the click
	if (holdStarter) {
		clearTimeout(holdStarter);
		// run click-only operation here
        $('.status').text('Clicked!');
	}
    // Otherwise, if the mouse was being held, end the hold
	else if (holdActive) {
		holdActive = false;
		// end hold-only operation here, if desired
        $('.status').text('');
	}
}

// OnClick
// not using onclick at all - onmousedown and onmouseup take care of everything

// Optional add-on: if mouse moves out, then release hold
$('.onclick').mouseout( function(){
    onMouseUp();
});
 */

elem onmousedown=changeMouseDown()
elem onmouseup=changeMouseUp(evt)
var changeClickStarter
var changeClickDelay=500
var changeClickActive=false
 function changeMouseDown()
 {
        changeClickStarter = setTimeout(function() {
		changeClickStarter = null;
		changeClickActive = true;
	}, changeClickDelay);
 }

 function changeMouseUp(evt)
 {
     if (changeClickStarter)
     {clearTimeout(changeClickStarter);
        //---do click work here----



	 }
    // Otherwise, if the mouse was being held, end the hold
	else if (changeClickActive)
		changeClickActive = false;
 }




//========================method 2 javascript===============================================
var node = document.getElementsByTagName("p")[0];
var longClickpress = false;
var pressClicktimer = null;
var longClicktarget = null;

var cancelClick = function(e)
{
    if(pressClicktimer !== null) {
        clearTimeout(pressClicktimer);
    }

    this.classList.remove("longClickpress");
};

var clickClick = function(e)
{
    if(pressClicktimer !== null)
    {
        clearTimeout(pressClicktimer);
    }

    this.classList.remove("longClickpress");

    if(longClickpress)
    {
        return false;
    }

    alert("press");
};

var startClick = function(e)
{
    console.log(e);

    if(e.type === "click" && e.button !== 0)
    {
        return;
    }

    longClickpress = false;

    this.classList.add("longClickpress");

    if (pressClicktimer === null)
    {
        pressClicktimer = setTimeout(function() {
            alert("long click");
            longClickpress = true;
        }, 500);
    }

    return false;
};

node.addEventListener("mousedown", startClick);
node.addEventListener("touchstart", startClick);
node.addEventListener("click", clickClick);
node.addEventListener("mouseout", cancelClick);
node.addEventListener("touchend", cancelClick);
node.addEventListener("touchleave", cancelClick);
node.addEventListener("touchcancel", cancelClick);
