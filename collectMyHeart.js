/*=========================================================
    COLLECT MY HEART
=========================================================*/

const collectScene = document.getElementById("collectMyHeartScene");
const collectCanvas = document.getElementById("collectCanvas");
const cctx = collectCanvas.getContext("2d");

const heartCounter = document.getElementById("heartCounter");

let collectRunning = false;

let score = 0;

let player = {

    x:0,
    y:0,

    width:90,
    height:90

};

let hearts = [];

function resizeCollectCanvas(){

    collectCanvas.width = window.innerWidth;
    collectCanvas.height = window.innerHeight;

    player.y = collectCanvas.height - 130;

}

window.addEventListener("resize",resizeCollectCanvas);

resizeCollectCanvas();

function startCollectMyHeart(){

    document.querySelectorAll(".scene").forEach(scene=>{

        scene.classList.remove("active");
        scene.style.display = "none";

    });

    collectScene.classList.add("active");
    collectScene.style.display = "flex";

    currentScene = 11;

    score = 0;

    hearts = [];

    heartCounter.textContent = "❤️ 0 / 25";

    collectRunning = true;

    player.x = collectCanvas.width / 2;

}

window.addEventListener("mousemove",(e)=>{

    player.x = e.clientX;

});

function drawPlayer(){

    cctx.fillStyle = "cyan";

    cctx.beginPath();

    cctx.arc(
        player.x,
        player.y,
        30,
        0,
        Math.PI * 2
    );

    cctx.fill();

}

function updateCollectMyHeart(){

    if(!collectRunning) return;

    cctx.clearRect(
        0,
        0,
        collectCanvas.width,
        collectCanvas.height
    );

    drawPlayer();

    updateHearts();

}

let spawnTimer = 0;

class FallingHeart{

    constructor(){

        this.x = Math.random() * collectCanvas.width;
        this.y = -40;

        this.speed = 2 + Math.random() * 3;

        this.size = 40;

        this.emoji = "❤️";

    }

    update(){

        this.y += this.speed;

    }

    draw(){

        cctx.font = this.size + "px Arial";
        cctx.textAlign = "center";

        cctx.fillText(

            this.emoji,

            this.x,

            this.y

        );

    }

}

function updateHearts(){

    spawnTimer++;

    if(spawnTimer > 25){

        hearts.push(

            new FallingHeart()

        );

        spawnTimer = 0;

    }

    for(let i = hearts.length-1; i >= 0; i--){

        hearts[i].update();

        hearts[i].draw();

        if(hearts[i].y > collectCanvas.height + 50){

            hearts.splice(i,1);

        }

    }

}
