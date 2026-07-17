const collectScene =
document.getElementById("collectMyHeartScene");

function startCollectMyHeart(){

    document.querySelectorAll(".scene").forEach(scene=>{

        scene.style.display="none";

    });

    collectScene.style.display="flex";

    console.log("Collect My Heart Started");

}
