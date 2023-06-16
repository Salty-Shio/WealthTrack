import React, {useState, useEffect} from "react";
import Envelope from "./envelopeComponents/Envelope.jsx"
import { useAtom } from "jotai";
import { budgetAtom } from "../atoms";

import "../css/envelopes.css"

const EnvelopeView = () => {
    const [budget, setBudget] = useAtom(budgetAtom);
    const [envelopes, setEnvelopes] = useState([]);
    const [total, setTotal] = useState("0");
    const [updateFlag, setUpdateFlag] = useState(Symbol());
    const [overallRemaining, setOverallRemaining] = useState(0);
    const [unallottedMoney, setUnallottedMoney] = useState(0);

    useEffect(() => {
        budget.calculateCategoryTotals();
        setBudget((prevBudget) => budget);
        const envelopeArray = budget.categories
            .filter((category) => category.value && (category.envelope.length > 0))
            .map((category, key) => <Envelope category={category} key={key} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />);
        setEnvelopes(envelopeArray);
    }, [])

    const updateTotal = (e) => {
        const regexFloat = /^\d+(\.\d*)?$/; // tests if the value is a float
        if (regexFloat.test(e.target.value) || e.target.value.length == 0) {
            setTotal((prevTotal) => e.target.value);
            const newTotalBalance = parseFloat(parseFloat(e.target.value.length > 0 ? e.target.value : "0").toFixed(2));
            budget.total.balance = newTotalBalance;
            // budget.calculateOverallRemainingBalance();
            setBudget((prevBudget) => budget);
            setUpdateFlag(Symbol());
        }
    }

    useEffect(() => {
        const newOverallRemaining = budget.calculateOverallRemainingBalance();
        setOverallRemaining((prevValue) => newOverallRemaining);
        const newUnallottedMoney = budget.calculateUnallottedMoney();
        setUnallottedMoney(newUnallottedMoney);
    }, [updateFlag])

    return (
        <div className="envelopeView">
            <h2>Envelope View</h2>
            <div>
                <label>Total Budget $</label>
                <input
                    type="text"
                    id="total"
                    value={total}
                    onChange={updateTotal}
                    placeholder="0000.00"
                />
                <h3>Remaining Total Balance: ${overallRemaining}</h3>
                <h3>Unalloted Money: ${unallottedMoney}</h3>
            </div>
            <ol>
                {envelopes}
            </ol>
        </div>
    );
};

export default EnvelopeView;