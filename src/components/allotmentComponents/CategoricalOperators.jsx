import React, { useState } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";

import OperatorListItem from "./OperatorListItem";
import Budget from "../../Budget.js";

const CategoricalOperators = () => {
    const [budget, setBudget] = useAtom(budgetAtom);
    const [categories, setCategories] = useState([]);

    const handleCreateCategory = () => {
        setCategories([...categories, <OperatorListItem budget={ budget }/>]);
        budget.addCategory("Total", "-", 0, "")
        console.log("From create Category")
        console.log(budget)
        setBudget(budget)
    }

    return (
        <div className="container operatorList">
            <h3> Categories </h3>
            <button onClick={handleCreateCategory}>Create New Category</button>
            <ol>
                {categories}
                {/* Auto Generated List of Operators */}
            </ol>
        </div>
    );
};

export default CategoricalOperators;