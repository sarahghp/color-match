console.log('rawr');

var you = document.getElementById('you');
var robot = document.getElementById('robot');

var marginX = 10, // Equal to margin on body
    marginY = 60; // Equal to margin on body, plus score div height

function logCo (event){
  console.log(event.clientX, event.clientY);
};

function drawCircle (event) {
  var x = event.clientX - marginX,
      y = event.clientY - marginY,
      hue = x%360;


  you.innerHTML = '<circle cx="' + x + '" cy="' + y + '" r="10" style="fill:hsla('+ hue + ', 100%, 50%, 1)"/>'
}

you.onmouseup = logCo;
robot.onmouseup = logCo;

you.onmousedown = drawCircle;