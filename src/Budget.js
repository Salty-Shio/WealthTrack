class Budget {
    
    constructor() {
        this.categories = [];
        this.name = "";
    }

    // Add a new category to the budget
    addCategory(balance = "runningTotal", operator = "-", value = 0, envelope = "") {
        const newKey = this.categories.length > 0 ? this.categories[this.categories.length - 1].key + 1: 0;
        
        const category = {
            key: newKey,
            balance,
            operator,
            value,
            envelope,
            transactions: [], // List of transactions
        };

        this.categories.push(category);
        return category;
    }

    // Remove a category from the budget
    removeCategory(key) {
        this.categories = this.categories.filter((category) => category.key != key);
    }

    // Add a new transaction to a category
    addTransaction(categoryKey, date, name, direction, amount) {
        const category = this.categories.find((category) => category.key == categoryKey)

        const newKey = category.transactions > 0 ? category.transactions[category.transactions.length - 1].key + 1 : 0;
        const transaction = {
            key: newKey, 
            date,
            name,
            direction,
            amount,
        };
        
        category.transactions.push(transaction)
    }

    // Remove a transaction
    removeTransaction(categoryKey, transactionKey) {
        this.categories.find((category) => category.key == categoryKey)
            .transactions.filter((transaction) => transaction.key != transactionKey);
    }

    // Update the balance of a category based on transactions
    updateCategoryBalance(categoryKey) {
        const category = this.categories.find((category) => category.key == categoryKey)
        let balance = category.balance;

        category.transactions.forEach((transaction) => {
            if (transaction.direction === "Withdrawal") {
                balance -= transaction.amount;
            } else if (transaction.direction === "Deposit") {
                balance += transaction.amount;
            }
        });

        category.balance = balance;
    }

    // Get the overall remaining balance of the budget
    getOverallRemainingBalance() {
        let overallBalance = 0;

        this.categories.forEach((category) => {
            overallBalance += category.balance;
        });

        return overallBalance;
    }
}

export default Budget;