let globalColor = '';
let globalSize = null;
const dimensionBtn = document.querySelectorAll('.dimension-btn');
const size = document.querySelector('#input-size');
// initializing the dimension - remove Eventlistener after init

size.addEventListener('keydown', keyInit);

function keyInit(e) {
  if (e.keyCode === 13) {
    let value = event.target.value;
    if (value > 32) {
      value = 32;
    }
    globalSize = value;
    initPalette(12);
    initField(value);
    event.target.value = '';
    event.target.removeEventListener('keydown', initSite);
    for (let i = 0; i < dimensionBtn.length; i++) {
      dimensionBtn[i].removeEventListener('click', buttonInit);
    }
  }
}
for (let i = 0; i < dimensionBtn.length; i++) {
  dimensionBtn[i].addEventListener('click', buttonInit);
}

function buttonInit() {
  globalSize = event.target.value;
  initPalette(12);
  initField(event.target.value);
  event.target.removeEventListener('keydown', initSite);
  for (let i = 0; i < dimensionBtn.length; i++) {
    dimensionBtn[i].removeEventListener('click', buttonInit);
  }
}

function initSite(value) {
  globalSize = value;
  initPalette(value);
  initField(value);
}

function initPalette(size) {
  const palette = document.querySelector('#palette');
  let gridRows = '';
  for (let i = 0; i < size - 1; i++) {
    gridRows = gridRows + '1fr ';
  }
  gridRows = gridRows + '1fr';
  palette.style.gridTemplateColumns = gridRows;

  for (let j = 0; j < size; j++) {
    renderPalette(palette, j);
  }
}

function renderPalette(parent, fieldx) {
  const square = document.createElement('div');
  square.classList = 'palette-square';
  square.setAttribute('data-test', 'palette-square');
  const paletteHeight = 30 / 12 + 'rem';
  square.style.height = paletteHeight;
  square.setAttribute('x-axis', fieldx);
  square.setAttribute('y-axis', 0);
  const backgroundColor = randomColor();
  square.style.backgroundColor = backgroundColor;
  square.setAttribute('data-bg-color', backgroundColor);
  square.addEventListener('click', function () {
    const active = document.querySelector('.palette-square-active');
    if (active !== null) {
      active.classList = 'palette-square';
    }
    globalColor = event.target.style.backgroundColor;
    event.target.classList = 'palette-square-active';
  });
  parent.appendChild(square);
}

function initField(size) {
  const field = document.querySelector('.art-field');
  let gridRows = '';
  for (let i = 0; i < size - 1; i++) {
    gridRows = gridRows + '1fr ';
  }
  gridRows = gridRows + '1fr';

  field.style.gridTemplateColumns = gridRows;
  field.style.gridTemplateRows = gridRows;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      renderSquare(field, i, j);
    }
  }
}

function renderSquare(parent, fieldx, fieldy) {
  const square = document.createElement('div');
  square.classList = 'square';
  square.id = 'square';
  square.setAttribute('x-axis', fieldx);
  square.setAttribute('y-axis', fieldy);
  square.setAttribute('data-test', 'field-square');
  square.addEventListener('click', coloredSquare);
  parent.appendChild(square);
}

// generate new colors
const newColorButton = document.querySelector('#new-color');
newColorButton.addEventListener('click', generateNewColor);

function generateNewColor() {
  const colors = document.querySelectorAll('.palette-square');
  colors.forEach(function (element) {
    const randomBGColor = randomColor();
    element.style.backgroundColor = randomBGColor;
  });
}

// coloring the clicked square
function coloredSquare() {
  const cb = document.querySelector('#checkbox');
  if (cb.checked) {
    fillTool(event.target);
  } else {
    event.target.style.backgroundColor = globalColor;
  }
}

// coliring via fill tool
function fillTool(event) {
  const xAxis = event.getAttribute('x-axis');
  const yAxis = event.getAttribute('y-axis');

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
  const allSquare = document.querySelectorAll('#square');
  for (let i = 0; i < allSquare.length; i++) {
    const xAxis = allSquare[i].getAttribute('x-axis');
    const yAxis = allSquare[i].getAttribute('y-axis');
    if (xAxis == x && yAxis == y) {
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
  return ('#' + red + green + blue).toUpperCase();
}

function randomNumber(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.floor(num);
}

function randomHexNumber() {
  let hex = randomNumber(0, 255).toString(16);
  if (hex.length === 1) {
    hex = '0' + hex;
  }
  return hex;
}

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', refreshSite);

function refreshSite() {
  for (let i = 0; i < dimensionBtn.length; i++) {
    dimensionBtn[i].addEventListener('click', buttonInit);
  }
  size.addEventListener('keydown', keyInit);
  size.value = '';
  const delPalette = document.querySelectorAll('.palette-square');
  for (let i = 0; i < delPalette.length; i++) {
    delPalette[i].remove();
  }
  const delPaletteActive = document.querySelector('.palette-square-active');
  if (delPaletteActive !== null) {
    delPaletteActive.remove();
  }
  const delSquare = document.querySelectorAll('.square');
  for (let i = 0; i < delSquare.length; i++) {
    delSquare[i].remove();
  }
}
