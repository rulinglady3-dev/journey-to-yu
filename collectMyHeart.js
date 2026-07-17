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

        scene.style.display="none";

    });

    collectScene.style.display="flex";

    score = 0;

    hearts = [];

    heartCounter.textContent = "❤️ 0 / 25";

    collectRunning = true;

    player.x = collectCanvas.width/2;

    requestAnimationFrame(updateCollectGame);

}

window.addEventListener("mousemove",(e)=>{

    player.x = e.clientX;

});

function drawPlayer(){

    cctx.font = "70px Arial";

    cctx.textAlign = "center";

    cctx.fillText(

        "🧸",

        player.x,

        player.y

    );

}

function updateCollectGame(){

    if(!collectRunning) return;

    cctx.clearRect(

        0,

        0,

        collectCanvas.width,

        collectCanvas.height

    );

    drawPlayer();

    requestAnimationFrame(updateCollectGame);

}
