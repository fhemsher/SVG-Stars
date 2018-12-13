//--timedelay to check asp xml updates---
var XMLFile
function aspResponse()
{
  alert(XMLFile.responseText)
}

//---start.htm button---
function sendTestASP()
{

			var sendXML="<SEND   test='test'    />"
          alert(sendXML)
		   XMLFile = new XMLHttpRequest();
			XMLFile.open("POST", "RegisterPlace/sendTest.asp", false);
			XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			XMLFile.send(sendXML);







	   setTimeout(aspResponse,2500)  //--remove 'var' at XMLFile---
}


