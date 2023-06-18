import React, { useState, useEffect } from "react";
import firebase from "../../database/firebase.js";
import BudgetListItem from "./BudgetListItem.jsx";
import { useAuth } from "../../database/AuthContext.js";
import "../../css/budgetSelection.css";
const db = firebase.firestore();

const BudgetList = ({ updateFlag, setUpdateFlag}) => {
    const [loadedBudgets, setLoadedBudgets] = useState([]);
    const { currentUser } = useAuth();
    
    useEffect(() => {
        getAllBudgets();
    }, [updateFlag]);

    useEffect(() => {
        return;
    }, [loadedBudgets])

    const getAllBudgets = async () => {
        if (currentUser) {
            try {
                const snapshot = await db
                    .collection('budgets')
                    .doc(currentUser.uid)
                    .collection('userBudgets')
                    .get();

                const budgetsData = snapshot.docs.map(doc => {
                    const { name } = doc.data();
                    return { name, id: doc.id };
                });

                setLoadedBudgets((prevBudgets) => budgetsData);
            } catch (error) {
                console.error('Error getting budgets:', error);
            }
        }
    };

    
    return (
        <div className="container budgetList">
            <h3>Existing Budgets</h3>
            <ul>
                {/* Auto Generated List */}
                {loadedBudgets.map((loadedBudget, key) => {
                    return <BudgetListItem budget={loadedBudget} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} key={key} />
                })}
            </ul>
        </div>
    );
};

export default BudgetList;