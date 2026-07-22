// =========================================
// COLLECT MY HEART
// =========================================

const collectScene = document.getElementById("collectMyHeartScene");
const heartCounter = document.getElementById("heartCounter");

let collectRunning = false;

let collectScore = 0;

let hearts = [];
let sparkles = [];

let spawnTimer = 0;

const player = {

    x: 0,
    y: 0,

    radius: 28

};

function startCollectMyHeart(){

    showScene(11);
    
    collectRunning = true;

    collectScore = 0;

    hearts = [];
    sparkles = [];

    spawnTimer = 0;

    heartCounter.textContent = "❤️ 0 / 25";

    player.x = canvas.width / 2;
    player.y = canvas.height - 120;

}

window.addEventListener("mousemove",(e)=>{

    const rect = canvas.getBoundingClientRect();

    player.x = e.clientX - rect.left;

});
// =========================================
// PLAYER
// =========================================

let playerPulse = 0;

function drawPlayer(){

    playerPulse += 0.08;

    const scale = 1 + Math.sin(playerPulse) * 0.05;

    ctx.save();

    ctx.translate(player.x, player.y);

    ctx.scale(scale, scale);

    ctx.shadowColor = "#ff7ac8";
    ctx.shadowBlur = 30;

    ctx.fillStyle = "#ff82cf";

    ctx.beginPath();

    ctx.moveTo(0,-18);

    ctx.bezierCurveTo(
        28,-48,
        60,-8,
        0,42
    );

    ctx.bezierCurveTo(
        -60,-8,
        -28,-48,
        0,-18
    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.restore();

}
// =========================================
// FALLING HEART
// =========================================

class FallingHeart{

    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = -40;

        this.speed = 2 + Math.random() * 3;

        this.radius = 18;

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

        ctx.save();

        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            this.emoji,
            this.x,
            this.y
        );

        ctx.restore();

    }

}
function updateHearts(){

    spawnTimer++;

    if(spawnTimer >= 15){

        hearts.push(new FallingHeart());

        spawnTimer = 0;

    }

    for(let i = hearts.length - 1; i >= 0; i--){

        const h = hearts[i];

        h.update();

        h.draw();

        const dx = h.x - player.x;
        const dy = h.y - player.y;

        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 40){

            collectScore += h.value;

            if(collectScore < 0){

                collectScore = 0;

            }

            heartCounter.textContent =
                "❤️ " + collectScore + " / 25";

            hearts.splice(i,1);

            continue;

        }

        if(h.y > canvas.height + 50){

            hearts.splice(i,1);

        }

    }

}
// =========================================
// SPARKLES
// =========================================

function updateSparkles(){

    for(let i = sparkles.length - 1; i >= 0; i--){

        const s = sparkles[i];

        s.x += s.vx;
        s.y += s.vy;

        s.vx *= 0.96;
        s.vy *= 0.96;

        s.life--;

        ctx.save();

        ctx.globalAlpha = s.life / 25;

        ctx.fillStyle = "#ffd6f4";

        ctx.beginPath();

        ctx.arc(s.x,s.y,3,0,Math.PI*2);

        ctx.fill();

        ctx.restore();

        if(s.life <= 0){

            sparkles.splice(i,1);

        }

    }

}

// =========================================
// MAIN UPDATE
// =========================================

function updateCollectMyHeart(){

    if(!collectRunning) return;

    updateHearts();

    drawPlayer();

    updateSparkles();

    if(collectScore >= 25){

        collectRunning = false;

        alert("You protected every piece of my heart ❤️");

        // startFindMe();

    }

}
