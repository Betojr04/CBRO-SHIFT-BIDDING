import React from "react";
import PropTypes from "prop-types";

const ChoicesList = ({ choices, shifts }) => (
  <ul>
    {choices.map((choice, index) => (
      <li key={index}>{shifts.find((shift) => shift.id === choice).team}</li>
    ))}
  </ul>
);

ChoicesList.propTypes = {
  choices: PropTypes.array.isRequired,
  shifts: PropTypes.array.isRequired,
};

export default ChoicesList;
