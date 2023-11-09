let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let scorDisp = document.querySelector(".h-score");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelup();

    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 250);
}


function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over!! Your score was <b>${level-1}</b> <br>Press any key to restart the game`;
        highestScore = Math.max(highestScore,level-1);
        scorDisp.innerText = `Highest score = ${highestScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
} 
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}



function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    
}