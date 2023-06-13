import React, { useState, useEffect } from "react";

const OperatorListItem = ({ category = {}, removeSelf }) => {

    const [balance, setBalance] = useState(category?.balance || 'runningTotal');
    const [operator, setOperator] = useState(category?.operator || '-');
    const [value, setValue] = useState(category?.value || '');
    const [envelope, setEnvelope] = useState(category?.envelope || '');
    
    useEffect(() => {
        // update the local storage array for the object that has been modified
        const categoryObject = { // remove the old one and add in the new one at the same place
            key: category.key,
            balance,
            operator,
            value,
            envelope,
        }
        
        if (localStorage.getItem("categories")) {
            const savedCategories = JSON.parse(localStorage.getItem("categories"));
            const matchingCategoryIndex = savedCategories.findIndex((savedCategory) => savedCategory.key === category.key)
            if (matchingCategoryIndex !== -1) {
                const newSavedCategories = [...savedCategories]; // deep copy
                newSavedCategories.splice(matchingCategoryIndex, 1, categoryObject); // replace the matching object
                localStorage.setItem("categories", JSON.stringify(newSavedCategories));
            } else {
                localStorage.setItem("categories", JSON.stringify([...savedCategories, categoryObject])); // add the new object
            }
        } else { de
            localStorage.setItem("categories", JSON.stringify([categoryObject]));
        }
        console.log("Item modified");
    }, [balance, operator, value, envelope])

    useEffect(() => {
        return () => {

        }
    })
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
            <li>{category.key}</li>
            <button onClick={() => removeSelf(category.key)}> Remove Category </button>
        </ul>
    );
};

export default OperatorListItem;