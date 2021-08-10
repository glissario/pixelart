let globalColor = "";
let globalSize = null;

const size = document.querySelector("#input-size");
size.addEventListener("keydown", initSite);

function initSite(e) {
  if (e.keyCode === 13) {
    console.log(typeof event.target.value);
    globalSize = event.target.value;
    initPalette(event.target.value);
    initField(event.target.value);
    event.target.removeEventListener("keydown", initSite);
    event.target.value = "";
  }
}

function initPalette(size) {
  const palette = document.querySelector("#palette");
  let gridRows = "";
  for (let i = 0; i < size - 1; i++) {
    gridRows = gridRows + "1fr ";
  }
  gridRows = gridRows + "1fr";
  palette.style.gridTemplateColumns = gridRows;

  for (let j = 0; j < size; j++) {
    renderPalette(palette, j);
  }
}

function renderPalette(parent, fieldx) {
  square = document.createElement("div");
  square.classList = "palette-square";
  height = 30 / globalSize + "rem";
  square.style.height = height;
  square.setAttribute("x-axis", fieldx);
  square.setAttribute("y-axis", 0);
  const backgroundColor = randomColor();
  square.style.backgroundColor = backgroundColor;
  square.addEventListener("click", function () {
    globalColor = event.target.style.backgroundColor;
    console.log(globalColor);
  });
  parent.appendChild(square);
}

function initField(size) {
  const field = document.querySelector(".art-field");
  let gridRows = "";
  for (let i = 0; i < size - 1; i++) {
    gridRows = gridRows + "1fr ";
  }
  gridRows = gridRows + "1fr";
  console.log(gridRows);
  field.style.gridTemplateColumns = gridRows;
  field.style.gridTemplateRows = gridRows;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      renderSquare(field, i, j);
    }
  }
}

function renderSquare(parent, fieldx, fieldy) {
  square = document.createElement("div");
  square.classList = "square";
  square.id = "square";
  square.setAttribute("x-axis", fieldx);
  square.setAttribute("y-axis", fieldy);
  square.addEventListener("click", coloredSquare);
  parent.appendChild(square);
}

//generate new colors
const newColorButton = document.querySelector("#new-color");
newColorButton.addEventListener("click", generateNewColor);

function generateNewColor() {
  colors = document.querySelectorAll(".palette-square");
  colors.forEach(function (element) {
    const randomBGColor = randomColor();
    element.style.backgroundColor = randomBGColor;
  });
}

function coloredSquare() {
  cb = document.querySelector("#checkbox");
  console.log(cb.checked);
  if (cb.checked) {
    console.log(event.target);
    fillTool(event.target);
  } else {
    event.target.style.backgroundColor = globalColor;
    const x = event.target.getAttribute("x-axis");
    const y = event.target.getAttribute("y-axis");
    console.log(x + " " + y);
  }
}

function fillTool(event) {
  xAxis = event.getAttribute("x-axis");
  yAxis = event.getAttribute("y-axis");
  console.log(xAxis + " " + yAxis);
  console.log(globalSize - 1);

  if (xAxis == 0) {
    if (yAxis == 0) {
      getField(0, 0);
      getField(0, 1);
      getField(1, 0);
      getField(1, 1);
    } else if (yAxis == globalSize - 1) {
      getField(0, globalSize - 2);
      getField(0, globalSize - 1);
      getField(1, globalSize - 2);
      getField(1, globalSize - 1);
    } else {
      console.log(xAxis + " " + yAxis);
      for (let i = -1; i < 2; i++) {
        getField(0, yAxis - i);
        getField(1, yAxis - i);
      }
    }
  } else if (xAxis == globalSize - 1) {
    if (yAxis == 0) {
      getField(globalSize - 1, 0);
      getField(globalSize - 1, 1);
      getField(globalSize - 2, 0);
      getField(globalSize - 2, 1);
    } else if (yAxis == globalSize - 1) {
      getField(globalSize - 1, globalSize - 2);
      getField(globalSize - 1, globalSize - 1);
      getField(globalSize - 2, globalSize - 2);
      getField(globalSize - 2, globalSize - 1);
    } else {
      console.log(xAxis + " " + yAxis);
      for (let i = -1; i < 2; i++) {
        getField(globalSize - 1, yAxis - i);
        getField(globalSize - 2, yAxis - i);
      }
    }
  } else if (yAxis == 0 && xAxis != 0) {
    for (let i = -1; i < 2; i++) {
      getField(xAxis - i, 0);
      getField(xAxis - i, 1);
    }
  } else if (yAxis == globalSize - 1 && xAxis != 0) {
    for (let i = -1; i < 2; i++) {
      getField(xAxis - i, globalSize - 1);
      getField(xAxis - i, globalSize - 2);
    }
  } else if (yAxis != 0 && xAxis != 0) {
    for (let i = -1; i < 2; i++) {
      getField(xAxis - 1, yAxis - i);
      getField(xAxis, yAxis - i);
      getField(xAxis - -1, yAxis - i);
    }
  }
}
function getField(x, y) {
  console.log(x);
  allSquare = document.querySelectorAll("#square");
  for (i = 0; i < allSquare.length; i++) {
    const xAxis = allSquare[i].getAttribute("x-axis");
    const yAxis = allSquare[i].getAttribute("y-axis");
    //console.log(xAxis + " " + x + "y" + y + yAxis);
    if (xAxis == x && yAxis == y) {
      console.log("test");
      allSquare[i].style.backgroundColor = globalColor;
      return;
    }
  }
}

// create random color
function randomColor() {
  const red = randomHexNumber();
  const green = randomHexNumber();
  const blue = randomHexNumber();
  return ("#" + red + green + blue).toUpperCase();
}

function randomNumber(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.floor(num);
}

function randomHexNumber() {
  let hex = randomNumber(0, 255).toString(16);
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex;
}
