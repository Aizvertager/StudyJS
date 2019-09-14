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
    expensesPlus = expenses.querySelector('button'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');    

function valid(item) {
    return (isNaN(item) || item === '' || item === null || item === 0);
}

function validStr(item) {
    return (!isNaN(item) || item === '' || item === null);
}

start.setAttribute('disabled', 'disabled');

class AppData {
    constructor() {
        this.income =  {};
        this.addIncome =  [];
        this.expenses =  {};
        this.addExpenses =  [];
        this.deposit =  false;
        this.percentDeposit =  0;    
        this.moneyDeposit =  0;    
        this.budget =  0;    
        this.budgetDay =  0;    
        this.budgetMonth =  0;    
        this.expensesMonth =  0;    
        this.incomeMonth =  0;        
    }

    start() {
        if(salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
        } 
    
        this.budget = +salaryAmount.value;
        this.getIncomes();
        this.getExpenses();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddIncomes();
        this.getAddExpenses();
        this.eventsListeners();
    
        this.showResult(); 
    }

    addIncomesBlock() {
        let cloneIncomeItems = incomesItems[0].cloneNode(true);
        incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomesItems = document.querySelectorAll('.income-items');

        if (incomesItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getIncomes() {
        let _this = this;
        incomesItems.forEach( (item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            _this.income[itemIncome] = cashIncome;
        });
    
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
    
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    getExpenses() {
        let _this = this;
        expensesItems.forEach( (item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
    
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getAddIncomes() {
        let _this = this;
        additionalIncomeItems.forEach( (item) => {
            let itemValue = item.value.trim();
            if (item !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItems.value.split(',');
        let _this = this;
        addExpenses.forEach( (item) => {
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(',');
        additionalIncomeValue.value = this.addIncome.join(',');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        let _this = this;
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * _this.budget;
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + 
                          (this.moneyDeposit * this.percentDeposit) / 12;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil( targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    }

    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcSavedMoney() {
        return this.budget * periodSelect.value;
    }

    eventsListeners() {
    
        let _this = this;
        start.addEventListener('click', _this.start.bind(_this));
        incomePlus.addEventListener('click', _this.addIncomesBlock);
        expensesPlus.addEventListener('click', _this.addExpensesBlock);
        periodSelect.addEventListener('input', function() {
            periodAmount.textContent = periodSelect.value;
        });
        salaryAmount.addEventListener('keyup', function() {
            if (salaryAmount.value !== '') {
                start.removeAttribute('disabled');
            }
        });
    
        start.addEventListener('click', function() {
            const dataLeft = document.querySelector('.data');
            let inputs = dataLeft.querySelectorAll('input[type="text"]');
            inputs.forEach( (item) => {
                item.setAttribute('disabled', 'disabled');
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
        });
        
        cancel.addEventListener('click', function(){
            const dataLeft = document.querySelector('.data');
            let inputs = dataLeft.querySelectorAll('input[type="text"]');
            const resultRigth = document.querySelector('.result');
            let inputsResult = resultRigth.querySelectorAll('input[type="text"]');
        
            inputs.forEach( (elem) => {
                elem.value = '';
                elem.removeAttribute('disabled');
                periodAmount.value = '0';
                periodAmount.textContent = periodAmount.value;
            });
        
            inputsResult.forEach( (elem) => {
                elem.value = '';
            });
            cancel.style.display = 'none';
            start.style.display = 'block';
        });
    
    }
}

// let AppData = function() {

//     this.income =  {};
//     this.addIncome =  [];
//     this.expenses =  {};
//     this.addExpenses =  [];
//     this.deposit =  false;
//     this.percentDeposit =  0;    
//     this.moneyDeposit =  0;    
//     this.budget =  0;    
//     this.budgetDay =  0;    
//     this.budgetMonth =  0;    
//     this.expensesMonth =  0;    
//     this.incomeMonth =  0;

// };

const appData = new AppData();

// AppData.prototype.start = function() {
//     if(salaryAmount.value === '') {
//         start.setAttribute('disabled', 'disabled');
//     } 

//     this.budget = +salaryAmount.value;
//     this.getIncomes();
//     this.getExpenses();
//     this.getInfoDeposit();
//     this.getExpensesMonth();
//     this.getBudget();
//     this.getAddIncomes();
//     this.getAddExpenses();
//     this.eventsListeners();

//     this.showResult();
// };

// AppData.prototype.addIncomesBlock = function() {
//     let cloneIncomeItems = incomesItems[0].cloneNode(true);
//     incomesItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
//     incomesItems = document.querySelectorAll('.income-items');

//     if (incomesItems.length === 3) {
//         incomePlus.style.display = 'none';
//     }
// };
    // AppData.prototype.addBlock = function(item, plus, classBlock) {
        
    //     let cloneExpensesItem = item.cloneNode(true);
    //     item.parentNode.insertBefore(cloneExpensesItem, plus);
    //     item = document.querySelectorAll(classBlock);
        
    //     if (item.length === 3) {
    //         plus.style.display = 'none';
    //     }
        
    // };
// AppData.prototype.getIncomes = function() {
//     let _this = this;
//     incomesItems.forEach( (item) => {
//         const itemIncome = item.querySelector('.income-title').value;
//         const cashIncome = item.querySelector('.income-amount').value;
//         _this.income[itemIncome] = cashIncome;
//     });

//     for(let key in this.income) {
//         this.incomeMonth += +this.income[key];
//     }
// };
// AppData.prototype.addExpensesBlock = function() {
//     let cloneExpensesItem = expensesItems[0].cloneNode(true);
//     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
//     expensesItems = document.querySelectorAll('.expenses-items');

//     if (expensesItems.length === 3) {
//         expensesPlus.style.display = 'none';
//     }
// };
// AppData.prototype.getExpenses = function() {
//     let _this = this;
//     expensesItems.forEach( (item) => {
//         const itemExpenses = item.querySelector('.expenses-title').value;
//         const cashExpenses = item.querySelector('.expenses-amount').value;

//         if (itemExpenses !== '' && cashExpenses !== '') {
//             _this.expenses[itemExpenses] = cashExpenses;
//         }
//     });
// };
// AppData.prototype.getAddIncomes = function() {
//     let _this = this;
//     additionalIncomeItems.forEach( (item) => {
//         let itemValue = item.value.trim();
//         if (item !== '') {
//             _this.addIncome.push(itemValue);
//         }
//     });
// };
// AppData.prototype.getAddExpenses = function() {
//     let addExpenses = additionalExpensesItems.value.split(',');
//     let _this = this;
//     addExpenses.forEach( (item) => {
//         item = item.trim();
//         if(item !== '') {
//             _this.addExpenses.push(item);
//         }
//     });
// };
// AppData.prototype.showResult = function() {
//     budgetMonthValue.value = this.budgetMonth;
//     budgetDayValue.value = this.budgetDay;
//     expensesMonthValue.value = this.expensesMonth;
//     additionalExpensesValue.value = this.addExpenses.join(',');
//     additionalIncomeValue.value = this.addIncome.join(',');
//     targetMonthValue.value = this.getTargetMonth();
//     incomePeriodValue.value = this.calcSavedMoney();
//     let _this = this;
//     periodSelect.addEventListener('input', function() {
//         incomePeriodValue.value = periodSelect.value * _this.budget;
//     });
// };
// AppData.prototype.getExpensesMonth = function() {
//     for (let key in this.expenses) {
//         this.expensesMonth += +this.expenses[key];
//     }
// };
// AppData.prototype.getBudget = function() {
//     this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;
//     this.budgetDay = Math.floor(this.budgetMonth / 30);
// };
// AppData.prototype.getTargetMonth = function() {
//     return Math.ceil( targetAmount.value / this.budgetMonth);
// };
// AppData.prototype.getStatusIncome = function() {
//     if (this.budgetDay > 800) {
//         return ('Высокий уровень дохода');
//     } else if (this.budgetDay > 300) {
//         return ('Средний уровень дохода');
//     } else if (this.budgetDay > 0) {
//         return ('Низкий уровень дохода');
//     } else {
//         return ('Что-то пошло не так');
//     }
// };
// AppData.prototype.getInfoDeposit = function() {
//     if(this.deposit) {
//         this.percentDeposit = depositPercent.value;
//         this.moneyDeposit = depositAmount.value;
//     }
// };
// AppData.prototype.calcSavedMoney = function() {
//     return this.budget * periodSelect.value;
// };
// AppData.prototype.eventsListeners = function() {

//     let _this = this;
//     start.addEventListener('click', _this.start.bind(_this));
//     incomePlus.addEventListener('click', _this.addBlock(incomesItems[0], incomePlus, '.income-items'));
//     expensesPlus.addEventListener('click', _this.addExpensesBlock);
//     periodSelect.addEventListener('input', function() {
//         periodAmount.textContent = periodSelect.value;
//     });
//     salaryAmount.addEventListener('keyup', function() {
//         if (salaryAmount.value !== '') {
//             start.removeAttribute('disabled');
//         }
//     });

//     start.addEventListener('click', function() {
//         const dataLeft = document.querySelector('.data');
//         let inputs = dataLeft.querySelectorAll('input[type="text"]');
//         inputs.forEach( (item) => {
//             item.setAttribute('disabled', 'disabled');
//         });
//         start.style.display = 'none';
//         cancel.style.display = 'block';
//     });
    
//     cancel.addEventListener('click', function(){
//         const dataLeft = document.querySelector('.data');
//         let inputs = dataLeft.querySelectorAll('input[type="text"]');
//         const resultRigth = document.querySelector('.result');
//         let inputsResult = resultRigth.querySelectorAll('input[type="text"]');
    
//         inputs.forEach( (elem) => {
//             elem.value = '';
//             elem.removeAttribute('disabled');
//             periodAmount.value = '0';
//             periodAmount.textContent = periodAmount.value;
//         });
    
//         inputsResult.forEach( (elem) => {
//             elem.value = '';
//         });
//         cancel.style.display = 'none';
//         start.style.display = 'block';
//     });

// };

checkmark.addEventListener('change', () => {
    if(checkmark.checked === true) {
        depositBank.style.display = 'inline';
        depositAmount.style.display = 'inline';
        appData.deposit = true;
        depositBank.addEventListener('change', function() {
            let selectIndex = this.options[this.selectedIndex].value;
            if(selectIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.disabled = false;
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        appData.deposit = false;
    }
});


appData.eventsListeners();










    














