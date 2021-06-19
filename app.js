const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("js_color");
const range = document.getElementById("jsRange");
const modebtn = document.getElementById("jsMode");
const savebtn = document.getElementById("jsSave");

const INITIAL_COLOR = "rgb(39, 38, 38";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth =2.5;


let painting = false;
let filling = false;

function stopPainting(event) {
    painting = false;
    console.log(event);
}

function startPainting() {
        painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleMode() {
    if (filling === true) {
        filling = false;
        modebtn.innerText = "Fill";
    } else {
        filling = true;
        modebtn.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function saveClick(event) {
    const imageSave = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = imageSave;
    link.download = "Jin's painting app"
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (modebtn) {
    modebtn.addEventListener("click", handleMode);
}

if (savebtn) {
    savebtn.addEventListener("click", saveClick);
}