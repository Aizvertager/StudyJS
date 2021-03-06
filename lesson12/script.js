window.addEventListener('DOMContentLoaded', () => {
    'use strict';

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
    
    setInterval(countTimer, 1000, '16 September 2019');
    
});

