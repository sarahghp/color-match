console.log('rawr');

// DOM selection variables

var you = document.getElementById('you'),
    robot = document.getElementById('robot'),
    youWrapper = document.getElementById('youWrapper'),
    help = youWrapper.className,
    playButton = document.getElementById('play'),
    scoreBox = document.getElementById('score');

// Computed DOM variables

var width = robot.offsetWidth,
    height = robot.offsetHeight;

var marginX = 10, // Equal to margin on body
    marginY = 60; // Equal to margin on body, plus score div height

// General functions

function logCo (event){
  console.log(event.clientX, event.clientY);
}

function anyNum (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomX () {
  return anyNum(0, width) - marginX;
}

function randomY () {
  return anyNum(marginY, height) - marginY;
}

function lightnessRange (num, height, usefulMin, usefulMax) {
  var usefulMin = usefulMin || 20,
      usefulMax = usefulMax || 85,
      difference = usefulMax - usefulMin;
  return (num - marginY) / height * difference + usefulMin;
}

function drawCircle (event) {
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
    inner += '%, .7)"/>';

  you.innerHTML = inner;
}

function showScore() {
  var scoreDisplay = '<p><span id="message">Match!</span>';
    for (var i = 0; i < 10; i++) {
      if (i < 5) {
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

function beginGame() {
  showScore();
  document.getElementById('reset').onclick = beginGame;
  you.innerHTML = '';
  roboCircle(game.robotX, game.robotY);
  you.addEventListener('click', drawCircle);
  you.addEventListener('click', game.compareSelection);
}

function incrementScore() {
  game.score++;
  if (game.score >= 10) {
    message.innerHTML = 'You win! <a id="again">Play again?</a>';
    document.getElementById('again').onclick = beginGame;
  } else if (game.score > 7) {
    message.innerHTML = 'Nice! <a id="harder">Make harder?</a>';
  } else {
    message.innerHTML = 'Nice!';
  }
  
  (game.score > 3) && (you.removeEventListener('mousemove', hoverHelp));

  console.log(game.score);
}

function decrementScore() {
  game.score--;

  if (game.score <= 0) {
    message.innerHTML = 'You lost. :( <a id="again">Play again?</a>';
    document.getElementById('again').onclick = beginGame;
    you.removeEventListener('mousemove', hoverHelp);
  } else if (game.score < 3) {
    message.innerHTML = 'Missed again. <a id="easier">Make easier?</a>'
    you.addEventListener('mousemove', hoverHelp);
  } else {
    message.innerHTML = 'You missed! Try again.';
  }
  

  console.log(game.score);
}



// Test logging

// you.onmouseup = logCo;
// robot.onmouseup = logCo;


// Game object constructor

function Game () {

  this.score = 5;
  this.youX = 0;
  this.youY = 0;
  this.robotX = randomX();
  this.robotY = randomY();
  this.buffer = 20;

  var that = this;
  this.compareSelection = function() {
    if ((that.youX > that.robotX + that.buffer) || 
        (that.youX < that.robotX - that.buffer) || 
        (that.youY > that.robotY + that.buffer) || 
        (that.youY < that.robotY - that.buffer)) { 
      decrementScore();
    } else { 
      incrementScore();
    }
  };
}


// Gameplay logic

var game = new Game();
playButton.onclick = beginGame;






console.log(game);

