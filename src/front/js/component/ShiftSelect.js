import React from "react";
import PropTypes from "prop-types";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

const generateShifts = (numTeams, peoplePerTeam) => {
  const shifts = [];
  const teams = ["A", "B", "C", "D", "E", "F"];
  const leads = ["John", "Jane", "Bob", "Alice", "Tom", "Jerry"];
  const managers = [
    "Manager1",
    "Manager2",
    "Manager3",
    "Manager4",
    "Manager5",
    "Manager6",
  ];
  const startTimes = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
  const endTimes = ["16:00", "18:00", "20:00", "22:00", "00:00", "02:00"];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; // Days of the week

  for (let t = 0; t < numTeams; t++) {
    const daysOff = [days[t], days[(t + 1) % 7]]; // Two consecutive days off for each team, wrapping around to the start of the week
    for (let p = 0; p < peoplePerTeam; p++) {
      const dayOffPhone = days[(t + p + 2) % 7]; // Different day off from phone time for each member of a team
      const shift = {
        id: t * peoplePerTeam + p + 1,
        team: teams[t],
        startTime: startTimes[t],
        endTime: endTimes[t],
        lead: leads[t],
        manager: managers[t],
        daysOff: daysOff,
        dayOffPhone: dayOffPhone,
      };

      shifts.push(shift);
    }
  }

  return shifts;
};

const ShiftSelect = ({ selectedShift, handleShiftChange }) => {
  const shifts = generateShifts(6, 25);

  return (
    <FormControl fullWidth>
      <InputLabel id="shift-label">Shift</InputLabel>
      <Select
        labelId="shift-label"
        value={selectedShift}
        onChange={handleShiftChange}
      >
        <MenuItem value="">
          <em>-- Please select a shift --</em>
        </MenuItem>
        {shifts.map((shift) => (
          <MenuItem key={shift.id} value={shift.id}>
            {shift.team} ({shift.startTime} - {shift.endTime}, Lead:{" "}
            {shift.lead}, Manager: {shift.manager}, Days Off:{" "}
            {shift.daysOff.join(", ")}, Day Off from Phone Time:{" "}
            {shift.dayOffPhone})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ShiftSelect.propTypes = {
  selectedShift: PropTypes.string.isRequired,
  handleShiftChange: PropTypes.func.isRequired,
};

export default ShiftSelect;
