import React from "react";
import PropTypes from "prop-types";

const ShiftSelect = ({ shifts, selectedShift, handleShiftChange }) => (
  <label>
    Shift:
    <select value={selectedShift} onChange={handleShiftChange} required>
      <option value="">-- Please select a shift --</option>
      {shifts.map((shift) => (
        <option key={shift.id} value={shift.id}>
          {shift.team} ({shift.startTime} - {shift.endTime}, Lead: {shift.lead},
          Manager: {shift.manager})
        </option>
      ))}
    </select>
  </label>
);

ShiftSelect.propTypes = {
  shifts: PropTypes.array.isRequired,
  selectedShift: PropTypes.string.isRequired,
  handleShiftChange: PropTypes.func.isRequired,
};

export default ShiftSelect;
