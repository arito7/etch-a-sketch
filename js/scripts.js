const grid = document.querySelector('.grid');
const cells = document.querySelectorAll('.grid > div');
const btn = document.querySelector('button');
const MAX_WIDTH = 960;
const DEFAULT_BACKGROUND_COLOR = 'rgb(230, 230, 230)';

createGrid(16);

btn.addEventListener('click', e => {
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    let size = 0;
    while (true) {
        size = prompt('Input size of grid (Max 100)');
        if (size <= 100) {
            break;
        } 
    }
    createGrid(size);
})

function createGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;  
    grid.style.gridAutoRows = `minmax(${MAX_WIDTH/size}px, auto)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++){
            let cell = document.createElement('div');
            cell.addEventListener('mouseover', cellHoverEvent)
            cell.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
            grid.appendChild(cell);    
        }
    }  
}

function cellHoverEvent(e) {
    if (e.target.style.backgroundColor === DEFAULT_BACKGROUND_COLOR){
        e.target.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.1)`;
    } else {
        darken(e.target);
    }
}

/**
 * increase alpha value of background color by 0.1
 * @param {} cell div thats a direct child of grid
 */
function darken(cell){
    let currentColor = cell.style.backgroundColor;
    const reg = /\d.\d(?=[)])/;
    let alphaValue = parseFloat(reg.exec(currentColor));
    if (alphaValue < 1){
        alphaValue = alphaValue + 0.1;
        let darkenedColor = currentColor.replace(reg, alphaValue);
        cell.style.backgroundColor = darkenedColor;    
    }
}

