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
    cancel = document.querySelector('#cancel'),
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
    
        this.budget = +salaryAmount.value;
        console.log(this);
        this.getIncomes();
        this.getExpenses();

        this.getExpensesMonth();
        this.getBudget();
        this.getAddIncomes();
        this.getAddExpenses();

        this.showResult();
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

        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
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
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(',');
        additionalIncomeValue.value = this.addIncome.join(',');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * appData.budget;
        });
    },
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil( targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function() {
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if(this.deposit) {
            do {
                this.percentDeposit = +prompt('Какой годовой процент', 5);
            } while (valid(this.percentDeposit));
            
            do {
                this.moneyDeposit = prompt('Какая сумма заложена', 10000);
            } while (valid(this.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return this.budget * periodSelect.value;
    }
};

start.addEventListener('click', appData.start.bind(appData));
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
    cancel.style.display = 'block';
});

cancel.addEventListener('click', function(){
    let dataLeft = document.querySelector('.data');
    let inputs = dataLeft.querySelectorAll('input[type="text"]');
    let resultRigth = document.querySelector('.result');
    let inputsResult = resultRigth.querySelectorAll('input[type="text"]');

    inputs.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodAmount.value = '0';
        periodAmount.textContent = periodAmount.value;
    });

    inputsResult.forEach(function(elem){
        elem.value = '';
    });
    cancel.style.display = 'none';
    start.style.display = 'block';
});




    














