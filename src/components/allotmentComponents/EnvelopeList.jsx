import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { budgetAtom } from "../../atoms";
import EnvelopeListItem from "./EnvelopeListItem"

const EnvelopeList = ({ updateFlag }) => {
    const [ budget ] = useAtom(budgetAtom);

    useEffect(() => {
        return;
    }, [updateFlag])

    return (
        <div className="container envelopeList">
            <h3> Envelopes </h3>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Envelope</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budget.categories.filter((category) =>
                            category.value && (category.envelope.length > 0)).map((category, key) =>
                            <EnvelopeListItem category={category} key={key} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnvelopeList;