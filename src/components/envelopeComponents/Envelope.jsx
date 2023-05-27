import React from "react";

import React, { useState } from 'react';

const Envelope = ({ categoryName, budgetAmount }) => {
    const [remainingBalance, setRemainingBalance] = useState(budgetAmount);
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        name: '',
        type: '',
        amount: '',
    });

    const handleTransactionAdd = () => {
        setTransactions([...transactions, newTransaction]);
        setNewTransaction({ date: '', name: '', type: '', amount: '' });

        // Update remaining balance based on the new transaction amount
        const transactionAmount = parseFloat(newTransaction.amount);
        const updatedRemainingBalance =
            newTransaction.type === 'withdrawal'
                ? remainingBalance - transactionAmount
                : remainingBalance + transactionAmount;
        setRemainingBalance(updatedRemainingBalance);
    };

    const handleTransactionEdit = (index, updatedTransaction) => {
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = updatedTransaction;
        setTransactions(updatedTransactions);
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
        <li>
            <h3>{categoryName}</h3>
            <p>Remaining Balance: {remainingBalance}</p>

            <button onClick={handleTransactionAdd}>Add Transaction</button>

            {transactions.length > 0 && (
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            <p>Date: {transaction.date}</p>
                            <p>Name: {transaction.name}</p>
                            <p>Type: {transaction.type}</p>
                            <p>Amount: {transaction.amount}</p>

                            <button
                                onClick={() => handleTransactionEdit(index, transaction)}
                            >
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

            {/* New Transaction Form */}
            <form onSubmit={handleTransactionAdd}>
                <input
                    type="text"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleNewTransactionChange}
                    placeholder="Date"
                />
                <input
                    type="text"
                    name="name"
                    value={newTransaction.name}
                    onChange={handleNewTransactionChange}
                    placeholder="Transaction Name"
                />
                <select
                    name="type"
                    value={newTransaction.type}
                    onChange={handleNewTransactionChange}
                >
                    <option value="">Select Type</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="deposit">Deposit</option>
                </select>
                <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleNewTransactionChange}
                    placeholder="Amount"
                />
                <button type="submit">Save Transaction</button>
            </form>
        </li>
    );
};

export default Envelope;