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

       this.vx =
       (Math.random()-0.5)*22;

       this.vy =
       (Math.random()-0.5)*22;

        this.size =
        3 + Math.random()*6;

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

    drawBackground();

    drawStars();

    drawMeteors();

    drawParticles();

    scene2Animation();

    createMemoryScene();
    
    if(currentScene===1){

    const planet =
    document.getElementById("planet");

    if(planet){

        const time=Date.now()*0.001;

        planet.style.transform=
        `translate(-50%,-50%) scale(${1+Math.sin(time)*0.03})`;
    }

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

    console.log(container);

    memoryData.forEach((item,index)=>{

        const orb=document.createElement("div");

        orb.className="memoryOrb";

      const centerX = 450;
     const centerY = 300;

      const angle = (Math.PI * 2 / memoryData.length) * index;

      const radius = 180 + Math.random() * 80;

       orb.style.left =
      (centerX + Math.cos(angle) * radius) + "px";

      orb.style.top =
      (centerY + Math.sin(angle) * radius) + "px";
        
        orb.style.animationDelay=(Math.random()*3)+"s";

        console.log(orb);

        orb.addEventListener("click",()=>{

    document.getElementById("memoryViewer").style.display="flex";

    document.getElementById("memoryGif").src=item.gif;

    document.getElementById("memoryText").textContent=item.text;

    orb.style.pointerEvents="none";

    orb.style.opacity=".15";

});
        
        container.appendChild(orb);

    });

}
const closeMemory = document.getElementById("closeMemory");

if(closeMemory){

    closeMemory.addEventListener("click",()=>{

        document.getElementById("memoryViewer").style.display = "none";

        openedMemories++;

        if(openedMemories === memoryData.length){

            setTimeout(()=>{

                alert("LOVE ME animasyonu burada başlayacak.");

            },800);

        }

    });

}

