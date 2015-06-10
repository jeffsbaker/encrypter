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
    if (AdMob) {
        AdMob.createBanner({
            adId : admobid.banner,
            position : AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow : true
        });
    }	
}

document.addEventListener('deviceready', initApp, false);
