import React from "react";
import Envelope from "./envelopeComponents/Envelope.jsx"
import "../css/envelopes.css"

const EnvelopeView = () => {

    return (
        <div className="envelopeView">
            <h2> Envelope View </h2>
            <div>
                <h3> Remaining Total Balance:</h3>
            </div>
            <ol>
                <Envelope categoryName={"Test"} budgetAmount={1000}/>
                {/* A list of envelopes that will automatically be filled
                out based on the categories within the categories class that
                is stored. */}
            </ol>
        </div>
    );
};

export default EnvelopeView;