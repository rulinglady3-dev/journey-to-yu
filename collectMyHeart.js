/*=========================================================
    COLLECT MY HEART V2
=========================================================*/

const collectScene = document.getElementById("collectMyHeartScene");
// Ana canvas kullanılacak
const gameCanvas = document.getElementById("bgCanvas");
const cctx = gameCanvas.getContext("2d");

const heartCounter = document.getElementById("heartCounter");

let collectRunning = false;
let collectScore = 0;

let player = {
    x:0,
    y:0,
    size:42
};

let hearts = [];
let sparkles = [];

let spawnTimer = 0;
let playerPulse = 0;

function resizeCollectCanvas(){

    player.y = gameCanvas.height - 100;

}

resizeCollectCanvas();

window.addEventListener("resize",resizeCollectCanvas);

function startCollectMyHeart(){

    document.querySelectorAll(".scene").forEach(scene=>{

        scene.classList.remove("active");
        scene.style.display="none";

    });

    collectScene.classList.add("active");
    collectScene.style.display="flex";

    currentScene = 11;

    collectScore = 0;

    hearts = [];
    sparkles = [];

    spawnTimer = 0;

    collectRunning = true;

    heartCounter.textContent="❤️ 0 / 25";

    player.x = collectCanvas.width/2;

    player.y = gameCanvas.height - 100;

}

window.addEventListener("mousemove",(e)=>{

    const rect = collectCanvas.getBoundingClientRect();

    player.x = e.clientX - rect.left;

});

class FallingHeart{

    constructor(){

        this.x = Math.random() * gameCanvas.width;
        this.y = -60;

        this.speed = 3 + Math.random()*3;

        const r = Math.random();

        if(r < .70){

            this.emoji="❤️";
            this.value=1;

        }else if(r<.90){

            this.emoji="💖";
            this.value=3;

        }else{

            this.emoji="💔";
            this.value=-1;

        }

    }

}

function drawPlayer(){

    playerPulse += 0.08;

    cctx.save();

    cctx.translate(player.x,player.y);

    const scale = 1 + Math.sin(playerPulse)*0.05;

    cctx.scale(scale,scale);

    cctx.shadowColor="#ff66cc";
    cctx.shadowBlur=35;

    cctx.font="48px Arial";
    cctx.textAlign="center";
    cctx.textBaseline="middle";

    cctx.fillText("💗",0,0);

    cctx.restore();

}

function drawHearts(){

console.log("Hearts:", hearts.length);
    
    spawnTimer++;

    if(spawnTimer >= 12){

        hearts.push(new FallingHeart());

        spawnTimer = 0;

    }

    for(let i = hearts.length-1; i>=0; i--){

        const h = hearts[i];

        h.y += h.speed;

        cctx.font="36px Arial";
        cctx.textAlign="center";
        cctx.textBaseline="middle";

        cctx.fillText(h.emoji,h.x,h.y);

        const dx = h.x-player.x;
        const dy = h.y-player.y;

        if(Math.sqrt(dx*dx+dy*dy) < 35){

            collectScore += h.value;

            if(collectScore < 0)
                collectScore = 0;

            heartCounter.textContent =
            `❤️ ${collectScore} / 25`;

            for(let k=0;k<12;k++){

                sparkles.push({

                    x:h.x,
                    y:h.y,

                    vx:(Math.random()-0.5)*8,
                    vy:(Math.random()-0.5)*8,

                    life:20

                });

            }

            hearts.splice(i,1);

            continue;

        }

        if(h.y > collectCanvas.height+60){

            hearts.splice(i,1);

        }

    }

}

function updateSparkles(){

    for(let i=sparkles.length-1;i>=0;i--){

        const p=sparkles[i];

        p.x+=p.vx;
        p.y+=p.vy;

        p.life--;

        cctx.fillStyle=`rgba(255,190,220,${p.life/20})`;

        cctx.beginPath();
        cctx.arc(p.x,p.y,3,0,Math.PI*2);
        cctx.fill();

        if(p.life<=0){

            sparkles.splice(i,1);

        }

    }

}

function updateCollectMyHeart(){
    
    console.count("Collect Frame");

    if(!collectRunning) return;

    drawPlayer();

    drawHearts();

    updateSparkles();

    if(collectScore>=25){

        collectRunning=false;

        setTimeout(()=>{

            startFindMe();

        },600);

    }

   cctx.save();

cctx.globalAlpha = 0.001;
cctx.fillStyle = "#000";

cctx.fillRect(0, 0, 1, 1);

cctx.restore(); 

}
