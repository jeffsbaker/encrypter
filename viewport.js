/*
	Around the web people say they got phonegap build to
	read the viewport by using this viewport:
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, target-densitydpi=medium-dpi, user-scalable=0" />
	
	In my testing though I have found that phonegap build does not read any part of that 
	viewport except for the target-densitydpi part. Therefore it is my conclusion that
	phonegap build ignores viewport except for target-densitydpi.  
	
	For my app I found that to make it look correct on a phone, 7" tablet and 10" tablet
	I needed different target-densitydpi for each device. A setting of "device-dpi" made
	it look good on the phone (which was that same as "high-dpi") but this made every font
	too small on the tablet.  On the 7" tablet I needed "medium-dpi" and on a 10" tablet 
	I needed "low-dpi".  
	
	Here is my code:
*/
function updateOrientation()
{
	var viewport = document.querySelector("meta[name=viewport]");
	if (document.getElementById('footer'))
		document.getElementById('footer').innerHTML = "";
	show_viewport();
	/* 
		Old Android Device using stock Android Browser:
			Old devices with stock browser do not read the width set in viewport. But we
			can set a width if we add ", target-densitydpi=device-dpi" to the viewport tag.
			However, things go strange when we rotate the device. Also 
			", target-densitydpi=device-dpi" on some high density devices makes the display 
			font too small. To fix this problem
			I found that I need to update the viewport on every rotation change depending
			on the width of the device. 
			
			To get the standard point width on older Android devices we 
			need to calculate it with screen.width / window.devicePixelRatio. However on
			some older devices when you rotate the device screen.width switches to screen.height.
			So we change the calculation to: point_width = Math.max(screen.width, screen.height);
		New Android Devices with Chrome Browser:
			New devices read the viewport width so we don't need to do anything if we detect
			Chrome in the userAgent.
		PhoneGap Build:
			This function is useful for Phonegap build Android apps also because it appears
			that seomtimes even if the Android device is newer and uses Chrome as the browser
			engine, the app will still ignore the viewport width unless you use target-densitydpi.
			if (window.cordova) will be true if it is a phonegap build app.
		
		iOS: screen.width is always the virtual width in points. (Points are 2 pixels)
		For iPhone 5 (Retina display) 
		In landscape screen.width == 320
		In protrait mode screen.width == 320
		
	*/
	var point_width = 0;
	var ua = navigator.userAgent;
	var is_native_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1) && !(ua.indexOf('Chrome') > -1));
	if (window.cordova || is_native_android) // Only run this command if it is running in a phonegap build app or Native Android browser
	{
		if (window.orientation == 90 || window.orientation == -90) // landscape
			point_width = Math.max(screen.width, screen.height); // The greater will be the true width in landscape
		else // 0 or 180 (portrait)
			point_width = Math.min(screen.width, screen.height); // The lesser will be the true width in portrait
			
		point_width = point_width / window.devicePixelRatio;
		
		if (point_width <= 480) // most phones
			viewport.setAttribute("content", "width=500, user-scalable=no, target-densitydpi=high-dpi");
		else if (point_width < 800) // most 7" tablets
			viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=medium-dpi");	
		else if (point_width >= 800) // most 10" tablets
			viewport.setAttribute("content", "width=520, user-scalable=no, target-densitydpi=low-dpi, initial-scale=1");
	}
	else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent))
	{
		/* Fix iphone from zooming when textarea has focus and they change orientation.
		 This is no longer needed because of the check_tilt(e) function and using:
		 "viewport" content="width=534, user-scalable=no"
		 But if I was using: "viewport" content="user-scalable=no, initial-scale=.6, maximum-scale=.6, minimum-scale=.6"
		 then I would need to zoom in on the textarea.  However, iOS still zoomed in if
		 textarea had focus even when using blur() on orientationchange */
		document.fm.textbox.blur();
		//window.scrollTo(0,0);
	//	setTimeout(function(){ 
	//		var viewport = document.querySelector("meta[name=viewport]"); 
	/*		if (window.orientation == 90 || window.orientation == -90) // landscape
			{
				if (screen.width <= 320)
				{
					//viewport.setAttribute("content", "width=520, user-scalable=no, initial-scale=.7");
					document.fm.textbox.style.zoom = 1.45;
				}
			}
			else // 0 or 180 (portrait)
			{
				if (screen.width <= 320)
				{
					//viewport.setAttribute("content", "user-scalable=no, initial-scale=.6, maximum-scale=.6, minimum-scale=.6");
					document.fm.textbox.style.zoom = 1;
				}
			} 
		*/
	//	}, 500);
	}
	show_viewport();
}

function check_tilt(e)
{
	
	var x = Math.round(event.accelerationIncludingGravity.x); // straight= 0, tilt right landscape= 10, tilt left landscape= -10
    var y = Math.round(event.accelerationIncludingGravity.y); // straight= -10, tilt right landscape= 0, tilt left landscape= 0, on back= 0, on face= 0
    var z = Math.round(event.accelerationIncludingGravity.z); // straight= 0, on back= -10,  on face= 10
	var elems = ["input", "textarea"];
	var blur_flag = 0;
	
	if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // Only run if on iOS device
	if (window.orientation == 90 || window.orientation == -90) // landscape
	{
		if (y <= -7 || y >= 7) // Almost tilting to portrait
			blur_flag = 1;
	}
	else // 0 or 180 (portrait)
	{
		if (x >= 7 || x <= -7) // Almost tilting to landscape
			blur_flag = 1;
	}
	
	if (blur_flag)
	{
		for (var i=0; i < elems.length; i++)
		{
			var inputs = document.getElementsByTagName(elems[i]);
			for (var j = 0; j < inputs.length; j++) 
			{	
				inputs[j].blur();	
			}
		}
	}
	
	if (document.getElementById('footer'))
	{
	//	document.getElementById('footer').innerHTML = "x="+x+", y="+y+", z="+z;
	}	

}


function change_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute("content", document.fm.vp.value);
	

} // end function change_viewport()



//var viewportScale = 1 / window.devicePixelRatio;
function show_viewport()
{
	var viewport = document.querySelector("meta[name=viewport]");
	var viewportScale = screen.width / 520;
	if (document.getElementById('footer'))
	{

		document.getElementById('footer').innerHTML += screen.width + "x" +  screen.height + 
		" " + window.innerWidth + "x" + window.innerHeight +
		" " + window.devicePixelRatio + " " + window.orientation + " " + navigator.userAgent;
		/*			screen.width	window.innerWidth	window.devicePixelRatio	Android Version
			Kindle		1200			600					2
			Nexus 4		480x800			320x240				1.5
			Nexus 5		360x592			360x403				3					5
			Nexus 7		800x1280		602x889				1.33
			Nexus 10	2560			1280				2
			HTC Evo		720x1280		360x640				2
			iPhone 5	320x568			534x768				2	
			iPad-Mini	768x1024		980x1183			1	
		*/
	}
	document.fm.vp.value = viewport.getAttribute("content");
}

function textbox_focus()
{
	document.fm.textbox.scrollTop = document.fm.textbox.scrollHeight;

}

// In Phonegap Build:  event listener deviceready seems to only work with the first function you set it to
//document.addEventListener('deviceready', show_viewport, false);
//show_viewport();

window.addEventListener("orientationchange", updateOrientation, false); // Call when orientation changes
window.addEventListener( "devicemotion", check_tilt, false ); // call when phone tilted
//window.addEventListener("resize", updateOrientation); // Call when orientation changes
updateOrientation(); // Call on first run of app

//document.fm.textbox.onclick=textbox_focus;
//window.scrollTo(0,document.body.scrollHeight);

/* Make textbox bigger on desktop browser */
if (!window.cordova) // Not a phonegap  build app 
if (!navigator.userAgent.match(/android|ipod|iphone|ipad/i)) // Not a recognized mobile device
if (window.innerWidth >= 1024) // Not recognizing the viewport width=534
{
	// So it must be a desktop.  Zoom in on textarea
	document.fm.textbox.style.zoom = 1.45;
}



