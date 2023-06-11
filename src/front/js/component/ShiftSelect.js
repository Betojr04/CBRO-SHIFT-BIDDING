import React from "react";
import PropTypes from "prop-types";

const generateShifts = (numTeams, peoplePerTeam) => {
  const shifts = [];
  const teams = ["A", "B", "C", "D", "E", "F"]; // replace with your actual teams
  const leads = ["John", "Jane", "Bob", "Alice", "Tom", "Jerry"]; // replace with your actual leads
  const managers = [
    "Manager1",
    "Manager2",
    "Manager3",
    "Manager4",
    "Manager5",
    "Manager6",
  ]; // replace with your actual managers
  const startTimes = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"]; // example start times, adjust as necessary
  const endTimes = ["16:00", "18:00", "20:00", "22:00", "00:00", "02:00"]; // example end times, adjust as necessary

  for (let t = 0; t < numTeams; t++) {
    for (let p = 0; p < peoplePerTeam; p++) {
      const shift = {
        id: t * peoplePerTeam + p + 1, // unique shift ID
        team: teams[t],
        startTime: startTimes[t],
        endTime: endTimes[t],
        lead: leads[t],
        manager: managers[t],
      };

      shifts.push(shift);
    }
  }

  return shifts;
};

const ShiftSelect = ({ selectedShift, handleShiftChange }) => {
  // Generate your shifts array here
  const shifts = generateShifts(6, 25);

  return (
    <label>
      Shift:
      <select value={selectedShift} onChange={handleShiftChange} required>
        <option value="">-- Please select a shift --</option>
        {shifts.map((shift) => (
          <option key={shift.id} value={shift.id}>
            {shift.team} ({shift.startTime} - {shift.endTime}, Lead:{" "}
            {shift.lead}, Manager: {shift.manager})
          </option>
        ))}
      </select>
    </label>
  );
};

ShiftSelect.propTypes = {
  selectedShift: PropTypes.string.isRequired,
  handleShiftChange: PropTypes.func.isRequired,
};

export default ShiftSelect;
