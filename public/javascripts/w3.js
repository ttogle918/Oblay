function w3_open() {
  document.getElementById("mySidenav").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidenav").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
function fileClose() {
  document.getElementById('fileOpen').style.display = "none";
}

// fileOpen
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("fileOpen").style.display = "block";
}
function ToggleId(id){
  var toggle = document.getElementById(id).style.display;
  if(toggle=="none"){
    document.getElementById(id).style.display = "block";
  }else{
    document.getElementById(id).style.display = "none";
  }
}

// layout change
function layoutChange(element) {

}

function colorChange(element){

}
