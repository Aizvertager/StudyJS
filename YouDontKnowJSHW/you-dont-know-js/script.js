let books = document.querySelector('.books');
let book = document.querySelectorAll('.book');

books.insertBefore(book[1], book[0]);
books.insertBefore(book[4], book[3]);
books.insertBefore(book[2], book[6]);

let background = document.querySelector('body');
background.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

let header = document.getElementsByTagName('h2');
header[2].textContent = 'Книга 3. this и Прототипы Объекты';

let advertisement = document.querySelector('.adv');
advertisement.remove();

let bookFive = book[5].querySelector('ul');
let bookFiveLi = bookFive.querySelectorAll('li');

bookFive.insertBefore(bookFiveLi[9], bookFiveLi[2]);
bookFive.insertBefore(bookFiveLi[2], bookFiveLi[5]);
bookFive.insertBefore(bookFiveLi[6], bookFiveLi[5]);
bookFive.insertBefore(bookFiveLi[7], bookFiveLi[5]);

let bookSecond = book[0].querySelector('ul');
let bookSecondLi = bookSecond.querySelectorAll('li');

bookSecond.insertBefore(bookSecondLi[6], bookSecondLi[4]);
bookSecond.insertBefore(bookSecondLi[8], bookSecondLi[4]);
bookSecond.insertBefore(bookSecondLi[2], bookSecondLi[9]);
bookSecond.insertBefore(bookSecondLi[9], bookSecondLi[2]);

let bookSixth = book[2].querySelector('ul');
let bookSixthLi = bookSixth.querySelectorAll('li');
let newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';
bookSixth.appendChild(newLi);
console.log(bookSixthLi);

bookSixth.insertBefore(bookSixthLi[9], bookSixthLi[10]);
