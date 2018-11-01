function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

var Mobile=isMobileDevice()


 if(Mobile==true)
    	window.location.href = '../Start/startMobile.htm';

