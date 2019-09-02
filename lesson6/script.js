let money;

function start() {
    do {
        money = +prompt('Ваш месячный доход', '5000');
    } while (valid(money));
}

start();

function valid(item) {
    return (isNaN(item) || item === '' || item === null || item === 0);
}

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 200000,
    period: 7,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за ' +  
        ' рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for( let i = 0; i < 2; i++ ) {
            let nameExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            let priceExpenses;
            do {
                priceExpenses = +prompt('Во сколько это обойдется', '500');
            } while (valid(priceExpenses));
        
            appData.expenses[nameExpenses] = priceExpenses;
        }    
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil( appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц составили: ' + appData.expensesMonth);

appData.getTargetMonth();
console.log('За ' + appData.getTargetMonth() + ' месяцев будет достигнута цель');

if ( appData.getTargetMonth() > 0 ) {
    alert('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
} else {
    alert('Цель не будет достигнута');
}

appData.getStatusIncome();
console.log( appData.getStatusIncome() );

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key);
}














