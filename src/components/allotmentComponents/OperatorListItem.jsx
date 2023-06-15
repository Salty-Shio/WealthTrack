import React, { useState, useEffect } from "react";

const OperatorListItem = ( budget, category = {}) => {

    const [balance, setBalance] = useState(category?.balance || 'runningTotal');
    const [operator, setOperator] = useState(category?.operator || '-');
    const [value, setValue] = useState(category?.value || '');
    const [envelope, setEnvelope] = useState(category?.envelope || '');

    const handleBalanceTypeChange = (event) => {
        setBalance(event.target.value);
    };

    const handleOperatorChange = (event) => {
        setOperator(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const handleOutputEnvelopeChange = (event) => {
        setEnvelope(event.target.value);
    };

    return (
    <li className="operatorListItem">
        <label htmlFor="balance">Balance Type:</label>
        <select id="balance" value={balance} onChange={handleBalanceTypeChange}>
            <option value="runningTotal">Running Total</option>
            <option value="totalBudget">Total Balance</option>
        </select>

        <label htmlFor="operator">Operator:</label>
        <select id="operator" value={operator} onChange={handleOperatorChange}>
            <option value="-">Subtraction (-)</option>
            <option value="%">Percentage (%)</option>
        </select>

        <label htmlFor="value">Value:</label>
        <input
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
            placeholder="Value"
        />

        <label htmlFor="envelope">Output Envelope:</label>
        <input
            type="text"
            id="envelope"
            value={envelope}
            onChange={handleOutputEnvelopeChange}
            placeholder="Output Envelope"
        />
        <button onClick={() => budget.removeCategory(category.id)}>Remove Category</button>
    </li>
    );

};

export default OperatorListItem;
