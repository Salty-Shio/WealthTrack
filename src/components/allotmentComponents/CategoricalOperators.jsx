import React, { useState } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";

import OperatorListItem from "./OperatorListItem";

const CategoricalOperators = () => {
    const [budget, setBudget] = useAtom(budgetAtom);
    const [categories, setCategories] = useState([]);

    const handleCreateCategory = () => {
        budget.addCategory("Total", "-", 0, "")
        setBudget(budget)
        setCategories(budget.categories.map((category) => {
            <OperatorListItem category={ category }/>
            console.log(category);
        }));
    }

    return (
        <div className="container operatorList">
            <h3> Categories </h3>
            <button onClick={handleCreateCategory}>Create New Category</button>
            <ol>
                {categories}
            </ol>
        </div>
    );
};

export default CategoricalOperators;