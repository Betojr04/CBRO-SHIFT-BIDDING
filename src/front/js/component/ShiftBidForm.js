import React, { useState } from "react";
import PropTypes from "prop-types";
import ShiftSelect from "./ShiftSelect";
import ChoicesList from "./ChoicesList";

const ShiftBidForm = ({ shifts, seniority }) => {
  const [selectedShift, setSelectedShift] = useState("");
  const [choices, setChoices] = useState([]);

  const handleShiftChange = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleAddChoice = (event) => {
    event.preventDefault();
    if (choices.length < seniority && selectedShift) {
      setChoices([...choices, selectedShift]);
      setSelectedShift("");
    } else {
      alert("You can't add more choices");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would submit the user's choices to your API
    console.log(choices);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ShiftSelect
          shifts={shifts}
          selectedShift={selectedShift}
          handleShiftChange={handleShiftChange}
        />
        <button type="button" onClick={handleAddChoice}>
          Add Choice
        </button>
        <button type="submit">Submit Bid</button>
      </form>
      <ChoicesList choices={choices} shifts={shifts} />
    </div>
  );
};

ShiftBidForm.propTypes = {
  shifts: PropTypes.array.isRequired,
  seniority: PropTypes.number.isRequired,
};

export default ShiftBidForm;
