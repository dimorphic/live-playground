// Init
$(function(){
  var editorHTML, editorCSS, editorJS, previewFrame;

  previewFrame = document.getElementById("preview").contentWindow.document;

  CodeMirror.modeURL = "../mode/%N/%N.js";

  var config = {
    lineNumbers: true,
    lineWrapping: true,

    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

    styleActiveLine: true,
    autoCloseTags: true,
    autoCloseBrackets: true,

    // Cursor/select highlight
    matchTags: true,
    matchBrackets: true,
    highlightSelectionMatches: true
  };


  editorHTML = CodeMirror.fromTextArea(document.getElementById("html"), config);
  editorCSS = CodeMirror.fromTextArea(document.getElementById("css"), config);
  editorJS = CodeMirror.fromTextArea(document.getElementById("js"), config);

  editorHTML.setOption("mode", "text/html");
  editorCSS.setOption("mode", "text/x-scss");
  editorJS.setOption("mode", "text/javascript");

  // CodeMirror.autoLoadMode(editor, modeInput.value);

  //
  // Session storage of code
  //
  editorHTML.on('change', function(e) { sessionStorage["html"] = editorHTML.getValue(); });
  editorCSS.on('change', function(e) { sessionStorage["css"] = editorCSS.getValue(); });
  editorJS.on('change', function(e) { sessionStorage["js"] = editorJS.getValue(); });

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
  // Navbar
  //

  /*
  var menu = $(".nav.menu li a");

  menu.each(function() {
    var _root = this;
    var item = $(this);

    _root.isActive = true;

    item.on("click", function(e){
      e.preventDefault();

      var target = item.attr("href").substr(1);

      if(_root.isActive) {
        item.parent().addClass("active");
        $(".box." + target).removeClass("close");
      }

      //$(".box." + target).toggleClass("close");
      //item.parent().toggleClass("active");
    });
  });
*/

  $(".toggler").on("click", function() {
    var toggler, box;
    
    toggler = $(this);
    box = $(".box." + toggler.attr("href").substr(1));
    
    if(box) {
      toggler.parent().toggleClass("active");
      
      if(toggler.parent().hasClass("active")) {
        box.removeClass("contract");
      } else {
        box.addClass("contract");
      }
      
      
    }
    
  });

  //
  // Clear all
  //
  clearAll = function() {
    console.log("clear all");

    editorHTML.setValue("");
    editorCSS.setValue("");
    editorJS.setValue("");
    // editorCSS.setValue("");

    sessionStorage.clear();
  };

  // Clear editors via button
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


















  // Publish output from HTMl, CSS, and JS textareas in the iframe below
  // onload=(document).onkeyup=function(){
  //   (document.getElementById("preview").contentWindow.document).write(
  //     html.value+"<style>"+css.value+"<\/style><script>"+js.value+"<\/script>"
  //   );
  //   (document.getElementById("preview").contentWindow.document).close()
  // };

  




  // onload=(document).onkeyup=function(){
  //   (previewFrame).write(
  //     editorHTML.getValue()+"<style>"+editorCSS.getValue()+"<\/style><script>"+editorJS.getValue()+"<\/script>"
  //   );
  //   (previewFrame).close()
  // };

  // Pressing the Tab key inserts 2 spaces instead of shifting focus
  /*$("textarea").keydown(function(event){
    if(event.keyCode === 9){
      var start = this.selectionStart;
      var end = this.selectionEnd;
      var $this = $(this);
      var value = $this.val();
      $this.val(value.substring(0, start)+"  "+value.substring(end));
      this.selectionStart = this.selectionEnd = start+1;
      event.preventDefault();
    }
  });*/

  // Store contents of textarea in sessionStorage
  /*$("textarea").keydown(function(){
      sessionStorage[$(this).attr("id")] = $(this).val();
  });*/

  //$("#html").html(sessionStorage["html"]);
  //$("#css").html(sessionStorage["css"]);
  //$("#js").html(sessionStorage["js"]);

  /*
  function init() {
    if (sessionStorage["html"]) {
        $("#html").val(sessionStorage["html"]);
      }
    if (sessionStorage["css"]) {
        $("#css").val(sessionStorage["css"]);
      }  
    if (sessionStorage["js"]) {
        $("#js").val(sessionStorage["js"]);
      }
  };
*/


});