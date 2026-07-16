/*=========================================================
    JOURNEY TO YU
=========================================================*/

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

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
        (Math.random()-0.5)*10;

        this.vy =
        (Math.random()-0.5)*10;

        this.size =
        2 + Math.random()*4;

        this.life = 120;

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
