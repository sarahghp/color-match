console.log('rawr');

var you = document.getElementById('you');
var robot = document.getElementById('robot');

var width = robot.offsetWidth,
    height = robot.offsetHeight;

var marginX = 10, // Equal to margin on body
    marginY = 60; // Equal to margin on body, plus score div height

function logCo (event){
  console.log(event.clientX, event.clientY);
};

function lightnessRange (num, height, usefulMin, usefulMax) {
  var usefulMin = usefulMin || 20,
      usefulMax = usefulMax || 85,
      difference = usefulMax - usefulMin;

  return (num - marginY) / height * difference + usefulMin;
}

function drawCircle (event) {
  var x = event.clientX - marginX,
      y = event.clientY - marginY,
      hue = x%360,
      lightness = lightnessRange(y, height);

  var inner;
    inner = '<circle cx="';
    inner += x;
    inner += '" cy="'; 
    inner += y; 
    inner += '" r="10" style="fill:hsla(';
    inner += hue; 
    inner += ', 100%,';  
    inner += lightness; 
    inner += '%, 1)"/>';

  you.innerHTML = inner;
};

function anyNum (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


function roboCircle() {
  var x = anyNum(0, width) - marginX,
      y = anyNum(50, 500) - marginY,
      hue = x%360,
      lightness = lightnessRange(y, height);

  var roboCirc;
    roboCirc = '<circle cx="';
    roboCirc += x;
    roboCirc += '" cy="'; 
    roboCirc += y; 
    roboCirc += '" r="10" style="fill:hsla(';
    roboCirc += hue;
    roboCirc += ', 100%, ';  
    roboCirc += lightness; 
    roboCirc += '%, 1)"/>';

  robot.innerHTML = roboCirc;
};

you.onmouseup = logCo;
robot.onmouseup = logCo;

you.onmousedown = drawCircle;
robot.onmousedown = roboCircle;