import React from "react";
import CategoricalOperators from "./allotmentComponents/CategoricalOperators.jsx";
import EnvelopeList from "./allotmentComponents/EnvelopeList.jsx";
import "../css/allotment.css";

const BudgetAllotment = () => {

    return (
        <div className="allotment">
            <CategoricalOperators />
            <EnvelopeList />
        </div>
    );
};

export default BudgetAllotment;