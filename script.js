// global variables
let dimension = "16";
let gridSize = dimension * dimension;
let penColor = "hoverGreen";
let fadeAway = 'on';
let colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Pink', 'Purple'];
let rainbowCount = 0;
const container = document.querySelector("#container");
const reset = document.getElementById("reset-button");
const changeSize = document.getElementById("size-button");
const palette = document.getElementById("palette");

function rainbow(){
    rainbowCount = (rainbowCount >= colors.length) ? 0 : rainbowCount;
    let currentColor = "hover" + colors[rainbowCount];
    rainbowCount++;
    return currentColor;
}

//function to draw with mouseover
function drawEffect(square){
    let currentColor;
    if(penColor === "hoverRainbow"){
        currentColor = rainbow();
    } else if(penColor === "erase"){
        square.removeAttribute("class")
    }else if (penColor !== "erase"){
        //prevents any glitching if change pen color
        currentColor = penColor;
    }
        square.removeAttribute('class');
        square.classList.add(currentColor);
        if(fadeAway === 'on'){
            setTimeout(() => {
                square.classList.remove(currentColor);
                square.classList.add("blank");
            }, 4000)
        }
};

//builds grid and divs
function buildGrid() {
    for (let i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("blank");
        square.setAttribute("id", i);
        square.addEventListener("mouseover", () => {
            drawEffect(square)
        })
        container.appendChild(square);
    }
};
buildGrid();

function buildPens(){
    let allColors = colors;
    allColors.push('Rainbow');
    for(let i = 0; i < allColors.length; i++){
        let color = document.createElement("button");
        color.classList.add("pen");
        color.setAttribute("id", allColors[i]);
        palette.appendChild(color);
        color.addEventListener("click", () => {
            penColor = "hover" + allColors[i];
        })
    }
}

function buildFadeButton(){
    let fadeButton = document.createElement("button");
    fadeButton.setAttribute("id", "fade-button");
    fadeButton.textContent = "Fade is on";
    fadeButton.addEventListener("click", () => {
        fadeAway = (fadeAway === 'on') ? 'off' : 'on';
        fadeButton.textContent = "Fade is " + fadeAway;
        console.log(fadeAway)
    })
    palette.appendChild(fadeButton);
}

function buildEraser(){
    let eraser = document.createElement("button");
    eraser.classList.add("pen");
    eraser.setAttribute("id", "eraser");
    eraser.addEventListener("click", () => {
        penColor = "erase"
    })
    palette.appendChild(eraser);
}

// builds color palette
(function buildPalette(){
    buildPens();
    buildFadeButton();
    buildEraser();
})();

function clearGrid(){
    container.textContent = "";
};

// change size function
function changeGridSize(){
    let newSize = prompt("Choose how many rows and columns you'd like (from 1-80).")
    if(newSize != null && newSize > 0 && newSize <= 80){
        newSize = Math.floor(newSize);
        container.style.gridTemplateColumns = "repeat(" + newSize + ", 1fr)";
        container.style.gridTemplateRows = "repeat(" + newSize + ", 1fr";
        gridSize = newSize * newSize;
        clearGrid();
        buildGrid();
    } else {
        alert("Please pick a number between 1 and 80");
    }
};

// reset grid event listener
reset.addEventListener("click", function (){
    clearGrid();
    buildGrid();
});

// change grid size event listener
changeSize.addEventListener("click", changeGridSize);