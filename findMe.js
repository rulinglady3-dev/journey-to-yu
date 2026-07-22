// =======================================================
// FIND ME
// =======================================================

let findRunning = false;

let stars = [];

let fakeObjects = [];

let yuObject = null;

let findMessage = false;

let findTimer = 0;
function startFindMe(){

    showScene(12);

    findRunning = true;

    stars = [];

    fakeObjects = [];

    findMessage = false;

    findTimer = 0;

   createFindObjects();

}
// =======================================================
// CREATE OBJECTS
// =======================================================

function createFindObjects(){

    // Arka plan yıldızları

    for(let i=0;i<120;i++){

        stars.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            size:Math.random()*2+1,

            speed:0.2+Math.random()*0.4,

            alpha:0.3+Math.random()*0.7

        });

    }

    // Sahte objeler

    const emojis = [

        "⭐",
        "✨",
        "💖",
        "🌙"

    ];

    for(let i=0;i<30;i++){

        fakeObjects.push({

            x:Math.random()*(canvas.width-100)+50,

            y:Math.random()*(canvas.height-200)+80,

            emoji:emojis[Math.floor(Math.random()*emojis.length)],

            size:26+Math.random()*12,

            found:false

        });

    }

    // Gerçek Yu

    yuObject={

        x:Math.random()*(canvas.width-120)+60,

        y:Math.random()*(canvas.height-220)+100,

        text:"Yu",

        size:34,

        found:false

    };

}
// =======================================================
// UPDATE FIND ME
// =======================================================

function updateFindMe(){

    if(!findRunning) return;

    // Arka plan

    ctx.fillStyle = "#03040d";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Yıldızlar

    for(const star of stars){

        star.y += star.speed;

        if(star.y > canvas.height){

            star.y = -5;
            star.x = Math.random()*canvas.width;

        }

        ctx.globalAlpha = star.alpha;

        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

    ctx.globalAlpha = 1;

    // Sahte objeler

    for(const obj of fakeObjects){

        if(obj.found) continue;

        ctx.font = `${obj.size}px Arial`;

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.fillText(
            obj.emoji,
            obj.x,
            obj.y
        );

    }

    // Gerçek hedef

    if(!yuObject.found){

        ctx.font = `bold ${yuObject.size}px Arial`;

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.fillStyle = "#ffd8f2";

        ctx.fillText(
            yuObject.text,
            yuObject.x,
            yuObject.y
        );

    }

}


