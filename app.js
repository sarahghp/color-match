console.log('rawr');

var you = document.getElementById('you');
var robot = document.getElementById('robot');

function logCo (event){
  console.log(event.clientX, event.clientY);
};

you.onclick = logCo;
robot.onclick = logCo;