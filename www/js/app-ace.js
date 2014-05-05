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
  // Clear all
  //
  clearAll = function() {
    //document.getElementById("html").value = "";
    //document.getElementById("css").value = "";
    //document.getElementById("js").value = "";
    console.log("clear all");

    ace.edit("css").setValue("");
    editorCSS.setValue("");

    sessionStorage.clear();
  };

  // Clear textareas with button
  $(".clearLink").on("click", function(){
    clearAll();
  });
  
  //return window.clearAll = clearAll;


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