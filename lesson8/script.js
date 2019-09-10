let start = document.querySelector('#start'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomesItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItems = document.querySelector('.additional_expenses-item'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    targetAmount = document.querySelector('.target-amount'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodSelect = document.querySelector('.period-select'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    periodAmount = document.querySelector('.period-amount'),
    checkmark = document.querySelector('#deposit-check'),
    income = document.querySelector('.income'),
    incomePlus = income.querySelector('button'),
    expenses = document.querySelector('.expenses'),
    expensesPlus = expenses.querySelector('button');    

function valid(item) {
    return (isNaN(item) || item === '' || item === null || item === 0);
}

function validStr(item) {
    return (!isNaN(item) || item === '' || item === null);
}

start.setAttribute('disabled', 'disabled');

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start: function() {
        if(salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
        } 
    
        appData.budget = +salaryAmount.value;

        appData.getIncomes();
        appData.getExpenses();

        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddIncomes();
        appData.getAddExpenses();

        appData.showResult();
    },
    addIncomesBlock: function() {
        let cloneIncomeItems = incomesItems[0].cloneNode(true);
        incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomesItems = document.querySelectorAll('.income-items');

        if (incomesItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getIncomes: function() {
        incomesItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            appData.income[itemIncome] = cashIncome;
        });

        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddIncomes: function() {
        additionalIncomeItems.forEach(function(item) {
            let itemValue = item.value.trim();
            if (item !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItems.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(',');
        additionalIncomeValue.value = appData.addIncome.join(',');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * appData.budget;
        });
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil( targetAmount.value / appData.budgetMonth);
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
        return appData.budget * periodSelect.value;
    }
};

start.addEventListener('click', appData.start);
incomePlus.addEventListener('click', appData.addIncomesBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});
salaryAmount.addEventListener('keyup', function() {
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
});

start.addEventListener('click', function() {
    let dataLeft = document.querySelector('.data');
    let inputs = dataLeft.querySelectorAll('input[type="text"]');
    inputs.forEach(function(item){
        item.setAttribute('disabled', 'disabled');
    });
    start.style.display = 'none';
    let cancel = document.querySelector('#cancel');
    cancel.style.display = 'block';
});


    














