import React, { useState } from 'react';

const Envelope = ({ categoryName, budgetAmount }) => {
    const [remainingBalance, setRemainingBalance] = useState(budgetAmount);
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleTransactionAdd = () => {
        setTransactions([...transactions, newTransaction]);
        setNewTransaction(null);
        setIsEditing(false);

        // Update remaining balance based on the new transaction amount
        const transactionAmount = parseFloat(newTransaction.amount);
        const updatedRemainingBalance =
            newTransaction.type === 'withdrawal'
                ? remainingBalance - transactionAmount
                : remainingBalance + transactionAmount;
        setRemainingBalance(updatedRemainingBalance);
    };

    const handleTransactionEdit = (transaction) => {
        setNewTransaction(transaction);
        setIsEditing(true);
    };

    const handleTransactionDelete = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        setTransactions(updatedTransactions);
    };

    const handleNewTransactionChange = (event) => {
        const { name, value } = event.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    return (
        <li className='envelope'>
            <h3>{categoryName}</h3>
            <p>Remaining Balance: {remainingBalance}</p>

            {isEditing || newTransaction ? (
                <form onSubmit={handleTransactionAdd}>
                    <input
                        type="text"
                        name="date"
                        value={newTransaction ? newTransaction.date : ''}
                        onChange={handleNewTransactionChange}
                        placeholder="Date"
                    />
                    <input
                        type="text"
                        name="name"
                        value={newTransaction ? newTransaction.name : ''}
                        onChange={handleNewTransactionChange}
                        placeholder="Transaction Name"
                        required
                    />
                    <select
                        name="type"
                        value={newTransaction ? newTransaction.type : ''}
                        onChange={handleNewTransactionChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="withdrawal">Withdrawal</option>
                        <option value="deposit">Deposit</option>
                    </select>
                    <input
                        type="number"
                        name="amount"
                        value={newTransaction ? newTransaction.amount : ''}
                        onChange={handleNewTransactionChange}
                        placeholder="Amount"
                        required
                    />
                    <button type="submit">Save Transaction</button>
                </form>
            ) : (
            <>
            <button onClick={() => setIsEditing(true)}>Add Transaction</button>
            {transactions.length > 0 && (
                <ul className="transactions">
                    {transactions.map((transaction, index) => (
                        <li className="transaction" key={index}>
                            <p>Date: {transaction.date}</p>
                            <p>Name: {transaction.name}</p>
                            <p>Type: {transaction.type}</p>
                            <p>Amount: {transaction.amount}</p>

                            <button onClick={() => handleTransactionEdit(transaction)}>
                                Edit Transaction
                            </button>
                            <button onClick={() => handleTransactionDelete(index)}>
                                Delete Transaction
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {transactions.length === 0 && <p>No transactions found.</p>}
        </>
        )}
        </li>
    );
};

export default Envelope;