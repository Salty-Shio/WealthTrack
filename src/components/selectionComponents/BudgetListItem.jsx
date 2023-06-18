import React from "react";
import { useAuth } from "../../database/AuthContext.js";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";
import firebase from "../../database/firebase.js";
import "../../css/budgetSelection.css";
const db = firebase.firestore();

const BudgetListItem = ({updateFlag, setUpdateFlag, budget}) => {
    const { currentUser } = useAuth();
    const [loadedBudget, setLoadedBudget] = useAtom(budgetAtom);

    const loadBudget = async (budgetId) => {
        if (currentUser) {
            try {
                const budgetDoc = await db
                .collection('budgets')
                .doc(currentUser.uid)
                .collection('userBudgets')
                .doc(budgetId)
                .get();
                
                if (budgetDoc.exists) {
                    const budgetData = budgetDoc.data();
                    loadedBudget.load(budgetData);
                    setUpdateFlag(Symbol());
                    console.log('Budget loaded successfully:', budgetData);
                } else {
                    console.log('Budget not found');
                }
            } catch (error) {
                console.error('Error loading budget:', error);
            }
        }
    };

    const deleteBudget = async (budgetId) => {
        if (currentUser) {
            try {
                await db
                    .collection('budgets')
                    .doc(currentUser.uid)
                    .collection('userBudgets')
                    .doc(budgetId)
                    .delete();
                console.log('Budget deleted successfully');
                setUpdateFlag(Symbol());
            } catch (error) {
                console.error('Error deleting budget:', error);
            }
        }
    };


    return(
    <li className="budgetList">
        <h4>{ budget.name }</h4>
        <button onClick={() => loadBudget(budget.id)}>Select Budget</button>
        <button onClick={() => deleteBudget(budget.id)}>Delete Budget</button>
    </li>
    );
};

export default BudgetListItem;