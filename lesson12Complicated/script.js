let block = document.querySelector('.block'),
    start = document.querySelector('#start'),
    reset = document.querySelector('#reset'),
    count = 0,
    moveInterval;

let moveAnimate = function() {
    moveInterval = requestAnimationFrame(moveAnimate);
    count++;
    if(count < 1000) {
        block.style.left = count + 'px';
    } else {
        cancelAnimationFrame(count);
    }
};

function eventListener() {
    start.addEventListener('click', () => {
        moveInterval = requestAnimationFrame(moveAnimate);
    });
    
    reset.addEventListener('click', () => {
        block.style.left = 0;
    });
}

eventListener();


