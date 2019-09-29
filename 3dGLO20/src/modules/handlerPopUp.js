//popup 
const handlerPopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn');
    
    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    popup.addEventListener('click', (e) => {
        let target = e.target;

        if(target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
        
            if(!target) {
                popup.style.display = 'none';
            }
        }

    });

    let start = 0,
    pops = document.querySelectorAll('.popup-btn'),
    element = document.querySelector('.popup');
    

    function step() {
        start += 0.02;
        element.style.opacity = start;
        if(start < 1.05) {
            requestAnimationFrame(step);
        } 
    }

    pops.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (screen.width < 768) {
                cancelAnimationFrame(step);
                element.style.display = 'block';
            } else {
                requestAnimationFrame(step);
                start = 0;
            }
        });
    });
};

export default handlerPopUp;

