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
    let menuBtn = document.querySelector('.menu'),
        menuDiv = document.querySelector('menu'),
        menuItems = menuDiv.querySelectorAll('ul>li'),
        nextBtnSlide = document.querySelector('a[href="#service-block"]'),
        serviceBlock = document.querySelector('#service-block'),
        closeBtn = document.querySelector('.close-btn');
        

    const handlerMenu = () => {
        menuDiv.classList.toggle('active-menu');
    };

    menuBtn.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    
    menuItems.forEach((elem) => {
        elem.addEventListener('click', handlerMenu);
        let liLink = elem.querySelector('a[href*="#"]');
        liLink.addEventListener('click', (e) => {
            e.preventDefault();
            let liId = liLink.getAttribute('href');
            document.querySelector('' + liId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

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
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupClose = document.querySelector('.popup-close');
        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });
 
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    handlerPopUp();

    let start = 0,
        pops = document.querySelectorAll('.popup-btn'),
        element = document.querySelector('.popup');
        element.style.opacity = 0;

    function step() {
        start += 0.02;
        element.style.opacity = start;
        if(start < 1.05) {
            requestAnimationFrame(step);
        }
      }

      pops.forEach((elem) => {
        elem.addEventListener('click', () => {
            requestAnimationFrame(step);
        });
      });
      
      
 });

