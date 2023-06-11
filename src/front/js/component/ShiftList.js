import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import BidForm from "../pages/BidForm";

const ShiftList = () => {
  const { store, actions } = useContext(Context);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    actions.fetchShifts();
  }, []);

  return (
    <div>
      <h1>Available Shifts</h1>
      <ul>
        {store.shifts.map((shift) => (
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
  );
};

export default ShiftList;
