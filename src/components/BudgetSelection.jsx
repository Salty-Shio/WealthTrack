import React from "react";
import BudgetList from "./selectionComponents/BudgetList.jsx";
import SelectedBudget from "./selectionComponents/SelectedBudget.jsx";
import "../css/budgetSelection.css";

const BudgetSelection = () => {


    return (
        <div className="budgetSelect">
            <div className="newBudget">
                <button>Create New Budget</button>
            </div>
            <BudgetList />
            <SelectedBudget />
        </div>
    );
};

export default BudgetSelection;
