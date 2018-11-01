//----text user input filter so xml 'string' doesn't crash----
function txt2xml(inputTxt)
{
		var reAmp=/&/g
		var reQuote=/"/g
		var reApost=/'/g
		var reGT=/>/g
		var reLT=/</g
		var inputTxt1=inputTxt.replace(reAmp,"AMP")
		var inputTxt2=inputTxt1.replace(reQuote,"QUOTE")
		var inputTxt3=inputTxt2.replace(reApost,"APOST")
		var inputTxt4=inputTxt3.replace(reGT,"GT")
		var safeXml=inputTxt4.replace(reLT,"LT")

return safeXml
}
// into a text or textarea...exactly as user plugged it in
function xml2txt(inputXml)
{
		var reAmp=/AMP/g
		var reQuote=/QUOTE/g
		var reApost=/APOST/g
		var reGT=/GT/g
		var reLT=/LT/g
   if(inputXml)
   {
		var inputXml1=inputXml.replace(reAmp,"&")
		var inputXml2=inputXml1.replace(reQuote,"\"")
		var inputXml3=inputXml2.replace(reApost,"'")
		var inputXml4=inputXml3.replace(reGT,">")
		var text=inputXml4.replace(reLT,"<")
	return text
	}
	else
	return "";

}

