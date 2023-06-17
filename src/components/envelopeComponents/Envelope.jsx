import React, { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";
import TransactionItem from './TransactionItem';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const formattedDate = (inputDate) => {
    return `${inputDate.getMonth()}/${inputDate.getDate()}/${inputDate.getYear()}`;
}

function convertToDate(dateString) {
    const parts = dateString.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;  // Months are zero-based (0-11)
    const year = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
}

const Envelope = ({ category, updateFlag, setUpdateFlag }) => {
    const [budget, setBudget] = useAtom(budgetAtom);
    const [addingTransaction, setAddingTransaction] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0)
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [transferType, setTransferType] = useState("withdrawal");
    const [amount, setAmount] = useState("");
    

    const loadTransactionToFields = (transactionId) => {
        const transaction = budget.getTransaction(category.id, transactionId);
        setAmount(transaction.amount);
        setName(transaction.name);
        setDate(convertToDate(transaction.date));
        setTransferType(transaction.transfer);
    }

    const resetFields = () => {
        setName("");
        setDate(new Date());
        setTransferType("withdrawal");
        setAmount(0);
    }
    
    useEffect(() => {
        setRemainingBalance((prevBalance) => budget.calculateCategoryRemainingBalance(category.id));
        setBudget((prevBudget) => budget);
        const loadedTransactions = category.transactions.map((transaction, key) =>
            <TransactionItem key={key} transaction={transaction} editTransaction={handleStartEditTransaction} removeTransaction={handleRemoveTransaction} />
        );
        setTransactions(loadedTransactions);
        // setUpdateFlag(Symbol()); // <-------
    }, [updateFlag])

    // useEffect(() => {
    //     console.log("Refreshing!");
    //     return;
    // }, [updateFlag])
    
    /**
     * @description adds a transaction to an envelope
     * @param {string} date
     * @param {string} name
     * @param {string} transferType
     * @param {number} amount
     */
    const handleAddTransaction = (date, name, transferType, amount) => {
        budget.addTransaction(category.id, formattedDate(date), name, transferType, parseFloat(parseFloat(amount).toFixed(2)));
        const calculatedRemaining = budget.calculateCategoryRemainingBalance(category.id);
        setRemainingBalance(calculatedRemaining);
        setBudget((prevBudget) => budget);
        console.log(budget)
        const loadedTransactions = category.transactions.map((transaction, key) => 
            <TransactionItem key={key} transaction={transaction} editTransaction={handleStartEditTransaction} removeTransaction={handleRemoveTransaction} />
        );
        setTransactions(loadedTransactions);
        setUpdateFlag(Symbol());
    }

    const handleStartEditTransaction = (transactionId) => {
        loadTransactionToFields(transactionId);
        setEditingTransaction(transactionId);
    }

    const handleEditTransaction = (transactionId, date, name, transferType, amount) => {
        console.log(transactionId, date, name, transferType, amount);
        budget.updateTransaction(category.id, transactionId, "date", formattedDate(date))
        budget.updateTransaction(category.id, transactionId, "name", name)
        budget.updateTransaction(category.id, transactionId, "transfer", transferType)
        budget.updateTransaction(category.id, transactionId, "amount", parseFloat(parseFloat(amount).toFixed(2)))
        setUpdateFlag(Symbol());
    }

    const handleRemoveTransaction = (transactionId) => {
        budget.removeTransaction(category.id, transactionId);
        setBudget((prevBudget) => budget);
        const calculatedRemaining = budget.calculateCategoryRemainingBalance(category.id);
        setRemainingBalance(calculatedRemaining);
        const loadedTransactions = category.transactions.map((transaction, key) =>
            <TransactionItem key={key} transaction={transaction} editTransaction={handleStartEditTransaction} removeTransaction={handleRemoveTransaction} />
        );
        setTransactions(loadedTransactions);
        setUpdateFlag(Symbol());
    }

    return(
        <li className='envelope'>
            <div className='envelopeHead'>
                <h3>{category.envelope}</h3>
                <h3>Allotted Amount: ${category.totalBalance}</h3>
                <h3>Remaining: ${remainingBalance}</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction Name</th>
                        <th>Transfer</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions}
                </tbody>
            </table>
            {!(addingTransaction || (editingTransaction > 0)) && <button onClick={() => {setAddingTransaction(true)}}>Add Transaction</button>}
            {(addingTransaction || (editingTransaction > 0)) && 
                <div className='transactionForm'>
                    <label>Date</label>
                    <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} placeholderText='Select a date' />

                    <label>Transaction Name</label>
                    <input
                        type="text"
                        id="transactionName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Transaction Name"
                    />

                    <label>Transfer</label>
                    <select id="transferType" value={transferType} onChange={(e) => setTransferType(e.target.value)}>
                        <option value="withdrawal">Withdrawal</option>
                        <option value="deposit">Deposit</option>
                    </select>

                    <label>Amount</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={(e) => {
                            const regexFloat = /^\d+(\.\d*)?$/; // tests if the value is a float
                            if (regexFloat.test(e.target.value) || e.target.value.length == 0) {
                                setAmount(e.target.value)
                            }
                        }}
                        placeholder="Transaction Amount"
                    />

                    <div className='buttonContainer'>
                    <button 
                    onClick={() => {
                        resetFields();
                        setAddingTransaction(false);
                        setEditingTransaction(0);
                    }}
                    >Cancel</button>

                    <button
                        disabled={name.length < 1 || amount == "0"}
                        onClick={() => {
                            if (addingTransaction) {
                                handleAddTransaction(date, name, transferType, amount)
                            } else {
                                handleEditTransaction(editingTransaction, date, name, transferType, amount)
                            }
                            resetFields();
                            setAddingTransaction(false);
                            setEditingTransaction(0);
                        }}
                        >Save Transaction</button>
                        </div>
                </div>
            }
            
        </li>
    )
};

export default Envelope;