import React, { useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";

import CategoryListItem from "./CategoryListItem";

const CategoryList = ({updateFlag, setUpdateFlag}) => {
    // Variables
    const [budget, setBudget] = useAtom(budgetAtom);
    const [categories, setCategories] = useState([]);
    
    // Creates a new category in the budget and queus rerender
    const handleCreateCategory = () => {
        budget.addCategory("totalBudget", "-", 0, "");
        setBudget((prevBudget) => budget);
        setUpdateFlag(Symbol());
    };

    // Rerends the list of items
    useEffect(() => {
        setCategories(budget.categories.map((category) => (
            <CategoryListItem
                key={category.id}
                category={category}
                setUpdateFlag={setUpdateFlag}
            />
        )));
    }, [updateFlag])

    
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

export default CategoryList;