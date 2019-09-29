const smoothScroll = () => {
    let nextBtnSlide = document.querySelector('a[href="#service-block"]'),
        serviceBlock = document.querySelector('#service-block');

    //Плавный скролл
    nextBtnSlide.addEventListener('click', (e) => {
        e.preventDefault();
        serviceBlock.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

export default smoothScroll;