import React from "react";
import CategoricalOperators from "./allotmentComponents/CategoricalOperators.jsx";
import EnvelopeList from "./allotmentComponents/EnvelopeList.jsx";

const BudgetAllotment = () => {

    return (
        <div>
            <CategoricalOperators />
            <EnvelopeList />
        </div>
    );
};

export default BudgetAllotment;