let canvas = document.getElementById("canvas");
let renderingCanvas = document.getElementById("rendering-canvas");

let can = new TextCanvas();

function makeCanvas() {
    can.build(48, 24);
    can.bind(canvas);
    can.get(0, 0).focus();
}

function stringifyArt() {
    renderingCanvas.textContent = can.toString();
    renderingCanvas.style.display = "block";
    renderingCanvas.select();
    document.execCommand("copy");
    renderingCanvas.style.display = "none";
    alert("ASCII art copied into clipboard.");
}

makeCanvas();

document.getElementById("clear-button").addEventListener("click", () => {
    makeCanvas();
});

document.getElementById("stringify-button").addEventListener("click", () => {
    stringifyArt();
});