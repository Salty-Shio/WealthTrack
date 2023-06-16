import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";

const CategoryListItem = ({category, setUpdateFlag}) => {
    const [budget, setBudget] = useAtom(budgetAtom);

    const [balanceType, setBalanceType] = useState(category?.balanceType || 'runningTotal');
    const [operator, setOperator] = useState(category?.operator || '-');
    const [value, setValue] = useState(category?.value || '');
    const [envelope, setEnvelope] = useState(category?.envelope || '');

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
        setEnvelope(event.target.value);
    };

    useEffect(() => {
        budget.updateCategoryAttribute(category.id, 'balanceType', balanceType);
        budget.updateCategoryAttribute(category.id, 'operator', operator);
        budget.updateCategoryAttribute(category.id, 'value', parseFloat(parseFloat(value).toFixed(2)));
        budget.updateCategoryAttribute(category.id, 'envelope', envelope);
        setBudget((prevbudget) => budget);
        setUpdateFlag(Symbol());
    }, [balanceType, operator, value, envelope])

    const handleRemoveCategory = () => {
        budget.removeCategory(category.id);
        setBudget((prevBudget) => budget);
        setUpdateFlag(Symbol());
    }

    return (
    <li className="operatorListItem">
        <label htmlFor="balanceType">Balance Type:</label>
        <select id="balanceType" value={balanceType} onChange={handleBalanceTypeChange}>
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
        <button onClick={handleRemoveCategory}>Remove Category</button>
    </li>
    );

};

export default CategoryListItem;
