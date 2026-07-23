// =======================================================
// COLLECT MY HEART
// Journey To Yu
// =======================================================

// ---------- HTML ----------

const collectScene = document.getElementById("collectMyHeartScene");

// ---------- GAME ----------

let collectRunning = false;

let collectScore = 0;

let spawnTimer = 0;

let hearts = [];

let sparkles = [];

let playerScale = 1;

// ---------- PLAYER ----------

const player = {

    x:0,

    y:0,

    radius:26

};

// =======================================================
// START GAME
// =======================================================

function startCollectMyHeart(){

    console.log("START COLLECT");

    showScene(10);

    collectRunning = true;

    collectScore = 0;
    spawnTimer = 0;
    hearts = [];
    sparkles = [];
    playerScale = 1;

    player.x = canvas.width / 2;
    player.y = canvas.height - 120;

}

// =======================================================
// MOUSE
// =======================================================

window.addEventListener("mousemove",(e)=>{

    const rect = canvas.getBoundingClientRect();

    player.x = e.clientX - rect.left;

    if(player.x < 35){

        player.x = 35;

    }

    if(player.x > canvas.width-35){

        player.x = canvas.width-35;

    }

});
// =======================================================
// FALLING HEART
// =======================================================

class FallingHeart{

    constructor(){

        this.x = Math.random() * (canvas.width - 80) + 40;

        this.y = -40;

        this.speed = 2 + Math.random() * 3;

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

        ctx.font = "34px Arial";

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

// =======================================================
// PLAYER
// =======================================================

function drawPlayer(){

    playerScale += (1 - playerScale) * 0.15;

    ctx.save();

    ctx.translate(player.x, player.y);
    ctx.scale(playerScale, playerScale);

    ctx.font = "54px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("💖", 0, 0);

    ctx.restore();

}
    
// =======================================================
// HEART UPDATE
// =======================================================

function updateHearts(){

    spawnTimer++;

    if(spawnTimer > 28){

        spawnTimer = 0;

        hearts.push(new FallingHeart());

    }

    for(let i = hearts.length - 1; i >= 0; i--){

        const h = hearts[i];

        h.update();

        h.draw();

        // Çarpışma

        const dx = h.x - player.x;

        const dy = h.y - player.y;

        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 40){

            collectScore += h.value;

            if(collectScore < 0){

                collectScore = 0;

            }

            if(collectScore > 25){

                collectScore = 25;

            }

            playerScale = 1.25;

            // Sparkles

            for(let j=0;j<10;j++){

                sparkles.push({

                    x:h.x,

                    y:h.y,

                    vx:(Math.random()-0.5)*8,

                    vy:(Math.random()-0.5)*8,

                    life:25

                });

            }

            hearts.splice(i,1);

            continue;

        }

        // Ekrandan çıktı

        if(h.y > canvas.height + 60){

            hearts.splice(i,1);

        }

    }

}

// =======================================================
// SPARKLES
// =======================================================

function updateSparkles(){

    for(let i = sparkles.length - 1; i >= 0; i--){

        const s = sparkles[i];

        s.x += s.vx;

        s.y += s.vy;

        s.vx *= 0.95;

        s.vy *= 0.95;

        s.life--;

        ctx.save();

        ctx.globalAlpha = s.life / 25;

        ctx.fillStyle = "#ffd7ef";

        ctx.beginPath();

        ctx.arc(
            s.x,
            s.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        if(s.life <= 0){

            sparkles.splice(i,1);

        }

    }

}
// =======================================================
// MAIN UPDATE
// =======================================================

function updateCollectMyHeart(){

    if(!collectRunning) return;

    // Kalpler
    updateHearts();

    // Efektler
    updateSparkles();

    // Oyuncu EN SON çizilir
    drawPlayer();

    // Skor
    ctx.save();

    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    ctx.shadowColor = "#ff6fb8";
    ctx.shadowBlur = 18;

    ctx.fillText(
        `❤️ ${collectScore} / 25`,
        25,
        45
    );

    ctx.restore();

    // Kazanma

    if(collectScore >= 25){

        collectRunning = false;

        setTimeout(()=>{

            alert("You protected every piece of my heart ❤️");

            // Sonraki oyun
            // startFindMe();

        },300);

    }

}
