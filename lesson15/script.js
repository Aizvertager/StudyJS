window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return{ timeRemaining, hours, minutes, seconds};
        }

        let timer = getTimeRemaining();

        function updateClock() {
            
            timerHours.textContent = Zero(timer.hours);
            timerMinutes.textContent = Zero(timer.minutes);
            timerSeconds.textContent = Zero(timer.seconds);

            if(timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } 

        }

        function Zero(number) {
            if(number > 0 && number < 10) {
                return '0' + number;
            } else {
                return number;
            }
        }

        setTimeout(updateClock, 1000);

    }
    
    setInterval(countTimer, 1000, '18 September 2019');

    //menu
    const toggleMenu = () => {

        let menuBtn = document.querySelector('.menu'),
            menuDiv = document.querySelector('menu'),
            body = document.querySelector('body');

        menuBtn.addEventListener('click', () => {
            menuDiv.classList.toggle('active-menu');
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

    toggleMenu();

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
    };

    handlerPopUp();

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
    
    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');
              
        tabHeader.addEventListener('click', (e) => {
            let target = e.target;
            target = target.closest('.service-header-tab');
            if(target) {
                tab.forEach((item, i) => {
                    if(item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
              
    }; 

    tabs();
    
    //слайдер

    const slider = () => {

        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        for (let i = 0; i < slide.length; i++) {
            let num = document.createElement('li');
            num.classList.add('dot');
            dots.appendChild(num);
        }

        let dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            } 

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            if (e.target.matches('.portfolio-btn') ||
                e.target.matches('.dot')) {
                    stopSlide();
                }
        });

        slider.addEventListener('mouseout', (e) => {
            if (e.target.matches('.portfolio-btn') ||
                e.target.matches('.dot')) {
                    startSlide();
                }
        });

        startSlide(1500);

    };

    slider();
      
 });

