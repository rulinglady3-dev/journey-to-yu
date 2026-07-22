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

