const grid = document.querySelector(".grid");
const blackButton = document.querySelector(".btn-black");
const randomButton = document.querySelector(".btn-random");
const eraseButton = document.querySelector(".btn-erase");
const clearButton = document.querySelector(".btn-clear");
const label = document.querySelector("label");
const slider = document.getElementById("resolution");
const resolution = 40;
var gridSide = grid.clientHeight;
var gridChildren;
var pixel;
var currentMode = "black";
var markerColor;
var mouseDown = false;

function buildGrid(resolution){
    let a = gridSide / resolution;
    for (let i = 0; i < resolution; i++){
        for (let j = 0; j < resolution; j++){
            pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.width = `${a}px`;
            pixel.style.height = `${a}px`;
            grid.appendChild(pixel);
        }
    }
}

function draw(){
    // this must be done after the grid is built (!)
    gridChildren = Array.from(grid.children)

    // color pixels only if mouse over AND mouse clicked
    gridChildren.forEach(function(element){

        element.addEventListener('mouseover', function(){
            if(mouseDown){
                markerColor = setMarker(currentMode);
                element.style.backgroundColor = markerColor;
            }
        })

        // first pixel clicked should also be colored
        element.addEventListener('click', function(){
            markerColor = setMarker(currentMode);
            element.style.backgroundColor = markerColor;
        })
    })
}

function clear(){
    gridChildren.forEach(function(element){
        element.style.backgroundColor = "white";
    })
}

function chooseColor(){
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    return `rgb(${R}, ${G}, ${B})`;
}

function changeGrid(){
    console.log(this.value);
    label.textContent = this.value + ' x ' + this.value;
    grid.innerHTML = '';
    buildGrid(this.value);
    draw();
}

function setMarker(currentMode){
    if (currentMode === "black"){
        markerColor = "black";
    }
    else if (currentMode === "white"){
        markerColor = "white";
    }
    else {
         markerColor = chooseColor();
    }
    return markerColor;
}

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);
blackButton.addEventListener('click', () => currentMode = "black");
eraseButton.addEventListener('click', () => currentMode = "white");
clearButton.addEventListener('click', clear);
randomButton.addEventListener('click', () => currentMode = "random");
slider.addEventListener('input', changeGrid);

buildGrid(resolution);
draw();




