// Init
$(function(){
  var previewFrame  = document.getElementById("preview").contentWindow.document,
      editorHTML    = ace.edit("html"),
      editorCSS     = ace.edit("css"),
      editorJS      = ace.edit("js");

  // Themes
  editorHTML.setTheme("ace/theme/chrome");
  editorCSS.setTheme("ace/theme/chrome");
  editorJS.setTheme("ace/theme/chrome");

  // Modes
  editorHTML.getSession().setMode("ace/mode/html");
  editorCSS.getSession().setMode("ace/mode/css");
  editorJS.getSession().setMode("ace/mode/javascript");

  // Misc settings
  editorHTML.setShowPrintMargin(false);
  editorCSS.setShowPrintMargin(false);
  editorJS.setShowPrintMargin(false);

  editorHTML.getSession().setUseWrapMode(true);
  editorCSS.getSession().setUseWrapMode(true);
  editorJS.getSession().setUseWrapMode(true);

  // Session storage of code
  editorHTML.getSession().on('change', function(e) { sessionStorage["html"] = editorHTML.getValue(); });
  editorCSS.getSession().on('change', function(e) { sessionStorage["css"] = editorCSS.getValue(); });
  editorJS.getSession().on('change', function(e) { sessionStorage["js"] = editorJS.getValue(); });

  //
  // Live reload
  //
  reloadDebounce = 500;

  liveReload = setInterval((function() {
    (previewFrame).write(
        sessionStorage["html"] + "<style>"+sessionStorage["css"]+"<\/style><script>"+sessionStorage["js"]+"<\/script>"
    );
    (previewFrame).close()
  }), reloadDebounce);

  //
  // Local storage
  //
  loadStorage = function() {
    if (sessionStorage["html"]) {
      editorHTML.setValue(sessionStorage["html"]);
    }
    if (sessionStorage["css"]) {
      editorCSS.setValue(sessionStorage["css"]);
    }  
    if (sessionStorage["js"]) {
      editorJS.setValue(sessionStorage["js"]);
    }
  };

  loadStorage();

  //
  // Clear all editors
  //
  clearAll = function() {
    console.log("clear all");

    // editorHTML.setValue("");
    // editorCSS.setValue("");
    // editorJS.setValue("");

    sessionStorage.clear();
  };

  // Bind to button
  $(".clearLink").on("click", function(e){
    e.preventDefault();

    clearAll();
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

  return window.fakeLoad = fakeLoad;

});