import React, { useState, useEffect }from "react";
import BudgetList from "./selectionComponents/BudgetList.jsx";
import SelectedBudget from "./selectionComponents/SelectedBudget.jsx";
import "../css/budgetSelection.css";
import { useAuth } from "../database/AuthContext.js";
import { useAtom } from "jotai";
import { budgetAtom } from "../atoms";
import firebase from "../database/firebase.js";
import Budget from "../Budget.js";
const db = firebase.firestore();

const BudgetSelection = () => {
    const [updateFlag, setUpdateFlag] = useState(Symbol());
    const [budget, setBudget] = useAtom(budgetAtom);
    const { currentUser } = useAuth();

    const saveBudget = async () => {
        if (currentUser) {
            if (budget.name.length < 1) {
                budget.name = "Unnamed Budget";
            }

            const budgetData = {id: budget.id, categories: budget.categories, total: budget.total, name: budget.name}

            try {
                await db.collection('budgets').doc(currentUser.uid).collection('userBudgets').add(budgetData);
                console.log('Budget saved successfully');
                setUpdateFlag(Symbol());
            } catch (error) {
                console.error('Error saving budget:', error);
            }
        }
    };

    const createNewBudget = () => {
        setBudget(new Budget());
        setUpdateFlag(Symbol());
    }
    
    
    return (
        <div className="budgetSelect">
            <div className="newBudget">
                <button onClick={createNewBudget}>Create New Budget</button>
            </div>
            <div className="saveBudget">
                <button onClick={saveBudget}>Save Budget</button>
            </div>
            <BudgetList updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />
            <SelectedBudget updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />
        </div>
    );
};

export default BudgetSelection;
