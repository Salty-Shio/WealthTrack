import React from "react";

const EnvelopeListItem = ({ category }) => {
  return (
    <tr>
      <td>{`${category.envelope}`}</td>
      <td>{`${
        category.operator === "-" ? `$${category.value}` : `${category.value}%`
      }`}</td>
    </tr>
  );
};

export default EnvelopeListItem;
