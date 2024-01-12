let gameSeq = [];
let userSeq = [];
let score = [];

let btns = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

//For Game Start
function startEvent() {
  h3 = document.querySelector("h3");
  if (started == false) {
    started = true;
    levelUp();
  }
}

document.addEventListener("keypress", startEvent);

//Flash by Compiler
function gameflash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 300);
}

//Flash by User
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 100);
}
//For Wrong Answer
function Dangerflash() {
  body.classList.add("gameOver");
  setTimeout(function () {
    body.classList.remove("gameOver");
  }, 600);
}

//For Level Up
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranbtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log(gameSeq);
  setTimeout(function () {
    gameflash(ranbtn);
  }, 500);
}

//For Storing Value of User Pressed
function btnPress() {
  let btn = this;
  userflash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// for Checking Answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp(), 1000);
    }
  } else {
    score.push(level);
    gameReset();
    setTimeout(function () {
      h3.innerText = `Press Any Key to Start`;
    }, 2000);
    console.log(score);
    let highScore = Math.max(...score);
    let p = document.querySelector(".highestScore");
    p.innerText = `${highScore}`;
  }
}

//For Game Reset
function gameReset() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
  Dangerflash();
  h3.innerText = `Game Over , Try Again`;
}

//DarkLightMode
let mode = document.querySelector(".modes");
mode.addEventListener("click", function () {
  document.body.classList.toggle("darkMode");
  if (document.body.classList.contains("darkMode")) {
    mode.src = "dark theme icon/moon.png";
    hint.style.color = "white";
    hint.style.backgroundColor = "#808080";
  } else {
    mode.src = "dark theme icon/sun.png";
    hint.style.color = "black";
    hint.style.backgroundColor = "white";
  }
});

let body = document.querySelector("body");
