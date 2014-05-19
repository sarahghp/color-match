// DOM selection variables

var you = document.getElementById('you'),
    robot = document.getElementById('robot'),
    youWrapper = document.getElementById('youWrapper'),
    help = youWrapper.className,
    playButton = document.getElementById('play'),
    scoreBox = document.getElementById('score'),
    legend = document.getElementById('legend');

// Computed DOM variables

var width = robot.offsetWidth,
    height = robot.offsetHeight;

var marginX = 10, // Equal to margin on body
    marginY = 60; // Equal to margin on body, plus score div height

// Logging functions

function logCo(event){
  console.log(event.clientX, event.clientY);
}

// Math functions

function anyNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomX() {
  return anyNum(0, width) - marginX;
}

function randomY() {
  return anyNum(marginY, height) - marginY;
}

// Drawing & helper functions

function lightnessRange(num, height, usefulMin, usefulMax) {
  var usefulMin = usefulMin || 20,
      usefulMax = usefulMax || 85,
      difference = usefulMax - usefulMin;
  return (num - marginY) / height * difference + usefulMin;
}

function drawCircle(event) {
  var x = window.event.clientX - marginX,
      y = window.event.clientY - marginY,
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

  game.youX = x;
  game.youY = y;
}

function roboCircle(x, y) {
  var hue = x%360,
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
}

function generateNewRoboCircle() {
  game.robotX = randomX();
  game.robotY = randomY();
  roboCircle(game.robotX, game.robotY);
}

function roboSquare(x, y) {
  var hue = x%360,
    lightness = lightnessRange(y, height);

  var roboSq;
    roboSq = '<rect x="0" y="0" width="100%" height="100%"'
    roboSq += 'style ="fill:hsla(';
    roboSq += hue;
    roboSq += ', 100%, ';  
    roboSq += lightness; 
    roboSq += '%, 1)"/>';

  robot.innerHTML = roboSq;
}

function generateNewRoboSquare() {
  game.robotX = randomX();
  game.robotY = randomY();
  roboSquare(game.robotX, game.robotY);
}

function hoverHelp() {
  var x = event.clientX - marginX + 5,
    y = event.clientY - marginY + 5,
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
}

// Display functions

function showScore() {
  var scoreDisplay = '<p><span id="message">Match!</span>';
    for (var i = 1; i < 11; i++) {
      if (i < 6) {
        scoreDisplay += '<span class="fa fa-circle fa-lg" id="span' + i + '"></span>';  
      } else {
        scoreDisplay += '<span class="fa fa-circle-o fa-lg" id="span' + i + '"></span>';
      }      
    };
  scoreDisplay += '<span id="reset"><a href="#">« Reset</a></span></p>'
  scoreBox.innerHTML = scoreDisplay;
  message = document.getElementById('message');
  game = new Game();
}

function updateScoreDisplay(state) {
  var targetSpan = 'span' + game.score;  
  if (state === 'increment') {
    document.getElementById(targetSpan).className = 'fa fa-circle fa-lg';
  } else {
    document.getElementById(targetSpan).className = 'fa fa-circle-o fa-lg';
  }
}

function generateLegend() {
  var x = 18 - marginX + 5, // initial cx will be half of dot width
    y = 25,
    hue = x%360,
    lightness = 65;
    stops = width/36; // each dot is 46px;

  var legendDisplay = '';

  for (var i=1; i < stops; i++){
    legendDisplay += '<circle cx="';
    legendDisplay += x;
    legendDisplay += '" cy="'
    legendDisplay += y;
    legendDisplay += '" r="5" style="fill:hsla(';
    legendDisplay += hue;
    legendDisplay += ', 100%, '; 
    legendDisplay += lightness;
    legendDisplay += '%, 1)"/>'; 
    
    x += 36;
    hue = x%360
  }

  legend.innerHTML = legendDisplay;
}

function regenerateLegend() {
  width = robot.offsetWidth;
  generateLegend();
}

// Game object constructor

function Game() {

  this.score = 5;
  this.youX = 0;
  this.youY = 0;
  this.robotX = randomX();
  this.robotY = randomY();
  this.buffer = 40;

  var that = this;
  this.compareSelection = function() {
    if ((that.youX%360 > that.robotX%360 + that.buffer) || 
        (that.youX%360 < that.robotX%360 - that.buffer) || 
        (that.youY > that.robotY + that.buffer) || 
        (that.youY < that.robotY - that.buffer)) { 
      decrementScore();
    } else { 
      incrementScore();
    }
  };
}


// Gameplay functions

function beginGame() {
  showScore();
  document.getElementById('reset').onclick = beginGame;
  you.innerHTML = '';
  roboSquare(game.robotX, game.robotY);
  you.addEventListener('click', drawCircle);
  you.addEventListener('click', game.compareSelection);
}

function incrementScore() {
  game.score++;
  updateScoreDisplay('increment');
  if (game.score >= 10) {
    message.innerHTML = 'You win! <a a href="#" id="again">Play again?</a>';
    document.getElementById('again').onclick = beginGame;
  } else if (game.score > 7) {
    message.innerHTML = 'Nice! <a a href="#" id="harder">Make harder?</a>';
    document.getElementById('harder').onclick = makeHarder;
  } else {
    message.innerHTML = 'Nice!';
  }
  
  // generateNewRoboCircle();
  setTimeout(generateNewRoboSquare, 2000);

  (game.score > 3) && (you.removeEventListener('mousemove', hoverHelp));
}

function decrementScore() {
  updateScoreDisplay('decrement'); // Turns "lost" circle open, before game score is dropped.
  game.score--;
  if (game.score <= 0) {
    message.innerHTML = 'You lost. :( <a a href="#" id="again">Play again?</a>';
    document.getElementById('again').onclick = beginGame;
    you.removeEventListener('mousemove', hoverHelp);
  } else if (game.score < 3) {
    message.innerHTML = 'Missed again. <a a href="#" id="easier">Make easier?</a>';
    document.getElementById('easier').onclick = makeEasier;
    you.addEventListener('mousemove', hoverHelp);
  } else {
    message.innerHTML = 'You missed! Try again.';
  }
}

function makeEasier() {
  game.buffer += 10;
  legend.style.visibility = "visible";
}

function makeHarder() {
  game.buffer -= 10;
  legend.style.visibility = "hidden";
}


// Onload

var game = new Game();
playButton.onclick = beginGame;
generateLegend();
window.onresize = regenerateLegend;
