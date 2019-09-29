const inputsRegEx = () => {
    //ввод только цифр в калькуляторе
    let inputs = document.querySelectorAll('.calc-item');

    inputs.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/^[+-]?\D/g, '');
        });
    });

    const inputNumbers = document.querySelectorAll('input[type = tel]'),
        inputTexts = document.querySelectorAll('input[type = text]');
    //Только цифры и "+"
    inputNumbers.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^0-9\+]/, '');
        });
    });
    //Только кириллица и ?
    inputTexts.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
        });
    });
};

export default inputsRegEx;