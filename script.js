const grid = document.querySelector(".grid");
const gridSide = grid.clientHeight;
const blackButton = document.querySelector(".btn-black");
const randomButton = document.querySelector(".btn-random");
const eraseButton = document.querySelector(".btn-erase");
const clearButton = document.querySelector(".btn-clear");
var pixel;
let markerColor = "black";


// Build a grid (80/60/48/40/24/20)
function buildGrid(resolution){
    let a = gridSide / resolution;
    for (let i = 0; i < resolution; i++){
        for (let j = 0; j < resolution; j++){
            pixel = document.createElement("div");
            grid.appendChild(pixel);
            pixel.style.width = `${a}px`;
            pixel.style.height = `${a}px`;
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

// change marker to black
blackButton.addEventListener('click', function(){
    markerColor = "black";
})

// change marker to random
randomButton.addEventListener('click', function(){
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    markerColor = `rgb(${R}, ${G}, ${B})`;
})

// change marker to white
eraseButton.addEventListener('click', function(){
    markerColor = "white";
})

// erase the board
clearButton.addEventListener('click', function(){
    gridChildren.forEach(function(element){
        element.style.backgroundColor = "white";
    })
})




