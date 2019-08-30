// 1 задание
let money;
// 2 задание
let addExpenses = prompt('Перечислите возможные расходы за ' +  
' рассчитываемый период через запятую').split(', ');
// 3 задание
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 200000;
let period;
let budgetDay;

function start() {
    do {
        money = +prompt('Ваш месячный доход', '500');
        console.log('money: ', money);
    } while (isNaN(money) || money === ' ' || money === 0);
}
start();

// 4 задание
let showTypeOf = function(data) {
    console.log(typeof data);
};

showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);

// 5 задание
let priceExpenses1,
    priceExpenses2,
    nameExpenses1,
    nameExpenses2;

// 1 задание
function getExpensesMonth() {
    let sum = 0;

    for( let i = 0; i < 2; i++ ) {
        if (i === 0) {
            nameExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
        }
        if (i === 1) {
            nameExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
        }
        
        do {
            sum += +prompt('Во сколько это обойдется');
            console.log('sum: ', sum);
        } while (isNaN(sum) || sum === ' ' || sum === 0);

    }

    return sum;
}
let expensesMonth = getExpensesMonth();
console.log('expensesMonth: ', expensesMonth);

// 6 задание
let budgetMonth = money - expensesMonth;
console.log('budgetMonth: ', budgetMonth);

// 7 задание
period = Math.ceil( mission / budgetMonth );
console.log('period: ', period);

// 8 задание
budgetDay = Math.floor(budgetMonth / 30);

if (budgetDay < 0) {
    alert('Что-то пошло не так');
}

console.log('budgetDay: ', budgetDay);

// 9 задание, функции не должны выводить в консоль!!!
let getStatusIncome = function() {
    if (budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay < 800) {
        return ('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 300) {
        return ('Низкий уровень дохода');
    } else {
        return ("Это не выполнится");
    }
};
console.log( getStatusIncome() );


let accumulatedMonth = function getAccumulatedMonth() {
    return money - expensesMonth;
};
console.log('accumulatedMonth: ', accumulatedMonth() );

function getTargetMonth() {
    return Math.ceil( mission / accumulatedMonth() );
}

if ( getTargetMonth() < 0 ) {
    alert('Цель не будет достигнута');
}

console.log('getTargetMonth: ', getTargetMonth() );


