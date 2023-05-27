import React, { useState } from "react";

const OperatorListItem = ( operator ) => {
    const [balanceType, setBalanceType] = useState('runningTotal');
    const [operator, setOperator] = useState('-');
    const [value, setValue] = useState('');
    const [outputEnvelope, setOutputEnvelope] = useState('');

    const handleBalanceTypeChange = (event) => {
        setBalanceType(event.target.value);
    };

    const handleOperatorChange = (event) => {
        setOperator(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const handleOutputEnvelopeChange = (event) => {
        setOutputEnvelope(event.target.value);
    };

    return (
        <li>
            <select value={balanceType} onChange={handleBalanceTypeChange}>
                <option value="runningTotal">Running Total</option>
                <option value="remainingBalance">Remaining Balance</option>
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
                value={outputEnvelope}
                onChange={handleOutputEnvelopeChange}
                placeholder="Output Envelope"
            />
        </li>
    );
};

export default OperatorListItem;
