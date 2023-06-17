class Budget {
    
    constructor() {
        this.categories = [];
        this.total = {
            id: -1,
            balance: 0,
        };
    }
    
    // Add a new category to the budget
    addCategory(balanceType, operator, value, envelope, totalBalance = 0, remainingBalance = 0) {
        const newId = this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1: 0;
        const category = {
            id: newId,
            totalBalance,
            remainingBalance,
            balanceType,
            operator,
            value,
            envelope,
            transactions: [], // List of transactions
        };

        this.categories.push(category);
    }

    // Get the specified category
    getCategory(id) {
        return this.categories.filter((category) => category.id === id)[0];
    }

    // Update a category value
    updateCategoryAttribute(categoryId, attribute, value) {
        const category = this.categories.find((category) => category.id === categoryId);
        if (category) {
            category[attribute] = value;
        }
    }

    // Remove a category from the budget
    removeCategory(id) {
        this.categories = this.categories.filter((category) => category.id != id);
    }

    // Add a new transaction to a category
    addTransaction(categoryId, date, name, transfer, amount) {
        const category = this.categories.find((category) => category.id === categoryId)

        const newId = category.transactions.length > 0 ? category.transactions[category.transactions.length - 1].id + 1 : 1;
        const transaction = {
            key: newKey, 
            date,
            name,
            transfer,
            amount,
        };
        
        category.transactions.push(transaction)
    }

    // Remove a transaction from a category
    removeTransaction(categoryId, transactionId) {
        const category = this.categories.find((category) => category.id == categoryId);
        category.transactions = category.transactions.filter((transaction) => transaction.id != transactionId);
    }

    // Update a transactions value
    updateTransaction(categoryId, transactionId, attribute, value) {
        const category = this.categories.find((category) => category.id === categoryId);
        if (!category) {
            console.log("Could not find category");
            return;
        }
        const transaction = category.transactions.find((transaction) => transaction.id === transactionId)
        if (transaction) {
            transaction[attribute] = value;
        }
    }
    
    // Get a transaction from a category.
    getTransaction(categoryId, transactionId) {
        const category = this.categories.find((category) => category.id === categoryId);
        
        if (!category) {
            console.log("Could not find category");
            return;
        }

        return category.transactions.find((transaction) => transaction.id === transactionId);
    }

    // Updates all category totals.
    calculateCategoryTotals() {
        let originalTotal = parseFloat(this.total.balance);
        let remainingTotal = parseFloat(this.total.balance);
        
        for (const category of this.categories) {
            let categoryBalance = 0;
            if (category.operator === "-") {
                categoryBalance = parseFloat(category.value);
            } else {
                if (category.balance === "totalBudget") {
                    categoryBalance = originalTotal * (category.value / 100);
                } else {
                    categoryBalance = remainingTotal * (category.value / 100);
                }
            }
            remainingTotal -= categoryBalance;
            category.totalBalance = categoryBalance;
        }
    }

    // Update the balance of a category based on transactions
    calculateCategoryRemainingBalance(categoryId) {
        const category = this.categories.find((category) => category.id == categoryId)
        let remainingBalance = category.totalBalance;
        console.log(`Number of category transactions: ${category.transactions.length}`);
        category.transactions.forEach((transaction) => {
            if (transaction.transfer === "withdrawal") {
                remainingBalance -= transaction.amount;
            } else if (transaction.transfer === "deposit") {
                remainingBalance += transaction.amount;
            }
        });

        category.remainingBalance = remainingBalance;
        return remainingBalance;
    }

    // Get the overall remaining balance of the budget
    calculateOverallRemainingBalance() {
        let overallBalance = this.total.balance;
        for (const category of this.categories) {
            const categoryExpendedBalance = category.totalBalance - category.remainingBalance;
            overallBalance -= categoryExpendedBalance;
        }

        return overallBalance;
    }
    // Get the overall remaining balance of the budget
    calculateUnallottedMoney() {
        let overallBalance = this.total.balance;
        for (const category of this.categories) {
            const allottedMoney = category.totalBalance;
            overallBalance -= allottedMoney;
        }
        return overallBalance;
    }
}

export default Budget;