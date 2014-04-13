//
// Helpers
//
var echo = function(caller, msg) { console.log("[" + caller + "] " + msg); }

var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/mobile|Mobile/i);
  	},
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/BB10; Touch/);
  	},
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/webOS/i) ;
  	},
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }

    //return isMobile.any();
};

// RAF
// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

/* Highlight helper */
$.fn.highlight = function(options) {
	options = $.extend({},{
		className: 'highlight',
		delay: 100
	}, options);
	
	return this.each(function(){
		(function(elem, cName, time){
			setTimeout(function() {
				elem.removeClass(cName);
			}, time);
			elem.addClass(cName);
		})($(this), options.className, options.delay);
	});
};

/* Visible helper */
$.fn.visible = function(partial) {

  var $t            = $(this),
      $w            = $(window),
      viewTop       = $w.scrollTop(),
      viewBottom    = viewTop + $w.height(),
      _top          = $t.offset().top,
      _bottom       = _top + $t.height(),
      compareTop    = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

	return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

};

/* Screen size helper */
screenSize = function() {
	var w,h;

	w = window.innerWidth;
	h = window.innerHeight;

	var msg = w + "x" + h;

	$(".content").append('<div class="screenSize">' + msg + '</div>');
	//return msg;
};

/* Scroll top helper */
scrollTop = function () {
    setTimeout(function () {
        document.body.scrollTop = 0;
    }, 0);
};