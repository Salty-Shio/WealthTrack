import React from "react";
import BudgetList from "./selectionComponents/BudgetList.jsx";
import SelectedBudget from "./selectionComponents/SelectedBudget.jsx"

const BudgetSelection = () => {


    return (
        <div>
            <div>
                <button>Create New Budget</button>
            </div>
            <BudgetList />
            <SelectedBudget />
        </div>
    );
};

export default BudgetSelection;
