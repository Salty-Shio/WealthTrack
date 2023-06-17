import React from "react";

const capitalize = (inputString) => {
  return `${inputString[0].toUpperCase()}${inputString.slice(1)}`
}


const TransactionItem = ({ transaction, editTransaction, removeTransaction }) => {
    return (
      <tr>
        <td>{transaction.date}</td>
        <td>{transaction.name}</td>
        <td>{capitalize(transaction.transfer)}</td>
        <td>${transaction.amount.toFixed(2)}</td>
        <td><button onClick={() => {console.log(`Transaction ID: ${transaction.id}`); editTransaction(transaction.id)}}>Edit Transaction</button></td>
        <td><button onClick={() => removeTransaction(transaction.id)}>Remove Transaction</button></td>
      </tr>
    )
}

export default TransactionItem;

