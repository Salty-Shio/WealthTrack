import React, { useState } from "react";

const OperatorListItem = (budget , category = {}) => {

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
        <ul>
            <li>
                <select value={balance} onChange={handleBalanceTypeChange}>
                    <option value="runningTotal">Running Total</option>
                    <option value="totalBudget">Total Balance</option>
                </select>

                <select value={operator} onChange={handleOperatorChange}>
                    <option value="-">Subtraction (-)</option>
                    <option value="%">Percentage (%)</option>
                </select>

                <input
                    type="number"
                    value={value}
                    onChange={handleValueChange}
                    placeholder="Value"
                />

                <input
                    type="text"
                    value={envelope}
                    onChange={handleOutputEnvelopeChange}
                    placeholder="Output Envelope"
                />
            </li>
            <button onClick={() => budget.removeCategory(category.id)}> Remove Category </button>
        </ul>
    );
};

export default OperatorListItem;
