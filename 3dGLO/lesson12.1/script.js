window.addEventListener('DOMContentLoaded', () => {
    
    function countTime() {
        let hello = document.querySelector('.hello'),
        day = document.querySelector('.day'),
        nowTime = document.querySelector('.nowTime'),
        NYDay = document.querySelector('.NYDay');

        function getWeekDay(day) {
            let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
                      'Четверг', 'Пятница', 'Суббота'];
            return days[day.getDay()];
        }

        function time() {
            let now = new Date(),
            newYear = new Date('1 January 2020'),        
            timeRemaining = (newYear - now) / 1000,
            days = Math.floor(timeRemaining / 60 / 60 / 24),
            hours = now.getHours(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds(),
            prepand = (hours >= 12)? " PM ":" AM ";
            hours = (hours >= 12)? hours - 12: hours;
            return {hours, minutes, seconds, now, days, prepand};
        }

        let timer = time();

        function showTime() {
            nowTime.textContent = `${Zero(timer.hours)}:${Zero(timer.minutes)}:
                                   ${Zero(timer.seconds)} ${timer.prepand}`;
           
            if (timer.hours >= 5 && timer.hours < 12) {
                hello.textContent = `Доброе утро`;
            } else if (timer.hours >= 12 && timer.hours < 18) {
                hello.textContent = `Доброый день`;
            } else if (timer.hours >= 18 && timer.hours < 24) {
                hello.textContent = `Добрый вечер`;
            } else if (timer.hours >= 24 && timer.hours < 5) {
                hello.textContent = `Доброй ночи`;
            }
            
            day.textContent = `Сегодня: ${getWeekDay(timer.now)}`;  
            NYDay.textContent = `До нового года осталось ${timer.days} дней`;
  
        }

        function Zero(number) {
            if(number > 0 && number < 10) {
                return '0' + number;
            } else {
                return number;
            }
        }

        setTimeout(showTime, 1000);

    }
    setInterval(countTime, 1000);
 
});