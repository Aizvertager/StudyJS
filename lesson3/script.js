// 1 задание
let money = +prompt('Ваш месячный доход');
// 2 задание
let addExpenses = prompt('Перечислите возможные расходы за ' +  
' рассчитываемый период через запятую').split(', ');
// 3 задание
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 200000;
let period;
let budgetDay;

// 4 задание
console.log(typeof money);
console.log(typeof addExpenses);
console.log(typeof deposit);

// 5 задание
let nameExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let priceExpenses1 = +prompt('Во сколько это обойдется');
let nameExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let priceExpenses2 = +prompt('Во сколько это обойдется');

// 6 задание
let budgetMonth = money - priceExpenses1 - priceExpenses2;
console.log('budgetMonth: ', budgetMonth);

// 7 задание
period = Math.ceil( mission / budgetMonth );
console.log('period: ', period);

// 8 задание
budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

// 9 задание
if (budgetDay > 800) {
    alert('Высокий уровень дохода');
} else if (budgetDay > 300 && budgetDay < 800) {
    alert('Средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 300) {
    alert('Низкий уровень дохода');
} else if (budgetDay < 0) {
    alert('Что-то пошло не так');
} else {
    alert("Это не выполнится");
}
