class Budget {
    
    constructor() {
        this.categories = [];
        this.total = {
            id: -1,
            balance: 0,
            transactions: [], // List of transactions
        };
    }

    // Add a new category to the budget
    addCategory(balance, operator, value, envelope) {
        const newId = this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1: 0;
        const category = {
            id: newId,
            balance,
            operator,
            value,
            envelope,
            transactions: [], // List of transactions
        };

        this.categories.push(category);
    }

    // Remove a category from the budget
    removeCategory(id) {
        this.categories = this.categories.filter((category) => category.id != id);
    }

    // Add a new transaction to a category
    addTransaction(categoryId, date, name, direction, amount) {
        const category = this.categories.find((category) => category.id == categoryId)

        const newId = category.transactions > 0 ? category.transactions[category.transactions.length - 1].id + 1 : 0;
        const transaction = {
            id: newId, 
            date,
            name,
            direction,
            amount,
        };
        
        category.transactions.push(transaction)
    }

    // Remove a transaction
    removeTransaction(categoryId, transactionId) {
        this.categories.find((category) => category.id == categoryId)
            .transactions.filter((transaction) => transaction.id != transactionId);
    }

    // Update the balance of a category based on transactions
    updateCategoryBalance(categoryId) {
        const category = this.categories.find((category) => category.id == categoryId)
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