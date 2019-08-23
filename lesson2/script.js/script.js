let money = 35000;
let income = 'фриланс';
let addExpenses = 'Коммунальные платежи, проезд, телефон';
let deposit = true;
let mission = 200000;
let period = 7;

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );
console.log( income.length );
console.log( 'За ' + period + ' месяцев ' + 
            ' заработать ' + mission + ' рублей');

let lowerCase = addExpenses.toLowerCase().split(', ');
console.log('lowerCase: ', lowerCase);

let budgetDay = parseInt(money / 30);
let budgetBalance = money % 30;
console.log('Дневной бюджет: ' + budgetDay + '\n' +
            'Остаток от бюджета: ' + budgetBalance);