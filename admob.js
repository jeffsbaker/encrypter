/* Put in config.xml:
<gap:plugin name="com.google.cordova.admob" source="plugins.cordova.io" />
Does it also require cordova.js?? beceause it is not working for me!
*/
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6159883332285612/9159597365',
        interstitial: ''
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6159883332285612/4589796965',
        interstitial: ''
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6159883332285612/9019996560',
        interstitial: ''
    };
}

function initApp() {
	admob.initAdmob(admobid.banner,admob.interstitial);
	admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_CENTER); //show banner at the bottom of app 	
}

document.addEventListener('deviceready', initApp, false);
