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
    const body = document.querySelector('body'),
        menuDiv = document.querySelector('menu');

    const toggleMenu = () => {

        let menuBtn = document.querySelector('.menu');

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

    // смена фото в секции "команда"
    const photo = document.querySelectorAll('.command__photo');
    let prevPhoto = [];

    photo.forEach((elem, index) => {
        prevPhoto.push( elem.getAttribute('src') );

        elem.addEventListener('mouseenter', (e) => {
            e.target.src = e.target.dataset.img;
        });
        
        elem.addEventListener('mouseleave', (e) => {
            
            for (let i = 0; i < prevPhoto.length; i++) {
                if(index === i) {
                    e.target.src = prevPhoto[i];
                }
            }

        });
    });

    //ввод только цифр в калькуляторе
    let inputs = document.querySelectorAll('.calc-item');

    inputs.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/^[+-]?\D/g, '');
        });
    });

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay && calcDay.value < 10) {
                dayValue *= 1.5;
            } 

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } 

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (e) => {
            let target = e.target;
            
            if(target.matches('.calc-type') || target.matches('.calc-square') ||
               target.matches('.calc-day') || target.matches('.calc-count')) {
                   countSum();
               }
        });
    };
      
    calc(100);

    //Формы отправки send-ajax-form

    const sendFrom = (idForm) => {

        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById(idForm);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 24px; color: white;`;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            //Создаем объект для AJAX
            let body = {};
            //Перебираем ключ/значение в formData
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body, 
                () => {
                    statusMessage.textContent = successMessage;
                }, 
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                },
                () => {
                    form.reset();
                }
            );
        });
        
        const postData = (body, outputData, errorData, clearForm) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if(request.readyState !== 4) {
                    return;
                } 

                if(request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');

            // Отправляем в form-data
            // request.setRequestHeader('Content-Type', 'multipart/form-data');
            
            // Отправляем в JSON
            request.setRequestHeader('Content-Type', 'application/json');
            // Отправка body
            request.send(JSON.stringify(body));
            clearForm();
        };

    };

    sendFrom('form1');
    sendFrom('form2');
    sendFrom('form3');

    const inputNumbers = document.querySelectorAll('input[type = tel]'),
        inputTexts = document.querySelectorAll('input[type = text]');

    inputNumbers.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^0-9\+]/, '');
        });
    });

    inputTexts.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
        });
    });

 });

