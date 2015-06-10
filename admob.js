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
	if(typeof admob !== "undefined")
		footer.innerHTML += "admob";
	else 
		footer.innerHTML += "None";	
	admob.initAdmob(admobid.banner,admob.interstitial);
	admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_CENTER); //show banner at the bottom of app 	
}

document.addEventListener('deviceready', initApp, false);
