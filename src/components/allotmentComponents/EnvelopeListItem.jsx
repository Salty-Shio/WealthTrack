import React from "react";

const EnvelopeListItem = ({ category }) => {
    return (
      <li>
        {`${category.envelope} - ${category.operator == "-" ? `$${category.value}` : `${category.value}%`}`}
      </li>
    );
}

export default EnvelopeListItem;