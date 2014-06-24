// Init
$(function(){

  // Editors config
  var config = {
    lineNumbers: true,
    lineWrapping: true,

    styleActiveLine: true,
    autoCloseTags: true,
    autoCloseBrackets: true,

    // Cursor/select highlight
    matchTags: true,
    matchBrackets: true,
    highlightSelectionMatches: true,

    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: true
    // lint: true
  };

  CodeMirror.modeURL = "../mode/%N/%N.js";

  // Editors init
  var xcfg = {
    lineNumbers: true,
    lineWrapping: true,

    styleActiveLine: true,
    autoCloseTags: true,
    autoCloseBrackets: true,

    // Cursor/select highlight
    matchTags: true,
    matchBrackets: true,
    highlightSelectionMatches: true,

    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    foldGutter: true,
  
    lintWith: CodeMirror.javascriptValidator
  };

  var editorHTML    = CodeMirror.fromTextArea(document.getElementById("html"), config),
      editorCSS     = CodeMirror.fromTextArea(document.getElementById("css"), config),
      editorJS      = CodeMirror.fromTextArea(document.getElementById("js"), xcfg),
      previewFrame  = document.getElementById("preview").contentWindow.document;


  editorHTML.setOption("mode", "text/html");
  editorCSS.setOption("mode", "text/css");
  editorJS.setOption("mode", "text/javascript");

  //
  // Session storage of code
  //
  editorHTML.on('change', function() { sessionStorage["html"] = editorHTML.getValue(); });
  editorCSS.on('change', function() { sessionStorage["css"] = editorCSS.getValue(); });
  editorJS.on('change', function() { sessionStorage["js"] = editorJS.getValue(); });

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

  // Change editor syntax
  changeSyntax = function(editor, mode) {
    editor.setOption("mode", mode);
    CodeMirror.autoLoadMode(editor, mode);
  };

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



  // Append the theme styles

  // var link = document.createElement('link');
  // link.onload = function(){
  //     editor.setOption("theme", theme);
  // };
  // link.rel = "stylesheet";
  // link.media = "all";
  // link.href = INTERFACE_URL+"/codemirror/theme/"+theme+".css";
  // document.getElementsByTagName('head')[0].appendChild(link);

});