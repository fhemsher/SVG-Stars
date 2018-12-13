/*
First, compute D, the number of days and fraction (+ or –) from the epoch referred to as "J2000.0", which is 2000 January 1.5, Julian date 2451545.0:

D = JD – 2451545.0
where JD is the Julian date of interest. Then compute

Mean anomaly of the Sun:	g = 357.529 + 0.98560028 D
Mean longitude of the Sun:	q = 280.459 + 0.98564736 D
Geocentric apparent ecliptic longitude
of the Sun (adjusted for aberration):	L = q + 1.915 sin g + 0.020 sin 2g
where all the constants (therefore g, q, and L) are in degrees. It may be necessary or desirable to reduce g, q, and L to the range 0° to 360°.

The Sun's ecliptic latitude, b, can be approximated by b=0. The distance of the Sun from the Earth, R, in astronomical units (AU), can be approximated by

R = 1.00014 – 0.01671 cos g – 0.00014 cos 2g
Once the Sun's apparent ecliptic longitude, L, has been computed, the Sun's right ascension and declination can be obtained. First compute the mean obliquity of the ecliptic, in degrees:

e = 23.439 – 0.00000036 D
Then the Sun's right ascension, RA, and declination, d, can be obtained from

tan RA = cos e sin L / cos L
sin d = sin e sin L
RA is always in the same quadrant as L. If the numerator and denominator on the right side of the expression for RA are used in a double-argument arctangent function (e.g., "atan2"), the proper quadrant will be obtained. If RA is obtained in degrees, it can be converted to hours simply by dividing by 15. RA is conventionally reduced to the range 0h to 24h.



*/

Date.prototype.getJulian = function() {
    return ((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
}

var today = new Date(); //set any date
var julian = today.getJulian();
  //---get sun's Julian  epoc2000
 var sunD = julian- 2451545.0
 //---Mean anomaly of the Sun:
var gSun = 357.529 + 0.98560028*sunD
var gSunRad=gSun*0.0174533
 //---Mean longitude of the Sun:
var qSun = 280.459 + 0.98564736*sunD
var qSunRad=qSun*0.0174533
 //---Geocentric apparent ecliptic longitude of the Sun (adjusted for aberration):
var LngSun = qSun + 1.915*Math.sin(gSunRad) + 0.020*Math.sin(2*gSunRad)
var LngSunRad=LngSun*0.0174533
//The distance of the Sun from the Earth, R, in astronomical units (AU), can be approximated by
var sunR = 1.00014-0.01671*Math.cos(gSunRad)-0.00014*Math.cos(2*gSunRad)
//--Once the Sun's apparent ecliptic longitude, LngSun, has been computed, the Sun's right ascension and declination can be obtained. First compute the mean obliquity of the ecliptic, in degrees:
var eSun = 23.439-0.00000036*sunD
var eSunRad=eSun*0.0174533
//alert(eSun+" degrees")

//Then the Sun's right ascension, RA, and declination, d, can be obtained from
var tanRArad = Math.cos(eSunRad)*Math.sin(LngSunRad) / Math.cos(LngSunRad)
var sinDecrad = Math.sin(eSunRad)*Math.sin(LngSunRad)
//RA is always in the same quadrant as L. If the numerator and denominator on the right side of the expression for RA are used in a double-argument arctangent function (e.g., "atan2"), the proper quadrant will be obtained. If RA is obtained in degrees, it can be converted to hours simply by dividing by 15. RA is conventionally reduced to the range 0h to 24h.

var sunRaRad=Math.atan(tanRArad)
var sunDecRad=Math.asin(sinDecrad)

var sunRA=sunRaRad*57.2958
var sunDec=sunDecRad*57.2958





