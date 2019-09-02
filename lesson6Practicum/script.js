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

function validStr(item) {
    return (!isNaN(item) || item === '' || item === null);
}

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 7,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let nameIncome;
            do {
                nameIncome = prompt('Какой у вас дополнительный заработок', 'Фриланс');
            } while (validStr(nameIncome));

            let cashIncome;
            do {
                cashIncome = +prompt('Сколько вы получаете в месяц', 10000);
            } while (valid(cashIncome));

            appData.income[nameIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за ' +  
        ' рассчитываемый период через запятую', 'Кварплата, бензин, продукты');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for( let i = 0; i < 2; i++ ) {
            let nameExpenses;
            do {
                nameExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            } while (validStr(nameExpenses));
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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент', 5);
            } while (valid(appData.percentDeposit));
            
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
            } while (valid(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budget * appData.period;
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
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

// for(let key in appData.addExpenses){
//     console.log(appData.addExpenses[key].charAt(0).toUpperCase());
// }

let arr = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
    appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].slice(1);
    arr.push(appData.addExpenses[i]);
    console.log('arr: ', arr);
}
console.log(arr.join(', '));
    
    













