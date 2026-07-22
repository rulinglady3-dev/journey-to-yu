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
let playerScale = 1;

const player = {

    x: 0,
    y: 0,

    radius: 28

};

function startCollectMyHeart(){

    heartCounter.style.display = "none";

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

    const scale = 1 + Math.sin(playerPulse) * 0.06;

    ctx.save();

    ctx.translate(player.x,player.y);

    ctx.scale(scale,scale);

    // Glow
    ctx.shadowColor = "#ff6fb8";
    ctx.shadowBlur = 35;

    // Yuvarlatılmış kutu
    ctx.fillStyle = "#ff78c8";

    ctx.beginPath();

    ctx.roundRect(
        -26,
        -26,
        52,
        52,
        16
    );

    ctx.fill();

    // Beyaz parıltı
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(255,255,255,.35)";

    ctx.beginPath();

    ctx.arc(
        -10,
        -10,
        8,
        0,
        Math.PI*2
    );

    ctx.fill();

    // Ortadaki kalp
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "❤️",
        0,
        2
    );

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
            
            playerScale = 1.25;
            
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

    ctx.save();

ctx.translate(player.x, player.y);

const t = Date.now() * 0.004;

// Glow
ctx.shadowColor = "#ff6fb8";
ctx.shadowBlur = 30;

// Dış halka
ctx.beginPath();
ctx.arc(0,0,28,0,Math.PI*2);
ctx.fillStyle = "#ff5fa2";
ctx.fill();

// İç halka
ctx.shadowBlur = 0;

ctx.beginPath();
ctx.arc(0,0,20,0,Math.PI*2);
ctx.fillStyle = "#ff9ad5";
ctx.fill();

// Kalp
ctx.font = "28px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("❤️",0,2);

// Dönen ışıklar
for(let i=0;i<4;i++){

    const a = t + i * Math.PI/2;

    const x = Math.cos(a)*40;
    const y = Math.sin(a)*40;

    ctx.beginPath();
    ctx.arc(x,y,4,0,Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();

}

ctx.restore();

    updateHearts();

    // drawPlayer();

    updateSparkles();

    ctx.save();

ctx.fillStyle = "white";
ctx.font = "bold 30px Arial";
ctx.textAlign = "left";

ctx.shadowColor = "#ff6fb8";
ctx.shadowBlur = 15;

ctx.fillText(
    `❤️ ${collectScore} / 25`,
    30,
    50
);

ctx.restore();
    

    if(collectScore >= 25){

        collectRunning = false;

        alert("You protected every piece of my heart ❤️");

        // startFindMe();

    }

}
