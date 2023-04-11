const grid = document.querySelector(".grid");
const gridSide = grid.clientHeight;
const blackButton = document.querySelector(".btn-black");
const randomButton = document.querySelector(".btn-random");
const eraseButton = document.querySelector(".btn-erase");
const clearButton = document.querySelector(".btn-clear");
const label = document.querySelector("label");
const slider = document.getElementById("resolution");
var pixel;
let markerColor = "black";

// Build a grid (80/60/40/20)
function buildGrid(resolution){
    let a = gridSide / resolution;
    for (let i = 0; i < resolution; i++){
        for (let j = 0; j < resolution; j++){
            pixel = document.createElement("div");
            grid.appendChild(pixel);
            pixel.style.width = `${a}px`;
            pixel.style.height = `${a}px`;
            pixel.style.userSelect = "none";
            pixel.style.webkitUserDrag = "none";
        }
    }
}

buildGrid(60);

// check if mouse is currently clicked
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

// this must be done after the grid is built (!)
const gridChildren = Array.from(grid.children)

// color pixels only if mouse over AND mouse clicked
gridChildren.forEach(function(element){
    element.addEventListener('mouseover', function(){
        if(mouseDown){
            element.style.backgroundColor = markerColor;
        }
    })

    // first pixel clicked should also be colored
    element.addEventListener('click', function(){
        element.style.backgroundColor = markerColor;
    })
})

// tools functionality
blackButton.addEventListener('click', function(){
    markerColor = "black";
})

randomButton.addEventListener('click', function(){
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    markerColor = `rgb(${R}, ${G}, ${B})`;
})

eraseButton.addEventListener('click', function(){
    markerColor = "white";
})

function clear(){
    gridChildren.forEach(function(element){
        element.style.backgroundColor = "white";
    })
}
clearButton.addEventListener('click', function(){
    clear();
})

slider.addEventListener('input', function(){
    label.textContent = this.value + ' x ' + this.value;
    // grid.innerHTML = '';
    buildGrid(this.value);
})




