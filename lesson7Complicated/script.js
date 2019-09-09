let now = new Date(),
    fullYear = now.getFullYear(),
    month = now.getMonth(),
    date = now.getDate(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds(),
    today;

today = Zero(hours) + ':' + Zero(minutes) + ':' + Zero(seconds) + ' ' + Zero(date) + '.' + Zero(month) + '.' + fullYear;

function Zero(number) {
    if(number > 0 && number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}

document.write(today);

