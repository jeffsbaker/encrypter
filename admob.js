/* Put in config.xml:
<gap:plugin name="com.google.cordova.admob" source="plugins.cordova.io" />
Does it also require cordova.js?? beceause it is not working for me!
*/
var footer = document.getElementById('footer');
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6159883332285612/9159597365',
        interstitial: ''  
    };
    footer.innerHTML = "Android";
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6159883332285612/4589796965',
        interstitial: ''   
    };
    footer.innerHTML = "iOS";
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6159883332285612/9019996560',
        interstitial: ''   
    };
    footer.innerHTML = "Other";
}

function initApp() {
	if(typeof AdMob !== "undefined")
		footer.innerHTML += " AdMob";
	else 
		footer.innerHTML += " None";	
	 AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: false,
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );	
}

document.addEventListener('deviceready', initApp, false);


function change_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute("content", document.fm.vp.value);
	

} // end function change_viewport()



//var viewportScale = 1 / window.devicePixelRatio;
var viewportScale = screen.width / 520;
footer.innerHTML += viewportScale + " " + screen.width;
var viewport = document.querySelector("meta[name=viewport]");
document.fm.vp.value = viewport.getAttribute("content");

//if (viewportScale < 1)
//	viewport.setAttribute("content","user-scalable=no, initial-scale="+viewportScale+", minimum-scale=0.2, maximum-scale=2, width=device-width");


