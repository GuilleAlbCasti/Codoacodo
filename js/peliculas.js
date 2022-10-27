
function cargarIframe(url) {
    document.getElementById("tlerfrm").style.visibility = "visible";
    document.getElementById("iframetrailer").src = url;
  }

  function cerrarIframe() {
    document.getElementById("tlerfrm").style.visibility = "hidden";
    document.getElementById("iframetrailer").src = "";
  }
