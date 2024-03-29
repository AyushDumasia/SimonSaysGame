let gameSeq = [];
let userSeq = [];
let score = [];

let btns = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

//For Game Start
function startEvent(){
    h3 = document.querySelector("h3");
    if(started == false){
        started = true;
        levelUp();
    }
}
let gameStartBtn = document.querySelector(".game-start");

document.addEventListener("keypress", startEvent);
gameStartBtn.addEventListener("click", startEvent);


//Flash by Compiler
function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function (){
    btn.classList.remove("gameflash");
    }, 300);
}

//Flash by User
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}
//For Wrong Answer
function Dangerflash(){
    body.classList.add("gameOver");
    setTimeout(function () {
        body.classList.remove("gameOver");
    }, 600);
}

//For Level Up
function levelUp(){
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
function btnPress(){
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
    } 
    else{
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
    }
    else{
        mode.src = "dark theme icon/sun.png";
    }
});

let body = document.querySelector("body");
let bulb = document.querySelector(".bulb");

bulb.addEventListener("click",function(){
    hint();
})

let f = 0;
function hint(){
    let delay = 0;
    if(f < 3 && level != 0){
        for(let i = 0 ; i < gameSeq.length ; i++){
            let color = gameSeq[i];
            let btn = document.querySelector(`.${color}`);
            setTimeout(function () {
                gameflash(btn);
            }, delay);
            delay += 500;
        }
        f++;
        console.log(f);
    }
    else if (level === 0){
        alert("Start a game");
    }
    else if (f >= 3){
        alert("You use every hint");
    }
}


//Reset button
let reset = document.querySelector(".refresh");
reset.addEventListener("click",function(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    f = 0;
    if(window.innerWidth <= 500){
        heading.innerText = ``;
    }
    else if(window.innerWidth > 500){
        heading.innerText = `Press Any Key to Start`;
    }
})

let heading = document.querySelector("h3");
function changeHeading(){
    if(window.innerWidth <= 500){
        heading.innerText = ``;
    }
    else if(window.innerWidth > 500){
        heading.innerText = `Press Any Key to Start`;
    }
}

changeHeading();
window.addEventListener('resize', changeHeading);
