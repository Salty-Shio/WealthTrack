import React, {useState} from "react";
import OperatorListItem from "./OperatorListItem";
import Budget from "../../Budget.js";

const CategoricalOperators = () => {
    const budget =  Budget;
    const [categories, setCategories] = useState([]);

    const handleCreateCategory = () => {
        setCategories([...categories, <OperatorListItem budget={ budget }/>]);
    }

    return (
        <div>
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