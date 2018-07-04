// Turn this into some sort of page manager object?

let canvas = document.getElementById("canvas");
let renderingCanvas = document.getElementById("rendering-canvas");
let currentWidth = 48;
let currentHeight = 24;
let height;
let can = new TextCanvas();

function makeCanvas(width, height) {
    if (width > 0 && height > 0) {
        can.build(width, height)
    } else {
        can.build(currentWidth, currentHeight);
    }
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

function checkDimension(num) {
    if (Number.isNaN(num) || num < 0 || num % 1 != 0) {
        return false;
    } else {
        return true;
    }
}

makeCanvas();

document.getElementById("clear-button").addEventListener("click", () => {
    makeCanvas(currentWidth, currentHeight);
});

document.getElementById("stringify-button").addEventListener("click", () => {
    stringifyArt();
});

let modal = document.getElementById("modal");

document.getElementById("set-size-button").addEventListener("click", () => {
    modal.style.display = "flex";
});

document.getElementById("set-size-submit-button").addEventListener("click", () => {
    let width = Number(document.getElementById("width-input").value);
    let height = Number(document.getElementById("height-input").value);

    if (!checkDimension(width) || !checkDimension(height)) {
        alert("Dimensions invalid.");
    } else {
        makeCanvas(width, height);
        currentWidth = width;
        currentHeight = height;
        modal.style.display = "none";
    }
});

document.getElementById("set-size-cancel-button").addEventListener("click", () => {
    modal.style.display = "none";
});