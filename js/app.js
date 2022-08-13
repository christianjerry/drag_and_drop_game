var score = 0; //define the variable to track the score
const step = 25; // define the variable to award score
var time = 60; // define the timing of the game
const successAlrt = document.querySelector(".successAlrt");
const errorAlrt = document.querySelector(".errorAlrt");
function allowDrop(event) {
    event.preventDefault();
    const elm=event.target
    elm.style.border="4px double lightblue";
}

function removeStyle(event){
    const elm=event.target
    elm.style.border="none";
}
function drag(e) {

    const code = {
        "code": e.target.getAttribute('code'),
        "id": e.target.id
    }
    e.dataTransfer.setData("code", JSON.stringify(code))
}
function drop(e) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("code"));
    const id = e.target.id;
    const sentId = data.id;
    const sentCode = data.code;
    const res = sentCode === id ? true : false;
    if (res) {
        e.target.appendChild(document.getElementById(sentId))
        awardPoint(Number(step));
        playSuccess()
        successAlrt.style.display = "flex"
        setTimeout(() => {
            successAlrt.style.display = "none"

        }, 500)
    } else {
        playFail();
        errorAlrt.style.display = "flex"
        setTimeout(() => {
            errorAlrt.style.display = "none"

        }, 500)
        const toHide = document.getElementById(sentId);
        toHide.setAttribute("draggable", false);
        toHide.style.textDecoration = "line-through";
        toHide.style.color = "lightgrey";
        return;
    }

}
function gradend(e) {
}
function awardPoint(max) {
    score += Number(max);
    const getScore = document.querySelector("#score");
    getScore.innerHTML = score
}
const btn = document.querySelector(".startBtn");
btn.addEventListener("click", () => {

    setInterval(() => {
        const newTime = Number(time) - 1;
        const getTime = document.querySelector("#timing");
        time = newTime;
        getTime.textContent = time;
    }, 1000)
})


// create shadow when a droppable element is on top 
// control alert 
const sucessAudio = document.getElementById("mySuccessAudio");
const failAudio = document.getElementById("myFailedAudio");
function playSuccess() {
    sucessAudio.play();
}
function playFail() {
    failAudio.play();
}