// ===============================
// COLLECT MY HEART
// ===============================

const gameCanvas = document.getElementById("bgCanvas");
const cctx = gameCanvas.getContext("2d");

const collectScene = document.getElementById("collectMyHeartScene");
const heartCounter = document.getElementById("heartCounter");

let collectRunning = false;

let hearts = [];
let sparkles = [];

let score = 0;
let spawnTimer = 0;

const player = {
    x: 0,
    y: 0,
    size: 28
};

function startCollectMyHeart(){

    document.querySelectorAll(".scene").forEach(scene=>{
        scene.classList.remove("active");
        scene.style.display = "none";
    });

    collectScene.classList.add("active");
    collectScene.style.display = "flex";

    currentScene = 11;

    hearts = [];
    sparkles = [];

    score = 0;
    spawnTimer = 0;

    heartCounter.textContent = "❤️ 0 / 25";

    player.x = gameCanvas.width / 2;
    player.y = gameCanvas.height - 100;

    collectRunning = true;

    collectLoop();

}

window.addEventListener("mousemove",(e)=>{

    const rect = gameCanvas.getBoundingClientRect();

    player.x = e.clientX - rect.left;

});
// ===============================
// PLAYER
// ===============================

let playerPulse = 0;

function drawPlayer(){

    playerPulse += 0.08;

    const scale =
        1 + Math.sin(playerPulse) * 0.06;

    cctx.save();

    cctx.translate(player.x,player.y);

    cctx.scale(scale,scale);

    cctx.shadowColor = "#ff6fb8";
    cctx.shadowBlur = 30;

    cctx.fillStyle = "#ff78c8";

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

    cctx.shadowBlur = 0;

    cctx.fillStyle = "rgba(255,255,255,.55)";

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
// ===============================
// FALLING HEARTS
// ===============================

class FallingHeart{

    constructor(){

        this.x = Math.random() * gameCanvas.width;
        this.y = -50;

        this.speed = 2 + Math.random() * 3;

        this.size = 38;

        const r = Math.random();

        if(r < 0.7){

            this.emoji = "❤️";
            this.value = 1;

        }else if(r < 0.9){

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
        cctx.textBaseline = "middle";

        cctx.fillText(
            this.emoji,
            this.x,
            this.y
        );

    }

}
function drawHearts(){

    spawnTimer++;

    if(spawnTimer >= 12){

        hearts.push(new FallingHeart());

        spawnTimer = 0;

    }

    for(let i = hearts.length-1; i>=0; i--){

        const h = hearts[i];

        h.update();
        h.draw();

        const dx = h.x - player.x;
        const dy = h.y - player.y;

        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 45){

            score += h.value;

            for(let k=0;k<10;k++){

    sparkles.push({

        x:h.x,
        y:h.y,

        vx:(Math.random()-0.5)*8,
        vy:(Math.random()-0.5)*8,

        life:25

    });

}

            if(score < 0){
                score = 0;
            }

            heartCounter.textContent =
                "❤️ " + score + " / 25";

            hearts.splice(i,1);

            continue;

        }

        if(h.y > gameCanvas.height + 60){

            hearts.splice(i,1);

        }

    }

}
// ===============================
// SPARKLES
// ===============================

function updateSparkles(){

    for(let i = sparkles.length-1; i>=0; i--){

        const s = sparkles[i];

        s.x += s.vx;
        s.y += s.vy;

        s.vx *= 0.96;
        s.vy *= 0.96;

        s.life--;

        cctx.globalAlpha = s.life / 25;

        cctx.fillStyle = "#ffd6f4";

        cctx.beginPath();
        cctx.arc(s.x,s.y,3,0,Math.PI*2);
        cctx.fill();

        cctx.globalAlpha = 1;

        if(s.life<=0){

            sparkles.splice(i,1);

        }

    }

}
// ===============================
// MAIN UPDATE
// ===============================

function updateCollectMyHeart(){

    if(!collectRunning) return;

    drawHearts();

    drawPlayer();

    updateSparkles();

    if(score>=25){

        collectRunning=false;

        setTimeout(()=>{

            alert("You protected every piece of my heart ❤️");

            // startFindMe();

        },500);

    }

}
// ===============================
// GAME LOOP
// ===============================

function collectLoop(){

    if(currentScene !== 11) return;

    updateCollectMyHeart();

    requestAnimationFrame(collectLoop);

}
