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
let showTypeOf = function(data) {
    console.log(typeof data);
};

showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);

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

// 9 задание, функции не должны выводить в консоль!!!
let getStatusIncome = function() {
    if (budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay < 800) {
        return ('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 300) {
        return ('Низкий уровень дохода');
    } else if (budgetDay < 0) {
        return ('Что-то пошло не так');
    } else {
        return ("Это не выполнится");
    }
};
console.log( getStatusIncome() );

// 1 задание
function getExpensesMonth() {
    return priceExpenses1 + priceExpenses2;
}
console.log('getExpensesMonth: ', getExpensesMonth() );

let accumulatedMonth = function getAccumulatedMonth() {
    return money - priceExpenses1 - priceExpenses2;
};
console.log('accumulatedMonth: ', accumulatedMonth() );

function getTargetMonth() {
    return Math.ceil( mission / accumulatedMonth() );
}
console.log('getTargetMonth: ', getTargetMonth() );


