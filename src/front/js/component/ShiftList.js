import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import BidForm from "../pages/BidForm.js";

const ShiftList = () => {
  const { store, actions } = useContext(Context);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      const result = await actions.fetchShifts();
      if (result) {
        setShifts(store.shifts);
      } else {
        // Handle error here
        console.log(store.shiftError);
      }
    };
    fetchShifts();
  }, [store.shifts]);

  return (
    <ErrorBoundary>
      <div>
        <h1>Available Shifts</h1>
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id}>
              <h2>{shift.title}</h2>
              <p>{shift.description}</p>
              <p>Start Time: {shift.startTime}</p>
              <p>End Time: {shift.endTime}</p>
              <button onClick={() => setSelectedShift(shift)}>Bid</button>
            </li>
          ))}
        </ul>
        {selectedShift && <BidForm shift={selectedShift} />}
      </div>
    </ErrorBoundary>
  );
};

export default ShiftList;
