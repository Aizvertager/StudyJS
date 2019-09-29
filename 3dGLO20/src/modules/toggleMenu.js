//menu
const toggleMenu = () => {
    
const menuDiv = document.querySelector('menu');

document.addEventListener('click', (e) => {
    let target = e.target;
    if(target.closest('.menu')) {
        menuDiv.classList.toggle('active-menu');
    } else if (!target.closest('menu')) {
        menuDiv.classList.remove('active-menu');
    }
});

menuDiv.addEventListener('click', (e) => {
    let target = e.target;
    
    if(target.classList.contains('close-btn')) {
        menuDiv.classList.toggle('active-menu');
    } else if (target.closest('ul>li')) {

        menuDiv.classList.toggle('active-menu');
        e.preventDefault();
        target = target.closest('a[href*="#"]');
        let liId = target.getAttribute('href'),
            divElement = document.querySelector('' + liId);
        //Плавный скролл
        divElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }
        
});

};

export default toggleMenu;