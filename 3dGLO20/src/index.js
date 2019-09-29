'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import handlerPopUp from './modules/handlerPopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import showPhotos from './modules/showPhotos';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import inputsRegEx from './modules/inputsRegEx';


//timer
countTimer('30 September 2019');
//menu
toggleMenu();
//smoothScroll
smoothScroll();
//popup
handlerPopUp();
//tabs
tabs();
//слайдер
slider();
// смена фото в секции "команда"
showPhotos();
//калькулятор
calc(100);
//Формы отправки send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');
// реализация ввод с помощью регулярных выражении
inputsRegEx();    
