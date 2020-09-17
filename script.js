//declaring variables
var dimension = "16";
var gridSize = dimension * dimension;
var i = 0;
const container = document.querySelector("#container");

//builds grid and div functionality
function buildGrid() {
    for (i = 0; i < gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("blank");
        square.setAttribute("id", i);
        square.addEventListener("mouseover", () => {
            square.classList.remove("blank");
            square.classList.add("hoverDiv");
        })
        container.appendChild(square);
    }
}
buildGrid();

// reset and resize functionality
const reset = document.getElementById("resetButton");
reset.addEventListener("click", function (){
    container.textContent = "";
    resetPixels();
});

function resetPixels() {
    var newDimension = prompt("Choose the number of rows/columns in the grid. Pick one number between 1-100", "1-100");
    if (newDimension != null && newDimension > 0 && newDimension <= 100) {
        newDimension = Math.floor(newDimension);
        container.style.gridTemplateColumns = "repeat(" + newDimension + ", 1fr)"
        container.style.gridTemplateRows = "repeat(" + newDimension + ", 1fr)"

        gridSize = newDimension * newDimension;

        for ( i = 0; i < gridSize; i++) {
            const square = document.createElement("div");
            square.classList.add("blank");
            square.setAttribute("id", i);
            square.addEventListener("mouseover", () => {
                square.classList.remove("blank");
                square.classList.add("hoverDiv");
            })
            container.appendChild(square);
        }
    } else {
        alert("Please pick a number between 1 and 100");
        resetPixels();
    }
}