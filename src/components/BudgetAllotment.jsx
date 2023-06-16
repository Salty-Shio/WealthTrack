import React, {useState} from "react";
import CategoryList from "./allotmentComponents/CategoryList.jsx";
import EnvelopeList from "./allotmentComponents/EnvelopeList.jsx";
import "../css/allotment.css";

const BudgetAllotment = () => {
    const [updateFlag, setUpdateFlag] = useState(Symbol());
    
    return (
        <div className="allotment">
            <CategoryList updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />
            <EnvelopeList updateFlag={updateFlag} />
        </div>
    );
};

export default BudgetAllotment;