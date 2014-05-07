// Init
$(function(){

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

  //
  //  Fake Load
  //
  fakeLoad = setTimeout((function() {
    return $(".overlay").fadeOut();
  }), 1200);

  // Logo replay anim
  $(".appLogo").click(function() {
    $(".appLogo").removeClass("animate");
    clearTimeout(fakeLoad);

    return setTimeout((function() {
      return $(".appLogo").addClass("animate");
    }), 0);
  });

  //
  // Navbar
  //
  $(".toggler").on("click", function(e) {
    e.preventDefault();
    
    var toggler = $(this),
        editor = $(".box." + toggler.attr("href").substr(1));
    
    if(editor) {
      toggler.parent().toggleClass("active");
      
      if(toggler.parent().hasClass("active")) {
        editor.removeClass("contract");
      } else {
        editor.addClass("contract");
      }
    }
  });

});