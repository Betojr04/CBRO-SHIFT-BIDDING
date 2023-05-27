import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const ShiftList = () => {
  const { store, actions } = useContext(Context);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const result = await actions.fetchShifts();
      if (result) {
        setShifts(store.shifts);
      } else {
        // Handle error here
        console.log(store.shiftError);
      }
    }
    fetchShifts();
  }, [store.shifts]);

  return (
    <div>
      <h1>Available Shifts</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            <h2>{shift.title}</h2>
            <p>{shift.description}</p>
            <p>Start Time: {shift.startTime}</p>
            <p>End Time: {shift.endTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShiftList;