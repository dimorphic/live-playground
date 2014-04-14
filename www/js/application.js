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


  // Publish output from HTMl, CSS, and JS textareas in the iframe below
  // onload=(document).onkeyup=function(){
  //   (document.getElementById("preview").contentWindow.document).write(
  //     html.value+"<style>"+css.value+"<\/style><script>"+js.value+"<\/script>"
  //   );
  //   (document.getElementById("preview").contentWindow.document).close()
  // };
  onload=(document).onkeyup=function(){
    (previewFrame).write(
      editorHTML.getValue()+"<style>"+editorCSS.getValue()+"<\/style><script>"+editorJS.getValue()+"<\/script>"
    );
    (previewFrame).close()
  };

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
  // Clear textareas with button
  //$(".clearLink").click(clearAll);

  function clearAll(){
    //document.getElementById("html").value = "";
    //document.getElementById("css").value = "";
    //document.getElementById("js").value = "";
    console.log("clear all");

    ace.edit("css").setValue("");

    sessionStorage.clear();
  }
  
  return window.clearAll = clearAll;

});