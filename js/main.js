// 1. create canvas

var canvas = document.querySelector("#canvas");
canvas.width = 360;
canvas.height = 640;
var ctx = canvas.getContext("2d");

// 2. state data

var state = {
  foregroundHeight: canvas.height * 0.19,

  playerX: canvas.height * 0.05,
  playerY: canvas.height * 0.61,
  playerWidth: canvas.width * 0.1,
  playerHeight: canvas.height * 0.25,

  hurdleWidth: canvas.width * 0.15,
  hurdleHeight: canvas.height * 0.25,
  hurdleX: canvas.width * 0.55,
  hurdleY: canvas.height * 0.559,
  hurdlePositionsX: [],

  movementSpeed: 3,

  bottomBarPositionsX: [],
  gameMode: "moving",

  gameQuestions: [],
  didYouKnows: [],
};

// 3. create game components

// 3a. static components:

function drawBackground() {
  ctx.fillStyle = "#6cb3beff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawForeground() {
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 540, canvas.width, state.foregroundHeight);
}

// to be replaced with Ruman's image
var player = document.querySelector("#player");

function drawPlayer() {
  ctx.drawImage(player, state.playerX, state.playerY, state.playerWidth, state.playerHeight);
}

// 3b. dynamic components:

function drawHurdle(hurdleXInfo) {
  ctx.fillStyle = "#db5461";
  ctx.fillRect(hurdleXInfo.x, state.hurdleY, state.hurdleWidth, state.hurdleHeight);
}

state.hurdlePositionsX.push({x: canvas.width * 0.55});
state.hurdlePositionsX.push({x: canvas.width * 1.05});
state.hurdlePositionsX.push({x: canvas.width * 1.55});
state.hurdlePositionsX.push({x: canvas.width * 2.05});
state.hurdlePositionsX.push({x: canvas.width * 2.55});
state.hurdlePositionsX.push({x: canvas.width * 3.05});
state.hurdlePositionsX.push({x: canvas.width * 3.55});

function hurdleGenerator() {
  for (var i = 0; i < state.hurdlePositionsX.length; i++) {
    var hurdle = state.hurdlePositionsX[i];
    drawHurdle(hurdle);
  }
}

function moveAllHurdles() {
  for (var i = 0; i < state.hurdlePositionsX.length; i++) {
    var hurdle = state.hurdlePositionsX[i];
    hurdle.x = hurdle.x - state.movementSpeed;
  }
}

var bottomBar = document.querySelector("#bar");

function drawBottomBar() {
  ctx.drawImage(bottomBar, 0, canvas.height - state.foregroundHeight);
}

state.bottomBarPositionsX.push({x: 0});
state.bottomBarPositionsX.push({x: 651});
state.bottomBarPositionsX.push({x: 1302});
state.bottomBarPositionsX.push({x: 1953});

function multipleBottomBars() {
  for (var i = 0; i < state.bottomBarPositionsX.length; i++) {
    var bar = state.bottomBarPositionsX[i];
    drawBottomBar(bar);
  }
}

// the bars are technically moving but the stripes do not appear to move – have parked this as it's not crucial to the game function
function moveBottomBars() {
  for (var i = 0; i < state.bottomBarPositionsX.length; i++) {
    var bar = state.bottomBarPositionsX[i];
    bar.x = bar.x - state.movementSpeed;
  }
}

// 4. Collision and interaction

// need to add code to say after hurdle.x ignore the rest of the hurdle and keep moving = currently not working

function hurdleDetection() {
  for (var i = 0; i < state.hurdlePositionsX.length; i++) {
    var hurdle = state.hurdlePositionsX[i];
    if (state.playerX + state.playerWidth >= hurdle.x) {
      state.gameMode = "question";
    } else if (
      (state.playerX + state.playerWidth >= hurdle.x) &&
      (state.playerX + state.playerWidth <= hurdle.x + state.hurdleWidth)) {
      state.gameMode = "ignoreHurdle";
    } else if (state.playerX + state.playerWidth >= hurdle.x + state.hurdleWidth) {
      state.gameMode = "moving";
    }
  }
}

// function hurdleDetection() {
//   for (var i = 0; i < state.hurdlePositionsX.length; i++) {
//     var hurdle = state.hurdlePositionsX[i];
//     if (
//       (state.playerX + state.playerWidth >= hurdle.x) &&
//       (state.playerX + state.playerWidth <= hurdle.x + state.hurdleWidth)) {
//       state.gameMode = "ignoreHurdle";
//     } else if (state.playerX + state.playerWidth >= hurdle.x) {
//       state.gameMode = "question";
//     } else if (state.playerX + state.playerWidth >= hurdle.x + state.hurdleWidth) {
//       state.gameMode = "moving";
//     }
//   }
// }

var question1 = document.querySelector("#question1");
var question2 = document.querySelector("#question2");
var question3 = document.querySelector("#question3");
var question4 = document.querySelector("#question4");
var question5 = document.querySelector("#question5");
var question6 = document.querySelector("#question6");
var question7 = document.querySelector("#question7");

state.gameQuestions.push(question1);
state.gameQuestions.push(question2);
state.gameQuestions.push(question3);
state.gameQuestions.push(question4);
state.gameQuestions.push(question5);
state.gameQuestions.push(question6);
state.gameQuestions.push(question7);

var didyouknow1 = document.querySelector("#didyouknow1");
var didyouknow2 = document.querySelector("#didyouknow2");
var didyouknow3 = document.querySelector("#didyouknow3");
var didyouknow4 = document.querySelector("#didyouknow4");
var didyouknow5 = document.querySelector("#didyouknow5");
var didyouknow6 = document.querySelector("#didyouknow6");
var didyouknow7 = document.querySelector("#didyouknow7");

state.didYouKnows.push(didyouknow1);
state.didYouKnows.push(didyouknow2);
state.didYouKnows.push(didyouknow3);
state.didYouKnows.push(didyouknow4);
state.didYouKnows.push(didyouknow5);
state.didYouKnows.push(didyouknow6);
state.didYouKnows.push(didyouknow7);

// part a - question pop-up:

function drawQuestion() {
  ctx.drawImage(question1, canvas.width * 0.1, canvas.height * 0.05);
}

function questionGenerator() {
  for (var hurdleNumber = 0; hurdleNumber < state.gameQuestions.length; hurdleNumber++) {
    var question = state.gameQuestions[hurdleNumber];
    drawQuestion(question);
  }
}

function clearQuestion() {
  state.gameMode = "didyouknow";
}

// part b - did-you-know pop-up:

function drawDidYouKnow() {
  ctx.drawImage(didyouknow1, canvas.width * 0.1, canvas.height * 0.05);
}

function didYouKnowGenerator() {
  for (var i = 0; i < state.didYouKnows.length; i++) {
    var didYouKnow = state.didYouKnows[i];
    drawDidYouKnow(didYouKnow);
  }
}

function clearDidYouKnow() {
  if (state.hurdleStatus = "cleared") {
      state.gameMode = "moving";
  }
}

// need to amend this to touch events

function handleKeyDown(e) {
  if (e.keyCode === 13) {
    clearQuestion();
  } else if (e.key === " ") {
    clearDidYouKnow();
  }
}

document.body.addEventListener("keydown", handleKeyDown);

// 5. Master functions

function movingScenery() {
  moveAllHurdles();
  moveBottomBars();
}

function runGame() {
  if (state.gameMode === "moving") {
    drawBackground();
    drawForeground();
    drawPlayer();

    hurdleGenerator();
    multipleBottomBars();
    movingScenery();

    hurdleDetection();
  } else if (state.gameMode === "question") {
      drawBackground();
      drawForeground();
      drawPlayer();

      hurdleGenerator();
      multipleBottomBars();

      questionGenerator();
    } else if (state.gameMode === "didyouknow") {
      drawBackground();
      drawForeground();
      drawPlayer();

      hurdleGenerator();
      multipleBottomBars();

      didYouKnowGenerator();
    } else if (state.gameMode === "ignoreHurdle") {
        drawBackground();
        drawForeground();
        drawPlayer();

        hurdleGenerator();
        multipleBottomBars();
    }
}

setInterval(runGame, 50);
