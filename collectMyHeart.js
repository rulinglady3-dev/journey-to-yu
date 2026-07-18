/*=========================================================
    COLLECT MY HEART
=========================================================*/

const collectScene = document.getElementById("collectMyHeartScene");
const collectCanvas = document.getElementById("collectCanvas");
const cctx = collectCanvas.getContext("2d");

const heartCounter = document.getElementById("heartCounter");

let collectRunning = false;

let score = 0;

let hearts = [];
let sparkles = [];

let player = {

    x:0,
    y:0,

    width:90,
    height:90

};

function resizeCollectCanvas(){

    collectCanvas.width = window.innerWidth;
    collectCanvas.height = window.innerHeight;

    player.y = collectCanvas.height - 120;

}

window.addEventListener("resize",resizeCollectCanvas);

resizeCollectCanvas();

function startCollectMyHeart(){

    document.querySelectorAll(".scene").forEach(scene=>{

        scene.classList.remove("active");
        scene.style.display="none";

    });

    collectScene.classList.add("active");
    collectScene.style.display="flex";

    currentScene = 11;

    score = 0;

    hearts = [];
    sparkles = [];

    heartCounter.textContent = "❤️ 0 / 25";

    collectRunning = true;

    player.x = collectCanvas.width / 2;
    player.y = collectCanvas.height - 120;

}

window.addEventListener("mousemove",(e)=>{

    player.x = e.clientX;

});

let playerPulse = 0;

function drawPlayer(){

    playerPulse += 0.08;

    const scale =
    1 + Math.sin(playerPulse) * 0.06;

    cctx.save();

    cctx.translate(player.x,player.y);

    cctx.scale(scale,scale);

    cctx.shadowColor="#ff6fb8";
    cctx.shadowBlur=35;

    cctx.fillStyle="#ff7fc8";

    cctx.beginPath();

    cctx.moveTo(0,-18);

    cctx.bezierCurveTo(
        28,-48,
        60,-8,
        0,42
    );

    cctx.bezierCurveTo(
        -60,-8,
        -28,-48,
        0,-18
    );

    cctx.fill();

    cctx.shadowBlur=0;

    cctx.fillStyle="rgba(255,255,255,.6)";

    cctx.beginPath();

    cctx.arc(
        -8,
        -12,
        7,
        0,
        Math.PI*2
    );

    cctx.fill();

    cctx.restore();

}

let spawnTimer = 0;

class FallingHeart{

    constructor(){

        this.x = Math.random() * collectCanvas.width;
        this.y = -40;

        this.speed = 2 + Math.random() * 3;

        this.size = 40;

        const r = Math.random();

        if(r < 0.70){

            this.emoji = "❤️";
            this.value = 1;

        }else if(r < 0.90){

            this.emoji = "💖";
            this.value = 3;

        }else{

            this.emoji = "💔";
            this.value = -1;

        }

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

    if(spawnTimer >= 25){

        hearts.push(new FallingHeart());

        spawnTimer = 0;

    }

    for(let i = hearts.length - 1; i >= 0; i--){

        const heart = hearts[i];

        heart.update();

        heart.draw();

        const dx = heart.x - player.x;
        const dy = heart.y - player.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < 45){

            score += heart.value;

            if(score < 0){

                score = 0;

            }

            heartCounter.textContent =
            "❤️ " + score + " / 25";

            for(let s = 0; s < 10; s++){

                sparkles.push({

                    x: heart.x,
                    y: heart.y,

                    vx: (Math.random()-0.5)*8,
                    vy: (Math.random()-0.5)*8,

                    life:25

                });

            }

            hearts.splice(i,1);

            continue;

        }

        if(heart.y > collectCanvas.height + 50){

            hearts.splice(i,1);

        }

    }

}

function updateSparkles(){

    for(let i = sparkles.length - 1; i >= 0; i--){

        const p = sparkles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.life--;

        cctx.fillStyle =
        "rgba(255,220,240," + (p.life/25) + ")";

        cctx.beginPath();

        cctx.arc(
            p.x,
            p.y,
            3,
            0,
            Math.PI * 2
        );

        cctx.fill();

        if(p.life <= 0){

            sparkles.splice(i,1);

        }

    }

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

    updateSparkles();

    if(score >= 25){

        collectRunning = false;

        setTimeout(()=>{

            alert("You protected every piece of my heart ❤️");

            // Daha sonra açacağız
            // startFindMe();

        },500);

    }

}
