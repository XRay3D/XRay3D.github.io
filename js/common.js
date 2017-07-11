$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	

	var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
	var firstOpen = true;
	var currentPopup = 1;
	var allCountOfPopup = 0;
	$(".port-item").each(function(i, el ){
		$(this).attr('position', i);
		if($(this).is(':visible')) 	allCountOfPopup = allCountOfPopup + 1;
	});
	$(".port-item").click(function(){
		currentPopup = +$(this).attr('position');
	});
function handleComplete() {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	exportRoot = new lib._300x500_html();
	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);	
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			canvas.width = w*pRatio*sRatio;			
			canvas.height = h*pRatio*sRatio;
			canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';				
			canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
			stage.scaleX = pRatio*sRatio;			
			stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;		
		}
	}
	makeResponsive(false,'both',false,1);	
	fnStartAnimation();
}

var data = [
  {
    count: 1,
  },
  
  {
    count: 2,
  },
  
  {
    count: 3
  },
    {
    count: 4
  },
    {
    count: 5
  },
    {
    count: 6
  },
    {
    count: 7
  },
    {
    count: 8
  },
    {
    count: 9
  },
    {
    count: 10
  },
];
function init() {
	createjs.MotionGuidePlugin.install();
	handleComplete();
}
// initalize popup
$('.port-item').magnificPopup({ 
  key: 'my-popup', 
  items: data,
  type: 'inline',
	closeOnBgClick: false,
  inline: {
    // Define markup. Class names should match key names.
    markup: '<div class="mfp-close"></div>' + '<div class="white-popup">'  + 
		'<div id="animation_container" style="background-color:rgba(255, 255, 255, 1.00); width:300px; height:500px; margin: auto">' +
		'<canvas id="canvas" width="300" height="500" style="position: absolute; right: 0; left: 0; margin: auto; display: block; background-color:rgba(255, 255, 255, 1.00);"></canvas>' +
		'<div id="dom_overlay_container" style="pointer-events:none; overflow:hidden; width:300px; height:500px; position: absolute; left: 0px; rigth: 0; margin: auto; top: 0px; display: block;">' +
		'</div>' +
	'</div>' +
              '<div class="popup-count">'+'<span class="mfp-count"></span>'+'/'+allCountOfPopup+'</div>'+ 
            '</div>'
  },
	closeMarkup: '<div class="mfp-close"></div>' ,
  gallery: {
    enabled: true,
  },
  callbacks: {
    open: function() {
		firstOpen = false;
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
      init();
    },
	 updateStatus: function(data) {
	
		 if (firstOpen) return true; 
      init();
	 },
	 close: function() {
		firstOpen = true; 
	 }
  }
});
$('.port-item').on('mfpOpen', function(e /*, params */) {
  $.magnificPopup.instance.goTo(currentPopup);
	if( $(document).width() <= 480 ) {
		$(".mfp-content").click( function () {
			$.magnificPopup.instance.next()
		})
	}
});
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});

