// Init
$(function(){
  var editorHTML, editorCSS, editorJS, previewFrame;

  previewFrame = document.getElementById("preview").contentWindow.document;

  editorHTML = ace.edit("html");
  editorCSS = ace.edit("css");
  editorJS = ace.edit("js");

  editorHTML.setTheme("ace/theme/chrome");
  editorCSS.setTheme("ace/theme/chrome");
  editorJS.setTheme("ace/theme/chrome");

  editorHTML.getSession().setMode("ace/mode/html");
  editorCSS.getSession().setMode("ace/mode/css");
  editorJS.getSession().setMode("ace/mode/javascript");

  editorHTML.getSession().setUseWrapMode(true);

  //
  // On change events
  //
  editorHTML.getSession().on('change', function(e) { sessionStorage["html"] = editorHTML.getValue(); });
  editorCSS.getSession().on('change', function(e) { sessionStorage["css"] = editorCSS.getValue(); });
  editorJS.getSession().on('change', function(e) { sessionStorage["js"] = editorJS.getValue(); });

  liveReload = setInterval((function() {
    (previewFrame).write(
        sessionStorage["html"] + "<style>"+sessionStorage["css"]+"<\/style><script>"+sessionStorage["js"]+"<\/script>"
    );
    (previewFrame).close()
  }), 500);

  init = function() {
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

  init();


  //
  // Clear all editors
  //
  clearAll = function() {
    console.log("clear all");

    editorHTML.setValue("");
    editorCSS.setValue("");
    editorJS.setValue("");

    sessionStorage.clear();
  };

  // Bind to button
  $(".clearLink").on("click", function(e){
    e.preventDefault();

    clearAll();
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