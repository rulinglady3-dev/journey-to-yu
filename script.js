/*=========================================================
    JOURNEY TO YU
=========================================================*/

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let scene2Finished = false;
let scene3Started = false;

const memoryData = [

    {
        gif:"images/gifs/gif1.gif",
        text:""
    },

    {
        gif:"images/gifs/gif2.gif",
        text:""
    },

    {
        gif:"images/gifs/gif3.gif",
        text:""
    },

    {
        gif:"images/gifs/gif4.gif",
        text:""
    },

    {
        gif:"images/gifs/gif5.gif",
        text:""
    },

    {
        gif:"images/gifs/gif6.gif",
        text:""
    },

    {
        gif:"images/gifs/gif7.gif",
        text:""
    },

    {
        gif:"images/gifs/gif8.gif",
        text:""
    }

];

let openedMemories = 0;

let finalStage = false;

let finalParticles = [];

let finalTargets = [];

let finalWordIndex = 0;

const finalWords = [

    "LOVE ME",

    "HUG ME",

    "KISS ME",

    "FOREVER"

];

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

/*=========================================================
    SCENES
=========================================================*/

const scenes = document.querySelectorAll(".scene");

let currentScene = 0;

function showScene(index){

    scenes.forEach(scene=>{

        scene.classList.remove("active");

    });

    scenes[index].classList.add("active");

    currentScene = index;

}

/*=========================================================
    STARS
=========================================================*/

const stars = [];

const STAR_COUNT = 700;

class Star{

    constructor(){

        this.reset(true);

    }

    reset(first=false){

        this.x = Math.random()*canvas.width;

        this.y = Math.random()*canvas.height;

        this.size = Math.random()*2;

        this.speed = 0.15 + Math.random()*1.2;

        this.opacity = 0.2 + Math.random()*0.8;

        if(first){

            this.y = Math.random()*canvas.height;

        }

    }

    update(){

        this.y += this.speed;

        if(this.y > canvas.height){

            this.y = -5;

            this.x = Math.random()*canvas.width;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle =
        "rgba(255,255,255,"+this.opacity+")";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

for(let i=0;i<STAR_COUNT;i++){

    stars.push(new Star());

}

/*=========================================================
    SHOOTING STARS
=========================================================*/

const meteors = [];

class Meteor{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*canvas.width;

        this.y = -200;

        this.length = 120 + Math.random()*150;

        this.speed = 12 + Math.random()*10;

        this.angle = Math.PI/4;

        this.life = 0;

        this.maxLife = 80 + Math.random()*80;

    }

    update(){

        this.life++;

        this.x += this.speed;

        this.y += this.speed;

        if(this.life > this.maxLife){

            this.reset();

            this.x = Math.random()*canvas.width*0.6;

        }

    }

    draw(){

        ctx.beginPath();

        const x2 =
        this.x -
        Math.cos(this.angle)*this.length;

        const y2 =
        this.y -
        Math.sin(this.angle)*this.length;

        const gradient =
        ctx.createLinearGradient(
            this.x,
            this.y,
            x2,
            y2
        );

        gradient.addColorStop(0,"rgba(255,255,255,.9)");
        gradient.addColorStop(1,"rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(x2,y2);

        ctx.stroke();

    }

}

for(let i=0;i<4;i++){

    meteors.push(new Meteor());

}

/*=========================================================
    PARTICLES
=========================================================*/
const particles = [];

class Particle{

    constructor(x,y){

        this.x = x;
        this.y = y;

        this.vx = (Math.random()-0.5)*22;
        this.vy = (Math.random()-0.5)*22;

        this.size = 3 + Math.random()*6;

        this.life = 180;

    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

        this.life--;

        this.size *= 0.985;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle =
        "rgba(255,180,220,"+(this.life/120)+")";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

function explodeOrb(x,y){

    for(let i=0;i<120;i++){

        particles.push({

            x:x,
            y:y,

            vx:(Math.random()-0.5)*12,
            vy:(Math.random()-0.5)*12,

            size:2+Math.random()*5,

            life:70,

            update(){

                this.x += this.vx;
                this.y += this.vy;

                this.life--;

                this.size *= 0.97;

            },

            draw(){

                ctx.beginPath();

                ctx.fillStyle =
                "rgba(255,220,245,"+(this.life/70)+")";

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI*2
                );

                ctx.fill();

            }

        });

    }

}

/*=========================================================
    MOUSE
=========================================================*/

const mouse = {

    x: window.innerWidth / 2,

    y: window.innerHeight / 2

};

window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;

    mouse.y = e.clientY;

});

/*=========================================================
    TOUCH THE UNIVERSE
=========================================================*/

const touchText = document.getElementById("touchText");

let introStarted = false;

touchText.addEventListener("click", startJourney);

function startJourney(){

    if(introStarted) return;

    introStarted = true;

    touchText.style.pointerEvents = "none";

    for(let i=0;i<3000;i++){

        particles.push(

            new Particle(

                canvas.width/2,

                canvas.height/2

            )

        );

    }

    document
        .querySelector(".intro-container")
        .classList
        .add("fadeOut");

    setTimeout(()=>{

        showScene(1);

    },1400);

}

/*=========================================================
    DRAW
=========================================================*/

function drawBackground(){

    ctx.fillStyle = "black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

/*=========================================================
    STARS
=========================================================*/

function drawStars(){

    for(const star of stars){

        const dx =
        (mouse.x-canvas.width/2)*0.0008;

        const dy =
        (mouse.y-canvas.height/2)*0.0008;

        star.x += dx;

        star.y += dy;

        if(currentScene===1){

    star.y += star.speed*3;

}else{

    star.update();

}

        star.draw();

    }

}

/*=========================================================
    METEORS
=========================================================*/

function drawMeteors(){

    for(const meteor of meteors){

        meteor.update();

        meteor.draw();

    }

}

/*=========================================================
    PARTICLES
=========================================================*/

function drawParticles(){

    for(let i=particles.length-1;i>=0;i--){

        particles[i].update();

        particles[i].draw();

        if(particles[i].life<=0){

            particles.splice(i,1);

        }

    }

}

/*=========================================================
    ANIMATION LOOP
=========================================================*/

function animate(){

    requestAnimationFrame(animate);

  if(currentScene < 11){

    drawBackground();

    drawStars();

    drawMeteors();

    drawParticles();

} 

    switch(currentScene){

        case 1:
            scene2Animation();
            break;

        case 2:

    createMemoryScene();

    updateMemoryOrbs();

    drawOrbConnections();

    break;

        case 11:
            updateCollectMyHeart();
            break;

        case 12:
            updateFindMe();
            break;

        case 13:
            updateRememberUs();
            break;

        case 14:
            updateOneLastHug();
            break;

        case 15:
            updateFinalEngine();
            break;

    }

}

animate();
/*=========================================================
    SCENE 2 CAMERA
=========================================================*/

let cameraDepth = 0;

function scene2Animation(){

    if(currentScene !== 1) return;

    cameraDepth += 0.05;

    const planet = document.getElementById("planet");
    const glow = document.querySelector(".space-glow");
    const text = document.getElementById("travelText");

    if(planet){

        const scale = 1 + cameraDepth * 0.06;

        planet.style.transform =
        `translate(-50%,-50%) scale(${scale})`;
    }

    if(glow){

        glow.style.transform =
        `translate(-50%,-50%) scale(${1+cameraDepth*0.12})`;

    }

    if(text){

        text.style.opacity =
        Math.max(
            1-cameraDepth*0.2,
            0
        );

    }
if(cameraDepth > 8 && !scene2Finished){

    scene2Finished = true;

    const flash = document.getElementById("whiteFlash");

    flash.style.opacity = 1;

    setTimeout(()=>{

        showScene(2);

    },1800);

}
}
function createMemoryScene(){

    if(currentScene!==2) return;

    if(scene3Started) return;

    scene3Started=true;

    const container=document.getElementById("memoryContainer");

    memoryData.forEach((item,index)=>{

       const orb = document.createElement("div");

orb.className = "memoryOrb";

const centerX = container.clientWidth / 2;

const centerY = container.clientHeight / 2;

const angle =
(index / memoryData.length) *
(Math.PI * 2) -
Math.PI / 2;

const radius = 260;

orb.dataset.angle = angle;

orb.dataset.radius = radius;

orb.dataset.speed = 0.002 + Math.random() * 0.002;

       orb.style.left =
      (centerX + Math.cos(angle) * radius) + "px";

      orb.style.top =
      (centerY + Math.sin(angle) * radius) + "px";
        
        orb.style.animationDelay=(Math.random()*3)+"s";

        console.log(orb);

        orb.addEventListener("click",()=>{

            const rect = orb.getBoundingClientRect();

explodeOrb(

    rect.left + rect.width/2,

    rect.top + rect.height/2

);

    document.getElementById("memoryViewer").style.display="flex";

    const card = document.getElementById("memoryCard");

setTimeout(()=>{

    card.classList.add("show");

},20);

    document.getElementById("memoryGif").src=item.gif;

    document.getElementById("memoryText").textContent=item.text;

    orb.style.pointerEvents="none";

    orb.style.opacity=".15";

});
        
        container.appendChild(orb);

    });

}

let orbitRotation = 0;

function updateMemoryOrbs(){

    if(currentScene!==2) return;

    orbitRotation += 0.0015;

    const container=document.getElementById("memoryContainer");

    if(!container) return;

    const orbs=container.querySelectorAll(".memoryOrb");

    const centerX = container.clientWidth / 2;

    const centerY = container.clientHeight / 2;

    orbs.forEach((orb)=>{

        let angle=parseFloat(orb.dataset.angle);

        angle+=parseFloat(orb.dataset.speed);

        orb.dataset.angle=angle;

        const radius=parseFloat(orb.dataset.radius);

        orb.style.left=(centerX+Math.cos(angle)*radius)+"px";

        orb.style.top=(centerY+Math.sin(angle)*radius)+"px";

    });

}

function drawOrbConnections(){

    if(currentScene!==2) return;

    const container=document.getElementById("memoryContainer");

    if(!container) return;

    const orbs=[...container.querySelectorAll(".memoryOrb")];

    ctx.save();

    ctx.strokeStyle="rgba(255,180,230,.18)";

    ctx.lineWidth=1.2;

    for(let i=0;i<orbs.length;i++){

        for(let j=i+1;j<orbs.length;j++){

            const x1=orbs[i].offsetLeft+35;
            const y1=orbs[i].offsetTop+35;

            const x2=orbs[j].offsetLeft+35;
            const y2=orbs[j].offsetTop+35;

            const dx=x2-x1;
            const dy=y2-y1;

            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<230){

                ctx.globalAlpha=1-distance/230;

                ctx.beginPath();

                ctx.moveTo(x1,y1);

                ctx.lineTo(x2,y2);

                ctx.stroke();

            }

        }

    }

    ctx.restore();

}

const closeMemory = document.getElementById("closeMemory");

if(closeMemory){

    closeMemory.addEventListener("click",()=>{

        const viewer = document.getElementById("memoryViewer");

const card = document.getElementById("memoryCard");

card.classList.remove("show");

setTimeout(()=>{

    viewer.style.display="none";

},500);

        openedMemories++;

        if(openedMemories === memoryData.length){

            setTimeout(()=>{

                startCollectMyHeart();

            },800);

        }

    });

}

function startFinalSequence(){

    finalStage = true;

    console.log("FINAL START");

}


