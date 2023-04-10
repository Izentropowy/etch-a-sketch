const grid = document.querySelector(".grid");
const gridSide = grid.clientHeight;
var pixel;

;// check marker mode (black default)

// change marker to black

// change marker to random

// change marker to white

// erase the board

// Build a grid (120/80/60/48/40/24/20)

function buildGrid(resolution){
    let a = gridSide / resolution;
    for (let i = 0; i < resolution; i++){
        for (let j = 0; j < resolution; j++){
            pixel = document.createElement("div");
            grid.appendChild(pixel);
            pixel.style.backgroundColor = "red";
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
            element.style.backgroundColor = "black";
        }
    })

    // first pixel clicked should also be colored

    element.addEventListener('click', function(){
        element.style.backgroundColor = "black";
    })
})



