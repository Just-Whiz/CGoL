const container = document.querySelector('#container');

function createBoxes(numBox){
    container.style.gridTemplateColumns = `repeat(${numBox}, 1fr)`;
    for(let i = 0;i < numBox*numBox;i++){
        const square = document.createElement('div');
        square.classList.add('box');
        container.appendChild(square);
    }
}

createBoxes(4);