const grid = document.querySelector(".grid");
var gridSide = grid.clientHeight;
const blackButton = document.querySelector(".btn-black");
const randomButton = document.querySelector(".btn-random");
const eraseButton = document.querySelector(".btn-erase");
const clearButton = document.querySelector(".btn-clear");
const label = document.querySelector("label");
const slider = document.getElementById("resolution");
var gridChildren;
var pixel;
let markerColor = "black";
const resolution = 80;

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
                element.style.backgroundColor = markerColor;
            }
        })

        // first pixel clicked should also be colored
        element.addEventListener('click', function(){
            element.style.backgroundColor = markerColor;
        })
    })
}

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
    grid.innerHTML = '';
    buildGrid(this.value);
    draw();
})

// check if mouse is currently clicked
var mouseDown = 0;
document.body.onmousedown = function() { 
++mouseDown;
}
document.body.onmouseup = function() {
--mouseDown;
}


buildGrid(resolution);
draw();






