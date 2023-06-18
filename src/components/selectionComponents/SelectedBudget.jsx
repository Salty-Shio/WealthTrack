import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";
import EnvelopeList from "../allotmentComponents/EnvelopeList";
import "../../css/budgetSelection.css";

const SelectedBudget = ({updateFlag, setUpdateFlag}) => {
    const [budget, setBudget] = useAtom(budgetAtom);
    const [name, setName ] = useState('')

    useEffect(() => {
        setName(budget.name);
    }, [updateFlag])

    const handleNameChange = (event) => {
        budget.name = event.target.value;
        setBudget(budget);
        console.log(budget.name);
        setName(event.target.value);
    }

    return (
        <div className="container selectedBudget">
            <h3>Selected Budget</h3>
            <div className="selectedBudgetContainer">
                <label htmlFor="envelope">Budget Name</label>
                <input
                    type="text"
                    id="envelope"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Budget Name"
                />
            </div>
            <div className="selectedBudgetDescriptor">
                <EnvelopeList updateFlag={updateFlag} />
            </div>
        </div>
    );
};

export default SelectedBudget;