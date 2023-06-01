import React from "react";

const BudgetListItem = ( budget ) => {
    
    return(
    <li>
        <h4>{ budget.name }</h4>
        <p> { budget.description }</p>
    </li>
    );
};

export default BudgetListItem;